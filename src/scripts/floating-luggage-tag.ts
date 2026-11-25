const DISMISS_KEY = "apex-luggage-tag-dismissed";
const SHOW_AFTER_MS = 900;

function initFloatingLuggageTag() {
  const el = document.querySelector<HTMLElement>("[data-luggage-tag]");
  if (!el) return;

  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    // sessionStorage unavailable (private mode, etc.) — just always show it.
  }
  if (dismissed) return;

  const closeBtn = el.querySelector<HTMLButtonElement>("[data-luggage-tag-close]");
  closeBtn?.addEventListener("click", () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    el.remove();
  });

  setTimeout(() => el.classList.remove("hidden"), SHOW_AFTER_MS);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFloatingLuggageTag);
} else {
  initFloatingLuggageTag();
}
