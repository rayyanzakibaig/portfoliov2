"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

  const arrowX = useSpring(
    useTransform(mouseX, [-1, 1], [-6, 6]),
    { stiffness: 200, damping: 20 }
  );
  const arrowY = useSpring(
    useTransform(mouseY, [-1, 1], [-6, 6]),
    { stiffness: 200, damping: 20 }
  );

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
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block overflow-hidden rounded-2xl ${className}`}
      style={{ minHeight: 320 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      {/* Arrow — top right, magnetic */}
      <motion.div
        style={{ x: arrowX, y: arrowY }}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <span className="text-white text-sm">↗</span>
      </motion.div>

      {/* Content */}
      <div className="relative h-full p-8 md:p-10 flex flex-col justify-end" style={{ minHeight: 320 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/50 text-xs tracking-widest uppercase mb-3">
              {project.tag} · {project.year}
            </p>
            <h3
              className="text-3xl md:text-4xl text-white leading-tight mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>
            <p className="text-white/60 text-sm max-w-xs">{project.subtitle}</p>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
