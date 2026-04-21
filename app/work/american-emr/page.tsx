"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ProjectsNavRow from "@/components/ProjectsNavRow";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const PROCESS_STEPS = [
  { step: "01", title: "Research", body: "Reviewed AMR user data and ran patient interviews to map pain points across navigation and core features." },
  { step: "02", title: "Visual Design", body: "Defined a blue trust-first color system, Montserrat typography, and a reusable component library." },
  { step: "03", title: "Prototype", body: "Built interactive Figma flows across 7+ screens — from login through billing and messaging." },
  { step: "04", title: "Iterate", body: "Three rounds of testing refined navigation, the Quick Highlights widget, and sticky menu structure." },
];

const HIGHLIGHT_VERSIONS = [
  {
    version: "V1",
    image: "/images/american-emr/highlights-v1.png",
    title: "Widget-style cards",
    body: "Black titles and icons for visual recognition. Arrows and a \"details\" label indicated clickability. Consistent with the dashboard arrow motif.",
  },
  {
    version: "V2",
    image: "/images/american-emr/highlights-v2.png",
    title: "Simplified",
    body: "Removed icons and \"details\" text — arrows already implied clickability. Increased arrow size for better continuity. Users found it too uniform to scan.",
  },
  {
    version: "V3",
    image: "/images/american-emr/highlights-v3.png",
    title: "Final",
    body: "Reintroduced icons for identifiability at a glance. Dropped the \"details\" text. Balanced visual load between V1 and V2.",
  },
];

export default function AmericanEMRCaseStudy() {
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
              background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(0,45,122,0.6) 0%, rgba(6,15,26,0.55) 50%, transparent 75%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none dark:hidden"
            style={{
              background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(0,45,122,0.08) 0%, transparent 65%)",
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
                <span className="text-sm font-medium tracking-widest uppercase text-fg-muted">Mobile Design · 2024</span>
                <span className="w-5 h-px bg-fg-muted/40" />
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold text-fg tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                American EMR
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-fg-muted font-light max-w-xl mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Patient healthcare mobile application
              </motion.p>

              <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg leading-relaxed mb-10">
                An all-in-one patient portal centralizing appointments, records, prescriptions,
                billing, and messaging — designed during a week-long design internship.
              </motion.p>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rounded-2xl overflow-hidden border border-border bg-border w-full [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-border md:[&>*:nth-child(n+3)]:border-t-0"
              >
                {[
                  { label: "Role", value: "Product Design Intern" },
                  { label: "Tools", value: "Figma" },
                  { label: "Type", value: "Mobile Design" },
                  { label: "Duration", value: "1 week" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-bg px-3 py-3 md:px-5 md:py-4 flex flex-col gap-0.5 min-w-0">
                    <p className="text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-fg-muted">{label}</p>
                    <p className="text-xs md:text-sm text-fg font-medium leading-snug">{value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Cover image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden border border-border shadow-[0_32px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
            >
              <Image
                src="/images/american-emr/american-emr.png"
                alt="American EMR"
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
              Healthcare apps are fragmented and outdated.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg mb-16 leading-relaxed">
              Patients manage their healthcare across separate apps with no unified place to schedule
              appointments, view records, or pay bills. The friction leads to missed appointments,
              skipped refills, and disengagement from care.
            </motion.p>

            {/* Pain point cards */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-3">
              {[
                { icon: "🗂️", title: "Fragmented", body: "Records, billing, and scheduling live in separate places." },
                { icon: "📅", title: "Missed Appointments", body: "No centralized reminders or easy rebooking." },
                { icon: "💊", title: "Skipped Refills", body: "Prescription management buried deep in legacy portals." },
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
              One app for{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                the entire patient experience.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3">
              {["Appointments", "Medical records", "Prescriptions", "Billing", "Messaging"].map((p) => (
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
              className="flex flex-col items-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
                Process
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-fg text-center mb-16"
                style={{ fontFamily: "var(--font-display)" }}
              >
                From research to prototype in a week.
              </motion.h2>

              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {PROCESS_STEPS.map(({ step, title, body }) => (
                  <motion.div
                    key={step}
                    variants={fadeUp}
                    className="p-6 rounded-2xl border border-border bg-surface/60 flex flex-col gap-3"
                  >
                    <span className="text-2xl font-bold text-fg-muted/40" style={{ fontFamily: "var(--font-display)" }}>{step}</span>
                    <p className="text-sm font-semibold text-fg">{title}</p>
                    <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. RESEARCH — USER PERSONAS
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
              Research
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-fg mb-6 max-w-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three personas, three distinct frustrations.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg mb-12 leading-relaxed">
              Interviews with existing patients surfaced the core pain points. Each persona represented
              a different failure mode in the current experience.
            </motion.p>

            <motion.div variants={stagger} className="flex flex-col gap-4">
              {[
                "/images/american-emr/userpersona1.png",
                "/images/american-emr/userpersona2.png",
                "/images/american-emr/userpersona3.png",
              ].map((src, i) => (
                <motion.div key={i} variants={fadeUp} className="rounded-2xl overflow-hidden border border-border">
                  <Image src={src} alt={`User persona ${i + 1}`} width={1200} height={600} className="w-full h-auto" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. OVERVIEW — APP
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-y border-border bg-surface/30">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-12">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">The App</span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-fg mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Designed for clarity at a glance.
                </h2>
                <p className="text-base text-fg-muted max-w-md leading-relaxed">
                  A trust-first blue palette, clean typography, and a dashboard that surfaces what matters immediately.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-border shadow-sm">
                <Image
                  src="/images/american-emr/healthcare-app.png"
                  alt="American EMR — App overview"
                  width={1200}
                  height={720}
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. ITERATION — QUICK HIGHLIGHTS
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
              Iteration
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-fg mb-6 max-w-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three rounds to get Quick Highlights right.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg mb-12 leading-relaxed">
              After completing the home dashboard, unused space led to a new feature: a widget that
              surfaces key patient info — reminders, appointments, missed payments — at a glance.
              Getting the balance of clarity and visual weight took three passes.
            </motion.p>

            {/* All 3 versions side by side */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-border mb-8">
              <Image
                src="/images/american-emr/quick-highlights-versions.png"
                alt="Quick Highlights — all versions"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Version cards */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HIGHLIGHT_VERSIONS.map(({ version, image, title, body }) => (
                <motion.div key={version} variants={fadeUp} className="flex flex-col rounded-2xl border border-border overflow-hidden">
                  <div className="border-b border-border p-1.5">
                    <Image src={image} alt={`Quick Highlights ${version}`} width={600} height={400} className="rounded-xl w-full h-auto" />
                  </div>
                  <div className="p-5 flex flex-col gap-2 bg-surface/60">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full border border-border"
                        style={{
                          background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {version}
                      </span>
                      <p className="text-sm font-semibold text-fg">{title}</p>
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            8. KEY DESIGN DECISIONS
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-y border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
                Design Decisions
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-fg mb-16 max-w-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Two decisions that changed the experience.
              </motion.h2>

              {/* Decision 1 — Back arrows */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-8">
                <p className="text-xl font-semibold text-fg">Back arrows in subpages</p>
                <p className="text-sm text-fg-muted leading-relaxed max-w-2xl mb-4">
                  Users couldn&apos;t reliably navigate back — the home icon wasn&apos;t intuitive enough.
                  A back arrow at the top of each subpage, consistent with the dashboard&apos;s arrow motif,
                  resolved it immediately in testing.
                </p>
                <div className="rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="/images/american-emr/arrow-addition-emr.png"
                    alt="Back arrow addition"
                    width={1200}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>

              {/* Decision 2 — Sticky nav before/after */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <p className="text-xl font-semibold text-fg">Expanding the sticky navigation</p>
                <p className="text-sm text-fg-muted leading-relaxed max-w-2xl mb-4">
                  The initial 3-icon menu left out Medical Records and Notifications entirely,
                  forcing patients back to the dashboard. Expanding to 5 icons, removing text labels,
                  and switching to filled icons improved coverage and scanability simultaneously.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <div className="rounded-t-2xl border border-border border-b-0 overflow-hidden bg-surface">
                      <span className="text-xs font-semibold tracking-widest uppercase text-fg-muted px-4 py-2.5 border-b border-border block">Before</span>
                      <Image src="/images/american-emr/emr-menu-1.png" alt="Navigation — before" width={600} height={340} className="w-full h-auto" />
                    </div>
                    <div className="rounded-b-2xl bg-surface border border-border p-5">
                      <p className="text-sm text-fg-muted leading-relaxed">3 icons with text labels — Prescriptions, Home, and Chats. Medical Records and Notifications were missing entirely.</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="rounded-t-2xl border border-border border-b-0 overflow-hidden bg-surface">
                      <span className="text-xs font-semibold tracking-widest uppercase text-fg-muted px-4 py-2.5 border-b border-border block">After</span>
                      <Image src="/images/american-emr/emr-menu-2.png" alt="Navigation — after" width={600} height={340} className="w-full h-auto" />
                    </div>
                    <div className="rounded-b-2xl bg-surface border border-border p-5">
                      <p className="text-sm text-fg-muted leading-relaxed">5 filled icons, no text labels. All key sections accessible from anywhere in the app.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            9. OUTCOME
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-b border-border bg-surface/20">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-12">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">Outcome</span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-fg mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  7+ screens. One cohesive experience.
                </h2>
                <p className="text-base text-fg-muted max-w-md leading-relaxed">
                  A fully prototyped patient portal that balances information density with ease of use.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-2xl overflow-hidden border border-border shadow-[0_24px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)] mb-12"
              >
                <Image
                  src="/images/american-emr/dashboard-emr.png"
                  alt="American EMR — Final dashboard"
                  width={1200}
                  height={720}
                  className="w-full h-auto"
                />
              </motion.div>

              <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Unified patient portal",
                  "Quick Highlights widget",
                  "5-tab sticky navigation",
                  "3 rounds of iteration",
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
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            10. KEY LEARNINGS + WHAT'S NEXT
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
                    icon: "🧱",
                    heading: "Build the library first",
                    body: "Not setting up a component library from the start was the biggest mistake — it slowed iteration and introduced inconsistencies I had to chase down in every round.",
                  },
                  {
                    num: "02",
                    icon: "🤝",
                    heading: "Align with engineering early",
                    body: "The appointment booking flow and payment UI both hit feasibility walls with the dev team. Earlier conversations would have prevented late-stage redesigns.",
                  },
                  {
                    num: "03",
                    icon: "🏥",
                    heading: "Domain knowledge matters",
                    body: "Healthcare design has specific trust and accessibility requirements. Deeper domain knowledge earlier would have surfaced constraints I only found through iteration.",
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
                    icon: "📐",
                    heading: "Component library from day one",
                    body: "Start every project with variants, instances, and auto-layout before a single screen is designed. Non-negotiable.",
                  },
                  {
                    num: "02",
                    icon: "⚙️",
                    heading: "Engineering-aware design",
                    body: "Align with engineering on constraints before committing to complex interaction patterns. Design with implementation cost in mind.",
                  },
                  {
                    num: "03",
                    icon: "🩺",
                    heading: "Deeper healthcare domain knowledge",
                    body: "Invest in understanding healthcare workflows, compliance requirements, and accessibility standards specific to medical products.",
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

        {/* ── Next Project ─────────────────────────────────────── */}
        <ProjectsNavRow currentSlug="american-emr" />

        <Footer />
      </main>
    </>
  );
}
