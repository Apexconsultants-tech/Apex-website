"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { destinations } from "@/lib/destinations-data";
import { courseCountries, courses } from "@/lib/courses-data";

const LEVELS = ["Bachelor's", "Master's", "PhD", "Diploma"];
const FIELDS = [
  "Business & Management",
  "Engineering",
  "Computer Science & IT",
  "Medicine & Health Sciences",
  "Law",
  "Arts & Design",
];

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
      router.push(`/courses?${params.toString()}`);
      return;
    }

    const params = new URLSearchParams();
    if (level) params.set("level", level);
    router.push(`/${destination}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  const destName = selectedDestination?.short ?? "?";

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      className={`relative rounded-2xl border-2 border-dashed bg-surface p-0 transition-shadow duration-300 ${
        focused ? "border-brand" : "border-line"
      }`}
      style={{
        // Elevation shadow for the card lift itself, plus a soft, wide,
        // low-opacity warm-gold glow further out — not a border, just a
        // premium light source sitting behind the card. Slightly stronger
        // on focus rather than swapping to a different color entirely.
        boxShadow: focused
          ? "0 20px 45px -12px rgba(20,24,26,0.16), 0 8px 70px -8px rgba(251,191,36,0.85)"
          : "0 20px 45px -12px rgba(20,24,26,0.14), 0 8px 60px -10px rgba(251,191,36,0.7)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-line px-5 py-3">
        <div className="flex items-center gap-2 text-ink-soft">
          <PlaneIcon />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Boarding pass to your next degree</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          Apex &middot; {destName}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1.3fr_1fr_1.3fr_auto]">
        <FinderField label="Destination" borderClass="sm:border-r sm:border-dashed sm:border-line">
          <FinderSelect
            label="Destination"
            value={destination}
            onChange={setDestination}
            options={destinations.map((d) => ({ value: d.slug, label: d.name }))}
            placeholder="Where to?"
          />
        </FinderField>
        <FinderField label="Class" borderClass="sm:border-r sm:border-dashed sm:border-line">
          <FinderSelect label="Class" value={level} onChange={setLevel} options={LEVELS.map((l) => ({ value: l, label: l }))} placeholder="Any level" />
        </FinderField>
        <FinderField label="Route" borderClass="sm:border-r sm:border-dashed sm:border-line">
          <FinderSelect label="Route" value={field} onChange={setField} options={FIELDS.map((f) => ({ value: f, label: f }))} placeholder="Any field" />
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
        <div className="border-t border-dashed border-line px-5 py-2.5 text-xs">
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
    <div className={`border-b border-dashed border-line px-5 py-3 last:border-b-0 sm:border-b-0 ${borderClass}`}>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{label}</span>
      {children}
    </div>
  );
}

function FinderSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full appearance-none bg-transparent py-1 text-sm font-medium text-ink focus:outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function PlaneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5Z" />
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
