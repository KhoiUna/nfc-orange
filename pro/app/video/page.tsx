'use client'

import { swrFetcher } from "@/lib/swrFetcher";
import useSWR from "swr";
import TextLoader from "@/components/ui/TextLoader";
import useAuth from "@/lib/useAuth";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { appSubmitButtonStyle, inputStyle } from "@/styles/tailwind";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, User } from "@/types/types";

type ApiResponse = {
    success: {
        user: User
        video_link: Link | null
        links: Link[],
    },
    error: string | boolean
}

export default function Page() {
    useAuth({})

    const [isLoading, setIsLoading] = useState(false)
    const [videoURL, setVideoURL] = useState('')

    const { data, error } = useSWR<ApiResponse>("/api/profile", swrFetcher);

    if (error) return <ErrorMessage />

    if (!data)
        return (
            <div className="text-[1.8rem] text-center m-5">
                <TextLoader loadingText="Loading" />
            </div>
        );

    const handleChange = ({ target }: React.SyntheticEvent) => {
        try {
            new URL((target as HTMLInputElement).value)
            setVideoURL((target as HTMLInputElement).value)
        } catch (error) {
            toast.error('Invalid URL')
        }
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            setIsLoading(true)

            const { data } = await axios.post<any, { data: { success: boolean, error: boolean } }>(`/api/video`, {
                videoURL
            })

            if (data.success) {
                setIsLoading(false)
                toast.success('Video saved successfully')
            }
        } catch (error: any) {
            setIsLoading(false)
            toast.error(error.response.data.error || 'Error saving video')
        }
    }

    const embedURL = (url: string) => {
        try {
            const getID = (url: string) => {
                const urlObj = new URL(url)

                let id = urlObj.searchParams.get('v')

                if (id !== null && id.length === 11) return id

                id = urlObj.pathname.slice(1)
                if (id.length === 11) return id
            }

            return `https://www.youtube.com/embed/${getID(url)}`
        } catch (error) {
            return
        }
    }

    const { video_link } = data.success

    return (
        <>
            <form onSubmit={handleSubmit}
                className="max-w-[500px] p-3 m-auto"
            >
                <input
                    value={videoURL}
                    onChange={handleChange}
                    className={inputStyle}
                    type="text"
                    autoComplete="off"
                    placeholder="YouTube video URL"
                />
                <button type="submit"
                    className={appSubmitButtonStyle}
                >
                    {isLoading && <TextLoader loadingText="Saving" />}
                    {!isLoading && 'Save'}
                </button>
            </form>

            {!video_link?.url && <p className='italic text-center text-lg text-slate-500'>No saved video</p>}
            {video_link?.url && <iframe
                className="m-auto w-full max-w-[500px] px-3"
                width="560" height="315"
                src={embedURL(videoURL || video_link?.url)}
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />}
        </>
    )
}