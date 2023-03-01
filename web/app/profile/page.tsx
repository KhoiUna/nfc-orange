'use client';

import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import { swrFetcher } from "../../lib/swrFetcher";
import useAuth from "../../lib/useAuth"
import ProfilePictureUpload from "@/components/ProfilePictureUpload";

export type User = {
    major: string
    first_name: string,
    middle_name?: string,
    last_name: string,
    avatar_url?: string
}

type Profile = {
    success: {
        user: User
    }
}

export default function Profile() {
    useAuth({});

    const { data: profileResponse, error } = useSWR<Profile, any>("/api/profile", swrFetcher);

    if (error) return (
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

    return (
        <div className="m-auto w-fit my-10">
            <ProfilePictureUpload user={user} />

            <div className="text-lg">
                <p><b>Major:</b> {user.major}</p>
                <p><b>First Name:</b> {user.first_name}</p>
                {user.middle_name && <p><b>Middle Name:</b> {user.middle_name}</p>}
                <p><b>Last Name:</b> {user.last_name}</p>
            </div>
        </div>
    )
}