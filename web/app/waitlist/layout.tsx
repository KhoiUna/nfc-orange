import HeaderBar from '@/components/ui/HeaderBar';
import '@/styles/globals.css'

export const metadata = {
    title: 'NFC Orange | Waitlist'
}

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <HeaderBar title={metadata.title} />

            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}