import { Icon } from "@iconify/react";
import Head from "next/head";
import { ReactNode } from "react";
import Analytics from "../components/Analytics";
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
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="NFC ORANGE" />
        <link rel="icon" href="/nfc-orange.svg" />
        <link rel="shortcut icon" href="/nfc-orange.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

      <Analytics />

      <HeaderBar title={title} />

      <main>{children}</main>

      <footer className="bg-primary py-[5%] px-[14%]" >
        <div className="flex flex-wrap justify-between items-start">
          <div className="flex flex-col flex-wrap justify-start max-w-lg">
            <div className="w-[12rem] h-fit">
              <Logo />
            </div>
          </div>

          <div className="flex flex-col flex-wrap text-white mt-12 sm:m-5 sm:mt-0">
            <p className="font-bold">CONTACT US</p>

            <div className="mt-3">
              <div className="flex items-center">
                <Icon icon="ant-design:mail-outlined" />
                <a
                  className="mx-3 font-light underline"
                  href="mailto:nfcorange1@gmail.com"
                >
                  nfcorange1@gmail.com
                </a>
              </div>

              {/* <div className="flex items-center">
                <Icon icon="ant-design:phone-outlined" />
                <a
                  className="mx-3 font-light underline mt-1"
                  href="tel:+84 948 230 033"
                >
                  +84 948 230 033
                </a>
              </div>

              <div className="flex items-center">
                <Icon icon="akar-icons:location" />
                <p className="mx-3 font-light mt-1">Florence, AL, US</p>
              </div> */}
            </div>
          </div>
        </div>

        <p className="text-sm text-white mt-5">
          <span>&copy; {new Date().getFullYear()}</span> | NFC Orange
        </p>
      </footer>
    </>
  );
};

export default Layout;
