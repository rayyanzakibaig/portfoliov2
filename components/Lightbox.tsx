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

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const imageVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: "easeIn" } }),
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
        <motion.div
          key="lb-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[9980] bg-black/95 flex flex-col items-center justify-center px-6 py-14 md:px-16"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-[72px] right-5 md:top-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xl leading-none transition-colors duration-150"
            aria-label="Close"
          >
            ×
          </button>

          {/* Counter */}
          <p className="absolute top-[78px] left-6 md:top-6 text-white/30 text-xs tracking-widest tabular-nums select-none">
            {(index ?? 0) + 1} / {images.length}
          </p>

          {/* Image + caption */}
          <div className="flex flex-col items-center gap-5 w-full max-w-[95vw] md:max-w-5xl lg:max-w-6xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex items-center justify-center"
              >
                {current.src ? (
                  <Image
                    src={current.src}
                    alt={current.alt}
                    width={1400}
                    height={1000}
                    className="max-w-[90vw] max-h-[78vh] rounded-xl"
                    style={{ width: "auto", height: "auto" }}
                    onClick={(e) => e.stopPropagation()}
                    sizes="(max-width: 768px) 95vw, 90vw"
                  />
                ) : (
                  <div
                    className="w-full max-w-xl aspect-[4/3] rounded-xl flex items-center justify-center"
                    style={{ background: current.gradient }}
                  >
                    <span className="text-white/40 text-xs tracking-widest uppercase">
                      {current.title}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Caption row */}
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="text-center">
                <p className="text-white/90 text-sm font-medium">{current.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{current.category}</p>
              </div>
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={goPrev}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-colors duration-150"
                  aria-label="Previous"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-colors duration-150"
                  aria-label="Next"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
