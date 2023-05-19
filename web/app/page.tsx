'use client'

import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import { Icon } from "@iconify/react";
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";
import TextLoader from "@/components/ui/TextLoader";
import HeaderBar from "@/components/ui/HeaderBar";

type ApiResponse = {
    success: {
        count: number
    },
    error: boolean | string
}

export default function Home() {
    const { data } = useSWR<ApiResponse>('/api/homepage', swrFetcher)

    return (
        <>
            <HeaderBar title='Home' />

            <div id='gif-parallax' className="flex justify-between items-center min-h-screen">
                <div className="mx-8">
                    <h1
                        className="text-4xl text-primary font-bold px-1">
                        Online identity with a card tap
                    </h1>

                    <h2 className="text-5xl text-primary font-bold mt-4 ml-1 flex">
                        Get one & join our student community
                    </h2>
                    <h3 className="text-3xl text-primary font-bold mt-4 ml-1 flex">
                        {!data ? <TextLoader loadingText="" /> : Math.floor(data.success.count / 10) * 10 + '+ students and growing'}
                    </h3>

                    <Link href={"/waitlist"}>
                        <button className="text-xl font-bold bg-primary text-white py-2 px-6 rounded-[100px] cursor-pointer mt-7 transition-all hover:shadow-stone-800 hover:shadow-lg">
                            Join waitlist
                        </button>
                    </Link>
                </div>

                <Image priority className="w-[450px] h-screen hidden sm:flow-root" src={'/images/animation-vertical.webp'} width={1080} height={1920} alt="NFC Orange animation" />
            </div>

            <footer className="bg-primary py-[5%] px-[14%]" >
                <div className="flex flex-wrap justify-between items-start">
                    <div className="flex flex-col flex-wrap justify-start max-w-lg">
                        <div className="w-[12rem] h-fit">
                            <Logo />
                        </div>
                    </div>

                    <div className="flex flex-col flex-wrap text-white mt-12 sm:m-5 sm:mt-0">
                        <p className="font-bold">CONTACT US</p>

                        <div className="mt-3">
                            <div className="flex items-center">
                                <Icon icon="ant-design:mail-outlined" />
                                <a
                                    className="mx-3 font-light underline underline-offset-4"
                                    href="mailto:nfcorange1@gmail.com"
                                >
                                    nfcorange1@gmail.com
                                </a>
                            </div>

                            <div className="flex items-center">
                                <Icon icon="akar-icons:location" />
                                <p className="mx-3 font-light mt-1">Florence, AL, US</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <a href="https://www.linkedin.com/company/nfc-orange/" target={'_blank'} rel="noreferrer" className="text-white underline underline-offset-4 font-light">LinkedIn</a>
                    <a href="https://www.instagram.com/nfc_orange/" target={'_blank'} rel="noreferrer" className="text-white underline underline-offset-4 font-light ml-3">Instagram</a>
                </div>

                <p className="text-sm text-white mt-5">
                    <span>&copy; {new Date().getFullYear()}</span> | NFC Orange
                </p>
            </footer>
        </>
    );
}
