"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";


export default function Cursor() {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [cursorTags, setCursorTags] = useState<string[]>([]);
  const [cursorWip, setCursorWip] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 280, damping: 22, mass: 0.25 });
  const ringY = useSpring(mouseY, { stiffness: 280, damping: 22, mass: 0.25 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

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
        const tagsRaw = projectEl.dataset.cursorTags ?? "";
        setCursorTags(tagsRaw ? tagsRaw.split(",") : []);
        setCursorLabel(projectEl.dataset.cursorLabel ?? null);
        setCursorWip(projectEl.dataset.cursorWip === "true");
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
        setCursorTags([]);
        setCursorWip(false);
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

  if (!mounted || isTouch) return null;

  const isProject = cursorTags.length > 0 || !!cursorLabel;

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
          willChange: "transform",
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
          willChange: "transform",
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
              className="flex items-center gap-2 rounded-full whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest"
              style={
                cursorWip
                  ? {
                      background: theme === "dark" ? "rgba(40,22,4,0.55)" : "rgba(255,237,210,0.6)",
                      backdropFilter: "blur(24px) saturate(220%) brightness(1.1)",
                      WebkitBackdropFilter: "blur(24px) saturate(220%) brightness(1.1)",
                      boxShadow: theme === "dark"
                        ? "0 0 0 0.5px rgba(251,146,60,0.45), 0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,200,120,0.15)"
                        : "0 0 0 0.5px rgba(251,146,60,0.5), 0 4px 24px rgba(251,146,60,0.2), inset 0 1px 0 rgba(255,255,255,0.95)",
                      color: theme === "dark" ? "rgba(255,165,60,1)" : "rgba(160,72,0,1)",
                    }
                  : theme === "dark"
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
              {cursorTags.length > 0 ? (
                <div className="flex items-center gap-1.5">
                  {cursorTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                      style={
                        theme === "dark"
                          ? { background: "rgba(138,111,240,0.25)", color: "rgba(255,255,255,0.9)" }
                          : { background: "rgba(107,92,231,0.12)", color: "rgba(107,92,231,1)" }
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                cursorLabel
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
