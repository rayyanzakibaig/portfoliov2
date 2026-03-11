"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { type BentoImage } from "@/data/bentoImages";

type Props = {
  images: BentoImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export default function Lightbox({ images, index, onClose, onChange }: Props) {
  const [direction, setDirection] = useState(0);

  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;

  const goPrev = () => {
    if (index === null) return;
    setDirection(-1);
    onChange((index - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (index === null) return;
    setDirection(1);
    onChange((index + 1) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, index]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <>
          {/* Backdrop */}
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[9980] bg-black/80 backdrop-blur-md"
          />

          {/* Container — clicking empty space closes */}
          <div
            className="fixed inset-0 z-[9981] flex items-center justify-center"
            onClick={onClose}
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-lg transition-colors duration-150"
              aria-label="Close"
            >
              ×
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest">
              {(index ?? 0) + 1} / {images.length}
            </div>

            {/* Prev arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center gap-4"
                style={{ width: "60vw", maxWidth: "900px" }}
              >
                {/* Image area */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ height: "60vh" }}
                >
                  {current.src ? (
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      className="object-contain"
                      sizes="60vw"
                    />
                  ) : (
                    /* TODO: replace with real image — set src in data/bentoImages.ts */
                    <div
                      className="w-full h-full rounded-2xl flex items-center justify-center"
                      style={{ background: current.gradient }}
                    >
                      <span className="text-white/40 text-xs tracking-widest uppercase">
                        {current.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="flex items-center gap-3">
                  <span className="text-white/90 text-sm font-medium">{current.title}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/50 text-xs">{current.category}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
