"use client";

import { useEffect, useRef } from "react";

interface Star {
  bx: number;
  by: number;
  r: number;
  alpha: number;
  depth: number;
  // drift
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  drift: number; // amplitude in px
}

interface StarFieldProps {
  targetOffsetRef: React.RefObject<{ x: number; y: number }>;
}

export default function StarField({ targetOffsetRef }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 80;
    let stars: Star[] = [];
    let W = 0;
    let H = 0;
    let rafId: number;
    let currentX = 0;
    let currentY = 0;

    function seed() {
      stars = Array.from({ length: COUNT }, () => ({
        bx: Math.random(),
        by: Math.random(),
        r: 0.3 + Math.random() * 1.0,
        alpha: 0.08 + Math.random() * 0.30,
        depth: 0.01 + Math.random() * 0.11,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speedX: 0.00008 + Math.random() * 0.00012, // radians per ms (~50–80s period)
        speedY: 0.00008 + Math.random() * 0.00012,
        drift: 20 + Math.random() * 30, // px amplitude
      }));
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
    }

    function getStarColor() {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? "255,255,255" : "40,40,40";
    }

    function draw(ts: number) {
      ctx!.clearRect(0, 0, W, H);
      const color = getStarColor();

      // Lerp current offset toward target
      const target = targetOffsetRef.current ?? { x: 0, y: 0 };
      currentX += (target.x - currentX) * 0.07;
      currentY += (target.y - currentY) * 0.07;

      for (const s of stars) {
        const driftX = Math.sin(ts * s.speedX + s.phaseX) * s.drift;
        const driftY = Math.cos(ts * s.speedY + s.phaseY) * s.drift;
        const x = s.bx * W + currentX * s.depth + driftX;
        const y = s.by * H + currentY * s.depth + driftY;
        ctx!.beginPath();
        ctx!.arc(x, y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color},${s.alpha})`;
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    resize();
    seed();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [targetOffsetRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
