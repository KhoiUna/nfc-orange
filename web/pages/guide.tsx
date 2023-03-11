import Layout from "../containers/Layout";
import PDFViewer from "tailwind-pdf-viewer/dist";

export default function Guide() {
    return (
        <Layout title="Home">
            <div id="parallax" className="flex justify-center items-center text-center">
                <div className="w-full pt-[5rem]">
                    <PDFViewer pdfURL={"/nfcorange-guide-flyer.pdf"} />
                </div>
            </div>
        </Layout>
    );
}
