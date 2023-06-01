'use client'

import TextLoader from "@/components/ui/TextLoader";
import { swrFetcher } from "@/lib/swrFetcher";
import useSWR from "swr";
import useAuth from "@/lib/useAuth";
import { Peer } from "../../types/types";
import PeerCard from "./components/PeerCard";
import Marquee from "react-fast-marquee";
import { Icon } from "@iconify/react";
import MarqueeBackground from "@/components/MarqueeBackground";

export default function Peers() {
    useAuth({})

    const { data, error } = useSWR<{
        success: {
            students: Peer[]
        }
    }, any>("/api/peers", swrFetcher);

    if (error) return (
        <div className="text-[1.8rem] text-center m-5">
            <h1 className="text-center mb-8 mx-3 sm:text-5xl text-4xl font-semibold">Your Peers Network</h1>
            <h1>Failed to load</h1>
        </div>
    );

    if (!data) return (
        <div className="h-[85vh] mt-4">
            <h1 id="peers" className="text-center mb-8 mx-3 sm:text-5xl text-4xl font-semibold">Your Peers Network</h1>

            <div className="text-[1.8rem] text-center m-5">
                <TextLoader loadingText="Loading" />
            </div>
        </div>
    )

    const { students } = data.success

    return (
        <>
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

            <div className="h-[85vh] mt-7">
                <h1 id="peers" className="text-center mb-8 mx-3 sm:text-5xl text-4xl font-semibold">Your Peers</h1>

                <Marquee>
                    {
                        students.slice(0, students.length / 2).map((student: Peer, index: number) => (
                            <PeerCard key={index} student={student} />
                        ))
                    }
                </Marquee>
                <Marquee direction="right">
                    {
                        students.slice(students.length / 2, students.length + 1).map((student: Peer, index: number) => (
                            <PeerCard key={index} student={student} />
                        ))
                    }
                </Marquee>
            </div>
        </>
    )
}