"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <main>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative h-[100svh] flex flex-col justify-center overflow-hidden">
        {/* Animated gradient blobs — mouse-tracked */}
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

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-16 md:pb-24 w-full flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex items-center gap-2.5 mb-6 md:mb-8"
            >
              <span className="w-5 h-px bg-fg-muted" />
              <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-fg-muted">
                Product Designer | Pokémon Collector
              </span>
              <span className="w-5 h-px bg-fg-muted" />
            </motion.div>

            {/* Name — one line, per-word blur */}
            <h1
              className="text-[clamp(2.75rem,10vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-fg mb-4 md:mb-6 whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {["Rayyan", "Zakibaig"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.15 }}
                  className="inline-block"
                >
                  {word}{i === 0 ? "\u00a0" : ""}
                </motion.span>
              ))}
            </h1>

            {/* Mission */}
            <motion.p
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              className="text-base md:text-lg text-fg-muted leading-relaxed max-w-sm md:max-w-md mb-8 md:mb-10"
            >
              Enhancing human computer interaction
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="flex items-center gap-3"
            >
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-accent transition-transform duration-300 ease-out rounded-full" />
                <span className="relative">View Work</span>
              </a>
              <a
                href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.82] dark:bg-white/[0.08] backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.12),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] text-fg text-sm font-medium overflow-hidden"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-accent transition-transform duration-300 ease-out rounded-full" />
                <span className="relative group-hover:text-white transition-colors duration-300">Resume ↗</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-fg-muted/50"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Work ──────────────────────────────────────────────── */}
      <section id="work" className="px-6 md:px-8 pt-28 pb-32 md:pt-36 md:pb-40">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2
                className="text-3xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Case Studies
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
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
