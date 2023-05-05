'use client'

import Link from "next/link";
import useSWR from "swr";
import TextLoader from "../../../../components/ui/TextLoader";
import { swrFetcher } from "../../../../lib/swrFetcher";
import PDFViewer from "tailwind-pdf-viewer/dist";
import "tailwind-pdf-viewer/dist/style.css";
import { Icon } from "@iconify/react";
import HeaderBar from "@/components/ui/HeaderBar";

type Props = {
  params: {
    cardUuid: string
  }
}

export default function View({ params }: Props) {
  const { cardUuid } = params
  const { data } = useSWR(`/api/view?c_id=${cardUuid}`, swrFetcher);

  if (!data)
    return (
      <div className="w-screen text-center pt-[20vh] text-[3em] font-bold">
        <TextLoader loadingText="Loading" />
      </div>
    );

  const { success, error } = data;

  if (error) return (
    <>
      <HeaderBar title="Home" />

      <div className="w-screen text-center pt-[20vh]">
        {error === "invalid" && (
          <h1 className="text-[3em] font-bold drop-shadow-lg">
            Invalid card
          </h1>
        )}

        {error === "register" && (
          <>
            <h1 className="text-[3em] font-bold drop-shadow-lg">
              Card is not registered
            </h1>
            <Link href={`/register?c_id=${cardUuid}`}>
              <h2 className="underline text-white text-[2rem] mt-3 cursor-pointer">
                Go here to register
              </h2>
            </Link>
          </>
        )}
      </div >
    </>
  );

  const { pdf_url } = success[0]

  if (!pdf_url) return (
    <div className="text-center py-[20vh]">
      <h1 className="text-lg font-bold">No resume uploaded</h1>
      <p className="text-lg text-primary">Please go to <Link href="/login"><span className="underline font-bold">Student Login</span></Link> to upload<br />(preferably on your PC or laptop)</p>
    </div>
  );

  return (
    <div className="w-screen absolute z-10">
      <div className='bg-primary p-3'>
        <Link href={`/view/${cardUuid}`}>
          <div className="flex flex-row items-center">
            <Icon icon="material-symbols:arrow-back-ios" className="text-white" />
            <p className="text-lg text-white underline">Main Profile</p>
          </div>
        </Link>
      </div>

      <PDFViewer pdfURL={pdf_url} />
    </div>
  );
}
