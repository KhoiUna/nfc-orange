'use client'

import { swrFetcher } from "@/lib/swrFetcher";
import useSWR from "swr";
import TextLoader from "@/components/ui/TextLoader";
import useAuth from "@/lib/useAuth";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function Page() {
    useAuth({})

    const { data, error } = useSWR("/api/profile", swrFetcher);

    if (error) return <ErrorMessage />

    if (!data)
        return (
            <div className="text-[1.8rem] text-center m-5">
                <TextLoader loadingText="Loading" />
            </div>
        );

    return (
        <>

        </>
    )
}