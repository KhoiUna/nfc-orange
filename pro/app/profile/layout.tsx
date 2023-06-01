import Analytics from "@/components/Analytics";
import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC Orange | Profile',
    description: 'NFC Orange | Get your digital business card & join our student community.'
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Analytics />

            <AppHeaderBar title={'Profile'} />

            <main className="bg-slate-50">{children}</main>
        </>
    );
};
