// Touch devices don't reliably sustain :hover during a read, so pausing on
// touch needs an explicit class; the marquee animation itself is pure CSS.
function initTestimonialCarousels() {
  const tracks = document.querySelectorAll<HTMLElement>("[data-marquee-track]");
  tracks.forEach((track) => {
    track.addEventListener("touchstart", () => track.classList.add("marquee-paused"), { passive: true });
    const resume = () => track.classList.remove("marquee-paused");
    track.addEventListener("touchend", resume, { passive: true });
    track.addEventListener("touchcancel", resume, { passive: true });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTestimonialCarousels);
} else {
  initTestimonialCarousels();
}
