import Link from "next/link";
import Layout from "../containers/Layout";

export default function Index() {
  return (
    <Layout title="Home">
      <div id="parallax" className="text-center py-[20vh] min-h-[80vh]">
        <h1
          className="text-6xl m-8 mt-[7.5rem] text-white font-bold"
          style={{
            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          A tap into your world
        </h1>
      </div>
    </Layout>
  );
}
