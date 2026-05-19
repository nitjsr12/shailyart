"use client";

import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const INSTAGRAM_URL =
  "https://www.instagram.com/artist.shaily.verma?igsh=a3ViZzhscDl1czV4&utm_source=qr";

const EMAIL = "Trendyartbyshaily@gmail.com";

const ContactSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <RevealOnScroll variant="slide-right">
          <div className="mx-auto max-w-2xl">
            <span className="font-body text-sm font-medium uppercase tracking-wider text-primary">
              Get in Touch
            </span>
            <h2 className="mt-2 mb-6 font-display text-4xl font-semibold text-foreground md:text-5xl">
              Let&apos;s Create
              <span className="block text-primary italic">Together</span>
            </h2>
            <p className="mb-8 font-body text-muted-foreground">
              Have questions about our paintings, classes, or custom commissions? We&apos;d love to
              hear from you. Reach out by email, phone, or Instagram.
            </p>

            <div className="mb-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all font-body font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Phone</p>
                  <a
                    href="tel:+919990173104"
                    className="font-body font-medium text-foreground transition-colors hover:text-primary"
                  >
                    +91 99901 73104
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Homebase Studio</p>
                  <p className="font-body font-medium text-foreground">New Delhi, India</p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-4 font-body text-sm text-muted-foreground">Follow our journey</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shaily Verma on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 transition-colors hover:bg-foreground/10"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ContactSection;
