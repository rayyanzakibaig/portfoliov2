"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { getProjectBySlug } from "@/data/projects";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import ProjectsNavRow from "@/components/ProjectsNavRow";
import { use } from "react";

const accentGrad = {
  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

function SectionHeader({ label, title, index }: { label: string; title: string; index?: string }) {
  return (
    <div className="mb-10">
      {index && (
        <span
          className="text-xs font-semibold tracking-widest text-fg-muted/40 mb-2 block"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {index}
        </span>
      )}
      <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-3">
        {label}
      </p>
      <h2
        className="text-3xl md:text-4xl font-bold text-fg"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
    </div>
  );
}

function Placeholder({ label, height = 260 }: { label: string; height?: number }) {
  return (
    <div
      className="rounded-2xl border border-border bg-surface flex items-center justify-center"
      style={{ height }}
    >
      <span className="text-xs text-fg-muted tracking-widest uppercase">{label}</span>
    </div>
  );
}

export default function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const hasFlows = !!(project.finalDesignImages || project.userFlow || project.prototype);

  const metaCells: { label: string; value: string; href?: string }[] = [
    { label: "Role", value: project.role },
    { label: "Tools", value: project.tools },
    { label: "Type", value: project.tag },
    ...(project.liveUrl && !project.wip ? [{ label: "Live", value: "View site ↗", href: project.liveUrl }] : [{ label: "Year", value: project.year }]),
  ];

  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen bg-bg">

        {/* ── Back link ────────────────────────────────────────── */}
        <div className="fixed top-24 left-6 md:left-10 z-50 hidden md:block">
          <Link
            href="/"
            className="text-sm text-fg-muted hover:text-fg transition-colors duration-200 flex items-center gap-1.5"
          >
            ← Work
          </Link>
        </div>

        {/* ─── Hero ────────────────────────────────────────────── */}
        <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
          {/* Radial gradient bg — dark mode */}
          <div
            className="absolute inset-0 pointer-events-none hidden dark:block"
            style={{
              background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${project.gradientTo}cc 0%, ${project.gradientFrom}55 50%, transparent 75%)`,
            }}
          />
          {/* Radial gradient bg — light mode */}
          <div
            className="absolute inset-0 pointer-events-none dark:hidden"
            style={{
              background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${project.gradientTo}22 0%, transparent 65%)`,
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-16 w-full">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center mb-16"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
                <span className="w-5 h-px bg-fg-muted/40" />
                <span className="text-sm font-medium tracking-widest uppercase text-fg-muted">
                  {project.tag} · {project.year}
                </span>
                <span className="w-5 h-px bg-fg-muted/40" />
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-6xl md:text-8xl font-bold text-fg tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-fg-muted font-light max-w-xl mb-10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.subtitle}
              </motion.p>

              {/* Meta grid */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rounded-2xl overflow-hidden border border-border bg-border w-full [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-border md:[&>*:nth-child(n+3)]:border-t-0"
              >
                {metaCells.map(({ label, value, href }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-bg px-3 py-3 md:px-5 md:py-4 flex flex-col gap-0.5 min-w-0 group hover:bg-surface transition-colors duration-150"
                    >
                      <p className="text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-fg-muted">{label}</p>
                      <p className="text-xs md:text-sm text-accent font-medium leading-snug group-hover:text-accent-hover transition-colors duration-150">{value}</p>
                    </a>
                  ) : (
                    <div key={label} className="bg-bg px-3 py-3 md:px-5 md:py-4 flex flex-col gap-0.5 min-w-0">
                      <p className="text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-fg-muted">{label}</p>
                      <p className="text-xs md:text-sm text-fg font-medium leading-snug">{value}</p>
                    </div>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Cover media */}
            {(project.coverImage || project.coverVideo) && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden border border-border shadow-[0_32px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
              >
                {project.coverVideo ? (
                  <video
                    src={project.coverVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                  />
                ) : project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={1200}
                    height={720}
                    className="w-full h-auto"
                    priority
                  />
                ) : null}
              </motion.div>
            )}
          </div>
        </section>

        {/* ─── Content ─────────────────────────────────────────── */}
        {project.wip ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto px-6 md:px-8 py-24 flex flex-col items-start gap-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-medium tracking-widest uppercase text-fg-muted">
                Case study in progress
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-fg leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Writing this up.
              <br />
              <span className="text-fg-muted">Check back soon.</span>
            </h2>
            <p className="text-base text-fg-muted leading-relaxed max-w-md">
              {project.description}
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border text-fg text-sm font-medium hover:bg-border transition-all duration-200"
              >
                View Live Site ↗
              </a>
            )}
          </motion.div>
        ) : (
          <>
              {/* ── Overview ─────────────────────────────────── */}
              {/* ── Overview ─────────────────────────────────── */}
              <motion.section id="overview" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp} className="border-t border-border">
                <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
                  <SectionHeader label="Overview" title="The Project" />
                  <p className="text-base text-fg-muted leading-relaxed max-w-[65ch] mb-8">
                    {project.overview}
                  </p>
                  {project.overviewImage ? (
                    <div className="flex flex-col gap-3">
                      <Image
                        src={project.overviewImage}
                        alt={`${project.title} overview`}
                        width={1200}
                        height={720}
                        className="rounded-2xl border border-border w-full h-auto"
                      />
                      {project.overviewSupportImages && (
                        <div className="grid grid-cols-2 gap-3">
                          {project.overviewSupportImages.map((src, i) => (
                            <Image
                              key={i}
                              src={src}
                              alt={`${project.title} view ${i + 2}`}
                              width={600}
                              height={400}
                              className="rounded-xl border border-border w-full h-auto object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Placeholder label="Overview Image" height={220} />
                  )}
                </div>
              </motion.section>

              {/* ── Problem ──────────────────────────────────── */}
              <motion.section id="problem" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp} className="border-t border-border">
                <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
                  <SectionHeader label="Problem" title="What we set out to solve" />
                  <p className="text-base text-fg-muted leading-relaxed max-w-[65ch] mb-8">
                    {project.problem}
                  </p>
                  {project.goals && (
                    <ul className="flex flex-col gap-3">
                      {project.goals.map((goal, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-fg-muted leading-relaxed">
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: "var(--color-accent)" }}
                          />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.section>

              {/* ── Research ─────────────────────────────────── */}
              {project.research && (
                <motion.section id="research" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp} className="border-t border-border">
                  <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
                    <SectionHeader label="Research" title="Understanding the space" />
                    <p className="text-base text-fg-muted leading-relaxed max-w-[65ch] mb-8">
                      {project.research}
                    </p>
                    {project.researchImages && (
                      <div
                        className={`grid gap-4 mb-8 ${
                          project.researchImageStack
                            ? "grid-cols-1"
                            : project.researchImages.length >= 3 ? "grid-cols-3" : project.researchImages.length === 2 ? "grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {project.researchImages.map((src, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <div className={`relative overflow-hidden ${project.researchImageStack ? "rounded-xl" : "rounded-xl border border-border"}`}>
                              <Image src={src} alt={`Research artifact ${i + 1}`} width={800} height={600} className="w-full h-auto" />
                            </div>
                            {project.researchAnnotations?.[i] && (
                              <p className="text-sm text-fg-muted leading-relaxed">
                                <span className="font-semibold mr-1" style={accentGrad}>{["A", "B", "C"][i]}</span>
                                {project.researchAnnotations[i]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {project.keyInsights && (
                      <ul className="flex flex-col gap-4">
                        {project.keyInsights.map((item, i) => {
                          const insight = typeof item === "string" ? item : item.insight;
                          const response = typeof item === "string" ? null : item.response;
                          return (
                            <li key={i} className="p-5 rounded-xl bg-surface border border-border flex flex-col gap-4">
                              <div className="flex items-start gap-4">
                                <span className="mt-0.5 text-xs font-bold tabular-nums shrink-0" style={{ ...accentGrad, fontFamily: "var(--font-display)" }}>
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <p className="text-sm text-fg leading-relaxed font-medium">{insight}</p>
                              </div>
                              {response && (
                                <div className="ml-8 pl-4 border-l-2 border-border">
                                  <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-1.5">Design Response</p>
                                  <p className="text-sm text-fg-muted leading-relaxed">{response}</p>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </motion.section>
              )}

              {/* ── Solution ─────────────────────────────────── */}
              <motion.section id="solution" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp} className="border-t border-border">
                <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
                  <SectionHeader label="Solution" title="How we got there" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {project.processSteps.map((step) => (
                      <div key={step.step} className="rounded-2xl bg-surface border border-border overflow-hidden flex flex-col">
                        {step.processImage && (
                          <div className="relative w-full h-36 overflow-hidden border-b border-border">
                            <Image src={step.processImage} alt={step.title} fill className="object-cover object-top" sizes="600px" />
                          </div>
                        )}
                        <div className="p-5 flex flex-col gap-2">
                          <span className="text-xl font-bold text-fg-muted" style={{ fontFamily: "var(--font-display)" }}>{step.step}</span>
                          <p className="text-sm font-semibold text-fg">{step.title}</p>
                          <p className="text-sm text-fg-muted leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {project.iterations && (
                    <div className="flex flex-col gap-4 mb-12">

                      {/* Main image + overview card flush attached */}
                      <div className="flex flex-col">
                        <div className="rounded-t-2xl border border-border border-b-0 overflow-hidden">
                          <Image
                            src={project.iterations}
                            alt="Iterations"
                            width={1200}
                            height={700}
                            className="w-full h-auto"
                          />
                        </div>
                        {project.iterationsCards?.[0] && (
                          <div className="rounded-b-2xl bg-surface border border-border p-5 flex flex-col gap-2">
                            <p className="text-sm font-semibold text-fg">{project.iterationsCards[0].title}</p>
                            <p className="text-sm text-fg-muted leading-relaxed">{project.iterationsCards[0].description}</p>
                          </div>
                        )}
                      </div>

                      {/* 2-column: left = version images, right = version text cards */}
                      {project.iterationsCards && project.iterationsCards.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Left: images only */}
                          <div className="flex flex-col gap-3">
                            {project.iterationsCards.slice(1).map((card, i) =>
                              card.image ? (
                                <div key={i} className="rounded-2xl border border-border overflow-hidden">
                                  <div className="p-1.5">
                                    <Image src={card.image} alt={card.title} width={800} height={400} className="rounded-xl w-full h-auto" />
                                  </div>
                                </div>
                              ) : null
                            )}
                          </div>
                          {/* Right: text cards only */}
                          <div className="flex flex-col gap-3">
                            {project.iterationsCards.slice(1).map((card, i) => (
                              <div key={i} className="rounded-2xl bg-surface border border-border p-5 flex flex-col gap-2 flex-1">
                                <p className="text-sm font-semibold text-fg">{card.title}</p>
                                <p className="text-sm text-fg-muted leading-relaxed">{card.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                  {project.iterationsImages && (
                    <div className={`grid gap-4 mb-12 ${project.iterationsImages.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                      {project.iterationsImages.map((src, i) => {
                        const phaseLabels = ["Wireframe", "First Pass", "Final"];
                        return (
                          <div key={i} className="flex flex-col gap-2.5">
                            <div className="relative overflow-hidden rounded-xl border border-border">
                              <Image src={src} alt={phaseLabels[i] ?? `Iteration ${i + 1}`} width={600} height={400} className="w-full h-auto" />
                            </div>
                            <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted text-center">
                              {phaseLabels[i] ?? `Phase ${i + 1}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {project.keyDesignDecisions && (
                    project.keyDesignDecisions.some((d) => d.image) ? (
                      <div className="flex flex-col gap-4">
                        {project.keyDesignDecisions.map((d, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            {d.beforeImage && d.image ? (
                              <div className="flex flex-col">
                                <div className="relative w-screen left-1/2 -translate-x-1/2 border-t border-border my-8" />
                                <p className="text-xl font-semibold text-fg mb-6">{d.title}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Before column */}
                                <div className="flex flex-col">
                                  <div className="rounded-t-2xl bg-surface border border-border border-b-0 overflow-hidden">
                                    <span className="text-xs font-semibold tracking-widest uppercase text-fg-muted px-3 py-2 border-b border-border block">Before</span>
                                    <Image src={d.beforeImage} alt={`${d.title} — before`} width={600} height={340} className="w-full h-auto" />
                                  </div>
                                  <div className="rounded-b-2xl bg-surface border border-border p-5">
                                    <p className="text-sm text-fg-muted leading-relaxed">{d.beforeDescription ?? d.description}</p>
                                  </div>
                                </div>
                                {/* After column */}
                                <div className="flex flex-col">
                                  <div className="rounded-t-2xl bg-surface border border-border border-b-0 overflow-hidden">
                                    <span className="text-xs font-semibold tracking-widest uppercase text-fg-muted px-3 py-2 border-b border-border block">After</span>
                                    <Image src={d.image} alt={`${d.title} — after`} width={600} height={340} className="w-full h-auto" />
                                  </div>
                                  <div className="rounded-b-2xl bg-surface border border-border p-5">
                                    <p className="text-sm text-fg-muted leading-relaxed">{d.afterDescription ?? d.description}</p>
                                  </div>
                                </div>
                              </div>
                              </div>
                            ) : (
                              d.image ? (
                                <div className="flex flex-col">
                                  <div className="rounded-t-2xl bg-surface border border-border border-b-0 overflow-hidden">
                                    <div className="p-1.5">
                                      <Image src={d.image} alt={d.title} width={1200} height={600} className="rounded-t-xl w-full h-auto" />
                                    </div>
                                  </div>
                                  <div className="rounded-b-2xl bg-surface border border-border p-5 flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-fg">{d.title}</p>
                                    <p className="text-sm text-fg-muted leading-relaxed">{d.description}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="rounded-2xl bg-surface border border-border p-5 flex flex-col gap-2">
                                  <p className="text-sm font-semibold text-fg">{d.title}</p>
                                  <p className="text-sm text-fg-muted leading-relaxed">{d.description}</p>
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.keyDesignDecisions.map((d, i) => (
                          <div key={i} className="p-5 rounded-2xl bg-surface border border-border flex flex-col gap-2">
                            <p className="text-sm font-semibold text-fg">{d.title}</p>
                            <p className="text-sm text-fg-muted leading-relaxed">{d.description}</p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </motion.section>

              {/* ── Flows ────────────────────────────────────── */}
              {hasFlows && (
                <motion.section id="flows" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp} className="border-t border-border">
                  <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
                    <SectionHeader label="Flows" title="The final experience" />
                    {project.finalDesignImages ? (
                      <div className="flex flex-col gap-3">
                        <Image src={project.finalDesignImages[0]} alt="Final Design — main view" width={1200} height={720} className="rounded-2xl border border-border w-full h-auto" />
                        {project.finalDesignImages.length > 1 && (
                          <div className="grid grid-cols-2 gap-3">
                            {project.finalDesignImages.slice(1).map((src, i) => (
                              <Image key={i} src={src} alt={`Final Design — view ${i + 2}`} width={600} height={400} className="rounded-xl border border-border w-full h-auto object-cover" />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : project.finalDesign ? (
                      <Image src={project.finalDesign} alt="Final Design" width={1200} height={720} className="rounded-2xl border border-border w-full h-auto" />
                    ) : project.userFlow ? (
                      <Image src={project.userFlow} alt="User Flow" width={1200} height={720} className="rounded-2xl border border-border w-full h-auto" />
                    ) : project.prototype ? (
                      <Image src={project.prototype} alt="Prototype" width={1200} height={720} className="rounded-2xl border border-border w-full h-auto" />
                    ) : null}
                  </div>
                </motion.section>
              )}

              {/* ── Reflection ───────────────────────────────── */}
              {project.reflection && (
                <motion.section id="reflection" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp} className="border-t border-border">
                  <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
                    <SectionHeader label="Key Learnings" title="What I took away" />
                    {project.stats.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mb-8">
                        {project.stats.map((stat) => (
                          <div key={stat.label} className="p-4 md:p-5 rounded-2xl border border-border bg-surface/60 flex flex-col gap-2">
                            <span className="text-2xl md:text-4xl font-bold leading-none" style={{ fontFamily: "var(--font-display)", ...accentGrad }}>
                              {stat.value}
                            </span>
                            <span className="text-[11px] md:text-xs text-fg-muted leading-snug">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
                      <motion.div
                        variants={fadeUp}
                        className="col-span-2 rounded-2xl border border-border bg-surface/60 p-6"
                      >
                        <p className="text-sm text-fg-muted leading-relaxed">{project.reflection}</p>
                      </motion.div>
                      {project.nextSteps && project.nextSteps.map((step, i, arr) => {
                        const spanFull = arr.length === 3 && i === arr.length - 1;
                        return (
                          <motion.div
                            key={i}
                            variants={fadeUp}
                            className={`${spanFull ? "col-span-2" : "col-span-1"} rounded-2xl border border-border bg-surface/60 p-6 flex flex-col gap-3 h-full`}
                          >
                            <span className="text-xs uppercase tracking-widest text-fg-muted">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="text-sm text-fg-muted leading-relaxed">{step}</p>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                </motion.section>
              )}
          </>
        )}

        {/* ─── Project nav ─────────────────────────────────────── */}
        <ProjectsNavRow currentSlug={slug} />

        <Footer />
      </main>
    </>
  );
}
