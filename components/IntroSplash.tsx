"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("intro-seen")) {
      sessionStorage.setItem("intro-seen", "1");
      setVisible(true);
      const exitTimer = setTimeout(() => setExiting(true), 2800);
      const hideTimer = setTimeout(() => setVisible(false), 3600);
      return () => { clearTimeout(exitTimer); clearTimeout(hideTimer); };
    }
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
        animate={
          exiting
            ? { scale: 5, opacity: 0, filter: "blur(32px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={
          exiting
            ? { duration: 0.75, ease: [0.4, 0, 1, 1] }
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
        }
        className="relative flex items-center justify-center"
        style={{ width: 240, height: 240 }}
      >
        {/* Ring */}
        <svg
          width={240}
          height={240}
          viewBox="0 0 240 240"
          className="absolute inset-0 text-fg"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx={120} cy={120} r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeOpacity={0.12}
          />
          <motion.circle
            cx={120} cy={120} r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeOpacity={0.85}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </svg>

        {/* Pulsing logo — black in light mode, white in dark mode */}
        <motion.div
          animate={exiting ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          className="relative z-10"
        >
          <Image
            src="/rz-logo.png"
            alt="RZ"
            width={120}
            height={120}
            className="object-contain brightness-0 dark:invert"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
