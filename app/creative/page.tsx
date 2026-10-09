"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { bentoImages, type BentoImage } from "@/data/bentoImages";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Footer from "@/components/Footer";

const DISPLAY_ORDER = ["bento-18", "bento-8", "bento-19", "bento-3", "bento-9", "bento-10", "bento-22", "bento-23", "bento-12", "bento-17", "bento-20", "bento-15", "bento-11", "bento-21", "bento-24", "bento-13", "bento-14", "bento-26", "bento-1", "bento-2", "bento-4", "bento-16", "bento-6", "bento-7", "bento-5"];

const orderedImages = DISPLAY_ORDER
  .map(id => bentoImages.find(img => img.id === id))
  .filter(Boolean) as BentoImage[];

const FILTER_CATEGORIES = Array.from(new Set(bentoImages.map(img => img.filterCategory)));

const CAT_ICONS: Record<string, React.ReactNode> = {
  "Graphic Design": (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14 4L6 12H4V10L12 2Z" /><path d="M2 14h12" />
    </svg>
  ),
  "Photography": (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="14" height="10" rx="2" /><circle cx="8" cy="9" r="2.5" /><path d="M5 4l1.5-2h3L11 4" />
    </svg>
  ),
  "Mixed Media": (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="12" height="5" rx="1" /><rect x="2" y="2" width="12" height="5" rx="1" />
    </svg>
  ),
};

// Max image dimensions as fraction of viewport
const IMG_MAX_W = 0.58; // 58vw
const IMG_MAX_H = 0.80; // 80vh
const GAP = 64;         // fixed gap between image edges in px

function parseRatio(ar: string | undefined): number {
  if (!ar) return 4 / 3;
  if (ar.includes("/")) {
    const [w, h] = ar.split("/").map(Number);
    return w / h;
  }
  return parseFloat(ar) || 4 / 3;
}

function renderedWidth(ratio: number, vw: number, vh: number): number {
  const maxW = IMG_MAX_W * vw;
  const maxH = IMG_MAX_H * vh;
  // If image is wider relative to constraints, it's width-constrained; else height-constrained
  return ratio >= maxW / maxH ? maxW : maxH * ratio;
}

export default function Creative() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<BentoImage | null>(null);
  const [vp, setVp] = useState({ vw: 1440, vh: 900 });
  const trackX = useMotionValue(0);
  const swipedRef = useRef(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const firstOpenRef = useRef(true);
  const THUMB_W = 56;

  useEffect(() => {
    const update = () => setVp({ vw: window.innerWidth, vh: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const filtered = activeFilter
    ? orderedImages.filter(img => img.filterCategory === activeFilter)
    : orderedImages;

  const lightboxItems = filtered.filter(i => !!i.src);
  const activeIndex = activeItem ? lightboxItems.findIndex(i => i.id === activeItem.id) : -1;

  // Compute each image's actual rendered width from its aspect ratio
  const imgWidths = lightboxItems.map(item =>
    renderedWidth(parseRatio(item.aspectRatio), vp.vw, vp.vh)
  );

  // Cumulative x position of each slide (image edges + fixed gap)
  const slidePositions = imgWidths.reduce((acc, w, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + imgWidths[i - 1] + GAP);
    return acc;
  }, [] as number[]);

  const getTrackX = useCallback((idx: number) => {
    if (slidePositions[idx] === undefined) return 0;
    const centerOffset = (vp.vw - imgWidths[idx]) / 2;
    return centerOffset - slidePositions[idx];
  }, [slidePositions, imgWidths, vp.vw]);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= lightboxItems.length) return;
    animate(trackX, getTrackX(idx), { type: "spring", stiffness: 280, damping: 30 });
    setActiveItem(lightboxItems[idx]);
  }, [lightboxItems, trackX, getTrackX]);

  const openLightbox = (item: BentoImage) => {
    if (!item.src) return;
    if (window.innerWidth < 768) return;
    const idx = lightboxItems.findIndex(i => i.id === item.id);
    trackX.set(getTrackX(idx));
    setActiveItem(item);
  };

  const closeLightbox = () => {
    setActiveItem(null);
    firstOpenRef.current = true;
    window.dispatchEvent(new CustomEvent("lightbox:close"));
  };

  useEffect(() => {
    if (!activeItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeItem, activeIndex, goTo]);


  useEffect(() => {
    if (activeIndex < 0 || !thumbsRef.current) return;
    const el = thumbsRef.current.children[activeIndex] as HTMLElement;
    el?.scrollIntoView({ behavior: firstOpenRef.current ? "auto" : "smooth", block: "nearest", inline: "center" });
    firstOpenRef.current = false;
  }, [activeIndex]);

  // Re-center active image on viewport resize
  useEffect(() => {
    if (activeIndex < 0) return;
    trackX.set(getTrackX(activeIndex));
  }, [vp, activeIndex, getTrackX, trackX]);

  return (
    <>
      <main className="relative min-h-screen">

        {/* ─── Header ──────────────────────────────────────────── */}
        <section className="relative">
          <motion.div
            className="relative max-w-5xl mx-auto px-6 md:px-8 pt-44 pb-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold text-fg leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-lexend), sans-serif", fontWeight: 700 }}
            >
              My Creative Endeavors
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm text-fg-muted mb-8 max-w-sm">
              When I'm not designing or building, I'm either capturing photos, creating art, or exploring new creative medias.
            </motion.p>

            {/* Filter tabs */}
            <motion.div variants={fadeUp} className="overflow-x-auto scrollbar-none">
              <div className="inline-flex items-center gap-7 border-b border-border">
                <span className="pb-3 text-fg-muted/50">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 3h14M4 8h8M7 13h2" />
                  </svg>
                </span>
                {(["All", ...FILTER_CATEGORIES] as (string | null)[]).map((cat) => {
                  const label = cat === null ? "All" : cat;
                  const isActive = cat === "All" ? activeFilter === null : activeFilter === cat;
                  return (
                    <button
                      key={label}
                      onClick={() => setActiveFilter(cat === "All" ? null : cat as string)}
                      className={`relative pb-3 text-sm whitespace-nowrap transition-colors duration-150 ${
                        isActive ? "" : "text-fg-muted hover:text-fg"
                      }`}
                      style={{ color: isActive ? "var(--fg)" : undefined }}
                    >
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="filter-underline"
                          className="absolute bottom-0 left-0 right-0 h-px bg-fg"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
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
                  onClick={() => openLightbox(image)}
                  data-cursor="image"
                  className="group relative overflow-hidden cursor-pointer w-full block"
                  style={{ aspectRatio: image.aspectRatio }}
                >
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
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </main>

      {/* ─── Lightbox carousel ───────────────────────────────────── */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-gray-400/25 dark:bg-black/75 select-none"
            style={{ backdropFilter: "blur(24px) saturate(0.5)", cursor: "none" }}
            data-cursor="lightbox"
            onPanStart={() => { swipedRef.current = false; }}
            onPan={(_, info) => { if (Math.abs(info.offset.x) > 8) swipedRef.current = true; }}
            onPanEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 300) {
                if (info.offset.x > 0) goTo(activeIndex - 1);
                else goTo(activeIndex + 1);
              }
              swipedRef.current = false;
            }}
            onClick={(e) => {
              if (swipedRef.current) return;
              if ((e.target as HTMLElement).closest("button")) return;
              if (e.clientX < window.innerWidth / 2) goTo(activeIndex - 1);
              else goTo(activeIndex + 1);
            }}
          >
            {vp.vw < 768 ? (
              /* Small screen fallback */
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-fg/60 text-sm font-medium tracking-wide">Please view on a larger screen</p>
                <button
                  onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                  data-cursor="close"
                  className="absolute top-2 left-2 p-14 text-fg/40 hover:text-fg/80 text-sm font-bold tracking-widest transition-colors duration-150"
                >
                  ESC
                </button>
              </div>
            ) : (
            <>{/* Sliding track — all lightbox images laid out horizontally */}
            <motion.div
              className="absolute top-0 flex items-center"
              style={{ x: trackX, bottom: "80px" }}
            >
              {lightboxItems.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 relative rounded-2xl"
                    style={{
                      width: imgWidths[i] ?? IMG_MAX_W * vp.vw,
                      height: `${IMG_MAX_H * 100}vh`,
                      marginRight: i < lightboxItems.length - 1 ? GAP : 0,
                    }}
                    initial={{
                      scale: isActive ? 1.15 : 0.58,
                      opacity: isActive ? 0 : 0.65,
                    }}
                    animate={{
                      scale: isActive ? 1 : 0.58,
                      opacity: isActive ? 1 : 0.65,
                      filter: isActive ? "brightness(1)" : "brightness(0.75)",
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={item.src!}
                      alt={item.alt}
                      width={2400}
                      height={2400}
                      className="w-full h-full rounded-2xl shadow-2xl"
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Close button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              data-cursor="close"
              className="absolute top-2 left-2 z-10 p-14 flex items-center justify-center text-fg/40 hover:text-fg/80 text-sm font-bold tracking-widest transition-colors duration-150"
            >
              ESC
            </motion.button>

            {/* Filmstrip */}
            <div
              ref={thumbsRef}
              data-cursor="none"
              className="absolute bottom-0 left-0 right-0 h-[72px] z-10 flex items-center justify-center overflow-x-auto scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxItems.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    className="relative flex-shrink-0 overflow-visible"
                    style={{ width: THUMB_W, height: 52 }}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.35, scale: 1 }}
                    whileHover={{ opacity: isActive ? 1 : 0.75, scale: 1.08 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-full h-full overflow-hidden">
                      <Image
                        src={item.src!}
                        alt={item.alt}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="active-thumb-outline"
                        className="absolute -inset-[2px] pointer-events-none"
                        style={{ outline: "2px solid rgba(255,255,255,0.9)", outlineOffset: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
