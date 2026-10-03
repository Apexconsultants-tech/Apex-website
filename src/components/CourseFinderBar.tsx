import type { FormEventHandler, ReactNode } from "react";
import { emptyFilters, locationGroups, qualifications, subjects, tabs, type FinderFilters, type FinderTab } from "@/components/course-finder/data";

export const finderFieldClass = "h-12 w-full min-w-0 rounded-lg border border-[#e3e3e8] bg-white px-4 text-sm text-[#454550] focus:border-[#7044bd] focus:outline-none focus:ring-2 focus:ring-[#7044bd]/20";

function ChoiceDropdown({ label, name, value, options, onChange }: {
  label: string; name: string; value: string; options: readonly string[]; onChange?: (value: string) => void;
}) {
  return (
    <details className="relative min-w-0" onBlur={onChange ? (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
    } : undefined} onKeyDown={onChange ? (event) => {
      const menu = event.currentTarget;
      const trigger = menu.querySelector("summary");
      if (event.key === "Escape") { event.preventDefault(); menu.open = false; trigger?.focus(); return; }
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      menu.open = true;
      const buttons = [...menu.querySelectorAll<HTMLButtonElement>("button")];
      const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next]?.focus();
    } : undefined}>
      <input type="hidden" name={name} value={value} />
      <summary aria-label={label} className={`${finderFieldClass} flex cursor-pointer list-none items-center justify-between gap-2 text-left [&::-webkit-details-marker]:hidden`}>
        <span className="truncate">{value || label}</span><span aria-hidden="true">⌄</span>
      </summary>
      <div className="absolute left-0 top-full z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-[#e3e3e8] bg-white text-sm shadow-xl shadow-black/15">
        {["", ...options].map((option) => <button key={option} type="button" aria-pressed={value === option}
          className="block w-full px-4 py-2.5 text-left text-[#454550] hover:bg-[#f5f1fb] focus:bg-[#f5f1fb] focus:outline-none"
          onClick={onChange ? (event) => {
            onChange(option);
            const menu = event.currentTarget.closest("details");
            if (menu) { menu.open = false; menu.querySelector("summary")?.focus(); }
          } : undefined}>{option || label}</button>)}
      </div>
    </details>
  );
}

// The dynamic fallback renders this same default panel, including its options.
export default function CourseFinderBar({
  activeTab = "Courses", filters = emptyFilters, onTabChange, onFilterChange, onSubmit,
  universityControl, locationControl, children,
}: {
  activeTab?: FinderTab;
  filters?: FinderFilters;
  onTabChange?: (tab: FinderTab) => void;
  onFilterChange?: (field: keyof FinderFilters, value: string) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  universityControl?: ReactNode;
  locationControl?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative rounded-3xl border border-[#ececf1] bg-white px-5 py-6 text-[#30303b] shadow-xl shadow-black/10 sm:px-8 sm:py-7">
      <div role="tablist" aria-label="Find study opportunities" className="flex justify-center gap-5 border-b border-[#eeeeF2] sm:gap-12">
        {tabs.map((tab) => (
          <button
            key={tab} id={`finder-tab-${tab}`} type="button" role="tab"
            aria-selected={activeTab === tab} aria-controls="finder-panel" tabIndex={activeTab === tab ? 0 : -1}
            onClick={onTabChange ? () => onTabChange(tab) : undefined}
            onKeyDown={onTabChange ? (event) => {
              const index = tabs.indexOf(tab);
              const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
              if (next < 0) return;
              event.preventDefault();
              onTabChange(tabs[next]);
              document.getElementById(`finder-tab-${tabs[next]}`)?.focus();
            } : undefined}
            className={`border-b-[3px] px-1 pb-4 text-sm font-semibold transition-colors sm:px-3 sm:text-base ${activeTab === tab ? "border-brand text-brand" : "border-transparent text-[#666674] hover:text-brand"}`}
          >{tab}</button>
        ))}
      </div>
      <div id="finder-panel" role="tabpanel" aria-labelledby={`finder-tab-${activeTab}`} className="pt-6">
        <form action="/courses" method="get" onSubmit={onSubmit} aria-label={`${activeTab} search`}>
          {/* Reserve the three-field mobile height across all tabs. */}
          <div className={`grid min-h-[168px] content-start grid-cols-1 gap-3 sm:min-h-12 ${activeTab === "Courses" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {activeTab === "Courses" && (
              <ChoiceDropdown label="Select Courses" name="q" value={filters.subject} options={subjects} onChange={onFilterChange ? (value) => onFilterChange("subject", value) : undefined} />
            )}
            {activeTab === "Universities" ? universityControl : (
              <ChoiceDropdown label="Select Qualification" name="qualification" value={filters.qualification} options={qualifications} onChange={onFilterChange ? (value) => onFilterChange("qualification", value) : undefined} />
            )}
            {locationControl ?? (
              <ChoiceDropdown label="Select Location" name="location" value="" options={locationGroups.map((group) => `${group.label} ›`)} />
            )}
          </div>
          <div className="mt-6 flex justify-center">
            <button type="submit" className="flex h-12 min-w-40 items-center justify-center gap-2 rounded-xl bg-brand px-9 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep focus-visible:outline-brand">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="m21 21-4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              Search
            </button>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
}
