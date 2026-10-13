"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

const CELL = 22;
const COLS = 28;
const ROWS = 14;
const CANVAS_WIDTH = COLS * CELL;
const CANVAS_HEIGHT = ROWS * CELL;

const BASE_TICK_MS = 140;
const MIN_TICK_MS = 70;
const SPEEDUP_PER_FOOD = 4;

// Fixed 4-color handheld-console palette — intentionally not theme-adaptive.
const CHARCOAL = "#1E2124";
const CREAM = "#F2E9D8";
const MINT = "#6FD9A8";
const CORAL = "#FF6F59";

type Point = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";
type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string };

const DIRS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};
const EYE_OFFSET: Record<Direction, { ex: number; ey: number }> = {
  right: { ex: 0.62, ey: 0.32 },
  left: { ex: 0.14, ey: 0.32 },
  up: { ex: 0.32, ey: 0.14 },
  down: { ex: 0.32, ey: 0.62 },
};

// Original blocky pixel-art shapes — not modeled on any existing game's sprites.
const BODY_BITMAP = ["011110", "111111", "111111", "111111", "111111", "011110"];
const FOOD_BITMAP = ["00100", "01110", "11111", "01110", "00100"];

function drawPixelArt(
  ctx: CanvasRenderingContext2D,
  bitmap: string[],
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  const rows = bitmap.length;
  const cols = bitmap[0].length;
  const cellW = w / cols;
  const cellH = h / rows;
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (bitmap[r][c] === "1") {
        ctx.fillRect(Math.round(x + c * cellW), Math.round(y + r * cellH), Math.ceil(cellW), Math.ceil(cellH));
      }
    }
  }
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(3, "0");
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const snakeRef = useRef<Point[]>([]);
  const foodRef = useRef<Point>({ x: 0, y: 0 });
  const dirRef = useRef<Direction>("right");
  const pendingDirRef = useRef<Direction>("right");
  const tickIntervalRef = useRef(BASE_TICK_MS);
  const scoreRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Point[]>([]);

  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);

  const triggerShake = useCallback(() => {
    animate(shakeX, [0, -4, 4, -3, 3, -1, 1, 0], { duration: 0.35, ease: "easeInOut" });
    animate(shakeY, [0, 3, -3, 2, -2, 1, -1, 0], { duration: 0.35, ease: "easeInOut" });
  }, [shakeX, shakeY]);

  // Synthesized arcade blips via Web Audio — no sampled/licensed audio involved.
  const audioCtxRef = useRef<AudioContext | null>(null);
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctx();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "square", startFreq?: number) => {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(startFreq ?? freq, ctx.currentTime);
        if (startFreq) {
          osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + duration);
        }
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio unsupported/blocked — fail silently, sound is non-essential.
      }
    },
    [getAudioCtx]
  );

  const playStart = useCallback(() => playTone(440, 0.1, "square"), [playTone]);
  const playEat = useCallback(() => playTone(880, 0.08, "square"), [playTone]);
  const playGameOver = useCallback(() => playTone(90, 0.4, "sawtooth", 300), [playTone]);

  const spawnParticles = useCallback((cx: number, cy: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 1.4;
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        color,
      });
    }
  }, []);

  const spawnFood = useCallback((snake: Point[]) => {
    const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
    const free: Point[] = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (!occupied.has(`${x},${y}`)) free.push({ x, y });
      }
    }
    return free[Math.floor(Math.random() * free.length)];
  }, []);

  const resetGame = useCallback(() => {
    // Spawn away from board center so the snake doesn't overlap the centered idle prompt text.
    const sx = Math.floor(COLS * 0.25);
    const sy = Math.floor(ROWS * 0.75);
    const snake = [
      { x: sx, y: sy },
      { x: sx - 1, y: sy },
      { x: sx - 2, y: sy },
    ];
    snakeRef.current = snake;
    dirRef.current = "right";
    pendingDirRef.current = "right";
    tickIntervalRef.current = BASE_TICK_MS;
    scoreRef.current = 0;
    particlesRef.current = [];
    foodRef.current = spawnFood(snake);
    setScore(0);
    setGameOver(false);
  }, [spawnFood]);

  const start = useCallback(() => {
    resetGame();
    setIsPlaying(true);
    playStart();
  }, [resetGame, playStart]);

  const turn = useCallback(
    (dir: Direction) => {
      if (gameOver || !isPlaying) {
        // A single press after dying (or from idle) resets and immediately starts a new run.
        start();
        return;
      }
      if (OPPOSITE[dirRef.current] === dir) return;
      pendingDirRef.current = dir;
    },
    [isPlaying, gameOver, start, resetGame]
  );

  useEffect(() => {
    if (starsRef.current.length === 0) {
      const stars: Point[] = [];
      for (let i = 0; i < 18; i++) {
        stars.push({ x: Math.random() * CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT });
      }
      starsRef.current = stars;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
        W: "up",
        S: "down",
        A: "left",
        D: "right",
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        turn(dir);
        return;
      }
      if (e.code === "Space" || e.code === "Enter") {
        if (gameOver || !isPlaying) {
          e.preventDefault();
          start();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn, start, isPlaying, gameOver, resetGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.imageSmoothingEnabled = false;

    const drawBackground = () => {
      ctx.fillStyle = CHARCOAL;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = CREAM;
      ctx.globalAlpha = 0.18;
      starsRef.current.forEach((s) => {
        ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, 1);
      });
      ctx.globalAlpha = 1;
    };

    const drawParticles = () => {
      particlesRef.current.forEach((p) => {
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), 2, 2);
      });
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      drawBackground();

      const food = foodRef.current;
      drawPixelArt(ctx, FOOD_BITMAP, food.x * CELL, food.y * CELL, CELL, CELL, CORAL);

      snakeRef.current.forEach((seg, i) => {
        ctx.globalAlpha = i === 0 ? 1 : Math.max(0.5, 1 - i * 0.06);
        drawPixelArt(ctx, BODY_BITMAP, seg.x * CELL, seg.y * CELL, CELL, CELL, MINT);
        ctx.globalAlpha = 1;
      });

      // Eye on the head for a recognizable, direction-aware silhouette
      const head = snakeRef.current[0];
      if (head) {
        const { ex, ey } = EYE_OFFSET[dirRef.current];
        ctx.fillStyle = CHARCOAL;
        ctx.fillRect(
          Math.round(head.x * CELL + ex * CELL),
          Math.round(head.y * CELL + ey * CELL),
          Math.ceil(CELL * 0.18),
          Math.ceil(CELL * 0.18)
        );
      }

      drawParticles();
    };

    if (!isPlaying) {
      if (snakeRef.current.length === 0) resetGame();
      draw();
      return;
    }

    let raf: number;
    let last = performance.now();
    const loop = (now: number) => {
      // Advance + fade particles every frame regardless of tick timing
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      if (now - last >= tickIntervalRef.current) {
        last = now;
        dirRef.current = pendingDirRef.current;
        const head = snakeRef.current[0];
        const d = DIRS[dirRef.current];
        const newHead = { x: head.x + d.x, y: head.y + d.y };

        const hitWall = newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS;
        const willGrow = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;
        const bodyToCheck = willGrow ? snakeRef.current : snakeRef.current.slice(0, -1);
        const hitSelf = bodyToCheck.some((s) => s.x === newHead.x && s.y === newHead.y);

        if (hitWall || hitSelf) {
          const cx = Math.min(Math.max(newHead.x, 0), COLS - 1) * CELL + CELL / 2;
          const cy = Math.min(Math.max(newHead.y, 0), ROWS - 1) * CELL + CELL / 2;
          spawnParticles(cx, cy, CORAL, 14);
          triggerShake();
          playGameOver();
          setGameOver(true);
          setIsPlaying(false);
          setHighScore((h) => Math.max(h, scoreRef.current));
          draw();
          return;
        }

        const nextSnake = [newHead, ...snakeRef.current];
        if (willGrow) {
          scoreRef.current += 1;
          tickIntervalRef.current = Math.max(MIN_TICK_MS, BASE_TICK_MS - scoreRef.current * SPEEDUP_PER_FOOD);
          spawnParticles(newHead.x * CELL + CELL / 2, newHead.y * CELL + CELL / 2, MINT, 7);
          playEat();
          foodRef.current = spawnFood(nextSnake);
          setScore(scoreRef.current);
        } else {
          nextSnake.pop();
        }
        snakeRef.current = nextSnake;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, resetGame, spawnFood, spawnParticles, triggerShake, playEat, playGameOver]);

  const pixelFont = { fontFamily: "var(--font-pixel)" };

  return (
    <div className="relative w-full">
      {/* Corner HUD */}
      <div
        className="absolute top-1.5 left-1.5 z-10 text-[7px] leading-none pointer-events-none select-none"
        style={{ ...pixelFont, color: CREAM }}
      >
        SCORE{" "}
        <motion.span key={score} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ duration: 0.25, ease: "easeOut" }} className="inline-block">
          {pad(score)}
        </motion.span>
      </div>
      <div
        className="absolute top-1.5 right-1.5 z-10 text-[7px] leading-none pointer-events-none select-none"
        style={{ ...pixelFont, color: CREAM }}
      >
        BEST {pad(highScore)}
      </div>

      {/* Idle prompt */}
      {!isPlaying && !gameOver && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none text-center px-4"
          style={{ ...pixelFont, color: CREAM, fontSize: "7px", lineHeight: 1.8 }}
        >
          ARROWS / WASD
          <br />
          OR TAP TO START
        </div>
      )}

      <motion.div style={{ x: shakeX, y: shakeY }} className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={() => {
            if (!isPlaying) start();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="block w-full h-auto cursor-pointer"
          style={{ border: "1px solid rgba(242,233,216,0.35)", imageRendering: "pixelated" }}
        />

        {/* Scanlines — subtle finishing touch */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 2px)",
          }}
        />

        {/* Game over overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
              style={{ background: "rgba(30,33,36,0.88)" }}
              onClick={start}
              onMouseDown={(e) => e.preventDefault()}
            >
              <p style={{ ...pixelFont, color: CORAL, fontSize: "13px" }}>GAME OVER</p>
              <p style={{ ...pixelFont, color: CREAM, fontSize: "8px" }}>SCORE {pad(score)}</p>
              <motion.p
                animate={{ opacity: [1, 0.15, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...pixelFont, color: CREAM, fontSize: "7px" }}
              >
                PRESS TO RETRY
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
