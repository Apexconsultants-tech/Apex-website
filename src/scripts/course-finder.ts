function fieldToKeyword(field: string) {
  return field.split("&")[0].trim().toLowerCase();
}

function initCourseFinder() {
  const form = document.querySelector<HTMLFormElement>("[data-course-finder]");
  if (!form) return;

  const destinationInput = form.querySelector<HTMLInputElement>('input[name="destination"]');
  const levelInput = form.querySelector<HTMLInputElement>('input[name="level"]');
  const fieldInput = form.querySelector<HTMLInputElement>('input[name="field"]');
  const intakeInput = form.querySelector<HTMLInputElement>('input[name="intake"]');
  const budgetInput = form.querySelector<HTMLInputElement>('input[name="budget"]');
  const submitBtn = form.querySelector<HTMLButtonElement>("button[type=submit]");
  const matchLine = form.querySelector<HTMLElement>("[data-match-line]");

  const courseCountries: string[] = JSON.parse(form.dataset.courseCountries ?? "[]");
  const courses: { name: string; country: string }[] = JSON.parse(form.dataset.courses ?? "[]");
  const destinationNames: Record<string, { name: string; short: string }> = JSON.parse(
    form.dataset.destinations ?? "{}"
  );

  function updateMatchLine() {
    const slug = destinationInput?.value ?? "";
    const dest = destinationNames[slug];
    if (submitBtn) submitBtn.disabled = !slug;
    if (!matchLine) return;
    if (!dest) {
      matchLine.classList.add("hidden");
      return;
    }
    matchLine.classList.remove("hidden");
    const hasCourseData = courseCountries.includes(dest.name);
    if (hasCourseData) {
      const keyword = fieldInput?.value ? fieldToKeyword(fieldInput.value) : "";
      const count = courses.filter(
        (c) => c.country === dest.name && (!keyword || c.name.toLowerCase().includes(keyword))
      ).length;
      matchLine.innerHTML = `<span class="font-medium text-brand-text">${count} course${count === 1 ? "" : "s"} match &mdash; view real listings on the next step</span>`;
    } else {
      matchLine.innerHTML = `<span class="text-ink-faint">We don't have a live course catalog for ${dest.name} yet &mdash; we'll take you to the full destination guide instead.</span>`;
    }
  }

  [destinationInput, fieldInput].forEach((input) => input?.addEventListener("change", updateMatchLine));
  updateMatchLine();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const slug = destinationInput?.value ?? "";
    const dest = destinationNames[slug];
    if (!slug || !dest) return;

    const hasCourseData = courseCountries.includes(dest.name);
    if (hasCourseData) {
      const params = new URLSearchParams({ country: dest.name });
      if (fieldInput?.value) params.set("q", fieldToKeyword(fieldInput.value));
      if (levelInput?.value) params.set("level", levelInput.value);
      if (intakeInput?.value) params.set("intake", intakeInput.value);
      if (budgetInput?.value) params.set("budget", budgetInput.value);
      window.location.href = `/courses?${params.toString()}`;
      return;
    }

    const params = new URLSearchParams();
    if (levelInput?.value) params.set("level", levelInput.value);
    if (intakeInput?.value) params.set("intake", intakeInput.value);
    if (budgetInput?.value) params.set("budget", budgetInput.value);
    const query = params.toString();
    window.location.href = `/${slug}${query ? `?${query}` : ""}`;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCourseFinder);
} else {
  initCourseFinder();
}
