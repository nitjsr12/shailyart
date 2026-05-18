/** Studio showcase photos — artist with original work (home + /gallery). */
export type StudioGalleryItem = {
  id: string;
  image: string;
  title: string;
  category: string;
};

export const studioGalleryItems: StudioGalleryItem[] = [
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

export const studioGalleryCategories = [
  "All",
  ...Array.from(new Set(studioGalleryItems.map((item) => item.category))),
];

/** @deprecated Use studioGalleryItems */
export const homepageGalleryItems = studioGalleryItems;
