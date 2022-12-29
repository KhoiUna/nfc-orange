"use client";

import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppHeaderBar from "@/components/ui/AppHeaderBar";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeaderBar
        title="Dashboard"
        navLinks={[
          {
            href: "/api/logout",
            text: "Logout",
          },
        ]}
      />

      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
    </>
  );
}
