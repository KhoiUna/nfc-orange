'use client'

import MarqueeBackground from "@/components/MarqueeBackground";
import AppHeaderBar from "@/components/ui/AppHeaderBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar
                title={'Dashboard'}
            />

            <main>
                <MarqueeBackground mode={"light"} />

                <div className="absolute top-[10%] z-[5] w-full max-h-screen overflow-auto">
                    {children}
                </div>
            </main>
        </>
    );
};
