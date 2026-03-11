"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects, getProjectBySlug, type Project } from "@/data/projects";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";
import CaseStudySideNav, { type SectionMeta } from "@/components/CaseStudySideNav";
import { use } from "react";

const ALL_SECTIONS: (
  | { id: string; label: string; always: true; key?: never }
  | { id: string; label: string; always?: false; key: keyof Project }
)[] = [
  { id: "overview",       label: "Overview",       always: true },
  { id: "problem",        label: "Problem",        always: true },
  { id: "goals",          label: "Goals",          key: "goals" },
  { id: "research",       label: "Research",       key: "research" },
  { id: "key-insights",   label: "Key Insights",   key: "keyInsights" },
  { id: "design-process", label: "Design Process", always: true },
  { id: "user-flow",      label: "User Flow",      key: "userFlow" },
  { id: "iterations",     label: "Iterations",     key: "iterations" },
  { id: "key-decisions",  label: "Key Decisions",  key: "keyDesignDecisions" },
  { id: "final-design",   label: "Final Design",   key: "finalDesign" },
  { id: "prototype",      label: "Prototype",      key: "prototype" },
  { id: "results",        label: "Results",        always: true },
  { id: "reflection",     label: "Reflection",     key: "reflection" },
  { id: "next-steps",     label: "Next Steps",     key: "nextSteps" },
];

const accentGrad = {
  background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-2">
        {label}
      </p>
      <h2
        className="text-2xl font-bold text-fg"
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

  const prev = projects.find((p) => p.slug === project.prevSlug);
  const next = projects.find((p) => p.slug === project.nextSlug);
  const tools = project.tools.split(", ");

  const hasIterations = project.iterations !== undefined || project.iterationsImages !== undefined;
  const hasFinalDesign = project.finalDesign !== undefined || project.finalDesignImages !== undefined;

  const activeSections: SectionMeta[] = ALL_SECTIONS.filter((s) => {
    if (s.always) return true;
    if (s.id === "iterations") return hasIterations;
    if (s.id === "final-design") return hasFinalDesign;
    return project[s.key!] !== undefined && project[s.key!] !== null;
  }).map(({ id, label }) => ({ id, label }));

  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen">
        {/* ─── Header ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(138,111,240,0.38) 0%, transparent 60%)`,
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-14">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {/* Back */}
              <motion.div variants={fadeUp} className="mb-10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors duration-200"
                >
                  ← Work
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mb-5">
                <Tag variant="lavender">{project.tag}</Tag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-6xl font-bold text-fg leading-tight tracking-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title.split(" ").map((word, i) =>
                  word === project.accentWord ? (
                    <span key={i} style={accentGrad}>{word}{" "}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-fg-muted mb-8 max-w-xl">
                {project.subtitle}
              </motion.p>

              {/* See Website button */}
              {!project.wip && project.liveUrl && (
                <motion.div variants={fadeUp} className="mb-10">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-85 transition-all duration-200"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    See Website ↗
                  </a>
                </motion.div>
              )}

              {/* Meta card */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl bg-surface border border-border overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                  {[
                    { label: "Role", value: project.role },
                    { label: "Duration", value: project.duration },
                    { label: "Year", value: project.year },
                    { label: "Tools", value: project.tools },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-6 py-5 flex flex-col gap-1">
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-fg-muted">
                        {label}
                      </p>
                      <p className="text-sm text-fg font-medium leading-snug">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Banner ──────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden border border-border"
            style={{ height: 380 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              }}
            />
            {project.coverImage && (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            )}
          </motion.div>
        </div>

        {/* ─── Content ─────────────────────────────────────────── */}
        {project.wip ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto px-6 md:px-8 py-24 flex flex-col items-start gap-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-medium tracking-widest uppercase text-fg-muted">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-85 transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                View Live Site ↗
              </a>
            )}
          </motion.div>
        ) : (
          <>
            <CaseStudySideNav sections={activeSections} />
            <div className="max-w-3xl mx-auto px-6 md:px-8 py-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="flex flex-col gap-24"
              >

                {/* ── Overview ─────────────────────────────────── */}
                <motion.section id="overview" variants={fadeUp}>
                  <SectionHeader label="Overview" title="The Project" />
                  <p className="text-base text-fg-muted leading-relaxed max-w-prose mb-6">
                    {project.overview}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tools.map((t) => (
                      <Tag key={t} variant="default">{t.trim()}</Tag>
                    ))}
                  </div>
                  {/* Dynamic image layout */}
                  {project.overviewImage ? (
                    <div className="flex flex-col gap-3">
                      <Image
                        src={project.overviewImage}
                        alt={`${project.title} overview`}
                        width={800}
                        height={520}
                        className="rounded-2xl border border-border w-full h-auto"
                      />
                      {project.overviewSupportImages && (
                        <div className="grid grid-cols-2 gap-3">
                          {project.overviewSupportImages.map((src, i) => (
                            <Image
                              key={i}
                              src={src}
                              alt={`${project.title} view ${i + 2}`}
                              width={400}
                              height={260}
                              className="rounded-xl border border-border w-full h-auto object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Placeholder label="Overview Image" height={220} />
                  )}
                </motion.section>

                {/* ── Problem ──────────────────────────────────── */}
                <motion.section id="problem" variants={fadeUp}>
                  <SectionHeader label="The Problem" title="What we set out to solve" />
                  <p className="text-base text-fg-muted leading-relaxed max-w-prose">
                    {project.problem}
                  </p>
                </motion.section>

                {/* ── Goals ────────────────────────────────────── */}
                {project.goals && (
                  <motion.section id="goals" variants={fadeUp}>
                    <SectionHeader label="Goals" title="What we aimed to achieve" />
                    <ul className="flex flex-col gap-3">
                      {project.goals.map((goal, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base text-fg-muted leading-relaxed"
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: "var(--color-accent)" }}
                          />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}

                {/* ── Research ─────────────────────────────────── */}
                {project.research && (
                  <motion.section id="research" variants={fadeUp}>
                    <SectionHeader label="Research" title="Understanding the space" />
                    <p className="text-base text-fg-muted leading-relaxed max-w-prose mb-8">
                      {project.research}
                    </p>
                    {project.researchImages && (
                      <div
                        className={`grid gap-4 ${
                          project.researchImages.length >= 3
                            ? "grid-cols-3"
                            : project.researchImages.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {project.researchImages.map((src, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <div className="relative overflow-hidden rounded-xl border border-border">
                              <Image
                                src={src}
                                alt={`Research artifact ${i + 1}`}
                                width={400}
                                height={300}
                                className="w-full h-auto"
                              />
                            </div>
                            {project.researchAnnotations?.[i] && (
                              <p className="text-xs text-fg-muted leading-relaxed">
                                <span
                                  className="font-semibold mr-1"
                                  style={accentGrad}
                                >
                                  {["A", "B", "C"][i]}
                                </span>
                                {project.researchAnnotations[i]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.section>
                )}

                {/* ── Key Insights ─────────────────────────────── */}
                {project.keyInsights && (
                  <motion.section id="key-insights" variants={fadeUp}>
                    <SectionHeader label="Key Insights" title="What the research revealed" />
                    <ul className="flex flex-col gap-4">
                      {project.keyInsights.map((item, i) => {
                        const insight = typeof item === "string" ? item : item.insight;
                        const response = typeof item === "string" ? null : item.response;
                        return (
                          <li
                            key={i}
                            className="p-5 rounded-xl bg-surface border border-border flex flex-col gap-4"
                          >
                            <div className="flex items-start gap-4">
                              <span
                                className="mt-0.5 text-xs font-bold tabular-nums shrink-0"
                                style={{ ...accentGrad, fontFamily: "var(--font-display)" }}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <p className="text-sm text-fg leading-relaxed font-medium">{insight}</p>
                            </div>
                            {response && (
                              <div className="ml-8 pl-4 border-l-2 border-border">
                                <p className="text-[10px] font-semibold tracking-widest uppercase text-fg-muted mb-1.5">
                                  Design Response
                                </p>
                                <p className="text-xs text-fg-muted leading-relaxed">{response}</p>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </motion.section>
                )}

                {/* ── Design Process ───────────────────────────── */}
                <motion.section id="design-process" variants={fadeUp}>
                  <SectionHeader label="Design Process" title="How we got there" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.processSteps.map((step) => (
                      <div
                        key={step.step}
                        className="rounded-2xl bg-surface border border-border overflow-hidden flex flex-col"
                      >
                        {step.processImage && (
                          <div className="relative w-full h-36 overflow-hidden border-b border-border">
                            <Image
                              src={step.processImage}
                              alt={step.title}
                              fill
                              className="object-cover object-top"
                              sizes="400px"
                            />
                          </div>
                        )}
                        <div className="p-5 flex flex-col gap-2">
                          <span
                            className="text-xl font-bold text-fg-muted"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {step.step}
                          </span>
                          <p className="text-sm font-semibold text-fg">{step.title}</p>
                          <p className="text-xs text-fg-muted leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* ── User Flow ────────────────────────────────── */}
                {project.userFlow !== undefined && (
                  <motion.section id="user-flow" variants={fadeUp}>
                    <SectionHeader label="User Flow" title="How users move through the product" />
                    {project.userFlow ? (
                      <Image
                        src={project.userFlow}
                        alt="User Flow"
                        width={800}
                        height={500}
                        className="rounded-2xl border border-border w-full h-auto"
                      />
                    ) : (
                      <Placeholder label="User Flow" height={280} />
                    )}
                  </motion.section>
                )}

                {/* ── Iterations ───────────────────────────────── */}
                {hasIterations && (
                  <motion.section id="iterations" variants={fadeUp}>
                    <SectionHeader label="Iterations" title="How the design evolved" />
                    {project.iterationsImages ? (
                      <div
                        className={`grid gap-4 ${
                          project.iterationsImages.length >= 3 ? "grid-cols-3" : "grid-cols-2"
                        }`}
                      >
                        {project.iterationsImages.map((src, i) => {
                          const phaseLabels = ["Wireframe", "First Pass", "Final"];
                          return (
                            <div key={i} className="flex flex-col gap-2.5">
                              <div className="relative overflow-hidden rounded-xl border border-border">
                                <Image
                                  src={src}
                                  alt={phaseLabels[i] ?? `Iteration ${i + 1}`}
                                  width={400}
                                  height={300}
                                  className="w-full h-auto"
                                />
                              </div>
                              <p className="text-[10px] font-semibold tracking-widest uppercase text-fg-muted text-center">
                                {phaseLabels[i] ?? `Phase ${i + 1}`}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : project.iterations ? (
                      <Image
                        src={project.iterations}
                        alt="Iterations"
                        width={800}
                        height={500}
                        className="rounded-2xl border border-border w-full h-auto"
                      />
                    ) : (
                      <Placeholder label="Iterations" height={280} />
                    )}
                  </motion.section>
                )}

                {/* ── Key Design Decisions ─────────────────────── */}
                {project.keyDesignDecisions && (
                  <motion.section id="key-decisions" variants={fadeUp}>
                    <SectionHeader label="Key Design Decisions" title="The choices that shaped the product" />
                    {project.keyDesignDecisions.some((d) => d.image) ? (
                      <div className="flex flex-col gap-4">
                        {project.keyDesignDecisions.map((d, i) => (
                          <div
                            key={i}
                            className="rounded-2xl bg-surface border border-border overflow-hidden"
                          >
                            {d.beforeImage && d.image ? (
                              <>
                                <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
                                  <div className="flex flex-col gap-1.5 p-1.5">
                                    <span className="text-[10px] font-semibold tracking-widest uppercase text-fg-muted px-2 pt-1">Before</span>
                                    <Image
                                      src={d.beforeImage}
                                      alt={`${d.title} — before`}
                                      width={400}
                                      height={220}
                                      className="rounded-lg w-full h-auto"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1.5 p-1.5">
                                    <span className="text-[10px] font-semibold tracking-widest uppercase text-fg-muted px-2 pt-1">After</span>
                                    <Image
                                      src={d.image}
                                      alt={`${d.title} — after`}
                                      width={400}
                                      height={220}
                                      className="rounded-lg w-full h-auto"
                                    />
                                  </div>
                                </div>
                                <div className="p-5 flex flex-col gap-2">
                                  <p className="text-sm font-semibold text-fg">{d.title}</p>
                                  <p className="text-xs text-fg-muted leading-relaxed">{d.description}</p>
                                </div>
                              </>
                            ) : d.image ? (
                              <>
                                <div className="border-b border-border p-1.5">
                                  <Image
                                    src={d.image}
                                    alt={d.title}
                                    width={800}
                                    height={400}
                                    className="rounded-xl w-full h-auto"
                                  />
                                </div>
                                <div className="p-5 flex flex-col gap-2">
                                  <p className="text-sm font-semibold text-fg">{d.title}</p>
                                  <p className="text-xs text-fg-muted leading-relaxed">{d.description}</p>
                                </div>
                              </>
                            ) : (
                              <div className="p-5 flex flex-col gap-2">
                                <p className="text-sm font-semibold text-fg">{d.title}</p>
                                <p className="text-xs text-fg-muted leading-relaxed">{d.description}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.keyDesignDecisions.map((d, i) => (
                          <div
                            key={i}
                            className="p-5 rounded-2xl bg-surface border border-border flex flex-col gap-2"
                          >
                            <p className="text-sm font-semibold text-fg">{d.title}</p>
                            <p className="text-xs text-fg-muted leading-relaxed">{d.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.section>
                )}

                {/* ── Final Design ─────────────────────────────── */}
                {hasFinalDesign && (
                  <motion.section id="final-design" variants={fadeUp}>
                    <SectionHeader label="Final Design" title="What shipped" />
                    {project.finalDesignImages ? (
                      <div className="flex flex-col gap-3">
                        <Image
                          src={project.finalDesignImages[0]}
                          alt="Final Design — main view"
                          width={800}
                          height={520}
                          className="rounded-2xl border border-border w-full h-auto"
                        />
                        {project.finalDesignImages.length > 1 && (
                          <div className="grid grid-cols-2 gap-3">
                            {project.finalDesignImages.slice(1).map((src, i) => (
                              <Image
                                key={i}
                                src={src}
                                alt={`Final Design — view ${i + 2}`}
                                width={400}
                                height={280}
                                className="rounded-xl border border-border w-full h-auto object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : project.finalDesign ? (
                      <Image
                        src={project.finalDesign}
                        alt="Final Design"
                        width={800}
                        height={500}
                        className="rounded-2xl border border-border w-full h-auto"
                      />
                    ) : (
                      <Placeholder label="Final Design" height={320} />
                    )}
                  </motion.section>
                )}

                {/* ── Prototype ────────────────────────────────── */}
                {project.prototype !== undefined && (
                  <motion.section id="prototype" variants={fadeUp}>
                    <SectionHeader label="Prototype" title="See it in action" />
                    {project.prototype ? (
                      <Image
                        src={project.prototype}
                        alt="Prototype"
                        width={800}
                        height={500}
                        className="rounded-2xl border border-border w-full h-auto"
                      />
                    ) : (
                      <Placeholder label="Prototype" height={280} />
                    )}
                  </motion.section>
                )}

                {/* ── Results ──────────────────────────────────── */}
                <motion.section id="results" variants={fadeUp}>
                  <SectionHeader label="Results" title="The impact" />
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {project.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="p-6 rounded-2xl border border-border bg-surface/60 flex flex-col gap-3"
                      >
                        <span
                          className="text-5xl md:text-6xl font-bold leading-none"
                          style={{ fontFamily: "var(--font-display)", ...accentGrad }}
                        >
                          {stat.value}
                        </span>
                        <span className="text-xs text-fg-muted leading-snug">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-base text-fg-muted leading-relaxed max-w-prose">
                    {project.outcome}
                  </p>
                </motion.section>

                {/* ── Reflection ───────────────────────────────── */}
                {project.reflection && (
                  <motion.section id="reflection" variants={fadeUp}>
                    <SectionHeader label="Reflection" title="What I learned" />
                    <p className="text-base text-fg-muted leading-relaxed max-w-prose">
                      {project.reflection}
                    </p>
                  </motion.section>
                )}

                {/* ── Next Steps ───────────────────────────────── */}
                {project.nextSteps && (
                  <motion.section id="next-steps" variants={fadeUp}>
                    <SectionHeader label="Next Steps" title="Where this goes from here" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {project.nextSteps.map((step, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-surface border border-border flex flex-col gap-4"
                        >
                          <span
                            className="text-3xl font-bold"
                            style={{ fontFamily: "var(--font-display)", ...accentGrad }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-sm text-fg-muted leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

              </motion.div>
            </div>
          </>
        )}

        {/* ─── Project nav ─────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 border-t border-border">
          <div className="flex items-center justify-between">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl hover:bg-surface transition-colors duration-200"
              >
                <span className="text-xs text-fg-muted group-hover:text-fg transition-colors">
                  ← Previous
                </span>
                <span
                  className="text-base font-semibold text-fg group-hover:text-accent transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col gap-1 text-right p-4 rounded-xl hover:bg-surface transition-colors duration-200"
              >
                <span className="text-xs text-fg-muted group-hover:text-fg transition-colors">
                  Next →
                </span>
                <span
                  className="text-base font-semibold text-fg group-hover:text-accent transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
