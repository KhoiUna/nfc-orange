'use client'

import TextLoader from "@/components/ui/TextLoader";
import { swrFetcher } from "@/lib/swrFetcher";
import useAuth from "@/lib/useAuth";
import useSWR from "swr";
import { Peer } from "../../types/types";
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

    // TODO: change below
    const error = false
    const data = {
        success: {
            students: [
                {
                    "first_name": "Amber",
                    "middle_name": "",
                    "last_name": "Sandvig",
                    "major": "Professional Management ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Austin-Michael",
                    "middle_name": "Kerr",
                    "last_name": "Rasberry",
                    "major": "Computer Science",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Avish",
                    "middle_name": "",
                    "last_name": "Yadav",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Avish-Yadav_nIq7Qgzrze.png",
                    "major": "Global business ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Baily",
                    "middle_name": "Jean",
                    "last_name": "Bishop",
                    "major": "Professional Management",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Carson",
                    "middle_name": "Michael",
                    "last_name": "Scott",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Carson-Scott_UQcCG-_d7.png",
                    "major": "Finance",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Casey",
                    "middle_name": "Holt ",
                    "last_name": "Freemon",
                    "major": "Finance ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Cody",
                    "middle_name": "James",
                    "last_name": "McDonald",
                    "major": "Information Technology",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Diksha",
                    "middle_name": "",
                    "last_name": "Chottani",
                    "major": "Computer Science ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Fnu",
                    "middle_name": "",
                    "last_name": "Gungun",
                    "major": "Computer science ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Hai",
                    "middle_name": "",
                    "last_name": "Tran",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Hai-Tran_lBus2hIMW.png",
                    "major": "Human Resources Management - Psychology",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Haley",
                    "middle_name": "Morgan",
                    "last_name": "Donaldson",
                    "major": "Finance",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Hannah",
                    "middle_name": "",
                    "last_name": "Kirk",
                    "major": "Accounting",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Jacob ",
                    "middle_name": "Vance",
                    "last_name": "Parry",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Jacob_-Parry_4HD83Ajjmp.png",
                    "major": "Accounting ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Jordan",
                    "middle_name": "Alexander ",
                    "last_name": "Hunter",
                    "major": "Professional Finance ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Joseph",
                    "middle_name": "Isaac",
                    "last_name": "Grijalva ",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Joseph-Grijalva__g-qc7RMXOs.png",
                    "major": "Computer Science ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Joseph ",
                    "middle_name": "David",
                    "last_name": "Augustus",
                    "major": "Finance/Marketing",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Junnosuke",
                    "last_name": "Noiri",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Junnosuke-Noiri_vKBtMAr1b.png",
                    "major": "Computer Information Systems",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Karla",
                    "middle_name": "Ann",
                    "last_name": "Hildebrand ",
                    "major": "Data Analytics ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Khant",
                    "middle_name": "",
                    "last_name": "Khine",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Khant-Khine_zL7N17DJU_.png",
                    "major": "Electromechanical Engineering",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Khoi",
                    "middle_name": "Tuan",
                    "last_name": "Nguyen",
                    "avatar_url": "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Khoi-Nguyen__a6fRNchgS.png",
                    "major": "Information Technology",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Kota",
                    "last_name": "Mitsumoto",
                    "major": "Physics",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Lauren",
                    "middle_name": "Elizabeth",
                    "last_name": "Potts",
                    "major": "Marketing",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Maria ",
                    "middle_name": "Montserrat",
                    "last_name": "Terrazas-Guzman",
                    "major": "Management/project management ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Pahul Singh ",
                    "middle_name": "",
                    "last_name": "Jolly",
                    "major": "Business Administration ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Parminder",
                    "middle_name": "",
                    "last_name": "Singh",
                    "major": "Computer Science ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Rodnesia",
                    "middle_name": "Danielle",
                    "last_name": "Goodloe",
                    "major": "Computer Information Systems",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Romain",
                    "middle_name": "",
                    "last_name": "Le Nohaic",
                    "major": "Finance",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Rowena",
                    "middle_name": "",
                    "last_name": "Turner",
                    "major": "Interdisciplinary Studies",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Thien",
                    "middle_name": "Duc",
                    "last_name": "Nguyen",
                    "major": "Professional Management ",
                    "university_name": "University of North Alabama"
                },
                {
                    "first_name": "Yu Tra Min",
                    "middle_name": "",
                    "last_name": "Oo",
                    "major": "Finance",
                    "university_name": "University of North Alabama"
                }
            ]
        }
    }
    // const { data, error } = useSWR<{
    //     success: {
    //         students: Student[]
    //     }
    // }, any>("/api/peers", swrFetcher);



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
                    students.map((student: Peer, index: number) => (
                        <swiper-slide key={index}>
                            <PeerCard student={student} />
                        </swiper-slide>
                    ))
                }
            </swiper-container>
        </div>
    )
}