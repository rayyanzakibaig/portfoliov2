"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { creativeItems, type CreativeItem } from "@/data/creative";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";

export default function Creative() {
  const [activeModal, setActiveModal] = useState<CreativeItem | null>(null);

  return (
    <>
      <main className="min-h-screen">
        {/* ─── Header ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 80% 20%, rgba(200,85,160,0.38) 0%, transparent 60%)`,
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-16">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.p
                variants={fadeUp}
                className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-6"
              >
                Beyond the Brief
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-6xl font-bold text-fg leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Work made for{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #C855A0, #8A6FF0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  curiosity.
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-md">
                Side projects, art, and creative explorations made outside of client work.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── List ────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 md:px-8 pb-24">
          <div className="border-t border-border">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {creativeItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  variants={fadeUp}
                  onClick={() => setActiveModal(item)}
                  className="group w-full py-8 flex items-center gap-6 md:gap-8 text-left border-b border-border hover:bg-surface/50 transition-colors duration-200 px-2 -mx-2 rounded-lg"
                  data-cursor="hover"
                >
                  {/* Index */}
                  <span className="text-xs text-fg-muted tabular-nums w-5 shrink-0 font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Swatch */}
                  <div
                    className={`w-10 h-10 rounded-xl shrink-0 bg-gradient-to-br ${item.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-xl md:text-2xl font-semibold text-fg group-hover:text-accent transition-colors duration-200 leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h2>
                    {item.award && (
                      <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-[#F4F2FF] border border-[#E5DFFF] text-[#6B5CE7] text-xs font-medium">
                        ★ {item.award}
                      </div>
                    )}
                  </div>

                  {/* Type tag */}
                  <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface border border-border text-fg-muted shrink-0">
                    {item.type}
                  </span>

                  {/* Arrow */}
                  <span className="text-fg-muted group-hover:text-fg group-hover:translate-x-1 transition-all duration-200 shrink-0">
                    →
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>

      <Modal item={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
