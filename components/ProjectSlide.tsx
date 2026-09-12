"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { staggerContainer, fadeUp } from "@/lib/motion";

type Props = {
  project: Project;
  index: number;
  total: number;
  isActive: boolean;
};

function VisualPanel({ project }: { project: Project }) {
  // hire-journey: staggered panel screenshots
  if (project.panelImages && project.panelImages.length >= 3) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-[#08080f]" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "0%", left: "-10%", width: "70%", height: "100%",
            background: `radial-gradient(ellipse at 20% 50%, ${project.gradientFrom}88 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "0%", right: "-10%", width: "70%", height: "100%",
            background: `radial-gradient(ellipse at 80% 40%, ${project.gradientTo}66 0%, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 flex items-end justify-center gap-3">
          <div style={{ transform: "translateY(-20px)" }}>
            <Image
              src={project.panelImages[0]}
              alt=""
              width={148}
              height={296}
              className="rounded-xl object-cover object-top"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.55)" }}
            />
          </div>
          <div style={{ transform: "translateY(-52px)" }}>
            <Image
              src={project.panelImages[1]}
              alt=""
              width={148}
              height={296}
              className="rounded-xl object-cover object-top"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)" }}
            />
          </div>
          <div style={{ transform: "translateY(-20px)" }}>
            <Image
              src={project.panelImages[2]}
              alt=""
              width={148}
              height={296}
              className="rounded-xl object-cover object-top"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.55)" }}
            />
          </div>
        </div>
      </div>
    );
  }

  // textOnly / gradientPanel: gradient orb
  if (project.textOnly || project.gradientPanel) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-[#08080f]" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "0%", left: "-10%", width: "80%", height: "100%",
            background: `radial-gradient(ellipse at 30% 50%, ${project.gradientFrom}88 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "0%", right: "-10%", width: "80%", height: "100%",
            background: `radial-gradient(ellipse at 70% 40%, ${project.gradientTo}66 0%, transparent 70%)`,
          }}
        />
        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    );
  }

  // investate (and any project with coverImage)
  if (project.coverImage) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    );
  }

  // fallback gradient
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
    />
  );
}

export default function ProjectSlide({ project, index, total, isActive }: Props) {
  const indexLabel = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <div className="h-[100svh] flex items-center px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Left: text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {/* Index counter */}
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-medium tracking-widest text-fg-muted/50 uppercase mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {indexLabel} / {totalLabel}
          </motion.span>

          {/* Tag */}
          <motion.span
            variants={fadeUp}
            className="inline-block text-[10px] uppercase tracking-widest border rounded-full px-3 py-1 w-fit mb-5"
            style={{
              color: "#6b5ce7",
              borderColor: "rgba(107,92,231,0.3)",
              fontFamily: "var(--font-body)",
            }}
          >
            {project.tag}
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-fg mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-fg-muted leading-relaxed max-w-lg mb-8"
          >
            {project.description}
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fg text-bg text-sm font-medium hover:bg-fg/75 transition-all duration-200"
              style={{ fontFamily: "var(--font-display)" }}
            >
              View Case Study →
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: visual panel */}
        <div className="hidden lg:block h-[55vh]">
          <VisualPanel project={project} />
        </div>
      </div>
    </div>
  );
}
