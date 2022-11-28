import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import Analytics from "../components/Analytics";
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
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="NFC ORANGE" />
        <link rel="icon" href="/nfc-orange.svg" />
        <link rel="shortcut icon" href="/nfc-orange.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

      <Analytics />

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

        <main className="p-8">{children}</main>
      </div>
    </>
  );
};

export default ViewLayout;
