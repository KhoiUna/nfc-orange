import Head from "next/head";
import { ReactNode, useEffect } from "react";
import AppHeaderBar from "../components/ui/AppHeaderBar";
import useAuth from "../lib/useAuth";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const AppLayout = ({ children, title }: LayoutProps) => {
  const pageTitle = `nTap | ${title}`;

  const { data } = useAuth({});
  const isAuthenticated = data?.isAuthenticated;

  if (!isAuthenticated)
    return (
      <Head>
        <meta name="description" content="nTap" />
        <link rel="icon" href="/ntap.svg" />
        <link rel="shortcut icon" href="/ntap.svg" type="image/x-icon" />

        <title>nTap | ...</title>
      </Head>
    );

  return (
    <>
      <Head>
        <meta name="description" content="nTap" />
        <link rel="icon" href="/ntap.svg" />
        <link rel="shortcut icon" href="/ntap.svg" type="image/x-icon" />

        <title>{pageTitle}</title>
      </Head>

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
