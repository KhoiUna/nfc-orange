import Analytics from '@/components/Analytics';
import '@/styles/globals.css'

export const metadata = {
    title: 'NFC Orange | Home',
    description: 'NFC Orange | Get your digital business card & join our student community.',
    metadataBase: new URL('https://www.nfcorange.com'),
    openGraph: {
        images: [
            {
                url: '/images/mockup.png',
                width: 512,
                height: 512,
            },
        ],
        locale: 'en-US',
        type: 'website',
    }
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