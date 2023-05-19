'use client'

import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { Link as LinkType, User } from "@/types/types";
import OrangeLoader from "@/components/ui/OrangeLoader";
import axios from "axios";
import imagekitTransform from "@/lib/imagekitTransform";
import { BLUR_DATA_URL } from "@/components/ProfilePictureUpload";
import FloatIconButton from "@/components/ui/FloatIconButton";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "react-hot-toast";
import SharePopup from "@/app/dashboard/components/SharePopup";
import QrCodePopup from "../components/QrCodePopup";
import HeaderBar from "@/components/ui/HeaderBar";

type Props = {
    params: {
        cardUuid: string
    }
}

type ApiResponse = {
    success: {
        user: User
        links: LinkType[]
        resume_link: string
    },
    error: any
}

const swrFetcher = (url: string) => axios.get(url).then(async ({ data }) => data)

export default function View({ params }: Props) {
    const { cardUuid } = params
    const { data } = useSWR<ApiResponse>(`/api/view?c_id=${cardUuid}`, swrFetcher);

    const [showPopup, setShowPopup] = useState(false)
    const [showQrCodePopup, setShowQrCodePopup] = useState(false)

    // Update scan history
    const [cookies, setCookie, removeCookie] = useCookies(["viewed"]);
    useEffect(() => {
        // If card is valid & cookies.viewed not set & code is production
        if (
            data?.success &&
            !cookies.viewed
        ) {
            const cookieOption = {
                maxAge: 1800, // 30 min
                path: "/view",
                secure: process.env.NEXT_PUBLIC_PRODUCTION === "true",
                sameSite: true,
                httpOnly: false,
            };
            setCookie("viewed", true, cookieOption);

            // Fetch POST to api to update scan history
            fetch(`/api/view/scan?c_id=${cardUuid}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .catch((err) => console.error(err));
        }
    }, [setCookie, cookies, data, cardUuid]);

    if (!data) return <OrangeLoader />

    const { success, error } = data;

    if (error) return (
        <>
            <HeaderBar />

            <div id="parallax" className="text-center py-[20vh] min-h-[80vh] m-0">
                {error === "invalid" && (
                    <h1
                        className="text-white text-[3em] font-bold"
                        style={{
                            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        Invalid card
                    </h1>
                )}
                {error === "register" && (
                    <>
                        <h1
                            className="text-[3em] text-white font-bold"
                            style={{
                                textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            Card is not registered
                        </h1>
                        <Link href={`/register?c_id=${cardUuid}`}>
                            <h2 className="underline text-white text-[2rem] mt-3 cursor-pointer">
                                Go here to register
                            </h2>
                        </Link>
                    </>
                )}
            </div>
        </>
    );

    const { first_name, middle_name, last_name, avatar_url, major, bio } = success.user
    const { links, resume_link } = success

    const togglePopup = () => setShowPopup(!showPopup)
    const toggleQrCodePopup = () => setShowQrCodePopup(!showQrCodePopup)

    const handleClick = () => {
        if (!navigator.share) {
            togglePopup()
            return
        }

        navigator.share({
            title: `${first_name} ${middle_name} ${last_name} | NFC Orange`,
            url: window.location.href
        }).then(() => toast.success('Shared successfully!')).catch(() => null)
    }

    const avatarURL = avatar_url ? imagekitTransform(avatar_url) : `https://api.dicebear.com/5.x/initials/png?seed=${first_name} ${last_name}`

    return (
        <div>
            <HeaderBar />

            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: "green",
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "white",
                        },
                    },
                    error: {
                        style: {
                            background: "red",
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "white",
                        },
                    },
                }}
            />

            <div className="w-full h-[200px]">
                <div className="h-full" style={{
                    backgroundImage: 'url(/images/animation.webp)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                    <Image
                        className="w-[120px] h-[120px] object-scale-down bg-white rounded-[100%] border-2 border-primary relative top-[150px] left-0 right-0 m-auto"
                        src={avatarURL}
                        alt={`${first_name}'s profile picture`}
                        width={120}
                        height={120}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                    />
                </div>
            </div>

            <div className="text-center mt-[5rem] mx-3">
                {!bio && (
                    <>
                        <p className="mt-3 text-lg font-bold"><span className="font-normal">Hi! I am </span>{first_name} {middle_name} {last_name}</p>
                        <p className="text-lg">My major is <b>{major}</b></p>
                    </>
                )}
                {bio && (
                    <div
                        id='bio'
                        className='text-center mb-3 bg-white p-3 mx-3 rounded-lg leading-6'
                    >
                        <p dangerouslySetInnerHTML={{ __html: bio }} />
                    </div>
                )}

                <div className="mt-6 pb-6">
                    {!resume_link && links.length === 0 && <p className="italic text-lg text-slate-500">Nothing here!</p>}

                    {
                        resume_link && <Link href={`/view/${cardUuid}/resume`} className="block max-w-[500px] m-auto">
                            <div className="border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white hover:bg-orange-100">
                                <p className="font-bold">My Resume</p>
                            </div>
                        </Link>
                    }

                    {/* Loop through social links */}
                    {
                        links.map((link, index) => (
                            <Link key={index} href={link.url} target="_blank" rel="noreferrer" className="block max-w-[500px] m-auto">
                                <div className="mt-5 border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white hover:bg-orange-100">
                                    <p className="font-bold">{link.link_title}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>

            <FloatIconButton
                className="bg-primary rounded-[100%] w-14 h-14 fixed bottom-2 right-2 drop-shadow-lg flex justify-center items-center"
                onClick={handleClick}
            >
                <Icon className="text-white text-2xl" icon="ph:share-bold" />
            </FloatIconButton>
            <FloatIconButton
                className="bg-primary rounded-[100%] w-14 h-14 fixed bottom-2 left-2 drop-shadow-lg flex justify-center items-center"
                onClick={() => toggleQrCodePopup()}
            >
                <Icon className="text-white text-2xl" icon="vaadin:qrcode" />
            </FloatIconButton>
            <div className="pb-14" />

            {showPopup && <SharePopup url={window.location.href} togglePopup={togglePopup} />}
            {showQrCodePopup && <QrCodePopup url={window.location.href} togglePopup={toggleQrCodePopup} />}
        </div>
    );
}
