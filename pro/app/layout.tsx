import Analytics from '@/components/Analytics';
import '@/styles/globals.css'

export const metadata = {
    title: 'Pro | NFC Orange',
    description: 'Get your digital business card.',
    metadataBase: new URL('https://pro.nfcorange.com'),
    manifest: '/manifest.json',
    openGraph: {
        title: 'Pro | NFC Orange',
        description: 'Get your digital business card.',
        url: 'https://pro.nfcorange.com',
        siteName: 'NFC Orange',
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