"use client";

import "@/styles/globals.css";
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement
    html.scrollTop = 0
  }, [])

  return (
    <>
      <header className="sticky top-0 z-10 shadow-xl">
        <nav className={`flex bg-primary p-3`}>
          <button className="flex text-white items-center" onClick={() => router.back()}>
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
        </nav>
      </header>

      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
    </>
  );
}
