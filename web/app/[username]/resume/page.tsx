'use client'

import Link from "next/link";
import useSWR from "swr";
import TextLoader from "@/components/ui/TextLoader";
import { swrFetcher } from "@/lib/swrFetcher";
import PDFViewer from "tailwind-pdf-viewer";
import "tailwind-pdf-viewer/style.css";
import { Icon } from "@iconify/react";
import HeaderBar from "@/components/ui/HeaderBar";

type Props = {
  params: {
    username: string
  }
}

export default function View({ params }: Props) {
  const { username } = params
  const { data } = useSWR(`/api/view/profile/${username}`, swrFetcher);

  if (!data)
    return (
      <div className="w-screen text-center pt-[20vh] text-[3em] font-bold">
        <TextLoader loadingText="Loading" />
      </div>
    );

  const { success, error } = data;

  if (error) return (
    <>
      <HeaderBar />

      <div id="parallax" className="w-screen text-center pt-[20vh]">
        <h1 className="text-[3em] font-bold drop-shadow-lg text-white">
          Invalid profile
        </h1>
      </div >
    </>
  );

  const { resume_link } = success

  if (!resume_link) return (
    <div className="w-screen absolute z-10">
      <div className='bg-primary p-3'>
        <Link href={`/${username}`}>
          <div className="flex flex-row items-center">
            <Icon icon="material-symbols:arrow-back-ios" className="text-white" />
            <p className="text-lg text-white underline">Main Profile</p>
          </div>
        </Link>
      </div>

      <div className="text-center py-[20vh]">
        <h1 className="text-lg font-bold">No resume uploaded</h1>
        <p className="text-lg text-primary">Please go to <Link href="/login"><span className="underline font-bold">Student Login</span></Link> to upload.</p>
      </div>
    </div>
  );

  return (
    <div className="w-screen absolute z-10">
      <div className='bg-primary p-3'>
        <Link href={`/${username}`}>
          <div className="flex flex-row items-center">
            <Icon icon="material-symbols:arrow-back-ios" className="text-white" />
            <p className="text-lg text-white underline">Main Profile</p>
          </div>
        </Link>
      </div>

      <PDFViewer pdfURL={resume_link} />
    </div>
  );
}
