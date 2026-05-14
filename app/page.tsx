import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";
import CustomPaintingsSection from "@/components/CustomPaintingsSection";
import ClassesSection from "@/components/ClassesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <GallerySection variant="home" />
      <CustomPaintingsSection />
      <ClassesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

