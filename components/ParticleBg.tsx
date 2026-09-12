"use client";
import { useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CELL = 17;
const BOOT_DURATION = 1.4;
const LEAN = ['/', '\\', '>', '<'];

// ─── Glyph sets ───────────────────────────────────────────────────────────────
const GLYPH_SETS = {
  binary:   { label: "Binary  —  · 0 1 : # @",      ramp: [' ', '·', '0', '1', ':', '#', '@'] },
  blocks:   { label: "Blocks  —  ░ ▒ ▓ █",          ramp: [' ', '░', '▒', '▓', '█'] },
  hex:      { label: "Hex  —  · 0 A F E #",          ramp: [' ', '·', '0', 'A', 'F', 'E', '#'] },
  terminal: { label: "Terminal  —  . : ; ! | #",     ramp: [' ', '.', ':', ';', '!', '|', '#'] },
} as const;

type GlyphKey = keyof typeof GLYPH_SETS;

// ─── Color helpers ────────────────────────────────────────────────────────────
type RGB = [number, number, number];

function parseCssColor(str: string): RGB {
  str = str.trim();
  if (str.startsWith('#')) {
    let h = str.slice(1);
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = str.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) return [+m[1], +m[2], +m[3]];
  return [128, 128, 128];
}

function mixRgb(a: RGB, b: RGB, t: number): string {
  t = Math.max(0, Math.min(1, t));
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

function dimRgb(c: RGB, factor: number): RGB {
  return [Math.round(c[0] * factor), Math.round(c[1] * factor), Math.round(c[2] * factor)];
}

// ─── Field math ───────────────────────────────────────────────────────────────
function sineNoise(nx: number, ny: number, t: number, scale: number, mx: number, my: number) {
  const wx = nx * 3.0 * scale + mx;
  const wy = ny * 3.0 * scale + my;
  const n1 = Math.sin(wx * 2.1 + t * 0.9 + wy * 1.3);
  const n2 = Math.sin(wy * 1.7 - t * 0.7 + wx * 0.9);
  const n3 = Math.sin((wx + wy) * 1.15 + t * 0.55);
  return { val: (n1 + n2 + n3) / 3, angle: Math.atan2(n2, n1) };
}

function wingBands(nx: number, ny: number, spread: number): number {
  const px = nx - 0.5, py = ny - 0.5;
  const angles = [32 * Math.PI / 180, -32 * Math.PI / 180];
  let best = 0;
  for (const a of angles) {
    const perp = Math.abs(px * Math.sin(a) - py * Math.cos(a));
    const w = Math.exp(-(perp * perp) / (2 * spread * spread));
    if (w > best) best = w;
  }
  return best;
}

function rampAt(ramp: readonly string[], d: number, angle: number) {
  const idx = Math.floor(d * ramp.length);
  if (idx <= 0) return null;
  const i = Math.min(idx, ramp.length - 1);
  // Mid-density: lean glyph based on noise gradient direction
  if (i > 1 && i < ramp.length - 1) {
    const bucket = (Math.round(((angle + Math.PI) / (2 * Math.PI)) * LEAN.length) % LEAN.length + LEAN.length) % LEAN.length;
    return { ch: LEAN[bucket], i };
  }
  return { ch: ramp[i], i };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Slider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-mono tracking-[0.15em] text-white/40">{label}</span>
        <span className="text-[11px] font-mono text-white/70">{value.toFixed(2)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="particle-slider w-full h-[2px] appearance-none rounded-full cursor-pointer outline-none"
        style={{ background: `linear-gradient(to right,#E05C3A ${pct}%,rgba(255,255,255,0.1) ${pct}%)` }}
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className="flex items-center gap-2.5 group">
      <span
        className="relative flex-shrink-0 w-9 h-5 rounded-full transition-colors duration-200"
        style={{ background: value ? '#E05C3A' : 'rgba(255,255,255,0.15)' }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: value ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </span>
      <span className="text-[10px] font-mono tracking-[0.15em] text-white/40 group-hover:text-white/60 transition-colors">{label}</span>
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI state
  const [open,           setOpen]           = useState(false);
  const [density,        setDensity]        = useState(0.22);
  const [driftSpeed,     setDriftSpeed]     = useState(0.32);
  const [noiseScale,     setNoiseScale]     = useState(2.40);
  const [wingSpread,     setWingSpread]     = useState(0.60);
  const [glyphSetKey,    setGlyphSetKey]    = useState<GlyphKey>('binary');
  const [accentBloom,    setAccentBloom]    = useState(0.00);
  const [reactToPointer, setReactToPointer] = useState(false);
  const [pauseDrift,     setPauseDrift]     = useState(false);

  // Live refs (zero-lag reads inside rAF)
  const densityRef        = useRef(0.22);
  const driftSpeedRef     = useRef(0.32);
  const noiseScaleRef     = useRef(2.40);
  const wingSpreadRef     = useRef(0.60);
  const accentBloomRef    = useRef(0.00);
  const reactToPointerRef = useRef(false);
  const pauseRef          = useRef(false);
  const glyphRampRef      = useRef<readonly string[]>(GLYPH_SETS.binary.ramp);
  const mouseRef          = useRef({ x: 0, y: 0 });

  // Sync state → refs
  useEffect(() => { densityRef.current        = density;        }, [density]);
  useEffect(() => { driftSpeedRef.current      = driftSpeed;     }, [driftSpeed]);
  useEffect(() => { noiseScaleRef.current      = noiseScale;     }, [noiseScale]);
  useEffect(() => { wingSpreadRef.current      = wingSpread;     }, [wingSpread]);
  useEffect(() => { accentBloomRef.current     = accentBloom;    }, [accentBloom]);
  useEffect(() => { reactToPointerRef.current  = reactToPointer; }, [reactToPointer]);
  useEffect(() => { pauseRef.current           = pauseDrift;     }, [pauseDrift]);
  useEffect(() => { glyphRampRef.current       = GLYPH_SETS[glyphSetKey].ramp; }, [glyphSetKey]);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = 1;
    let cols = 0, rows = 0;
    let fieldT = 0;
    let bootProgress = 0;

    // Colors from CSS vars
    let rgbFaint: RGB = [80, 74, 68];
    let rgbDim: RGB   = [130, 120, 110];
    let rgbAccent: RGB = [107, 92, 231];

    function readColors() {
      const style = getComputedStyle(document.documentElement);
      const fgMuted = style.getPropertyValue('--fg-muted').trim() || '#888';
      const accent  = style.getPropertyValue('--accent').trim()   || '#6B5CE7';
      const dim = parseCssColor(fgMuted);
      rgbFaint  = dimRgb(dim, 0.4);
      rgbDim    = dim;
      rgbAccent = parseCssColor(accent);
    }
    readColors();

    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width  = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width  = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
    }
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking — relative to canvas
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width)  * 2 - 1,
        y: ((e.clientY - rect.top)  / rect.height) * 2 - 1,
      };
    }
    function onMouseLeave() { mouseRef.current = { x: 0, y: 0 }; }
    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    let lastFill = '';
    function drawFrame() {
      lastFill = '';
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = `${CELL - 2}px ui-monospace,'SF Mono',Consolas,monospace`;
      ctx!.textBaseline = 'top';

      const ramp   = glyphRampRef.current;
      const spread = wingSpreadRef.current;
      const scale  = noiseScaleRef.current;
      const bloom  = accentBloomRef.current;
      const gain   = densityRef.current * bootProgress * 1.6;
      const react  = reactToPointerRef.current;
      const mx     = react ? mouseRef.current.x * 0.35 : 0;
      const my     = react ? mouseRef.current.y * 0.35 : 0;

      for (let r = 0; r < rows; r++) {
        const ny = (r + 0.5) / rows;
        for (let c = 0; c < cols; c++) {
          const nx = (c + 0.5) / cols;
          const mask = wingBands(nx, ny, spread);
          if (mask < 0.02) continue;

          const noise = sineNoise(nx, ny, fieldT, scale, mx, my);
          const d     = mask * ((noise.val + 1) / 2) * gain;
          const picked = rampAt(ramp, d, noise.angle);
          if (!picked) continue;

          const norm = picked.i / (ramp.length - 1);
          let col: string;
          if (norm > 1 - bloom) {
            col = mixRgb(rgbDim, rgbAccent, (norm - (1 - bloom)) / Math.max(bloom, 0.001));
          } else {
            col = mixRgb(rgbFaint, rgbDim, norm);
          }

          if (col !== lastFill) { ctx!.fillStyle = col; lastFill = col; }
          ctx!.fillText(picked.ch, c * CELL, r * CELL);
        }
      }
    }

    let last: number | null = null;
    let raf = 0;
    const FRAME_MS = 1000 / 30;

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.05);
      if (last !== null && now - last < FRAME_MS) return;
      last = now;

      bootProgress = Math.min(1, bootProgress + dt / BOOT_DURATION);
      if (!pauseRef.current) fieldT += dt * driftSpeedRef.current;

      drawFrame();
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      themeObserver.disconnect();
    };
  }, []);

  // Helpers: update both state + ref immediately so rAF sees change on same frame
  const set = {
    density:        (v: number)  => { setDensity(v);        densityRef.current        = v; },
    driftSpeed:     (v: number)  => { setDriftSpeed(v);     driftSpeedRef.current     = v; },
    noiseScale:     (v: number)  => { setNoiseScale(v);     noiseScaleRef.current     = v; },
    wingSpread:     (v: number)  => { setWingSpread(v);     wingSpreadRef.current     = v; },
    accentBloom:    (v: number)  => { setAccentBloom(v);    accentBloomRef.current    = v; },
    reactToPointer: (v: boolean) => { setReactToPointer(v); reactToPointerRef.current = v; },
    pauseDrift:     (v: boolean) => { setPauseDrift(v);     pauseRef.current          = v; },
    glyphSetKey:    (v: GlyphKey) => { setGlyphSetKey(v);   glyphRampRef.current      = GLYPH_SETS[v].ramp; },
  };

  return (
    <>
      <style>{`
        .particle-slider::-webkit-slider-thumb{
          -webkit-appearance:none;width:13px;height:13px;border-radius:50%;
          background:#E05C3A;cursor:pointer;margin-top:-5.5px;
        }
        .particle-slider::-moz-range-thumb{
          width:13px;height:13px;border-radius:50%;
          background:#E05C3A;cursor:pointer;border:none;
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="absolute bottom-6 right-6 z-20 text-[9px] font-mono tracking-[0.2em] text-white/30 hover:text-white/60 border border-white/[0.08] hover:border-white/20 rounded px-2.5 py-1 transition-colors bg-black/10 backdrop-blur-sm pointer-events-auto"
      >
        {open ? 'CLOSE' : 'TUNE'}
      </button>

      {/* Settings panel */}
      {open && (
        <div className="absolute bottom-16 right-6 z-20 w-[600px] max-w-[calc(100vw-3rem)] rounded-xl border border-white/[0.07] bg-[#0e0e0e]/92 backdrop-blur-2xl p-6 shadow-2xl pointer-events-auto">
          <p className="text-[9px] font-mono tracking-[0.25em] text-[#E05C3A] mb-1 uppercase">Live Parameters</p>
          <h3 className="text-white text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Tune the field
          </h3>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <Slider label="DENSITY"      value={density}    min={0.1} max={1}   step={0.01} onChange={set.density} />
            <Slider label="DRIFT SPEED"  value={driftSpeed} min={0}   max={1.2} step={0.01} onChange={set.driftSpeed} />
            <Slider label="NOISE SCALE"  value={noiseScale} min={0.4} max={2.4} step={0.01} onChange={set.noiseScale} />
            <Slider label="WING SPREAD"  value={wingSpread} min={0.1} max={0.6} step={0.01} onChange={set.wingSpread} />

            <div>
              <span className="block text-[10px] font-mono tracking-[0.15em] text-white/40 mb-1.5">GLYPH SET</span>
              <div className="relative">
                <select
                  value={glyphSetKey}
                  onChange={(e) => set.glyphSetKey(e.target.value as GlyphKey)}
                  className="w-full appearance-none bg-white/[0.05] border border-white/[0.08] rounded px-3 py-2 pr-7 text-sm font-mono text-white/70 cursor-pointer focus:outline-none"
                >
                  {(Object.keys(GLYPH_SETS) as GlyphKey[]).map((k) => (
                    <option key={k} value={k} className="bg-[#111]">{GLYPH_SETS[k].label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 text-xs">⌄</span>
              </div>
            </div>

            <Slider label="ACCENT BLOOM" value={accentBloom} min={0} max={0.4} step={0.01} onChange={set.accentBloom} />

            <div className="col-span-2 pt-1 border-t border-white/[0.06]">
              <span className="block text-[10px] font-mono tracking-[0.15em] text-white/30 mb-3 mt-2">CURSOR</span>
              <div className="flex gap-10">
                <Toggle label="REACT TO POINTER" value={reactToPointer} onChange={set.reactToPointer} />
                <Toggle label="PAUSE DRIFT"       value={pauseDrift}     onChange={set.pauseDrift} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
