// Images are now in public/assets directory

export interface CourseLesson {
  title: string;
  duration: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  totalDuration: string;
  lessonsCount: number;
  lessons: CourseLesson[];
  features: string[];
  sampleVideoId?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

export const courses: Course[] = [
  {
    id: "course-1",
    slug: "landscape-masterclass",
    title: "Landscape Painting Masterclass",
    subtitle: "Set of 3 Complete Paintings",
    description: "Master the art of landscape painting with this comprehensive course. Learn to capture mountains, sunsets, and serene meadows using professional acrylic techniques.",
    price: 5000,
    originalPrice: 7500,
    image: "/assets/painting-1.jpg",
    totalDuration: "4+ Hours",
    lessonsCount: 12,
    lessons: [
      { title: "Introduction & Materials", duration: "15 min" },
      { title: "Color Mixing for Landscapes", duration: "25 min" },
      { title: "Painting 1: Mountain Sunrise - Part 1", duration: "35 min" },
      { title: "Painting 1: Mountain Sunrise - Part 2", duration: "30 min" },
      { title: "Painting 1: Final Details", duration: "20 min" },
      { title: "Painting 2: Sunset Valley - Part 1", duration: "35 min" },
      { title: "Painting 2: Sunset Valley - Part 2", duration: "30 min" },
      { title: "Painting 2: Final Details", duration: "20 min" },
      { title: "Painting 3: Misty Mountains - Part 1", duration: "35 min" },
      { title: "Painting 3: Misty Mountains - Part 2", duration: "30 min" },
      { title: "Painting 3: Final Details", duration: "20 min" },
      { title: "Course Conclusion & Tips", duration: "10 min" },
    ],
    features: [
      "Lifetime access to all videos",
      "Downloadable reference images",
      "Step-by-step instructions",
      "Certificate of completion",
      "Private community access",
    ],
    difficulty: "Beginner",
    category: "Landscape",
  },
  {
    id: "course-2",
    slug: "floral-art-course",
    title: "Floral Art Essentials",
    subtitle: "Set of 3 Beautiful Flowers",
    description: "Discover the joy of painting flowers with vibrant colors and expressive brushwork. Perfect for adding life to your home with handcrafted floral art.",
    price: 5000,
    originalPrice: 7000,
    image: "/assets/painting-2.jpg",
    totalDuration: "3.5 Hours",
    lessonsCount: 10,
    lessons: [
      { title: "Introduction to Floral Painting", duration: "15 min" },
      { title: "Understanding Flower Anatomy", duration: "20 min" },
      { title: "Painting 1: Rose Bouquet - Part 1", duration: "30 min" },
      { title: "Painting 1: Rose Bouquet - Part 2", duration: "25 min" },
      { title: "Painting 2: Sunflower Field - Part 1", duration: "30 min" },
      { title: "Painting 2: Sunflower Field - Part 2", duration: "25 min" },
      { title: "Painting 3: Mixed Arrangement - Part 1", duration: "30 min" },
      { title: "Painting 3: Mixed Arrangement - Part 2", duration: "25 min" },
      { title: "Adding Final Details", duration: "15 min" },
      { title: "Conclusion & Next Steps", duration: "10 min" },
    ],
    features: [
      "Lifetime access to all videos",
      "High-resolution reference photos",
      "Color palette guide",
      "Certificate of completion",
      "Bonus: Vase painting tutorial",
    ],
    difficulty: "Beginner",
    category: "Still Life",
  },
  {
    id: "course-3",
    slug: "abstract-expressions",
    title: "Abstract Expressions",
    subtitle: "Set of 3 Modern Abstracts",
    description: "Unleash your creativity with abstract art techniques. Learn pouring, layering, and texture creation to make stunning contemporary pieces.",
    price: 6000,
    originalPrice: 8500,
    image: "/assets/painting-3.jpg",
    totalDuration: "5 Hours",
    lessonsCount: 14,
    lessons: [
      { title: "Abstract Art Philosophy", duration: "20 min" },
      { title: "Materials for Abstract Art", duration: "15 min" },
      { title: "Color Theory for Abstracts", duration: "25 min" },
      { title: "Painting 1: Fluid Dynamics - Prep", duration: "15 min" },
      { title: "Painting 1: Fluid Dynamics - Pour", duration: "35 min" },
      { title: "Painting 1: Finishing Touches", duration: "20 min" },
      { title: "Painting 2: Textured Layers - Base", duration: "30 min" },
      { title: "Painting 2: Textured Layers - Build", duration: "35 min" },
      { title: "Painting 2: Final Details", duration: "20 min" },
      { title: "Painting 3: Geometric Flow - Plan", duration: "15 min" },
      { title: "Painting 3: Geometric Flow - Execute", duration: "40 min" },
      { title: "Painting 3: Refinements", duration: "20 min" },
      { title: "Sealing & Protecting Your Art", duration: "15 min" },
      { title: "Course Wrap-up", duration: "10 min" },
    ],
    features: [
      "Lifetime access to all videos",
      "Downloadable technique guides",
      "Supply list with alternatives",
      "Certificate of completion",
      "Bonus: Gallery submission tips",
    ],
    difficulty: "Intermediate",
    category: "Abstract",
  },
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find((c) => c.slug === slug);
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((c) => c.id === id);
};
