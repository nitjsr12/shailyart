"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const INSTAGRAM_URL =
  "https://www.instagram.com/artist.shaily.verma?igsh=a3ViZzhscDl1czV4&utm_source=qr";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <RevealOnScroll>
          <div>
            <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2 mb-6">
              Let's Create
              <span className="block text-primary italic">Together</span>
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Have questions about our paintings, classes, or custom commissions? 
              We'd love to hear from you. Reach out and let's discuss how we can 
              bring art into your life.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Email</p>
                  <p className="font-body font-medium text-foreground">
                    hello@shailyverma.art
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Phone</p>
                  <p className="font-body font-medium text-foreground">
                    +91 99901 73104
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Studio</p>
                  <p className="font-body font-medium text-foreground">
                    New Delhi, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Follow our journey
              </p>
              <div className="flex gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shaily Verma on Instagram"
                  className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-5 w-5 text-foreground" />
                </a>
              </div>
            </div>
          </div>
          </RevealOnScroll>

          {/* Contact Form */}
          <RevealOnScroll delayMs={80}>
          <div className="bg-card p-8 rounded-2xl shadow-elevated transition-shadow duration-700 ease-out hover:shadow-elevated">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-background"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-background"
                />
              </div>
              <Input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                className="bg-background"
              />
              <Textarea
                placeholder="Your message..."
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="bg-background resize-none"
              />
              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
