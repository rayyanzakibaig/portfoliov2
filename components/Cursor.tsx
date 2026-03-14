"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";


export default function Cursor() {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 280, damping: 22, mass: 0.25 });
  const ringY = useSpring(mouseY, { stiffness: 280, damping: 22, mass: 0.25 });

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectEl = target.closest("[data-cursor='project']") as HTMLElement | null;
      if (projectEl) {
        setCursorLabel(projectEl.dataset.cursorLabel ?? "View Project");
        setHovered(false);
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setHovered(true);
        setCursorLabel(null);
      } else {
        setHovered(false);
        setCursorLabel(null);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest("[data-cursor='project']")) {
        setCursorLabel(null);
      }
      if (!related?.closest("a") && !related?.closest("button")) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const isProject = !!cursorLabel;

  return (
    <>
      {/* Dot — hides when showing project label */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
        }}
        animate={{
          width: isProject ? 0 : hovered ? 10 : 7,
          height: isProject ? 0 : hovered ? 10 : 7,
          opacity: isProject ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — hides when showing project label */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, rgba(138,111,240,0.5), rgba(200,85,160,0.5))",
        }}
        animate={{
          width: isProject ? 0 : hovered ? 44 : 34,
          height: isProject ? 0 : hovered ? 44 : 34,
          opacity: isProject ? 0 : hovered ? 0.4 : 0.18,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Project CTA pill */}
      <AnimatePresence>
        {isProject && (
          <motion.div
            key="cursor-pill"
            className="fixed top-0 left-0 z-[99999] pointer-events-none"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full whitespace-nowrap"
              style={
                theme === "dark"
                  ? {
                      background: "rgba(17,17,17,0.65)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      boxShadow: "0 0 0 0.5px rgba(255,255,255,0.14), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
                      color: "rgba(255,255,255,0.9)",
                    }
                  : {
                      background: "rgba(255,255,255,0.75)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      boxShadow: "0 0 0 0.5px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)",
                      color: "rgba(0,0,0,0.75)",
                    }
              }
            >
              {cursorLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
