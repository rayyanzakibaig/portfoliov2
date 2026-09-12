"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setProgress(0);
    setVisible(true);

    timers.current.push(setTimeout(() => setProgress(72), 80));
    timers.current.push(setTimeout(() => setProgress(100), 500));
    timers.current.push(setTimeout(() => setVisible(false), 800));

    return () => timers.current.forEach(clearTimeout);
  }, [pathname]);

  return (
    <div
      className="fixed top-0 left-0 z-[9998] h-[2px] bg-accent"
      style={{
        width: `${progress}%`,
        opacity: visible ? 1 : 0,
        transition: progress === 0
          ? "none"
          : progress === 100
          ? "width 0.25s ease, opacity 0.3s ease 0.2s"
          : "width 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease",
      }}
    />
  );
}
