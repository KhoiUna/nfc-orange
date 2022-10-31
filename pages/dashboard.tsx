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

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    error: false,
    text: "",
  });

  const [path, setPath] = useState("");
  const [uploadedURL, setUploadedURL] = useState("");

  const { data, error } = useSWR("/api/profile", swrFetcher);

  useEffect(() => {
    if (data) {
      const pdfURL = data.success.links[0].url;
      setUploadedURL(pdfURL);
    }
  }, [data]);

  const handleUpload = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      setUploadedURL("");
      setIsLoading(true);
      setStatus({
        error: false,
        text: "",
      });

      const target = event.target as HTMLInputElement;
      setPath(target.value);

      const fileArray = target.files!;
      const file = fileArray[0];

      if (file.type !== "application/pdf") throw "Only PDFs are allowed";

      const storage = getStorage(app);
      const storageRef = ref(storage, `/resumes/${uuidv4()}.pdf`);

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
      setStatus({
        error: false,
        text: "Uploaded successfully",
      });
      setUploadedURL(fileURL);
      setPath("");

      setTimeout(() => {
        setStatus({
          error: false,
          text: "",
        });
      }, 3000); // make status text gone after 3 seconds
    } catch (error: any) {
      console.error("Error uploading pdf");
      setPath("");
      setUploadedURL("");
      setIsLoading(false);
      setStatus({
        error: true,
        text: error,
      });
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

  return (
    <AppLayout title="Dashboard">
      <h2 className="text-xl mx-5 my-7">
        {greetUser(data.success.user.first_name)}
      </h2>

      <button className="text-xl bg-blue-100 rounded-lg p-3 flex drop-shadow-lg m-auto my-5 text-blue-800 active:drop-shadow-none">
        {!isLoading && "Upload your document"}
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

      {status.text && (
        <p
          className={`${
            status.error === true ? "text-red-800" : "text-green-800"
          } text-[1.3rem] p-2 font-bold my-1 text-center`}
        >
          {status.text}
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
