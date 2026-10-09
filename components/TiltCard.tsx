"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  holographic?: boolean;
  maxTilt?: number;
  glare?: boolean;
  sparkle?: boolean;
};

export default function TiltCard({
  children,
  className = "",
  holographic = false,
  maxTilt = 3,
  glare = true,
  sparkle = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isHovering = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useAnimationFrame((t) => {
    if (reducedMotion || isHovering.current) return;
    x.set(Math.sin(t / 3200) * 0.25);
    y.set(Math.cos(t / 4100) * 0.25);
  });

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const glareBackground = useTransform([springX, springY], (latest) => {
    const [sx, sy] = latest as [number, number];
    const gx = (sx + 0.5) * 100;
    const gy = (sy + 0.5) * 100;
    return `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 55%)`;
  });

  const holoBackground = useTransform([springX, springY], (latest) => {
    const [sx, sy] = latest as [number, number];
    const angle = 115 + sx * 60;
    const shift = (sy + 0.5) * 40;
    return `linear-gradient(${angle}deg, rgba(255,90,160,0.16) 0%, rgba(120,140,255,0.14) ${15 + shift * 0.3}%, rgba(90,220,255,0.13) ${35 + shift * 0.5}%, rgba(255,225,90,0.13) ${55 + shift * 0.7}%, rgba(180,100,255,0.16) 100%)`;
  });

  const sparklePosition = useTransform([springX, springY], (latest) => {
    const [sx, sy] = latest as [number, number];
    return `${sx * 40}px ${sy * 40}px`;
  });

  const sparkleMask = useTransform([springX, springY], (latest) => {
    const [sx, sy] = latest as [number, number];
    const gx = (sx + 0.5) * 100;
    const gy = (sy + 0.5) * 100;
    return `radial-gradient(circle at ${gx}% ${gy}%, black 0%, transparent 40%)`;
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    isHovering.current = true;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  const showEffects = holographic && !reducedMotion;

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className={`relative ${className}`}
      >
        {children}
        {showEffects && (
          <>
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light"
              style={{ background: holoBackground }}
            />
            {glare && (
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{ background: glareBackground }}
              />
            )}
            {sparkle && (
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1.5px)",
                  backgroundSize: "8px 8px",
                  backgroundPosition: sparklePosition,
                  WebkitMaskImage: sparkleMask,
                  maskImage: sparkleMask,
                }}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
