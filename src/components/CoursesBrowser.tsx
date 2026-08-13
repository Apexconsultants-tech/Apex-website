"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { courseCountries, courses } from "@/lib/courses-data";
import TiltCard from "@/components/TiltCard";

export default function CoursesBrowser() {
  const params = useSearchParams();
  const initialCountry = params.get("country");
  const [country, setCountry] = useState(
    initialCountry && courseCountries.includes(initialCountry) ? initialCountry : "All countries"
  );
  const [query, setQuery] = useState(params.get("q") ?? "");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCountry = country === "All countries" || c.country === country;
      const matchesQuery = query.trim() === "" || c.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCountry && matchesQuery;
    });
  }, [country, query]);

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

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <TiltCard key={c.slug} className="h-full" max={4}>
            <Link
              href={`/partner-universities/${c.universitySlug}`}
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
