import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import Layout from "../../containers/Layout";
import { swrFetcher } from "../../lib/swrFetcher";

export default function View() {
  const router = useRouter();
  const { cardUuid } = router.query;

  const { data } = useSWR(cardUuid && `/api/view?c_id=${cardUuid}`, swrFetcher);

  if (!data)
    return (
      <Layout title="View">
        <div className="text-center py-[20vh] min-h-[80vh]">
          <div className="text-[3em] font-bold">
            <TextLoader loadingText="Loading" />
          </div>
        </div>
      </Layout>
    );

  const { success, error } = data;

  if (error)
    return (
      <Layout title="View">
        <div className="text-center py-[20vh] min-h-[80vh]">
          {error === "invalid" && (
            <h1 className="text-[3em] font-bold">Invalid card</h1>
          )}
          {error === "register" && (
            <>
              <h1 className="text-[3em] font-bold">Card is not registered</h1>
              <Link href={`/register?c_id=${cardUuid}`}>
                <h2 className="underline text-primary text-[2rem] m-3 cursor-pointer">
                  Go here to register
                </h2>
              </Link>
            </>
          )}
        </div>
      </Layout>
    );

  return (
    <Layout title="View">
      <div className="text-center py-[20vh] min-h-[80vh]">
        {success.map((item: { url: string }) => (
          <div className="" key={item.url}>
            <embed className="w-screen h-screen m-auto" src={item.url}></embed>
          </div>
        ))}
      </div>
    </Layout>
  );
}
