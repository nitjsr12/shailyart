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
    slug: "SHIVA",
    title: "SHIVA",
    category: "Landscape",
    image: "/assets/shiva.jpeg",
    description: "A breathtaking mountain landscape capturing the magical moment when the first rays of sunlight kiss the snow-capped peaks.",
    details: "This piece was inspired by the majestic Himalayan ranges, painted during a serene morning meditation. The warm golden hues contrast beautifully with the cool blue mountain shadows, creating a sense of peace and wonder. Each brushstroke captures the essence of nature's grandeur.",
    medium: "Acrylic on canvas ",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 4999, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 4999, inStock: true },
      { name: "A2", dimensions: "42 × 59.4 cm", price: 4999, inStock: true },
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "GANESHA",
    title: "GANESHA",
    category: "Still Life",
    image: "/assets/GANESHA.jpeg",
    description: "A vibrant celebration of nature's beauty featuring an exquisite arrangement of summer flowers in a classic terracotta vase.",
    details: "This still life captures the fleeting beauty of fresh flowers in full bloom. The rich, warm palette of oranges, yellows, and deep reds creates a sense of warmth and abundance. The careful attention to light and shadow gives each petal a luminous quality.",
    medium: "Acrylic on Canvas",
    year: "2026",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 4999, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 4999, inStock: true },
      { name: "A2", dimensions: "42 × 59.4 cm", price: 4999, inStock: true },
    ],
    featured: true,
  },
  {
    id: 3,
    slug: "Modern-art",
    title: "Modern art",
    category: "Abstract",
    image: "/assets/morderart.jpeg",
    description: "A dynamic abstract composition exploring the fluid movement of color and form, evoking emotions of warmth and energy.",
    details: "This abstract piece was created using a unique pouring technique combined with traditional brushwork. The flowing organic shapes in terracotta, gold, and cream represent the endless flow of creative energy. It's a meditation on movement and stillness coexisting in harmony.",
    medium: "Acrylic on canvas with gold leaf",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 4999, inStock: true },
      { name: "A3", dimensions: "29.7 × 42 cm", price: 4999, inStock: true },
      { name: "Square", dimensions: "50 × 50 cm", price: 4999, inStock: true },
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "Durga-giving-blessing",
    title: "Durga giving blessing",
    category: "Landscape",
    image: "/assets/IMG_5519.jpeg",
    description: "A soft, dreamy watercolor-style landscape depicting rolling green meadows under a gentle cloudy sky.",
    details: "This piece captures the tranquility of a summer afternoon in the countryside. The soft, flowing colors create a sense of serenity and peace. It's perfect for creating a calming atmosphere in any space, inviting viewers to pause and breathe.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [
      { name: "A4", dimensions: "21 × 29.7 cm", price: 4999, inStock: true },
    ],
    featured: false,
  },
  {
    id: 5,
    slug: "Modern-art-Faces",
    title: "Modern art Faces",
    category: "Portrait",
    image: "/assets/modern.jpeg",
    description: "An elegant portrait featuring a woman surrounded by vibrant orange and gold flowers, symbolizing beauty and grace.",
    details: "This portrait captures the timeless beauty of femininity intertwined with nature. The warm terracotta background complements the golden flowers, creating a harmonious composition. The subject's serene expression invites contemplation and connection.",
    medium: "Acrylic on Canvas",
    year: "2023",
    sizes: [
      { name: "", dimensions: "40 × 30 inch", price: 4999, inStock: true },
    ],
    featured: true,
  },
  {
    id: 6,
    slug: "Shiva-painting ",
    title: "Shiva painting ",
    category: "Seascape",
    image: "/assets/IMG_3854.jpeg",
    description: "A stunning seascape capturing the golden hour at the beach, where waves dance under the warm glow of a setting sun.",
    details: "This seascape brings the peaceful energy of the ocean into your home. The masterful depiction of light reflecting off the waves creates a sense of movement and life. The warm sunset colors evoke feelings of nostalgia and hope.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [

      { name: "Panoramic", dimensions: "30 × 90 cm", price: 4999, inStock: true },
    ],
    featured: true,
  },
  {
    id: 7,
    slug: "Radha-Krishna-painting ",
    title: "Radha Krishna painting ",
    category: "Seascape",
    image: "/assets/IMG_2970.jpeg",
    description: "A stunning seascape capturing the golden hour at the beach, where waves dance under the warm glow of a setting sun.",
    details: "This seascape brings the peaceful energy of the ocean into your home. The masterful depiction of light reflecting off the waves creates a sense of movement and life. The warm sunset colors evoke feelings of nostalgia and hope.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [

      { name: "Panoramic", dimensions: "30 × 90 cm", price: 4999, inStock: true },
    ],
    featured: true,
  },
  {
    id: 8,
    slug: "bhudha-painting ",
    title: "Bhudha painting ",
    category: "Seascape",
    image: "/assets/IMG_3109.jpeg",
    description: "A stunning seascape capturing the golden hour at the beach, where waves dance under the warm glow of a setting sun.",
    details: "This seascape brings the peaceful energy of the ocean into your home. The masterful depiction of light reflecting off the waves creates a sense of movement and life. The warm sunset colors evoke feelings of nostalgia and hope.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [

      { name: "Panoramic", dimensions: "30 × 90 cm", price: 4999, inStock: true },
    ],
    featured: true,
  },
  // New paintings - ₹4999 each, shipping extra ₹500 (Indian shipping)
  {
    id: 9,
    slug: "ganesha-abstract",
    title: "Lord Ganesha Abstract",
    category: "Devotional",
    image: "/assets/ganesha-abstract.png",
    description: "A vibrant, modern abstract painting of Lord Ganesha in bold blues, reds, and gold. A striking piece for contemporary homes.",
    details: "This expressive acrylic painting combines traditional devotion with a contemporary abstract style. Bold brushstrokes and a rich color palette make it a standout piece for any living space.",
    medium: "Acrylic on Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 10,
    slug: "ganesha-closeup",
    title: "Lord Ganesha Close-Up",
    category: "Devotional",
    image: "/assets/ganesha-closeup.png",
    description: "A stunning close-up portrait of Lord Ganesha with intricate crown, expressive eye, and golden hues. Rich texture and vibrant colors.",
    details: "This detailed acrylic painting captures the serene and divine expression of Lord Ganesha. The elaborate golden crown and flowing strokes create a mesmerizing devotional piece.",
    medium: "Acrylic on Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 11,
    slug: "family-portrait-3",
    title: "Family Portrait",
    category: "Portrait",
    image: "/assets/family-portrait-3.png",
    description: "An elegant formal portrait of three family members in traditional attire. Rich, dark background with ornate frame.",
    details: "This custom family portrait captures the love and togetherness of your loved ones. Painted with meticulous attention to detail in a classic, timeless style.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 12,
    slug: "krishna-flute",
    title: "Lord Krishna Playing Flute",
    category: "Devotional",
    image: "/assets/krishna-flute.png",
    description: "A serene portrait of Lord Krishna with his golden flute. Blue skin, peacock feather, and divine expression.",
    details: "This beautiful painting depicts Lord Krishna in a moment of divine music. The soft background and gentle expression create a peaceful, devotional atmosphere.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 13,
    slug: "hanuman-meditative",
    title: "Lord Hanuman in Meditation",
    category: "Devotional",
    image: "/assets/hanuman.png",
    description: "Lord Hanuman seated in meditative pose with his gada. Powerful orange tones against a dramatic sky.",
    details: "This striking painting captures the strength and serenity of Lord Hanuman. The vibrant orange and expressive background make it a powerful devotional piece.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 14,
    slug: "vishnu-four-armed",
    title: "Lord Vishnu",
    category: "Devotional",
    image: "/assets/vishnu.png",
    description: "Traditional depiction of Lord Vishnu with Sudarshana Chakra, Shankha, and lotus. Golden halo and ornate temple frame.",
    details: "A classic devotional painting of Lord Vishnu with his divine attributes. Rich gold, blue, and warm tones in a traditional temple-style composition.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 15,
    slug: "radha-krishna",
    title: "Radha Krishna",
    category: "Devotional",
    image: "/assets/radha-krishna.png",
    description: "Krishna and Radha together in a lush garden of flowers. Expressive brushwork in rich blues, pinks, and gold.",
    details: "This vibrant painting celebrates the divine love of Radha and Krishna. Surrounded by abundant flowers and foliage, it brings warmth and devotion to any space.",
    medium: "Acrylic on Canvas",
    year: "2023",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 16,
    slug: "family-portrait-bw",
    title: "Family Portrait Black & White",
    category: "Portrait",
    image: "/assets/family-portrait-bw.png",
    description: "A timeless black and white family portrait of eight members. Classic and elegant.",
    details: "This sophisticated multi-generational family portrait in black and white captures the bonds and personalities of your loved ones in a timeless style.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 17,
    slug: "bal-krishna",
    title: "Bal Krishna",
    category: "Devotional",
    image: "/assets/bal-krishna.png",
    description: "Joyful child Krishna with peacock feather and golden jewelry. Festive petals and temple archway.",
    details: "This charming painting captures the playful spirit of Bal Krishna. The joyful expression and divine innocence make it perfect for homes and puja rooms.",
    medium: "Acrylic on Canvas",
    year: "2024",
    sizes: [{ name: "Original", dimensions: "Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 18,
    slug: "girl-with-butterflies",
    title: "Girl with Butterflies",
    category: "Abstract",
    image: "/assets/girl-butterflies.png",
    description: "Whimsical circular painting of a young girl with butterflies. Vibrant blues, yellows, and expressive brushwork.",
    details: "A dreamy, ethereal portrait combining portraiture with nature. Butterflies dance around the subject in this unique circular canvas piece.",
    medium: "Acrylic on Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Circular Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 19,
    slug: "pichwai-cow-tree",
    title: "Pichwai Cow and Tree",
    category: "Devotional",
    image: "/assets/IMG_0706.jpeg",
    description: "A beautiful Pichwai style painting of a cow and calf resting under a detailed, colorful tree.",
    details: "This large scale traditional artwork captures the serene bond between a cow and calf, surrounded by blooming lotuses and nature. The vibrant colors and intricate details make it a breathtaking centerpiece.",
    medium: "Acrylic on Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Large Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 20,
    slug: "hanuman-meditative-large",
    title: "Meditative Hanuman",
    category: "Devotional",
    image: "/assets/hanuman.png",
    description: "A powerful depiction of Lord Hanuman sitting in deep meditation with dramatic clouds in the background.",
    details: "The painting beautifully portrays strength and devotion. The muscular form of Lord Hanuman contrasts with the calming, meditative atmosphere of the background.",
    medium: "Acrylic on Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Large Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 21,
    slug: "krishna-flute-portrait",
    title: "Krishna with Flute",
    category: "Devotional",
    image: "/assets/krishna-flute.png",
    description: "A serene, large portrait of Lord Krishna with closed eyes, playing his golden flute.",
    details: "Painted in soothing blue hues, this portrait radiates peace and divine love. The detailed jewelry and peaceful expression make it an extraordinary devotional artwork.",
    medium: "Acrylic on Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Large Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 22,
    slug: "ganesha-abstract-circle",
    title: "Circular Abstract Ganesha",
    category: "Abstract",
    image: "/assets/ganesha-abstract.png",
    description: "A vibrant abstract interpretation of Lord Ganesha on a circular canvas, featuring bold reds, blues, and golds.",
    details: "This unique circular artwork brings a contemporary and colorful flair to a traditional subject. The textured brushstrokes add depth and energy to the piece.",
    medium: "Acrylic on Circular Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Circular Canvas", price: 4999, inStock: true }],
    featured: true,
  },
  {
    id: 23,
    slug: "ganesha-colorful-large",
    title: "Colorful Ganesha Portrait",
    category: "Devotional",
    image: "/assets/ganesha-closeup.png",
    description: "A majestic, close-up profile portrait of Lord Ganesha rendered in bright, joyful colors.",
    details: "This painting captures the divine presence of Lord Ganesha with incredibly vibrant colors and intricate details on the crown and ornaments. A perfect piece to bring positive energy to any room.",
    medium: "Acrylic on Canvas",
    year: "2025",
    sizes: [{ name: "Original", dimensions: "Large Canvas", price: 4999, inStock: true }],
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

export const categories = ["All", "Landscape", "Still Life", "Abstract", "Portrait", "Seascape", "Devotional"];
