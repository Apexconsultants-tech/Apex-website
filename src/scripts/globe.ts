// Ported 1:1 from the old React Globe component: same drag/momentum pan,
// same auto-speed idle drift, same prefers-reduced-motion handling. The
// circular mask + first visible frame are plain HTML/CSS (see Globe.astro),
// so the globe is already fully painted before this script even runs —
// this only adds the interactive panning on top.
const AUTO_SPEED = 0.015;
const FRICTION = 0.94;
const MOMENTUM_FLOOR = 0.004;
const MAP_ASPECT = 2600 / 1300;
const REEL_PERCENT_PER_WRAP_WIDTH = 100 / (2 * MAP_ASPECT);

function initGlobe() {
  const wrap = document.querySelector<HTMLElement>("[data-globe-wrap]");
  const reel = document.querySelector<HTMLElement>("[data-globe-reel]");
  if (!wrap || !reel) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let offset = 10;
  let pointerDown = false;
  let dragDelta = 0;
  let pointerX = 0;
  let velocity = 0;
  let momentum = 0;
  let raf = 0;
  let lastMoveTime = 0;

  function apply() {
    offset = ((offset % 50) + 50) % 50;
    reel!.style.transform = `translate3d(-${offset}%, 0, 0)`;
  }
  apply();

  function frame() {
    if (pointerDown) {
      offset += dragDelta;
      dragDelta = 0;
    } else if (!reducedMotion) {
      if (Math.abs(momentum) > MOMENTUM_FLOOR) {
        offset += momentum;
        momentum *= FRICTION;
      } else {
        offset += AUTO_SPEED;
      }
    }
    apply();
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  wrap.addEventListener("pointerdown", (e) => {
    pointerDown = true;
    pointerX = e.clientX;
    lastMoveTime = performance.now();
    velocity = 0;
    wrap.style.cursor = "grabbing";
  });
  window.addEventListener("pointerup", () => {
    pointerDown = false;
    momentum = velocity;
    wrap.style.cursor = "grab";
  });
  window.addEventListener("pointermove", (e) => {
    if (!pointerDown) return;
    const now = performance.now();
    const dt = Math.max(now - lastMoveTime, 1);
    const deltaPercent = (-(e.clientX - pointerX) / wrap.clientWidth) * REEL_PERCENT_PER_WRAP_WIDTH;
    dragDelta = deltaPercent;
    velocity = (deltaPercent / dt) * 16;
    pointerX = e.clientX;
    lastMoveTime = now;
  });

  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobe);
} else {
  initGlobe();
}
