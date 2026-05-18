"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Quote, MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  studioGalleryItems,
  studioGalleryCategories,
  type StudioGalleryItem,
} from "@/data/studioGallery";
import { paintingGoogleReviewHighlights } from "@/data/googleReviews";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SmoothImage } from "@/components/SmoothImage";

const whatsappNumber = "919990173104";

function buildWhatsappUrl(title: string) {
  const message = encodeURIComponent(`Hi, I'm interested in ordering the painting "${title}".`);
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

type GalleryCardProps = {
  item: StudioGalleryItem;
  eager?: boolean;
  layout: "compact" | "showcase";
};

const GalleryCard = ({ item, eager, layout }: GalleryCardProps) => {
  const isShowcase = layout === "showcase";
  const url = buildWhatsappUrl(item.title);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border/40",
        "transition-all duration-500 ease-out hover:shadow-xl hover:ring-primary/25",
        isShowcase && "mb-6 break-inside-avoid"
      )}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        
        <div className={cn("relative overflow-hidden", !isShowcase && "aspect-[4/5]")}>
          <SmoothImage
            src={item.image}
            alt={`${item.title} — Shaily Verma with original artwork`}
            eager={eager}
            fit={isShowcase ? "intrinsic" : "fill"}
            loadEffect="blur-scale"
            containerClassName={isShowcase ? undefined : "absolute inset-0 size-full"}
            className={cn(
              isShowcase ? "w-full" : "object-cover object-center",
              "transition-transform duration-image ease-out group-hover:scale-[1.02]"
            )}
          />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            aria-hidden
          />

          <span className="pointer-events-none absolute left-3 top-3 z-[2] rounded-full bg-white/92 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider text-foreground/85 shadow-sm">
            {item.category}
          </span>

          <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-3 p-4">
            <h3
              className={cn(
                "font-display font-semibold leading-snug text-white",
                isShowcase ? "text-lg md:text-xl" : "text-base"
              )}
            >
              {item.title}
            </h3>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full bg-[#25D366] px-3 py-1.5",
                "font-body text-[11px] font-semibold text-white shadow-lg",
                "opacity-100 md:opacity-0 md:translate-y-1 md:transition-all md:duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0"
              )}
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              Order
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};

type GallerySectionProps = {
  variant?: "home" | "full";
};

const GallerySection = ({ variant = "full" }: GallerySectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const isHome = variant === "home";
  const layout = isHome ? "compact" : "showcase";

  const catalogItems =
    activeCategory === "All"
      ? studioGalleryItems
      : studioGalleryItems.filter((p) => p.category === activeCategory);

  return (
    <section className={cn("relative overflow-hidden", isHome ? "py-24" : "pb-24 pt-6")}>
      
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {isHome && (
          <RevealOnScroll>
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Collection
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Available Paintings
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                Original work from the studio — devotional pieces, portraits, and commissions.
              </p>
            </div>
          </RevealOnScroll>
        )}

        {!isHome && (
          <RevealOnScroll delayMs={30}>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 md:mb-10">
              {studioGalleryCategories.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "rounded-full border font-body text-xs font-medium transition-all duration-300",
                      "h-9 px-4",
                      active
                        ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                        : "border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>
        )}

        <RevealOnScroll delayMs={isHome ? 40 : 20}>
          <div
            className={cn(
              isHome
                ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                : "columns-1 sm:columns-2 lg:columns-3"
            )}
          >
            {catalogItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} eager={index < 3} layout={layout} />
            ))}
          </div>
        </RevealOnScroll>

        {catalogItems.length === 0 && (
          <p className="py-16 text-center font-body text-muted-foreground">
            No pieces in this category yet.
          </p>
        )}

        <RevealOnScroll className="mt-20 md:mt-24">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              Loved on Google
            </h3>
            <p className="mt-3 font-body text-sm text-muted-foreground">
              From collectors and students across mediums.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {paintingGoogleReviewHighlights.map((testimonial, index) => (
              <RevealOnScroll key={`${testimonial.name}-${index}`} delayMs={index * 75}>
                <div className="flex h-full flex-col rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                  <Quote className="mb-3 h-6 w-6 text-primary/35" aria-hidden />
                  <p className="flex-1 font-body text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="mt-3 border-t border-border/30 pt-3">
                    <p className="font-display text-sm font-semibold">{testimonial.name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {[testimonial.location, "Google"].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>

        {isHome && (
          <RevealOnScroll delayMs={60}>
            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/gallery" className="gap-2">
                  View full gallery
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
