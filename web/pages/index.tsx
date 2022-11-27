import Link from "next/link";
import Layout from "../containers/Layout";

export default function Index() {
  return (
    <Layout title="Home">
      <div id="parallax" className="text-center pt-[18vh] pb-4 min-h-[80vh]">
        <h1
          className="text-6xl m-8 mt-0 text-white font-bold"
          style={{
            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          A tap into your world
        </h1>

        <div className="bg-none p-4 mt-0 rounded-lg w-fit sm:mx-auto m-8">
          <video
            width={800}
            className="rounded-lg m-auto"
            src={"/videos/intro-video.mp4"}
            controls
          ></video>

          <Link href={"/shop"}>
            <button className="text-[1.5rem] font-bold bg-primary w-fit py-2 px-6 text-white rounded-[100px] cursor-pointer mt-4 mx-auto shadow-stone-800 shadow-lg">
              Get your card
            </button>
          </Link>
        </div>

        <div className="p-4 rounded-lg mx-8">
          <p
            className="text-lg text-white"
            style={{
              textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            NFC Orange is a card for students, academic people, and job
            searchers that helps them to keep their academic documents like
            resumes, Academic achievements like certificates at a tap away. We
            provide a dashboard where you can upload your document, remove and
            make changes and be on the move without the worry of carrying
            hardcopies or softcopies or filling up your devic memory with
            numerous documents making it time-consuming to pull out the required
            document in time. You can use NFC Orange on any NFC-enabled mobile
            without installing any app or software. You can use our card to save
            time to instantly show your resume or any other important document
            to professors, potential recruiters, etc.
          </p>
        </div>
      </div>
    </Layout>
  );
}
