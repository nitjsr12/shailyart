"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type SmoothImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
  /** Wraps the image (e.g. `absolute inset-0 h-full w-full` for hero fill). */
  containerClassName?: string;
  /** Hero / LCP: eager load and high fetch priority. */
  priority?: boolean;
  /**
   * `blur` — opacity + blur only (use behind CSS keyframes that animate `transform`, e.g. hero drift).
   * `blur-scale` — adds a slight scale for a softer reveal (gallery cards).
   */
  loadEffect?: "blur" | "blur-scale";
};

/**
 * Fade-in from soft blur when the image finishes loading (editorial / portfolio sites).
 * Respects prefers-reduced-motion.
 */
export function SmoothImage({
  alt,
  className,
  containerClassName,
  priority = false,
  loadEffect = "blur-scale",
  onLoad,
  onError,
  ...props
}: SmoothImageProps) {
  const [loaded, setLoaded] = useState(false);

  const motionEnter = {
    blur: loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
    "blur-scale": loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-[1.02]",
  }[loadEffect];

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-muted/40",
        containerClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-muted/90 via-muted/40 to-transparent transition-opacity duration-700 ease-out",
          loaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden
      />
      <img
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={cn(
          "smooth-img relative z-0 h-full w-full object-cover transition-[opacity,filter,transform] duration-1000 ease-out",
          motionEnter,
          className
        )}
      />
    </div>
  );
}
