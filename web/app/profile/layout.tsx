import Analytics from "@/components/Analytics";
import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC Orange | Profile'
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Analytics />

            <AppHeaderBar
                title={'Profile'}
            />

            <main>{children}</main>
        </>
    );
};
