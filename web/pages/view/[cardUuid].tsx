import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import TextLoader from "../../components/ui/TextLoader";
import Layout from "../../containers/Layout";
import { swrFetcher } from "../../lib/swrFetcher";
import { useEffect } from "react";
import ViewLayout from "../../containers/ViewLayout";
import { useCookies } from "react-cookie";
import PDFViewer from "../../components/PDFViewer";

export default function View() {
  const router = useRouter();
  const { cardUuid } = router.query;

  const { data } = useSWR(cardUuid && `/api/view?c_id=${cardUuid}`, swrFetcher);

  // Update scan history
  const [cookies, setCookie, removeCookie] = useCookies(["viewed"]);
  useEffect(() => {
    // If card is valid & cookies.viewed not set & code is production
    if (
      data?.success.length > 0 &&
      !cookies.viewed &&
      process.env.NEXT_PUBLIC_PRODUCTION === "true"
    ) {
      const cookieOption = {
        maxAge: 60, // 1 minute
        path: "/view",
        secure: process.env.NEXT_PUBLIC_PRODUCTION === "true",
        sameSite: true,
        httpOnly: false,
      };
      setCookie("viewed", true, cookieOption);

      // Fetch POST to api to update scan history
      fetch(`/api/view/scan?c_id=${cardUuid}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }, [setCookie, cookies, data, cardUuid]);

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
      <Layout
        title={
          error === "register" ? "View - Please Register" : "View - Invalid"
        }
      >
        <div id="parallax" className="text-center py-[20vh] min-h-[80vh] m-0">
          {error === "invalid" && (
            <h1
              className="text-white text-[3em] font-bold"
              style={{
                textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Invalid card
            </h1>
          )}
          {error === "register" && (
            <>
              <h1
                className="text-[3em] text-white font-bold"
                style={{
                  textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                Card is not registered
              </h1>
              <Link href={`/register?c_id=${cardUuid}`} legacyBehavior>
                <h2 className="underline text-white text-[2rem] mt-3 cursor-pointer">
                  Go here to register
                </h2>
              </Link>
            </>
          )}
        </div>
      </Layout>
    );

  if (success.length === 0)
    return (
      <Layout title="View">
        <div className="text-center py-[20vh] min-h-[80vh] m-4">
          <h1 className="text-[3em] font-bold">No document uploaded</h1>
        </div>
      </Layout>
    );

  return (
    <ViewLayout title="View">
      <div className="text-center">
        <PDFViewer pdfURL={success[0].url} />
      </div>
    </ViewLayout>
  );
}
