export const metadata = {
    title: 'NFC Orange | View',
    description: 'NFC Orange | Modernize Career Fairs: Embrace the Paperless Revolution.'
}

export default function ViewLayout({ children }: { children: React.ReactNode; }) {

    return (
        <main className="bg-slate-50 min-h-screen">{children}</main>
    )
};


