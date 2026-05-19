"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Sonner />
      {children}
    </>
  );
}
