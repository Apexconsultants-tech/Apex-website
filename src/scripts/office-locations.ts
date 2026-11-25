function initOfficeLocations() {
  const root = document.querySelector<HTMLElement>("[data-office-locations]");
  if (!root) return;
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-office-button]");
  const iframe = root.querySelector<HTMLIFrameElement>("[data-office-map]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest<HTMLElement>("[data-office-card]");
      if (!card) return;
      buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      root.querySelectorAll<HTMLElement>("[data-office-card]").forEach((c) => {
        c.classList.remove("border-brand", "bg-brand-tint");
        c.classList.add("border-line", "bg-surface");
      });
      btn.setAttribute("aria-pressed", "true");
      card.classList.remove("border-line", "bg-surface");
      card.classList.add("border-brand", "bg-brand-tint");
      if (iframe) {
        const query = card.dataset.mapQuery;
        const zoom = card.dataset.mapZoom;
        const title = card.dataset.officeName;
        iframe.src = `https://maps.google.com/maps?q=${query}&hl=en&z=${zoom}&output=embed`;
        if (title) iframe.title = `Map: ${title}`;
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initOfficeLocations);
} else {
  initOfficeLocations();
}
