import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import CustomPaintingsSection from "@/components/CustomPaintingsSection";

export default function Gallery() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <section className="border-b border-border/40 bg-gradient-to-b from-secondary/40 to-background pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Studio
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Gallery
          </h1>
          <p className="mt-4 font-body text-muted-foreground md:text-lg">
            Shaily Verma with original canvas work — devotional art, portraits, and commissions
            photographed in the studio.
          </p>
        </div>
      </section>

      <GallerySection variant="full" />
      <CustomPaintingsSection />
      <Footer />
    </main>
  );
}

