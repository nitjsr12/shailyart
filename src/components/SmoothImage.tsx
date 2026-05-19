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
  /** Fade + lift into view when scrolled near the viewport (Camotions-style). */
  scrollReveal?: boolean;
  /** Delay reveal animation after entering view (ms), for staggered grids. */
  staggerMs?: number;
  /** Subtle vertical shift while scrolling (photography portfolio feel). */
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
  const [animateIn, setAnimateIn] = useState(!scrollReveal);
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
      { rootMargin: "12% 0px -4% 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [scrollReveal]);

  useEffect(() => {
    if (!inView || !scrollReveal) {
      if (!scrollReveal) setAnimateIn(true);
      return;
    }

    if (staggerMs <= 0) {
      setAnimateIn(true);
      return;
    }

    const id = window.setTimeout(() => setAnimateIn(true), staggerMs);
    return () => window.clearTimeout(id);
  }, [inView, staggerMs, scrollReveal]);

  useEffect(() => {
    if (!parallax || !animateIn || !loaded) return;

    const node = containerRef.current;
    if (!node) return;

    let raf = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - viewportCenter) / window.innerHeight;
      setParallaxY(distance * -18);
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
  }, [parallax, animateIn, loaded]);

  const shouldLoad = inView || eagerLoad;
  const revealed = animateIn && loaded;

  const imgMotionClass =
    loadEffect === "blur"
      ? cn(
          "transition-[filter] duration-image ease-out",
          revealed ? "blur-0" : "blur-md"
        )
      : cn(
          "transition-[filter,transform] duration-image ease-out",
          revealed ? "blur-0 scale-100" : "blur-sm scale-[1.03]"
        );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        intrinsic ? "w-full" : "h-full w-full",
        containerClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] overflow-hidden transition-opacity duration-700 ease-out",
          revealed ? "opacity-0" : "opacity-100"
        )}
        aria-hidden
      >
        <div className="smooth-img-shimmer absolute inset-0 bg-gradient-to-br from-muted/90 via-muted/50 to-muted/20" />
      </div>

      <div
        className={cn(
          "relative z-0 h-full w-full",
          scrollReveal && "smooth-img-scroll-wrap",
          scrollReveal && animateIn && "smooth-img-scroll-wrap-active",
          scrollReveal && revealed && "smooth-img-scroll-wrap-revealed"
        )}
        style={
          parallax
            ? {
                transform: `translate3d(0, ${parallaxY}px, 0)`,
                transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
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
              imgMotionClass,
              className
            )}
            ref={setImgRef}
          />
        ) : null}
      </div>
    </div>
  );
}
