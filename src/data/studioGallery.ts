/** Studio showcase photos — artist with original work (home + /gallery). */
export type StudioGalleryItem = {
  id: string;
  image: string;
  title: string;
  category: string;
};

export const studioGalleryItems: StudioGalleryItem[] = [
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
  {
    id: "gallery-ganga-aarti",
    image: "/assets/gallery-ganga-aarti.png",
    title: "Ganga Aarti — Varanasi",
    category: "Devotional",
  },
  {
    id: "gallery-shiva-parivar",
    image: "/assets/gallery-shiva-parivar.png",
    title: "Shiva Parivar",
    category: "Devotional",
  },
  {
    id: "gallery-pichwai-cow-tree",
    image: "/assets/gallery-pichwai-cow-tree.png",
    title: "Pichwai — cow & tree",
    category: "Devotional",
  },
  {
    id: "gallery-bull-vibrant",
    image: "/assets/gallery-bull-vibrant.png",
    title: "Vibrant bull — canvas",
    category: "Devotional",
  },
  {
    id: "gallery-portrait-commission",
    image: "/assets/gallery-portrait-commission.png",
    title: "Mother & daughter — commission",
    category: "Portrait",
  },
  {
    id: "gallery-portrait-abstract-duo",
    image: "/assets/gallery-portrait-abstract-duo.png",
    title: "Abstract dual portrait — acrylic on canvas",
    category: "Portrait",
  },
  {
    id: "gallery-portrait-elderly-couple",
    image: "/assets/gallery-portrait-elderly-couple.png",
    title: "Elderly couple — gold-framed commission",
    category: "Portrait",
  },
  {
    id: "gallery-floral-large",
    image: "/assets/gallery-floral-large.png",
    title: "Large floral composition",
    category: "Still Life",
  },
];

export const studioGalleryCategories = [
  "All",
  ...Array.from(new Set(studioGalleryItems.map((item) => item.category))),
];