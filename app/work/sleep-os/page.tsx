"use client";

import { motion } from "framer-motion";
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

const ROOT_CAUSES = [
  { icon: "🔄", title: "Routine", body: "Irregular schedules disrupt circadian rhythm." },
  { icon: "📱", title: "Screen Time", body: "Blue light suppresses melatonin production." },
  { icon: "🍽️", title: "Diet", body: "Late meals and caffeine delay sleep onset." },
  { icon: "🧠", title: "Stress", body: "Mental load carries into the night." },
  { icon: "💡", title: "Environment", body: "Light and temperature interfere with rest." },
];

const COMPONENTS = [
  { icon: "💡", label: "Smart Lighting", sub: "Dims and shifts tone gradually" },
  { icon: "🪟", label: "Auto Blinds", sub: "Controls light exposure" },
  { icon: "📱", label: "Screen Detection", sub: "Flags late-night usage" },
  { icon: "⏰", label: "Reminders", sub: "Guides behavior during the day" },
  { icon: "🔄", label: "Learning Loop", sub: "Adapts from usage patterns" },
];

const HOW_IT_WORKS = [
  { label: "Detect Behavior", sub: "App notices late-night scrolling" },
  { label: "Suggest Wind-Down", sub: "Nudges a low-stimulation alternative" },
  { label: "Dim Lights", sub: "Lighting gradually shifts to rest mode" },
  { label: "Log Pattern", sub: "Behavior is stored for learning" },
  { label: "Adapt Tomorrow", sub: "Next day's nudges adjust accordingly" },
];

const PRINCIPLES = [
  {
    num: "01",
    icon: "🤫",
    heading: "Passive Interaction",
    body: "Users shouldn't have to think about the app. The system works in the background with minimal input — detecting behavior and adjusting the environment automatically.",
  },
  {
    num: "02",
    icon: "🏠",
    heading: "Environment Over Interface",
    body: "Sleep is influenced more by surroundings than screens. The product extends beyond the phone — smart lighting, blinds, and ambient cues that signal the body to wind down.",
  },
  {
    num: "03",
    icon: "⚡",
    heading: "Actionable Over Informational",
    body: "Instead of overwhelming users with data, the system provides clear guidance, timely nudges, and simple insights designed to drive behavior — not inform it.",
  },
  {
    num: "04",
    icon: "🚀",
    heading: "Friction Reduction",
    body: "The goal is to eliminate barriers before they occur. Every feature was evaluated on whether it reduced the path to better sleep or added steps to it.",
  },
];

export default function SleepOSCaseStudy() {
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
              background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(40,40,80,0.8) 0%, rgba(28,28,30,0.55) 50%, transparent 75%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none dark:hidden"
            style={{
              background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(40,40,80,0.08) 0%, transparent 65%)",
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
                <span className="text-sm font-medium tracking-widest uppercase text-fg-muted">UX Design · 2025</span>
                <span className="w-5 h-px bg-fg-muted/40" />
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold text-fg tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Palantir Sleep OS Design Challenge
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-fg-muted font-light max-w-xl mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Palantir Technologies · Product Design Challenge
              </motion.p>

              <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg leading-relaxed mb-10">
                This was a 120 minute timed design challege from Palantir to design a sleep os app that
                adapts to the user, improves over time, while clearly communicating the design decisions made.
              </motion.p>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rounded-2xl overflow-hidden border border-border bg-border w-full [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-border md:[&>*:nth-child(n+3)]:border-t-0"
              >
                {[
                  { label: "Role", value: "Product Designer" },
                  { label: "Tools", value: "Figma" },
                  { label: "Type", value: "UX Design" },
                  { label: "Duration", value: "120 minutes" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-bg px-3 py-3 md:px-5 md:py-4 flex flex-col gap-0.5 min-w-0">
                    <p className="text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-fg-muted">{label}</p>
                    <p className="text-xs md:text-sm text-fg font-medium leading-snug">{value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Cover video */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden border border-border shadow-[0_32px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
            >
              <video
                src="/images/sleep-os/palantir-cover.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
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
              Tracking data doesn&apos;t change behavior.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-lg mb-16 leading-relaxed">
              Most sleep apps already track cycles, provide dashboards, and offer recommendations.
              Yet users still struggle with poor sleep. More data isn&apos;t the answer.
            </motion.p>

            {/* Pain point cards */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-3">
              {[
                { icon: "📊", title: "Passive Tracking", body: "Apps collect data but don't act on it." },
                { icon: "🔔", title: "No Behavior Change", body: "Information doesn't translate to habit." },
                { icon: "😴", title: "Users Still Struggle", body: "Despite the data, sleep quality doesn't improve." },
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
            3. THE REFRAME
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
              The Reframe
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-fg leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Don&apos;t track sleep better.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Build better sleep habits.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3">
              {["Reduce friction", "Guide passively", "Extend into the environment"].map((p) => (
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
            4. ROOT CAUSES
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
                Research
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-fg text-center mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Five root causes of poor sleep.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-fg-muted text-center max-w-md mb-16 leading-relaxed">
                All five are behavioral or environmental — not informational.
                No dashboard can fix them.
              </motion.p>

              <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
                {ROOT_CAUSES.map(({ icon, title, body }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className="p-5 rounded-2xl border border-border bg-surface/60 flex flex-col gap-3"
                  >
                    <span className="text-2xl">{icon}</span>
                    <p className="text-sm font-semibold text-fg">{title}</p>
                    <p className="text-xs text-fg-muted leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. SYSTEM CONCEPT
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
              <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                <div className="px-6 pt-6 pb-4 border-b border-border">
                  <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-1">Sleep OS</p>
                  <p className="text-xs text-fg-muted">Active — Wind-down in 42 min</p>
                </div>
                <div className="px-6 py-4 flex flex-col gap-3">
                  {COMPONENTS.map(({ icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-border">
                      <span className="text-lg shrink-0">{icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-fg">{label}</p>
                        <p className="text-xs text-fg-muted">{sub}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted">Solution</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A context-aware sleep system.
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Problem", text: "Users can't consistently act on sleep advice, even when they have it." },
                  { label: "Solution", text: "A system that works quietly in the background — adjusting environment and nudging behavior without requiring effort." },
                  { label: "Impact", text: "Better sleep without another app to manage." },
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
            6. HOW IT WORKS
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
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">Feedback Loop</span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-fg mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  How it works.
                </h2>
                <p className="text-base text-fg-muted max-w-md leading-relaxed">
                  The system continuously learns from behavior and improves with use.
                </p>
              </motion.div>

              {/* Flow diagram */}
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center w-full gap-0">
                {HOW_IT_WORKS.map(({ label, sub }, i) => (
                  <div key={label} className="flex flex-col md:flex-row md:items-center md:flex-1 min-w-0">
                    <div className="p-4 rounded-2xl border border-border bg-bg text-center flex flex-col justify-center gap-1 w-full h-32">
                      <p className="text-sm font-semibold text-fg">{label}</p>
                      <p className="text-xs text-fg-muted leading-snug">{sub}</p>
                    </div>
                    {i < HOW_IT_WORKS.length - 1 && (
                      <>
                        <div className="flex flex-col items-center py-2 gap-0.5 md:hidden">
                          <div className="w-px h-4 bg-border" />
                          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="text-fg-muted/40">
                            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
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
            7. DESIGN PRINCIPLES
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 border-b border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-16">
                <span className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-4">Design Principles</span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-fg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Four rules every decision followed.
                </h2>
              </motion.div>

              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRINCIPLES.map(({ num, icon, heading, body }) => (
                  <motion.div
                    key={num}
                    variants={fadeUp}
                    className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{icon}</span>
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

        {/* ═══════════════════════════════════════════════════════
            8. KEY LEARNINGS + WHAT'S NEXT
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
                    icon: "🔍",
                    heading: "Reframing is the work",
                    body: "The most valuable design decision happened before a single screen was drawn — shifting from 'track sleep better' to 'build better sleep habits' changed everything downstream.",
                  },
                  {
                    num: "02",
                    icon: "⏱️",
                    heading: "Constraints force clarity",
                    body: "120 minutes eliminates second-guessing. Every feature had to earn its place immediately. I now apply that same pressure voluntarily in longer projects.",
                  },
                  {
                    num: "03",
                    icon: "🏠",
                    heading: "Design beyond the screen",
                    body: "The most effective solution extended into the physical world. Products that shape environments rather than just interfaces can solve problems apps alone can't.",
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
                    icon: "🎤",
                    heading: "User Interviews",
                    body: "Conduct interviews to validate behavioral assumptions and test which nudges are most effective in practice.",
                  },
                  {
                    num: "02",
                    icon: "🏡",
                    heading: "Smart Home Prototyping",
                    body: "Build a real prototype of the smart home integrations — lighting, blinds, and sensor logic — with actual timing and environmental data.",
                  },
                  {
                    num: "03",
                    icon: "📈",
                    heading: "Longitudinal Study",
                    body: "Measure improvements in sleep consistency and quality over 4–6 weeks to validate whether the system drives real behavior change.",
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
        <ProjectsNavRow currentSlug="sleep-os" />

        <Footer />
      </main>
    </>
  );
}
