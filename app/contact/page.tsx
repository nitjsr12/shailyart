import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
            Contact Us
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-2">
            Get in Touch
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have questions about our paintings, classes, or custom commissions? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}

