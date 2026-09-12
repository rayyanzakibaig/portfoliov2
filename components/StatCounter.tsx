"use client";

import { animate, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function StatCounter({ value }: { value: string }) {
  // Match a leading integer and optional suffix (e.g. "40%" → ["40", "%"], "3mo" → ["3", "mo"])
  // Skip complex values like "3→5"
  const match = !value.includes("→") ? value.match(/^(\d+)(.*)$/) : null;
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -160px 0px" });
  const [text, setText] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!isInView || !match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(`${Math.round(v)}${suffix}`),
    });
    return controls.stop;
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{text}</span>;
}
