"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { paintings, categories, Painting } from "@/data/paintings";
import { paintingGoogleReviewHighlights } from "@/data/googleReviews";

const PaintingCard = ({ painting }: { painting: Painting }) => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = "919990173104";
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ordering the painting "${painting.title}".`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <div className="aspect-square overflow-hidden">
          <img
            src={painting.image}
            alt={painting.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </a>

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-foreground/60 flex items-center justify-center gap-3 transition-opacity duration-300 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pointer-events-auto">
          <Button variant="gold" className="rounded-full font-medium">
            Order on WhatsApp
          </Button>
        </a>
      </div>

      {/* Info */}
      <div className="p-4 text-center">
        <h3 className="font-display text-lg font-medium text-foreground mt-1 mb-4">
          {painting.title}
        </h3>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
            Order via WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPaintings =
    activeCategory === "All"
      ? paintings
      : paintings.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-gradient-warm">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
            Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
            Available Paintings
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Browse our collection of original canvas paintings. Each piece is handcrafted 
            with love and ready to bring life to your space.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaintings.map((painting) => (
            <PaintingCard key={painting.id} painting={painting} />
          ))}
        </div>

        {/* Google reviews — paintings & canvas */}
        <div className="mt-20">
          <h3 className="font-display text-3xl font-semibold text-foreground text-center mb-4">
            What Google reviewers say about our work
          </h3>
          <p className="font-body text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Portraits, large canvas pieces, and learning across mediums — from people who bought or studied with ShailArt.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {paintingGoogleReviewHighlights.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/40"
              >
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="font-body text-foreground mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {[testimonial.location, "Google review"]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/gallery">
            <Button variant="elegant" size="lg">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
