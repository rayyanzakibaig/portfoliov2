"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

const highlights = [
  {
    icon: "✦",
    label: "Product Design",
    description:
      "End-to-end UX/UI — from research and wireframes to polished, shipped interfaces.",
  },
  {
    icon: "⌥",
    label: "Engineering",
    description:
      "React, Next.js, TypeScript. I build what I design, closing the gap between intent and reality.",
  },
  {
    icon: "◈",
    label: "Brand & Creative",
    description:
      "Visual identity systems, type, and motion — craft that communicates before a word is read.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] md:min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Animated gradient blobs — CSS only, GPU composited */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="blob-1 absolute rounded-full"
            style={{
              width: "90%", height: "60%", top: "-15%", right: "-15%",
              background: "radial-gradient(ellipse, rgba(138,111,240,0.5) 0%, transparent 70%)",
              filter: "blur(48px)",
            }}
          />
          <div
            className="blob-2 absolute rounded-full"
            style={{
              width: "70%", height: "50%", bottom: "-15%", left: "-10%",
              background: "radial-gradient(ellipse, rgba(200,85,160,0.35) 0%, transparent 70%)",
              filter: "blur(52px)",
            }}
          />
          <div
            className="blob-3 absolute rounded-full"
            style={{
              width: "60%", height: "45%", bottom: "-10%", right: "-5%",
              background: "radial-gradient(ellipse, rgba(155,110,232,0.28) 0%, transparent 70%)",
              filter: "blur(44px)",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-16 md:pb-24 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6 md:mb-8">
              <span className="w-5 h-px bg-fg-muted" />
              <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-fg-muted">
                Product Designer · UX Engineer
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.75rem,10vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-fg mb-4 md:mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rayyan
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #8A6FF0 0%, #C855A0 60%, #9B6EE8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Zakibaig
              </span>
            </motion.h1>

            {/* Mission */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-fg-muted leading-relaxed max-w-sm md:max-w-md mb-8 md:mb-10"
            >
              Crafting products that are intuitive to use
              and thoughtful to look at.
            </motion.p>

            {/* Metadata row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 gap-x-5 text-sm text-fg-muted mb-8 md:mb-10"
            >
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Canada
              </span>
              <span className="hidden sm:block text-border">·</span>
              <button
                onClick={() => navigator.clipboard.writeText("rzakibaig@gmail.com")}
                className="flex items-center gap-1.5 hover:text-fg transition-colors duration-150"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                rzakibaig@gmail.com
              </button>
              <span className="hidden sm:block text-border">·</span>
              <a
                href="https://www.linkedin.com/in/rayyan-zakibaig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-fg transition-colors duration-150"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-85 transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                View Work
              </a>
              <a
                href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border text-fg text-sm font-medium hover:bg-surface-hover transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Resume ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Highlights ────────────────────────────────────────── */}
      <section className="px-6 md:px-8 py-24 border-y border-border bg-surface/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {highlights.map(({ icon, label, description }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-bg border border-border"
              >
                <span className="text-2xl mb-4 block text-fg-muted">{icon}</span>
                <h3
                  className="text-base font-semibold text-fg mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {label}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Work ──────────────────────────────────────────────── */}
      <section id="work" className="px-6 md:px-8 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-2">
                Selected Work
              </p>
              <h2
                className="text-3xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Case Studies
              </h2>
            </div>
            <a
              href="/about"
              className="text-sm text-fg-muted hover:text-fg transition-colors duration-200 hidden md:block"
            >
              About me →
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {projects.map((project) => (
              <motion.div key={project.slug} variants={fadeUp}>
                <ProjectCard project={project} className="h-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
