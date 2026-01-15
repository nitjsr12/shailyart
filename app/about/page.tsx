import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-body text-sm font-medium text-primary tracking-wider uppercase">
                About the Artist
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-2 mb-6">
                Hello, I'm
                <span className="block text-primary italic">Shaily Verma</span>
              </h1>
              <div className="space-y-4 font-body text-muted-foreground">
                <p>
                  For over 15 years, I've dedicated my life to the beautiful world of art. 
                  What started as a childhood passion has grown into a fulfilling career 
                  teaching thousands of students across India.
                </p>
                <p>
                  My specialty lies in acrylic painting, where I love exploring landscapes, 
                  florals, and abstract compositions. Each piece I create tells a story, 
                  captures an emotion, or celebrates the beauty of everyday moments.
                </p>
                <p>
                  Through my online classes, I aim to make art accessible to everyone. 
                  Whether you're picking up a brush for the first time or looking to 
                  refine your technique, I believe everyone has an artist within them 
                  waiting to emerge.
                </p>
              </div>
            </div>
            
            <div className="relative w-full max-w-[600px] mx-auto">
              <Image
                src="/assets/IMG_0706.jpeg"
                alt="Shaily Verma"
                width={600}
                height={600}
                className="rounded-2xl shadow-elevated w-full h-[700px] object-cover"
                
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elevated">
                <p className="font-display text-3xl font-semibold text-primary">15+</p>
                <p className="font-body text-sm text-muted-foreground">Years of Experience</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Passion",
                description: "Every stroke I make comes from a deep love for art and creativity."
              },
              {
                title: "Teaching",
                description: "Sharing knowledge and watching students grow brings me immense joy."
              },
              {
                title: "Quality",
                description: "Each painting is crafted with premium materials and attention to detail."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-8 bg-secondary/30 rounded-xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

