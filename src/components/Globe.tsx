"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import createGlobe from "cobe";

// Small flag chips that orbit the globe in screen space (cobe renders to a
// flat WebGL canvas, so there's no real "surface" to pin a DOM flag to —
// this fakes it with the same trick as the decorative rings: a rotating
// wrapper for position, and a counter-rotating inner wrapper so the flag
// itself stays upright instead of spinning with its orbit).
type OrbitFlagConfig = { code: string; radius: number; duration: number; delay: number; reverse?: boolean };

// One radius, one duration, one direction, evenly spaced — a single
// symmetric ring of flags moving together, not scattered independent orbits.
// nz dropped in favor of cn — Australia and New Zealand's flags both read as
// "navy blue with a Union Jack canton" at 20px and looked like a duplicate.
const FLAG_CODES = ["gb", "us", "ca", "au", "de", "cn", "fr", "ie"];
const FLAG_RADIUS = 1.5;
const FLAG_DURATION = 40;
const ORBIT_FLAGS: OrbitFlagConfig[] = FLAG_CODES.map((code, i) => ({
  code,
  radius: FLAG_RADIUS,
  duration: FLAG_DURATION,
  delay: -(i * (FLAG_DURATION / FLAG_CODES.length)),
}));

function OrbitFlag({ code, radius, duration, delay, reverse }: OrbitFlagConfig) {
  const outerName = reverse ? "orbit-spin-reverse" : "orbit-spin";
  const innerName = reverse ? "orbit-spin" : "orbit-spin-reverse";
  const timing = { animationDuration: `${duration}s`, animationDelay: `${delay}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" } as const;
  return (
    <div className="pointer-events-none absolute" style={{ inset: `${-radius}%`, animationName: outerName, ...timing }}>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div style={{ animationName: innerName, ...timing }}>
          <Image
            src={`/images/flags/${code}.svg`}
            alt=""
            width={20}
            height={14}
            className="h-3.5 w-5 rounded-[2px] border border-white shadow-[0_2px_6px_rgba(20,24,26,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}

const AUTO_SPEED = 0.0032;
const FRICTION = 0.94; // velocity decay per frame once released
const MOMENTUM_FLOOR = 0.0008; // below this, hand control back to the steady auto-rotate

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = wrap.clientWidth;
    let phi = 0.4;
    let pointerDown = false;
    let pointerX = 0;
    let dragPhi = 0;
    let velocity = 0; // instantaneous drag velocity, used to seed momentum on release
    let momentum = 0; // decaying post-release spin speed
    let raf = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.3,
      dark: 0,
      diffuse: 1.8,
      mapSamples: 0,
      mapBrightness: 8.5,
      baseColor: [0.83, 0.92, 0.86],
      markerColor: [21 / 255, 128 / 255, 61 / 255],
      glowColor: [0.55, 0.82, 0.65],
      opacity: 0.97,
      markers: [],
    });

    function frame() {
      if (pointerDown) {
        phi += dragPhi;
        dragPhi = 0;
      } else if (!reducedMotion) {
        if (Math.abs(momentum) > MOMENTUM_FLOOR) {
          // a flick glides to a stop under friction before auto-rotate resumes
          phi += momentum;
          momentum *= FRICTION;
        } else {
          phi += AUTO_SPEED;
        }
      }
      globe.update({ phi, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function handleResize() {
      if (wrap) width = wrap.clientWidth;
    }
    window.addEventListener("resize", handleResize);

    let lastMoveTime = 0;
    function onPointerDown(e: PointerEvent) {
      pointerDown = true;
      pointerX = e.clientX;
      lastMoveTime = performance.now();
      velocity = 0;
      canvas!.style.cursor = "grabbing";
    }
    function onPointerUp() {
      pointerDown = false;
      momentum = velocity;
      canvas!.style.cursor = "grab";
    }
    function onPointerMove(e: PointerEvent) {
      if (!pointerDown) return;
      const now = performance.now();
      const dt = Math.max(now - lastMoveTime, 1);
      const delta = (e.clientX - pointerX) * 0.005;
      dragPhi = delta;
      velocity = (delta / dt) * 16; // normalize to a ~60fps-per-frame velocity
      pointerX = e.clientX;
      lastMoveTime = now;
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      {/* ambient halo behind everything */}
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(21,128,61,0.22),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_65%_70%,rgba(37,99,235,0.14),transparent_55%)] blur-2xl" />

      {/* decorative orbit rings — plain lines, no riding markers */}
      <div className="pointer-events-none absolute -inset-[7%] animate-orbit rounded-full border border-dashed border-brand/25" />
      <div className="pointer-events-none absolute -inset-[15%] animate-orbit-reverse rounded-full border border-dashed border-brand/15" />

      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.55),transparent_60%)]" />
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-none animate-[globe-in_0.8s_ease-out]"
        style={{ contain: "layout paint size" }}
        role="img"
        aria-label="Rotating globe with flags orbiting for Apex's study destinations, including the UK, USA, Canada, Australia, Germany, China, France, and Ireland"
      />

      {/* little flags roaming around the globe */}
      {ORBIT_FLAGS.map((f) => (
        <OrbitFlag key={f.code} {...f} />
      ))}
    </div>
  );
}
