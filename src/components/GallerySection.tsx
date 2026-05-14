"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Quote, MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { paintings, categories, type Painting } from "@/data/paintings";
import { homepageGalleryItems } from "@/data/homepageGallery";
import { paintingGoogleReviewHighlights } from "@/data/googleReviews";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SmoothImage } from "@/components/SmoothImage";

const whatsappNumber = "919990173104";

type GalleryCardItem = Pick<Painting, "title" | "category" | "image"> & { id: string | number };

const PaintingCard = ({ item }: { item: GalleryCardItem }) => {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ordering the painting "${item.title}".`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-border/50 bg-card/70 shadow-sm backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        "hover:border-primary/25 hover:shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.18)] hover:-translate-y-0.5"
      )}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-square overflow-hidden"
      >
        <SmoothImage
          src={item.image}
          alt={item.title}
          loadEffect="blur-scale"
          containerClassName="absolute inset-0 size-full"
          className="transition-transform duration-image ease-out group-hover:scale-[1.05]"
        />
        {/* Depth + readability */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-foreground/10 opacity-70 transition-opacity duration-500 group-hover:opacity-90"
          aria-hidden
        />
        <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full border border-white/25 bg-white/85 px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/80 shadow-sm backdrop-blur-md">
          {item.category}
        </span>
        {/* Hover: compact CTA */}
        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-white/40",
              "bg-white/95 px-3.5 py-2 font-body text-xs font-semibold text-foreground shadow-lg",
              "translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out"
            )}
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#128C7E]" aria-hidden />
            Order on WhatsApp
          </span>
        </div>
      </a>

      <div className="flex items-center gap-2 border-t border-border/40 bg-gradient-to-br from-card to-secondary/25 px-3 py-2.5">
        <h3 className="min-w-0 flex-1 truncate font-display text-sm font-semibold leading-snug text-foreground md:text-[0.95rem]">
          {item.title}
        </h3>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5",
            "font-body text-[11px] font-semibold tracking-wide text-white",
            "bg-gradient-to-r from-[#128C7E] to-[#25D366] shadow-sm",
            "transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          <MessageCircle className="h-3 w-3 opacity-90" aria-hidden />
          WhatsApp
        </a>
      </div>
    </article>
  );
};

type GallerySectionProps = {
  /** Home: curated studio photos only. Full: catalog + filters (e.g. /gallery). */
  variant?: "home" | "full";
};

const GallerySection = ({ variant = "full" }: GallerySectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const isHome = variant === "home";

  const catalogItems: GalleryCardItem[] = isHome
    ? homepageGalleryItems
    : activeCategory === "All"
      ? paintings
      : paintings.filter((p) => p.category === activeCategory);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* Section header */}
        <RevealOnScroll>
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Collection
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Available Paintings
              </span>
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              {isHome
                ? "A glimpse of recent work in the studio — originals and commissions. Browse the full collection anytime."
                : "Original canvas work — curated tones, quiet motion, and pieces chosen to feel at home on a modern wall."}
            </p>
          </div>
        </RevealOnScroll>

        {/* Category chips (full gallery only) */}
        {!isHome && (
          <RevealOnScroll delayMs={40}>
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:mb-12">
              {categories.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "rounded-full border font-body text-xs font-medium transition-all duration-300 ease-out",
                      "h-8 px-3.5 tracking-wide",
                      active
                        ? "border-transparent bg-gradient-to-r from-primary to-primary/85 text-primary-foreground shadow-md shadow-primary/20"
                        : "border-border/60 bg-background/70 text-muted-foreground backdrop-blur-sm hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>
        )}

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {catalogItems.map((item, index) => (
            <RevealOnScroll key={item.id} delayMs={index * 55}>
              <PaintingCard item={item} />
            </RevealOnScroll>
            
          ))}
        </div>
        <RevealOnScroll delayMs={60}>
          <div className="mt-10 flex justify-center md:mt-12">
            <Button variant="outline" size="sm" className="group rounded-full border-primary/30 bg-background/80 px-5 shadow-sm backdrop-blur-sm hover:bg-primary hover:text-primary-foreground" asChild>
              <Link href="/gallery" className="gap-2">
                {isHome ? "View more" : "View full gallery"}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          </div>
        </RevealOnScroll>

        {/* Google reviews */}
        <RevealOnScroll className="mt-20 md:mt-24">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Loved on Google
            </h3>
            <p className="mt-3 font-body text-sm text-muted-foreground md:text-[0.9375rem]">
              Portraits, large canvas pieces, and learning across mediums — from collectors and students.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {paintingGoogleReviewHighlights.map((testimonial, index) => (
              <RevealOnScroll key={`${testimonial.name}-${index}`} delayMs={index * 75}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-border/40 p-5",
                    "bg-gradient-to-br from-card/90 via-card to-secondary/30 shadow-sm backdrop-blur-sm",
                    "transition-all duration-500 hover:border-primary/20 hover:shadow-lg"
                  )}
                >
                  <Quote className="mb-3 h-6 w-6 text-primary/35" aria-hidden />
                  <p className="flex-1 font-body text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="mt-3 border-t border-border/30 pt-3">
                    <p className="font-display text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {[testimonial.location, "Google"].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>

        {/* View more / full gallery — bottom */}
        
      </div>
    </section>
  );
};

export default GallerySection;
