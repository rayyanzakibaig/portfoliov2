export type Project = {
  slug: string;
  title: string;
  accentWord: string;
  subtitle: string;
  description: string;
  year: string;
  role: string;
  duration: string;
  tools: string;
  gradientFrom: string;
  gradientTo: string;
  tag: string;
  prevSlug: string;
  nextSlug: string;
  overview: string;
  problem: string;
  outcome: string;
  stats: { value: string; label: string }[];
  processSteps: { step: string; title: string; description: string }[];
};

export const projects: Project[] = [
  {
    slug: "hire-journey",
    title: "Hire Journey",
    accentWord: "Journey",
    subtitle: "Full-stack job search application",
    description: "A full-stack platform rethinking how modern job seekers track and manage their search.",
    year: "2024",
    role: "Product Designer & Developer",
    duration: "3 months",
    tools: "Figma, React, Node.js",
    gradientFrom: "#1a2340",
    gradientTo: "#2d3f6b",
    tag: "Product Design",
    prevSlug: "investate",
    nextSlug: "sleep-os",
    overview:
      "Hire Journey is a full-stack web application designed to help job seekers manage their entire search process — from discovery to offer. The product combines a clean UI with powerful organizational tools.",
    problem:
      "Job searching is chaotic. Spreadsheets, scattered emails, and dozens of browser tabs create cognitive overload at the worst possible time. We set out to build something that made the process feel manageable.",
    outcome:
      "The final product shipped with a kanban-style application tracker, company research tools, and interview prep modules. Early users reported a 40% reduction in time spent organizing their search.",
    stats: [
      { value: "40%", label: "Reduction in search overhead" },
      { value: "3mo", label: "Full design-to-deploy cycle" },
      { value: "12", label: "Core user flows designed" },
    ],
    processSteps: [
      { step: "01", title: "Research", description: "Conducted 8 user interviews with active job seekers to map pain points." },
      { step: "02", title: "Define", description: "Synthesized insights into a core problem statement and feature set." },
      { step: "03", title: "Design", description: "Iterated through 3 rounds of wireframes and high-fidelity mockups." },
      { step: "04", title: "Build", description: "Developed the full-stack app with React frontend and Node.js backend." },
    ],
  },
  {
    slug: "sleep-os",
    title: "Sleep OS",
    accentWord: "OS",
    subtitle: "Palantir annual design challenge",
    description: "A 72-hour solo design sprint creating an operating system concept for better sleep health.",
    year: "2024",
    role: "UX Designer (Solo)",
    duration: "72 hours",
    tools: "Figma",
    gradientFrom: "#1a1a2e",
    gradientTo: "#16213e",
    tag: "UX Design",
    prevSlug: "hire-journey",
    nextSlug: "american-emr",
    overview:
      "Sleep OS is a conceptual operating system layer designed to help users optimize their sleep through ambient data collection and intelligent scheduling. Built for the Palantir design challenge.",
    problem:
      "Most sleep tracking apps are passive — they collect data but don't act on it. The challenge was to design a system that actively intervenes, gently adjusting your digital environment to support better sleep hygiene.",
    outcome:
      "The submission featured a comprehensive design system, 24 screens, and a novel 'wind-down mode' concept that dynamically adjusts notifications, screen temperature, and app access based on sleep schedule.",
    stats: [
      { value: "72h", label: "Design sprint duration" },
      { value: "24", label: "Screens designed" },
      { value: "1", label: "Designer, end-to-end" },
    ],
    processSteps: [
      { step: "01", title: "Brief", description: "Deconstructed the challenge prompt and defined scope within constraints." },
      { step: "02", title: "Concept", description: "Rapid ideation across 4 concept directions, selecting the most novel." },
      { step: "03", title: "Design", description: "Built a full design system and prototyped key flows in Figma." },
      { step: "04", title: "Present", description: "Packaged the submission as a case study with narrative and rationale." },
    ],
  },
  {
    slug: "american-emr",
    title: "American EMR",
    accentWord: "EMR",
    subtitle: "Patient healthcare mobile application",
    description: "Redesigning the patient-facing mobile experience for a leading electronic medical records platform.",
    year: "2024",
    role: "Product Design Intern",
    duration: "1 week",
    tools: "Figma",
    gradientFrom: "#1a2e2a",
    gradientTo: "#2d4a44",
    tag: "Mobile Design",
    prevSlug: "sleep-os",
    nextSlug: "investate",
    overview:
      "During a design internship, I was tasked with reimagining the patient mobile experience for American EMR's app — used by thousands of patients to access health records, schedule appointments, and communicate with providers.",
    problem:
      "The existing app scored poorly on usability testing — patients struggled to find key information, appointment booking had 6+ steps, and the visual design felt clinical and cold. Healthcare should feel human.",
    outcome:
      "The redesigned flows reduced appointment booking to 3 steps, improved information hierarchy throughout the app, and introduced a warmer visual language that tested significantly better with patients.",
    stats: [
      { value: "3", label: "Steps to book an appointment" },
      { value: "6→3", label: "Booking flow reduction" },
      { value: "+28%", label: "Task completion in testing" },
    ],
    processSteps: [
      { step: "01", title: "Audit", description: "Conducted a full heuristic evaluation of the existing app." },
      { step: "02", title: "Research", description: "Reviewed session recordings and prior usability test reports." },
      { step: "03", title: "Redesign", description: "Rebuilt core flows with a new component library and visual system." },
      { step: "04", title: "Test", description: "Ran moderated usability sessions with 5 participants, iterated." },
    ],
  },
  {
    slug: "investate",
    title: "Investate Holdings",
    accentWord: "Holdings",
    subtitle: "Brand identity and website design",
    description: "Complete brand identity and website for a real estate investment and rental management firm.",
    year: "2023",
    role: "UX/UI Designer & Developer",
    duration: "3 days",
    tools: "Figma, HTML/CSS",
    gradientFrom: "#2e2a1a",
    gradientTo: "#4a3f2d",
    tag: "Brand Design",
    prevSlug: "american-emr",
    nextSlug: "hire-journey",
    overview:
      "Investate Holdings needed a brand and web presence built fast — a real estate investment firm entering a competitive market. In 3 days, I delivered a full brand system and a live marketing site.",
    problem:
      "The founders had no brand identity and were losing deals because their online presence looked unprofessional. They needed something that signaled credibility, stability, and expertise — immediately.",
    outcome:
      "The final brand system included a logo, color palette, typography, and a 5-page website. The client closed their first deal using the new materials within two weeks of launch.",
    stats: [
      { value: "3d", label: "Brand-to-launch timeline" },
      { value: "5", label: "Pages designed and built" },
      { value: "2wk", label: "Time to first closed deal" },
    ],
    processSteps: [
      { step: "01", title: "Discovery", description: "One intensive session to understand the business, market, and vision." },
      { step: "02", title: "Brand", description: "Developed logo, color, and type systems reflecting trust and stability." },
      { step: "03", title: "Design", description: "Designed all 5 web pages with clear information architecture." },
      { step: "04", title: "Build", description: "Coded the site in clean HTML/CSS, deployed and handed off." },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
