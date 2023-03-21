import { Icon } from "@iconify/react";
import { Fragment } from "react";
import Marquee from "react-fast-marquee";

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

interface Props {
    mode: 'light' | 'heavy'
}

export default function MarqueeBackground({ mode }: Props) {
    const opacity = mode === 'heavy' ? 'opacity-50' : 'opacity-10'

    return (
        <div className="bg-[rgba(255, 255, 255, 1)] pb-3 h-screen overflow-hidden">
            <div className="pt-8">
                {DIV_IN_MARQUEE_MAP.map((_, index) => (
                    <Fragment key={index}>
                        <Marquee className={"bg-[rgba(255, 255, 255, 1)] mb-8 " + opacity}>
                            {DIV_IN_MARQUEE_MAP.map((_, index) => (
                                <DivInMarquee key={index} />
                            ))}
                        </Marquee>
                        <Marquee className={"bg-[rgba(255, 255, 255, 1)] my-8 " + opacity} direction="right">
                            {DIV_IN_MARQUEE_MAP.map((_, index) => (
                                <DivInMarquee key={index} />
                            ))}
                        </Marquee>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}