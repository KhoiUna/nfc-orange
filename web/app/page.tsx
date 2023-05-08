import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: 'NFC Orange | Home'
}

export default function Home() {
    return (
        <div id='gif-parallax' className="flex justify-between items-center min-h-screen">
            <div className="mx-8">
                <h1
                    className="text-3xl text-primary font-bold px-1">
                    Online identity with a card tap
                </h1>

                <h2 className="text-5xl text-primary font-bold mt-4 ml-1 flex">
                    Get one & join our student community
                </h2>

                <Link href={"/waitlist"}>
                    <button className="text-xl font-bold bg-primary text-white py-2 px-6 rounded-[100px] cursor-pointer mt-7 transition-all hover:shadow-stone-800 hover:shadow-lg">
                        Join waitlist
                    </button>
                </Link>
            </div>

            <Image priority className="w-[450px] h-screen hidden sm:flow-root" src={'/images/animation-vertical.gif'} width={1080} height={1920} alt="NFC Orange animation" />
        </div>
    );
}
