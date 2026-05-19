"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Quote, Send, Image as ImageIcon } from "lucide-react";

import { homepageGoogleReviewHighlights } from "@/data/googleReviews";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SmoothImage } from "@/components/SmoothImage";

const classHighlights = [
  { label: "Video Lessons", value: "50+" },
  { label: "Student Community", value: "1000+" },
  { label: "Painting Projects", value: "25+" },
  { label: "Years Teaching", value: "15+" },
];

const ClassesSection = ({
  variant = "default",
}: {
  variant?: "default" | "classesPage";
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    interest: "",
  });

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Shaily Art Gallery,\n\nI am interested in joining your Art Class.\n\n*Name:* ${formData.name}\n*Age:* ${formData.age}\n*Interested In:* ${formData.interest}\n\nPlease share more details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919990173104?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <RevealOnScroll variant="blur-up" duration="slow">
          <div className="text-center mb-16">
            <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
              Art Class - Creativity & Professional
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
              Learn Drawing, Painting & Sketching
            </h2>
            <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              Classes available for all ages! Join our creative community to learn fundamental and professional art techniques.
            </p>
          </div>
        </RevealOnScroll>

        {/* Stats */}
        <RevealOnScroll delayMs={40} variant="scale-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {classHighlights.map((item, index) => (
            <div
              key={index}
              className="bg-secondary/50 rounded-xl p-6 text-center"
            >
              <p className="font-display text-3xl md:text-4xl font-semibold text-primary">
                {item.value}
              </p>
              <p className="font-body text-sm text-muted-foreground mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        </RevealOnScroll>

        {/* Info & Form */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <RevealOnScroll delayMs={60} variant="slide-right">
            <div>
            <h3 className="font-display text-3xl font-semibold text-foreground mb-6">
              Join Our Classes
            </h3>
            <div className="space-y-4 font-body text-muted-foreground mb-8">
              <p>
                Whether you're a complete beginner or an intermediate artist, our classes are tailored to help you refine your skills.
              </p>
              <p>
                We cover various mediums including canvas painting, sketching, and more.
                Experience a supportive environment where your creativity can flourish.
              </p>
              <p className="font-medium text-foreground">
                Fill out the form below to connect with us directly on WhatsApp for enrollment details!
              </p>
            </div>

            {/* Registration Form */}
            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background"
                  />
                  <Input
                    placeholder="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>
                <Input
                  placeholder="What are you interested in learning?"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  required
                  className="bg-background"
                />
                <RevealOnScroll variant="zoom-up" delayMs={40}>
                  <Button type="submit" variant="hero" className="w-full">
                    Inquire on WhatsApp
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </RevealOnScroll>
              </form>
            </div>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={90} variant="slide-left">
            <div className="relative space-y-6">
            {variant === "classesPage" ? (
              <>
                <h3 className="font-display text-2xl font-semibold text-center text-foreground">
                  ShailArt classes
                </h3>
                <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-soft space-y-5 font-body text-muted-foreground">
                  <p className="text-foreground font-medium text-center font-display text-lg">
                    Creativity &amp; professional instruction
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-primary shrink-0">✓</span>
                      Learn drawing, painting &amp; sketching — for all ages
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary shrink-0">✓</span>
                      Canvas workshops and guided studio projects
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary shrink-0">✓</span>
                      Online options and structured weekly topics
                    </li>
                  </ul>
                  <p className="text-center text-sm pt-4 border-t border-border/40 text-foreground">
                    Enrolment &amp; workshop info:{" "}
                    <span className="font-medium whitespace-nowrap">WhatsApp +91 99901 73104</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-display text-2xl font-semibold text-center text-foreground">
                  Student Work & Workshops
                </h3>
                <SmoothImage
                  src="/assets/shailart-students-collage.png"
                  alt="Art class in session and student work"
                  loadEffect="blur-scale"
                  scrollReveal
                  staggerMs={60}
                  parallax={false}
                  containerClassName="w-full overflow-hidden rounded-2xl shadow-elevated aspect-video"
                  className="h-full w-full object-cover transition-transform duration-image ease-out hover:scale-[1.02]"
                />
                <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Glimpses of our students&apos; beautiful creations
                </p>
              </>
            )}
          </div>
          </RevealOnScroll>
        </div>

        {/* Testimonials */}
        <RevealOnScroll delayMs={50} variant="blur-up">
          <div>
            <h3 className="font-display text-3xl font-semibold text-foreground text-center mb-12">
              What Our Students Say
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {homepageGoogleReviewHighlights.map((testimonial, index) => (
                <RevealOnScroll key={index} delayMs={index * 70} variant="scale-up">
                  <div className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-shadow duration-700 ease-out h-full">
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="font-body text-foreground mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {[testimonial.location, "Google review"]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ClassesSection;
