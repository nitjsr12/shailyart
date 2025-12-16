// Images are now in public/assets directory

export interface PaintingSize {
  name: string;
  dimensions: string;
  price: number;
  inStock: boolean;
}

export interface Painting {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  details: string;
  medium: string;
  year: string;
  sizes: PaintingSize[];
  featured: boolean;
}

export const paintings: Painting[] = [
  {
    id: 1,
    slug: "mountain-sunrise",
    title: "Mountain Sunrise",
    category: "Landscape",
    image: "/assets/painting-1.jpg",
    description: "A breathtaking mountain landscape capturing the magical moment when the first rays of sunlight kiss the snow-capped peaks.",
    details: "This piece was inspired by the majestic Himalayan ranges, painted during a serene morning meditation. The warm golden hues contrast beautifully with the cool blue mountain shadows, creating a sense of peace and wonder. Each brushstroke captures the essence of nature's grandeur.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 4500, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 5000, inStock: true },
      { name: "A2", dimensions: "42 × 59.4 cm", price: 7500, inStock: false },
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "floral-elegance",
    title: "Floral Elegance",
    category: "Still Life",
    image: "/assets/painting-2.jpg",
    description: "A vibrant celebration of nature's beauty featuring an exquisite arrangement of summer flowers in a classic terracotta vase.",
    details: "This still life captures the fleeting beauty of fresh flowers in full bloom. The rich, warm palette of oranges, yellows, and deep reds creates a sense of warmth and abundance. The careful attention to light and shadow gives each petal a luminous quality.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 5000, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 6000, inStock: true },
      { name: "A2", dimensions: "42 × 59.4 cm", price: 8500, inStock: true },
    ],
    featured: true,
  },
  {
    id: 3,
    slug: "abstract-flow",
    title: "Abstract Flow",
    category: "Abstract",
    image: "/assets/painting-3.jpg",
    description: "A dynamic abstract composition exploring the fluid movement of color and form, evoking emotions of warmth and energy.",
    details: "This abstract piece was created using a unique pouring technique combined with traditional brushwork. The flowing organic shapes in terracotta, gold, and cream represent the endless flow of creative energy. It's a meditation on movement and stillness coexisting in harmony.",
    medium: "Mixed Media on Canvas",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 4800, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 5500, inStock: true },
      { name: "Square", dimensions: "50 × 50 cm", price: 9000, inStock: true },
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "peaceful-meadow",
    title: "Peaceful Meadow",
    category: "Landscape",
    image: "/assets/painting-4.jpg",
    description: "A soft, dreamy watercolor-style landscape depicting rolling green meadows under a gentle cloudy sky.",
    details: "This piece captures the tranquility of a summer afternoon in the countryside. The soft, flowing colors create a sense of serenity and peace. It's perfect for creating a calming atmosphere in any space, inviting viewers to pause and breathe.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 4500, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 5000, inStock: false },
      { name: "A2", dimensions: "42 × 59.4 cm", price: 7000, inStock: true },
    ],
    featured: false,
  },
  {
    id: 5,
    slug: "portrait-with-flowers",
    title: "Portrait with Flowers",
    category: "Portrait",
    image: "/assets/painting-5.jpg",
    description: "An elegant portrait featuring a woman surrounded by vibrant orange and gold flowers, symbolizing beauty and grace.",
    details: "This portrait captures the timeless beauty of femininity intertwined with nature. The warm terracotta background complements the golden flowers, creating a harmonious composition. The subject's serene expression invites contemplation and connection.",
    medium: "Acrylic on Canvas",
    year: "2023",
    sizes: [
      { name: "A3", dimensions: "29.7 × 42 cm", price: 7000, inStock: true },
      { name: "A2", dimensions: "42 × 59.4 cm", price: 10000, inStock: true },
      { name: "Large", dimensions: "60 × 80 cm", price: 15000, inStock: false },
    ],
    featured: true,
  },
  {
    id: 6,
    slug: "ocean-dreams",
    title: "Ocean Dreams",
    category: "Seascape",
    image: "/assets/painting-6.jpg",
    description: "A stunning seascape capturing the golden hour at the beach, where waves dance under the warm glow of a setting sun.",
    details: "This seascape brings the peaceful energy of the ocean into your home. The masterful depiction of light reflecting off the waves creates a sense of movement and life. The warm sunset colors evoke feelings of nostalgia and hope.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 5000, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 6000, inStock: true },
      { name: "Panoramic", dimensions: "30 × 90 cm", price: 12000, inStock: true },
    ],
    featured: true,
  },
];

export const getPaintingBySlug = (slug: string): Painting | undefined => {
  return paintings.find((p) => p.slug === slug);
};

export const getRelatedPaintings = (currentId: number, category: string, limit = 3): Painting[] => {
  return paintings
    .filter((p) => p.id !== currentId)
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, limit);
};

export const categories = ["All", "Landscape", "Still Life", "Abstract", "Portrait", "Seascape"];
