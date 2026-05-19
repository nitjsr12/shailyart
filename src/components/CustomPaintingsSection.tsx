"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SmoothImage } from "@/components/SmoothImage";
import { studioGalleryItems } from "@/data/studioGallery";

const WHATSAPP_E164 = "919990173104";

/** Featured studio shots for the custom commissions preview */
const customPreviewItems = [
  studioGalleryItems.find((i) => i.id === "gallery-ganga-aarti"),
  studioGalleryItems.find((i) => i.id === "gallery-portrait-commission"),
].filter((item): item is NonNullable<typeof item> => Boolean(item));

const moreGalleryCount = Math.max(0, studioGalleryItems.length - customPreviewItems.length);

const CustomPaintingsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "order", // 'order' or 'customize'
  });

  const handleSubmit = (e: React.MouseEvent, type: "customize") => {
    e.preventDefault();
    toast.success(
      "Your customization request has been submitted! We'll contact you soon."
    );
    setFormData({ name: "", email: "", phone: "", message: "", type: "order" });
  };

  const sendFormToWhatsApp = (intent: "order" | "inquiry") => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!name && !email && !phone && !message) {
      toast.error("Please add your details before sending to WhatsApp.");
      return;
    }

    const intro =
      intent === "order"
        ? "I'd like to place an order for a custom painting. Here are my details:"
        : "I'd like information about a custom painting commission.";

    const text = [
      "Hi Shaily Art Gallery,",
      "",
      intro,
      "",
      `Name: ${name || "—"}`,
      `Email: ${email || "—"}`,
      `Phone: ${phone || "—"}`,
      "",
      "Details:",
      message || "—",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll variant="blur-up" duration="slow">
          <div className="text-center mb-16">
            <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
              Bespoke Art
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
              Custom & Large Format
            </h2>
            <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              Commission a unique piece tailored to your vision. Our large format paintings
              make stunning statement pieces for homes and offices.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery Preview */}
          <RevealOnScroll delayMs={50} variant="slide-right">
            <div>
              <div className="grid grid-cols-2 gap-4">
                {customPreviewItems.map((painting, index) => (
                    <div
                      key={painting.id}
                      className={`group relative overflow-hidden rounded-xl shadow-soft ring-1 ring-border/40 ${
                        index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                      }`}
                    >
                      <SmoothImage
                        src={painting.image}
                        alt={`${painting.title} — Shaily Verma with original artwork`}
                        eager={index === 0}
                        loadEffect="blur-scale"
                        scrollReveal={index > 0}
                        staggerMs={index * 80}
                        containerClassName="absolute inset-0 size-full"
                        className="h-full w-full object-cover object-center transition-transform duration-image ease-out group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <p className="absolute bottom-4 left-4 right-4 font-display text-base text-white drop-shadow-sm md:text-lg">
                        {painting.title}
                      </p>
                    </div>
                ))}
                <RevealOnScroll delayMs={180} variant="scale-up">
                  <Link
                    href="/gallery"
                    className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-card/80 p-4 text-center shadow-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                  >
                    <span className="font-display text-2xl font-semibold text-primary">
                      +{moreGalleryCount}
                    </span>
                    <p className="font-body text-sm text-muted-foreground group-hover:text-foreground">
                      more in full gallery
                    </p>
                    <ArrowUpRight className="h-4 w-4 text-primary opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </RevealOnScroll>
              </div>

              <div className="bg-card p-6 rounded-xl mt-6 shadow-soft transition-shadow duration-500 hover:shadow-elevated">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Pricing Information
                </h3>
                <p className="font-body text-muted-foreground text-sm">
                  Large format and custom paintings are priced based on size, complexity,
                  and materials. Contact us for a personalized quote.
                </p>
              </div>
          </div>
          </RevealOnScroll>

          {/* Inquiry Form */}
          <RevealOnScroll delayMs={100} variant="slide-left">
            <div className="bg-card p-8 rounded-2xl shadow-elevated">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Request Information
              </h3>

            <form className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-background"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-background"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-background"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tell us about your vision - size preferences, colors, subject matter..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-background resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  variant="hero"
                  className="flex-1 min-w-[8rem]"
                  onClick={() => sendFormToWhatsApp("order")}
                >
                  Order Now
                </Button>
                <Button
                  type="button"
                  variant="elegant"
                  className="flex-1 min-w-[8rem]"
                  onClick={(e) => handleSubmit(e, "customize")}
                >
                  Customize
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 min-w-[8rem] border-primary text-primary hover:bg-primary/10"
                  onClick={() => sendFormToWhatsApp("inquiry")}
                  aria-label="Send form details on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
                  WhatsApp
                </Button>
              </div>
            </form>

            <p className="font-body text-xs text-muted-foreground mt-4 text-center">
              We'll respond within 24 hours to discuss your requirements.
            </p>
          </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default CustomPaintingsSection;
