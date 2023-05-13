'use client'

import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { Link as LinkType, User } from "@/types/types";
import OrangeLoader from "@/components/ui/OrangeLoader";
import axios from "axios";

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

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const swrFetcher = (url: string) => axios.get(url).then(async ({ data }) => {
    await sleep(2000)
    return data
});

export default function View({ params }: Props) {
    const { cardUuid } = params
    const { data } = useSWR<ApiResponse>(`/api/view?c_id=${cardUuid}`, swrFetcher);

    // Update scan history
    const [cookies, setCookie, removeCookie] = useCookies(["viewed"]);
    useEffect(() => {
        // If card is valid & cookies.viewed not set & code is production
        if (
            data?.success &&
            !cookies.viewed
        ) {
            const cookieOption = {
                maxAge: 60, // 1 minute
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

    return (
        <div>
            <div className="w-full h-[200px]">
                <div className="h-full" style={{
                    backgroundImage: 'url(/images/animation.webp)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                    <Image className="w-[100px] h-[100px] object-scale-down bg-white rounded-[100%] border-2 border-primary relative top-[150px] left-0 right-0 m-auto" src={avatar_url ||
                        `https://api.dicebear.com/5.x/initials/png?seed=${first_name} ${last_name}`
                    } alt={`${first_name}'s profile picture`} width={100} height={100} />
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
        </div >
    );
}
