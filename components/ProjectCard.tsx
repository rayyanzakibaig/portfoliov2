"use client";

import { motion, AnimatePresence, animate, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
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

function StatCounter({ value }: { value: string }) {
  // Match a leading integer and optional suffix (e.g. "40%" → ["40", "%"], "3mo" → ["3", "mo"])
  // Skip complex values like "3→5"
  const match = !value.includes("→") ? value.match(/^(\d+)(.*)$/) : null;
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -160px 0px" });
  const [text, setText] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!isInView || !match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(`${Math.round(v)}${suffix}`),
    });
    return controls.stop;
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{text}</span>;
}


export default function ProjectCard({ project, className = "" }: Props) {
  const tags = project.tags ?? [project.tag];
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  const [wipOpen, setWipOpen] = useState(false);

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

  const cta = project.wip
    ? null
    : (project.cursorLabel ?? ctaLabel[project.tag] ?? "View Project");
  const cursorLabel = project.wip
    ? "Coming Soon!"
    : project.cursorLabel ?? (ctaLabel[project.tag] ?? "View Project");

  // ── Text-only variant ───────────────────────────────────────
  if (project.textOnly) {
    const textCard = (
      <div
        className="relative rounded-2xl overflow-hidden min-h-[320px] h-full flex flex-col justify-between p-8 md:p-12"
        style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.07)` }}
      >
        {/* Background */}
        <div className="absolute inset-0" style={{ background: project.gradientPanel ? "#08080f" : `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }} />
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
        {/* Specular rim */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {/* Subtle noise overlay */}
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* Content — above all absolute layers */}
        <div className="relative z-10 flex flex-col justify-between flex-1">

        {/* Top row — tags + year */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[9px] md:text-xs uppercase tracking-widest text-white/50 bg-white/[0.08] rounded-md px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-xs text-white/30 tracking-widest shrink-0">{project.year}</span>
        </div>

        {/* Center — title + description */}
        <div className="my-8">
          <div className="flex items-center gap-4 mb-4">
            {project.logo && (
              <Image
                src={project.logo}
                alt={project.title}
                width={36}
                height={36}
                className="object-contain opacity-80 shrink-0"
              />
            )}
            <h3
              className="text-[2rem] md:text-[2.2rem] leading-[1.05] font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.cardTitle ?? project.title}
            </h3>
          </div>
          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        {/* Bottom row — stats + CTA */}
        <div className="flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
          <div className="flex gap-10 md:gap-14">
            {project.stats.slice(0, 1).map((s) => {
              if (!s.value && !s.label) return null;
              return (
                <div key={s.label}>
                  <div className="text-xl md:text-[1.5rem] font-bold text-white tabular-nums leading-none">
                    <StatCounter value={s.value} />
                  </div>
                  <div className="text-xs text-white/40 mt-2 leading-tight">{s.label}</div>
                </div>
              );
            })}
          </div>
          {cta && (
            <span className="text-base font-medium text-white/50 group-hover:text-white transition-colors duration-200 shrink-0">
              {cta} →
            </span>
          )}
        </div>
        </div>{/* end content wrapper */}
      </div>
    );

    return project.wip ? (
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => setWipOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setWipOpen(true)}
        data-cursor="project"
        data-cursor-label={cursorLabel}
        data-cursor-wip="true"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`group block cursor-pointer ${className}`}
      >
        {textCard}
      </motion.div>
    ) : (
      <motion.a
        href={`/work/${project.slug}`}
        data-cursor="project"
        data-cursor-label={cursorLabel}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`group block ${className}`}
      >
        {textCard}
      </motion.a>
    );
  }

  const cardContent = (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[320px] h-full"
      style={{
        boxShadow: `0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.07), 0 0 24px ${project.gradientTo}28`,
      }}
    >
      {/* Specular rim highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Full-card gradient background when hideImage — orbs span the whole tile */}
      {project.hideImage && project.gradientPanel && (
        <>
          <div className="absolute inset-0 bg-[#08080f]" />
          <div
            className="gb-blue absolute pointer-events-none"
            style={{
              top: "0%", left: "-10%", width: "70%", height: "100%",
              background: `radial-gradient(ellipse at 20% 50%, ${project.gradientFrom}88 0%, transparent 70%)`,
            }}
          />
          <div
            className="gb-purple absolute pointer-events-none"
            style={{
              top: "0%", right: "-10%", width: "70%", height: "100%",
              background: `radial-gradient(ellipse at 80% 40%, ${project.gradientTo}66 0%, transparent 70%)`,
            }}
          />
        </>
      )}

      {/* ── Image panel ─────────────────────────────────────────── */}
      <div className={`relative flex-shrink-0 overflow-hidden ${project.hideImage ? "hidden md:flex md:w-[52%] md:items-center md:justify-center" : "w-full h-72 md:w-[52%] md:h-auto"}`}>
        {/* Panel screenshots — staggered side by side */}
        {project.hideImage && project.panelImages && (
          <div className="absolute inset-0 flex items-end justify-center gap-2 pb-0">
            <div style={{ transform: "translateY(-20px)" }}>
              <Image
                src={project.panelImages[0]}
                alt=""
                width={168}
                height={336}
                className="rounded-xl object-cover object-top"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.55)" }}
              />
            </div>
            <div style={{ transform: "translateY(-52px)" }}>
              <Image
                src={project.panelImages[1]}
                alt=""
                width={168}
                height={336}
                className="rounded-xl object-cover object-top"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)" }}
              />
            </div>
            <div style={{ transform: "translateY(-20px)" }}>
              <Image
                src={project.panelImages[2]}
                alt=""
                width={168}
                height={336}
                className="rounded-xl object-cover object-top"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.55)" }}
              />
            </div>
          </div>
        )}
        {!project.hideImage && (project.coverVideo ? (
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
        ))}
      </div>

      {/* ── Text panel ──────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        {project.gradientPanel && !project.hideImage ? (
          /* Animated gradient orbs — replaces blurred video */
          <>
            <div className="absolute inset-0" style={{ background: "#08080f" }} />
            <div
              className="gb-blue absolute pointer-events-none"
              style={{
                top: "0%", left: "-20%", width: "80%", height: "100%",
                background: `radial-gradient(ellipse at 30% 50%, ${project.gradientFrom}22 0%, transparent 75%)`,
              }}
            />
            <div
              className="gb-purple absolute pointer-events-none"
              style={{
                top: "0%", right: "-20%", width: "80%", height: "100%",
                background: `radial-gradient(ellipse at 70% 40%, ${project.gradientTo}1a 0%, transparent 75%)`,
              }}
            />
          </>
        ) : !project.hideImage ? (
          <>
            {/* Blurred image background */}
            {(project.coverVideo || project.coverImage) && (
              <div className="absolute top-0 bottom-0 right-0" style={{ left: "-110%", filter: `blur(${project.coverBlur ?? 48}px)`, willChange: "filter" }}>
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
          </>
        ) : null}
        {/* Project-color gradient wash — skipped when outer card owns the bg */}
        {!project.hideImage && (() => {
          const glow = project.panelGlow ?? { from: project.gradientFrom, to: project.gradientTo };
          return glow.base ? <div className="absolute inset-0" style={{ background: glow.base }} /> : null;
        })()}
        {!project.hideImage && (() => {
          const glow = project.panelGlow ?? { from: project.gradientFrom, to: project.gradientTo };
          if (glow.solid) {
            return (
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${glow.from}c3, ${glow.to}9c)` }}
              />
            );
          }
          const s = glow.strength ?? 1;
          const o1 = Math.min(255, Math.round(0x38 * s)).toString(16).padStart(2, "0");
          const o2 = Math.min(255, Math.round(0x22 * s)).toString(16).padStart(2, "0");
          return (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 0% 100%, ${glow.from}${o1} 0%, transparent 65%), radial-gradient(ellipse at 100% 0%, ${glow.to}${o2} 0%, transparent 60%)`,
              }}
            />
          );
        })()}

        {/* Text content */}
        <div className="relative z-10 px-7 py-7 md:px-10 md:py-10 flex flex-col justify-between h-full">
          <div>
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[9px] md:text-xs uppercase tracking-widest text-white/60 bg-white/[0.09] rounded-md px-2.5 py-1"
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
                <div className="flex gap-10 md:gap-14 mt-4">
                  {project.stats.slice(0, 3).map((s) => {
                    if (!s.value && !s.label) return null;
                    return (
                      <div key={s.label}>
                        <div className="text-xl md:text-[1.5rem] font-bold text-white tabular-nums leading-none">
                          <StatCounter value={s.value} />
                        </div>
                        <div className="text-xs md:text-[0.8rem] text-white/40 mt-2.5 leading-tight">
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* CTA */}
            <div className="mt-5 md:mt-6 border-t border-white/[0.07] pt-5 md:pt-6">
              {project.wip ? (
                <span className="text-sm tracking-wide uppercase text-white/35">
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
  );

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
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`group block cursor-pointer ${className}`}
        >
          {cardContent}
        </motion.div>
      ) : (
        <motion.a
          href={`/work/${project.slug}`}
          data-cursor="project"
          data-cursor-label={cursorLabel}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`group block ${className}`}
        >
          {cardContent}
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
                {/* Starry night header */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="/images/starry-night.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%), linear-gradient(135deg, ${project.gradientFrom}44, ${project.gradientTo}44)` }}
                  />
                </div>

                {/* Close */}
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
                    style={{
                      background: "rgba(251,146,60,0.1)",
                      border: "1px solid rgba(251,146,60,0.35)",
                      color: "rgba(251,146,60,1)",
                    }}
                  >
                    Coming Soon
                  </span>
                  <h3
                    className="text-2xl font-bold text-fg mb-2 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
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
