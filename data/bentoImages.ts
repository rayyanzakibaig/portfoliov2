export type BentoImage = {
  id: string;
  src: string; // TODO: replace with real image path e.g. "/images/project-1.jpg"
  alt: string;
  title: string;
  category: string;
  gradient: string; // placeholder until real images are added
  colSpan: number;
  rowSpan: number;
};

export const bentoImages: BentoImage[] = [
  {
    id: "bento-1",
    src: "/images/porsche-poster.png",
    alt: "Porsche GT3RS Poster",
    title: "Porsche Poster",
    category: "Graphic Design",
    gradient: "linear-gradient(135deg, #1a0a0a, #3d1010)",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: "bento-2",
    src: "/images/audir8.png",
    alt: "Audi R8 Poster",
    title: "Audi R8 Poster",
    category: "Photography + Graphic Design",
    gradient: "linear-gradient(135deg, #2e1a1a, #4a2d2d)",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "bento-3",
    src: "/images/amg.jpg",
    alt: "Project 3",
    title: "Project 3",
    category: "Brand Design",
    gradient: "linear-gradient(135deg, #1a2e1a, #2d4a2d)",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "bento-4",
    src: "/images/ink-lake.png",
    alt: "Ink's Lake",
    title: "Ink's Lake",
    category: "India Ink Painting",
    gradient: "linear-gradient(135deg, #1a1a2e, #2d2d4a)",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "bento-5",
    src: "/images/pokemon-generative.png",
    alt: "Pokemon Extended Art",
    title: "Pokemon Art Extension",
    category: "Generative AI",
    gradient: "linear-gradient(135deg, #2e2a1a, #4a3f2d)",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: "bento-6",
    src: "/images/officeinteriordesign.jpg",
    alt: "Home Office Interior Design",
    title: "Home Office Interior Design",
    category: "Interior Design",
    gradient: "linear-gradient(135deg, #2e1a2e, #4a2d4a)",
    colSpan: 1,
    rowSpan: 1,
  },
];
