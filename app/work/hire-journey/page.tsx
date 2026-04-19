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

const PIPELINE_STAGES = [
  { label: "Watchlisted", color: "#6B7280", count: 12 },
  { label: "Applied", color: "#8A6FF0", count: 8 },
  { label: "Assessment", color: "#F59E0B", count: 3 },
  { label: "Interview", color: "#3B82F6", count: 2 },
  { label: "Offer", color: "#10B981", count: 1 },
  { label: "Rejected", color: "#EF4444", count: 5 },
];

const FLOW_STEPS = [
  { label: "Add Job", sub: "Paste a job link or enter details" },
  { label: "Extract Details", sub: "Automatically pulls role, company, and info" },
  { label: "Save & Organize", sub: "Stores everything in one place" },
  { label: "Track Progress", sub: "Move jobs through stages (Applied, Interview, etc.)" },
  { label: "View Insights", sub: "See your progress and results" },
];

export default function HireJourneyCaseStudy() {
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
          {/* Subtle gradient bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(138,111,240,0.15) 0%, transparent 70%)",
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
                <span className="text-sm font-medium tracking-widest uppercase text-fg-muted">Personal Product · 2026</span>
                <span className="w-5 h-px bg-fg-muted/40" />
              </motion.div>

              {/* Title */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
                <div
                  className="rounded-xl p-1.5 flex-shrink-0 dark:[background:linear-gradient(135deg,#060d1f,#0f0820)]"
                  style={{ background: "linear-gradient(135deg, #1a2a5e, #2d1a4e)" }}
                >
                  <Image
                    src="/images/hirejourney/favicon.png"
                    alt="HireJourney"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <h1
                  className="text-5xl md:text-7xl font-bold text-fg tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  HireJourney
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-fg-muted font-light max-w-xl mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Designing a better system for the job seeker.
              </motion.p>

              <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg leading-relaxed mb-10">
                Managing dozens of job applications in spreadsheets is inefficient.
                HireJourney automates job tracking, visualizes application progress, and simplifies the job search.
              </motion.p>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rounded-2xl overflow-hidden border border-border bg-border w-full"
              >
                {[
                  { label: "Role", value: "Product Design + Development", row2: false },
                  { label: "Tools", value: "Figma · Next.js · Claude Code", row2: false },
                  { label: "Type", value: "Personal Product", row2: true },
                ].map(({ label, value, row2 }) => (
                  <div key={label} className={`bg-bg px-3 py-3 md:px-5 md:py-4 flex flex-col gap-0.5 min-w-0 ${row2 ? "border-t border-border md:border-t-0" : ""}`}>
                    <p className="text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-fg-muted">{label}</p>
                    <p className="text-xs md:text-sm text-fg font-medium leading-snug">{value}</p>
                  </div>
                ))}
                <a
                  href="https://hirejourney.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-t border-border md:border-t-0 bg-bg px-3 py-3 md:px-5 md:py-4 flex flex-col gap-0.5 min-w-0 group hover:bg-surface transition-colors duration-150"
                >
                  <p className="text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-fg-muted">Live</p>
                  <p className="text-xs md:text-sm text-accent font-medium leading-snug group-hover:text-accent-hover transition-colors duration-150">
                    View site ↗
                  </p>
                </a>
              </motion.div>
            </motion.div>

            {/* Hero screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden border border-border shadow-[0_32px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
            >
              <Image
                src="/images/hirejourney/hirejourneydashboard.png"
                alt="HireJourney Dashboard"
                width={1200}
                height={720}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. PROBLEM
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
              Messy Job Tracking in Spreadsheets.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg mb-16 leading-relaxed">
              I tracked my internship applications in a spreadsheet and had to manually input each field.
              As my applications increased, it became difficult to keep track.
            </motion.p>

            {/* Spreadsheet screenshot */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-border shadow-sm mb-12">
              <Image
                src="/images/hirejourney/spreadsheet-tracker.png"
                alt="Google Sheets job application tracker"
                width={1200}
                height={700}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Pain point cards */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-3">
              {[
                { icon: "⌨️", title: "Manual Entry", body: "Every field, by hand." },
                { icon: "🔗", title: "Fragmented", body: "Separate sources for search and tracking." },
                { icon: "📉", title: "Poor Visibility", body: "Cluttered, unclear insights." },
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
            3. DESIGN GOAL
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
              Create an all in one solution{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                from job search to offer.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3">
              {["Improve job search", "Automate repetitive tasks", "Provide Useful insights"].map((p) => (
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
            4. PRODUCT SYSTEM
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-y border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">
                Product System
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-fg text-center mb-16"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How it all connects.
              </motion.h2>

              {/* Flow diagram — vertical on mobile, horizontal on md+ */}
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center w-full gap-0">
                {FLOW_STEPS.map(({ label, sub }, i) => (
                  <div key={label} className="flex flex-col md:flex-row md:items-center md:flex-1 min-w-0">
                    <div className="p-4 rounded-2xl border border-border bg-surface/60 text-center flex flex-col justify-center gap-1 w-full h-32">
                      <p className="text-sm font-semibold text-fg">{label}</p>
                      <p className="text-xs text-fg-muted leading-snug">{sub}</p>
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <>
                        {/* Vertical arrow (mobile) */}
                        <div className="flex flex-col items-center py-2 gap-0.5 md:hidden">
                          <div className="w-px h-4 bg-border" />
                          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="text-fg-muted/40">
                            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        {/* Horizontal arrow (desktop) */}
                        <div className="hidden md:flex items-center px-2 gap-0.5 shrink-0">
                          <div className="h-px w-4 bg-border" />
                          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="text-fg-muted/40">
                            <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. FEATURE: JOB IMPORT
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
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {/* URL input mockup */}
              <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                <div className="px-6 pt-6 pb-4 border-b border-border">
                  <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-3">Add a Job</p>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-bg text-sm text-fg-muted">
                      <span className="opacity-40">🔗</span>
                      <span className="opacity-50">https://linkedin.com/jobs/view/...</span>
                    </div>
                    <button className="px-4 py-2.5 rounded-xl bg-fg text-bg text-sm font-medium shrink-0">Import</button>
                  </div>
                </div>
                {/* Parsed result */}
                <div className="px-6 py-4 flex flex-col gap-3">
                  <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted">Parsed automatically</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Company", value: "Stripe" },
                      { label: "Role", value: "Product Designer" },
                      { label: "Location", value: "Remote" },
                      { label: "Source", value: "LinkedIn" },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-3 rounded-xl bg-bg border border-border">
                        <p className="text-xs text-fg-muted mb-0.5">{label}</p>
                        <p className="text-sm font-medium text-fg">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-full bg-[#8A6FF0]/10 text-[#8A6FF0] text-xs font-medium">Watchlisted</span>
                    <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-fg-muted text-xs">View Listing ↗</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted">Feature 01</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Automated Job Import
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Problem", text: "Manual job entry is repetitive — same fields, every time." },
                  { label: "Solution", text: "Paste a job URL → HireJourney parses the listing and creates a complete entry automatically." },
                  { label: "Impact", text: "One action replaces multiple manual steps." },
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
            6. FEATURE: PIPELINE
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
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">Feature 02</span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-fg mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Application Pipeline
                </h2>
                <p className="text-base text-fg-muted max-w-md leading-relaxed">
                  Applications move through stages — UI should reflect that.
                </p>
              </motion.div>

              {/* Pipeline visual */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-bg overflow-hidden shadow-sm mb-12">
                <div className="border-b border-border px-6 py-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-fg">My Pipeline</p>
                  <p className="text-xs text-fg-muted">31 applications</p>
                </div>
                <div className="p-4 overflow-x-auto">
                  <div className="flex gap-3 min-w-max">
                    {PIPELINE_STAGES.map(({ label, color, count }) => (
                      <div key={label} className="w-48 flex flex-col gap-2">
                        {/* Stage header */}
                        <div className="flex items-center justify-between px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-xs font-semibold text-fg">{label}</span>
                          </div>
                          <span className="text-xs text-fg-muted">{count}</span>
                        </div>
                        {/* Cards */}
                        <div className="flex flex-col gap-2">
                          {Array.from({ length: Math.min(count, 2) }).map((_, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl border border-border bg-surface/60 flex flex-col gap-1.5"
                            >
                              <div className="h-2.5 rounded-full bg-fg/10 w-3/4" />
                              <div className="h-2 rounded-full bg-fg/6 w-1/2" />
                            </div>
                          ))}
                          {count > 2 && (
                            <div className="px-3 py-2 text-xs text-fg-muted text-center">
                              +{count - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Stage labels */}
              <motion.div variants={stagger} className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {PIPELINE_STAGES.map(({ label, color }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="flex items-center gap-2 p-3 rounded-xl border border-border bg-bg"
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-xs font-medium text-fg">{label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p variants={fadeUp} className="text-sm text-fg-muted text-center mt-8">
                Users can instantly understand their progress and know exactly where to focus next.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. FEATURE: RESUME BUILDER
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-10"
          >
            {/* Title */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted">Feature 03</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Resume Builder
              </h2>
            </motion.div>

            {/* Screenshots */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
              {[
                { src: "/images/hirejourney/resume-overview.png", alt: "Resume overview" },
                { src: "/images/hirejourney/resume-edit.png", alt: "Resume editor" },
                { src: "/images/hirejourney/resume-design.png", alt: "Resume templates" },
              ].map(({ src, alt }) => (
                <div key={src} className="rounded-2xl overflow-hidden border border-border shadow-sm">
                  <Image src={src} alt={alt} width={600} height={900} className="w-full h-auto" />
                </div>
              ))}
            </motion.div>

            {/* Problem / Solution / Impact */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Problem", text: "Many job seekers struggle building ATS-friendly resumes that pass automated screening." },
                { label: "Solution", text: "Upload a resume or input structured data. HireJourney generates customizable ATS-optimized templates." },
                { label: "Impact", text: "Helps you pass the first barrier: automated screening." },
              ].map(({ label, text }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <p className="text-sm font-semibold tracking-widest uppercase text-fg">{label}</p>
                  <p className="text-sm text-fg-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. BUILDING THE MVP
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted">Development</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Tech Stack
              </h2>
              <p className="text-base text-fg-muted leading-relaxed">
                I used Claude Code to rapidly prototype and build a functional MVP, allowing design
                decisions to be tested in a real product environment.
              </p>
              <a
                href="https://hirejourney.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-fg/80 transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                View Live Site ↗
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              {[
                { icon: "/images/tech/nextjs.png", label: "Next.js", sub: "Frontend framework" },
                { icon: "/images/tech/supabase.png", label: "Supabase", sub: "Database + Auth" },
                { icon: "/images/tech/claude.png", label: "Claude Code", sub: "AI-assisted dev" },
                { icon: "/images/tech/netlify.svg", iconDark: "/images/tech/netlify-dark.png", label: "Netlify", sub: "Deployment" },
              ].map(({ icon, iconDark, label, sub }) => (
                <div
                  key={label}
                  className="p-5 rounded-2xl border border-border bg-surface/60 flex flex-col gap-2"
                >
                  {iconDark ? (
                    <>
                      <img src={icon} alt={label} className="w-8 h-8 object-contain dark:hidden" />
                      <img src={iconDark} alt={label} className="w-8 h-8 object-contain hidden dark:block" />
                    </>
                  ) : (
                    <img src={icon} alt={label} className="w-8 h-8 object-contain" />
                  )}
                  <p className="text-sm font-semibold text-fg">{label}</p>
                  <p className="text-xs text-fg-muted">{sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            9. OUTCOME
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-t border-border bg-surface/20">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-16">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">Outcome</span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-fg mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  From clutter to order.
                </h2>
                <p className="text-base text-fg-muted max-w-md leading-relaxed">
                  A fully functional product I now use in my own job search. Solving the exact problem it was designed for.
                </p>
              </motion.div>

              {/* Dashboard screenshot */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl overflow-hidden border border-border shadow-[0_24px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)] mb-12"
              >
                <Image
                  src="/images/hirejourney/hirejourneydashboard.png"
                  alt="HireJourney — Final Product"
                  width={1200}
                  height={720}
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Outcome bullets */}
              <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Automated job tracking",
                  "Visual application phase",
                  "Resume builder",
                  "Working MVP used in my own search",
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

        {/* ══════════════════════════════════════════════════════
            10. KEY LEARNINGS
        ══════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-b border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Left — Key Learnings */}
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted block mb-2">
                  What I Learned
                </span>
                {[
                  {
                    num: "01",
                    icon: "🎨",
                    heading: "Design + Development",
                    body: "Building my own product taught me where I might encouter gaps between UX and development. I now make tradeoffs earlier and design with implementation in mind.",
                  },
                  {
                    num: "02",
                    icon: "⚡",
                    heading: "Performance Awareness",
                    body: "Small decisions around data fetching and load add up. I am now more deliberate about when and how data is requested.",
                  },
                  {
                    num: "03",
                    icon: "🔒",
                    heading: "Full-Stack & Security",
                    body: "As this is my first full stack web app, I learned to connect frontend to backend and handle the basics — RLS policies, input sanitization, and keeping API keys server-side.",
                  },
                ].map(({ num, icon, heading, body }) => (
                  <motion.div
                    key={num}
                    variants={fadeUp}
                    className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 text-accent">
                      {icon}
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
                  What's Next
                </span>
                {[
                  {
                    num: "01",
                    icon: "🤖",
                    heading: "Auto Apply",
                    body: "Potentially use AI to auto apply to jobs. Could be monetized by keeping it a subscription feature.",
                  },
                  {
                    num: "02",
                    icon: "📝",
                    heading: "Auto Write Resume/Cover Letter",
                    body: "Again keep it a subscription feature but it would automatically adjust your experience to align with the role.",
                  },
                  {
                    num: "03",
                    icon: "🗺️",
                    heading: "More Resources",
                    body: "Want to build this into a resource for your whole career journey and not just for the hiring process, that would include adding things like a career roadmap, salary expectations, what skills or technologies to learn, and so on.",
                  },
                ].map(({ num, icon, heading, body }) => (
                  <motion.div
                    key={num}
                    variants={fadeUp}
                    className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 text-accent">
                      {icon}
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

        {/* ══════════════════════════════════════════════════════
            11. NEXT PROJECT
        ══════════════════════════════════════════════════════ */}
        <ProjectsNavRow currentSlug="hire-journey" />

        <Footer />
      </main>
    </>
  );
}
