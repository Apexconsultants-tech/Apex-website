"use client";

import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
};

// Subtle pointer-driven 3D tilt for showcase cards (destinations, universities).
// Disabled on touch/coarse pointers and under prefers-reduced-motion so it
// never fights a finger scrolling the page.
export default function TiltCard({ children, className = "", max = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const coarse = useRef(typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced.current || coarse.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
