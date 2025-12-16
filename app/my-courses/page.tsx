"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getCourseById } from "@/data/courses";
import { Play, Clock, BookOpen, CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";

export default function MyCoursesPage() {
  const router = useRouter();
  const { purchasedCourses } = useCart();

  const ownedCourses = purchasedCourses
    .map((id) => getCourseById(id))
    .filter(Boolean);

  if (ownedCourses.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-display text-4xl text-foreground mb-4">No Courses Yet</h1>
            <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't purchased any courses yet. Explore our collection of 
              painting tutorials and start your artistic journey!
            </p>
            <Button variant="hero" asChild>
              <Link href="/classes">
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              My Courses
            </h1>
            <p className="font-body text-muted-foreground mt-2">
              Access your purchased courses and continue learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ownedCourses.map((course) => (
              <div
                key={course!.id}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 group"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course!.image}
                    alt={course!.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-green-500 text-background text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Owned
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {course!.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {course!.subtitle}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course!.lessonsCount} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course!.totalDuration}
                    </span>
                  </div>

                  {/* Video Links */}
                  <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      Your Access Links:
                    </p>
                    <div className="space-y-2">
                      {course!.lessons.slice(0, 3).map((lesson, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <Play className="h-3 w-3" />
                          {lesson.title}
                        </a>
                      ))}
                      {course!.lessons.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          + {course!.lessons.length - 3} more lessons
                        </p>
                      )}
                    </div>
                  </div>

                  <Button variant="hero" className="w-full mt-4">
                    <Play className="h-4 w-4" />
                    Continue Watching
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

