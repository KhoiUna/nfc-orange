import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "../components/Logo";
import { HEADER_BAR_BG_COLOR } from "../components/ui/HeaderBar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const ViewLayout = ({ children, title }: LayoutProps) => {
  const pageTitle = `nTap | ${title}`;

  return (
    <>
      <Head>
        <meta name="description" content="nTap" />
        <link rel="icon" href="/ntap.svg" />
        <link rel="shortcut icon" href="/ntap.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

      <div className={`bg-slate-200 sm:w-screen w-max`}>
        <header
          className={`w-[100%] flex justify-center p-2 ${HEADER_BAR_BG_COLOR}`}
        >
          <Link href="/">
            <div className="w-[5rem] h-fit cursor-pointer">
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
