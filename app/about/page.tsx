"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, listContainer, listItem } from "@/lib/motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const experience = [
  { year: "2026–Present", role: "Member Relations Director", company: "UH Cougar Product" },
  { year: "2024–Present", role: "Product Specialist", company: "Apple" },
  { year: "2025", role: "Product Designer", company: "Palantir" },
  { year: "2024", role: "UX Design Intern", company: "American EMR" },
  { year: "2023", role: "Web Developer", company: "Investate Holdings" },
  { year: "2018–2022", role: "Designer & Photographer", company: "Klein Cain High School" },
];

export default function About() {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* ─── Split Hero ──────────────────────────────────────────── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row gap-12 md:gap-16 items-start pt-32 pb-16"
        >
          {/* Portrait */}
          <motion.div variants={fadeUp} className="w-full md:w-[280px] flex-shrink-0">
            <div className="rounded-2xl w-full aspect-[3/4] overflow-hidden">
              <Image
                src="/images/rayyanportrait.jpg"
                alt="Rayyan Zakibaig"
                width={560}
                height={747}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Identity + Prose */}
          <motion.div variants={fadeUp} className="flex flex-col justify-start">
            <p className="text-xs tracking-widest uppercase text-fg-muted mb-4">
              Product Designer &amp; Builder
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-fg leading-tight mb-6"
              style={{ fontFamily: "var(--font-lexend), sans-serif", fontWeight: 700 }}
            >
              Hey, I&apos;m Rayyan.
            </h1>
            <p className="text-base text-fg-muted leading-relaxed">
              I&apos;m a product designer and MIS student at the University of Houston, focused on
              building things that are both useful and fun.
            </p>
            <p className="text-base text-fg-muted leading-relaxed mt-4">
              I spent a previous summer interning at American EMR, where I designed healthcare mobile UI's for patients to view their health data.
              Currently. I work as a Product Specialist at Apple learning from users every day about how their user experiences.
              Before that I was a IT Technician in my college and that's where I learned to think through problems with an analytical framework.

            </p>
            <p className="text-base text-fg-muted leading-relaxed mt-4">
              I like to dial in on user painpoints, prototype fast, and am not afraid to get into code out a product myself. 
              Right now I&apos;m seeking internship roles in product design or product management.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="mailto:rzakibaig@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:opacity-85 transition-all duration-200"
              >
                Email &rarr;
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface/60 text-fg text-sm font-medium hover:bg-surface transition-all duration-200"
              >
                Resume &#8599;
              </a>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── Experience Strip ────────────────────────────────────── */}
        <section className="border-t border-border pt-12 pb-24">
          <p className="text-xs tracking-widest uppercase text-fg-muted mb-6">Experience</p>
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experience.map(({ year, role, company }) => (
              <motion.div
                key={company}
                variants={listItem}
                className="flex justify-between items-baseline py-4 border-b border-border"
              >
                <span className="text-sm text-fg">
                  <span className="font-semibold">{company}</span>
                  <span className="text-fg-muted"> &middot; {role}</span>
                </span>
                <span className="shrink-0 text-sm text-fg-muted tabular-nums ml-6">{year}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
