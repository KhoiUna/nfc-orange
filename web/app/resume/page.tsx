'use client'

import { swrFetcher } from "@/lib/swrFetcher";
import PDFUpload from "../dashboard/components/PDFUpload";
import useSWR from "swr";
import TextLoader from "@/components/ui/TextLoader";
import useAuth from "@/lib/useAuth";
import { Link } from "../../types/types";

export default function Page() {
    useAuth({})

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

    const resumeLink = data.success.links.find((item: Link) => item.link_title === 'My Resume')
    return <PDFUpload pdfURL={resumeLink} />
}