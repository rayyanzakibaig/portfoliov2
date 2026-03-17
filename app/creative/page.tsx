"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { bentoImages, type BentoImage } from "@/data/bentoImages";
import CreativeDrawer from "@/components/CreativeDrawer";
import Footer from "@/components/Footer";

// Ordered for editorial grid placement
// Row 1: landscape/square  Row 2: portrait trio  Row 3: landscape
const DISPLAY_ORDER = ["bento-8", "bento-3", "bento-9", "bento-10", "bento-12", "bento-17", "bento-15", "bento-11", "bento-13", "bento-14", "bento-1", "bento-2", "bento-4", "bento-16", "bento-6", "bento-7", "bento-5"];


const orderedImages = DISPLAY_ORDER
  .map(id => bentoImages.find(img => img.id === id))
  .filter(Boolean) as BentoImage[];

const FILTER_CATEGORIES = Array.from(
  new Set(bentoImages.map(img => img.filterCategory))
);

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
          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-12">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-semibold text-fg leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Creative
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm text-fg-muted mb-8 max-w-sm">
              When I'm not designing or building, I'm either taking photos, making art, or exploring new creative medias.
            </motion.p>

            {/* Filter pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              <FilterPill
                label="All"
                active={activeFilter === null}
                onClick={() => setActiveFilter(null)}
              />
              {FILTER_CATEGORIES.map(cat => (
                <FilterPill
                  key={cat}
                  label={cat}
                  active={activeFilter === cat}
                  onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                />
              ))}
            </motion.div>
          </motion.div>
          </div>
        </section>

        {/* ─── Grid ────────────────────────────────────────────── */}
        <section className="px-6 md:px-8 pb-24">
          <div className="relative overflow-hidden columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((image, index) => (
                <div key={image.id} className="break-inside-avoid pb-3">
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.25, ease: "easeOut" },
                    y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    delay: index * 0.04,
                  }}
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
                </motion.button>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <Footer />
      </main>

      <CreativeDrawer item={activeItem} items={filtered} onClose={() => setActiveItem(null)} onNavigate={setActiveItem} />
    </>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide transition-all duration-200 ${
        active
          ? "bg-accent text-white shadow-[0_0_0_0.5px_rgba(107,92,231,0.5),0_2px_8px_rgba(107,92,231,0.3)]"
          : "bg-white/[0.82] dark:bg-white/[0.08] backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.12),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] text-fg-muted hover:text-fg"
      }`}
    >
      {label}
    </button>
  );
}
