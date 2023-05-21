export const metadata = {
    title: 'NFC Orange | View',
    description: 'NFC Orange | View'
}

export default function ViewLayout({ children }: { children: React.ReactNode; }) {

    return (
        <main className="bg-slate-50 h-screen">{children}</main>
    )
};


