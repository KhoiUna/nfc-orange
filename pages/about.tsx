import Image from "next/image";
import Layout from "../containers/Layout";
import flyer from "../public/images/nfc-orange-flyer.png";

export default function About() {
  return (
    <Layout title="Contact">
      <div id="parallax" className="text-center p-6 min-h-[80vh]">
        <div className="bg-slate-50 w-full p-6 mt-[7rem] rounded-lg mx-auto">
          <h1 className="text-[2rem] font-bold">About us</h1>

          <div className="m-4">
            <div className="my-3">
              <Image
                className="rounded-lg"
                src={flyer}
                alt="NFC Orange flyer"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
