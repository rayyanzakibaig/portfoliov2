"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects, getProjectBySlug } from "@/data/projects";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
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

  return (
    <>
      <ScrollProgress />

      <main className="min-h-screen">
        {/* ─── Header ─────────────────────────────────────────── */}
        <section className="px-6 md:px-10 pt-36 pb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Back */}
              <motion.div variants={fadeUp} className="mb-10">
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors duration-200"
                >
                  ← Work
                </Link>
              </motion.div>

              {/* Tag */}
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-widest uppercase text-fg-muted mb-4"
              >
                {project.tag}
              </motion.p>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl text-fg leading-tight tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title.split(" ").map((word, i) =>
                  word === project.accentWord ? (
                    <em key={i} className="not-italic italic text-accent">
                      {word}{" "}
                    </em>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-base text-fg-muted mb-10"
              >
                {project.subtitle}
              </motion.p>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-fg-muted border-t border-b border-border py-4"
              >
                <span>{project.role}</span>
                <span className="text-border">·</span>
                <span>{project.duration}</span>
                <span className="text-border">·</span>
                <span>{project.tools}</span>
                <span className="text-border">·</span>
                <span>{project.year}</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Banner ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-6 md:mx-10 rounded-2xl overflow-hidden"
          style={{ height: 340 }}
        >
          {/* TODO: replace with real image */}
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
            }}
          />
        </motion.div>

        {/* ─── Content ────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="px-6 md:px-10 py-20"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-20">
            {/* Overview */}
            <motion.div variants={fadeUp}>
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-4">
                Overview
              </p>
              <h2
                className="text-3xl text-fg mb-4 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Project
              </h2>
              <p className="text-base text-fg-muted leading-relaxed max-w-xl">
                {project.overview}
              </p>

              {/* Image placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden bg-surface" style={{ height: 240 }}>
                {/* TODO: replace with real image */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-fg-muted tracking-widest uppercase">Overview Image</span>
                </div>
              </div>
            </motion.div>

            {/* The Problem */}
            <motion.div variants={fadeUp}>
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-4">
                The Problem
              </p>
              <h2
                className="text-3xl text-fg mb-4 leading-snug"
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
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-4">
                Process
              </p>
              <h2
                className="text-3xl text-fg mb-8 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How we got there
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {project.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-xl bg-surface flex flex-col gap-3"
                  >
                    <span
                      className="text-3xl text-fg-muted"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.step}
                    </span>
                    <p className="text-sm font-medium text-fg">{step.title}</p>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Image placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden bg-surface" style={{ height: 280 }}>
                {/* TODO: replace with real image */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-fg-muted tracking-widest uppercase">Process Image</span>
                </div>
              </div>
            </motion.div>

            {/* Key Numbers */}
            <motion.div variants={fadeUp}>
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-4">
                Key Numbers
              </p>
              <div className="grid grid-cols-3 gap-4">
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-xl border border-border flex flex-col gap-2"
                  >
                    <span
                      className="text-4xl text-accent"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-xs text-fg-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Outcome */}
            <motion.div variants={fadeUp}>
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-4">
                Outcome
              </p>
              <h2
                className="text-3xl text-fg mb-4 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What shipped
              </h2>
              <p className="text-base text-fg-muted leading-relaxed max-w-xl">
                {project.outcome}
              </p>

              {/* Image placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden bg-surface" style={{ height: 280 }}>
                {/* TODO: replace with real image */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-fg-muted tracking-widest uppercase">Final Design</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── Project Navigation ─────────────────────────────── */}
        <div className="px-6 md:px-10 py-12 border-t border-border">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="text-xs text-fg-muted group-hover:text-fg transition-colors duration-200">
                  ← Previous
                </span>
                <span
                  className="text-xl text-fg group-hover:text-accent transition-colors duration-200"
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
                className="group flex flex-col gap-1 text-right"
              >
                <span className="text-xs text-fg-muted group-hover:text-fg transition-colors duration-200">
                  Next →
                </span>
                <span
                  className="text-xl text-fg group-hover:text-accent transition-colors duration-200"
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
