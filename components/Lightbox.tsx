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
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
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

          {/* Centering shell — click outside closes */}
          <div
            className="fixed inset-0 z-[9981] flex items-center justify-center"
            onClick={onClose}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                /* 100% on mobile, 80vw × 80vh on md+ */
                className="relative w-full h-[100svh] md:w-[80vw] md:h-[80vh] md:rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "#F8F7F4",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
                }}
              >
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-5">
                  <span className="text-black/40 text-xs tracking-widest tabular-nums">
                    {(index ?? 0) + 1} / {images.length}
                  </span>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/12 text-black/70 text-lg transition-colors duration-150"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {/* Image */}
                <div className="flex-1 relative">
                  {current.src ? (
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: current.gradient }}
                    >
                      <span className="text-white/40 text-xs tracking-widest uppercase">
                        {current.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom bar: caption + arrows */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-black/80 text-sm font-medium">{current.title}</span>
                    <span className="text-black/25">·</span>
                    <span className="text-black/50 text-xs">{current.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goPrev}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/12 text-black/60 transition-colors duration-150"
                      aria-label="Previous"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      onClick={goNext}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/12 text-black/60 transition-colors duration-150"
                      aria-label="Next"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
