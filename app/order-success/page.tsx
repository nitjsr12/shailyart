"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getCourseById } from "@/data/courses";
import { 
  CheckCircle, 
  Play, 
  Package, 
  ArrowRight, 
  Mail, 
  Clock,
  Download
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderType = searchParams.get("type") || "mixed";
  const { purchasedCourses } = useCart();

  const recentCourses = purchasedCourses
    .slice(-3)
    .map((id) => getCourseById(id))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Thank You for Your Order!
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              {orderType === "digital" 
                ? "Your digital products are ready! You now have instant access to all your purchased courses."
                : "Your order has been confirmed. Digital products are available immediately, and physical items will be shipped soon."}
            </p>
          </div>

          {/* Order Details */}
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Confirmation Email Notice */}
            <div className="bg-secondary/50 rounded-xl p-6 flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Confirmation Email Sent
                </h3>
                <p className="font-body text-muted-foreground">
                  We've sent a confirmation email with your order details and access links. 
                  Please check your inbox (and spam folder).
                </p>
              </div>
            </div>

            {/* Digital Course Access */}
            {recentCourses.length > 0 && (
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-6">
                  <Play className="h-6 w-6 text-accent" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Your Digital Courses - Instant Access
                  </h2>
                </div>

                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div
                      key={course!.id}
                      className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={course!.image}
                            alt={course!.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-foreground">
                            {course!.title}
                          </h3>
                          <p className="font-body text-sm text-muted-foreground">
                            {course!.lessonsCount} lessons · {course!.totalDuration}
                          </p>
                        </div>
                        <Button variant="gold" size="sm" asChild>
                          <Link href="/my-courses">
                            <Play className="h-4 w-4" />
                            Watch Now
                          </Link>
                        </Button>
                      </div>

                      {/* Sample lesson links */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="font-body text-sm text-muted-foreground mb-2">
                          Quick access to your lessons:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {course!.lessons.slice(0, 4).map((lesson, index) => (
                            <a
                              key={index}
                              href="#"
                              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors p-2 rounded-md hover:bg-secondary/50"
                            >
                              <Play className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{lesson.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="hero" className="w-full mt-6" asChild>
                  <Link href="/my-courses">
                    Access All My Courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Physical Items Notice */}
            {orderType === "mixed" && (
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-6 w-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Physical Items - Shipping Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-body font-medium text-foreground">Estimated Delivery</p>
                      <p className="font-body text-sm text-muted-foreground">
                        5-7 business days (within India)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-body font-medium text-foreground">Tracking Information</p>
                      <p className="font-body text-sm text-muted-foreground">
                        You'll receive tracking details via email once your order ships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button variant="elegant" asChild>
                <Link href="/gallery">Continue Shopping</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contact">Need Help?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 font-body text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </main>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}

