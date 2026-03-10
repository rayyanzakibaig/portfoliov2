"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects } from "@/data/projects";
import { creativeItems } from "@/data/creative";
import ProjectCard from "@/components/ProjectCard";
import BentoItem from "@/components/BentoItem";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import { type CreativeItem } from "@/data/creative";

export default function Home() {
  const [activeModal, setActiveModal] = useState<CreativeItem | null>(null);

  return (
    <main>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-20">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-fg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rayyan
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight italic text-accent"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Zakibaig
            </motion.h1>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-2">
              <p className="text-sm tracking-widest uppercase text-fg-muted">
                Product designer who builds.
              </p>
              <p className="text-base text-fg-muted max-w-sm leading-relaxed">
                Crafting products that are intuitive to use and thoughtful to look at.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6">
              <a
                href="#work"
                className="group flex items-center gap-2 text-sm text-fg hover:text-accent transition-colors duration-200"
              >
                View Work
                <span className="inline-block group-hover:translate-y-0.5 transition-transform duration-200">
                  ↓
                </span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Resume
                <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-200">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Work ──────────────────────────────────────────────── */}
      <section id="work" className="px-6 md:px-10 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase text-fg-muted mb-12"
          >
            Selected Work
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {/* First card — full width */}
            <motion.div variants={fadeUp}>
              <ProjectCard project={projects[0]} className="w-full" />
            </motion.div>

            {/* Two side by side */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProjectCard project={projects[1]} />
              <ProjectCard project={projects[2]} />
            </motion.div>

            {/* Last card — full width */}
            <motion.div variants={fadeUp}>
              <ProjectCard project={projects[3]} className="w-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Creative / Bento ──────────────────────────────────── */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase text-fg-muted mb-12"
          >
            Beyond the Brief
          </motion.p>

          {/* Bento grid — 3 columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-3 gap-3 auto-rows-[200px]"
          >
            {/* Item 0: Audi R8 — wide (col-span-2) */}
            <motion.div variants={fadeUp} className="col-span-2 row-span-1">
              <BentoItem
                item={creativeItems[0]}
                onClick={setActiveModal}
              />
            </motion.div>

            {/* Item 1: Ink's Lake — tall (row-span-2) → placed at col 3 */}
            <motion.div variants={fadeUp} className="col-span-1 row-span-2">
              <BentoItem
                item={creativeItems[1]}
                onClick={setActiveModal}
              />
            </motion.div>

            {/* Item 2: Porsche — square */}
            <motion.div variants={fadeUp} className="col-span-1 row-span-1">
              <BentoItem
                item={creativeItems[2]}
                onClick={setActiveModal}
              />
            </motion.div>

            {/* Item 3: Brand — square */}
            <motion.div variants={fadeUp} className="col-span-1 row-span-1">
              <BentoItem
                item={creativeItems[3]}
                onClick={setActiveModal}
              />
            </motion.div>

            {/* Item 4: Type Studies — wide (col-span-2) */}
            <motion.div variants={fadeUp} className="col-span-2 row-span-1">
              <BentoItem
                item={creativeItems[4]}
                onClick={setActiveModal}
              />
            </motion.div>

            {/* Item 5: Photo Series — square */}
            <motion.div variants={fadeUp} className="col-span-1 row-span-1">
              <BentoItem
                item={creativeItems[5]}
                onClick={setActiveModal}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <Footer />

      {/* ─── Modal ─────────────────────────────────────────────── */}
      <Modal item={activeModal} onClose={() => setActiveModal(null)} />
    </main>
  );
}
