import Head from "next/head";
import { ReactNode } from "react";
import Analytics from "../components/Analytics";
import HeaderBar from "../components/ui/HeaderBar";
import Footer from "@/components/ui/Footer";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const pageTitle = `NFC Orange | ${title}`;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="NFC Orange | Modernize Career Fairs: Embrace the Paperless Revolution." />
        <link rel="icon" href="/nfc-orange.svg" />
        <link rel="shortcut icon" href="/nfc-orange.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

      <Analytics />

      <HeaderBar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
