"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { paintings, categories, Painting } from "@/data/paintings";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const PaintingCard = ({ painting }: { painting: Painting }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const lowestPrice = Math.min(...painting.sizes.map(s => s.price));
  const defaultSize = painting.sizes.find(s => s.inStock) || painting.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(painting, defaultSize);
    toast.success(`"${painting.title}" added to cart!`);
  };

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Link href={`/painting/${painting.slug}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={painting.image}
            alt={painting.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-foreground/60 flex items-center justify-center gap-3 transition-opacity duration-300 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <Link href={`/painting/${painting.slug}`} className="pointer-events-auto">
          <Button variant="secondary" size="icon" className="rounded-full">
            <Eye className="h-5 w-5" />
          </Button>
        </Link>
        <Button 
          variant="gold" 
          size="icon" 
          className="rounded-full pointer-events-auto"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
          {painting.category}
        </span>
        <Link href={`/painting/${painting.slug}`}>
          <h3 className="font-display text-lg font-medium text-foreground mt-1 hover:text-primary transition-colors">
            {painting.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <p className="font-body text-primary font-semibold">
            From ₹{lowestPrice.toLocaleString()}
          </p>
          <span className="font-body text-xs text-muted-foreground">
            {painting.sizes.length} sizes
          </span>
        </div>
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
