"use client";

import { motion } from "framer-motion";
import { type CreativeItem } from "@/data/creative";

type Props = {
  item: CreativeItem;
  onClick: (item: CreativeItem) => void;
};

export default function BentoItem({ item, onClick }: Props) {
  return (
    <motion.button
      onClick={() => onClick(item)}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`relative overflow-hidden rounded-2xl text-left w-full h-full`}
      style={{ minHeight: item.rowSpan > 1 ? 320 : 200 }}
      data-cursor="hover"
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

      {/* Hover overlay */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-black/30"
      />

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-end">
        {/* Award badge */}
        {item.award && (
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 border border-white/20 mb-3 w-fit">
            <span className="text-white/80 text-xs">★</span>
            <span className="text-white/80 text-xs">Award</span>
          </div>
        )}

        <p className="text-white/50 text-xs tracking-widest uppercase mb-1">
          {item.type}
        </p>
        <h3
          className="text-xl md:text-2xl text-white leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {item.title}
        </h3>

        {/* Hover CTA */}
        <motion.div
          variants={{
            rest: { opacity: 0, y: 8 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.2 }}
          className="mt-2"
        >
          <span className="text-white/70 text-xs">View details →</span>
        </motion.div>
      </div>
    </motion.button>
  );
}
