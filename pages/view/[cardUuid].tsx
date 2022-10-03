import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import Layout from "../../containers/Layout";
import { swrFetcher } from "../../lib/swrFetcher";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// import { useEffect } from "react";
// import { RenderParameters } from "pdfjs-dist/types/src/display/api";

export default function View() {
  const router = useRouter();
  const { cardUuid } = router.query;

  const { data } = useSWR(cardUuid && `/api/view?c_id=${cardUuid}`, swrFetcher);

  // useEffect(() => {
  //   if (data?.success.length > 0) {
  //     const url = data.success[0].url;

  //     GlobalWorkerOptions.workerSrc =
  //       "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.js";

  //     const loadingTask = getDocument(url);
  //     loadingTask.promise.then(
  //       function (pdf) {
  //         console.log("PDF loaded");

  //         // Fetch the first page
  //         const pageNumber = 1;
  //         pdf.getPage(pageNumber).then(function (page) {
  //           console.log("PDF page loaded");

  //           const scale = 1.5;
  //           const viewport = page.getViewport({ scale });

  //           // Prepare canvas using PDF page dimensions
  //           const canvas = document.getElementById(
  //             "the-canvas"
  //           ) as HTMLCanvasElement;
  //           const context = canvas.getContext("2d");
  //           canvas.height = viewport.height;
  //           canvas.width = viewport.width;

  //           // Render PDF page into canvas context
  //           const renderContext = {
  //             canvasContext: context,
  //             viewport: viewport,
  //           };
  //           const renderTask = page.render(renderContext as RenderParameters);
  //           renderTask.promise.then(function () {
  //             console.log("PDF rendered");
  //           });
  //         });
  //       },
  //       function (error) {
  //         // PDF loading error
  //         console.error("Error rendering PDF");
  //       }
  //     );
  //   }
  // }, [data]);

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

  return (
    <Layout title="View">
      <div className="text-center py-[20vh] min-h-[80vh]">
        {success.map((item: { url: string }) => (
          <div className="" key={item.url}>
            <object
              className="w-screen h-[70vh] m-auto"
              type="application/pdf"
              data={item.url}
            />
          </div>
        ))}

        {/* <canvas id="the-canvas"></canvas> */}
      </div>
    </Layout>
  );
}
