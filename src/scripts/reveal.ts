// Drives both Reveal.astro ([data-reveal], individual fade/lift) and
// ScrollPopGroup.astro ([data-reveal-group], the three-card CTA entrance
// whose actual motion lives in globals.css's .card-left/.card-center/
// .card-right rules). Pre-script and no-JS content renders fully visible
// (see globals.css) — this script only arms the hidden-until-revealed state.
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const groups = document.querySelectorAll<HTMLElement>("[data-reveal-group]");
  if (items.length === 0 && groups.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  items.forEach((el) => el.classList.add("js-armed"));

  if (reduced) {
    items.forEach((el) => el.setAttribute("data-revealed", ""));
    groups.forEach((el) => el.classList.add("card-group-revealed"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));

  const gio = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-group-revealed");
          gio.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.32 }
  );
  groups.forEach((el) => gio.observe(el));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveal);
} else {
  initReveal();
}
