"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { type Project } from "@/data/projects";

type Props = {
  project: Project;
  className?: string;
};

export default function ProjectCard({ project, className = "" }: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const arrowX = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), {
    stiffness: 200,
    damping: 20,
  });
  const arrowY = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={`/work/${project.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`group block rounded-2xl border border-border bg-bg overflow-hidden ${className}`}
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Hover shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        }}
      />

      {/* Gradient image area */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
          }}
        />
        {/* TODO: replace with real image */}

        {/* Arrow — magnetic, top right */}
        <motion.div
          style={{ x: arrowX, y: arrowY }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="text-white text-sm">↗</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface border border-border text-fg-muted">
            {project.tag}
          </span>
          <span className="text-xs text-fg-muted tabular-nums">{project.year}</span>
        </div>

        <h3
          className="text-lg font-semibold text-fg mb-1.5 leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-fg-muted leading-relaxed">{project.subtitle}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-fg-muted">{project.role}</span>
          <span className="text-sm text-fg-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200">
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
