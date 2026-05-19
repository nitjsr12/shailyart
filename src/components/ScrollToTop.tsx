"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={cn(
        "scroll-to-top fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "bg-primary text-primary-foreground shadow-elevated ring-2 ring-background/80",
        "hover:bg-primary/90 hover:scale-105 active:scale-95",
        visible && "scroll-to-top-visible"
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
