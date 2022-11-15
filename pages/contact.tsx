import Layout from "../containers/Layout";

export default function Contact() {
  return (
    <Layout title="Contact">
      <div id="parallax" className="text-center p-6 min-h-[80vh]">
        <div className="bg-white w-full p-6 mt-[7rem] rounded-lg max-w-[450px] mx-auto">
          <h1 className="text-[2rem] font-bold">
            To get your card, contact us at:
          </h1>

          <div className="m-4">
            <div className="my-3">
              <a
                className="text-lg underline text-primary font-bold"
                href="mailto:nfcorange1@gmail.com"
              >
                nfcorange1@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
