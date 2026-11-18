// Subtle pointer-driven 3D tilt for showcase cards. Disabled on touch/coarse
// pointers and under prefers-reduced-motion so it never fights a finger
// scrolling the page.
function initTiltCards() {
  const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");
  if (cards.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduced || coarse) return;

  cards.forEach((card) => {
    const max = Number(card.dataset.tiltMax ?? "6");
    card.style.transition = "transform 0.3s cubic-bezier(0.16,1,0.3,1)";
    card.style.willChange = "transform";

    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTiltCards);
} else {
  initTiltCards();
}
