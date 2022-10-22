import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";
import Logo from "../components/Logo";
import HeaderBar from "../components/ui/HeaderBar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
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

      <HeaderBar />

      <main>{children}</main>

      <footer className="bg-primary" style={{ padding: "4rem" }}>
        <div className="flex flex-wrap justify-between items-start">
          <div className="flex flex-col flex-wrap justify-start max-w-lg">
            <div className="w-[12rem] h-fit">
              <Logo />
            </div>
          </div>

          {/* TODO: contact */}
          {/* <div className="flex flex-col flex-wrap text-white m-3">
            <p className="font-bold">CONTACT US</p>

            <div className="mt-3">
              <div className="flex items-center">
                <Icon icon="ant-design:mail-outlined" />
                <a className="mx-3 font-light" href="mailto:info@vucar.net">
                  info@vucar.net
                </a>
              </div>
              <div className="flex items-center">
                <Icon icon="ant-design:phone-outlined" />
                <a className="mx-3 font-light" href="tel:+84 948 230 033">
                  +84 948 230 033
                </a>
              </div>
              <div className="flex items-center">
                <Icon icon="akar-icons:location" />
                <p className="mx-3 font-light">
                  Thành phố Hồ Chí Minh, Việt Nam
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Layout;
