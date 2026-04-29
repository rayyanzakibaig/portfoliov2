"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    body: "One intensive session to understand the business, market positioning, and visual direction. Produced initial rough sketches of possible page structures.",
    image: "/images/investate/wireframe1.jpg",
  },
  {
    step: "02",
    title: "Brand",
    body: "Developed the logo, Montserrat type system, and a black/white palette with warm accents — documented as a transferable brand guide.",
    image: "/images/investate/Branding.png",
  },
  {
    step: "03",
    title: "Design",
    body: "Wireframed and designed all 5 pages — from hero to contact — iterating on layout structure before moving to high-fidelity.",
    image: "/images/investate/wireframe3.jpg",
  },
  {
    step: "04",
    title: "Build",
    body: "Coded and deployed the site in HTML/CSS, handed off with editable source files and a short brand usage guide.",
    image: "/images/investate/investate.jpg",
  },
];

const WIREFRAMES = [
  {
    label: "A",
    src: "/images/investate/wireframe1.jpg",
    annotation: "Single-column layout — clear hierarchy and easy scanning, but limited visual interest on wider screens",
  },
  {
    label: "B",
    src: "/images/investate/wireframe2.jpg",
    annotation: "Three-column grid — dynamic and photo-rich, ideal for property showcasing, but complex to build responsively",
  },
  {
    label: "C",
    src: "/images/investate/wireframe3.jpg",
    annotation: "Two-column image-text split — balanced density and visual weight. Selected as the structural direction",
  },
];

const INSIGHTS = [
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
];

export default function InvestateCaseStudy() {
  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen bg-bg">

        {/* ── Back ─────────────────────────────────────────────── */}
        <div className="fixed top-24 left-6 md:left-10 z-50 hidden md:block">
          <Link
            href="/"
            className="text-sm text-fg-muted hover:text-fg transition-colors duration-200 flex items-center gap-1.5"
          >
            ← Work
          </Link>
        </div>

        {/* ═══════════════════════════════════════════════════════
            1. HERO
        ════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none hidden dark:block"
            style={{
              background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(59,31,14,0.7) 0%, rgba(19,15,8,0.55) 50%, transparent 75%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none dark:hidden"
            style={{
              background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(59,31,14,0.07) 0%, transparent 65%)",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-16 w-full">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center mb-16"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
                <span className="w-5 h-px bg-fg-muted/40" />
                <span className="text-sm font-medium tracking-widest uppercase text-fg-muted">Brand Design · 2023</span>
                <span className="w-5 h-px bg-fg-muted/40" />
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold text-fg tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Investate Holdings
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-fg-muted font-light max-w-xl mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Brand identity and website design for a real estate investment firm.
              </motion.p>

              <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg leading-relaxed mb-10">
                No identity, no site, deals on the line. In 3 days I delivered a full brand system
                and a live 5-page marketing site.
              </motion.p>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rounded-2xl overflow-hidden border border-border bg-border w-full [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-border md:[&>*:nth-child(n+3)]:border-t-0"
              >
                {[
                  { label: "Role", value: "UX/UI Designer & Developer" },
                  { label: "Tools", value: "Figma, HTML/CSS" },
                  { label: "Type", value: "Brand Design" },
                  { label: "Duration", value: "3 days" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-bg px-3 py-3 md:px-5 md:py-4 flex flex-col gap-0.5 min-w-0">
                    <p className="text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-fg-muted">{label}</p>
                    <p className="text-xs md:text-sm text-fg font-medium leading-snug">{value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Live link */}
              <motion.div variants={fadeUp} className="mt-4">
                <a
                  href="https://investateholdings.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-fg/80 transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  View Live Site ↗
                </a>
              </motion.div>
            </motion.div>

            {/* Cover */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden border border-border shadow-[0_32px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
            >
              <Image
                src="/images/investate/investate.jpg"
                alt="Investate Holdings"
                width={1200}
                height={720}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. THE PROBLEM
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
              The Problem
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-fg mb-6 max-w-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Losing deals because of no brand presence.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg mb-16 leading-relaxed">
              The founders had no brand identity and were actively losing deals because their online
              presence looked unprofessional. They needed something that signaled credibility, stability,
              and expertise — and they needed it immediately.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-3 gap-3">
              {[
                { icon: "🚫", title: "No Brand Identity", body: "No logo, colors, or consistent visual language." },
                { icon: "📉", title: "Lost Credibility", body: "Deals were slipping to competitors with polished presences." },
                { icon: "⏱️", title: "Zero Runway", body: "No time for a lengthy agency engagement — needed to ship fast." },
              ].map(({ icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="p-4 rounded-2xl border border-border bg-surface/60 flex flex-col gap-2"
                >
                  <span className="text-xl">{icon}</span>
                  <p className="text-xs font-semibold text-fg">{title}</p>
                  <p className="text-xs text-fg-muted leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. GOAL
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-y border-border">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-3xl mx-auto px-6 md:px-8 flex flex-col items-center text-center gap-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted">
              Goal
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-fg leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A brand that closes deals.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Live in 3 days.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3">
              {["Logo + brand system", "5-page marketing site", "Transferable assets"].map((p) => (
                <motion.span
                  key={p}
                  variants={fadeUp}
                  className="px-4 py-2 rounded-full border border-border bg-surface text-sm text-fg-muted"
                >
                  {p}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. PROCESS
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-b border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
                Process
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-fg mb-16 max-w-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Discovery to deployed in 72 hours.
              </motion.h2>

              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROCESS_STEPS.map(({ step, title, body, image }) => (
                  <motion.div key={step} variants={fadeUp} className="flex flex-col rounded-2xl border border-border overflow-hidden">
                    <div className="relative h-40 overflow-hidden border-b border-border">
                      <Image src={image} alt={title} fill className="object-cover object-top" sizes="600px" />
                    </div>
                    <div className="p-6 flex flex-col gap-2 bg-surface/60">
                      <span className="text-2xl font-bold text-fg-muted/40" style={{ fontFamily: "var(--font-display)" }}>{step}</span>
                      <p className="text-sm font-semibold text-fg">{title}</p>
                      <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. RESEARCH — WIREFRAMES
        ════════════════════════════════════════════════════════ */}
        <section className="py-32">
          {/* Text — constrained */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-5xl mx-auto px-6 md:px-8 mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
              Research
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-fg mb-6 max-w-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three layout directions, one winner.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg leading-relaxed">
              A competitive audit of investment firm sites and a two-hour discovery session defined
              the visual tension: premium but not intimidating. Three wireframe structures were evaluated
              before committing to the final direction.
            </motion.p>
          </motion.div>

          {/* Wireframes — full-width */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 md:px-12"
          >
            {WIREFRAMES.map(({ label, src, annotation }) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col gap-3">
                <div className="rounded-xl border border-border overflow-hidden">
                  <Image src={src} alt={`Layout option ${label}`} width={600} height={400} className="w-full h-auto" />
                </div>
                <p className="text-sm text-fg-muted leading-relaxed">
                  <span
                    className="font-semibold mr-1"
                    style={{
                      background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {label}
                  </span>
                  {annotation}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. KEY INSIGHTS
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-y border-border bg-surface/30">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-16">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">Insights</span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-fg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  What the research revealed.
                </h2>
              </motion.div>

              <motion.div variants={stagger} className="flex flex-col gap-4">
                {INSIGHTS.map(({ insight, response }, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="p-5 rounded-2xl border border-border bg-bg flex flex-col gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="mt-0.5 text-xs font-bold tabular-nums shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-fg leading-relaxed font-medium">{insight}</p>
                    </div>
                    <div className="ml-8 pl-4 border-l-2 border-border">
                      <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-1.5">Design Response</p>
                      <p className="text-sm text-fg-muted leading-relaxed">{response}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. BRAND SYSTEM
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            {/* Visual */}
            <motion.div variants={fadeUp}>
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                <Image
                  src="/images/investate/Branding.png"
                  alt="Investate brand system"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted">Brand System</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Montserrat at every level.
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  {
                    label: "Typeface",
                    text: "A single typeface — Montserrat — carries the entire brand. Differentiation comes from weight and size alone. Clean, scalable, and easy for the client to apply independently.",
                  },
                  {
                    label: "Numbers first",
                    text: "The hero leads with deal volume and returns data rather than a tagline. In a trust-driven market, specificity is more persuasive than branding language.",
                  },
                  {
                    label: "Two-column layout",
                    text: "Chosen over a three-column grid — it balanced visual richness with readability and held up on mobile without a framework.",
                  },
                ].map(({ label, text }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <p className="text-sm font-semibold tracking-widest uppercase text-fg">{label}</p>
                    <p className="text-sm text-fg-muted leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            8. OUTCOME
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-t border-border bg-surface/20">
          {/* Heading — constrained */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-5xl mx-auto px-6 md:px-8 mb-12"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
              <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">Outcome</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-fg mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                First deal closed within two weeks.
              </h2>
              <p className="text-base text-fg-muted max-w-md leading-relaxed">
                A logo, color palette, typography system, and 5-page live marketing site — delivered in 3 days.
              </p>
            </motion.div>
          </motion.div>

          {/* Main screenshot — full-width */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="px-6 md:px-12 mb-4"
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-[0_24px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/investate/investate-screens.png"
                alt="Investate — final site"
                width={1200}
                height={720}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Support images — full-width */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-4 px-6 md:px-12 mb-12"
          >
            <div className="rounded-xl overflow-hidden border border-border">
              <Image src="/images/investate/investate.jpg" alt="Investate homepage" width={600} height={400} className="w-full h-auto object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              <Image src="/images/investate/about-us.png" alt="Investate about page" width={600} height={400} className="w-full h-auto object-cover" />
            </div>
          </motion.div>

          {/* Bullets — constrained */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-5xl mx-auto px-6 md:px-8"
          >
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Full brand system",
                "5-page live site",
                "3-day delivery",
                "Deal closed in 2 weeks",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-5 rounded-2xl border border-border bg-bg flex items-center"
                >
                  <p className="text-sm text-fg-muted leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            9. KEY LEARNINGS + WHAT'S NEXT
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {/* Left — Key Learnings */}
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted block mb-2">
                  What I Learned
                </span>
                {[
                  {
                    num: "01",
                    icon: "⚡",
                    heading: "Speed is a design constraint",
                    body: "Three days isn't enough time to do brand identity properly. What I delivered was a strong starting point, not a finished system. That distinction matters — and I should have been clearer about it with the client.",
                  },
                  {
                    num: "02",
                    icon: "🔢",
                    heading: "Specificity beats taglines",
                    body: "In a high-trust market, concrete numbers and outcomes outperform abstract brand language every time. Leading with data rather than copy was the single best design decision.",
                  },
                  {
                    num: "03",
                    icon: "📋",
                    heading: "Document for independence",
                    body: "The brand guide was as important as the site. Clients can't maintain consistency without a framework — naming the type scale and documenting usage built the confidence they needed to apply it themselves.",
                  },
                ].map(({ num, icon, heading, body }) => (
                  <motion.div
                    key={num}
                    variants={fadeUp}
                    className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{icon}</span>
                      <span className="text-xs uppercase tracking-widest text-fg-muted">{num}</span>
                    </div>
                    <p className="text-base font-semibold text-fg">{heading}</p>
                    <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Right — What's Next */}
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted block mb-2">
                  What&apos;s Next
                </span>
                {[
                  {
                    num: "01",
                    icon: "🎨",
                    heading: "Expand the brand system",
                    body: "Build a full icon set and investor pitch deck template so the brand extends beyond the website into every client-facing touchpoint.",
                  },
                  {
                    num: "02",
                    icon: "🧪",
                    heading: "A/B test the hero",
                    body: "Current version leads with credibility. Test a version that leads with returns — once there's real traffic data to measure against.",
                  },
                  {
                    num: "03",
                    icon: "🏘️",
                    heading: "Property listings feature",
                    body: "Build a listings section once the team has deal flow to populate it — turning the marketing site into a functional property showcase.",
                  },
                ].map(({ num, icon, heading, body }) => (
                  <motion.div
                    key={num}
                    variants={fadeUp}
                    className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{icon}</span>
                      <span className="text-xs uppercase tracking-widest text-fg-muted">{num}</span>
                    </div>
                    <p className="text-base font-semibold text-fg">{heading}</p>
                    <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
