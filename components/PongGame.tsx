"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

const CANVAS_WIDTH = 616;
const CANVAS_HEIGHT = 308;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 64;
const PADDLE_MARGIN = 18;
const BALL_SIZE = 10;
const PLAYER_SPEED = 6;
const CPU_SPEED = 4.4;
const BASE_BALL_SPEED = 4.2;
const MAX_BALL_SPEED = 9;
const WIN_SCORE = 7;

// Minimal black-and-white arcade-cabinet palette — distinct from Snake's palette on purpose.
const CHARCOAL = "#0A0A0A";
const CREAM = "#FFFFFF";
const MINT = "#FFFFFF";
const CORAL = "#9A9A9A";

type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string };

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<"player" | "cpu" | null>(null);

  const playerYRef = useRef(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const cpuYRef = useRef(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const ballRef = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, vx: BASE_BALL_SPEED, vy: BASE_BALL_SPEED * 0.6 });
  const playerScoreRef = useRef(0);
  const cpuScoreRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<{ x: number; y: number }[]>([]);
  const heldRef = useRef<{ up: boolean; down: boolean }>({ up: false, down: false });

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

  const playHit = useCallback(() => playTone(520, 0.06, "square"), [playTone]);
  const playWall = useCallback(() => playTone(300, 0.05, "square"), [playTone]);
  const playScore = useCallback(() => playTone(760, 0.18, "square"), [playTone]);
  const playStart = useCallback(() => playTone(440, 0.1, "square"), [playTone]);
  const playGameOver = useCallback(() => playTone(90, 0.4, "sawtooth", 300), [playTone]);

  const resetBall = useCallback((direction: number) => {
    ballRef.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      vx: BASE_BALL_SPEED * direction,
      vy: BASE_BALL_SPEED * (Math.random() > 0.5 ? 0.6 : -0.6),
    };
  }, []);

  const resetGame = useCallback(() => {
    playerYRef.current = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    cpuYRef.current = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    playerScoreRef.current = 0;
    cpuScoreRef.current = 0;
    particlesRef.current = [];
    resetBall(Math.random() > 0.5 ? 1 : -1);
    setPlayerScore(0);
    setCpuScore(0);
    setGameOver(false);
    setWinner(null);
  }, [resetBall]);

  const start = useCallback(() => {
    resetGame();
    setIsPlaying(true);
    playStart();
  }, [resetGame, playStart]);

  const returnToTitle = useCallback(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (starsRef.current.length === 0) {
      const stars: { x: number; y: number }[] = [];
      for (let i = 0; i < 18; i++) {
        stars.push({ x: Math.random() * CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT });
      }
      starsRef.current = stars;
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const upKeys = ["ArrowUp", "w", "W"];
      const downKeys = ["ArrowDown", "s", "S"];
      if (upKeys.includes(e.key) || downKeys.includes(e.key)) {
        e.preventDefault();
        if (gameOver) {
          returnToTitle();
          return;
        }
        if (!isPlaying) {
          start();
          return;
        }
        if (upKeys.includes(e.key)) heldRef.current.up = true;
        if (downKeys.includes(e.key)) heldRef.current.down = true;
        return;
      }
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (gameOver) {
          returnToTitle();
          return;
        }
        if (!isPlaying) start();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (["ArrowUp", "w", "W"].includes(e.key)) heldRef.current.up = false;
      if (["ArrowDown", "s", "S"].includes(e.key)) heldRef.current.down = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isPlaying, gameOver, start, returnToTitle]);

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
      starsRef.current.forEach((s) => ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, 1));
      ctx.globalAlpha = 0.35;
      for (let y = 0; y < CANVAS_HEIGHT; y += 14) {
        ctx.fillRect(CANVAS_WIDTH / 2 - 1, y, 2, 7);
      }
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
      ctx.fillStyle = MINT;
      ctx.fillRect(PADDLE_MARGIN, Math.round(playerYRef.current), PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillStyle = CORAL;
      ctx.fillRect(CANVAS_WIDTH - PADDLE_MARGIN - PADDLE_WIDTH, Math.round(cpuYRef.current), PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillStyle = CREAM;
      ctx.fillRect(Math.round(ballRef.current.x), Math.round(ballRef.current.y), BALL_SIZE, BALL_SIZE);
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

      if (heldRef.current.up) playerYRef.current -= PLAYER_SPEED;
      if (heldRef.current.down) playerYRef.current += PLAYER_SPEED;
      playerYRef.current = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, playerYRef.current));

      const ball = ballRef.current;
      const cpuCenter = cpuYRef.current + PADDLE_HEIGHT / 2;
      const ballCenter = ball.y + BALL_SIZE / 2;
      if (cpuCenter < ballCenter - 6) cpuYRef.current += CPU_SPEED;
      else if (cpuCenter > ballCenter + 6) cpuYRef.current -= CPU_SPEED;
      cpuYRef.current = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, cpuYRef.current));

      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y <= 0 || ball.y + BALL_SIZE >= CANVAS_HEIGHT) {
        ball.vy *= -1;
        ball.y = Math.max(0, Math.min(CANVAS_HEIGHT - BALL_SIZE, ball.y));
        playWall();
      }

      const hitsPlayerPaddle =
        ball.x <= PADDLE_MARGIN + PADDLE_WIDTH &&
        ball.x >= PADDLE_MARGIN &&
        ball.y + BALL_SIZE >= playerYRef.current &&
        ball.y <= playerYRef.current + PADDLE_HEIGHT &&
        ball.vx < 0;
      const hitsCpuPaddle =
        ball.x + BALL_SIZE >= CANVAS_WIDTH - PADDLE_MARGIN - PADDLE_WIDTH &&
        ball.x + BALL_SIZE <= CANVAS_WIDTH - PADDLE_MARGIN &&
        ball.y + BALL_SIZE >= cpuYRef.current &&
        ball.y <= cpuYRef.current + PADDLE_HEIGHT &&
        ball.vx > 0;

      if (hitsPlayerPaddle || hitsCpuPaddle) {
        const paddleY = hitsPlayerPaddle ? playerYRef.current : cpuYRef.current;
        const relativeHit = (ball.y + BALL_SIZE / 2 - (paddleY + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
        const speed = Math.min(MAX_BALL_SPEED, Math.hypot(ball.vx, ball.vy) * 1.06);
        const dir = hitsPlayerPaddle ? 1 : -1;
        ball.vx = Math.cos(relativeHit * 0.6) * speed * dir;
        ball.vy = Math.sin(relativeHit * 0.6) * speed;
        playHit();
      }

      if (ball.x < -BALL_SIZE) {
        cpuScoreRef.current += 1;
        setCpuScore(cpuScoreRef.current);
        spawnParticles(0, ball.y + BALL_SIZE / 2, CORAL, 10);
        triggerShake();
        playScore();
        if (cpuScoreRef.current >= WIN_SCORE) {
          setWinner("cpu");
          setGameOver(true);
          setIsPlaying(false);
          playGameOver();
        } else {
          resetBall(1);
        }
      } else if (ball.x > CANVAS_WIDTH) {
        playerScoreRef.current += 1;
        setPlayerScore(playerScoreRef.current);
        spawnParticles(CANVAS_WIDTH, ball.y + BALL_SIZE / 2, MINT, 10);
        triggerShake();
        playScore();
        if (playerScoreRef.current >= WIN_SCORE) {
          setWinner("player");
          setGameOver(true);
          setIsPlaying(false);
          playGameOver();
        } else {
          resetBall(-1);
        }
      }

      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, spawnParticles, triggerShake, playHit, playWall, playScore, playGameOver, resetBall]);

  const pixelFont = { fontFamily: "var(--font-pixel)" };

  return (
    <div className="relative w-full">
      <div className="absolute top-1.5 left-1.5 z-10 text-[7px] leading-none pointer-events-none select-none" style={{ ...pixelFont, color: MINT }}>
        YOU{" "}
        <motion.span key={playerScore} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ duration: 0.25, ease: "easeOut" }} className="inline-block">
          {playerScore}
        </motion.span>
      </div>
      <div className="absolute top-1.5 right-1.5 z-10 text-[7px] leading-none pointer-events-none select-none" style={{ ...pixelFont, color: CORAL }}>
        CPU{" "}
        <motion.span key={cpuScore} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ duration: 0.25, ease: "easeOut" }} className="inline-block">
          {cpuScore}
        </motion.span>
      </div>

      {!isPlaying && !gameOver && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none text-center px-4"
          style={{ ...pixelFont, color: CREAM, fontSize: "7px", lineHeight: 1.8 }}
        >
          W/S, ARROWS, OR MOUSE
          <br />
          TAP TO START
        </div>
      )}

      <motion.div style={{ x: shakeX, y: shakeY }} className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={() => {
            if (!isPlaying && !gameOver) start();
          }}
          onMouseDown={(e) => e.preventDefault()}
          onMouseMove={(e) => {
            if (!isPlaying) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const scale = CANVAS_HEIGHT / rect.height;
            const y = (e.clientY - rect.top) * scale;
            playerYRef.current = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, y - PADDLE_HEIGHT / 2));
          }}
          data-cursor="hide"
          className="block w-full h-auto cursor-pointer"
          style={{ border: "1px solid rgba(255,255,255,0.3)", imageRendering: "pixelated" }}
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
              onClick={returnToTitle}
              onMouseDown={(e) => e.preventDefault()}
            >
              <p style={{ ...pixelFont, color: winner === "player" ? MINT : CORAL, fontSize: "13px" }}>
                {winner === "player" ? "YOU WIN" : "GAME OVER"}
              </p>
              <p style={{ ...pixelFont, color: CREAM, fontSize: "8px" }}>
                {playerScore} - {cpuScore}
              </p>
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
