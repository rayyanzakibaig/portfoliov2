"use client";

import { motion, type Variants } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";

const expContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
};

const expItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const experience = [
  { year: "2026–Present", role: "Member Relations Officer", company: "UH Cougar Product", logo: "/images/uh-cougar-product-logo.png", logoDark: true, logoNoRing: true },
  { year: "2026", role: "UX Designer", company: "Dell Ignite Hackathon", logo: "/images/dell-logo.png" },
  { year: "2025", role: "Product Design Challenge", company: "Palantir", logo: "/images/palantir-logo.png", logoLight: "/images/palantir-logo-light.png" },
  { year: "2024–Present", role: "Product Specialist", company: "Apple", logo: "/images/apple-logo.jpeg" },
  { year: "2024", role: "UX Design Intern", company: "American EMR", logo: "/images/american-emr-logo-v3.png", logoDark: true },
  { year: "2023", role: "Web Developer", company: "Investate Holdings", logo: "/images/investate/investate-holdings-logo-v2.jpeg" },
  { year: "2018–2022", role: "Designer & Photographer", company: "Klein Cain High School", logo: "/images/kleincain-logo.png" },
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
          className="pt-32 pb-16"
        >
        <TiltCard
          holographic
          sparkle={false}
          className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface/95 via-teal-500/10 to-indigo-500/15 p-8 md:p-12 flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-start"
        >
          {/* Portrait */}
          <motion.div variants={fadeUp} className="w-full flex justify-center md:w-[220px] md:justify-start flex-shrink-0">
            <div className="rounded-full w-[220px] aspect-square overflow-hidden">
              <Image
                src="/images/rayyanprofile.jpg"
                alt="Rayyan Zakibaig"
                width={440}
                height={440}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Identity + Prose */}
          <motion.div variants={fadeUp} className="flex flex-col justify-start">
            <h1
              className="text-4xl md:text-5xl font-bold text-fg leading-tight mb-6"
              style={{ fontFamily: "var(--font-lexend), sans-serif", fontWeight: 700 }}
            >
              Hey, I&apos;m Rayyan.
            </h1>
            <p className="text-base text-fg-muted leading-relaxed">
              I&apos;m a product designer and MIS student at the University of Houston, building
              things that are both useful and fun.
            </p>
            <p className="text-base text-fg-muted leading-relaxed mt-4">
              I&apos;ve interned at American EMR designing healthcare mobile UI, and currently work
              as a Product Specialist at Apple. Before that, I was an IT Technician, where I learned
              to think through problems analytically.
            </p>
            <p className="text-base text-fg-muted leading-relaxed mt-4">
              I like solving real user pain points, prototyping fast, and building products myself.
              Right now I&apos;m seeking internship roles in product design or product management.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="mailto:rzakibaig@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:opacity-85 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="14" height="10" rx="2" />
                  <path d="M1 5l7 5 7-5" />
                </svg>
                Email &rarr;
              </a>
              <a
                href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface/60 text-fg text-sm font-medium hover:bg-surface transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 1h6l4 4v10H2V1z" />
                  <path d="M10 1v4h4" />
                  <path d="M5 9h6M5 12h4" />
                </svg>
                Resume &#8599;
              </a>
              <a
                href="https://www.linkedin.com/in/rayyan-zakibaig"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:opacity-85"
                style={{ background: "#0A66C2" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
              <a
                href="https://github.com/rayyanzakibaig"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:opacity-85"
                style={{ background: "#181717" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </div>
          </motion.div>
        </TiltCard>
        </motion.section>

        {/* ─── Experience Strip ────────────────────────────────────── */}
        <section className="border-t border-border pt-12 pb-24">
          <p className="text-xs tracking-widest uppercase text-fg-muted mb-6">Experience</p>
          <motion.div
            variants={expContainer}
            initial="hidden"
            animate="visible"
          >
            {experience.map(({ year, role, company, logo, logoDark, logoLight, logoNoRing }) => (
              <motion.div
                key={company}
                variants={expItem}
                className="flex justify-between items-center py-4 border-b border-border"
              >
                <span className="flex items-center gap-3 text-sm text-fg">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-md shrink-0 overflow-hidden ${
                      logo && logoDark ? `bg-[#242424]${logoNoRing ? "" : " ring-1 ring-white/10"}` : ""
                    }`}
                  >
                    {logo && logoLight ? (
                      <>
                        <Image src={logoLight} alt={`${company} logo`} width={28} height={28} className="w-full h-full object-contain rounded-md dark:hidden" />
                        <Image src={logo} alt={`${company} logo`} width={28} height={28} className="hidden w-full h-full object-contain rounded-md dark:block" />
                      </>
                    ) : logo ? (
                      <Image
                        src={logo}
                        alt={`${company} logo`}
                        width={28}
                        height={28}
                        className={logoDark ? "w-full h-full object-contain rounded-md" : "w-full h-full object-cover rounded-md"}
                      />
                    ) : null}
                  </span>
                  <span>
                    <span className="font-semibold">{company}</span>
                    <span className="text-fg-muted"> &middot; {role}</span>
                  </span>
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
