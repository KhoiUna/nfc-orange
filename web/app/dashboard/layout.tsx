import AppHeaderBar from "@/components/ui/AppHeaderBar";
import Analytics from "@/components/Analytics";

export const metadata = {
    title: 'NFC ORANGE | Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Analytics />

            <AppHeaderBar title={'Dashboard'} />

            <main className="max-h-screen overflow-auto bg-slate-50 min-h-screen">
                {children}
            </main>
        </>
    );
};
