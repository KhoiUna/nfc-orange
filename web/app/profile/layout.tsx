'use client'

import { ReactNode } from "react";
import AppHeaderBar from "../../components/ui/AppHeaderBar";

interface LayoutProps {
    children: ReactNode | ReactNode[];
    title: string;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <AppHeaderBar
                title={'Profile'}
                navLinks={[
                    {
                        href: "/dashboard",
                        text: "Dashboard",
                    },
                    {
                        href: "/profile",
                        text: "Profile",
                    },
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

export default Layout;
