export type CreativeItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  gradient: string;
  colSpan: number;
  rowSpan: number;
  award?: string;
};

export const creativeItems: CreativeItem[] = [
  {
    id: "audi-r8",
    title: "Audi R8 Poster",
    type: "Graphic Design",
    description:
      "An editorial poster series exploring the visual language of automotive precision. Inspired by the raw geometry of the Audi R8 — stripped back to form, shadow, and light.",
    gradient: "from-zinc-900 to-zinc-700",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: "inks-lake",
    title: "Ink's Lake",
    type: "Mixed Media Art",
    description:
      "A mixed media exploration of stillness and reflection. This piece won a Scholastic Silver Key Award, recognized for its innovative blend of digital and traditional techniques.",
    gradient: "from-teal-950 to-teal-800",
    colSpan: 1,
    rowSpan: 2,
    award: "Scholastic Silver Key Award",
  },
  {
    id: "porsche",
    title: "Porsche Poster",
    type: "Graphic Design",
    description:
      "A typographic exploration of speed and heritage. The Porsche identity deconstructed into its essential elements — velocity, precision, and legacy — rendered in stark monochrome.",
    gradient: "from-red-950 to-red-900",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "brand-explorations",
    title: "Brand Explorations",
    type: "Brand Design",
    description:
      "A collection of brand identity explorations — mark-making, color theory, and typographic systems applied to fictional and real-world brands. Each a study in restraint.",
    gradient: "from-indigo-950 to-indigo-800",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "type-studies",
    title: "Type Studies",
    type: "Typography",
    description:
      "An ongoing study of letterform, spacing, and hierarchy. Typography as art — each piece explores how type communicates emotion and meaning beyond its literal content.",
    gradient: "from-violet-950 to-violet-800",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: "photo-series",
    title: "Photo Series",
    type: "Photography",
    description:
      "A documentary series capturing moments of quiet — the geometry of everyday objects, the light that goes unnoticed, the spaces between interactions.",
    gradient: "from-emerald-950 to-emerald-800",
    colSpan: 1,
    rowSpan: 1,
  },
];
