import { Icon } from "@iconify/react";
import Link from "next/link";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { RenderParameters } from "pdfjs-dist/types/src/display/api";
import { useEffect, useState } from "react";
import TextLoader from "./ui/TextLoader";

interface PDFViewProps {
  pdfURL: string;
}

const PDFViewer = ({ pdfURL }: PDFViewProps) => {
  const [maxPagesInPDF, setMaxPagesInPDF] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfIsLoading, setPDFIsLoading] = useState(false);
  const [zoomAddition, setZoomAddition] = useState(0);

  // Render PDF
  useEffect(() => {
    GlobalWorkerOptions.workerSrc =
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.js";

    const loadingTask = getDocument(pdfURL);
    loadingTask.promise.then(
      (pdf) => {
        console.log("PDF loaded");

        // Set pagesInPDF equal to number of pages in PDF
        setMaxPagesInPDF(pdf.numPages);

        // Fetch the first page
        pdf.getPage(currentPage).then((page) => {
          console.log("PDF page loaded");

          const scale = 1 + zoomAddition;
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
          renderTask.promise.then(() => {
            console.log("PDF rendered");
            setPDFIsLoading(false);
          });
        });
      },
      (error) => {
        // PDF loading error
        console.error("Error rendering PDF");
      }
    );
  }, [currentPage, pdfURL, zoomAddition]);

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

  const handleZoom = (action: "ZOOM_IN" | "ZOOM_OUT") => {
    if (action == "ZOOM_IN") {
      if (zoomAddition >= 1) return;
      setZoomAddition(zoomAddition + 0.2);
    }

    if (action == "ZOOM_OUT") {
      if (zoomAddition <= 0) return;
      setZoomAddition(zoomAddition - 0.2);
    }
  };

  return (
    <>
      <div className="flex justify-center p-4">
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

      <div>
        <Link href={pdfURL} passHref>
          <a target={"_blank"}>
            <p className="pb-4 text-primary font-bold underline">
              View or download on another tab
            </p>
          </a>
        </Link>
      </div>

      {pdfIsLoading && (
        <div className="font-bold">
          <TextLoader loadingText="Loading PDF" />
        </div>
      )}

      <div
        className={`bg-stone-400 m-auto p-3 overflow-auto w-full max-h-[700px] ${
          pdfIsLoading ? "hidden" : ""
        }`}
      >
        <canvas
          id="the-canvas"
          className="m-auto w-fit h-fit shadow-stone-800 shadow-xl"
        />

        <div className="fixed sm:left-[48%] left-[35%] bottom-3 bg-stone-400 w-fit m-auto p-2 rounded-lg opacity-[0.9]">
          <button
            type="button"
            className="text-white text-[2rem] px-3"
            onClick={() => handleZoom("ZOOM_OUT")}
          >
            <Icon icon="material-symbols:zoom-out" />
          </button>

          <button
            type="button"
            className="text-white text-[2rem] px-3"
            onClick={() => handleZoom("ZOOM_IN")}
          >
            <Icon icon="material-symbols:zoom-in" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
