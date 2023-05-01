import Link from "next/link";
import Layout from "../containers/Layout";
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";
import TextLoader from "@/components/ui/TextLoader";

export default function Index() {
  const { data } = useSWR('/api/homepage', swrFetcher)

  return (
    <Layout title="Home">
      <div id="gif-parallax" className="flex flex-col justify-center items-center text-center">
        <h1
          className="text-5xl text-white font-bold px-1 mx-2"
          style={{
            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Your online identity with a card tap
        </h1>

        <div className="bg-white p-3 mt-5 rounded-lg mx-5">
          <h2 className="text-4xl text-primary font-bold flex">{!data ? <span className="mr-2"><TextLoader loadingText="" /></span> : data.success.count} users and growing</h2>
        </div>

        <Link href={"/waitlist"}>
          <button className="text-xl font-bold bg-white text-primary py-2 px-6 rounded-[100px] cursor-pointer mt-5 transition-all hover:bg-primary hover:text-white hover:shadow-stone-800 hover:shadow-lg">
            Join waitlist
          </button>
        </Link>
      </div>
    </Layout >
  );
}
