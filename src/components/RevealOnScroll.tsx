"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fade-up"
  | "blur-up"
  | "scale-up"
  | "clip-up"
  | "slide-left"
  | "slide-right"
  | "fade";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay after intersecting (ms), for staggered grids */
  delayMs?: number;
  /** Animation style */
  variant?: RevealVariant;
  /** Slower, more dramatic motion */
  duration?: "normal" | "slow";
};

const variantClass: Record<RevealVariant, string> = {
  "fade-up": "reveal-variant-fade-up",
  "blur-up": "reveal-variant-blur-up",
  "scale-up": "reveal-variant-scale-up",
  "clip-up": "reveal-variant-clip-up",
  "slide-left": "reveal-variant-slide-left",
  "slide-right": "reveal-variant-slide-right",
  fade: "reveal-variant-fade",
};

export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  variant = "fade-up",
  duration = "normal",
}: RevealOnScrollProps) {
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
      { rootMargin: "10% 0px -5% 0px", threshold: 0.06 }
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
        variantClass[variant],
        duration === "slow" && "reveal-duration-slow",
        visible && "reveal-on-scroll-visible",
        className
      )}
    >
      {children}
    </div>
  );
}
