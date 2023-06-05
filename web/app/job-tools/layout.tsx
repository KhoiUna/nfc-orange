import HeaderBar from "@/components/ui/HeaderBar";

export const metadata = {
    title: 'Job Tools | NFC Orange',
    description: 'Job tools that power ⚡ your job search | NFC Orange',
    metadataBase: new URL('https://www.nfcorange.com'),
    themeColor: '#FFF0C3',
    openGraph: {
        title: 'Job Tools | NFC Orange',
        description: 'Job tools that power ⚡ your job search | NFC Orange',
        url: 'https://www.nfcorange.com/job-tools',
        siteName: 'NFC Orange',
        images: [
            {
                url: '/images/job-tools.png',
                width: 512,
                height: 512,
            },
        ],
        locale: 'en-US',
        type: 'website',
    }
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
