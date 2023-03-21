'use client'

import MarqueeBackground from "@/components/MarqueeBackground";
import AppHeaderBar from "@/components/ui/AppHeaderBar";
import { Icon } from "@iconify/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Peers'} />

            <main>
                <div className="bg-[rgba(255, 255, 255, 1)] pb-3 h-screen overflow-hidden">
                    <MarqueeBackground mode="heavy" />

                    <div className="absolute right-0 left-0 text-center top-[30%] shadow-primary z-[5]">
                        <h1 className="sm:text-5xl text-4xl font-semibold"
                            style={{
                                textShadow: '0px 10px 15px #DC7700'
                            }}
                        >Welcome to</h1>
                        <h1 className="sm:text-5xl text-4xl mt-1 font-semibold"
                            style={{
                                textShadow: '0px 10px 15px #DC7700'
                            }}
                        >PEERS</h1>

                        <h2 className="text-xl sm:text-2xl mx-3 mt-4"
                            style={{
                                textShadow: '0px 10px 15px #DC7700'
                            }}
                        >Show your professions with the world</h2>

                        <div className="m-auto w-fit mt-6">
                            <a href="#peers">
                                <Icon className="text-[3rem]" icon="pajamas:scroll-down" />
                            </a>
                        </div>
                    </div>
                </div>

                {children}
            </main>
        </>
    );
};
