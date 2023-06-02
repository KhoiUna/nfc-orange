import AppHeaderBar from "@/components/ui/AppHeaderBar"
import { cookies } from 'next/headers';
import { NextRequest } from "next/server";
import { Suspense } from "react";

export const metadata = {
    title: 'Analytics | NFC Orange',
    description: 'NFC Orange | Get your digital business card & join our student community.'
};

export default async function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    const [isPremium] = await Promise.all([getIsPremium()])

    return (
        <>
            <AppHeaderBar title={'Analytics'} />

            <Suspense>
                <main className="min-h-screen bg-slate-50">
                    {isPremium}

                    {isPremium ? children :
                        // TODO: improve UI
                        <div className="font-semibold text-center from-primary to-[#FFF0C3] bg-gradient-to-t pt-8 text-2xl min-h-screen">
                            <p>This feature is only for Premium Users.</p>
                            <p>Please subscribe.</p>
                        </div>
                    }
                </main>
            </Suspense>
        </>
    );
};

async function getIsPremium(): Promise<boolean> {
    try {
        const req = new NextRequest(`${process.env.NEXT_PUBLIC_ORIGIN}/api/profile`)

        const cStore = cookies()
        const cookie = cStore.getAll()
        cookie.forEach(c => {
            req.cookies.set(c.name, c.value)
        })

        const data = await (await fetch(req, { cache: 'no-store' })).json()
        if (data.error) throw data.error

        return data.success.user.is_premium
    } catch (error) {
        console.error(error);
        return false
    }
}
