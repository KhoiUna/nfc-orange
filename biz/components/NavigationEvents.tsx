'use client'

import { UsermavenClient, usermavenClient } from '@usermaven/sdk-js';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function NavigationEventsImplementation() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const usermaven: UsermavenClient = usermavenClient({
            key: process.env.NEXT_PUBLIC_USERMAVEN_API_KEY as string,
            tracking_host: "https://events.usermaven.com",
        });

        usermaven.track("pageview");

        return () => {
            usermaven.track("pageview");
        };
    }, [pathname, searchParams]);

    return <></>
}

export default function NavigationEvents() {
    return (
        <Suspense fallback={null}>
            <NavigationEventsImplementation />
        </Suspense>
    );
}