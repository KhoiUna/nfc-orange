import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC ORANGE | Dashboard',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Dashboard'} />

            <main className="min-h-screen bg-slate-50">
                {children}
            </main>
        </>
    );
};
