"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { type Project } from "@/data/projects";

type Props = {
  project: Project;
  className?: string;
};

export default function ProjectCard({ project, className = "" }: Props) {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const [wipOpen, setWipOpen] = useState(false);

  useEffect(() => {
    if (!wipOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setWipOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [wipOpen]);

  useEffect(() => {
    document.body.style.overflow = wipOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [wipOpen]);

  useEffect(() => {
    const v = mainVideoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const cursorLabel = project.wip
    ? "Coming Soon!"
    : project.cursorLabel ?? "View Project";

  const visual = (
    <div
      className="relative rounded-2xl overflow-hidden w-full aspect-video"
      style={{
        background: project.gradientPanel
          ? "#08080f"
          : `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
      }}
    >
      {/* Gradient orbs */}
      {project.gradientPanel && (
        <>
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
        </>
      )}

      {/* Cover video */}
      {project.coverVideo && (
        <video
          ref={mainVideoRef}
          src={project.coverVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
      )}

      {/* Cover image */}
      {!project.coverVideo && project.coverImage && (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      {/* Staggered panel images */}
      {!project.coverVideo && !project.coverImage && project.panelImages && (
        <div className="absolute inset-0 flex items-end justify-center gap-2">
          {project.panelImages.map((src, i) => (
            <div key={i} style={{ transform: `translateY(${i === 1 ? -52 : -20}px)` }}>
              <Image
                src={src}
                alt=""
                width={140}
                height={280}
                className="rounded-xl object-cover object-top"
                style={{ boxShadow: i === 1 ? "0 12px 40px rgba(0,0,0,0.65)" : "0 8px 32px rgba(0,0,0,0.55)" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Logo centered (fallback when no media) */}
      {!project.coverVideo && !project.coverImage && !project.panelImages && project.logo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src={project.logo} alt={project.title} width={120} height={40} className="object-contain opacity-80" />
        </div>
      )}

      {/* Specular rim */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );

  const meta = (
    <div className="mt-4 flex items-start justify-between gap-6">
      <div>
        <p className="font-semibold text-fg text-sm leading-snug">
          {project.cardTitle ?? project.title}
        </p>
        <p className="text-fg-muted text-sm mt-0.5">{project.description}</p>
      </div>
      {project.tags && project.tags.length > 0 && (
        <div className="flex items-center gap-4 shrink-0 mt-0.5">
          {project.tags.map((t) => (
            <span key={t} className="text-xs text-fg-muted whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const cardInner = <>{visual}{meta}</>;

  return (
    <>
      {project.wip ? (
        <motion.div
          role="button"
          tabIndex={0}
          onClick={() => setWipOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setWipOpen(true)}
          data-cursor="project"
          data-cursor-label={cursorLabel}
          data-cursor-wip="true"
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`group block cursor-pointer ${className}`}
        >
          {cardInner}
        </motion.div>
      ) : (
        <motion.a
          href={`/work/${project.slug}`}
          data-cursor="project"
          data-cursor-label={cursorLabel}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`group block ${className}`}
        >
          {cardInner}
        </motion.a>
      )}

      {/* WIP modal */}
      <AnimatePresence>
        {wipOpen && (
          <>
            <motion.div
              key="wip-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setWipOpen(false)}
              className="fixed inset-0 z-[9980] bg-black/50 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[9981] flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                key="wip-modal"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto relative w-full max-w-lg bg-bg border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src="/images/starry-night.jpg" alt="" fill className="object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%), linear-gradient(135deg, ${project.gradientFrom}44, ${project.gradientTo}44)` }}
                  />
                </div>
                <button
                  onClick={() => setWipOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/35 text-white transition-colors duration-150 text-base"
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="px-6 py-5">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3"
                    style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.35)", color: "rgba(251,146,60,1)" }}
                  >
                    Coming Soon
                  </span>
                  <h3 className="text-2xl font-bold text-fg mb-2 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    Currently writing up the case study — check back soon.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
