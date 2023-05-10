import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC ORANGE | Dashboard',
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
