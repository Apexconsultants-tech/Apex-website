"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { destinations } from "@/lib/destinations-data";
import { courseCountries, courses } from "@/lib/courses-data";

const LEVEL_GROUPS = [
  {
    group: "Undergraduate",
    options: [
      "Post-Secondary Certificate",
      "Undergraduate Diploma",
      "3-Year Bachelor's Degree",
      "Top-up Degree",
      "4-Year Bachelor's Degree",
      "Integrated Master's",
    ],
  },
  {
    group: "Postgraduate",
    options: ["Postgraduate Certificate", "Postgraduate Diploma", "Doctoral / PhD", "Non-Credential", "Master's Degree"],
  },
  {
    group: "Elementary & High School",
    options: Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`),
  },
];
const FIELDS = [
  "Business & Management",
  "Engineering",
  "Computer Science & IT",
  "Data Science & Analytics",
  "Medicine & Health Sciences",
  "Nursing",
  "Law",
  "Arts & Design",
  "Architecture & Construction",
  "Hospitality & Tourism",
  "Social Sciences",
  "Psychology",
  "Education & Teaching",
  "Finance & Accounting",
  "Media & Communication",
  "Environmental Science & Agriculture",
];
const INTAKES = ["Fall 2026", "Spring 2027", "Fall 2027", "Not sure yet"];
const BUDGETS = ["Under $15,000/yr", "$15,000–$30,000/yr", "$30,000+/yr", "Not sure yet"];

// courses-data.ts only has listings for the countries in courseCountries
// (UK, USA, Australia today). Where that data exists, this searches it and
// shows a live match count; otherwise it routes to the destination guide
// instead of a catalog that doesn't exist yet.
function fieldToKeyword(field: string) {
  return field.split("&")[0].trim().toLowerCase();
}

export default function CourseFinder() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [level, setLevel] = useState("");
  const [field, setField] = useState("");
  const [intake, setIntake] = useState("");
  const [budget, setBudget] = useState("");
  const [focused, setFocused] = useState(false);

  const selectedDestination = destinations.find((d) => d.slug === destination);
  const hasCourseData = !!selectedDestination && courseCountries.includes(selectedDestination.name);

  const matchCount = useMemo(() => {
    if (!selectedDestination || !hasCourseData) return null;
    const keyword = field ? fieldToKeyword(field) : "";
    return courses.filter(
      (c) => c.country === selectedDestination.name && (!keyword || c.name.toLowerCase().includes(keyword))
    ).length;
  }, [selectedDestination, hasCourseData, field]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!destination || !selectedDestination) return;

    if (hasCourseData) {
      const params = new URLSearchParams({ country: selectedDestination.name });
      if (field) params.set("q", fieldToKeyword(field));
      if (level) params.set("level", level);
      if (intake) params.set("intake", intake);
      if (budget) params.set("budget", budget);
      router.push(`/courses?${params.toString()}`);
      return;
    }

    const params = new URLSearchParams();
    if (level) params.set("level", level);
    if (intake) params.set("intake", intake);
    if (budget) params.set("budget", budget);
    router.push(`/${destination}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      className={`relative rounded-2xl border-2 border-dashed bg-surface p-0 transition-shadow duration-300 ${
        focused ? "border-brand" : "border-black"
      } ${focused ? "" : "animate-finder-glow"}`}
      style={
        // Elevation shadow for the card lift itself, plus a soft, wide,
        // low-opacity warm-gold glow further out — not a border, just a
        // premium light source sitting behind the card. On focus this
        // holds steady at its brightest instead of continuing to pulse,
        // since the pulse's job (catch the eye) is done once someone's
        // actually using it.
        focused
          ? { boxShadow: "0 20px 45px -12px rgba(20,24,26,0.16), 0 12px 85px -6px rgba(251,191,36,1)" }
          : undefined
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-black px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white shadow-sm shadow-brand/30">
            <SearchIcon />
          </span>
          <div>
            <span className="block text-sm font-bold text-ink">Course Finder</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              <PlaneIcon />
              Boarding pass to your next degree
            </span>
          </div>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          Apex{selectedDestination ? ` · ${selectedDestination.short}` : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
        <FinderField label="Destination" borderClass="sm:border-r sm:border-dashed sm:border-black">
          <FlatDropdown
            value={destination}
            onChange={setDestination}
            options={destinations.map((d) => ({ value: d.slug, label: d.name }))}
            placeholder="Where to?"
          />
        </FinderField>
        <FinderField label="Class" borderClass="sm:border-r sm:border-dashed sm:border-black">
          <LevelSelect value={level} onChange={setLevel} />
        </FinderField>
        <FinderField label="Route" borderClass="">
          <FlatDropdown value={field} onChange={setField} options={FIELDS.map((f) => ({ value: f, label: f }))} placeholder="Any field" />
        </FinderField>
      </div>

      <div className="grid grid-cols-1 gap-0 border-t border-dashed border-black sm:grid-cols-[1fr_1fr_auto]">
        <FinderField label="Intake" borderClass="sm:border-r sm:border-dashed sm:border-black">
          <FlatDropdown value={intake} onChange={setIntake} options={INTAKES.map((i) => ({ value: i, label: i }))} placeholder="When?" />
        </FinderField>
        <FinderField label="Budget" borderClass="sm:border-r sm:border-dashed sm:border-black">
          <FlatDropdown value={budget} onChange={setBudget} options={BUDGETS.map((b) => ({ value: b, label: b }))} placeholder="Any budget" />
        </FinderField>
        <div className="flex items-center p-3 sm:p-2">
          <button
            type="submit"
            disabled={!destination}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-brand to-brand-deep px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:px-6"
          >
            Board
            <ArrowIcon />
          </button>
        </div>
      </div>

      {selectedDestination && (
        <div className="border-t border-dashed border-black px-5 py-2.5 text-xs">
          {hasCourseData ? (
            <span className="font-medium text-brand-text">
              {matchCount} course{matchCount === 1 ? "" : "s"} match &mdash; view real listings on the next step
            </span>
          ) : (
            <span className="text-ink-faint">
              We don&apos;t have a live course catalog for {selectedDestination.name} yet &mdash; we&apos;ll take you to the full destination guide instead.
            </span>
          )}
        </div>
      )}
    </form>
  );
}

function FinderField({
  label,
  borderClass,
  children,
}: {
  label: string;
  borderClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border-b border-dashed border-black px-5 py-3 last:border-b-0 sm:border-b-0 ${borderClass}`}>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-text">{label}</span>
      {children}
    </div>
  );
}

// Shared close-on-outside-click/Escape behavior for the custom dropdowns
// below (not a native <select> — see LevelSelect's comment for why).
function useDropdownClose(open: boolean, close: () => void) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return rootRef;
}

// Custom dropdown (not a native <select>) for the level field — native
// <optgroup> can't be given a background tint or extra spacing between
// groups in any cross-browser way, and the ask here is specifically for the
// UG/PG/school group headers to read as distinct light-green-tinted
// sections with a full line of breathing room between them. The panel
// scrolls internally past a max height so a long list never overflows the
// page or gets clipped by whatever sits below it.
function LevelSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useDropdownClose(open, () => setOpen(false));

  return (
    <div ref={rootRef} className="relative mt-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 bg-transparent py-1 text-left text-sm font-medium text-ink focus:outline-none"
      >
        <span className={value ? "" : "text-ink-faint"}>{value || "Any level"}</span>
        <ChevronIcon className={`shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-20 mt-2 max-h-80 w-72 overflow-y-auto rounded-xl border border-line bg-surface p-2 shadow-xl shadow-ink/10"
        >
          {LEVEL_GROUPS.map((g, gi) => (
            <div key={g.group} className={gi > 0 ? "mt-4" : ""}>
              <div className="rounded-md bg-brand-tint px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-text">
                {g.group}
              </div>
              <div className="mt-1">
                {g.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    role="option"
                    aria-selected={value === o}
                    onClick={() => {
                      onChange(o);
                      setOpen(false);
                    }}
                    className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                      value === o ? "bg-brand-tint font-semibold text-brand-text" : "text-ink hover:bg-surface-2"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Same idea as LevelSelect but for flat (non-grouped) lists — Destination,
// Route, Intake, and Budget.
function FlatDropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useDropdownClose(open, () => setOpen(false));
  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className="relative mt-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 bg-transparent py-1 text-left text-sm font-medium text-ink focus:outline-none"
      >
        <span className={selected ? "" : "text-ink-faint"}>{selected ? selected.label : placeholder}</span>
        <ChevronIcon className={`shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-20 mt-2 max-h-80 w-64 overflow-y-auto rounded-xl border border-line bg-surface p-2 shadow-xl shadow-ink/10"
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={value === o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                value === o.value ? "bg-brand-tint font-semibold text-brand-text" : "text-ink hover:bg-surface-2"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
