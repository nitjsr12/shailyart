import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import CustomPaintingsSection from "@/components/CustomPaintingsSection";

export default function Gallery() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
            Art Collection
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-2">
            Our Gallery
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Browse our complete collection of original paintings. Each piece is a unique 
            creation ready to bring beauty and inspiration to your space.
          </p>
        </div>
      </section>

      <GallerySection />
      <CustomPaintingsSection />
      <Footer />
    </main>
  );
}

