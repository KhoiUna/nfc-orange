'use client'

import useAuth from "@/lib/useAuth";
import { Icon } from "@iconify/react";
import { Fragment } from "react";
import Marquee from "react-fast-marquee";
import PeerCard from "./components/PeerCard";

const DIV_IN_MARQUEE_QUANTITY = 7
const DIV_IN_MARQUEE_MAP = new Array(DIV_IN_MARQUEE_QUANTITY).fill(null)
const DivInMarquee = () => (
    <div className="shadow-lg rounded-lg w-[15rem] h-[100px] mx-3 bg-slate-50 flex items-center">
        <div className="p-2 border-r-2 border-slate-300 h-fit">
            <Icon className="text-[2rem] text-slate-300" icon="carbon:user-avatar-filled" />
        </div>

        <div className="w-full p-2 ml-3">
            <div className="w-full h-[7px] bg-slate-300 rounded-md mt-2" />
            <div className="w-full h-[7px] bg-slate-300 rounded-md mt-1" />
            <div className="w-full h-[7px] bg-slate-300 rounded-md mt-3" />
            <div className="w-[2rem] h-[7px] bg-slate-300 rounded-md mt-3" />
            <div className="w-[2rem] h-[7px] bg-slate-300 rounded-md mt-1" />
        </div>
    </div >
)

export default function Peers() {
    useAuth({});

    return (
        <>
            <div className="bg-slate-100 pb-3 max-h-screen overflow-hidden">
                <div className="pt-8">
                    {DIV_IN_MARQUEE_MAP.map((_, index) => (
                        <Fragment key={index}>
                            <Marquee className="mb-8">
                                {DIV_IN_MARQUEE_MAP.map((_, index) => (
                                    <DivInMarquee key={index} />
                                ))}
                            </Marquee>
                            <Marquee className="my-8" direction="right">
                                {DIV_IN_MARQUEE_MAP.map((_, index) => (
                                    <DivInMarquee key={index} />
                                ))}
                            </Marquee>
                        </Fragment>
                    ))}
                </div>


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
                        <Icon className="text-[3rem]" icon="pajamas:scroll-down" />
                    </div>
                </div>
            </div>

            <div className="h-[85vh] mt-4">
                <h1 className="text-center mb-8 mx-3 sm:text-5xl text-4xl font-semibold">Your Peers Network</h1>

                {/* TODO: map fetched students here */}
                <div>
                    <p className="mx-3 mt-3 mb-1 font-semibold">Computer Science</p>
                    <PeerCard student={{
                        first_name: 'John',
                        last_name: 'Doe',
                        university_name: 'UNA',
                        major: 'Computer Science'
                    }} />
                </div>
            </div>
        </>
    )
}