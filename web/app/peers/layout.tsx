import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC Orange | Peers'
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Peers'} />

            <main>{children}</main>
        </>
    );
};
