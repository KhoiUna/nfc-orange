import { BLUR_DATA_URL } from "@/components/ProfilePictureUpload"
import Image from "next/image"

type Props = {
    togglePopup: () => void
}

export default function QrCodePopup({ togglePopup }: Props) {
    const url = window.location.origin + window.location.pathname
    const qrCodeURL = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + url + '?ref=qrcode'

    return (
        <>
            <div
                className="fixed bg-black opacity-[0.5] w-screen h-screen top-0 cursor-pointer"
                onClick={() => togglePopup()}
            />

            <div className="fixed z-10 rounded-lg bg-white max-w-[500px] mx-3 sm:m-auto sm:w-screen top-[25vh] left-0 right-0 p-4">
                <p className="font-bold text-center pb-3">Scan QR code</p>

                <Image
                    className="m-auto"
                    src={qrCodeURL}
                    alt="QR code"
                    width={150}
                    height={150}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                />
            </div>
        </>
    )
}