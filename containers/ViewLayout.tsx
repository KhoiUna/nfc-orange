import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { ReactNode } from "react";
import Logo from "../components/Logo";
import { HEADER_BAR_BG_COLOR } from "../components/ui/HeaderBar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const ViewLayout = ({ children, title }: LayoutProps) => {
  const pageTitle = `NFC ORANGE | ${title}`;

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

      <div className={`bg-slate-200 sm:w-screen w-max`}>
        <header
          className={`w-[100%] flex justify-center p-2 ${HEADER_BAR_BG_COLOR}`}
        >
          <Link href="/">
            <div className="w-[10rem] pt-2 h-fit cursor-pointer">
              <Logo />
            </div>
          </Link>
        </header>

        <main className="m-4">{children}</main>
      </div>
    </>
  );
};

export default ViewLayout;
