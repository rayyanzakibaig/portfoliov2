"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Project } from "@/data/projects";
import { useState } from "react";

type Props = { projects: Project[] };

export default function ProjectTileList({ projects }: Props) {
  const [wipOpen, setWipOpen] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-border">
      {projects.map((project, i) => {
        const content = (
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex items-center gap-5 py-4 group"
          >
            {/* Index */}
            <span className="w-6 text-xs text-fg-muted/40 tabular-nums shrink-0 select-none">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Square thumbnail */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : project.coverVideo ? (
                <video
                  src={project.coverVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                  }}
                />
              )}
            </div>

            {/* Title + tag */}
            <div className="flex-1 min-w-0">
              <p
                className="text-base font-semibold text-fg leading-tight truncate"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </p>
              <p className="text-xs text-fg-muted/60 mt-0.5">
                {project.tags?.[0] ?? project.tag}
              </p>
            </div>

            {/* Year + arrow */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-fg-muted/40 hidden sm:block">
                {project.year}
              </span>
              {project.wip ? (
                <span className="text-[10px] uppercase tracking-widest text-fg-muted/30 px-2 py-0.5 rounded-full border border-border">
                  Soon
                </span>
              ) : (
                <span className="text-fg-muted/30 group-hover:text-fg-muted transition-colors duration-150 text-sm">
                  →
                </span>
              )}
            </div>
          </motion.div>
        );

        return (
          <li key={project.slug}>
            {project.wip ? (
              <button
                className="w-full text-left"
                onClick={() => setWipOpen(project.slug)}
              >
                {content}
              </button>
            ) : (
              <a href={`/work/${project.slug}`} className="block">
                {content}
              </a>
            )}
          </li>
        );
      })}

      {/* Minimal WIP toast */}
      {wipOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9990] px-5 py-3 rounded-full bg-surface border border-border shadow-xl text-sm text-fg-muted backdrop-blur-xl"
          onClick={() => setWipOpen(null)}
        >
          Case study coming soon ·{" "}
          <span className="text-fg">
            {projects.find((p) => p.slug === wipOpen)?.title}
          </span>
        </motion.div>
      )}
    </ul>
  );
}
