"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courseCountries, courses } from "@/lib/courses-data";
import { getUniversity } from "@/lib/universities-data";
import TiltCard from "@/components/TiltCard";

export default function CoursesBrowser() {
  const [country, setCountry] = useState("All countries");
  const [query, setQuery] = useState("");
  const [university, setUniversity] = useState("");

  // Reads ?country=&q= (set by CourseFinder's redirect) after mount instead
  // of via useSearchParams(), which on a static export requires wrapping
  // this whole component in a Suspense boundary — that shipped the entire
  // course list as empty in the prerendered HTML until JS hydrated. Reading
  // the URL client-side here keeps the full unfiltered list in the static
  // page and only narrows it once a deep link is present.
  useEffect(() => {
    // Apply browser-only filters after the initial static content paints.
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const initialCountry = params.get("country");
      if (initialCountry && courseCountries.includes(initialCountry)) setCountry(initialCountry);
      const initialQuery = params.get("q");
      if (initialQuery) setQuery(initialQuery);
      const initialUniversity = params.get("university");
      if (initialUniversity && getUniversity(initialUniversity)) setUniversity(initialUniversity);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCountry = country === "All countries" || c.country === country;
      const matchesQuery = query.trim() === "" || c.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesUniversity = !university || c.universitySlug === university;
      return matchesCountry && matchesQuery && matchesUniversity;
    });
  }, [country, query, university]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by course name"
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <select
          aria-label="Filter by country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          {courseCountries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-xs text-ink-faint">
        {filtered.length} course{filtered.length === 1 ? "" : "s"} found
      </p>
      {university && (
        <p className="mt-2 text-sm text-ink-soft">
          At {getUniversity(university)?.name}{" "}
          <button type="button" onClick={() => setUniversity("")} className="font-semibold text-brand-text underline underline-offset-2">Clear university filter</button>
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <TiltCard key={c.slug} className="h-full" max={4}>
            <Link
              href="/contact-us"
              className="block h-full rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-ink/5"
            >
              <p className="text-sm font-semibold text-ink">{c.name}</p>
              <p className="mt-1 text-xs text-ink-soft">{c.university}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-ink-faint">{c.country}</span>
                {c.duration && <span className="text-xs font-medium text-brand-text">{c.duration}</span>}
              </div>
            </Link>
          </TiltCard>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-soft">
          No courses match that search. Try a different name or country, or{" "}
          <Link href="/contact-us" className="font-semibold text-brand-text underline underline-offset-2 hover:decoration-2">
            talk to a counselor
          </Link>{" "}
          about programs beyond this list.
        </p>
      )}
    </div>
  );
}
