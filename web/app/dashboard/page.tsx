'use client'

import { SyntheticEvent, useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import PDFViewer from "tailwind-pdf-viewer/dist";
import axios from "axios";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import Link from "next/link";
import { swrFetcher } from "@/lib/swrFetcher";
import TextLoader from "@/components/ui/TextLoader";
import greetUser from "@/lib/greetUser";
import app from "@/lib/firebase";
import { Icon } from "@iconify/react";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [path, setPath] = useState("");
    const [uploadedURL, setUploadedURL] = useState("");

    const { data, error } = useSWR("/api/profile", swrFetcher);

    useEffect(() => {
        if (data?.success?.pdf_link) setUploadedURL(data.success.pdf_link)
    }, [data]);

    const handleUpload = async (event: SyntheticEvent) => {
        try {
            event.preventDefault();
            setIsLoading(true);

            const target = event.target as HTMLInputElement;
            setPath(target.value);

            const fileArray = target.files!;
            const file = fileArray[0];

            if (file.type !== "application/pdf") throw "Only PDFs are allowed";

            const storage = getStorage(app);
            const storageRef = ref(storage, `/resumes/${process.env.NEXT_PUBLIC_UPLOAD_FOLDER}/${uuidv4()}.pdf`);

            const response = await uploadBytes(storageRef, file);
            const fileURL = await getDownloadURL(storageRef);

            const { error, success } = await (
                await fetch("/api/upload", {
                    method: "POST",
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                    body: JSON.stringify({ fileURL }),
                })
            ).json();

            if (error) throw error;

            setIsLoading(false);
            toast.success("Uploaded successfully!\nYou can tap your card on any NFC-enabled mobile phones to show your resume!")
            setUploadedURL(fileURL);
            setPath("");
        } catch (error: any) {
            console.error("Error uploading pdf")
            setPath("")
            setIsLoading(false)
            toast.error(error)
            return false;
        }
    };

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

            <h2 className="text-xl mx-5 my-7">
                {greetUser(data.success.user.first_name)}
            </h2>

            <ProfilePictureUpload user={data.success.user} />
            <hr className="w-[95%] m-auto" />

            {/* Upload custom PDF */}
            <button className="text-md bg-blue-100 rounded-lg p-3 flex drop-shadow-lg m-auto my-5 text-blue-800 active:drop-shadow-none">
                {!isLoading && "Upload your PDF"}
                {isLoading && <TextLoader loadingText="Uploading" />}
                <Icon className="text-2xl ml-2" icon="ant-design:upload-outlined" />
                <input
                    required
                    className="absolute left-0 opacity-0 cursor-pointer w-full"
                    type="file"
                    name="resume_upload"
                    onChange={handleUpload}
                    value={path}
                />
            </button>
            <p className="text-sm text-center italic">*Only PDFs are allowed</p>

            {!uploadedURL && (
                <p className="text-lg p-2 font-bold mt-3 text-center">
                    No PDF saved
                </p>
            )}

            <div className="mt-6">
                {uploadedURL && <p className="mx-5 font-bold mb-2">Your current resume:</p>}
                {uploadedURL && <div className="mx-5">
                    <PDFViewer pdfURL={uploadedURL} />
                </div>}
            </div>
        </>
    );
}
