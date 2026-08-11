"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Coordinates the three-card entrance: one IntersectionObserver on the
// group itself (not per-card) toggles a single "revealed" class, and the
// three cards' individual start positions/stagger are defined purely in
// CSS (see .card-left/.card-center/.card-right in globals.css). That
// keeps all three moves triggered at exactly the same instant — no risk
// of them drifting out of sync the way three independent observers could.
export default function ScrollPopGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      // Fires once roughly a third of the group is already on screen,
      // not the instant it peeks over the bottom edge — so there's room
      // to actually watch the cards travel in, not just see them appear.
      { threshold: 0.32 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${revealed ? "card-group-revealed" : ""}`}>
      {children}
    </div>
  );
}
