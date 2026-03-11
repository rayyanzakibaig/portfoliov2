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
    document.body.style.overflow = item ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[9980] bg-black/40 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[9981] flex items-center justify-center p-6">
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-bg border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
            >
              {/* Gradient header */}
              <div className={`h-40 bg-gradient-to-br ${item.gradient}`} />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors duration-150 text-base"
                aria-label="Close"
              >
                ×
              </button>

              <div className="p-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface border border-border text-fg-muted mb-3">
                  {item.type}
                </span>

                <h3
                  className="text-2xl font-bold text-fg mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>

                {item.award && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F4F2FF] border border-[#E5DFFF] text-[#6B5CE7] text-xs font-medium mb-3">
                    ★ {item.award}
                  </div>
                )}

                <p className="text-sm text-fg-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
