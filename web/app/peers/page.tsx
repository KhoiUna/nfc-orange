'use client'

import { Fragment } from "react";
import Marquee from "react-fast-marquee";

const DIV_IN_MARQUEE_QUANTITY = 7
const DIV_IN_MARQUEE_MAP = new Array(DIV_IN_MARQUEE_QUANTITY).fill(null)

// TODO: add skeleton avatar
const DivInMarquee = () => <div className="shadow-lg rounded-lg w-[15rem] h-[100px] mx-3 bg-slate-50" />

export default function peers() {
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


                <div className="absolute right-0 left-0 text-center top-[30%] shadow-primary z-[5]"
                    style={{
                        textShadow: '0px 10px 20px #DC7700'
                    }}
                >
                    <h1 className="sm:text-5xl text-4xl font-semibold">Welcome to</h1>
                    <h1 className="sm:text-5xl text-4xl mt-1 font-semibold">PEERS</h1>

                    <h2 className="text-xl sm:text-2xl mx-3 mt-4">Show your professions with the world</h2>
                </div>

                <div>
                    <p className="text-center">View Peers</p>
                </div>
            </div>

            <div className="h-[85vh] mt-4">
                <h1 className="text-center mb-8 mx-3 sm:text-5xl text-4xl font-semibold">Your Peers Network</h1>

                {/* TODO: map fetched students here */}
                <div>
                    <p className="mx-3 mt-3 mb-1 font-semibold">Computer Science</p>
                    <DivInMarquee />
                </div>
            </div>
        </>
    )
}