import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import Layout from "../../containers/Layout";
import { swrFetcher } from "../../lib/swrFetcher";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useEffect, useState } from "react";
import { RenderParameters } from "pdfjs-dist/types/src/display/api";
import ViewLayout from "../../containers/ViewLayout";
import { useCookies } from "react-cookie";
import PDFViewer from "../../components/PDFViewer";

export default function View() {
  const router = useRouter();
  const { cardUuid } = router.query;

  const { data } = useSWR(cardUuid && `/api/view?c_id=${cardUuid}`, swrFetcher);

  const [maxPagesInPDF, setMaxPagesInPDF] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfIsLoading, setPDFIsLoading] = useState(false);

  // Update scan history
  const [cookies, setCookie, removeCookie] = useCookies(["viewed"]);
  useEffect(() => {
    // If card is valid & cookies.viewed not set & code is production
    if (
      data?.success.length > 0 &&
      !cookies.viewed &&
      process.env.NEXT_PUBLIC_PRODUCTION === "true"
    ) {
      const cookieOption = {
        maxAge: 60, // 1 minute
        path: "/view",
        secure: process.env.NEXT_PUBLIC_PRODUCTION === "true",
        sameSite: true,
        httpOnly: false,
      };
      setCookie("viewed", true, cookieOption);

      // Fetch POST to api to update scan history
      fetch(`/api/view/scan?c_id=${cardUuid}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }, [setCookie, cookies, data, cardUuid]);

  if (!data)
    return (
      <Layout title="View">
        <div className="text-center py-[20vh] min-h-[80vh]">
          <div className="text-[3em] font-bold">
            <TextLoader loadingText="Loading" />
          </div>
        </div>
      </Layout>
    );

  const { success, error } = data;

  if (error)
    return (
      <Layout
        title={
          error === "register" ? "View - Please Register" : "View - Invalid"
        }
      >
        <div id="parallax" className="text-center py-[20vh] min-h-[80vh] m-0">
          {error === "invalid" && (
            <h1
              className="text-white text-[3em] font-bold"
              style={{
                textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Invalid card
            </h1>
          )}
          {error === "register" && (
            <>
              <h1
                className="text-[3em] text-white font-bold"
                style={{
                  textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                Card is not registered
              </h1>
              <Link href={`/register?c_id=${cardUuid}`}>
                <h2 className="underline text-white text-[2rem] mt-3 cursor-pointer">
                  Go here to register
                </h2>
              </Link>
            </>
          )}
        </div>
      </Layout>
    );

  if (success.length === 0)
    return (
      <Layout title="View">
        <div className="text-center py-[20vh] min-h-[80vh] m-4">
          <h1 className="text-[3em] font-bold">No document uploaded</h1>
        </div>
      </Layout>
    );

  const handleClick = (action: "back" | "next") => {
    if (currentPage <= 1 && action === "back") return;
    if (action === "next" && currentPage >= maxPagesInPDF) return;

    if (action === "back") {
      setCurrentPage(currentPage - 1);
    }
    if (action === "next") {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ViewLayout title="View">
      <div className="text-center py-4 min-h-[80vh]">
        <div className="flex justify-center m-4">
          <div className="flex items-center">
            <button
              disabled={currentPage === 1}
              className={`bg-primary p-2 rounded-lg drop-shadow-lg ${
                currentPage === 1 && "bg-[#a3a3a3]"
              }`}
              onClick={() => handleClick("back")}
            >
              <span className="text-xl text-white">Back</span>
            </button>
            <div>
              <p className="mx-6 text-xl bg-white px-3 py-2 rounded-lg border-slate-400 border-2 h-fit">
                {currentPage}
              </p>
            </div>
            <button
              disabled={currentPage === maxPagesInPDF}
              className={`bg-primary p-2 rounded-lg drop-shadow-lg ${
                currentPage === maxPagesInPDF && "bg-[#a3a3a3]"
              }`}
              onClick={() => handleClick("next")}
            >
              <span className="text-xl text-white">Next</span>
            </button>
          </div>
        </div>

        {success.map((item: { url: string }) => (
          <div className="" key={item.url}>
            <Link href={item.url} passHref>
              <a target={"_blank"}>
                <p className="pb-4 text-primary font-bold underline">
                  View or download on another tab
                </p>
              </a>
            </Link>

            {pdfIsLoading && (
              <div className="font-bold">
                <TextLoader loadingText="Loading PDF" />
              </div>
            )}

            <PDFViewer pdfURL={data.success[0].url} />
            {/* <div
              className={`overflow-auto max-w-[380px] max-h-[700px] rounded-lg`}
            >
              <canvas id="the-canvas" className="m-auto w-fit h-fit" />
            </div> */}
          </div>
        ))}
      </div>
    </ViewLayout>
  );
}
