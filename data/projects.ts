export type Project = {
  slug: string;
  title: string;
  accentWord: string;
  subtitle: string;
  coverImage?: string;
  coverVideo?: string;
  description: string;
  year: string;
  role: string;
  duration: string;
  tools: string;
  gradientFrom: string;
  gradientTo: string;
  tag: string;
  tags?: string[];
  prevSlug: string;
  nextSlug: string;
  wip?: boolean;
  liveUrl?: string;
  cursorLabel?: string;
  overview: string;
  problem: string;
  outcome: string;
  stats: { value: string; label: string }[];
  processSteps: { step: string; title: string; description: string; processImage?: string }[];
  // Optional extended case study fields
  overviewImage?: string;
  overviewSupportImages?: string[];
  goals?: string[];
  research?: string;
  researchImages?: string[];
  researchAnnotations?: string[];
  keyInsights?: Array<string | { insight: string; response: string }>;
  userFlow?: string;
  iterations?: string;
  iterationsImages?: string[];
  keyDesignDecisions?: { title: string; description: string; beforeImage?: string; image?: string }[];
  finalDesign?: string;
  finalDesignImages?: string[];
  prototype?: string;
  reflection?: string;
  nextSteps?: string[];
};

export const projects: Project[] = [
  {
    slug: "hire-journey",
    title: "Hire Journey",
    accentWord: "Journey",
    coverVideo: "/images/hirejourney/hirejourneycover.mp4",
    subtitle: "A full-stack web helping job seekers find and track their next opportunity.",
    description: "Modern Job Tracker for Job Seekers",
    year: "2026",
    role: "Product Designer & Developer",
    duration: "In Progress",
    tools: "React, Supabase, Netlify, Claude Code, Figma, Node.js",
    gradientFrom: "#1a2340",
    gradientTo: "#2d3f6b",
    tag: "Full Stack App",
    tags: ["Product Design", "Full Stack"],
    prevSlug: "investate",
    nextSlug: "sleep-os",
    liveUrl: "https://hirejourney.netlify.app",
    overview:
      "Hire Journey is a full-stack web application designed to help job seekers manage their entire search process — from discovery to offer. The product combines a clean UI with powerful organizational tools.",
    problem:
      "Job searching is chaotic. Spreadsheets, scattered emails, and dozens of browser tabs create cognitive overload at the worst possible time. I set out to build something that made the process feel manageable.",
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
    goals: [
      "Give job seekers a single, stress-free place to track every application",
      "Reduce time spent on administrative overhead so more energy goes to actual job seeking",
      "Surface actionable next steps at a glance, without requiring manual input",
    ],
    research:
      "Conducted 8 semi-structured interviews with active job seekers across SWE, design, and PM tracks. Supplemented with a competitive audit of 6 existing tools — Notion templates, Huntr, Teal, LinkedIn, spreadsheets, and Trello. Found that 7/8 participants used a spreadsheet and described it as \"better than nothing, not actually good.\"",
    keyInsights: [
      "Users lose track of application status within 2–3 weeks due to scattered communication across email, phone, and LinkedIn",
      "The emotional weight of job searching means complex tools get abandoned quickly — simplicity is a retention feature",
      "Calendar integration and deadline reminders ranked highest in desirability across all participants",
    ],
    keyDesignDecisions: [
      {
        title: "Kanban over list",
        description: "A board view mirrors the mental model job seekers already have for tracking status — applied, interviewing, offer, rejected. Lists obscure this progression.",
      },
      {
        title: "Minimal required fields",
        description: "Requiring only company name and role to create a card removes friction at entry, the highest-dropout moment in competing tools.",
      },
      {
        title: "Notes over integrations",
        description: "Rather than email parsing (complex, privacy-sensitive), we prioritized a fast in-app notes field. Users wanted to capture thoughts quickly, not automate everything.",
      },
      {
        title: "Subtle reminders, not alarms",
        description: "Follow-up nudges appear as soft badges rather than push notifications, respecting the emotional state of active job seekers.",
      },
    ],
    reflection:
      "Building this as a solo full-stack project compressed the feedback loop between design and engineering in a way that changed how I think about handoffs. Several design decisions I made in Figma turned out to be significantly more complex to implement than expected, and I had to revise them mid-build. That experience now informs how I spec components for engineering teams.",
    nextSteps: [
      "Add calendar integration to surface interview dates and deadlines inline",
      "Explore a mobile-first companion view for on-the-go updates",
      "Test the kanban view against a list view with real users to validate the board metaphor",
    ],
  },
  {
    slug: "sleep-os",
    title: "Sleep Improvement",
    accentWord: "OS",
    coverVideo: "/images/sleep-os/palantir-cover.mp4",
    subtitle: "Palantir design challenge",
    description: "AI System to Improve Sleep Behavior",
    year: "2025",
    role: "Product Designer",
    duration: "2 hours",
    tools: "Figma",
    gradientFrom: "#1a1a2e",
    gradientTo: "#16213e",
    tag: "UX Design",
    tags: ["UX Design", "Design Sprint"],
    prevSlug: "hire-journey",
    nextSlug: "american-emr",
    wip: true,
    overview:
      "Sleep OS is a conceptual operating system layer designed to help users optimize their sleep through ambient data collection and intelligent scheduling. Built for the Palantir design challenge.",
    problem:
      "Most sleep trackinmg apps are passive — they collect data but don't act on it. The challenge was to design a system that actively intervenes, gently adjusting your digital environment to support better sleep hygiene.",
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
    goals: [
      "Design an ambient, non-intrusive system that actively supports sleep hygiene rather than passively tracking it",
      "Create a novel wind-down mode that is distinct from existing Do Not Disturb paradigms",
      "Demonstrate the concept with enough fidelity to be judged on interaction quality, not just surface aesthetics",
    ],
    research:
      "Given the 72-hour constraint, research was rapid but structured. Reviewed 3 published papers on blue light and sleep disruption. Audited existing OS-level sleep features — iOS Focus, macOS Night Shift, Android Bedtime mode. Identified the core gap: all existing tools are opt-in and static, none adapt dynamically to user behaviour.",
    keyInsights: [
      "Existing sleep features feel punitive rather than supportive — they take things away without offering anything in return",
      "The most effective interventions happen 60–90 minutes before sleep, not at bedtime",
      "Users want control but don't want to think — progressive automation with easy manual override is the right model",
    ],
    keyDesignDecisions: [
      {
        title: "Ambient over active",
        description: "Wind-down mode activates gradually, not at a hard cutoff. Dimming and filtering intensify over 90 minutes rather than switching at a set time.",
      },
      {
        title: "OS layer, not app",
        description: "Positioning as an OS feature rather than a third-party app gives Sleep OS the system-level access needed to affect notifications, brightness, and app behaviour.",
      },
      {
        title: "Learn before restrict",
        description: "The first two weeks of use are observation-only. Restrictions only kick in after Sleep OS has enough data to make intelligent, personalised suggestions.",
      },
    ],
    reflection:
      "Working within a 72-hour constraint forces a useful discipline: every feature has to earn its place. I over-invested in the design system early and compressed prototype time more than I would have liked. In a second sprint I would timebox the system work to 4 hours and spend the saved time on more screens.",
    nextSteps: [
      "Prototype the adaptive notification dampening system with real timing logic",
      "Test the wind-down mode concept with users who have chronic sleep issues, not just general audiences",
      "Explore how Sleep OS would integrate with third-party apps beyond the OS layer",
    ],
  },
  {
    slug: "american-emr",
    cursorLabel: "UX Design Internship",
    title: "American EMR",
    accentWord: "EMR",
    coverImage: "/images/american-emr/american-emr.png",
    subtitle: "Patient healthcare mobile application",
    description: "Simplifying Patient Healthcare Interface",
    year: "2024",
    role: "Product Design Intern",
    duration: "1 week",
    tools: "Figma",
    gradientFrom: "#1a2e2a",
    gradientTo: "#2d4a44",
    tag: "Mobile Design",
    tags: ["Mobile Design", "Internship"],
    prevSlug: "sleep-os",
    nextSlug: "investate",
    overview:
      "American EMR addresses challenges common in existing EMR software — outdated UI, limited features, and poor usability. I designed an all-in-one patient portal centralizing appointments, medical records, prescriptions, billing, and messaging into a single cohesive experience.",
    problem:
      "Patients manage their healthcare across fragmented apps with no single place to schedule appointments, view records, or pay bills. The friction leads to missed appointments, skipped refills, and disengagement from care.",
    outcome:
      "A fully prototyped patient portal across 7+ screens. Three rounds of iteration on the Quick Highlights widget and sticky navigation produced a design that balances information density with ease of use.",
    stats: [
      { value: "7+", label: "Feature screens prototyped" },
      { value: "3→5", label: "Sticky nav items after testing" },
      { value: "3", label: "Quick Highlights iterations" },
    ],
    processSteps: [
      { step: "01", title: "Research", description: "Reviewed AMR user data and ran patient interviews to map pain points across navigation and core features." },
      { step: "02", title: "Visual Design", description: "Defined a blue trust-first color system, Montserrat typography, and a reusable component library." },
      { step: "03", title: "Prototype", description: "Built interactive Figma flows across 7+ screens — from login through billing and messaging." },
      { step: "04", title: "Iterate", description: "Three rounds of testing refined navigation, the Quick Highlights widget, and sticky menu structure." },
    ],
    overviewImage: "/images/american-emr/healthcare-app.png",
    goals: [
      "Centralize scheduling, records, prescriptions, billing, and messaging in one app",
      "Keep navigation simple enough for patients who aren't tech-savvy",
      "Surface critical info — reminders, upcoming appointments, due payments — directly on the dashboard",
    ],
    research:
      "I reviewed patient data from American EMR and ran interviews to identify core pain points. Three user personas emerged, each voicing a distinct frustration with existing healthcare apps.",
    researchImages: [
      "/images/american-emr/userpersona1.png",
      "/images/american-emr/userpersona2.png",
      "/images/american-emr/userpersona3.png",
    ],
    keyInsights: [
      "Critical info was buried — patients needed reminders, appointments, and payments on the dashboard, not hidden two taps deep",
      "Three nav icons wasn't enough — patients couldn't quickly reach Medical Records or Notifications",
      "Arrows outperformed text labels as navigation affordances — cleaner and more intuitive for all users",
    ],
    iterations: "/images/american-emr/quick-highlights-versions.png",
    keyDesignDecisions: [
      {
        title: "Quick Highlights section",
        description: "Half the dashboard was empty. I added a widget surfacing medication reminders, upcoming appointments, and due payments at a glance — tested across three iterations to land on the right balance of density and clarity.",
      },
      {
        title: "Back arrows in subpages",
        description: "Users couldn't reliably navigate back — the home icon wasn't intuitive enough. A back arrow at the top of each subpage, consistent with the dashboard's arrow motif, resolved it immediately in testing.",
        image: "/images/american-emr/arrow-addition-emr.png",
      },
      {
        title: "Expanding the sticky navigation",
        description: "The initial menu had 3 icons with text labels — Prescriptions, Home, and Chats. While legible, it left out Medical Records and Notifications entirely, forcing patients to go back to the dashboard to access them. I expanded to 5 icons, removed the text labels to reduce visual weight, and switched to filled icons for better visibility at a glance.",
        beforeImage: "/images/american-emr/emr-menu-1.png",
        image: "/images/american-emr/emr-menu-2.png",
      },
    ],
    finalDesign: "/images/american-emr/dashboard-emr.png",
    reflection:
      "Not setting up a component library from the start was the biggest mistake — it slowed iteration and introduced inconsistencies I had to chase down. I also learned the cost of late stakeholder alignment: the appointment booking flow and payment UI both hit feasibility walls with the dev team that earlier conversations could have prevented.",
    nextSteps: [
      "Start every project with a component library — variants, instances, and auto-layout from day one",
      "Align with engineering on constraints before committing to complex interaction patterns",
      "Deepen healthcare domain knowledge to design more practically informed solutions",
    ],
  },
  {
    slug: "investate",
    cursorLabel: "Website Development",
    title: "Investate Holdings",
    accentWord: "Holdings",
    coverImage: "/images/investate/investate.jpg",
    subtitle: "Brand identity and website design for a real estate investment firm.",
    description: "Short Term Rental Website",
    year: "2023",
    role: "UX/UI Designer & Developer",
    duration: "3 days",
    tools: "Figma, HTML/CSS",
    gradientFrom: "#2e2a1a",
    gradientTo: "#4a3f2d",
    tag: "Brand Design",
    tags: ["Brand Design", "Development"],
    prevSlug: "american-emr",
    nextSlug: "hire-journey",
    liveUrl: "https://investateholdings.com",
    overview:
      "Investate Holdings is a real estate investment and rental management firm. They needed a brand and web presence built fast — no identity, no site, deals on the line. In 3 days, I delivered a full brand system and a live 5-page marketing site.",
    problem:
      "The founders had no brand identity and were losing deals because their online presence looked unprofessional. They needed something that signaled credibility, stability, and expertise — immediately.",
    outcome:
      "The final deliverable included a logo, color palette, typography system, and a live 5-page website. The client closed their first deal using the new materials within two weeks of launch.",
    stats: [
      { value: "3d", label: "Brand-to-launch timeline" },
      { value: "5", label: "Pages designed and built" },
      { value: "2wk", label: "Time to first closed deal" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery",
        description: "One intensive session to understand the business, market positioning, and visual direction. Produced initial rough sketches of possible page structures.",
        processImage: "/images/investate/wireframe1.jpg",
      },
      {
        step: "02",
        title: "Brand",
        description: "Developed the logo, Montserrat type system, and a black/white palette with warm accents — documented as a transferable brand guide.",
        processImage: "/images/investate/Branding.png",
      },
      {
        step: "03",
        title: "Design",
        description: "Wireframed and designed all 5 pages — from hero to contact — iterating on layout structure before moving to high-fidelity.",
        processImage: "/images/investate/wireframe3.jpg",
      },
      {
        step: "04",
        title: "Build",
        description: "Coded and deployed the site in HTML/CSS, handed off with editable source files and a short brand usage guide.",
        processImage: "/images/investate/investate.jpg",
      },
    ],
    overviewImage: "/images/investate/investate-screens.png",
    overviewSupportImages: [
      "/images/investate/investate.jpg",
      "/images/investate/about-us.png",
    ],
    goals: [
      "Build a brand that signals credibility and stability to high-net-worth real estate investors",
      "Design and deploy a 5-page marketing site within 3 days",
      "Create assets the client can use independently — no designer required for day-to-day materials",
    ],
    research:
      "A rapid competitive audit of real estate investment firm sites in the same market tier informed the visual direction. A two-hour discovery session with both founders surfaced their brand values, target audience, and key differentiators. The central tension: premium but not intimidating — credible to experienced investors, accessible to first-timers.",
    researchImages: [
      "/images/investate/wireframe1.jpg",
      "/images/investate/wireframe2.jpg",
      "/images/investate/wireframe3.jpg",
    ],
    researchAnnotations: [
      "Single-column layout — clear hierarchy and easy scanning, but limited visual interest on wider screens",
      "Three-column grid — dynamic and photo-rich, ideal for property showcasing, but complex to build responsively",
      "Two-column image-text split — balanced density and visual weight. Selected as the structural direction",
    ],
    keyInsights: [
      {
        insight: "Competitors defaulted to dark, masculine visual languages — a clear opportunity to differentiate",
        response: "Chose a clean black-and-white base with warm sand accents, reading as approachable authority rather than corporate intimidation",
      },
      {
        insight: "The target audience responds to specificity: concrete numbers outperform abstract value propositions",
        response: "Structured the hero and Why Choose Us sections around deal volume data and concrete outcomes, not tagline copy",
      },
      {
        insight: "Founders had strong typographic instincts but no framework — naming the system built their internal confidence",
        response: "Formalized into a defined Montserrat scale with named roles: Display, Heading, Subheading, Body, Caption — documented for independent use",
      },
    ],
    iterationsImages: [
      "/images/investate/wireframe3.jpg",
      "/images/investate/benefits.png",
      "/images/investate/investate-screens.png",
    ],
    keyDesignDecisions: [
      {
        title: "Type system: Montserrat at every level",
        description: "A single typeface — Montserrat — carries the entire brand. Differentiation comes from weight and size alone: bold display headlines at the top, light caption text at the bottom. Clean, scalable, and easy for the client to apply independently.",
        image: "/images/investate/Branding.png",
      },
      {
        title: "Numbers before copy",
        description: "The hero leads with deal volume and returns data rather than a tagline. In a trust-driven market, specificity is more persuasive than branding language.",
      },
      {
        title: "Two-column over full-bleed",
        description: "The two-column image-text split was chosen over a three-column grid after wireframing — it balanced visual richness with readability and held up better on mobile without a framework.",
      },
    ],
    finalDesignImages: [
      "/images/investate/investate-screens.png",
      "/images/investate/investate.jpg",
      "/images/investate/about-us.png",
    ],
    reflection:
      "Three days is not enough time to do brand identity properly. What I delivered was a strong starting point, not a finished system. The client treated it as final, which worked — but I should have been clearer about what was MVP work versus what would need iteration once they had real customers and feedback.",
    nextSteps: [
      "Expand the brand system with a full icon set and investor pitch deck template",
      "A/B test the hero — current version leads with credibility; test a version that leads with returns",
      "Build a property listings feature once the team has deal flow to populate it",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
