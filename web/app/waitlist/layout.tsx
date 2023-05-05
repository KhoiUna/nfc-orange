import HeaderBar from '@/components/ui/HeaderBar';

export const metadata = {
    title: 'NFC Orange | Waitlist'
}

export default function WaitlistLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <HeaderBar title={metadata.title} />

            <main>{children}</main>
        </html>
    )
}