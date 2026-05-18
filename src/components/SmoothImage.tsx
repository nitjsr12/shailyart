"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SmoothImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
  /** Wraps the image (e.g. `absolute inset-0 h-full w-full` for hero fill). */
  containerClassName?: string;
  /** Hero / LCP: eager load and high fetch priority. */
  priority?: boolean;
  /** Start download immediately (above-the-fold). */
  eager?: boolean;
  /**
   * `blur` — soft blur only until loaded (pairs with CSS that animates `transform` on the hero).
   * `blur-scale` — blur + slight scale for gallery cards.
   */
  loadEffect?: "blur" | "blur-scale";
  /** `fill` = cover a fixed box; `intrinsic` = natural image height (masonry). */
  fit?: "fill" | "intrinsic";
};

function syncLoadedFromImage(el: HTMLImageElement | null, setLoaded: (v: boolean) => void) {
  if (!el) return;
  if (el.complete && el.naturalHeight > 0) {
    setLoaded(true);
    return;
  }
  if (el.complete && el.naturalHeight === 0 && typeof el.decode === "function") {
    el.decode().then(() => setLoaded(true)).catch(() => setLoaded(true));
  }
}

/**
 * Soft blur → sharp when the image has pixels. Image stays **opacity:100** so we never get an
 * invisible image if `load` fires before React’s `onLoad` or ref timing is odd.
 */
export function SmoothImage({
  alt,
  className,
  containerClassName,
  priority = false,
  eager = false,
  loadEffect = "blur-scale",
  fit = "fill",
  onLoad,
  onError,
  src,
  loading: loadingProp,
  ...rest
}: SmoothImageProps) {
  const intrinsic = fit === "intrinsic";
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const prevSrcRef = useRef<string | number | undefined>(undefined);

  const setImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (node) syncLoadedFromImage(node, setLoaded);
    },
    [src]
  );

  useLayoutEffect(() => {
    const el = imgRef.current;
    if (src == null || src === "") return;

    const prev = prevSrcRef.current;
    prevSrcRef.current = src;
    if (prev !== undefined && prev !== src) {
      setLoaded(false);
    }

    syncLoadedFromImage(el, setLoaded);
  }, [src]);

  const motionClass =
    loadEffect === "blur"
      ? cn(
          "opacity-100 transition-[filter] duration-700 ease-out",
          loaded ? "blur-0" : "blur-md"
        )
      : cn(
          "opacity-100 transition-[filter,transform] duration-1000 ease-out",
          loaded ? "blur-0 scale-100" : "blur-sm scale-[1.02]"
        );

  const eagerLoad = Boolean(priority || eager);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/30",
        intrinsic ? "w-full" : "h-full w-full",
        containerClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-muted/90 via-muted/40 to-transparent transition-opacity duration-500 ease-out",
          loaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden
      />
      <img
        {...rest}
        alt={alt}
        src={src}
        loading={eagerLoad ? "eager" : loadingProp ?? "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={cn(
          "smooth-img relative z-0",
          intrinsic ? "block h-auto w-full" : "h-full w-full object-cover",
          motionClass,
          className
        )}
        ref={setImgRef}
      />
    </div>
  );
}
