import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AboutPageContent } from "@/components/AboutPageContent";

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutPageContent />
      <Footer />
    </main>
  );
}
