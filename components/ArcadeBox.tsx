"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SnakeGame from "./SnakeGame";
import PongGame from "./PongGame";
import DinoGame from "./DinoGame";
import { lenisRef } from "@/lib/lenis";

type GameKey = "snake" | "pong" | "dino";

const GAMES: { key: GameKey; label: string; accent: string; hint: string }[] = [
  { key: "snake", label: "SNAKE", accent: "#6FD9A8", hint: "ARROWS / WASD TO MOVE" },
  { key: "pong", label: "PONG", accent: "#FFFFFF", hint: "↑ / ↓, W/S, OR MOUSE" },
  { key: "dino", label: "DINO", accent: "#D9794F", hint: "SPACE / ↑ TO JUMP" },
];

export default function ArcadeBox() {
  const [active, setActive] = useState<GameKey>("snake");
  const current = GAMES.find((g) => g.key === active)!;

  const selectGame = (key: GameKey) => {
    const lenis = lenisRef.current;
    const savedScroll = lenis ? lenis.scroll : window.scrollY;
    setActive(key);
    // Guard against any focus-driven or layout-driven scroll jump across the re-render.
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(savedScroll, { immediate: true });
      else window.scrollTo({ top: savedScroll });
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-6 mb-4">
        {GAMES.map(({ key, label, accent }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => selectGame(key)}
              onMouseDown={(e) => e.preventDefault()}
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "9px",
                color: isActive ? accent : "rgba(130,130,130,0.8)",
              }}
              className="relative pb-2 transition-colors duration-150"
            >
              {label}
              {isActive && (
                <motion.div
                  layoutId="game-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: accent }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {active === "snake" && <SnakeGame />}
      {active === "pong" && <PongGame />}
      {active === "dino" && <DinoGame />}

      <p
        className="text-center mt-3 text-[9px] tracking-wide"
        style={{ fontFamily: "var(--font-pixel)", color: "rgba(130,130,130,0.8)" }}
      >
        {current.hint}
      </p>
    </div>
  );
}
