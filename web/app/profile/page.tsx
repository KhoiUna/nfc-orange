'use client';

import { Icon } from "@iconify/react";
import { IKContext, IKUpload } from "imagekitio-react";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import { swrFetcher } from "../../lib/swrFetcher";
import useAuth from "../../lib/useAuth"
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios";

type Profile = {
    success: {
        user: {
            first_name: string,
            middle_name?: string,
            last_name: string,
            avatar_url?: string
        }
    }
}

export default function Profile() {
    useAuth({});

    const { data: profileResponse, error } = useSWR<Profile, any>("/api/profile", swrFetcher);

    const [isLoading, setIsLoading] = useState(false);
    const [imageURL, setImageURL] = useState<string>("");

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

    const onError = (error: any) => {
        console.error(error.message);
        toast.error(error.message)
        setIsLoading(false)
    };

    const onSuccess = async (res: any) => {
        try {
            if (res.fileType === "image") {
                const { data } = await axios.post('/api/profile/avatar', {
                    avatar_url: res.url
                })

                if (data.error) throw new Error("Error updating avatar")

                setImageURL(res.url)
                setIsLoading(false)
                toast.success("Avatar updated")
            } else {
                throw new Error("Invalid file type")
            }
        } catch (error: any) {
            console.error("Error uploading image")
            toast.error(error.message)
            setIsLoading(false)
        }
    };

    return (
        <div className="m-auto w-fit my-10">
            <Toaster />

            <div className="rounded-lg p-3 m-auto mt-5">
                <Image className="m-auto w-[100px] h-[100px] rounded-[100%] border-2 border-primary object-scale-down" src={imageURL || user?.avatar_url ||
                    `https://api.dicebear.com/5.x/initials/png?seed=${user.first_name} ${user.last_name}`
                } alt={`${user.first_name}'s profile picture`} width={500} height={500} />
            </div>

            <IKContext
                publicKey={process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY}
                urlEndpoint={process.env.NEXT_PUBLIC_IMGKIT_URL_ENDPOINT}
                authenticationEndpoint={`${process.env.NEXT_PUBLIC_ORIGIN}/api/profile/avatar/auth`}
            >
                <button className="text-lg bg-blue-100 rounded-lg p-3 flex items-center drop-shadow-lg m-auto mb-5 text-blue-800 active:drop-shadow-none">
                    {!isLoading && "Update your avatar"}
                    {isLoading && <TextLoader loadingText="Uploading" />}
                    <Icon className="text-2xl ml-2" icon="ant-design:upload-outlined" />
                    <IKUpload
                        className="absolute left-0 opacity-0 cursor-pointer w-full"
                        fileName={`avatar-${user.first_name}-${user.last_name}.png`}
                        onError={onError}
                        onSuccess={onSuccess}
                        folder={`${process.env.NEXT_PUBLIC_IMGKIT_UPLOAD_FOLDER}/${process.env.NEXT_PUBLIC_UPLOAD_FOLDER}`}
                        onChange={() => {
                            setImageURL("")
                            setIsLoading(true)
                        }}
                    />
                </button>
            </IKContext>

            <div className="text-lg">
                <p><b>First Name:</b> {user.first_name}</p>
                {user.middle_name && <p><b>Middle Name:</b> {user.middle_name}</p>}
                <p><b>Last Name:</b> {user.last_name}</p>
            </div>
        </div>
    )
}