export type BentoImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  gradient: string;
};

export const bentoImages: BentoImage[] = [
  {
    id: "bento-1",
    src: "/images/creative/porsche-poster.png",
    alt: "Porsche GT3RS Poster",
    title: "Porsche Poster",
    category: "Graphic Design",
    gradient: "linear-gradient(135deg, #1a0a0a, #3d1010)",
  },
  {
    id: "bento-2",
    src: "/images/creative/audir8.png",
    alt: "Audi R8 Poster",
    title: "Audi R8 Poster",
    category: "Photography + Graphic Design",
    gradient: "linear-gradient(135deg, #2e1a1a, #4a2d2d)",
  },
  {
    id: "bento-3",
    src: "/images/creative/amg.jpg",
    alt: "AMG",
    title: "AMG Roller",
    category: "Photoshop",
    gradient: "linear-gradient(135deg, #1a2e1a, #2d4a2d)",
  },
  {
    id: "bento-4",
    src: "/images/creative/ink-lake.png",
    alt: "Ink's Lake",
    title: "Ink's Lake",
    category: "India Ink Painting",
    gradient: "linear-gradient(135deg, #1a1a2e, #2d2d4a)",
  },
  {
    id: "bento-5",
    src: "/images/creative/officeinteriordesign.jpg",
    alt: "Home Office Interior Design",
    title: "Home Office Interior Design",
    category: "Interior Design",
    gradient: "linear-gradient(135deg, #2e1a2e, #4a2d4a)",
  },
  {
    id: "bento-6",
    src: "/images/creative/pokemon-generative.png",
    alt: "Pokemon Extended Art",
    title: "Pokemon Art Extension",
    category: "Generative AI",
    gradient: "linear-gradient(135deg, #2e2a1a, #4a3f2d)",
  },
  {
    id: "bento-7",
    src: "/images/creative/gradient-filled-logo.png",
    alt: "HireJourney Logo",
    title: "Hire Journey Logo",
    category: "Logo Design",
    gradient: "linear-gradient(135deg, #2e2a1a, #4a3f2d)",
  },
];
