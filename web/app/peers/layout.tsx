import AppHeaderBar from "@/components/ui/AppHeaderBar";

export const metadata = {
    title: 'NFC Orange | Peers',
    description: 'NFC Orange | Get your digital business card & join our student community.'
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Peers'} />

            <main>{children}</main>
        </>
    );
};
