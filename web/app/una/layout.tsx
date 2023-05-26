import HeaderBar from "@/components/ui/HeaderBar"

export const metadata = {
    title: 'Create your card | NFC Orange',
    description: 'NFC Orange | Create your own digital business card for University of North Alabama students.',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
}

export default function CreateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderBar />

            <main>
                {children}
            </main>
        </>
    )
}