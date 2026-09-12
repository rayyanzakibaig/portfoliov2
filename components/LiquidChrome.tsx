"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import gsap from "gsap";

// ─── WebGL2 Shaders ───────────────────────────────────────────────────────────

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Liquid-chrome via:
//   1. Domain-warped height field (organic flow)
//   2. Finite-difference normals → Phong shading
//   3. abs(sin(h × π × freq)) chrome banding — sharp, metallic
//   4. Concentric mouse ripples from GSAP-smoothed cursor (u_mouse / u_strength)
//   5. S-curve contrast boost so shadows go near-black, highlights near-white
const FRAG = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_res;
uniform vec2  u_mouse;     // GSAP-smoothed, 0..1
uniform float u_strength;  // GSAP-tweened hover strength, 0..1
uniform float u_dark;
uniform float u_opacity;   // GSAP intro fade

out vec4 fragColor;

// ── Noise ─────────────────────────────────────────────────────────────────────
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f*f*(3.0-2.0*f);
  return mix(
    mix(dot(hash2(i),             f),             dot(hash2(i+vec2(1,0)), f-vec2(1,0)), u.x),
    mix(dot(hash2(i+vec2(0,1)), f-vec2(0,1)), dot(hash2(i+vec2(1,1)), f-vec2(1,1)), u.x),
    u.y);
}
float fbm(vec2 p) {
  float v=0.0, a=0.5;
  for(int i=0;i<4;i++){v+=a*vnoise(p); p=p*2.0+vec2(3.7,1.9); a*=0.5;}
  return v;
}

// ── Height field (organic drift + domain warp) ────────────────────────────────
float baseHeight(vec2 p, float t) {
  p += t * vec2(0.055, 0.022);
  vec2 q = vec2(fbm(p + t*0.28), fbm(p + vec2(4.1,1.5) + t*0.22));
  return fbm(p + 2.3*q);
}

// ── Mouse ripple contribution ─────────────────────────────────────────────────
float mouseRipple(vec2 p, vec2 m, float t, float str) {
  float d = length(p - m);
  // Multiple ring frequencies for richer caustic-like interference
  float rings = sin(d*13.0 - t*7.0)*0.6 + sin(d*7.0 - t*4.5)*0.4;
  return str * exp(-d * 2.8) * rings * 0.28;
}

float totalHeight(vec2 p, vec2 m, float t, float str) {
  return baseHeight(p, t) + mouseRipple(p, m, t, str);
}

// ── S-curve contrast ──────────────────────────────────────────────────────────
float contrast(float x, float k) {
  // Pulls darks darker, lights lighter — essential for chrome look
  x = clamp(x, 0.0, 1.0);
  return x < 0.5
    ? 0.5 * pow(2.0*x, k)
    : 1.0 - 0.5 * pow(2.0*(1.0-x), k);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float ar = u_res.x / u_res.y;

  vec2 p = uv * vec2(ar, 1.0) * 1.35;
  vec2 m = u_mouse * vec2(ar, 1.0) * 1.35;
  float t = u_time * 0.10;

  // ── Normals via finite differences ──────────────────────────────────────────
  float eps = 0.0035;
  float h0 = totalHeight(p,              m, t, u_strength);
  float hx = totalHeight(p+vec2(eps,0.), m, t, u_strength);
  float hy = totalHeight(p+vec2(0.,eps), m, t, u_strength);

  // z controls how dramatic the curvature appears; lower = sharper reflections
  vec3 N = normalize(vec3((h0-hx)/eps, (h0-hy)/eps, 0.85));

  // ── Multi-light Phong ────────────────────────────────────────────────────────
  vec3 V  = vec3(0.0, 0.0, 1.0);
  vec3 L1 = normalize(vec3( 0.55,  0.85, 1.0));  // key — top-right
  vec3 L2 = normalize(vec3(-0.80, -0.30, 0.7));  // fill — bottom-left
  vec3 L3 = normalize(vec3( 0.10, -0.85, 0.55)); // rim — bottom

  float d1 = max(0.0, dot(N, L1));
  float d2 = max(0.0, dot(N, L2));
  float d3 = max(0.0, dot(N, L3));

  // Tight specular for sharp chrome highlights
  float s1 = pow(max(0.0, dot(reflect(-L1,N), V)), 80.0);
  float s2 = pow(max(0.0, dot(reflect(-L2,N), V)), 28.0);

  // ── Chrome banding ───────────────────────────────────────────────────────────
  // abs(sin()) creates the alternating bright/dark bands of real curved chrome
  float band = pow(abs(sin(h0 * 5.5 * 3.14159 + t*0.18)), 0.35);

  float lum = 0.10*d1 + 0.06*d2 + 0.03*d3   // diffuse
            + band * 0.42                      // chrome bands
            + s1 * 1.5 + s2 * 0.45;           // specular

  // S-curve — the key to photographic chrome contrast
  lum = contrast(lum, 1.9);

  // ── Palette ──────────────────────────────────────────────────────────────────
  vec3 col;
  if (u_dark > 0.5) {
    // Dark: deep navy → gunmetal → mirror-white
    vec3 lo  = vec3(0.02, 0.03, 0.07);
    vec3 mid = vec3(0.20, 0.25, 0.40);
    vec3 hi  = vec3(0.82, 0.90, 1.00);
    col  = mix(lo,  mid, smoothstep(0.0, 0.45, lum));
    col  = mix(col, hi,  smoothstep(0.45, 1.0, lum));
    // Cool iridescent tint in mid-tones
    float ird = sin(h0*10.0 + t*1.1) * 0.5 + 0.5;
    col += mix(vec3(0.28,0.05,0.60), vec3(0.00,0.30,0.65), ird)
           * 0.16 * smoothstep(0.25, 0.70, lum);
  } else {
    // Light: warm shadow → silver → white
    vec3 lo  = vec3(0.48, 0.46, 0.46);
    vec3 mid = vec3(0.78, 0.78, 0.80);
    vec3 hi  = vec3(1.00, 1.00, 1.00);
    col  = mix(lo,  mid, smoothstep(0.0, 0.45, lum));
    col  = mix(col, hi,  smoothstep(0.45, 1.0, lum));
    float ird = sin(h0*10.0 + t*1.1) * 0.5 + 0.5;
    col += mix(vec3(0.60,0.58,0.80), vec3(0.80,0.62,0.70), ird)
           * 0.08 * smoothstep(0.35, 0.80, lum);
  }

  // ── Mouse proximity glow ─────────────────────────────────────────────────────
  float md = length(p - m);
  float glow = u_strength * 0.22 * exp(-md * 5.5);
  col = mix(col, vec3(0.95, 0.97, 1.00), glow);

  // ── Vignette + alpha ─────────────────────────────────────────────────────────
  vec2 cv = uv - 0.5;
  float vig = 1.0 - smoothstep(0.18, 0.72, length(cv * vec2(0.9, 1.25)));
  float alpha = vig * (u_dark > 0.5 ? 0.75 : 0.52) * u_opacity;

  fragColor = vec4(col, alpha);
}
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function LiquidChrome() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef  = useRef(theme);

  // Values GSAP writes to — read each frame in the render loop
  const state = useRef({ mouseX: 0.5, mouseY: 0.5, strength: 0, opacity: 0 });

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // ── Compile & link ─────────────────────────────────────────────────────────
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.warn("Shader error:", gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime     = gl.getUniformLocation(prog, "u_time");
    const uRes      = gl.getUniformLocation(prog, "u_res");
    const uMouse    = gl.getUniformLocation(prog, "u_mouse");
    const uStrength = gl.getUniformLocation(prog, "u_strength");
    const uDark     = gl.getUniformLocation(prog, "u_dark");
    const uOpacity  = gl.getUniformLocation(prog, "u_opacity");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // ── Resize ─────────────────────────────────────────────────────────────────
    const dpr = Math.min(devicePixelRatio, 1.5);
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── GSAP mouse tracking — quickTo for zero-allocation per-frame lerp ───────
    const s = state.current;
    const xTo = gsap.quickTo(s, "mouseX", { duration: 0.75, ease: "power3.out" });
    const yTo = gsap.quickTo(s, "mouseY", { duration: 0.75, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX / window.innerWidth);
      yTo(e.clientY / window.innerHeight);
    };

    // Strength: ramp up fast on enter, decay slowly on leave
    // Use parent (the hero section) because the canvas itself has pointer-events:none
    const hero = canvas.parentElement;
    const onEnter = () => gsap.to(s, { strength: 1, duration: 0.5, ease: "power2.out" });
    const onLeave = () => gsap.to(s, { strength: 0, duration: 2.0, ease: "power3.out" });

    window.addEventListener("mousemove", onMove, { passive: true });
    hero?.addEventListener("mouseenter", onEnter);
    hero?.addEventListener("mouseleave", onLeave);

    // ── Intro fade-in ──────────────────────────────────────────────────────────
    gsap.to(s, { opacity: 1, duration: 2.0, ease: "power2.out", delay: 0.3 });

    // ── Render loop ────────────────────────────────────────────────────────────
    let raf: number;
    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime,     t);
      gl.uniform2f(uRes,      canvas.width, canvas.height);
      gl.uniform2f(uMouse,    s.mouseX, 1 - s.mouseY);
      gl.uniform1f(uStrength, s.strength);
      gl.uniform1f(uDark,     themeRef.current === "dark" ? 1 : 0);
      gl.uniform1f(uOpacity,  s.opacity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      hero?.removeEventListener("mouseenter", onEnter);
      hero?.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(s);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
