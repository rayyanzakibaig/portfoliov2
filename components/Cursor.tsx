"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setHovered(true);
      }
    };

    const onLeave = () => setHovered(false);

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

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full bg-accent"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 10 : 7,
          height: hovered ? 10 : 7,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full border border-accent"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 44 : 34,
          height: hovered ? 44 : 34,
          opacity: hovered ? 0.5 : 0.25,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
