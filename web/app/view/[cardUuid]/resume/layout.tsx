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

            <main className="bg-slate-50 min-h-screen">{children}</main>
        </>
    )
};


