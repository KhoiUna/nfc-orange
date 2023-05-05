'use client'

import useSWR from "swr";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { swrFetcher } from "@/lib/swrFetcher";
import TextLoader from "@/components/ui/TextLoader";
import greetUser from "@/lib/greetUser";
import Link from "next/link";

export default function Dashboard() {
    const { data, error } = useSWR("/api/profile", swrFetcher);

    if (error)
        return (
            <div className="text-[1.8rem] text-center m-5">
                <h1>Failed to load</h1>
            </div>
        );

    if (!data)
        return (
            <div className="text-[1.8rem] text-center m-5">
                <TextLoader loadingText="Loading" />
            </div>
        );

    return (
        <>
            <h2 className="text-xl mx-5 my-7">
                {greetUser(data.success.user.first_name)}
            </h2>

            <ProfilePictureUpload user={data.success.user} />
            <hr className="w-[95%] m-auto" />

            <div className="mt-5 mx-3">
                <Link href={`/resume`} className="block max-w-[500px] m-auto">
                    <div className="border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white text-center hover:bg-blue-100">
                        <p className="font-bold">My Resume</p>
                    </div>
                </Link>
            </div>
        </>
    );
}
