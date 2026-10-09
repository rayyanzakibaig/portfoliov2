"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 130;
const GROUND_Y = 130;
const DINO_SIZE = 24;
const DINO_X = 40;
const GRAVITY = 0.6;
const JUMP_VELOCITY = -10;
const BASE_SPEED = 4;

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
  { bitmap: SPIKE, aspect: 5 / 10, heightRange: [24, 32] as [number, number] },
  { bitmap: ROCK, aspect: 8 / 5, heightRange: [14, 18] as [number, number] },
  { bitmap: CRATE, aspect: 7 / 7, heightRange: [18, 24] as [number, number] },
  { bitmap: BUSH, aspect: 9 / 5, heightRange: [14, 18] as [number, number] },
];

type Obstacle = { x: number; width: number; height: number; bitmap: string[] };

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
        ctx.fillRect(x + c * cellW, y + r * cellH, cellW + 0.5, cellH + 0.5);
      }
    }
  }
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

  const resetGame = useCallback(() => {
    dinoY.current = GROUND_Y;
    dinoVY.current = 0;
    isJumping.current = false;
    obstacles.current = [];
    speedRef.current = BASE_SPEED;
    scoreRef.current = 0;
    spawnTimer.current = 60;
    setScore(0);
    setGameOver(false);
  }, []);

  const jump = useCallback(() => {
    if (gameOver) {
      resetGame();
      setIsPlaying(true);
      return;
    }
    if (!isPlaying) {
      resetGame();
      setIsPlaying(true);
      return;
    }
    if (!isJumping.current) {
      dinoVY.current = JUMP_VELOCITY;
      isJumping.current = true;
    }
  }, [isPlaying, gameOver, resetGame]);

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

    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue("--fg").trim() || "#111111";

    const drawIdle = () => {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      drawPixelArt(ctx, RUN_FRAME_A, DINO_X, GROUND_Y - DINO_SIZE, DINO_SIZE, DINO_SIZE, fg);
    };

    if (!isPlaying) {
      drawIdle();
      return;
    }

    let raf: number;
    const loop = () => {
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

      obstacles.current.forEach((o) => { o.x -= speedRef.current; });
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
          setGameOver(true);
          setIsPlaying(false);
          setHighScore((h) => Math.max(h, Math.floor(scoreRef.current)));
          return;
        }
      }

      scoreRef.current += 0.15;
      speedRef.current = BASE_SPEED + scoreRef.current * 0.01;
      setScore(Math.floor(scoreRef.current));

      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      const dinoFrame = isJumping.current
        ? JUMP_FRAME
        : runFrameRef.current === 0
        ? RUN_FRAME_A
        : RUN_FRAME_B;
      drawPixelArt(ctx, dinoFrame, dinoRect.x, dinoRect.y, dinoRect.width, dinoRect.height, fg);

      obstacles.current.forEach((o) => {
        drawPixelArt(ctx, o.bitmap, o.x, GROUND_Y - o.height, o.width, o.height, fg);
      });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  const status = gameOver
    ? `Game over — score ${score}. Tap to retry.`
    : isPlaying
    ? `Score: ${score}`
    : "Press space or tap to play";

  return (
    <div className="relative w-full">
      <p className="absolute top-0 left-0 text-xs text-fg-muted pointer-events-none">
        {status}
        {highScore > 0 ? `  ·  Best: ${highScore}` : ""}
      </p>
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        onClick={jump}
        className="block w-full h-auto cursor-pointer"
      />
    </div>
  );
}
