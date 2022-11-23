import Script from "next/script";

const Analytics = () => {
  if (process.env.NEXT_PUBLIC_PRODUCTION !== "true") return <></>;

  return (
    <>
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

      {/* umami analytics */}
      <Script
        async
        defer
        data-website-id="5f98fbbd-8df1-4837-b2cc-9595c3f4fb00"
        src="https://umami.khoiuna.info/umami.js"
      />
    </>
  );
};

export default Analytics;
