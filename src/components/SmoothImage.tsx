"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SmoothImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
  containerClassName?: string;
  priority?: boolean;
  eager?: boolean;
  loadEffect?: "blur" | "blur-scale";
  fit?: "fill" | "intrinsic";
  scrollReveal?: boolean;
  staggerMs?: number;
  parallax?: boolean;
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

export function SmoothImage({
  alt,
  className,
  containerClassName,
  priority = false,
  eager = false,
  loadEffect = "blur-scale",
  fit = "fill",
  scrollReveal: scrollRevealProp,
  staggerMs = 0,
  parallax = false,
  onLoad,
  onError,
  src,
  loading: loadingProp,
  ...rest
}: SmoothImageProps) {
  const intrinsic = fit === "intrinsic";
  const eagerLoad = Boolean(priority || eager);
  const scrollReveal = scrollRevealProp ?? !eagerLoad;

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const prevSrcRef = useRef<string | number | undefined>(undefined);

  const [inView, setInView] = useState(!scrollReveal);
  const [slideIn, setSlideIn] = useState(!scrollReveal);
  const [loaded, setLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

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

  useEffect(() => {
    if (!scrollReveal) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "20% 0px 15% 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [scrollReveal]);

  useEffect(() => {
    if (!inView || !scrollReveal) {
      if (!scrollReveal) setSlideIn(true);
      return;
    }

    const delay = Math.min(staggerMs, 200);
    if (delay <= 0) {
      setSlideIn(true);
      return;
    }

    const id = window.setTimeout(() => setSlideIn(true), delay);
    return () => window.clearTimeout(id);
  }, [inView, staggerMs, scrollReveal]);

  useEffect(() => {
    if (!parallax || !slideIn) return;

    const node = containerRef.current;
    if (!node) return;

    let raf = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - viewportCenter) / window.innerHeight;
      setParallaxY(distance * -12);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [parallax, slideIn]);

  const shouldLoad = inView || eagerLoad;

  const imgClass = cn(
    "transition-opacity duration-300 ease-out",
    loaded ? "opacity-100" : "opacity-60"
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted/25",
        intrinsic ? "w-full" : "h-full w-full",
        containerClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-muted/40 transition-opacity duration-300 ease-out",
          loaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-0 h-full w-full",
          scrollReveal && "smooth-img-slide-up",
          scrollReveal && slideIn && "smooth-img-slide-up-visible"
        )}
        style={
          parallax
            ? {
                transform: `translate3d(0, ${parallaxY}px, 0)`,
                transition: "transform 0.25s ease-out",
              }
            : undefined
        }
      >
        {shouldLoad ? (
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
              "smooth-img block",
              intrinsic ? "h-auto w-full" : "h-full w-full object-cover",
              imgClass,
              className
            )}
            ref={setImgRef}
          />
        ) : null}
      </div>
    </div>
  );
}
