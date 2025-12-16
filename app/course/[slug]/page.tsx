"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCourseBySlug } from "@/data/courses";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  ArrowLeft,
  Play,
  Clock,
  CheckCircle,
  ShoppingCart,
  ChevronRight,
  BookOpen,
  Award,
  Users,
  Lock,
} from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const { addCourse, purchasedCourses } = useCart();

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

  const isPurchased = purchasedCourses.includes(course.id);

  const handleAddToCart = () => {
    if (isPurchased) {
      toast.info("You already own this course!");
      return;
    }
    addCourse(course);
    toast.success(`"${course.title}" added to cart!`);
  };

  const handleBuyNow = () => {
    if (isPurchased) {
      router.push("/my-courses");
      return;
    }
    addCourse(course);
    router.push("/checkout");
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
                {isPurchased && (
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 rounded-full bg-green-500 text-background text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> You Own This Course
                    </span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-xl font-semibold text-foreground">
                    {course.lessonsCount}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">Lessons</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-xl font-semibold text-foreground">
                    {course.totalDuration}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">Total</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-xl font-semibold text-foreground">
                    {course.difficulty}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">Level</p>
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

              {/* Features */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-body text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Card */}
              <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    {course.originalPrice && (
                      <p className="font-body text-lg text-muted-foreground line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="font-display text-4xl font-semibold text-foreground">
                      ₹{course.price.toLocaleString()}
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      One-time payment · Lifetime access
                    </p>
                  </div>
                  {course.originalPrice && (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm font-medium">
                      Save ₹{(course.originalPrice - course.price).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  {isPurchased ? (
                    <Button variant="hero" className="flex-1" asChild>
                      <Link href="/my-courses">
                        <Play className="h-5 w-5" />
                        Start Watching
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button variant="hero" className="flex-1" onClick={handleAddToCart}>
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </Button>
                      <Button variant="elegant" onClick={handleBuyNow}>
                        Buy Now
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <p className="font-body text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                🔒 Secure payment · Instant delivery · No manual interaction required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-foreground mb-8">
            Course Curriculum
          </h2>

          <div className="bg-card rounded-xl shadow-soft overflow-hidden">
            {course.lessons.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    {isPurchased ? (
                      <Play className="h-4 w-4 text-primary" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">
                      {index + 1}. {lesson.title}
                    </p>
                  </div>
                </div>
                <span className="font-body text-sm text-muted-foreground">
                  {lesson.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

