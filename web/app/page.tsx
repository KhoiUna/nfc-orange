'use client'

import Link from "next/link";
import Layout from "../containers/Layout";
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";
import TextLoader from "@/components/ui/TextLoader";
import Image from "next/image";

export default function Home() {
    const { data } = useSWR('/api/homepage', swrFetcher)

    return (
        <div id='gif-parallax' className="flex justify-between items-center min-h-screen">
            <div className="mx-8">
                <h1
                    className="text-3xl text-primary font-bold px-1">
                    Your online identity with a card tap
                </h1>

                <h2 className="text-6xl text-primary font-bold mt-4 ml-1 flex">
                    {!data ? <span className="mr-2"><TextLoader loadingText="" /></span> : data.success.count} users and growing
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
