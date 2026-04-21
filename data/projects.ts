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
  panelGlow?: { from: string; to: string; strength?: number; solid?: boolean; base?: string };
  coverBlur?: number;
  gradientPanel?: boolean; // replace blurred cover bg in text panel with animated gradient orbs
  hideImage?: boolean; // omit image panel, text fills full card width
  panelImages?: string[]; // screenshots to display in the left panel when hideImage is true
  tag: string;
  tags?: string[];
  prevSlug: string;
  nextSlug: string;
  wip?: boolean;
  textOnly?: boolean;
  cardTitle?: string;
  logo?: string;
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
  researchImageStack?: boolean;
  researchAnnotations?: string[];
  keyInsights?: Array<string | { insight: string; response: string }>;
  userFlow?: string;
  iterations?: string;
  iterationsCards?: { title: string; description: string; image?: string }[];
  iterationsImages?: string[];
  keyDesignDecisions?: { title: string; description: string; beforeDescription?: string; afterDescription?: string; beforeImage?: string; image?: string }[];
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
    gradientFrom: "#3c64ff",
    gradientTo: "#823ce6",
    panelGlow: { from: "#3c64ff", to: "#823ce6" },
    gradientPanel: true,
    hideImage: true,
    panelImages: [
      "/images/hirejourney/resume-overview.png",
      "/images/hirejourney/resume-edit.png",
      "/images/hirejourney/resume-design.png",
    ],
    tag: "Full Stack App",
    tags: ["Product Design", "Full Stack App"],
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
      { value: "40%", label: "Faster tracking" },
      { value: "3 month", label: "Ideation → launch" },
      { value: "12", label: "User flows" },
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
    title: "Sleep OS",
    cardTitle: "Palantir Design Challenge",
    accentWord: "OS",
    textOnly: true,
    logo: "/images/PLTR White Logo.png",
    subtitle: "Palantir design challenge",
    description: "Adaptive Sleep OS improving your sleep",
    year: "2025",
    role: "Product Designer",
    duration: "120 minutes",
    tools: "Figma",
    gradientFrom: "#0a0a0f",
    gradientTo: "#1a1a2e",
    panelGlow: { from: "#1a1a2e", to: "#16213e" },
    tag: "UX Design",
    tags: ["Product Design", "Concept"],
    prevSlug: "hire-journey",
    nextSlug: "american-emr",
    overview:
      "Palantir gave me a single prompt, a blank canvas, and 120 minutes. No user research. No prior context. Just a problem space and a timer. The brief was broad enough to go anywhere — which meant the first and most important decision wasn't what to design, but what problem was actually worth solving.",
    problem:
      "My first instinct was to design a better sleep tracking dashboard. Better charts. Cleaner data. Smarter recommendations. But I stopped myself — because every major sleep app already does that. Oura, Apple Health, Sleep Cycle. They all track. They all surface data. And yet people still sleep badly. That gap told me something important: the problem wasn't a lack of information. It was that people had the information and still didn't change. So I reframed the entire challenge. Not \"how do we track sleep better?\" — but \"how do we actually change what people do before bed?\"",
    outcome:
      "A context-aware sleep system that works quietly in the background — adjusting lighting, detecting screen usage, and nudging habits before users ever feel friction. Smart home automation, passive reminders, and a feedback loop that improves over time. The goal was a product users would barely notice using, but would absolutely feel the results of.",
    stats: [
      { value: "120 min", label: "Timed product design challenge" },
      { value: "5", label: "Core components" },
      { value: "4", label: "Design principles" },
    ],
    processSteps: [
      { step: "01", title: "Reframe", description: "Before touching any UI, I spent the first stretch questioning the prompt itself. The real problem wasn't missing features — it was that existing solutions don't change behavior. That reframe became the foundation for every decision that followed." },
      { step: "02", title: "Root Causes", description: "I mapped the five things that actually disrupt sleep: irregular routines, screen exposure, late meals and caffeine, unresolved stress, and environment. All five are behavioral or environmental — none require better data to fix." },
      { step: "03", title: "Concept", description: "The concept came directly from the research: if the problem is environmental and behavioral, the solution should be too. A system that detects context and adjusts automatically — rather than asking the user to act on information they already have." },
      { step: "04", title: "Principles", description: "I grounded every feature decision in four principles before designing anything: passive interaction, environment over interface, actionable over informational, and friction reduction. These became the filter for what made the cut." },
    ],
    goals: [
      "Reframe the problem from 'track sleep better' to 'change sleep behavior' — the root cause is behavioral, not informational",
      "Design a system that works passively in the background, requiring as little conscious effort from the user as possible",
      "Communicate a clear design narrative and decision-making rationale within the 120-minute constraint",
    ],
    research:
      "I started by mapping everything that actually disrupts sleep — not missing features in existing apps, but the real-world causes. Irregular routines throw off circadian rhythm. Blue light at night suppresses melatonin. Late meals and caffeine delay sleep onset. Stress and mental load carry into the night. Light and temperature directly interfere with rest quality. What struck me immediately was that all five of these are behavioral or environmental. None of them are solved by a better chart. That became the spine of the entire concept.",
    keyInsights: [
      {
        insight: "The problem isn't a lack of data. It's a lack of behavior change.",
        response: "Every major sleep app already surfaces data. Oura, Apple Health, Sleep Cycle — they all track cycles and provide recommendations. Users still sleep badly. More information wasn't the answer. Changing what users actually do before bed was. The design direction shifted entirely toward passive behavior shaping.",
      },
      {
        insight: "People know what they should do. They just don't do it consistently.",
        response: "This is the gap that existing tools ignore. Rather than adding yet another reminder or insight, I designed a system that removes the need for willpower entirely — adjusting the environment automatically so the right conditions happen by default, not by conscious decision.",
      },
      {
        insight: "The best sleep technology is the kind you stop thinking about.",
        response: "If a user has to actively engage with the app for it to work, it will eventually get abandoned. The entire product was designed around disappearing into the routine — smart lighting dims on schedule, blinds close automatically, nudges surface only when they're actually useful.",
      },
    ],
    keyDesignDecisions: [
      {
        title: "Passive interaction over active dashboards",
        description: "The instinct in most sleep apps is to give users more controls, more data, more settings. I went the opposite direction. Every feature was evaluated on a single question: can this work without the user thinking about it? If yes, it was a candidate. If it required manual input to function, it was cut or simplified. The system should do the work — not remind users to do work.",
      },
      {
        title: "Environment over interface",
        description: "The biggest lever on sleep quality isn't what's on your phone screen — it's the room you're in. So the product extends beyond the phone. Smart lighting that dims automatically at your wind-down time. Automated blinds that close before bed. Temperature nudges. The phone becomes a control plane for the physical environment, not the primary experience.",
      },
      {
        title: "Actionable nudges over informational reports",
        description: "I deliberately deprioritized the data visualization layer that most sleep apps lead with. Instead of showing users a sleep score and leaving them to interpret it, the system surfaces one clear next action: 'dim your lights now,' 'your screen time is running late,' 'your window for a wind-down routine opens in 20 minutes.' Specificity drives behavior. Dashboards don't.",
      },
      {
        title: "Friction removal before friction occurs",
        description: "Most habit tools react to failure — they send a notification after you've already done the thing you shouldn't. I designed for the moments before. Lighting changes before you'd think to change it. The reminder comes before you pick up your phone for one more scroll. The goal is to intercept the pattern, not respond to it.",
      },
    ],
    reflection:
      "The reframe was the most valuable thing I did in this challenge — and it happened in the first fifteen minutes, before I drew a single screen. Once I stopped asking 'what features should a sleep app have?' and started asking 'why don't existing sleep apps work?', everything else followed naturally. Under a 120-minute constraint, that clarity is everything. There's no time to chase the wrong problem. What I'd do differently: I'd push the smart home integration narrative further and prototype at least one end-to-end flow with real timing logic, not just the concept.",
    nextSteps: [
      "Conduct user interviews to pressure-test the behavioral assumptions — specifically whether passive nudges feel helpful or intrusive in practice",
      "Build a working prototype of the smart home automation layer with real timing and sensor inputs to test the ambient experience",
      "Run a longitudinal study measuring whether the habit-shaping approach produces lasting improvements in sleep consistency, not just short-term novelty",
    ],
  },
  {
    slug: "american-emr",
    cursorLabel: "UX Design Internship",
    title: "American EMR",
    accentWord: "EMR",
    textOnly: true,
    coverImage: "/images/american-emr/american-emr.png",
    subtitle: "Patient healthcare mobile application",
    description: "Simplifying Patient Healthcare Mobile Interface",
    year: "2024",
    role: "Product Design Intern",
    duration: "1 week",
    tools: "Figma",
    gradientFrom: "#060f1a",
    gradientTo: "#0c2040",
    panelGlow: { from: "#0d2060", to: "#1a4db8", strength: 2.5, base: "linear-gradient(135deg, rgba(0,18,70,0.65) 0%, rgba(13,50,160,0.42) 100%)" },
    coverBlur: 24,
    tag: "Mobile Design",
    tags: ["Mobile Design", "UI/UX Internship"],
    prevSlug: "sleep-os",
    nextSlug: "investate",
    overview:
      "American EMR addresses challenges common in existing EMR software — outdated UI, limited features, and poor usability. I designed an all-in-one patient portal centralizing appointments, medical records, prescriptions, billing, and messaging into a single cohesive experience.",
    problem:
      "Patients manage their healthcare across fragmented apps with no single place to schedule appointments, view records, or pay bills. The friction leads to missed appointments, skipped refills, and disengagement from care.",
    outcome:
      "A fully prototyped patient portal across 7+ screens. Three rounds of iteration on the Quick Highlights widget and sticky navigation produced a design that balances information density with ease of use.",
    stats: [

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
      "I conducted interviews with existing patients to identify core pain points. Three user personas emerged, each voicing a distinct frustration with existing healthcare apps.",
    researchImages: [
      "/images/american-emr/userpersona1.png",
      "/images/american-emr/userpersona2.png",
      "/images/american-emr/userpersona3.png",
    ],
    researchImageStack: true,
    iterations: "/images/american-emr/quick-highlights-versions.png",
    iterationsCards: [
      {
        title: "Quick Highlights Section",
        description: "After completing the home dashboard, half of the screen was still unused space and I decided to add a Quick Highlights section. This feature displays key patient information, such as medication reminders, upcoming appointments, and missed payments, allowing users to easily view and access important details at a glance.",
      },
      {
        title: "Quick Highlights Version 1",
        description: "In the first iteration, I designed widget-style cards with black titles and icons for visual recognition. To maintain consistency with the dashboard, I integrated the arrows and added a \"details\" label, indicating that the cards were clickable for more information.",
        image: "/images/american-emr/highlights-v1.png",
      },
      {
        title: "Quick Highlights Version 2",
        description: "After reviewing the first version, user feedback indicated the cards were too cluttered. To simplify, I removed the icons and \"details\" text, as the arrows already indicated clickability. I kept only the arrows, increasing their size to maintain continuity with the dashboard and improve visibility.",
        image: "/images/american-emr/highlights-v2.png",
      },
      {
        title: "Quick Highlights Version 3",
        description: "After re-evaluating, version 2 made the cards indistinguishable at a glance — a problem since users should be able to quickly identify information. I reintroduced the icons to maintain design continuity from the dashboard while excluding the \"details\" text, balancing visual load.",
        image: "/images/american-emr/highlights-v3.png",
      },
    ],
    keyDesignDecisions: [
      {
        title: "Back arrows in subpages",
        description: "Users couldn't reliably navigate back — the home icon wasn't intuitive enough. A back arrow at the top of each subpage, consistent with the dashboard's arrow motif, resolved it immediately in testing.",
        image: "/images/american-emr/arrow-addition-emr.png",
      },
      {
        title: "Expanding the sticky navigation",
        description: "The initial menu had 3 icons with text labels — Prescriptions, Home, and Chats. While legible, it left out Medical Records and Notifications entirely, forcing patients to go back to the dashboard to access them. I expanded to 5 icons, removed the text labels to reduce visual weight, and switched to filled icons for better visibility at a glance.",
        beforeDescription: "The initial menu had 3 icons with text labels — Prescriptions, Home, and Chats. While legible, it left out Medical Records and Notifications entirely, forcing patients to go back to the dashboard to access them.",
        afterDescription: "I expanded to 5 icons, removed the text labels to reduce visual weight, and switched to filled icons for better visibility at a glance.",
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
    cursorLabel: "View Case Study",
    title: "Investate Holdings",
    accentWord: "Holdings",
    coverImage: "/images/investate/investate.jpg",
    subtitle: "Brand identity and website design for a real estate investment firm.",
    description: "Short Term Rental Company Website",
    year: "2023",
    role: "UX/UI Designer & Developer",
    duration: "3 days",
    tools: "Figma, HTML/CSS",
    gradientFrom: "#130f08",
    gradientTo: "#1f1a10",
    panelGlow: { from: "#1c0f07", to: "#3b1f0e" },
    tag: "Brand Design",
    tags: ["UX Design", "Web Development"],
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
      { value: "1 Day", label: "Designed and Launched" },
      { value: "5", label: "Pages designed" },
      { value: "", label: "" },
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
