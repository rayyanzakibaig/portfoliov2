"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants, overlayVariants } from "@/lib/motion";
import { type CreativeItem } from "@/data/creative";

type Props = {
  item: CreativeItem | null;
  onClose: () => void;
};

export default function Modal({ item, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[9980] bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9981] flex items-center justify-center p-6">
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg bg-bg border border-border rounded-2xl p-8 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-fg-muted hover:text-fg transition-colors duration-200 text-lg"
                aria-label="Close modal"
              >
                ×
              </button>

              {/* Header gradient swatch */}
              <div
                className={`w-full h-32 rounded-xl mb-6 bg-gradient-to-br ${item.gradient}`}
              />

              {/* Type */}
              <p className="text-xs tracking-widest uppercase text-fg-muted mb-2">
                {item.type}
              </p>

              {/* Title */}
              <h3
                className="text-3xl md:text-4xl text-fg leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </h3>

              {/* Award badge */}
              {item.award && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-4">
                  <span className="text-accent text-xs">★</span>
                  <span className="text-accent text-xs tracking-wide">
                    {item.award}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-fg-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
