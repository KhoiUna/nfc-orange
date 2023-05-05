import { ReactNode } from "react";
import HeaderBar from "@/components/ui/HeaderBar";

export const metadata = {
    title: 'NFC Orange | View',
    description: 'NFC Orange | View'
}

interface LayoutProps {
    children: ReactNode | ReactNode[];
    title: string;
}

export default function ViewLayout({ children }: LayoutProps) {

    return (
        <>
            <HeaderBar title="Home" />

            <main className="bg-slate-50 min-h-screen">{children}</main>
        </>
    )
};


