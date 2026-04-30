"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { bentoImages, type BentoImage } from "@/data/bentoImages";
import { staggerContainer, fadeUp } from "@/lib/motion";
import CreativeDrawer from "@/components/CreativeDrawer";
import Footer from "@/components/Footer";

// Ordered for editorial grid placement
// Row 1: landscape/square  Row 2: portrait trio  Row 3: landscape
const DISPLAY_ORDER = ["bento-18", "bento-8", "bento-19", "bento-3", "bento-9", "bento-10", "bento-12", "bento-17", "bento-20", "bento-15", "bento-11", "bento-21", "bento-13", "bento-14", "bento-1", "bento-2", "bento-4", "bento-16", "bento-6", "bento-7", "bento-5"];


const orderedImages = DISPLAY_ORDER
  .map(id => bentoImages.find(img => img.id === id))
  .filter(Boolean) as BentoImage[];

const FILTER_CATEGORIES = Array.from(
  new Set(bentoImages.map(img => img.filterCategory))
);

const CAT_ICONS: Record<string, React.ReactNode> = {
  "Graphic Design": (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14 4L6 12H4V10L12 2Z" />
      <path d="M2 14h12" />
    </svg>
  ),
  "Photography": (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="14" height="10" rx="2" />
      <circle cx="8" cy="9" r="2.5" />
      <path d="M5 4l1.5-2h3L11 4" />
    </svg>
  ),
  "Mixed Media": (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="12" height="5" rx="1" />
      <rect x="2" y="2" width="12" height="5" rx="1" />
    </svg>
  ),
};

export default function Creative() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<BentoImage | null>(null);

  const filtered = activeFilter
    ? orderedImages.filter(img => img.filterCategory === activeFilter)
    : orderedImages;

  return (
    <>
      <main className="relative min-h-screen">
        <div
          className="absolute top-0 left-0 right-0 h-[520px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 120% 80% at 0% 80%, rgba(244, 114, 182, 0.26) 0%, transparent 60%)`,
            maskImage: `linear-gradient(to bottom, black 50%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 50%, transparent 100%)`,
          }}
        />
        {/* ─── Header ──────────────────────────────────────────── */}
        <section className="relative">
          <motion.div
            className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-semibold text-fg leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Creative Explorations
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm text-fg-muted mb-8 max-w-sm">
              When I'm not designing or building, I'm either taking photos, making art, or exploring new creative medias.
            </motion.p>

            {/* Segmented control */}
            <motion.div variants={fadeUp} className="overflow-x-auto scrollbar-none">
              <div className="inline-flex items-center gap-0.5 p-1 rounded-full border border-border bg-surface">
                {(["All", ...FILTER_CATEGORIES] as (string | null)[]).map((cat) => {
                  const label = cat === null ? "All" : cat;
                  const isActive = cat === "All" ? activeFilter === null : activeFilter === cat;
                  const icon = CAT_ICONS[label] ?? null;
                  return (
                    <button
                      key={label}
                      onClick={() => setActiveFilter(cat === "All" ? null : cat as string)}
                      className="relative px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full transition-colors duration-150 whitespace-nowrap"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="seg-indicator"
                          className="absolute inset-0 rounded-full bg-fg"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-150 ${isActive ? "text-bg font-medium" : "text-fg-muted hover:text-fg"}`}>
                        {icon}
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Grid ────────────────────────────────────────────── */}
        <section className="px-6 md:px-8 pb-24">
          <div className="relative overflow-hidden columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
            {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="break-inside-avoid pb-3"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.4) }}
                >
                  <button
                    onClick={() => setActiveItem(image)}
                    data-cursor="hover"
                    className="group relative overflow-hidden cursor-pointer w-full block"
                    style={{ aspectRatio: image.aspectRatio }}
                  >
                    {/* Image or gradient fallback */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                      {image.src ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={image.thumbnailScale ? { transform: `scale(${image.thumbnailScale})` } : undefined}
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ background: image.gradient }} />
                      )}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/65 to-transparent">
                      <p className="text-white/60 text-xs tracking-widest uppercase mb-0.5">
                        {image.category}
                      </p>
                      <p className="text-white text-sm font-medium">{image.title}</p>
                    </div>
                  </button>
                </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </main>

      <CreativeDrawer item={activeItem} items={filtered} onClose={() => setActiveItem(null)} onNavigate={setActiveItem} />
    </>
  );
}
