import Link from "next/link";
import Layout from "../containers/Layout";

export default function Index() {
  return (
    <Layout title="Home">
      <div className="text-center py-[20vh] min-h-[80vh]">
        <h1 className="text-[3rem] font-bold">Welcome</h1>

        <div className="my-3">
          <Link href={"/contact"}>
            <a className="text-[1.3rem] underline text-primary font-bold px-5">
              Get your card
            </a>
          </Link>
        </div>

        <div className="mt-4">
          <Link href={"/register"}>
            <a className="text-[1.3rem] underline text-primary font-bold px-5">
              Register
            </a>
          </Link>

          <Link href={"/login"}>
            <a className="text-[1.3rem] underline text-primary font-bold px-5">
              Login
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
