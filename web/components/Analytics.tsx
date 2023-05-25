import Script from "next/script";
import NavigationEvents from "./NavigationEvents";

const Analytics = () => {
  if (process.env.NEXT_PUBLIC_PRODUCTION !== "true") return <></>;

  return (
    <>
      {/* Tracking with Usermaven */}
      <NavigationEvents />

      {/* Google tag (gtag.js)  */}
      <Script
        async
        strategy="afterInteractive"
        src={"https://www.googletagmanager.com/gtag/js?id=G-JHYW0T0JLC"}
      />
      <Script
        id="google_analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-JHYW0T0JLC');`,
        }}
      />
    </>
  );
};

export default Analytics;
