"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-art-studio.jpg"
          alt="Shaily Verma's Art Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block font-body text-sm font-medium text-primary mb-4 tracking-wider uppercase opacity-0 animate-fade-in-up stagger-1">
            Welcome to the Studio
          </span>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up stagger-2">
            Art that Speaks
            <span className="block text-primary italic">to Your Soul</span>
          </h1>
          
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg opacity-0 animate-fade-in-up stagger-3">
            Discover original canvas paintings, learn the art of acrylic painting through 
            expert-led courses, and transform your space with handcrafted masterpieces.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up stagger-4">
            <Button variant="hero" size="xl" className="group">
              Explore Gallery
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="elegant" size="xl" className="group">
              <Play className="h-5 w-5" />
              Watch Classes
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-border/50 opacity-0 animate-fade-in-up stagger-5">
            <div>
              <p className="font-display text-3xl font-semibold text-foreground">500+</p>
              <p className="font-body text-sm text-muted-foreground">Original Paintings</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-foreground">1000+</p>
              <p className="font-body text-sm text-muted-foreground">Happy Students</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-foreground">15+</p>
              <p className="font-body text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
