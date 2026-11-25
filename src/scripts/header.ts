// Desktop dropdown open/close is pure CSS (group-hover/focus-within on the
// relative wrapper in Header.astro). This only handles the mobile menu
// toggle and its two collapsible submenu sections, which need real state.
function initHeader() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;

  const menuBtn = header.querySelector<HTMLButtonElement>("[data-mobile-menu-button]");
  const mobileNav = header.querySelector<HTMLElement>("#mobile-nav");
  const menuIcon = header.querySelector<HTMLElement>("[data-menu-icon]");
  const closeIcon = header.querySelector<HTMLElement>("[data-close-icon]");

  menuBtn?.addEventListener("click", () => {
    const open = mobileNav?.classList.toggle("hidden") === false;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuIcon?.classList.toggle("hidden", open);
    closeIcon?.classList.toggle("hidden", !open);
  });

  header.querySelectorAll<HTMLButtonElement>("[data-mobile-section-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls") ?? "");
      const open = panel?.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  header.querySelectorAll<HTMLAnchorElement>("#mobile-nav a, #mobile-nav button[data-close-on-click]").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav?.classList.add("hidden");
      menuBtn?.setAttribute("aria-expanded", "false");
      menuBtn?.setAttribute("aria-label", "Open menu");
      menuIcon?.classList.remove("hidden");
      closeIcon?.classList.add("hidden");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeader);
} else {
  initHeader();
}
