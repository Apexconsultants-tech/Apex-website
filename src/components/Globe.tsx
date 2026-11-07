"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { flagSize } from "@/lib/flags";

// Small flag chips that orbit the globe in screen space, back to one single
// ring like the original design. nz is dropped in favor of cn — Australia
// and New Zealand's flags both read as "navy blue with a Union Jack canton"
// at this size and looked like a duplicate.
type OrbitFlagConfig = { code: string; radius: number; duration: number; delay: number };

const FLAG_CODES = ["gb", "us", "ca", "au", "de", "cn", "fr", "ie"];
const FLAG_RADIUS = 1.5;
const FLAG_DURATION = 60;
// One shared height for every flag — each is still drawn at its own real
// aspect ratio (via flagSize) so nothing looks stretched or sliced.
const FLAG_HEIGHT = 14;
const ORBIT_FLAGS: OrbitFlagConfig[] = FLAG_CODES.map((code, i) => ({
  code,
  radius: FLAG_RADIUS,
  duration: FLAG_DURATION,
  delay: -(i * (FLAG_DURATION / FLAG_CODES.length)),
}));

function OrbitFlag({ code, radius, duration, delay }: OrbitFlagConfig) {
  const timing = { animationDuration: `${duration}s`, animationDelay: `${delay}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" } as const;
  const { width } = flagSize(code, FLAG_HEIGHT);
  return (
    <div className="pointer-events-none absolute" style={{ inset: `${-radius}%`, animationName: "orbit-spin-reverse", ...timing }}>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div style={{ animationName: "orbit-spin", ...timing }}>
          <Image
            src={`/images/flags/${code}.svg`}
            alt=""
            width={width}
            height={FLAG_HEIGHT}
            className="block rounded-[2px] border border-white/95 shadow-[0_2px_6px_rgba(20,24,26,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}

// Small plane glyph used on the flight-path curve. Sized in the SVG's own
// 0-100 viewBox units, centered on its own origin so rotation looks right.
function PlaneMark() {
  return (
    <path
      d="M-2.6,0 L1.6,0 L3.2,-1 L3.2,-0.35 L0.9,0.55 L0.9,1.9 L2,2.6 L2,3.1 L0,2.6 L-2,3.1 L-2,2.6 L-0.9,1.9 L-0.9,0.55 L-3.2,-0.35 L-3.2,-1 Z"
      fill="var(--color-brand-deep)"
    />
  );
}

export const TEXTURE_SRC = "/images/brand/earth-satellite.webp";
// Starting rotation: Pakistan, the Gulf and Europe facing the viewer.
const START_ROT = 0.83;
// Gentle auto-spin (rev/sec). Negative = the visible surface drifts to the
// left, which reads more naturally next to the left-aligned hero copy.
const AUTO_REV_PER_SEC = -1 / 35;

// Start downloading + decoding the texture as soon as this module is
// evaluated (i.e. in parallel with hydration) instead of waiting for the
// component's effect to run. The hero also preloads the same URL in <head>,
// so this is usually a cache hit.
let texturePromise: Promise<HTMLImageElement> | null = null;
function loadTexture() {
  if (!texturePromise) {
    texturePromise = new Promise((resolve, reject) => {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        (img.decode ? img.decode() : Promise.resolve()).then(() => resolve(img), () => resolve(img));
      };
      img.onerror = () => {
        texturePromise = null;
        reject(new Error("texture failed"));
      };
      img.src = TEXTURE_SRC;
    });
  }
  return texturePromise;
}
if (typeof window !== "undefined") loadTexture();

/**
 * A flat but correctly-colored stand-in for the globe, shown until WebGL has
 * the texture: the same satellite image framed on the same longitudes the
 * sphere starts on, with sphere shading on top. Swapping it for the real
 * sphere is a subtle crossfade instead of a blue disc turning into a map.
 */
export function GlobePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden rounded-full bg-[#0c2240] ${className}`}
      style={{
        backgroundImage: `url(${TEXTURE_SRC})`,
        backgroundSize: "200% 125%",
        backgroundPosition: "84% 30%",
      }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.22),transparent_50%),radial-gradient(circle,transparent_52%,rgba(6,10,18,0.55)_88%,rgba(147,197,253,0.45)_100%)]" />
    </div>
  );
}
// A fling sets a new steady spin speed (rev/sec), capped so a hard flick
// can't turn it into a blur. Below MIN_FLING it counts as a still release.
const MAX_SPIN = 1;
const MIN_FLING = 0.004;
// How far the north pole is tipped toward the viewer (radians).
const VIEW_TILT = 0.38;

const VERT = `
attribute vec2 a;
varying vec2 v;
void main() { v = a; gl_Position = vec4(a, 0.0, 1.0); }
`;

// Orthographic sphere: each pixel of the disc is turned into a point on the
// sphere, tilted, converted to latitude/longitude and used to sample the
// equirectangular Earth texture. Lighting, a soft specular highlight and an
// atmospheric rim are computed per pixel, so the globe genuinely rotates
// (land slows and foreshortens toward the edges) instead of a flat map
// sliding behind a circular mask.
//
// With derivatives available the texture is mipmapped (no shimmer as detail
// near the limb rotates past). Longitude wraps from +PI to -PI at the back of
// the sphere; picking whichever of two equivalent u values has the smaller
// screen-space derivative stops that wrap from selecting a tiny mip level
// and drawing a visible seam line (Tarini's method).
const makeFrag = (deriv: boolean) => `${deriv ? "#extension GL_OES_standard_derivatives : enable\n" : ""}
precision highp float;
varying vec2 v;
uniform sampler2D tex;
uniform float rot;
uniform float aa;
const float PI = 3.14159265359;
void main() {
  float r = length(v);
  float edge = 1.0 - smoothstep(1.0 - aa, 1.0, r);
  if (edge <= 0.0) { gl_FragColor = vec4(0.0); return; }
  float z = sqrt(max(0.0, 1.0 - r * r));
  vec3 n = vec3(v.x, v.y, z);
  float ct = cos(${VIEW_TILT.toFixed(3)});
  float st = sin(${VIEW_TILT.toFixed(3)});
  vec3 q = vec3(n.x, n.y * ct + n.z * st, -n.y * st + n.z * ct);
  float lat = asin(clamp(q.y, -1.0, 1.0));
  float lon = atan(q.x, q.z);
  float u = lon / (2.0 * PI);
  ${deriv ? `float u1 = fract(u);
  float u2 = fract(u + 0.5) - 0.5;
  u = fwidth(u1) <= fwidth(u2) + 1e-5 ? u1 : u2;` : ""}
  vec2 uv = vec2(u + 0.5 - rot, 0.5 - lat / PI);
  vec3 col = texture2D(tex, uv).rgb;
  vec3 L = normalize(vec3(-0.5, 0.42, 0.76));
  float diff = max(dot(n, L), 0.0);
  col *= 0.42 + 0.78 * diff;
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 28.0);
  col += vec3(spec * 0.14);
  float rim = pow(1.0 - z, 2.4);
  col = mix(col, vec3(0.58, 0.8, 1.0), rim * 0.6);
  gl_FragColor = vec4(col * edge, edge);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function Globe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) {
      setFailed(true);
      return;
    }
    const deriv = Boolean(gl.getExtension("OES_standard_derivatives"));
    const aniso = gl.getExtension("EXT_texture_filter_anisotropic");
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, makeFrag(deriv));
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);
    const rotLoc = gl.getUniformLocation(prog, "rot");
    const aaLoc = gl.getUniformLocation(prog, "aa");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rot = START_ROT;
    const defaultSpin = reducedMotion ? 0 : AUTO_REV_PER_SEC;
    // Current steady spin (rev/sec). A fling replaces it with the speed and
    // direction the user threw the globe at, and it keeps that speed
    // (clicking elsewhere on the page doesn't change it) until the next drag.
    let spin = defaultSpin;
    let dragging = false;
    let lastX = 0;
    let lastMoveT = 0;
    let dragVel = 0;
    let moved = false;
    let lastFrame = 0;
    let raf = 0;
    let visible = false;
    let textureReady = false;
    let disposed = false;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = Math.max(1, Math.round(wrap!.clientWidth * dpr));
      if (canvas!.width !== size) {
        canvas!.width = size;
        canvas!.height = size;
        gl!.viewport(0, 0, size, size);
      }
      gl!.uniform1f(aaLoc, 3 / size);
    }

    function draw() {
      gl!.uniform1f(rotLoc, rot);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    function frame(now: number) {
      const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
      lastFrame = now;
      if (!dragging) rot += spin * dt;
      rot -= Math.floor(rot);
      draw();
      // Keep looping only while there's motion to show.
      if (visible && (dragging || spin !== 0)) raf = requestAnimationFrame(frame);
      else raf = 0;
    }

    function kick() {
      if (!raf && textureReady && visible && !disposed) {
        lastFrame = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    loadTexture().then((img) => {
      if (disposed) return;
      // Resample to a power-of-two size so the texture can wrap (REPEAT)
      // horizontally in WebGL 1 — the seam where longitude wraps is then
      // invisible.
      const tc = document.createElement("canvas");
      tc.width = 2048;
      tc.height = 1024;
      const ctx = tc.getContext("2d");
      if (!ctx) {
        setFailed(true);
        return;
      }
      ctx.drawImage(img, 0, 0, tc.width, tc.height);
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, tc);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      if (deriv) {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        if (aniso) {
          const max = gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT) as number;
          gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, max));
        }
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      textureReady = true;
      resize();
      draw();
      setReady(true);
      kick();
    }, () => setFailed(true));

    const ro = new ResizeObserver(() => {
      resize();
      if (textureReady) draw();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(wrap);

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastMoveT = performance.now();
      dragVel = 0;
      moved = false;
      wrap!.style.cursor = "grabbing";
      kick();
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      // Dragging the globe's centre by dx pixels moves the surface under the
      // pointer by dx: an arc of dx / radius radians.
      const radius = wrap!.clientWidth / 2;
      const dRot = dx / radius / (2 * Math.PI);
      rot += dRot;
      if (dx !== 0) moved = true;
      const dt = Math.max((now - lastMoveT) / 1000, 0.001);
      // Smoothed so one jittery mouse event at release doesn't decide the spin.
      dragVel = dragVel * 0.5 + (dRot / dt) * 0.5;
      lastX = e.clientX;
      lastMoveT = now;
    }
    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      // Released mid-motion: keep spinning at the thrown speed/direction.
      // Still click, or a pause before letting go: back to the gentle spin.
      const sinceMove = performance.now() - lastMoveT;
      const thrown = moved && sinceMove <= 80 ? Math.max(-MAX_SPIN, Math.min(MAX_SPIN, dragVel)) : 0;
      spin = Math.abs(thrown) >= MIN_FLING ? thrown : defaultSpin;
      wrap!.style.cursor = "grab";
      kick();
    }

    wrap.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    // A touch the browser takes over (e.g. to scroll the page) sends
    // pointercancel instead of pointerup.
    window.addEventListener("pointercancel", onPointerUp);

    function onContextLost(e: Event) {
      e.preventDefault();
      setFailed(true);
    }
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("webglcontextlost", onContextLost);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      {/* ambient halo behind everything */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(56,142,220,0.22),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_65%_70%,rgba(21,128,61,0.13),transparent_55%)] blur-2xl" />

      {/* decorative orbit rings — both turn the same way as the Earth, at
          related speeds, so the motion reads as one calm system */}
      <div className="pointer-events-none absolute -inset-[7%] animate-orbit-reverse rounded-full border border-dashed border-brand/25" style={{ animationDuration: "60s" }} />
      <div className="pointer-events-none absolute -inset-[15%] animate-orbit-reverse rounded-full border border-dashed border-brand/15" style={{ animationDuration: "120s" }} />

      {/* flight path — static dashed curve, only the plane moves */}
      <svg className="pointer-events-none absolute -inset-[6%] overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
        <path
          d="M8,72 Q50,-6 92,30"
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.22"
          strokeWidth="0.5"
          strokeDasharray="1.2 2.6"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute -inset-[6%]" aria-hidden="true">
        <div className="absolute h-4 w-4 animate-flight-plane">
          <svg width="16" height="16" viewBox="-4 -4 8 8" className="h-4 w-4 opacity-70">
            <PlaneMark />
          </svg>
        </div>
      </div>

      {/* thin atmosphere glow just outside the globe's edge */}
      <div className="pointer-events-none absolute -inset-[2.5%] rounded-full bg-[radial-gradient(circle,transparent_92%,rgba(147,197,253,0.55)_97%,transparent_100%)]" />

      {/* the globe itself */}
      <div
        ref={wrapRef}
        className="absolute inset-0 cursor-grab touch-pan-y select-none rounded-full"
        role="img"
        aria-label="Rotating satellite globe highlighting Apex's study destinations, including the UK, USA, Canada, Australia, and Ireland"
      >
        {/* textured stand-in while WebGL gets the texture ready */}
        <GlobePlaceholder className={`transition-opacity duration-500 ${ready || failed ? "opacity-0" : "opacity-100"}`} />
        {failed ? (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <Image src={TEXTURE_SRC} alt="" fill sizes="620px" className="object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.35),transparent_52%),radial-gradient(circle,transparent_55%,rgba(6,10,18,0.6)_100%)]" />
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>

      {/* little flags roaming around the globe */}
      {ORBIT_FLAGS.map((f) => (
        <OrbitFlag key={f.code} {...f} />
      ))}
    </div>
  );
}
