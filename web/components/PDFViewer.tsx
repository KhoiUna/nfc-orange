import { Icon } from "@iconify/react";
import Link from "next/link";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { RenderParameters } from "pdfjs-dist/types/src/display/api";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import TextLoader from "./ui/TextLoader";

interface PDFViewProps {
  pdfURL: string;
}

const PDF_INITIAL_SCALE = isMobile ? 0.5 : 1;

const PDFViewer = ({ pdfURL }: PDFViewProps) => {
  const [maxPagesInPDF, setMaxPagesInPDF] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfIsLoading, setPDFIsLoading] = useState(false);
  const [zoomAddition, setZoomAddition] = useState(0);

  // Render PDF
  useEffect(() => {
    setPDFIsLoading(true);

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

          const scale = PDF_INITIAL_SCALE + zoomAddition;
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

  const handleClick = (action: "PREVIOUS_PAGE" | "NEXT_PAGE") => {
    if (currentPage <= 1 && action === "PREVIOUS_PAGE") return;
    if (action === "NEXT_PAGE" && currentPage >= maxPagesInPDF) return;

    if (action === "PREVIOUS_PAGE") {
      setCurrentPage(currentPage - 1);
    }
    if (action === "NEXT_PAGE") {
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
      <div className="p-4">
        <Link href={pdfURL} passHref>
          <a target={"_blank"}>
            <p className="text-primary font-bold underline">
              View or download on another tab
            </p>
          </a>
        </Link>
      </div>

      {pdfIsLoading && zoomAddition === 0 && (
        <div className="bg-stone-400 m-auto p-3 pb-20 sm:pb-[7.5rem] overflow-auto w-full sm:h-[750px] h-[500px]">
          <div className="font-bold text-white text-xl mt-4">
            <TextLoader loadingText="Loading PDF" />
          </div>
        </div>
      )}

      {/* PDF canvas */}
      <div
        className={`bg-stone-400 m-auto p-3 pb-20 sm:pb-[7.5rem] overflow-auto w-full sm:h-[750px] h-[500px] ${
          pdfIsLoading && zoomAddition === 0 ? "invisible" : "visible"
        }`}
      >
        <canvas
          id="the-canvas"
          className="m-auto w-fit h-fit shadow-stone-800 shadow-xl"
        />
      </div>

      {/* Control buttons */}
      <div className="fixed sm:left-[39%] left-[9%] bottom-3 bg-stone-700 w-fit m-auto p-2 rounded-lg opacity-[0.9]">
        <div className="flex items-center">
          <button
            disabled={currentPage === 1}
            className={`bg-primary p-2 rounded-lg ${
              currentPage === 1 && "bg-[#a3a3a3]"
            }`}
            onClick={() => handleClick("PREVIOUS_PAGE")}
          >
            <span className="text-md text-white">Back</span>
          </button>

          <div>
            <p className="mx-4 text-md bg-white px-3 py-2 rounded-lg border-slate-400 border-2 h-fit">
              {currentPage}
            </p>
          </div>

          <button
            disabled={currentPage === maxPagesInPDF}
            className={`bg-primary p-2 rounded-lg ${
              currentPage === maxPagesInPDF && "bg-[#a3a3a3]"
            }`}
            onClick={() => handleClick("NEXT_PAGE")}
          >
            <span className="text-md text-white">Next</span>
          </button>

          <button
            type="button"
            className={`text-white text-[2rem] px-3 ${
              zoomAddition <= 0 ? "text-[silver]" : "text-white"
            }`}
            onClick={() => handleZoom("ZOOM_OUT")}
            disabled={zoomAddition <= 0 || pdfIsLoading}
          >
            <Icon icon="material-symbols:zoom-out" />
          </button>

          <button
            type="button"
            className={`text-[2rem] px-3 ${
              zoomAddition >= 1 ? "text-[silver]" : "text-white"
            }`}
            onClick={() => handleZoom("ZOOM_IN")}
            disabled={zoomAddition >= 1 || pdfIsLoading}
          >
            <Icon icon="material-symbols:zoom-in" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
