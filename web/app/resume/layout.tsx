import Link from "next/link"

export const metadata = {
    title: 'NFC Orange | Resume'
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="sticky top-0 z-10 shadow-xl">
                <nav className={`flex bg-primary p-3`}>
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
                            <span className="p-2 text-white text-2xl">Back</span>
                        </button>
                    </Link>
                </nav>
            </header>

            <main className="pt-8 max-h-screen overflow-auto bg-slate-50">{children}</main>
        </>
    )
}