'use client'

import AppHeaderBar from "@/components/ui/AppHeaderBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar
                title={'Dashboard'}
            />

            <main className="max-h-screen overflow-auto">
                {children}
            </main>
        </>
    );
};
