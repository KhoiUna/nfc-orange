'use client'

import Analytics from '@/components/Analytics';
import Logo from '@/components/Logo';
import HeaderBar from '@/components/ui/HeaderBar';
import '@/styles/globals.css'
import { Icon } from '@iconify/react';

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <Analytics />


            <body>
                <HeaderBar title='Home' />

                {children}

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
            </body>
        </html>
    )
}