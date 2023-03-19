import Head from "next/head";
import { ReactNode } from "react";
import Analytics from "../components/Analytics";
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
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

      <Analytics />

      <AppHeaderBar title={title} />

      <main className="max-h-screen overflow-auto">{children}</main>
    </>
  );
};

export default AppLayout;
