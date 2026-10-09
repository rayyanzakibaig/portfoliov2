"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";


export default function Cursor() {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [magnify, setMagnify] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [cursorTags, setCursorTags] = useState<string[]>([]);
  const [cursorWip, setCursorWip] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorArrow, setCursorArrow] = useState<"left" | "right" | null>(null);
  const [cursorClose, setCursorClose] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);

  const lightboxClosingRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 600, damping: 32, mass: 0.15 });
  const ringY = useSpring(mouseY, { stiffness: 600, damping: 32, mass: 0.15 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const t = e.target as HTMLElement;
      setCursorHidden(!!t.closest("[data-cursor='none']"));
      const lb = document.querySelector("[data-cursor='lightbox']") as HTMLElement | null;
      if (lb) {
        if (t.closest("[data-cursor='close']") || t.closest("[data-cursor='none']")) {
          setCursorArrow(null);
        } else {
          setCursorArrow(e.clientX < window.innerWidth / 2 ? "left" : "right");
        }
      } else {
        setCursorArrow(null);
        setCursorClose(false);
      }
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='close']")) {
        if (lightboxClosingRef.current) return;
        setCursorClose(true);
        setHovered(false);
        setCursorLabel(null);
        return;
      }
      setCursorClose(false);
      const projectEl = target.closest("[data-cursor='project']") as HTMLElement | null;
      const imageEl = target.closest("[data-cursor='image']");
      if (projectEl) {
        const tagsRaw = projectEl.dataset.cursorTags ?? "";
        setCursorTags(tagsRaw ? tagsRaw.split(",") : []);
        setCursorLabel(projectEl.dataset.cursorLabel ?? null);
        setCursorWip(projectEl.dataset.cursorWip === "true");
        setHovered(false);
        setMagnify(false);
      } else if (imageEl) {
        setHovered(true);
        setMagnify(false);
        setCursorLabel(null);
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setHovered(true);
        setMagnify(true);
        setCursorLabel(null);
      } else {
        setHovered(false);
        setMagnify(false);
        setCursorLabel(null);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest("[data-cursor='close']")) setCursorClose(false);
      if (!related?.closest("[data-cursor='project']")) {
        setCursorLabel(null);
        setCursorTags([]);
        setCursorWip(false);
      }
      if (!related?.closest("a") && !related?.closest("button") && !related?.closest("[data-cursor='image']")) {
        setHovered(false);
        setMagnify(false);
      }
    };

    const onLightboxClose = () => {
      lightboxClosingRef.current = true;
      setCursorClose(false);
      setCursorArrow(null);
      setTimeout(() => { lightboxClosingRef.current = false; }, 400);
    };

    const onDown = () => setPressed(true);
    const onUp   = () => setPressed(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("lightbox:close", onLightboxClose);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("lightbox:close", onLightboxClose);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouch) return null;

  const isProject = cursorTags.length > 0 || !!cursorLabel;

  return (
    <>
      {/* Frosted glass cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          backdropFilter: magnify ? "none" : "blur(8px) saturate(180%)",
          WebkitBackdropFilter: magnify ? "none" : "blur(8px) saturate(180%)",
          background: cursorArrow
            ? theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.5)"
            : magnify
            ? theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.15)"
            : theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.35)",
          boxShadow: magnify
            ? theme === "dark"
              ? [
                  "0 0 0 1.5px rgba(255,255,255,0.8)",
                  "inset 1.5px 1.5px 2px 0 rgba(255,255,255,0.5)",
                  "inset -1.5px -1.5px 2px 0 rgba(0,0,0,0.3)",
                  "inset 0 0 4px 1.5px rgba(130,220,255,0.4)",
                  "inset 0 0 6px 2.5px rgba(255,110,220,0.22)",
                ].join(", ")
              : [
                  "0 0 0 1.5px rgba(17,17,17,0.3)",
                  "inset 1.5px 1.5px 2px 0 rgba(255,255,255,0.8)",
                  "inset -1.5px -1.5px 2px 0 rgba(0,0,0,0.12)",
                  "inset 0 0 4px 1.5px rgba(80,180,255,0.3)",
                  "inset 0 0 6px 2.5px rgba(235,60,180,0.17)",
                ].join(", ")
            : hovered
            ? theme === "dark"
              ? "0 0 0 1.5px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "0 0 0 1.5px rgba(17,17,17,0.55), inset 0 1px 0 rgba(255,255,255,0.9)"
            : theme === "dark"
            ? "0 0 0 1px rgba(255,255,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 0 0 1px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
          willChange: "transform",
          color: theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.75)",
          transition: "background 0.2s ease, box-shadow 0.2s ease, backdrop-filter 0.2s ease",
        }}
        animate={{
          width: cursorArrow ? 72 : cursorClose ? 48 : isProject ? 0 : hovered ? 48 : 36,
          height: cursorArrow ? 72 : cursorClose ? 48 : isProject ? 0 : hovered ? 48 : 36,
          opacity: isProject && !cursorArrow && !cursorClose ? 0 : 1,
          scale: cursorHidden ? 1.6 : pressed ? 0.65 : 1,
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          scale: { duration: cursorHidden ? 0.45 : 0.2, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.2 },
        }}
      >
        {cursorClose && (
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        )}
        {cursorArrow === "left" && !cursorClose && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        )}
        {cursorArrow === "right" && !cursorClose && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </motion.div>

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
