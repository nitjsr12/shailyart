"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getPaintingBySlug, getRelatedPaintings, PaintingSize } from "@/data/paintings";
import { useCart } from "@/context/CartContext";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Truck, 
  Shield, 
  Package,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function PaintingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const painting = getPaintingBySlug(slug);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PaintingSize | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!painting) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="font-display text-4xl text-foreground">Painting not found</h1>
          <Button variant="elegant" className="mt-6" onClick={() => router.push("/gallery")}>
            Back to Gallery
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedPaintings = getRelatedPaintings(painting.id, painting.category);
  const defaultSize = painting.sizes.find((s) => s.inStock) || painting.sizes[0];
  const currentSize = selectedSize || defaultSize;

  const handleAddToCart = () => {
    if (!currentSize.inStock) {
      toast.error("This size is currently out of stock");
      return;
    }
    addItem(painting, currentSize);
    toast.success(`"${painting.title}" (${currentSize.name}) added to cart!`);
  };

  const handleBuyNow = () => {
    if (!currentSize.inStock) {
      toast.error("This size is currently out of stock");
      return;
    }
    addItem(painting, currentSize);
    router.push("/checkout");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: painting.title,
        text: painting.description,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{painting.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 -ml-4"
            onClick={() => router.push("/gallery")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-elevated bg-card">
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-full object-cover"
                />
                {/* Image Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isWishlisted 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background/80 backdrop-blur-sm hover:bg-background"
                    )}
                  >
                    <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background flex items-center justify-center transition-all"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail placeholder for future multiple images */}
              <div className="flex gap-2">
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-primary">
                  <img src={painting.image} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
                  {painting.category}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
                  {painting.title}
                </h1>
              </div>

              {/* Description */}
              <p className="font-body text-lg text-muted-foreground">
                {painting.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 py-4 border-y border-border">
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase">Medium</p>
                  <p className="font-body font-medium text-foreground">{painting.medium}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase">Year</p>
                  <p className="font-body font-medium text-foreground">{painting.year}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase">Artist</p>
                  <p className="font-body font-medium text-foreground">Shaily Verma</p>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {painting.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => size.inStock && setSelectedSize(size)}
                      disabled={!size.inStock}
                      className={cn(
                        "px-4 py-3 rounded-lg border-2 transition-all duration-300 text-left min-w-[140px]",
                        currentSize.name === size.name
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                        !size.inStock && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <p className="font-body font-semibold text-foreground flex items-center gap-2">
                        {size.name}
                        {currentSize.name === size.name && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">{size.dimensions}</p>
                      <p className="font-body text-primary font-medium mt-1">
                        ₹{size.price.toLocaleString()}
                      </p>
                      {!size.inStock && (
                        <p className="font-body text-xs text-destructive mt-1">Out of Stock</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Price</p>
                    <p className="font-display text-4xl font-semibold text-foreground">
                      ₹{currentSize.price.toLocaleString()}
                    </p>
                  </div>
                  {currentSize.inStock && (
                    <span className="inline-flex items-center gap-1 text-sm font-body text-green-600">
                      <Check className="h-4 w-4" /> In Stock
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!currentSize.inStock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="elegant"
                    onClick={handleBuyNow}
                    disabled={!currentSize.inStock}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-3">
                  <Truck className="h-6 w-6 text-primary mb-2" />
                  <p className="font-body text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <p className="font-body text-xs text-muted-foreground">Secure Payment</p>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Package className="h-6 w-6 text-primary mb-2" />
                  <p className="font-body text-xs text-muted-foreground">Safe Packaging</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mt-16 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              About This Painting
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              {painting.details}
            </p>
          </div>
        </div>
      </section>

      {/* Related Paintings */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              You May Also Like
            </h2>
            <Link href="/gallery">
              <Button variant="ghost" className="group">
                View All
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPaintings.map((related) => (
              <Link
                key={related.id}
                href={`/painting/${related.slug}`}
                className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    {related.category}
                  </span>
                  <h3 className="font-display text-lg font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="font-body text-primary font-semibold mt-2">
                    From ₹{Math.min(...related.sizes.map(s => s.price)).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

