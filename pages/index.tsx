import Layout from "../containers/Layout";

export default function Index() {
  return (
    <Layout title="Home">
      <div id="parallax" className="text-center py-[20vh] min-h-[80vh]">
        <h1
          className="text-6xl m-8 mt-0 text-white font-bold"
          style={{
            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          A tap into your world
        </h1>

        <div className="bg-white p-4 mt-0 rounded-lg w-fit sm:mx-auto m-8 shadow-primary shadow-2xl">
          <h2 className="text-3xl font-bold pt-2 pb-6">What is NFC Orange?</h2>
          <video
            width={800}
            className="rounded-lg m-auto"
            src={"/videos/intro-video.mp4"}
            controls
          ></video>
        </div>
      </div>
    </Layout>
  );
}
