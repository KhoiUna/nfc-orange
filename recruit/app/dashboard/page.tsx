"use client";

import { Suspense } from "react";
import TextLoader from "@/components/ui/TextLoader";

export default function Dashboard() {
  return (
    <Suspense fallback={<TextLoader loadingText="Loading" />}>
      <h2 className="text-xl mx-5 my-7">Hi, world!</h2>
    </Suspense>
  );
}
