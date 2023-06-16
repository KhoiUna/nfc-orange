import Analytics from "@/components/Analytics";
import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'Profile | NFC Orange',
    description: 'NFC Orange | Modernize Career Fairs: Embrace the Paperless Revolution.'
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
