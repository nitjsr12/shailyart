"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GOOGLE_BUSINESS_REVIEWS_URL,
  googleReviews,
} from "@/data/googleReviews";
import { Star, Quote, ExternalLink } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <RevealOnScroll variant="blur-up" duration="slow" className="text-center mb-16">
            <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
              Customer Experiences
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
              Reviews & Testimonials
            </h1>
            <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              See what our students and art collectors have to say about our classes, custom artwork, and gallery paintings.
              For the latest ratings and every review in full, open our listing on Google.
            </p>

            <a
              href={GOOGLE_BUSINESS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-6 bg-secondary/50 hover:bg-secondary/70 transition-colors px-6 py-3 rounded-full mx-auto w-fit font-body text-sm text-foreground"
            >
              <div className="flex" aria-hidden>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span>Read all reviews on Google</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
            </a>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((review, index) => (
              <RevealOnScroll
                key={`${review.name}-${index}`}
                delayMs={(index % 6) * 70}
                variant="scale-up"
              >
              <div
                className="bg-card p-8 rounded-2xl shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-display font-semibold text-primary text-xl">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        Google review
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                
                <Quote className="h-6 w-6 text-accent/20 mb-3 flex-shrink-0" />
                
                <p className="font-body text-muted-foreground flex-grow">
                  "{review.text}"
                </p>
                
                <p className="font-body text-xs text-muted-foreground mt-6 pt-4 border-t border-border/50">
                  {review.date}
                </p>
              </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
