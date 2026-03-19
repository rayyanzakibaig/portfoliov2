"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const experience = [
  { year: "2026–Present", role: "Member Relations Director", company: "UH Cougar Product" },
  { year: "2024–Present", role: "Product Specialist", company: "Apple" },
  { year: "2025", role: "Product Designer", company: "Palantir" },
  { year: "2024", role: "UX Design Intern", company: "American EMR" },
  { year: "2023", role: "Web Developer", company: "Investate Holdings" },
  { year: "2018–2022", role: "Designer, Photographer", company: "Klein Cain High School" },
];

export default function About() {
  return (
    <main className="min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(138,111,240,0.4) 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-20">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}>
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-6"
            >

            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold text-fg leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              I design with intention.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                I build with care.
              </span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-8 pb-24 space-y-28">
        {/* ─── Intro Split ─────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="rounded-3xl w-full aspect-[3/4] overflow-hidden">
              <Image
                src="/images/rayyanportrait.jpg"
                alt="Rayyan Zakibaig"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <h2
              className="text-2xl md:text-3xl font-bold text-fg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              This is my story.
            </h2>
            <p className="text-base text-fg-muted leading-relaxed max-w-prose">
              I&apos;m Rayyan — a product designer and MIS student based in Houston. I&apos;ve
              spent the last few years learning what it takes to build products that actually hold
              up: good research, sharp craft, and a willingness to get into the code when needed.
            </p>
          </div>
        </section>

        {/* ─── Chapter 1: text left, image right ───────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="flex flex-col justify-center gap-5">
            <h2
              className="text-2xl md:text-3xl font-bold text-fg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              It started with a lens.
            </h2>
            <p className="text-base text-fg-muted leading-relaxed max-w-prose">
              I learned how to use manual settings on my camera in high school and spent four years shooting and designing for
              my school. That&apos;s where I applied my design thinking from framing a shot, capturing lighting, using negative space and more.
              
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="rounded-3xl w-full aspect-square overflow-hidden">
              <Image
                src="/rayyan-camera.jpg"
                alt="Rayyan with a camera"
                width={900}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* ─── Chapter 2: image left, text right ───────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="md:order-1 order-2">
            <div
              className="rounded-3xl w-full aspect-[4/3] border border-border flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" }}
            >
              <span className="text-xs text-white/30 tracking-widest uppercase">Photo</span>
              {/* TODO: replace with real image */}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col justify-center gap-5 md:order-2 order-1">
            <h2
              className="text-2xl md:text-3xl font-bold text-fg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Then I found product.
            </h2>
            <p className="text-base text-fg-muted leading-relaxed max-w-prose">
              Studying MIS at the University of Houston pushed me to think in systems. I started
              doing UX work. My first internship was at American EMR and there I realized good design isn&apos;t just visual; it&apos;s blending the friction between human computer interaction. .
            </p>
          </motion.div>
        </motion.section>

        {/* ─── Chapter 3: text left, image right ───────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="flex flex-col justify-center gap-5">
            <h2
              className="text-2xl md:text-3xl font-bold text-fg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Now I work at the intersection.
            </h2>
            <p className="text-base text-fg-muted leading-relaxed max-w-prose">
              Right now I work as a product specialist at Apple. I get to talk to users and learn about what matters to them —
              and how our products enrich their lives.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="rounded-3xl w-full aspect-[4/3] overflow-hidden">
              <Image
                src="/images/rayyan-apple.jpg"
                alt="Rayyan at Apple"
                width={800}
                height={600}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* ─── Experience ──────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-xs font-medium tracking-widest uppercase text-fg-muted">
              Experience
            </p>
          </motion.div>

          <div className="relative flex flex-col pl-5 border-l border-border">
            {experience.map(({ year, role, company }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start justify-between gap-6 py-5 last:pb-0"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-fg">{company}</p>
                  <p className="text-sm text-fg-muted">{role}</p>
                </div>
                <span className="shrink-0 text-sm text-fg-muted tabular-nums">{year}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── CTA ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl border border-border bg-surface/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p
              className="text-lg font-semibold text-fg mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Open to opportunities
            </p>
            <p className="text-sm text-fg-muted">
              Available for full-time roles and select freelance projects.
            </p>
          </div>
          <a
            href="mailto:rzakibaig@gmail.com"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:opacity-85 transition-all duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get in touch →
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
