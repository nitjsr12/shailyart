"use client";

import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Shaily's teaching style is incredibly patient and detailed. I went from complete beginner to creating paintings I'm proud to display!",
    rating: 5,
  },
  {
    name: "Ankit Patel",
    location: "Ahmedabad",
    text: "The lifetime access to recordings is amazing. I can practice at my own pace and rewatch techniques whenever needed.",
    rating: 5,
  },
  {
    name: "Meera Krishnan",
    location: "Chennai",
    text: "Best investment in my creative journey. The step-by-step approach makes even complex techniques feel achievable.",
    rating: 5,
  },
];

const classHighlights = [
  { label: "Video Lessons", value: "50+" },
  { label: "Student Community", value: "1000+" },
  { label: "Painting Projects", value: "25+" },
  { label: "Years Teaching", value: "15+" },
];

const ClassesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
            Learn with Shaily
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
            Online Art Classes
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Join thousands of students who have transformed their artistic abilities 
            through our comprehensive acrylic painting courses.
          </p>
        </div>

        {/* Stats */}
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

        {/* Teaching Methodology */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h3 className="font-display text-3xl font-semibold text-foreground mb-6">
              Our Teaching Approach
            </h3>
            <div className="space-y-4 font-body text-muted-foreground">
              <p>
                Every class is designed with beginners in mind, while still offering 
                depth for intermediate artists looking to refine their skills.
              </p>
              <p>
                We focus on building strong fundamentals - color theory, brush techniques, 
                composition - that will serve you across all painting styles.
              </p>
              <p>
                Most importantly, we believe art should be joyful. Our courses create 
                a supportive environment where mistakes become learning opportunities.
              </p>
            </div>
            <Button variant="hero" className="mt-8">
              Start Learning Today
            </Button>
          </div>
          <div className="relative">
            <img
              src="/assets/class-recording.jpg"
              alt="Art class in session"
              className="rounded-2xl shadow-elevated"
            />
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="font-display text-3xl font-semibold text-foreground text-center mb-12">
            What Our Students Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
              >
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
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
