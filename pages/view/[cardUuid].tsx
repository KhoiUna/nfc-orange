import Link from "next/link";
import { useRouter } from "next/router";
// import { isAndroid } from "react-device-detect";
import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import Layout from "../../containers/Layout";
import { swrFetcher } from "../../lib/swrFetcher";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useEffect, useState } from "react";
import { RenderParameters } from "pdfjs-dist/types/src/display/api";

export default function View() {
  const router = useRouter();
  const { cardUuid } = router.query;

  const { data } = useSWR(cardUuid && `/api/view?c_id=${cardUuid}`, swrFetcher);

  const [maxPagesInPDF, setMaxPagesInPDF] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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

            const scale = 2.1;
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
          <h1 className="text-[3em] font-bold">No resume added</h1>
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
    <Layout title="View">
      <div className="text-center py-4 min-h-[80vh] bg-slate-100">
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

            <Link
              href={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURI(
                item.url
              )}`}
              passHref
            >
              <a target={"_blank"} className="text-[blue] underline">
                <p className="pb-2">View on another tab</p>
              </a>
            </Link>

            <div className="max-w-[100%] overflow-auto">
              <canvas id="the-canvas" className="m-auto w-[1000px]" />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
