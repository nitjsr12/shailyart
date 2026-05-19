"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Sonner />
      {children}
    </>
  );
}
