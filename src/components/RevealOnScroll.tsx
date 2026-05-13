"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay after intersecting (ms), for staggered grids */
  delayMs?: number;
};

export function RevealOnScroll({ children, className, delayMs = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timeoutId = window.setTimeout(() => setVisible(true), delayMs);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-on-scroll",
        visible && "reveal-on-scroll-visible",
        className
      )}
    >
      {children}
    </div>
  );
}
