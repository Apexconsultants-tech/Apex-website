// Shared custom-dropdown behavior (not a native <select>, so group headers
// can carry their own background tint — see CourseFinder.astro's level
// select). Works on any [data-dropdown] root containing a [data-dropdown-
// trigger] button and a [data-dropdown-panel]; options are plain buttons
// with [data-dropdown-option] + a value, and the trigger's label span gets
// updated with the chosen option's text.
export function initDropdowns(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-dropdown]").forEach((dropdown) => {
    if (dropdown.dataset.dropdownInit) return;
    dropdown.dataset.dropdownInit = "1";

    const trigger = dropdown.querySelector<HTMLButtonElement>("[data-dropdown-trigger]");
    const panel = dropdown.querySelector<HTMLElement>("[data-dropdown-panel]");
    const label = dropdown.querySelector<HTMLElement>("[data-dropdown-label]");
    const hiddenInput = dropdown.querySelector<HTMLInputElement>("input[type=hidden]");
    if (!trigger || !panel) return;

    function close() {
      panel!.classList.add("hidden");
      trigger!.setAttribute("aria-expanded", "false");
    }
    function open() {
      panel!.classList.remove("hidden");
      trigger!.setAttribute("aria-expanded", "true");
    }

    trigger.addEventListener("click", () => {
      if (panel.classList.contains("hidden")) open();
      else close();
    });

    document.addEventListener("pointerdown", (e) => {
      if (!dropdown.contains(e.target as Node)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    panel.querySelectorAll<HTMLButtonElement>("[data-dropdown-option]").forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.dataset.value ?? "";
        const text = option.textContent ?? "";
        if (hiddenInput) {
          hiddenInput.value = value;
          hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if (label) {
          label.textContent = text;
          label.classList.remove("text-ink-faint");
        }
        panel.querySelectorAll("[data-dropdown-option]").forEach((o) => o.setAttribute("aria-selected", "false"));
        option.setAttribute("aria-selected", "true");
        close();
      });
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initDropdowns());
} else {
  initDropdowns();
}
