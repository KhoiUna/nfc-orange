'use client'

import TextLoader from "@/components/ui/TextLoader";
import { swrFetcher } from "@/lib/swrFetcher";
import useSWR from "swr";
import useAuth from "@/lib/useAuth";
import { Peer } from "../../types/types";
import PeerCard from "./components/PeerCard";
import Marquee from "react-fast-marquee";

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
    )
}