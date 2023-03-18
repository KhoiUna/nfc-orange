'use client'

import Analytics from "@/components/Analytics";
import AppHeaderBar from "../../components/ui/AppHeaderBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <head>
                <meta name="description" content="NFC ORANGE" />
                <link rel="icon" href="/nfc-orange.svg" />
                <link rel="shortcut icon" href="/nfc-orange.svg" type="image/x-icon" />

                <title>NFC ORANGE | Profile</title>

                <Analytics />
            </head>

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
        </html>
    );
};

export default Layout;
