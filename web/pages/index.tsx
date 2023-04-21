import Layout from "../containers/Layout";

export default function Index() {
  return (
    <Layout title="Home">
      <div id="gif-parallax" className="flex justify-center items-center text-center">
        <h1
          className="text-5xl text-white font-bold px-1 mx-2"
          style={{
            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Enhance {"universities'"} career fair experience
        </h1>

        {/* <div className="bg-none p-4 mt-0 rounded-lg w-fit sm:mx-auto m-8">
          <video
            width={800}
            className="rounded-lg m-auto"
            src={"/videos/intro-video.mp4"}
            controls
          ></video>

          <Link href={"/shop"}>
            <button className="text-2xl font-bold bg-primary w-fit py-2 px-6 text-white rounded-[100px] cursor-pointer mt-4 mx-auto shadow-stone-800 shadow-lg">
              Get your card
            </button>
          </Link>
        </div> */}

        {/* <div className="p-4 rounded-lg mx-auto px-8 pb-12 max-w-3xl">
          <p
            className="text-[1.3rem] text-white"
            style={{
              textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            NFC Orange is a card for students, academic people, and job
            searchers that helps them to keep their academic documents like
            resumes, academic achievements like certificates at a tap away.
            <br />
            <br />
            We provide a dashboard where you can upload your document, remove
            and make changes and be on the move without the worry of carrying
            hardcopies or filling up your device memory with numerous documents
            making it time-consuming to pull out the required document in time.
            <br />
            <br />
            You can use NFC Orange on any NFC-enabled smartphones without
            installing any apps or software. To save time, you can use our card
            to instantly show your resume or any other important documents to
            professors, recruiters, etc.
          </p>
        </div> */}
      </div>
    </Layout >
  );
}
