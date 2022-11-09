import Layout from "../containers/Layout";

export default function Contact() {
  return (
    <Layout title="Contact">
      <div className="text-center py-[20vh] min-h-[80vh]">
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
    </Layout>
  );
}
