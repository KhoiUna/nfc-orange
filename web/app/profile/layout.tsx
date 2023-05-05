import Analytics from "@/components/Analytics";
import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC Orange | Profile'
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
