'use client'

import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link as LinkType, User } from "@/types/types";
import OrangeLoader from "@/components/ui/OrangeLoader";
import HeaderBar from "@/components/ui/HeaderBar";
import { swrFetcher } from "@/lib/swrFetcher";
import { redirect } from 'next/navigation';

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
    error: 'invalid' | 'register'
}

export default function View({ params }: Props) {
    const { cardUuid } = params
    const { data } = useSWR<ApiResponse>(`/api/view?c_id=${cardUuid}`, swrFetcher);

    // Update `card_tap_histories`
    const [cookies, setCookie, removeCookie] = useCookies(["scan_viewed"]);
    useEffect(() => {
        if (!cookies.scan_viewed) {
            const cookieOption = {
                maxAge: 3600, // 1 hour
                path: "/view",
                secure: process.env.NEXT_PUBLIC_PRODUCTION === "true",
                sameSite: true,
                httpOnly: false,
            };
            setCookie("scan_viewed", true, cookieOption);

            fetch(`/api/view/scan?c_id=${cardUuid}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .catch((err) => console.error(err));
        }
    }, [setCookie, cookies, data?.success, cardUuid]);

    if (!data) return <OrangeLoader />

    const errorCode = data.error
    if (errorCode) return (
        <>
            <HeaderBar />

            <div id="parallax" className="text-center py-[20vh] min-h-[80vh] m-0">
                {errorCode === "invalid" && (
                    <h1
                        className="text-white text-[3em] font-bold"
                        style={{
                            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        Invalid card
                    </h1>
                )}
                {errorCode === "register" && (
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

    const { username } = data.success.user
    redirect(`/${username}`)
}