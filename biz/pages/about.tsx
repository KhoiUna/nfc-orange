import Image from "next/image";
import Layout from "../containers/Layout";
import flyer from "../public/images/nfc-orange-flyer.png";

export default function About() {
  return (
    <Layout title="Contact">
      <div id="parallax" className="text-center p-6 min-h-[80vh]">
        <div className="mt-[4rem]">
          <h1
            className="text-[2.5rem] text-white font-bold m-2"
            style={{
              textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            About us
          </h1>

          <Image className="rounded-lg" src={flyer} alt="NFC Orange flyer" />
        </div>
      </div>
    </Layout>
  );
}
