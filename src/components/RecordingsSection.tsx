"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, MessageCircle } from "lucide-react";
import { courses } from "@/data/courses";

const RecordingsSection = () => {
  const handleWhatsAppRedirect = (courseTitle: string) => {
    const message = `Hi Shaily Art Gallery,\n\nI am interested in learning more about the course: "${courseTitle}".\n\nPlease share more details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919990173104?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
            Digital Courses
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
            Learn Art from<br />
            <span className="text-primary italic">Anywhere</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Master the art of acrylic painting with our comprehensive video courses.
            Each set includes multiple painting tutorials with lifetime access.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            return (
              <div
                key={course.id}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 group"
              >
                {/* Image */}
                <Link href={`/course/${course.slug}`} className="block relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-primary ml-1" />
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/course/${course.slug}`}>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="font-body text-sm text-muted-foreground mt-1 mb-6">
                    {course.subtitle}
                  </p>

                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => handleWhatsAppRedirect(course.title)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Inquire on WhatsApp
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-muted-foreground mb-4">
            Connect with us on WhatsApp for more details
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecordingsSection;
