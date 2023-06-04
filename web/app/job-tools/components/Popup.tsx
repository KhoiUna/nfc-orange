import { cookies } from "next/headers";

export default function Popup() {
    async function closePopup() {
        'use server';
        cookies().set('has_closed_popup', 'true')
    }

    if (cookies().get('has_closed_popup')) return <></>

    return (
        <>
            <div className="fixed bg-black opacity-[0.5] w-screen h-screen top-0 cursor-pointer" />

            <div className="fixed z-10 rounded-lg bg-white max-w-[500px] mx-3 sm:m-auto sm:w-screen top-[25vh] left-0 right-0 p-4">
                {/* @ts-ignore */}
                <form action={closePopup}>
                    <p className="font-bold text-center pb-3">Scan QR code</p>

                    <button type="submit">Done</button>
                </form>
            </div>
        </>
    )
}