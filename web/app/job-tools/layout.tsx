import HeaderBar from "@/components/ui/HeaderBar";

export const metadata = {
    title: 'Job Tools | NFC Orange',
    description: 'NFC Orange | Get your digital business card & join our student community.'
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderBar />

            <main className="pt-12 min-h-screen bg-slate-50">
                {children}
            </main>
        </>
    );
};
