"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, cardReveal } from "@/lib/motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import ParticleBg from "@/components/ParticleBg";

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lerpHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
}

const BIO_LINE1 = "AI product designer crafting seamless user experiences.";
const BIO_LINE2 = "Redefining the next stage of human computer interaction.";
const BIO = BIO_LINE1 + " " + BIO_LINE2;
const BIO_DELAY = 1500;
const BIO_SPEED = 42;
const BIO_DURATION = BIO_DELAY + BIO.length * BIO_SPEED;

function TypewriterBio({ onComplete }: { onComplete: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const onCompleteRef = React.useRef(onComplete);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        i++;
        setDisplayed(BIO.slice(0, i));
        if (i >= BIO.length) { clearInterval(tick); onCompleteRef.current(); }
      }, BIO_SPEED);
      return () => clearInterval(tick);
    }, BIO_DELAY);
    return () => clearTimeout(start);
  }, []);

  const line1 = displayed.slice(0, Math.min(displayed.length, BIO_LINE1.length));
  const line2 = displayed.length > BIO_LINE1.length ? displayed.slice(BIO_LINE1.length + 1) : "";

  return (
    <>
      {line1}
      {displayed.length > BIO_LINE1.length && <><br />{line2}</>}
      {displayed.length < BIO.length && (
        <span className="opacity-60 animate-pulse">|</span>
      )}
    </>
  );
}

export default function Home() {
  const [bioComplete, setBioComplete] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("content-unlocked");
    if (!seen) {
      sessionStorage.setItem("content-unlocked", "1");
      const t = setTimeout(() => setContentReady(true), 3700);
      return () => clearTimeout(t);
    }
    setContentReady(true);
  }, []);
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef  = useRef<HTMLSpanElement>(null);
  const [nameGrads, setNameGrads] = useState<{ first: string; last: string } | null>(null);

  useEffect(() => {
    function compute() {
      const w1 = firstRef.current?.offsetWidth ?? 0;
      const w2 = lastRef.current?.offsetWidth  ?? 0;
      if (!w1 || !w2) return;
      const t = w1 / (w1 + w2);
      const dark = document.documentElement.classList.contains('dark');
      const [start, end] = dark ? ['#fcfcfc', '#bababa'] : ['#1a1a1a', '#6b6b6b'];
      const mid = lerpHex(start, end, t);
      setNameGrads({
        first: `linear-gradient(to right, ${start}, ${mid})`,
        last:  `linear-gradient(to right, ${mid}, ${end})`,
      });
    }
    document.fonts.ready.then(compute);
    window.addEventListener('resize', compute);
    const mo = new MutationObserver(compute);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => { window.removeEventListener('resize', compute); mo.disconnect(); };
  }, []);

  return (
    <main>
      {contentReady && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative h-[100svh] flex flex-col justify-center">
        <div className="absolute inset-0"><ParticleBg /></div>
        {/* Dark mode video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden dark:block"
          style={{ mixBlendMode: "screen", opacity: 0.18 }}
          aria-hidden="true"
        >
          <source src="/texture-bg.mp4" type="video/mp4" />
        </video>
        {/* Nav gradient blur */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />
        {/* Nav contrast overlay */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10 bg-bg"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
          }}
        />

        {/* Radial blur circle */}
        <div
          className="absolute inset-0 pointer-events-none bg-white/25 dark:bg-transparent"
          style={{
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade to blend into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none bg-bg"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 40%, black 75%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 40%, black 75%)",
          }}
        />



        <div id="hero-content" className="relative max-w-5xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-16 md:pb-24 w-full flex flex-col items-center text-center" style={{ zIndex: 2 }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Name — per-word blur */}
            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[0.88] tracking-[-0.03em] mb-6 md:mb-8"
              style={{ fontFamily: "var(--font-lexend), sans-serif", fontWeight: 700, fontSize: "clamp(3.75rem, 7vw, 100px)" }}
            >
              <motion.span
                ref={firstRef}
                initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="inline-block name-gradient"
                style={nameGrads ? { backgroundImage: nameGrads.first } : undefined}
              >
                Rayyan
              </motion.span>
              {" "}
              <motion.span
                ref={lastRef}
                initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="inline-block name-gradient"
                style={nameGrads ? { backgroundImage: nameGrads.last } : undefined}
              >
                Zakibaig
              </motion.span>
            </motion.h1>

            {/* Bio */}
            <div className="relative max-w-2xl mb-6 md:mb-8">
            <motion.p
              variants={fadeUp}
              className="relative text-fg/60 text-sm sm:text-base md:text-lg leading-snug min-h-[2.75rem] sm:min-h-[3.5rem]"
              style={{ fontFamily: "var(--font-outfit), sans-serif", fontWeight: 400 }}
            >
              <TypewriterBio onComplete={() => setBioComplete(true)} />
            </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={bioComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-fg/70 hover:text-bg transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                View Case Studies
              </a>
              <a
                href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.82] dark:bg-white/[0.08] backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.12),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] text-fg text-sm font-medium hover:bg-black/[0.06] dark:hover:bg-white/[0.14] hover:shadow-none transition-all duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Resume ↗
              </a>
            </motion.div>

            {/* Scroll arrow */}
            <motion.a
              href="#work"
              initial={{ opacity: 0, y: 16 }}
              animate={bioComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-10 flex flex-col items-center text-fg-muted/70 hover:text-fg-muted transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <motion.svg
                width="28" height="28" viewBox="0 0 28 28" fill="none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
              >
                <path d="M6 10l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── Work ──────────────────────────────────────────────── */}
      <section id="work" className="relative px-6 md:px-8 pt-28 pb-32 md:pt-36 md:pb-40">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2
                className="text-3xl font-bold text-fg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Case Studies
              </h2>
              <p className="mt-2 text-base text-fg-muted">
                Here are some of my projects in product design, UX and mobile design
              </p>
            </div>
          </motion.div>

          {(() => {
            const projectSizes: Record<string, "full" | "half"> = {
              "hire-journey": "full",
              "sleep-os": "half",
              "american-emr": "half",
              "investate": "full",
            };
            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                {projects.map((project) => (
                  <motion.div
                    key={project.slug}
                    variants={cardReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className={projectSizes[project.slug] === "full" ? "col-span-full" : ""}
                  >
                    <ProjectCard project={project} className="h-full" />
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      <Footer />
      </motion.div>
      )}
    </main>
  );
}
