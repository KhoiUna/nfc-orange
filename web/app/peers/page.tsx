'use client'

import TextLoader from "@/components/ui/TextLoader";
import { swrFetcher } from "@/lib/swrFetcher";
import useAuth from "@/lib/useAuth";
import useSWR from "swr";
import { Student } from "../../types/types";
import PeerCard from "./components/PeerCard";
import { register, SwiperContainer, SwiperSlide } from 'swiper/element/bundle';
import { DOMAttributes } from "react";
import { isMobile } from "react-device-detect";
register();

type SwiperAttributes<K extends string> = { [key in K]: any };
type CustomEvents<K extends string> = { [key in K]: (event: CustomEvent) => void };
type CustomElement<T, K extends string> = Partial<T & DOMAttributes<T> & SwiperAttributes<K> & { children: any } & CustomEvents<`on${K}`>>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['swiper-container']: CustomElement<typeof SwiperContainer, 'slides-per-view' | 'navigation' | 'grab-cursor'>;
            ['swiper-slide']: CustomElement<typeof SwiperSlide, 'key'>;
        }
    }
}

export default function Peers() {
    useAuth({})

    const { data, error } = useSWR<{
        success: {
            students: Student[]
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
            <h1 id="peers" className="text-center mb-8 mx-3 sm:text-5xl text-4xl font-semibold">Your Peers Network</h1>

            <swiper-container
                slides-per-view={isMobile ? 'auto' : 3}
                navigation="true"
                grab-cursor="true"
            >
                {
                    students.map((student: Student, index: number) => (
                        <swiper-slide key={index}>
                            <PeerCard student={student} />
                        </swiper-slide>
                    ))
                }
            </swiper-container>
        </div>
    )
}