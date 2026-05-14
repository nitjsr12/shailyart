/** Curated photos for the home page gallery only (full catalog stays on /gallery). */
export type HomepageGalleryItem = {
  id: string;
  image: string;
  title: string;
  category: string;
};

export const homepageGalleryItems: HomepageGalleryItem[] = [
  {
    id: "showcase-shirdi-sai",
    image: "/assets/homepage-shirdi-sai.png",
    title: "Shirdi Sai Baba",
    category: "Devotional",
  },
  {
    id: "showcase-ganesha-artist",
    image: "/assets/homepage-ganesha-artist-saree.png",
    title: "Lord Ganesha — studio piece",
    category: "Devotional",
  },
  {
    id: "showcase-radha-krishna",
    image: "/assets/homepage-radha-krishna.png",
    title: "Radha & Krishna",
    category: "Devotional",
  },
  {
    id: "showcase-sikh-portrait",
    image: "/assets/homepage-sikh-portrait-duo.png",
    title: "Sikh portrait — commission",
    category: "Portrait",
  },
  {
    id: "showcase-ganesha-portrait",
    image: "/assets/homepage-ganesha-portrait.png",
    title: "Lord Ganesha — bold portrait",
    category: "Devotional",
  },
  {
    id: "showcase-ganesha-circular",
    image: "/assets/homepage-ganesha-circular.png",
    title: "Lord Ganesha — circular canvas",
    category: "Devotional",
  },
];
