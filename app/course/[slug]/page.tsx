"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCourseBySlug } from "@/data/courses";
import {
  ArrowLeft,
  Play,
  Clock,
  CheckCircle,
  MessageCircle,
  ChevronRight,
  BookOpen,
  Award,
} from "lucide-react";

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

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => router.push("/classes")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Video Preview */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated bg-card">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                  <button className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-glow">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-6">
              <div>
                <span className="font-body text-sm font-medium text-accent tracking-wider uppercase">
                  {course.category} · Digital Course
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-2">
                  {course.title}
                </h1>
                <p className="font-body text-lg text-primary mt-2">{course.subtitle}</p>
              </div>

              <p className="font-body text-muted-foreground">
                {course.description}
              </p>

              {/* CTA Card */}
              <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                <div className="flex gap-3">
                  <Button variant="hero" className="w-full" onClick={handleWhatsAppRedirect}>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Inquire on WhatsApp
                  </Button>
                </div>
              </div>

              <p className="font-body text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                Connect with us on WhatsApp for enrollment details
              </p>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}

