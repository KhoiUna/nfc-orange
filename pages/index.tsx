import Link from "next/link";
import Layout from "../containers/Layout";

export default function Index() {
  return (
    <Layout title="Home">
      <div className="text-center py-[20vh] min-h-[80vh]">
        <h1 className="text-[5rem] font-bold">nTap</h1>
        <h2 className="text-[2rem]">NFC for Professionals</h2>

        <div>
          <Link href={"/register"}>
            <a className="text-[1.3rem] underline text-primary font-bold">
              Sign up
            </a>
          </Link>

          <Link href={"/register"}>
            <a className="text-[1.3rem] ml-10 underline text-primary font-bold">
              Login
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
