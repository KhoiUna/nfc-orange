import AppHeaderBar from "@/components/ui/AppHeaderBar"
import Script from "next/script";

export const metadata = {
    title: 'Analytics | NFC Orange',
    description: 'NFC Orange | Modernize Career Fairs: Embrace the Paperless Revolution.'
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeaderBar title={'Analytics'} />

            <main className="min-h-screen bg-slate-50">
                {children}
            </main>

            <Script async strategy="afterInteractive" src="https://js.stripe.com/v3/buy-button.js" />
        </>
    );
};
