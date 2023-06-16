'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQuery({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )
}