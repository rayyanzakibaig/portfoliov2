"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  const b1x = useTransform(springX, v => v * 0.10);
  const b1y = useTransform(springY, v => v * 0.10);
  const b2x = useTransform(springX, v => v * 0.11);
  const b2y = useTransform(springY, v => v * 0.11);
  const b3x = useTransform(springX, v => v * 0.12);
  const b3y = useTransform(springY, v => v * 0.12);

  return (
    <main>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative h-[100svh] flex flex-col justify-center"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left - rect.width / 2);
          mouseY.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      >
        {/* Blobs: outer motion.div = cursor parallax, inner div = CSS wander (separate transforms avoid conflict) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute" style={{ x: b1x, y: b1y, width: "75%", height: "65%", top: "5%", left: "10%" }}>
            <div className="blob-1 absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(138,111,240,0.75) 0%, transparent 70%)", filter: "blur(48px)" }} />
          </motion.div>
          <motion.div className="absolute" style={{ x: b2x, y: b2y, width: "65%", height: "55%", top: "40%", left: "25%" }}>
            <div className="blob-2 absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(200,85,160,0.6) 0%, transparent 70%)", filter: "blur(52px)" }} />
          </motion.div>
          <motion.div className="absolute" style={{ x: b3x, y: b3y, width: "60%", height: "50%", top: "20%", left: "40%" }}>
            <div className="blob-3 absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(155,110,232,0.55) 0%, transparent 70%)", filter: "blur(44px)" }} />
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-16 md:pb-24 w-full flex flex-col items-center text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6 md:mb-8">
              <span className="w-5 h-px bg-fg-muted" />
              <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-fg-muted">
                Product Designer | Seeking Summer 26' Internship
              </span>
              <span className="w-5 h-px bg-fg-muted" />
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

            {/* Mission */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-fg-muted leading-relaxed max-w-sm md:max-w-md mb-8 md:mb-10"
            >
              {["Enhancing", "human", "computer", "interaction"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 + i * 0.08 }}
                  className="inline-block"
                >
                  {word}{i < 3 ? "\u00a0" : ""}
                </motion.span>
              ))}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-fg/70 hover:text-bg transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                View Work
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
              className="mt-10 flex flex-col items-center text-fg-muted/50 hover:text-fg-muted transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <motion.svg
                width="20" height="20" viewBox="0 0 20 20" fill="none"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
              >
                <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16"
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
