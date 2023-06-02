'use client'

import { Icon } from "@iconify/react";
import { IKContext, IKUpload } from "imagekitio-react";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios";
import TextLoader from "./ui/TextLoader";
import { User } from "../types/types";
import imagekitTransform from "@/lib/imagekitTransform";

export const BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/2rbfwAJLwOgP/tGXwAAAABJRU5ErkJggg=='

const ProfilePictureUpload = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageURL, setImageURL] = useState<string>("");

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
        <>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: "green",
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "white",
                        },
                    },
                    error: {
                        style: {
                            background: "red",
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "white",
                        },
                    },
                }}
            />

            <div className="rounded-lg p-3 m-auto">
                <Image
                    className="m-auto w-[120px] h-[120px] rounded-[100%] border-2 border-primary object-scale-down"
                    src={imagekitTransform(imageURL) || imagekitTransform(user?.avatar_url) ||
                        `https://api.dicebear.com/5.x/initials/png?seed=${user.first_name} ${user.last_name}`
                    }
                    alt={`${user.first_name}'s profile picture`}
                    width={120}
                    height={120}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                />
            </div>

            <IKContext
                publicKey={process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY}
                urlEndpoint={process.env.NEXT_PUBLIC_IMGKIT_URL_ENDPOINT}
                authenticationEndpoint={`${process.env.NEXT_PUBLIC_ORIGIN}/api/profile/avatar/auth`}
            >
                <button className="text-md bg-blue-100 rounded-lg p-3 flex items-center drop-shadow-lg m-auto mb-5 text-blue-800 active:drop-shadow-none">
                    {!isLoading && "Update profile picture"}
                    {isLoading && <TextLoader loadingText="Uploading" />}
                    <Icon className="text-2xl ml-2" icon="ant-design:upload-outlined" />
                    <IKUpload
                        className="absolute left-0 opacity-0 cursor-pointer w-full"
                        fileName={`avatar-${user.first_name}-${user.last_name}.png`}
                        onError={onError}
                        onSuccess={onSuccess}
                        folder={process.env.NEXT_PUBLIC_IMGKIT_UPLOAD_FOLDER}
                        onChange={() => {
                            setImageURL("")
                            setIsLoading(true)
                        }}
                    />
                </button>
            </IKContext>
        </>
    )
}

export default ProfilePictureUpload