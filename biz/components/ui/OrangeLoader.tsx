import Image from "next/image";

export default function OrangeLoader() {
    return (
        <div className="bg-[#FFFFE6] min-h-[150vh] absolute top-0 left-0 right-0 w-full overflow-hidden">
            <Image
                priority
                className="drop-shadow-lg animate-bounce w-auto h-auto m-auto pt-[40vh]"
                src={'/images/orange-loader.png'}
                width={60}
                height={60}
                alt="NFC Orange loader" />

            <p className="pt-5 text-lg font-bold text-center">Loading...</p>
        </div>
    )
}