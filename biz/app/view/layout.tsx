export const metadata = {
    title: 'NFC Orange | View',
    description: 'NFC Orange | Get your digital business card & join our student community.'
}

export default function ViewLayout({ children }: { children: React.ReactNode; }) {

    return (
        <main className="bg-slate-50 min-h-screen">{children}</main>
    )
};

