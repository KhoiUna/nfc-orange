import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import HeaderBar from "../components/ui/HeaderBar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const pageTitle = `nTap | ${title}`;

  return (
    <>
      <Head>
        <meta name="description" content="nTap | NFC for Professionals" />
        <link rel="icon" href="/ntap.svg" />
        <link rel="shortcut icon" href="/ntap.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

      <HeaderBar />

      <main>{children}</main>

      <footer className="bg-primary" style={{ padding: "4rem" }}>
        <div className="flex flex-wrap justify-between items-start">
          <div className="flex flex-col flex-wrap justify-start max-w-lg">
            <div>
              <Image
                className="cursor-pointer"
                src={"/ntap.svg"}
                alt="nTap logo"
                width={128}
                height={30}
              />
            </div>

            <p className="text-white text-left m-3 text-lg">
              NFC for Professionals
            </p>
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
