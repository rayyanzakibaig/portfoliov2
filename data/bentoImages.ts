export type BentoImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  filterCategory: string;
  gradient: string;
  aspectRatio: string;
  award?: string;
  description?: string;
  containInModal?: boolean;  // if true, use object-contain in modal instead of fill
  modalContainAlways?: boolean; // if true, force object-contain at all breakpoints in modal
  thumbnailScale?: number;   // zoom scale for grid thumbnail (e.g. 1.1 = 10% crop)
  modalSrc?: string;         // alternate image to show in the modal (thumbnail stays as src)
};

export const bentoImages: BentoImage[] = [
  {
    id: "bento-1",
    src: "/images/creative/porsche-poster.jpg",
    alt: "Porsche GT3RS Poster",
    title: "Porsche Poster",
    category: "Graphic Design",
    filterCategory: "Graphic Design",
    gradient: "linear-gradient(135deg, #1a0a0a, #3d1010)",
    aspectRatio: "3/4",
    containInModal: true,
    description:
      "A typographic exploration of speed and heritage. The Porsche identity deconstructed into its essential elements — velocity, precision, and legacy — rendered in stark monochrome.",
  },
  {
    id: "bento-2",
    src: "/images/creative/audir8.jpg",
    alt: "Audi R8 Spyder",
    title: "Audi R8 Spyder",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #2e1a1a, #4a2d2d)",
    aspectRatio: "3/4",
    description:
      "A candy-red Audi R8 Spyder shot from behind on an open road — natural light, clean tarmac, and a machine that doesn't need context.",
  },
  {
    id: "bento-3",
    src: "/images/creative/amg.jpg",
    alt: "AMG",
    title: "AMG Roller",
    category: "Photoshop",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #1a2e1a, #2d4a2d)",
    aspectRatio: "4/3",
    description:
      "A photo-manipulation study in atmosphere and motion. The AMG rendered in its element — low, fast, and brutally composed against an overcast sky.",
  },
  {
    id: "bento-4",
    src: "/images/creative/ink-lake.jpg",
    alt: "Ink's Lake",
    title: "Ink's Lake",
    category: "India Ink Painting",
    filterCategory: "Mixed Media",
    gradient: "linear-gradient(135deg, #1a1a2e, #2d2d4a)",
    aspectRatio: "3/4",
    award: "Scholastic Silver Key Award",
    containInModal: true,
    description:
      "A mixed media exploration of stillness and reflection. This piece won a Scholastic Silver Key Award, recognized for its innovative blend of digital and traditional techniques.",
  },
  {
    id: "bento-8",
    src: "/images/creative/mclaren-roller.jpg",
    alt: "McLaren Roller",
    title: "McLaren Roller",
    category: "Photoshop",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
    aspectRatio: "4/3",
    thumbnailScale: 1.2,
    modalSrc: "/images/creative/mclaren-roller2.jpg",
    description:
      "A photo-manipulation study inspired by the raw aggression of McLaren's design language — captured mid-roll, ground-level, with emphasis on form and motion.",
  },
  {
    id: "bento-9",
    src: "/images/creative/porschelogo.jpg",
    alt: "Porsche Crest",
    title: "Porsche Crest",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
    aspectRatio: "1/1",
    description:
      "A close-up study of the iconic Porsche Stuttgart crest — gold, detail, and heritage captured in a single frame.",
  },
  {
    id: "bento-10",
    src: "/images/creative/mclaren-rooftop.jpg",
    alt: "McLaren Rooftop",
    title: "McLaren Rooftop",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
    aspectRatio: "3/4",
    description:
      "A green McLaren 570S with dihedral doors open, shot on a rooftop parking garage against an urban backdrop — raw light, raw machine.",
  },
  {
    id: "bento-11",
    src: "/images/creative/orange-building.jpg",
    alt: "Orange Building",
    title: "Orange Building",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #3d1f00, #6b3a00)",
    aspectRatio: "3/4",
    description: "An architectural study bathed in warm golden light — texture, shadow, and facade detail abstracted into form.",
  },
  {
    id: "bento-12",
    src: "/images/creative/water-tree.jpg",
    alt: "Tree in Water",
    title: "Water Tree",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #0a1a1a, #1a3030)",
    aspectRatio: "3/4",
    description: "A lone cypress standing in still water — solitude, reflection, and the quiet drama of nature in balance.",
  },
  {
    id: "bento-13",
    src: "/images/creative/church.jpg",
    alt: "Church Spires",
    title: "Church Spires",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #1a0d0d, #2d1a1a)",
    aspectRatio: "3/4",
    description: "Gothic spires rising against a stormy sky — ornate detail shot through bare branches, moody and timeless.",
  },
  {
    id: "bento-14",
    src: "/images/creative/brown-building.jpg",
    alt: "Art Deco Building",
    title: "Art Deco",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #1a1510, #2d2418)",
    aspectRatio: "3/4",
    description: "An Art Deco tower shot from below against a clear sky — repetition, geometry, and the ambition of stone.",
  },
  {
    id: "bento-15",
    src: "/images/creative/bird.jpg",
    alt: "Bird at Sunset",
    title: "Bird at Sunset",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #2d0a1a, #4a1a2d)",
    aspectRatio: "3/4",
    description: "A single bird silhouetted against a pink and violet sunset sky — minimalism, solitude, and perfect timing.",
  },
  {
    id: "bento-17",
    src: "/images/creative/vformation.jpg",
    alt: "Birds in V Formation at Sunset",
    title: "V Formation",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #2d0a3d, #6b1a4a)",
    aspectRatio: "3/4",
    description:
      "Four birds silhouetted against a soft gradient sky — violet bleeding into rose, the flock caught mid-flight in perfect formation.",
  },
  {
    id: "bento-18",
    src: "/images/creative/audir8-front.jpg",
    alt: "Audi R8 Front",
    title: "Audi R8 Front",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #1a0a0a, #3d1010)",
    aspectRatio: "3/4",
    description:
      "A red Audi R8 charging head-on down an open road — motion blur, pine trees, and golden light framing one of the most dramatic front ends in modern automotive design.",
  },
  {
    id: "bento-19",
    src: "/images/creative/rolls-royce.jpg",
    alt: "Rolls-Royce Wraith",
    title: "Rolls-Royce Wraith",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #0a0e1a, #1a2035)",
    aspectRatio: "3/4",
    description:
      "A blue Rolls-Royce Wraith gliding through an urban canyon at night — headlights cutting through motion blur, effortless and imposing in equal measure.",
  },
  {
    id: "bento-20",
    src: "/images/creative/deer.jpg",
    alt: "Deer in the Woods",
    title: "Deer in the Woods",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #0a1a0a, #1a2d1a)",
    aspectRatio: "3/4",
    description:
      "A white-tailed deer frozen mid-gaze between the trees — golden hour light filtering through dense brush, a quiet moment of wildlife caught in stillness.",
  },
  {
    id: "bento-21",
    src: "/images/creative/anole.jpg",
    alt: "Green Anole Lizard",
    title: "Green Anole",
    category: "Photography",
    filterCategory: "Photography",
    gradient: "linear-gradient(135deg, #0a1a10, #1a2d1a)",
    aspectRatio: "4/3",
    containInModal: true,
    description:
      "A macro portrait of a green anole — teal scales, obsidian eye, and razor-sharp detail against a soft grey backdrop. Patient shooting, rewarded.",
  },
  {
    id: "bento-16",
    src: "/images/creative/jewelry-still-life.jpg",
    alt: "Jewelry Still Life Drawing",
    title: "Jewelry Still Life",
    category: "Pencil Drawing",
    filterCategory: "Mixed Media",
    gradient: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
    aspectRatio: "4/3",
    containInModal: true,
    modalContainAlways: true,
    description:
      "A graphite still life study — a vanity mirror, glass jewelry box, and scattered pearl necklaces rendered with obsessive attention to light, shadow, and surface texture.",
  },
];
