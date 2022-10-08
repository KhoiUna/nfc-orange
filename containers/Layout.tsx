import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import HeaderBar, { LOGO_HEIGHT, LOGO_WIDTH } from "../components/ui/HeaderBar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const ENLARGE_RATIO = 1.7;

const Layout = ({ children, title }: LayoutProps) => {
  const pageTitle = `nTap | ${title}`;

  return (
    <>
      <Head>
        <meta name="description" content="nTap" />
        <link rel="icon" href="/ntap.svg" />
        <link rel="shortcut icon" href="/ntap.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

      <HeaderBar />

      <main>{children}</main>

      <footer className="bg-primary" style={{ padding: "4rem" }}>
        <div className="flex flex-wrap justify-between items-start">
          <div className="flex flex-col flex-wrap justify-start max-w-lg">
            <div className="w-fit">
              <Image
                className="cursor-pointer"
                src={"/ntap.svg"}
                alt="nTap logo"
                width={LOGO_WIDTH * ENLARGE_RATIO}
                height={LOGO_HEIGHT * ENLARGE_RATIO}
              />
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
