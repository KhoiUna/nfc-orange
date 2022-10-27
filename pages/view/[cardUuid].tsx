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

export default function View() {
  const router = useRouter();
  const { cardUuid } = router.query;

  const { data } = useSWR(cardUuid && `/api/view?c_id=${cardUuid}`, swrFetcher);

  const [maxPagesInPDF, setMaxPagesInPDF] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Render PDF
  useEffect(() => {
    if (data?.success.length > 0) {
      const pdfURL = data.success[0].url;

      GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.js";

      const loadingTask = getDocument(pdfURL);
      loadingTask.promise.then(
        function (pdf) {
          console.log("PDF loaded");

          // Set pagesInPDF equal to number of pages in PDF
          setMaxPagesInPDF(pdf.numPages);

          // Fetch the first page
          pdf.getPage(currentPage).then(function (page) {
            console.log("PDF page loaded");

            const scale = 2;
            const viewport = page.getViewport({ scale });

            // Prepare canvas using PDF page dimensions
            const canvas = document.getElementById(
              "the-canvas"
            ) as HTMLCanvasElement;
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            const renderTask = page.render(renderContext as RenderParameters);
            renderTask.promise.then(function () {
              console.log("PDF rendered");
            });
          });
        },
        function (error) {
          // PDF loading error
          console.error("Error rendering PDF");
        }
      );
    }
  }, [data, currentPage]);

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
      <Layout title="View">
        <div className="text-center py-[20vh] min-h-[80vh] m-4">
          {error === "invalid" && (
            <h1 className="text-[3em] font-bold">Invalid card</h1>
          )}
          {error === "register" && (
            <>
              <h1 className="text-[3em] font-bold">Card is not registered</h1>
              <Link href={`/register?c_id=${cardUuid}`}>
                <h2 className="underline text-primary text-[2rem] mt-3 cursor-pointer">
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

  // TODO: remove redirecting on Android
  // if (isAndroid)
  //   return (
  //     <Layout title="View">
  //       <div className="text-center py-[20vh] min-h-[80vh]">
  //         <meta
  //           http-equiv="refresh"
  //           content={`0; url = https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURI(
  //             success[0].url
  //           )}`}
  //         />
  //       </div>
  //     </Layout>
  //   );

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
          <div className="my-4 mx-6" key={item.url}>
            {/* TODO: remove old Google PDF Viewer  */}
            {/* <object
              className="w-screen h-[70vh] m-auto"
              type="application/pdf"
              data={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURI(
                item.url
              )}`}
            /> */}

            <Link href={item.url} passHref>
              <a target={"_blank"}>
                <p className="pb-4 text-primary font-bold underline">
                  View or download on another tab
                </p>
              </a>
            </Link>

            <canvas id="the-canvas" className="m-auto w-fit h-fit" />
          </div>
        ))}
      </div>
    </ViewLayout>
  );
}
