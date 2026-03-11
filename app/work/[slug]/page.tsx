"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects, getProjectBySlug } from "@/data/projects";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";
import { use } from "react";

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
          <div className="relative max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-12">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {/* Back */}
              <motion.div variants={fadeUp} className="mb-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors duration-200"
                >
                  ← Work
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mb-4">
                <Tag variant="lavender">{project.tag}</Tag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-6xl font-bold text-fg leading-tight tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title.split(" ").map((word, i) =>
                  word === project.accentWord ? (
                    <span
                      key={i}
                      style={{
                        background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-fg-muted mb-8">
                {project.subtitle}
              </motion.p>

              {/* Meta grid */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface border border-border"
              >
                {[
                  { label: "Role", value: project.role },
                  { label: "Duration", value: project.duration },
                  { label: "Year", value: project.year },
                  { label: "Tools", value: project.tools },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-fg-muted mb-1 font-medium uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm text-fg font-medium">{value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Banner ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-6 md:mx-8 xl:max-w-5xl xl:mx-auto rounded-2xl overflow-hidden border border-border"
          style={{ height: 360 }}
        >
          {/* TODO: replace with real image */}
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
            }}
          />
        </motion.div>

        {/* ─── Content ─────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-20"
          >
            {/* Overview */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-3">
                Overview
              </p>
              <h2
                className="text-2xl font-bold text-fg mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Project
              </h2>
              <p className="text-base text-fg-muted leading-relaxed max-w-xl">
                {project.overview}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <Tag key={t} variant="default">{t.trim()}</Tag>
                ))}
              </div>
              <div
                className="mt-8 rounded-2xl overflow-hidden border border-border bg-surface flex items-center justify-center"
                style={{ height: 220 }}
              >
                {/* TODO: replace with real image */}
                <span className="text-xs text-fg-muted tracking-widest uppercase">
                  Overview Image
                </span>
              </div>
            </motion.div>

            {/* Problem */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-3">
                The Problem
              </p>
              <h2
                className="text-2xl font-bold text-fg mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What we set out to solve
              </h2>
              <p className="text-base text-fg-muted leading-relaxed max-w-xl">
                {project.problem}
              </p>
            </motion.div>

            {/* Process */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-3">
                Process
              </p>
              <h2
                className="text-2xl font-bold text-fg mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How we got there
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {project.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-surface border border-border flex flex-col gap-3"
                  >
                    <span
                      className="text-2xl font-bold text-fg-muted"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.step}
                    </span>
                    <p className="text-sm font-semibold text-fg">{step.title}</p>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="mt-8 rounded-2xl overflow-hidden border border-border bg-surface flex items-center justify-center"
                style={{ height: 260 }}
              >
                {/* TODO: replace with real image */}
                <span className="text-xs text-fg-muted tracking-widest uppercase">
                  Process Image
                </span>
              </div>
            </motion.div>

            {/* Key Numbers */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-6">
                Key Numbers
              </p>
              <div className="grid grid-cols-3 gap-4">
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-2xl border border-border bg-surface/60 flex flex-col gap-2"
                  >
                    <span
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-xs text-fg-muted leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Outcome */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-3">
                Outcome
              </p>
              <h2
                className="text-2xl font-bold text-fg mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What shipped
              </h2>
              <p className="text-base text-fg-muted leading-relaxed max-w-xl">
                {project.outcome}
              </p>
              <div
                className="mt-8 rounded-2xl overflow-hidden border border-border bg-surface flex items-center justify-center"
                style={{ height: 260 }}
              >
                {/* TODO: replace with real image */}
                <span className="text-xs text-fg-muted tracking-widest uppercase">
                  Final Design
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

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
