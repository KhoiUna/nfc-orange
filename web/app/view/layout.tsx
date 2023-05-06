import HeaderBar from "@/components/ui/HeaderBar";

export const metadata = {
    title: 'NFC Orange | View',
    description: 'NFC Orange | View'
}

export default function ViewLayout({ children }: { children: React.ReactNode; }) {

    return (
        <>
            <HeaderBar title="Home" />

            <main className="bg-slate-50 min-h-screen">{children}</main>
        </>
    )
};


