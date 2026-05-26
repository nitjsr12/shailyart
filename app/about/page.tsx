import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AboutPageContent } from "@/components/AboutPageContent";


export const metadata = {
  title: "About Shaily Verma — Artist & Art Teacher",
  description: "15+ years of experience in fine art. Shaily Verma is a New Delhi based artist offering original paintings and professional online art classes.",
};

export default function About() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <AboutPageContent />
      <Footer />
    </main>
  );
}
