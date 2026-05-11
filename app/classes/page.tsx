import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClassesSection from "@/components/ClassesSection";

export default function Classes() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
            Learn Art Online
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-2">
            Art Classes & Courses
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Master the art of acrylic painting with comprehensive video courses.
            Learn at your own pace with lifetime access to all recordings.
          </p>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="rounded-2xl overflow-hidden shadow-elevated border border-border/50 bg-card">
            <img
              src="/assets/shailart-students-collage.png"
              alt="ShailArt Gallery students with their paintings, canvas workshops, and class moments"
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="font-body text-center text-muted-foreground mt-6 max-w-2xl mx-auto text-sm">
            Drawing, painting, and sketching for all ages — canvas workshops and studio classes.{" "}
            <span className="text-foreground font-medium">WhatsApp +91 99901 73104</span> for enrolment.
          </p>
        </div>
      </section>

      <ClassesSection variant="classesPage" />
      <Footer />
    </main>
  );
}
