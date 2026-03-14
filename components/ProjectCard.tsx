"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Project } from "@/data/projects";

type Props = {
  project: Project;
  className?: string;
};

const ctaLabel: Record<string, string> = {
  "Brand Design": "Website Development",
  "UX Design": "View Case Study",
  "Mobile Design": "UX Design Internship",
  "Product Design": "View Case Study",
};

export default function ProjectCard({ project, className = "" }: Props) {
  const label = project.wip
    ? "Coming Soon!"
    : project.cursorLabel ?? (ctaLabel[project.tag] ?? "View Project");

  const tags = project.tags ?? [project.tag];
  const showTags = !project.wip && !project.cursorLabel;

  return (
    <motion.a
      href={`/work/${project.slug}`}
      data-cursor="project"
      data-cursor-label={label}
      data-cursor-tags={showTags ? tags.join(",") : ""}
      data-cursor-wip={project.wip ? "true" : undefined}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group block ${className}`}
    >
      {/* Thumbnail — brand color stage with floating mockup */}
      <div
        className="relative aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
      >
        {project.coverVideo ? (
          <video
            src={project.coverVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
        ) : project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        ) : null}

        {/* Subtle scrim on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
      </div>

      {/* Metadata below the thumbnail */}
      <div className="mt-3 px-0.5 flex items-baseline gap-3">
        <h3 className="text-sm font-medium text-fg leading-snug shrink-0">
          {project.title}
        </h3>
        <p className="text-sm text-fg-muted truncate min-w-0 flex-1">
          {project.description}
        </p>
        <span className="text-sm text-fg-muted shrink-0">{project.year}</span>
      </div>
    </motion.a>
  );
}
