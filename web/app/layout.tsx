import Analytics from '@/components/Analytics';
import ServiceWorker from '@/components/ServiceWorker';
import '@/styles/globals.css'

export const metadata = {
    title: 'NFC Orange | Home',
    description: 'Get your digital business card & join our student community.',
    metadataBase: new URL('https://www.nfcorange.com'),
    manifest: '/manifest.json',
    themeColor: '#FFF0C3',
    openGraph: {
        title: 'NFC Orange | Home',
        description: 'Get your digital business card & join our student community.',
        url: 'https://www.nfcorange.com',
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

            <ServiceWorker />

            <body>
                {children}
            </body>
        </html>
    )
}