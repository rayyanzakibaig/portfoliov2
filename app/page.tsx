"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { staggerContainer, fadeUp, cardReveal } from "@/lib/motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export default function Home() {
  const rafId = useRef<number | null>(null);
  const targetOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  return (
    <main>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative h-[100svh] flex flex-col justify-center"
        onMouseMove={(e) => {
          if (rafId.current !== null) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          rafId.current = requestAnimationFrame(() => {
            mouseX.set(x);
            mouseY.set(y);
            targetOffsetRef.current = { x, y };
            rafId.current = null;
          });
        }}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); targetOffsetRef.current = { x: 0, y: 0 }; }}
      >
        <StarField targetOffsetRef={targetOffsetRef} />
        {/* Diagonal depth gradient — top-left light source, dark mode only */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background: "linear-gradient(135deg, rgba(80,80,90,0.30) 0%, transparent 55%)",
          }}
        />
        {/* Bottom fade to blend into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none bg-bg"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 80%)",
          }}
        />


        <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-16 md:pb-24 w-full flex flex-col items-center text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-6 md:mb-8">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-medium tracking-wide text-fg-muted bg-green-500/[0.12] border border-green-500/30 dark:bg-green-500/[0.08] dark:border-white/15"
                style={{
                  boxShadow: "0 4px 16px rgba(34,197,94,0.1)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" style={{ animationDuration: "2s" }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                Product Designer · Seeking Summer &apos;26 Internship
              </span>
            </motion.div>

            {/* Name — per-word blur */}
            <motion.h1
              variants={fadeUp}
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
            </motion.h1>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-fg/70 hover:text-bg transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                View Case Studies
              </a>
              <a
                href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.82] dark:bg-white/[0.08] backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.12),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] text-fg text-sm font-medium hover:bg-black/[0.06] dark:hover:bg-white/[0.14] hover:shadow-none transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Resume ↗
              </a>
            </motion.div>

            {/* Scroll arrow */}
            <motion.a
              href="#work"
              variants={fadeUp}
              className="mt-10 flex flex-col items-center text-fg-muted/70 hover:text-fg-muted transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <motion.svg
                width="28" height="28" viewBox="0 0 28 28" fill="none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
              >
                <path d="M6 10l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── Work ──────────────────────────────────────────────── */}
      <section id="work" className="relative px-6 md:px-8 pt-28 pb-32 md:pt-36 md:pb-40">
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
              <p className="mt-2 text-base text-fg-muted">
                Here are some of my projects in product design, UX and mobile design
              </p>
            </div>
          </motion.div>

          {(() => {
            const projectSizes: Record<string, "full" | "half"> = {
              "hire-journey": "full",
              "sleep-os": "half",
              "american-emr": "half",
              "investate": "full",
            };
            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                {projects.map((project) => (
                  <motion.div
                    key={project.slug}
                    variants={cardReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className={projectSizes[project.slug] === "full" ? "col-span-full" : ""}
                  >
                    <ProjectCard project={project} className="h-full" />
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      <Footer />
    </main>
  );
}
