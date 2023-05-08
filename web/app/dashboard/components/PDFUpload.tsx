import TextLoader from "@/components/ui/TextLoader";
import { SyntheticEvent, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import PDFViewer from "tailwind-pdf-viewer/dist";
import app from "@/lib/firebase";
import { Icon } from "@iconify/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

type Props = {
    pdfURL: string
}

export default function PDFUpload({ pdfURL }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [path, setPath] = useState("");
    const [uploadedURL, setUploadedURL] = useState("");

    useEffect(() => {
        setUploadedURL(pdfURL)
    }, [pdfURL])

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

            await uploadBytes(storageRef, file);
            const fileURL = await getDownloadURL(storageRef);

            const { error } = await (
                await fetch("/api/pdf", {
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

    const handleRemove = async () => {
        try {
            if (!confirm('Are you sure you want to remove this PDF? It won\'t be shown on your public page.')) return

            setIsRemoving(true)

            const { data } = await axios.delete('/api/pdf')

            if (data.success) {
                setUploadedURL('')
                setIsRemoving(false)
                toast.success('PDF removed successfully!')
            }
        } catch (error) {
            toast.error('Error removing PDF.')
        }
    }

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
            <p className="mt-3 text-sm text-center italic">*Only PDFs are allowed</p>

            {
                uploadedURL && <button
                    className="text-md bg-red-100 rounded-lg p-3 flex drop-shadow-lg m-auto my-5 text-red-800 active:drop-shadow-none"
                    onClick={handleRemove}
                >
                    {!isRemoving && "Remove PDF"}
                    {isRemoving && <TextLoader loadingText="Removing" />}
                    <Icon className="text-2xl ml-2" icon="ant-design:delete-outlined" />
                </button>
            }

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
    )
}