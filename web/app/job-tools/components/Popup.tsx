'use client'

import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function Popup() {
    const [cookies, setCookie, removeCookie] = useCookies(["has_closed_popup"]);

    const closePopup = () => {
        const cookieOption = {
            maxAge: 3600, // 1 hour in seconds
            path: '/',
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
            httpOnly: false,
        };
        setCookie('has_closed_popup', true, cookieOption)
    }

    if (cookies.has_closed_popup) return <></>

    return (
        <>
            <div className="fixed bg-black opacity-[0.5] w-screen h-screen top-0" />

            <div className="fixed z-10 rounded-lg bg-white mx-5 max-w-[500px] h-[550px] overflow-auto sm:m-auto sm:w-screen top-16 left-0 right-0 p-4">
                <h1 className="font-bold text-2xl text-center pb-3">
                    Create your digital business card.<br />
                    Join our student community!
                </h1>

                <Link href={'/create?utm_source=job-tools'} target='_blank'>
                    <p className="text-xl text-center mt-3">Click <span className="underline text-blue-800 font-semibold">here</span> to start!</p>
                    <Image priority className="mt-3 w-[250px] m-auto rounded-lg" src={'/images/mockup.png'} alt='Mockup image' width={250} height={250} />
                </Link>

                <div className="mt-3 flex justify-center">
                    <button
                        className="bg-primary w-[250px] p-3 rounded-lg drop-shadow-lg text-white font-bold"
                        onClick={closePopup}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}