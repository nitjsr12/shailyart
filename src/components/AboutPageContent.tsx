"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SmoothImage } from "@/components/SmoothImage";

const values = [
  {
    title: "Passion",
    description: "Every stroke I make comes from a deep love for art and creativity.",
  },
  {
    title: "Teaching",
    description: "Sharing knowledge and watching students grow brings me immense joy.",
  },
  {
    title: "Quality",
    description: "Each painting is crafted with premium materials and attention to detail.",
  },
];

export function AboutPageContent() {
  return (
    <section className="pt-32 pb-24">
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealOnScroll variant="slide-right" duration="slow">
            <div>
              <span className="font-body text-sm font-medium uppercase tracking-wider text-primary">
                About the Artist
              </span>
              <h1 className="mt-2 mb-6 font-display text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
                Hello, I&apos;m
                <span className="block text-primary italic">Shaily Verma</span>
              </h1>
              <div className="space-y-4 font-body text-muted-foreground">
                <p>
                  For over 15 years, I&apos;ve dedicated my life to the beautiful world of art. What
                  started as a childhood passion has grown into a fulfilling career teaching
                  thousands of students across India.
                </p>
                <p>
                  My specialty lies in acrylic painting, where I love exploring landscapes, florals,
                  and abstract compositions. Each piece I create tells a story, captures an emotion,
                  or celebrates the beauty of everyday moments.
                </p>
                <p>
                  Through my online classes, I aim to make art accessible to everyone. Whether
                  you&apos;re picking up a brush for the first time or looking to refine your
                  technique, I believe everyone has an artist within them waiting to emerge.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="slide-left" delayMs={80} duration="slow">
            <div className="relative mx-auto w-full max-w-[600px]">
              <SmoothImage
                src="/assets/hero-shaily-studio.png"
                alt="Shaily Verma"
                scrollReveal
                loadEffect="blur-scale"
                containerClassName="overflow-hidden rounded-2xl shadow-elevated aspect-[5/6] w-full"
                className="h-full w-full object-cover"
              />
              <RevealOnScroll variant="scale-up" delayMs={200}>
                <div className="absolute bottom-4 left-4 rounded-xl bg-card p-4 shadow-elevated sm:-bottom-6 sm:left-0 sm:p-6 md:-left-4">
                  <p className="font-display text-3xl font-semibold text-primary">15+</p>
                  <p className="font-body text-sm text-muted-foreground">Years of Experience</p>
                </div>
              </RevealOnScroll>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <RevealOnScroll key={value.title} delayMs={index * 100} variant="clip-up">
              <div className="rounded-xl bg-secondary/30 p-8 text-center">
                <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="font-body text-muted-foreground">{value.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
