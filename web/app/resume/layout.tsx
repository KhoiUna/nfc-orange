import Link from "next/link"

export const metadata = {
    title: 'NFC Orange | Resume',
    description: 'NFC Orange | Get your digital business card & join our student community.'
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header id="header" className="sticky top-0 z-10">
                <nav className={`flex bg-primary p-2`}>
                    <Link href={'/dashboard'}>
                        <button className="flex text-white items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <span className="text-white text-xl p-2">Back</span>
                        </button>
                    </Link>
                </nav>
            </header>

            <main className="pt-20 h-screen max-h-screen overflow-y-auto bg-slate-50">{children}</main>
        </>
    )
}