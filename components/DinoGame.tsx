"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

const GAME_WIDTH = 616;
const GAME_HEIGHT = 308;
const GROUND_Y = 288;
const DINO_SIZE = 32;
const DINO_X = 48;
const GRAVITY = 0.6;
const JUMP_VELOCITY = -11;
const BASE_SPEED = 4;

// Warm desert-dusk palette — distinct from Snake and Pong on purpose.
const CHARCOAL = "#2A1F1A";
const CREAM = "#F0DFC0";
const MINT = "#D9794F";
const CORAL = "#E8B14D";

// Original blocky critter — not modeled on any existing game character.
const RUN_FRAME_A = [
  "00111000",
  "01111100",
  "11111110",
  "11111110",
  "11111110",
  "01111100",
  "01100100",
  "00100110",
];
const RUN_FRAME_B = [
  "00111000",
  "01111100",
  "11111110",
  "11111110",
  "11111110",
  "01111100",
  "00100110",
  "01100100",
];
const JUMP_FRAME = [
  "00111000",
  "01111100",
  "11111110",
  "11111110",
  "11111110",
  "11111110",
  "01111100",
  "00111000",
];

const SPIKE = ["00100", "00100", "01110", "01110", "11111", "11111", "11111", "11111"];
const ROCK = ["01100110", "11111111", "11111111", "11111111"];
const CRATE = ["1111111", "1000001", "1011101", "1010101", "1011101", "1000001", "1111111"];
const BUSH = ["011101110", "111111111", "111111111", "011111110", "001111100"];

const OBSTACLE_TYPES = [
  { bitmap: SPIKE, aspect: 5 / 10, heightRange: [26, 36] as [number, number] },
  { bitmap: ROCK, aspect: 8 / 5, heightRange: [16, 20] as [number, number] },
  { bitmap: CRATE, aspect: 7 / 7, heightRange: [20, 28] as [number, number] },
  { bitmap: BUSH, aspect: 9 / 5, heightRange: [16, 20] as [number, number] },
];

type Obstacle = { x: number; width: number; height: number; bitmap: string[] };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string };

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

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const dinoY = useRef(GROUND_Y);
  const dinoVY = useRef(0);
  const isJumping = useRef(false);
  const obstacles = useRef<Obstacle[]>([]);
  const speedRef = useRef(BASE_SPEED);
  const scoreRef = useRef(0);
  const spawnTimer = useRef(60);
  const runFrameRef = useRef(0);
  const runTickRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<{ x: number; y: number }[]>([]);

  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);

  const triggerShake = useCallback(() => {
    animate(shakeX, [0, -4, 4, -3, 3, -1, 1, 0], { duration: 0.35, ease: "easeInOut" });
    animate(shakeY, [0, 3, -3, 2, -2, 1, -1, 0], { duration: 0.35, ease: "easeInOut" });
  }, [shakeX, shakeY]);

  const spawnParticles = useCallback((cx: number, cy: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 1.6;
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
        if (startFreq) osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + duration);
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

  const playJump = useCallback(() => playTone(500, 0.07, "square"), [playTone]);
  const playStart = useCallback(() => playTone(440, 0.1, "square"), [playTone]);
  const playGameOver = useCallback(() => playTone(90, 0.4, "sawtooth", 300), [playTone]);

  const resetGame = useCallback(() => {
    dinoY.current = GROUND_Y;
    dinoVY.current = 0;
    isJumping.current = false;
    obstacles.current = [];
    speedRef.current = BASE_SPEED;
    scoreRef.current = 0;
    spawnTimer.current = 60;
    particlesRef.current = [];
    setScore(0);
    setGameOver(false);
  }, []);

  const start = useCallback(() => {
    resetGame();
    setIsPlaying(true);
    playStart();
  }, [resetGame, playStart]);

  const jump = useCallback(() => {
    if (gameOver) {
      // First press after dying resets and returns to the title screen.
      resetGame();
      return;
    }
    if (!isPlaying) {
      start();
      return;
    }
    if (!isJumping.current) {
      dinoVY.current = JUMP_VELOCITY;
      isJumping.current = true;
      playJump();
    }
  }, [isPlaying, gameOver, start, resetGame, playJump]);

  useEffect(() => {
    if (starsRef.current.length === 0) {
      const stars: { x: number; y: number }[] = [];
      for (let i = 0; i < 18; i++) {
        stars.push({ x: Math.random() * GAME_WIDTH, y: Math.random() * (GROUND_Y - 20) });
      }
      starsRef.current = stars;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.imageSmoothingEnabled = false;

    const drawBackground = () => {
      ctx.fillStyle = CHARCOAL;
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = CREAM;
      ctx.globalAlpha = 0.18;
      starsRef.current.forEach((s) => ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, 1));
      ctx.globalAlpha = 1;
      ctx.strokeStyle = CREAM;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + 2);
      ctx.lineTo(GAME_WIDTH, GROUND_Y + 2);
      ctx.stroke();
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
      const dinoFrame = isJumping.current ? JUMP_FRAME : runFrameRef.current === 0 ? RUN_FRAME_A : RUN_FRAME_B;
      drawPixelArt(ctx, dinoFrame, DINO_X, dinoY.current - DINO_SIZE, DINO_SIZE, DINO_SIZE, MINT);
      obstacles.current.forEach((o) => {
        drawPixelArt(ctx, o.bitmap, o.x, GROUND_Y - o.height, o.width, o.height, CORAL);
      });
      drawParticles();
    };

    if (!isPlaying) {
      draw();
      return;
    }

    let raf: number;
    const loop = () => {
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      dinoVY.current += GRAVITY;
      dinoY.current += dinoVY.current;
      if (dinoY.current >= GROUND_Y) {
        dinoY.current = GROUND_Y;
        dinoVY.current = 0;
        isJumping.current = false;
      }

      runTickRef.current += 1;
      if (runTickRef.current >= 6) {
        runTickRef.current = 0;
        runFrameRef.current = runFrameRef.current === 0 ? 1 : 0;
      }

      spawnTimer.current -= 1;
      if (spawnTimer.current <= 0) {
        const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
        const [minH, maxH] = type.heightRange;
        const height = minH + Math.random() * (maxH - minH);
        obstacles.current.push({
          x: GAME_WIDTH,
          width: height * type.aspect,
          height,
          bitmap: type.bitmap,
        });
        spawnTimer.current = 60 + Math.random() * 60;
      }

      obstacles.current.forEach((o) => {
        o.x -= speedRef.current;
      });
      obstacles.current = obstacles.current.filter((o) => o.x + o.width > 0);

      const dinoRect = { x: DINO_X, y: dinoY.current - DINO_SIZE, width: DINO_SIZE, height: DINO_SIZE };
      for (const o of obstacles.current) {
        const oRect = { x: o.x, y: GROUND_Y - o.height, width: o.width, height: o.height };
        const hit =
          dinoRect.x < oRect.x + oRect.width &&
          dinoRect.x + dinoRect.width > oRect.x &&
          dinoRect.y < oRect.y + oRect.height &&
          dinoRect.y + dinoRect.height > oRect.y;
        if (hit) {
          spawnParticles(dinoRect.x + DINO_SIZE / 2, dinoRect.y + DINO_SIZE / 2, CORAL, 14);
          triggerShake();
          playGameOver();
          setGameOver(true);
          setIsPlaying(false);
          setHighScore((h) => Math.max(h, Math.floor(scoreRef.current)));
          draw();
          return;
        }
      }

      scoreRef.current += 0.15;
      speedRef.current = BASE_SPEED + scoreRef.current * 0.01;
      setScore(Math.floor(scoreRef.current));

      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, spawnParticles, triggerShake, playGameOver]);

  const pixelFont = { fontFamily: "var(--font-pixel)" };

  return (
    <div className="relative w-full">
      <div className="absolute top-1.5 left-1.5 z-10 text-[7px] leading-none pointer-events-none select-none" style={{ ...pixelFont, color: CREAM }}>
        SCORE{" "}
        <motion.span key={score} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ duration: 0.25, ease: "easeOut" }} className="inline-block">
          {pad(score)}
        </motion.span>
      </div>
      <div className="absolute top-1.5 right-1.5 z-10 text-[7px] leading-none pointer-events-none select-none" style={{ ...pixelFont, color: CREAM }}>
        BEST {pad(highScore)}
      </div>

      {!isPlaying && !gameOver && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none text-center px-4"
          style={{ ...pixelFont, color: CREAM, fontSize: "7px", lineHeight: 1.8 }}
        >
          SPACE / UP ARROW
          <br />
          OR TAP TO JUMP
        </div>
      )}

      <motion.div style={{ x: shakeX, y: shakeY }} className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          onClick={jump}
          onMouseDown={(e) => e.preventDefault()}
          className="block w-full h-auto cursor-pointer"
          style={{ border: "1px solid rgba(240,223,192,0.35)", imageRendering: "pixelated" }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 2px)",
          }}
        />

        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
              style={{ background: "rgba(30,33,36,0.88)" }}
              onClick={resetGame}
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
