// Counts a stat value up from 0 the first time it scrolls into view. The
// static HTML already shows the real target value (see StatStrip.astro), so
// no-JS/pre-script readers and crawlers never see "0" — this only replaces
// the real value with an animated count-up once it's visibly running.
function initStatStrip() {
  const nodes = document.querySelectorAll<HTMLElement>("[data-stat-value]");
  if (nodes.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        const raw = el.dataset.statValue ?? "";
        const match = raw.match(/^(\d+)(.*)$/);
        if (!match) continue;
        const target = parseInt(match[1], 10);
        const suffix = match[2];
        if (reduced) {
          el.textContent = `${target}${suffix}`;
          continue;
        }
        const duration = 1200;
        const start = performance.now();
        const frame = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(eased * target)}${suffix}`;
          if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      }
    },
    { threshold: 0.4 }
  );
  nodes.forEach((el) => io.observe(el));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStatStrip);
} else {
  initStatStrip();
}
