'use client'

type Props = {
    url: string
    togglePopup: () => void
}

export default function QrCodePopup({ url, togglePopup }: Props) {
    return (
        <>
            <div
                className="fixed bg-black opacity-[0.2] w-screen h-screen top-0 cursor-pointer"
                onClick={() => togglePopup()}
            />

            <div className="fixed z-10 rounded-lg bg-white max-w-[500px] m-auto sm:w-screen top-[40vh] left-0 right-0 p-4">
                <p className="font-bold text-center pb-3">Scan QR code</p>

                {/* TODO: add QR code */}
                {url}
            </div>
        </>
    )
}