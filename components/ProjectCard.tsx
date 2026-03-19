"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
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
  const tags = project.tags ?? [project.tag];
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const main = mainVideoRef.current;
    const blur = blurVideoRef.current;
    if (!main || !blur) return;
    const sync = () => {
      if (Math.abs(blur.currentTime - main.currentTime) > 0.1) {
        blur.currentTime = main.currentTime;
      }
    };
    main.addEventListener("timeupdate", sync);
    return () => main.removeEventListener("timeupdate", sync);
  }, []);
  const cta = project.wip
    ? null
    : (project.cursorLabel ?? ctaLabel[project.tag] ?? "View Project");
  const cursorLabel = project.wip
    ? "Coming Soon!"
    : project.cursorLabel ?? (ctaLabel[project.tag] ?? "View Project");

  return (
    <motion.a
      href={`/work/${project.slug}`}
      data-cursor="project"
      data-cursor-label={cursorLabel}
      data-cursor-wip={project.wip ? "true" : undefined}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group block ${className}`}
    >
      {/* Animated gradient border from project colors */}
      <div
        className="rounded-2xl p-px relative overflow-hidden"
        style={{
          boxShadow: `0 0 32px ${project.gradientTo}33, 0 12px 48px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Spinning conic-gradient — GPU composited via transform */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "-100%",
            background: `conic-gradient(from 0deg, transparent 270deg, ${project.gradientFrom}, ${project.gradientTo}, transparent)`,
            animation: "spin 22.5s linear infinite",
            willChange: "transform",
          }}
        />
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[420px]"
      >
        {/* ── Image panel ─────────────────────────────────────────── */}
        <div className="relative w-full h-72 md:w-[52%] md:h-auto flex-shrink-0 overflow-hidden">
          {project.coverVideo ? (
            <video
              ref={mainVideoRef}
              src={project.coverVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            />
          ) : project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 52vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
            />
          )}
        </div>

        {/* ── Text panel ──────────────────────────────────────────── */}
        <div className="relative flex-1 overflow-hidden">
          {/* Blurred image background — extends leftward to cover full card width so it reads as atmosphere, not a duplicate */}
          {(project.coverVideo || project.coverImage) && (
            <div className="absolute top-0 bottom-0 right-0" style={{ left: "-110%", filter: "blur(48px)", willChange: "filter" }}>
              {project.coverVideo ? (
                <video
                  ref={blurVideoRef}
                  src={project.coverVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image src={project.coverImage!} alt="" fill className="object-cover" />
              )}
            </div>
          )}
          {/* No-image fallback bg */}
          {!project.coverVideo && !project.coverImage && (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
            />
          )}
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Text content */}
          <div className="relative z-10 px-7 py-7 md:px-10 md:py-10 flex flex-col justify-center h-full">
            <div>
              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] md:text-[10px] tracking-widest uppercase text-white/60 bg-white/[0.09] rounded-lg px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3
                className="text-[2rem] md:text-[2.2rem] leading-[1.05] font-bold text-white mt-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-base md:text-[1.05rem] text-white/50 mt-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              {/* Stats — hidden for WIP */}
              {!project.wip && project.stats && project.stats.length > 0 && (
                <>
                  <div className="mt-5 border-t border-white/[0.07]" />
                  <div className="flex gap-6 md:gap-8 mt-4">
                    {project.stats.slice(0, 3).map((s) => (
                      <div key={s.label}>
                        <div className="text-xl md:text-[1.5rem] font-bold text-white tabular-nums leading-none">
                          {s.value}
                        </div>
                        <div className="text-xs md:text-[0.8rem] text-white/40 mt-2.5 leading-tight">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* CTA */}
              <div className="mt-5 md:mt-6 border-t border-white/[0.07] pt-5 md:pt-6">
                {project.wip ? (
                  <span className="text-[10px] tracking-wide uppercase text-white/35">
                    Coming Soon
                  </span>
                ) : (
                  <span className="text-base md:text-[1rem] font-medium text-white md:text-white/60 md:group-hover:text-white transition-colors duration-200">
                    {cta} →
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </motion.a>
  );
}
