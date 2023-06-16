import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC Orange | Peers',
    description: 'NFC Orange | Modernize Career Fairs: Embrace the Paperless Revolution.'
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Peers'} />

            <main>{children}</main>
        </>
    );
};
