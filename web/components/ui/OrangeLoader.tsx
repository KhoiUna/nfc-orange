import Image from "next/image";
import TextLoader from "./TextLoader";

export default function OrangeLoader() {
    return (
        <div className="bg-[#FFFFE6] min-h-[150vh] absolute top-0 left-0 right-0 w-full overflow-hidden">
            <Image className="m-auto pt-[25vh]" src={'/images/orange-loader.webp'} width={700} height={700} alt="NFC Orange loader" />
            <div className="text-lg font-bold text-center">
                <TextLoader loadingText="Loading" />
            </div>
        </div>
    )
}