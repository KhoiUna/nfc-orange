import Analytics from '@/components/Analytics';
import '@/styles/globals.css'

export const metadata = {
    title: 'NFC Orange | Home'
}

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <Analytics />

            <body>
                {children}
            </body>
        </html>
    )
}