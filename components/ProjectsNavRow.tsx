"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

interface ProjectsNavRowProps {
  currentSlug: string;
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-white/10 flex flex-col h-full"
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/work/${project.slug}`} className="flex flex-col h-full" aria-label={project.title}>
        {/* Thumbnail */}
        <div
          className="relative flex-1 overflow-hidden min-h-0"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
          }}
        >
          {project.coverVideo ? (
            <video
              ref={videoRef}
              src={project.coverVideo}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ) : project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          ) : null}

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Label panel */}
        <div className="border-t border-white/10 px-4 py-5" style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}>
          <p className="text-xs uppercase tracking-widest text-white/50 mb-0.5">{project.tag}</p>
          <h3 className="text-sm font-semibold text-white">{project.title}</h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsNavRow({ currentSlug }: ProjectsNavRowProps) {
  const filtered = projects.filter((p) => p.slug !== currentSlug);

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-8 py-24 border-t border-border">
      <p className="text-sm font-semibold tracking-widest uppercase text-fg-muted mb-8">
        More Work
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* All Projects tile */}
        <Link
          href="/"
          className="group rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 overflow-hidden h-full min-h-[260px]"
          aria-label="View all projects"
        >
          <svg
            width="22" height="22" viewBox="0 0 22 22" fill="none"
            className="text-fg-muted group-hover:text-accent group-hover:scale-110 transition-all duration-200"
          >
            <rect x="0" y="0" width="9" height="9" rx="2" fill="currentColor" />
            <rect x="13" y="0" width="9" height="9" rx="2" fill="currentColor" />
            <rect x="0" y="13" width="9" height="9" rx="2" fill="currentColor" />
            <rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
          </svg>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-semibold text-fg">All Projects</span>
            <span className="text-xs text-fg-muted">Back to home</span>
          </div>
        </Link>

        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
