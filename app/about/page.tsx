"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, slideRight } from "@/lib/motion";
import Footer from "@/components/Footer";
import Link from "next/link";

const experience = [
  { year: "2024", role: "Product Design Intern", company: "American EMR" },
  { year: "2024", role: "UX/UI Designer & Developer", company: "Investate Holdings" },
  { year: "2023–", role: "Freelance Product Designer", company: "Independent" },
];

const skills = {
  Design: ["UX Research", "Interaction Design", "Visual Design", "Brand Identity", "Design Systems", "Prototyping"],
  Development: ["React", "Next.js", "TypeScript", "HTML/CSS", "Tailwind CSS", "Node.js"],
  Methods: ["Design Sprints", "Usability Testing", "Heuristic Evaluation", "Information Architecture", "Systems Thinking"],
};

export default function About() {
  return (
    <main className="min-h-screen">
      <section className="px-6 md:px-10 pt-36 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl text-fg leading-tight tracking-tight mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Designer.{" "}
              <span className="italic text-accent">Builder.</span>
              {" "}Creative.
            </motion.h1>

            {/* Bio */}
            <motion.div variants={fadeUp} className="mb-20">
              <p className="text-base text-fg-muted leading-relaxed max-w-xl">
                I&apos;m a product designer with a thing for clean systems and honest craft — someone who cares equally about how something works and how it feels.
              </p>
              <p className="text-base text-fg-muted leading-relaxed max-w-xl mt-4">
                I move between design and code fluidly, which means I build what I design and design what I build. Based in Canada, working on things that matter.
              </p>
            </motion.div>

            {/* Experience */}
            <motion.div variants={fadeUp} className="mb-20">
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-6">
                Experience
              </p>
              <div className="flex flex-col divide-y divide-border">
                {experience.map(({ year, role, company }) => (
                  <div
                    key={`${year}-${company}`}
                    className="grid grid-cols-[80px_1fr_1fr] gap-4 py-4"
                  >
                    <span className="text-sm text-fg-muted tabular-nums">{year}</span>
                    <span className="text-sm text-fg">{role}</span>
                    <span className="text-sm text-fg-muted">{company}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={fadeUp} className="mb-20">
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-6">
                Skills
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-xs tracking-widest uppercase text-fg-muted mb-4">
                      {category}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {items.map((skill) => (
                        <li key={skill} className="text-sm text-fg">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="mailto:rzakibaig@gmail.com"
                className="group inline-flex items-center gap-2 text-sm text-fg hover:text-accent transition-colors duration-200"
              >
                Get in touch
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
