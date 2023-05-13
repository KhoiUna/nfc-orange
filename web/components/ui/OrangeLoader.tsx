import Image from "next/image";
import TextLoader from "./TextLoader";

export default function OrangeLoader() {
    return (
        <div className="bg-[#FFFFE6] min-h-[150vh] absolute top-0 left-0 right-0 w-full overflow-hidden">
            <Image className="drop-shadow-lg animate-bounce w-[100px] m-auto pt-[35vh]" src={'/images/orange-loader.png'} width={100} height={100} alt="NFC Orange loader" />

            <div className="pt-5 text-lg font-bold text-center">
                <TextLoader loadingText="Loading" />
            </div>
        </div>
    )
}