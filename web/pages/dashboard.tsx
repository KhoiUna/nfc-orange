import AppLayout from "../containers/AppLayout";
import { Icon } from "@iconify/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../lib/firebase";
import { v4 as uuidv4 } from "uuid";
import TextLoader from "../components/ui/TextLoader";
import useSWR from "swr";
import { swrFetcher } from "../lib/swrFetcher";
import greetUser from "../lib/greetUser";
import toast, { Toaster } from "react-hot-toast";
import PDFViewer from "tailwind-pdf-viewer/dist";
import axios from "axios";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const [symplicityLink, setSymplicityLink] = useState("")
  const [previewSymplicityLink, setPreviewSymplicityLink] = useState("")
  const [symplicityURLValidated, setSymplicityURLValidated] = useState<boolean | null>(null)

  const [path, setPath] = useState("");
  const [uploadedURL, setUploadedURL] = useState("");

  const { data, error } = useSWR("/api/profile", swrFetcher);

  useEffect(() => {
    if (data?.success?.pdf_link) setUploadedURL(data.success.pdf_link)
    if (data?.success?.symplicity_link) setSymplicityLink(data.success.symplicity_link)
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
      <AppLayout title="Dashboard">
        <div className="text-[1.8rem] text-center m-5">
          <h1>Failed to load</h1>
        </div>
      </AppLayout>
    );

  if (!data)
    return (
      <AppLayout title="Dashboard">
        <div className="text-[1.8rem] text-center m-5">
          <TextLoader loadingText="Loading" />
        </div>
      </AppLayout>
    );

  const handleSubmitSymplicity = async (event: SyntheticEvent) => {
    try {
      event.preventDefault()
      setIsLoading(true);

      const { data } = await axios.post('/api/upload/symplicity', { symplicityLink: previewSymplicityLink })

      if (data.error) throw error;

      setIsLoading(false);
      toast.success("Save successfully!\nYou can tap your card on any NFC-enabled mobile phones to show your resume!")
    } catch (error: any) {
      console.error("Error saving Symplicity link")
      setIsLoading(false)
      toast.error(error)
    }
  };

  const handleChange = async (event: SyntheticEvent) => {
    try {
      const target = event.target as HTMLInputElement
      const url = new URL(target.value)
      const params = url.searchParams

      const SYMPLICITY_VALIDATE_URL = '/symp.csm.usprod/una/files'
      const targetPathname = url.pathname.slice(0, 26)

      if (SYMPLICITY_VALIDATE_URL !== targetPathname || !url.search) throw new Error("Invalid Symplicity URL");

      const SYMPLICITY_VALIDATE_KEYS = [
        'X-Amz-Content-Sha256', 'X-Amz-Algorithm', 'X-Amz-Credential', 'X-Amz-Date', 'X-Amz-SignedHeaders', 'X-Amz-Expires', 'X-Amz-Signature'
      ]
      for (const [key, value] of params) {
        if (!SYMPLICITY_VALIDATE_KEYS.includes(key) || !value) throw new Error("Invalid Symplicity URL");
      }

      setPreviewSymplicityLink(target.value)
      setSymplicityURLValidated(true)
    } catch (error: any) {
      console.error(error.message);
      setPreviewSymplicityLink('')
      setSymplicityURLValidated(false)
      toast.error(error.message)
    }
  }

  if (symplicityLink) return (
    <AppLayout title="Dashboard">
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

      <div>
        <form onSubmit={handleSubmitSymplicity}>
          <div className="m-5">
            <p className="text-left mb-2 font-bold">Paste Symplicity Resume URL</p>
            <input
              required
              placeholder="Paste URL here"
              className={`w-full border-2 border-slate-200 p-2 rounded-lg focus:outline-none ${symplicityURLValidated === true && 'border-green-500'} ${symplicityURLValidated === false && 'border-red-500'}`}
              type="text"
              onChange={handleChange}
              value={previewSymplicityLink}
            />
          </div>

          <div className="text-center">
            <button
              className="text-md bg-blue-100 rounded-lg p-2 drop-shadow-lg m-auto text-blue-800 active:drop-shadow-none"
            >
              {!isLoading && "Save"}
              {isLoading && <TextLoader loadingText="Saving" />}
            </button>
          </div>
        </form>

        <p className="mt-3 text-sm text-center italic">*Only approved PDFs from<br />Symplicity are allowed</p>
      </div>

      {!symplicityLink && (
        <p className="text-[1.3rem] p-2 font-bold my-1 text-center">
          No PDF uploaded
        </p>
      )}


      <div className="mt-9">
        {symplicityLink && !previewSymplicityLink && <p className="mx-5 font-bold mb-2">Your current resume:</p>}
        {symplicityLink && previewSymplicityLink && <p className="mx-5 font-bold mb-2">Resume preview:</p>}
        <PDFViewer pdfURL={previewSymplicityLink || symplicityLink} />
      </div>
    </AppLayout>
  )

  return (
    <AppLayout title="Dashboard">
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

      {/* Upload Symplicity PDF URL */}
      <div>
        <form>
          <div className="m-5">
            <p className="text-left mb-2 font-bold">Paste Symplicity Resume URL</p>
            <input
              required
              placeholder="Paste URL here"
              className={`w-full border-2 border-slate-200 p-2 rounded-lg focus:outline-none ${symplicityURLValidated === true && 'border-green-500'} ${symplicityURLValidated === false && 'border-red-500'}`}
              type="text"
              onChange={handleChange}
              value={symplicityLink}
            />
          </div>

          <div className="text-center">
            <button
              className="text-md bg-blue-100 rounded-lg p-2 drop-shadow-lg m-auto text-blue-800 active:drop-shadow-none"
            >
              {!isLoading && "Save"}
              {isLoading && <TextLoader loadingText="Saving" />}
            </button>
          </div>
        </form>

        <p className="mt-3 text-sm text-center italic">*Only approved PDFs from<br />Symplicity are allowed</p>
      </div>

      {/* Upload custom PDF */}
      {/* <button className="text-xl bg-blue-100 rounded-lg p-3 flex drop-shadow-lg m-auto my-5 text-blue-800 active:drop-shadow-none">
        {!isLoading && "Upload your PDF"}
        {isLoading && <TextLoader loadingText="Uploading" />}
        <Icon className="text-3xl ml-2" icon="ant-design:upload-outlined" />
        <input
          required
          className="absolute left-0 opacity-0 cursor-pointer w-full"
          type="file"
          name="resume_upload"
          onChange={handleUpload}
          value={path}
        />
      </button>
      <p className="text-sm text-center italic">*Only PDFs are allowed</p> */}

      {!uploadedURL && (
        <p className="text-[1.3rem] p-2 font-bold my-1 text-center">
          No PDF uploaded
        </p>
      )}

      {uploadedURL && (
        <div className="mt-9">
          <object
            className="w-full h-[70vh] m-auto"
            type="application/pdf"
            data={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURI(
              uploadedURL
            )}`}
          />
        </div>
      )}
    </AppLayout>
  );
}
