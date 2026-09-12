"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  activeIndex: number;
  total: number;
  isVisible: boolean;
  onDotClick: (i: number) => void;
};

export default function WorkIndicator({ activeIndex, total, isVisible, onDotClick }: Props) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 items-end"
        >
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className="flex items-center gap-2 group"
              aria-label={`Go to project ${i + 1}`}
            >
              <span
                className="text-[10px] font-medium tracking-wider transition-all duration-300"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  color: "#6b5ce7",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <motion.div
                animate={
                  i === activeIndex
                    ? { scale: 1.5, opacity: 1 }
                    : { scale: 1, opacity: 0.35 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="w-2 h-2 rounded-full"
                style={{
                  background: i === activeIndex ? "#6b5ce7" : "var(--fg-muted)",
                }}
              />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
