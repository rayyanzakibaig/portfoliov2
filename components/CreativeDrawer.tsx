"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import type { BentoImage } from "@/data/bentoImages";

interface CreativeDrawerProps {
  item: BentoImage | null;
  items: BentoImage[];
  onClose: () => void;
  onNavigate: (item: BentoImage) => void;
}

export default function CreativeDrawer({ item, items, onClose, onNavigate }: CreativeDrawerProps) {
  const currentIndex = item ? items.findIndex(i => i.id === item.id) : -1;
  const [direction, setDirection] = useState(1);
  const dragX = useMotionValue(0);

  const goPrev = () => {
    if (currentIndex > 0) { setDirection(-1); onNavigate(items[currentIndex - 1]); }
  };
  const goNext = () => {
    if (currentIndex < items.length - 1) { setDirection(1); onNavigate(items[currentIndex + 1]); }
  };

  // Reset drag position when image changes
  useEffect(() => { dragX.set(0); }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, currentIndex, items]);

  useEffect(() => {
    if (!item) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9992] bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="pointer-events-auto relative flex flex-col md:flex-row w-full max-w-3xl h-[85vh] rounded-2xl border border-border bg-white/75 dark:bg-black/70 backdrop-blur-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg transition-colors"
                style={{ background: "var(--surface)" }}
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Mobile arrows — over image panel */}
              {currentIndex > 0 && (
                <button
                  onClick={goPrev}
                  className="flex md:hidden absolute left-3 top-[22vh] -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg transition-colors"
                  style={{ background: "var(--surface)" }}
                  aria-label="Previous"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L3 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
              {currentIndex < items.length - 1 && (
                <button
                  onClick={goNext}
                  className="flex md:hidden absolute right-3 top-[22vh] -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg transition-colors"
                  style={{ background: "var(--surface)" }}
                  aria-label="Next"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2L11 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}

              {/* Image panel */}
              <motion.div
                className={`relative flex-1 max-h-[50vh] md:max-h-none h-full overflow-hidden rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none ${item.modalContainAlways ? "" : "bg-white/60 dark:bg-white/5"}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                style={{ x: dragX }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 || info.velocity.x < -300) goNext();
                  else if (info.offset.x > 50 || info.velocity.x > 300) goPrev();
                }}
              >
                <AnimatePresence mode="sync" custom={direction}>
                  <motion.div
                    key={item.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {item.src ? (
                      <>
                        {/* Ambient blurred backdrop fills letterbox space */}
                        <Image
                          src={item.modalSrc ?? item.src}
                          alt=""
                          fill
                          aria-hidden
                          className={`object-cover scale-110 blur-2xl ${item.modalContainAlways ? "dark:opacity-90" : "dark:opacity-40"}`}
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        {/* Main image */}
                        <Image
                          src={item.modalSrc ?? item.src}
                          alt={item.alt}
                          fill
                          className={item.modalContainAlways ? "object-cover md:object-contain" : item.containInModal ? "object-contain" : "object-cover"}
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0" style={{ background: item.gradient }} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Info panel */}
              <div
                className="w-full md:w-64 shrink-0 flex flex-col p-6 overflow-y-auto rounded-br-2xl rounded-bl-none md:rounded-tr-2xl md:rounded-tl-none md:rounded-bl-none md:border-l md:border-border"
              >
                <div className="flex-1 flex flex-col justify-center">
                  {item.award && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 mb-6 self-start">
                      <span className="text-accent text-xs">★</span>
                      <span className="text-accent text-xs font-medium tracking-wide">{item.award}</span>
                    </div>
                  )}

                  <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-3">
                    {item.category}
                  </p>

                  <h2
                    className="text-3xl font-semibold text-fg leading-tight mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h2>

                  {item.description && (
                    <p className="text-sm text-fg-muted leading-relaxed">{item.description}</p>
                  )}
                </div>

                {/* Counter + nav arrows */}
                <div className="flex items-center gap-3 pt-6">
                  <p className="text-xs text-fg-muted">
                    {currentIndex + 1} / {items.length}
                  </p>
                  <div className="hidden md:flex items-center gap-2 ml-auto">
                    <button
                      onClick={goPrev}
                      disabled={currentIndex === 0}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ background: "var(--surface)" }}
                      aria-label="Previous"
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L3 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={goNext}
                      disabled={currentIndex === items.length - 1}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ background: "var(--surface)" }}
                      aria-label="Next"
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M5 2L11 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
