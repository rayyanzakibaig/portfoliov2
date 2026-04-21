import type { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
}

/**
 * GradientBackground
 *
 * A section wrapper with a dark base, animated blue/purple light orbs,
 * and a faint horizontal sheen. All motion is pure CSS — no JS animation.
 *
 * Usage:
 *   <GradientBackground className="min-h-screen">
 *     <HeroContent />
 *   </GradientBackground>
 */
export default function GradientBackground({
  children,
  className = "",
}: GradientBackgroundProps) {
  return (
    <div className={`relative overflow-hidden bg-[#08080f] ${className}`}>
      {/* ── Base linear gradient layer ──────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, #0d0d1a 0%, #08080f 50%, #0a0a12 100%)",
        }}
        aria-hidden
      />

      {/* ── Blue orb — left, drifts slowly ─────────────────────── */}
      <div
        className="gb-blue absolute pointer-events-none"
        style={{
          top: "10%",
          left: "-10%",
          width: "60%",
          height: "70%",
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* ── Purple orb — right, drifts on a different cycle ────── */}
      <div
        className="gb-purple absolute pointer-events-none"
        style={{
          top: "5%",
          right: "-10%",
          width: "60%",
          height: "75%",
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* ── Horizontal sheen ────────────────────────────────────── */}
      <div
        className="gb-sheen absolute inset-y-0 w-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
