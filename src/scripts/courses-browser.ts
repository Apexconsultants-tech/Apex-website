type CourseEntry = { slug: string; name: string; university: string; country: string; duration?: string };

function render(list: CourseEntry[], grid: HTMLElement, countLabel: HTMLElement, emptyState: HTMLElement) {
  countLabel.textContent = `${list.length} course${list.length === 1 ? "" : "s"} found`;
  emptyState.classList.toggle("hidden", list.length > 0);
  grid.innerHTML = list
    .map(
      (c) => `
      <div data-tilt data-tilt-max="4" class="h-full">
        <a href="/contact-us" class="block h-full rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-ink/5">
          <p class="text-sm font-semibold text-ink">${c.name}</p>
          <p class="mt-1 text-xs text-ink-soft">${c.university}</p>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-xs text-ink-faint">${c.country}</span>
            ${c.duration ? `<span class="text-xs font-medium text-brand-text">${c.duration}</span>` : ""}
          </div>
        </a>
      </div>`
    )
    .join("");
}

function initCoursesBrowser() {
  const root = document.querySelector<HTMLElement>("[data-courses-browser]");
  if (!root) return;

  const courses: CourseEntry[] = JSON.parse(root.dataset.courses ?? "[]");
  const searchInput = root.querySelector<HTMLInputElement>("[data-courses-search]");
  const countrySelect = root.querySelector<HTMLSelectElement>("[data-courses-country]");
  const gridEl = root.querySelector<HTMLElement>("[data-courses-grid]");
  const countLabelEl = root.querySelector<HTMLElement>("[data-courses-count]");
  const emptyStateEl = root.querySelector<HTMLElement>("[data-courses-empty]");
  if (!gridEl || !countLabelEl || !emptyStateEl) return;
  const grid = gridEl;
  const countLabel = countLabelEl;
  const emptyState = emptyStateEl;

  function apply() {
    const country = countrySelect?.value ?? "All countries";
    const query = (searchInput?.value ?? "").trim().toLowerCase();
    const filtered = courses.filter((c) => {
      const matchesCountry = country === "All countries" || c.country === country;
      const matchesQuery = query === "" || c.name.toLowerCase().includes(query);
      return matchesCountry && matchesQuery;
    });
    render(filtered, grid, countLabel, emptyState);
  }

  const params = new URLSearchParams(window.location.search);
  const initialCountry = params.get("country");
  if (initialCountry && countrySelect && Array.from(countrySelect.options).some((o) => o.value === initialCountry)) {
    countrySelect.value = initialCountry;
  }
  const initialQuery = params.get("q");
  if (initialQuery && searchInput) searchInput.value = initialQuery;

  searchInput?.addEventListener("input", apply);
  countrySelect?.addEventListener("change", apply);
  apply();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCoursesBrowser);
} else {
  initCoursesBrowser();
}
