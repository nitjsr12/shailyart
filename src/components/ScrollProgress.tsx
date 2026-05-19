"use client";

import { useEffect, useState } from "react";

/** Thin top bar that fills as the user scrolls — modern portfolio cue. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-primary/80 via-accent to-primary/60 shadow-sm transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden
    />
  );
}
