'use client'

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import { swrFetcher } from "../../lib/swrFetcher";
import useAuth from "../../lib/useAuth"

type Profile = {
    success: {
        user: {
            first_name: string,
            middle_name?: string,
            last_name: string,
            avatarURL?: string
        }
    }
}

export default function Profile() {
    useAuth({});

    const { data: profileResponse, error } = useSWR<Profile, any>("/api/profile", swrFetcher);

    const [isLoading, setIsLoading] = useState(false)

    if (error)
        return (
            <div className="text-[1.8rem] text-center m-5">
                <h1>Failed to load</h1>
            </div>
        );



    if (!profileResponse) return (
        <div className="text-[1.8rem] text-center m-5">
            <TextLoader loadingText="Loading" />
        </div>
    )

    const { user } = profileResponse.success

    const handleUpload = () => {
        // TODO
    }

    return (
        <div className="m-auto w-fit my-10">
            <div className="rounded-lg p-3 m-auto mt-5">
                <Image className="m-auto rounded-[100%]" src={user?.avatarURL ||
                    `https://api.dicebear.com/5.x/initials/png?seed=${user.first_name} ${user.last_name}`
                } alt={`${user.first_name}'s profile picture`} width={120} height={120} />
            </div>

            <button className="text-lg bg-blue-100 rounded-lg mb-5 p-3 flex drop-shadow-lg m-auto text-blue-800 active:drop-shadow-none cursor-pointer">
                {!isLoading && "Update your avatar"}
                {isLoading && <TextLoader loadingText="Uploading" />}
                <Icon className="text-3xl ml-2" icon="ant-design:upload-outlined" />
                <input
                    required
                    className="absolute left-0 opacity-0 cursor-pointer w-full"
                    type="file"
                    name="avatar_upload"
                    onChange={handleUpload}
                // value={path}
                />
            </button>

            <div className="text-lg">
                <p><b>First Name:</b> {user.first_name}</p>
                {user.middle_name && <p><b>Middle Name:</b> {user.middle_name}</p>}
                <p><b>Last Name:</b> {user.last_name}</p>
            </div>
        </div>
    )
}