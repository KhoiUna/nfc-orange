'use client'

import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { Link as LinkType, User } from "@/types/types";
import OrangeLoader from "@/components/ui/OrangeLoader";
import imagekitTransform from "@/lib/imagekitTransform";
import { BLUR_DATA_URL } from "@/components/ProfilePictureUpload";
import FloatIconButton from "@/components/ui/FloatIconButton";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "react-hot-toast";
import SharePopup from "@/app/dashboard/components/SharePopup";
import QrCodePopup from "./components/QrCodePopup";
import HeaderBar from "@/components/ui/HeaderBar";
import generateVcardContent from "@/lib/generateVcardContent";
import { swrFetcher } from "@/lib/swrFetcher";

type Props = {
    params: {
        username: string
    }
}

type ApiResponse = {
    success: {
        user: User
        links: LinkType[]
        video_link: LinkType
    },
    error: 'invalid' | 'register'
}

export default function View({ params }: Props) {
    const { username } = params
    const { data } = useSWR<ApiResponse>(`/api/view/profile/${username}`, swrFetcher);

    const [isOpen, setIsOpen] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [showQrCodePopup, setShowQrCodePopup] = useState(false)

    // Update `profile_view_histories`
    const [cookies, setCookie, removeCookie] = useCookies(["profile_viewed", "scan_viewed"]);
    useEffect(() => {
        if (data?.success && !cookies.profile_viewed) {
            const cookieOption = {
                maxAge: 3600, // 1 hour
                path: '/',
                secure: process.env.NEXT_PUBLIC_PRODUCTION === "true",
                sameSite: true,
                httpOnly: false,
            };
            setCookie("profile_viewed", true, cookieOption)
            removeCookie("scan_viewed")

            fetch(`/api/view/profile/${username}`, {
                method: "POST",
            }).catch((err) => console.error(err))
        }
    }, [setCookie, cookies, data, username, removeCookie]);

    if (!data) return <OrangeLoader />

    if (data.error) return (
        <>
            <HeaderBar />

            <div id="parallax" className="text-center py-[20vh] min-h-[80vh] m-0">
                <h1
                    className="text-white text-[3em] font-bold"
                    style={{
                        textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Invalid profile
                </h1>
            </div>
        </>
    );

    const { first_name, middle_name, last_name, avatar_url, bio, phone_number, banner_image_url } = data.success.user
    const { links, video_link } = data.success
    const shareURL = window.location.origin + window.location.pathname

    const togglePopup = () => setShowPopup(!showPopup)
    const toggleQrCodePopup = () => setShowQrCodePopup(!showQrCodePopup)

    const handleClick = () => {
        if (!navigator.share) return togglePopup()

        navigator.share({
            title: `${first_name} ${middle_name} ${last_name} | NFC Orange`,
            url: shareURL + '?utm_source=share'
        }).then(() => toast.success('Shared successfully!')).catch(() => null)
    }

    const avatarURL = avatar_url ? imagekitTransform(avatar_url) : `https://api.dicebear.com/5.x/initials/png?seed=${first_name} ${last_name}`

    const handleDownloadVcard = async () => {
        const fileContent = await generateVcardContent({
            firstName: first_name,
            middleName: middle_name,
            lastName: last_name,
            viewURL: shareURL,
            bio,
            phoneNumber: phone_number,
            avatarURL,
            links
        })

        const blob = new Blob([fileContent], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `contact.vcf`;
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
    }

    const isBlank = !video_link && links.length === 0

    const embedURL = (url: string) => {
        try {
            const getID = (url: string) => {
                const urlObj = new URL(url)

                let id = urlObj.searchParams.get('v')

                if (id !== null && id.length === 11) return id

                id = urlObj.pathname.slice(1)
                if (id.length === 11) return id
            }

            return `https://www.youtube.com/embed/${getID(url)}`
        } catch (error) {
            return
        }
    }

    return (
        <>
            <HeaderBar />

            <Toaster toastOptions={{
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
            }} />

            <div className="w-full h-[200px]">
                <div className="h-full" style={{
                    backgroundImage: `url(${banner_image_url || '/images/animation.gif'})`,
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
                {phone_number && (
                    <div className='max-w-[500px] m-auto text-center mb-3 bg-white p-3 rounded-lg leading-6'>
                        <p>Call me at: <a className="text-blue-800 ml-1 underline underline-offset-2 font-semibold" href={`tel:${phone_number}`}>{phone_number}</a></p>
                    </div>
                )}

                <div className={`mt-6 pb-6 min-h-[35vh]`}>
                    {isBlank && <p className="italic text-lg text-slate-500">Nothing here!</p>}
                    {video_link && <button
                        className={"w-full m-auto max-w-[500px] border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white hover:bg-orange-100"}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-bold w-full">
                                Check out this video
                            </p>
                            <Icon icon="mingcute:down-line" className={`text-2xl ${isOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isOpen &&
                            <div className="pt-4">
                                <iframe
                                    className="w-full"
                                    width="560" height="315"
                                    src={embedURL(video_link?.url)}
                                    title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                            </div>}
                    </button>}

                    {/* Loop through social links */}
                    {links.map((link, index) => (
                        <Link key={index} href={link.url} target="_blank" rel="noreferrer" className="block max-w-[500px] m-auto">
                            <div className="mt-5 border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white hover:bg-orange-100">
                                <p className="font-bold">{link.link_title}</p>
                            </div>
                        </Link>
                    ))}
                </div >
            </div >

            {/* Fixed share bar */}
            < div className="sm:w-[500px] w-[370px] m-auto flex justify-around items-center sticky bottom-2" >
                <FloatIconButton
                    className="bg-primary rounded-[100%] w-14 h-14 drop-shadow-lg flex justify-center items-center"
                    onClick={() => toggleQrCodePopup()}
                >
                    <Icon className="text-white text-2xl" icon="vaadin:qrcode" />
                </FloatIconButton>

                <div
                    className="cursor-pointer drop-shadow-lg max-w-[500px] m-auto p-3 bg-primary rounded-[30px]"
                    onClick={handleDownloadVcard}
                >
                    <p className="font-bold flex justify-center items-center text-white">
                        <Icon icon="bxs:contact" className="text-2xl mr-2" />
                        Save Contact
                    </p>
                </div>

                <FloatIconButton
                    className="bg-primary rounded-[100%] w-14 h-14 drop-shadow-lg flex justify-center items-center"
                    onClick={handleClick}
                >
                    <Icon className="text-white text-2xl" icon="ph:share-bold" />
                </FloatIconButton>
            </div >

            {showPopup && <SharePopup url={shareURL} togglePopup={togglePopup} />
            }
            {showQrCodePopup && <QrCodePopup togglePopup={toggleQrCodePopup} />}
        </>
    );
}