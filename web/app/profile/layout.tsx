'use client'

import AppHeaderBar from "../../components/ui/AppHeaderBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
