import AppHeaderBar from "@/components/ui/AppHeaderBar"

export const metadata = {
    title: 'Analytics | NFC Orange',
    description: 'NFC Orange | Get your digital business card & join our student community.'
};

export default async function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Analytics'} />

            <main className="min-h-screen bg-slate-50">
                {children}
            </main>
        </>
    );
};
