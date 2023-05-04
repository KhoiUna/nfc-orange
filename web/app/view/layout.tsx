import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/components/Logo";
import Analytics from "@/components/Analytics";

export const metadata = {
    title: 'NFC Orange | View'
}

interface LayoutProps {
    children: ReactNode | ReactNode[];
    title: string;
}

export default function ViewLayout({ children }: LayoutProps) {

    return (
        <>
            <Analytics />

            <div>
                <header className={`flex justify-center p-3 bg-primary`}>
                    <Link href="/">
                        <div className="w-[10rem] pt-2 h-fit cursor-pointer">
                            <Logo />
                        </div>
                    </Link>
                </header>

                <main className="bg-slate-50 min-h-screen">{children}</main>
            </div>
        </>
    )
};


