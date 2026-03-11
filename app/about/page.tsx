"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";

const experience = [
  { year: "2026-Present", role: "Member Relations Director", company: "UH Cougar Product" },
  { year: "2024-Present", role: "Product Specialist", company: "Apple" },
  { year: "2025", role: "Product Designer", company: "Palantir" },
  { year: "2024", role: "UX Design Intern", company: "American EMR" },
  { year: "2023", role: "Web Developer", company: "Investate Holdings" },
  { year: "2018–2022", role: "Designer, Photographer", company: "Klein Cain High School" },
];

const skills: Record<string, { label: string; variant: "lavender" | "pink" | "blue" | "green" | "default" }[]> = {
  Design: [
    { label: "Figma", variant: "lavender" },
    { label: "UX Research", variant: "lavender" },
    { label: "Interaction Design", variant: "lavender" },
    { label: "Visual Design", variant: "lavender" },
    { label: "Brand Identity", variant: "lavender" },
    { label: "Design Systems", variant: "lavender" },
    { label: "Prototyping", variant: "lavender" },
  ],
  Development: [
    { label: "React", variant: "blue" },
    { label: "Next.js", variant: "blue" },
    { label: "TypeScript", variant: "blue" },
    { label: "HTML/CSS", variant: "blue" },
    { label: "Tailwind CSS", variant: "blue" },
    { label: "Node.js", variant: "blue" },
  ],
  Methods: [
    { label: "Design Sprints", variant: "pink" },
    { label: "Usability Testing", variant: "pink" },
    { label: "Heuristic Evaluation", variant: "pink" },
    { label: "Information Architecture", variant: "pink" },
    { label: "Systems Thinking", variant: "pink" },
  ],
};

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
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-6"
            >
              About
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold text-fg leading-tight tracking-tight mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Designer.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Builder.
              </span>{" "}
              Creative.
            </motion.h1>
            <motion.div variants={fadeUp} className="max-w-xl">
              <p className="text-base text-fg-muted leading-relaxed mb-4">
                I&apos;m a product designer and MIS student at the University of Houston —
                who enjoys turning complex systems into simple intuitive experiences.
              </p>
              <p className="text-base text-fg-muted leading-relaxed">
                I'm interested in building products that are both thoughtful 
                in design and genuinely enrich the experience of those who use them.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-8 pb-24">
        {/* ─── Experience ──────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-1">
              Experience
            </p>
            <div className="w-full h-px bg-border mt-4" />
          </motion.div>

          <div className="flex flex-col">
            {experience.map(({ year, role, company }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="grid grid-cols-[72px_1fr_auto] gap-6 py-5 border-b border-border last:border-0 items-center"
              >
                <span className="text-sm text-fg-muted tabular-nums font-medium">{year}</span>
                <div>
                  <p className="text-sm font-medium text-fg">{role}</p>
                </div>
                <span className="text-sm text-fg-muted">{company}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── Skills & Tools ──────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-1">
              Skills & Tools
            </p>
            <div className="w-full h-px bg-border mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {Object.entries(skills).map(([category, items]) => (
              <motion.div key={category} variants={fadeUp}>
                <p className="text-xs font-semibold tracking-widest uppercase text-fg-muted mb-4">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map(({ label, variant }) => (
                    <Tag key={label} variant={variant}>{label}</Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── CTA ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-85 transition-all duration-200"
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
