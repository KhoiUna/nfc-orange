import Layout from "../containers/Layout";
import PDFViewer from "tailwind-pdf-viewer/dist";
import "tailwind-pdf-viewer/dist/style.css";

export default function Guide() {
    return (
        <Layout title="Home">
            <div id="parallax" className="flex justify-center items-center text-center">
                <div className="w-full mt-[5rem]">
                    <PDFViewer pdfURL={"/nfcorange-guide-flyer.pdf"} />
                </div>
            </div>
        </Layout>
    );
}
