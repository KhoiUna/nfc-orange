import ReactQuery from "@/components/ReactQuery";
import HeaderBar from "@/components/ui/HeaderBar";
import "@/styles/globals.css";

export const metadata = {
  title: 'Recruit | NFC Orange',
  description: 'Modernize Career Fairs: Embrace the Paperless Revolution.',
  metadataBase: new URL('https://www.nfcorange.com'),
  manifest: '/manifest.json',
  themeColor: '#FFF0C3',
  openGraph: {
    title: 'Recruit | NFC Orange',
    description: 'Modernize Career Fairs: Embrace the Paperless Revolution.',
    url: 'https://www.nfcorange.com',
    siteName: 'NFC Orange',
    images: [
      {
        url: '/images/product.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en-US',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />

      <body>
        <HeaderBar />

        <ReactQuery>
          <main>{children}</main>
        </ReactQuery>
      </body>
    </html>
  );
}
