import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";
import RecordingsSection from "@/components/RecordingsSection";
import CustomPaintingsSection from "@/components/CustomPaintingsSection";
import ClassesSection from "@/components/ClassesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <GallerySection />
      <RecordingsSection />
      <CustomPaintingsSection />
      <ClassesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

