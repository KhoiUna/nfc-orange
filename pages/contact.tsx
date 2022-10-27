import Link from "next/link";
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
              href="mailto:r281000@rediffmail.com"
            >
              r281000@rediffmail.com
            </a>
          </div>

          <div className="my-3">
            <a
              className="text-lg underline text-primary font-bold"
              href="mailto:nguyentuankhoi2112@gmail.com"
            >
              nguyentuankhoi2112@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
