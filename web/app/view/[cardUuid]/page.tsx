'use client'

import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { swrFetcher } from "@/lib/swrFetcher";
import TextLoader from "@/components/ui/TextLoader";

type Props = {
    params: {
        cardUuid: string
    }
}

export default function View({ params }: Props) {
    const { cardUuid } = params
    const { data } = useSWR(`/api/view?c_id=${cardUuid}`, swrFetcher);

    // Update scan history
    const [cookies, setCookie, removeCookie] = useCookies(["viewed"]);
    useEffect(() => {
        // If card is valid & cookies.viewed not set & code is production
        if (
            data?.success.length > 0 &&
            !cookies.viewed &&
            process.env.NEXT_PUBLIC_PRODUCTION === "true"
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
                .then((res) => console.log(res))
                .catch((err) => console.error(err));
        }
    }, [setCookie, cookies, data, cardUuid]);

    if (!data)
        return (
            <div className="w-screen text-center pt-[20vh] text-[3em] font-bold">
                <TextLoader loadingText="Loading" />
            </div>
        );

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

    const { first_name, middle_name, last_name, avatar_url, major } = success[0]

    return (
        <>
            <div className="pt-3 text-center pb-5">
                <div className="rounded-lg">
                    <Image className="m-auto w-[150px] h-[150px] rounded-[100%] object-scale-down" src={avatar_url ||
                        `https://api.dicebear.com/5.x/initials/png?seed=${first_name} ${last_name}`
                    } alt={`${first_name}'s profile picture`} width={100} height={100} />
                </div>

                <p className="mt-3 text-lg font-bold">{first_name} {middle_name} {last_name}</p>
                <p className="text-lg">Major in <b>{major}</b></p>
            </div>

            <div className="text-center mx-3">
                <Link href={`/view/${cardUuid}/resume`}>
                    <div className="border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white max-w-[500px] m-auto">
                        <p className="font-bold">My Resume</p>
                    </div>
                </Link>
            </div>
        </>
    );
}
