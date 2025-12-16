"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const customPaintings = [
  { id: 1, image: "/assets/painting-3.jpg", title: "Large Abstract Composition" },
  { id: 2, image: "/assets/painting-5.jpg", title: "Custom Portrait Work" },
];

const CustomPaintingsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "order", // 'order' or 'customize'
  });

  const handleSubmit = (e: React.FormEvent, type: "order" | "customize") => {
    e.preventDefault();
    // This would connect to email service
    toast.success(`Your ${type} request has been submitted! We'll contact you soon.`);
    setFormData({ name: "", email: "", phone: "", message: "", type: "order" });
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery Preview */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {customPaintings.map((painting, index) => (
                <div
                  key={painting.id}
                  className={`relative overflow-hidden rounded-xl shadow-soft ${
                    index === 0 ? "col-span-2 aspect-video" : "aspect-square"
                  }`}
                >
                  <img
                    src={painting.image}
                    alt={painting.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-display text-lg text-background">
                    {painting.title}
                  </p>
                </div>
              ))}
              <div className="aspect-square rounded-xl bg-muted flex items-center justify-center">
                <p className="font-body text-muted-foreground text-center px-4">
                  + 8 more examples in full gallery
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl mt-6 shadow-soft">
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Pricing Information
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                Large format and custom paintings are priced based on size, complexity, 
                and materials. Contact us for a personalized quote.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
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

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="button"
                  variant="hero"
                  className="flex-1"
                  onClick={(e) => handleSubmit(e, "order")}
                >
                  Order Now
                </Button>
                <Button
                  type="button"
                  variant="elegant"
                  className="flex-1"
                  onClick={(e) => handleSubmit(e, "customize")}
                >
                  Customize
                </Button>
              </div>
            </form>

            <p className="font-body text-xs text-muted-foreground mt-4 text-center">
              We'll respond within 24 hours to discuss your requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPaintingsSection;
