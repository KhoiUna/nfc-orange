import AppHeaderBar from "@/components/ui/AppHeaderBar"
import { Suspense } from "react";

export const metadata = {
    title: 'Analytics | NFC Orange',
    description: 'NFC Orange | Get your digital business card & join our student community.'
};

export default async function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Analytics'} />

            <Suspense>
                <main className="min-h-screen bg-slate-50">
                    {children}
                </main>
            </Suspense>
        </>
    );
};
