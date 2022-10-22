import Head from "next/head";
import Script from "next/script";
import { ReactNode, useEffect } from "react";
import AppHeaderBar from "../components/ui/AppHeaderBar";
import useAuth from "../lib/useAuth";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const AppLayout = ({ children, title }: LayoutProps) => {
  const pageTitle = `NFC ORANGE | ${title}`;

  const { data } = useAuth({});
  const isAuthenticated = data?.isAuthenticated;

  if (!isAuthenticated)
    return (
      <Head>
        <meta name="description" content="NFC ORANGE" />
        <link rel="icon" href="/nfc-orange.svg" />
        <link rel="shortcut icon" href="/nfc-orange.svg" type="image/x-icon" />

        <title>NFC ORANGE | ...</title>
      </Head>
    );

  return (
    <>
      <Head>
        <meta name="description" content="NFC ORANGE" />
        <link rel="icon" href="/nfc-orange.svg" />
        <link rel="shortcut icon" href="/nfc-orange.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

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
        data-website-id="47dbc34e-c03e-482a-8aef-2a0a8dd9fe90"
        src="https://umami.khoiuna.info/umami.js"
      />

      <AppHeaderBar
        title={title}
        navLinks={[
          {
            href: "/api/logout",
            text: "Logout",
          },
        ]}
      />

      <main>{children}</main>
    </>
  );
};

export default AppLayout;
