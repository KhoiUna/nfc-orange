import Script from "next/script";
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

const Analytics = () => {
  if (process.env.NEXT_PUBLIC_PRODUCTION !== "true") return <></>;

  return (
    <>
      {/* Tracking with Usermaven */}
      {/* <NavigationEvents /> */}

      <VercelAnalytics />

      {/* Google tag (gtag.js) */}
      <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1SWNJQ1DSE" />
      <Script
        id="google_analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1SWNJQ1DSE');`
        }}
      />
    </>
  );
};

export default Analytics;
