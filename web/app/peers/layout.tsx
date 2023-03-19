'use client'

import AppHeaderBar from "@/components/ui/AppHeaderBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Peers'} />

            <main>{children}</main>
        </>
    );
};
