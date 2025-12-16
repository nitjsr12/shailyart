"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Clock, CheckCircle, ShoppingCart } from "lucide-react";
import { courses } from "@/data/courses";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const RecordingsSection = () => {
  const { addCourse, purchasedCourses } = useCart();

  const handleAddToCart = (course: typeof courses[0]) => {
    if (purchasedCourses.includes(course.id)) {
      toast.info("You already own this course!");
      return;
    }
    addCourse(course);
    toast.success(`"${course.title}" added to cart!`);
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
            const isPurchased = purchasedCourses.includes(course.id);
            
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
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      {course.difficulty}
                    </span>
                  </div>
                  {isPurchased && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-green-500 text-background text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Owned
                      </span>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/course/${course.slug}`}>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {course.subtitle}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      {course.lessonsCount} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.totalDuration}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mt-4 space-y-2">
                    {course.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="font-body text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      {course.originalPrice && (
                        <p className="font-body text-sm text-muted-foreground line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="font-display text-2xl font-semibold text-primary">
                        ₹{course.price.toLocaleString()}
                      </p>
                    </div>
                    {isPurchased ? (
                      <Button variant="gold" asChild>
                        <Link href="/my-courses">
                          <Play className="h-4 w-4" />
                          Watch Now
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        variant="hero" 
                        onClick={() => handleAddToCart(course)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-muted-foreground mb-4">
            🔒 Secure payment · Instant access · Lifetime availability
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecordingsSection;
