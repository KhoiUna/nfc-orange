import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'Dashboard | NFC Orange',
    description: 'NFC Orange | Get your digital business card & join our student community.'
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
