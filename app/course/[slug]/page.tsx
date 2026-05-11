"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/data/courses";
import {
  ArrowLeft,
  MessageCircle,
  ChevronRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="font-display text-4xl text-foreground">Course not found</h1>
          <Button variant="elegant" className="mt-6" onClick={() => router.push("/classes")}>
            Browse Courses
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const handleWhatsAppRedirect = () => {
    const message = `Hi Shaily Art Gallery,\n\nI am interested in learning more about the course: "${course.title}".\n\nPlease share more details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919990173104?text=${encodedMessage}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/classes" className="hover:text-primary transition-colors">Classes</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{course.title}</span>
          </nav>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => router.push("/classes")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          <span className="font-body text-sm font-medium text-accent tracking-wider uppercase">
            {course.category} · Digital Course
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
            {course.title}
          </h1>
          <p className="font-body text-lg text-primary mt-2">{course.subtitle}</p>

          <div className="flex flex-wrap gap-2 mt-6 mb-8">
            <span
              className={cn(
                "text-xs font-body px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              )}
            >
              {course.difficulty}
            </span>
            <span className="text-xs font-body px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.totalDuration}
            </span>
            <span className="text-xs font-body px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {course.lessonsCount} lessons
            </span>
            {course.originalPrice != null && (
              <span className="text-xs font-body text-muted-foreground line-through">
                ₹{course.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-xs font-body font-semibold text-primary">
              ₹{course.price.toLocaleString("en-IN")}
            </span>
          </div>

          <p className="font-body text-muted-foreground leading-relaxed text-lg">
            {course.description}
          </p>

          <div className="bg-secondary/50 rounded-xl p-6 mt-10">
            <Button variant="hero" className="w-full" onClick={handleWhatsAppRedirect}>
              <MessageCircle className="h-5 w-5 mr-2" />
              Inquire on WhatsApp
            </Button>
            <p className="font-body text-sm text-muted-foreground text-center mt-4">
              Connect with us on WhatsApp for enrollment details
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
