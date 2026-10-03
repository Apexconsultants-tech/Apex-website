"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import CourseFinderBar from "@/components/CourseFinderBar";
import { LocationDropdown, UniversityDropdown } from "@/components/course-finder/Dropdowns";
import { allLocations, emptyFilters, findResults, type FinderFilters, type FinderResult, type FinderTab } from "@/components/course-finder/data";

export default function CourseFinder() {
  const [tab, setTab] = useState<FinderTab>("Courses");
  const [filtersByTab, setFiltersByTab] = useState<Record<FinderTab, FinderFilters>>({ Courses: { ...emptyFilters }, Universities: { ...emptyFilters }, Scholarships: { ...emptyFilters } });
  const [results, setResults] = useState<FinderResult[] | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const filters = filtersByTab[tab];

  function changeFilter(field: keyof FinderFilters, value: string) {
    setFiltersByTab((previous) => ({ ...previous, [tab]: { ...previous[tab], [field]: value } }));
    setResults(null);
  }
  function changeTab(next: FinderTab) {
    setTab(next);
    setResults(null);
  }
  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResults(findResults(tab, filters));
    requestAnimationFrame(() => resultsRef.current?.focus({ preventScroll: true }));
  }
  const unconfirmed = results?.some((result) => result.qualificationUnconfirmed);
  const cityScholarships = tab === "Scholarships" && allLocations.find((location) => location.value === filters.location)?.city;

  return (
    <CourseFinderBar
      activeTab={tab} filters={filters} onTabChange={changeTab} onFilterChange={changeFilter} onSubmit={search}
      universityControl={<UniversityDropdown value={filters.university} onChange={(value) => changeFilter("university", value)} />}
      locationControl={<LocationDropdown value={filters.location} onChange={(value) => changeFilter("location", value)} />}
    >
      {results !== null && (
        <div ref={resultsRef} tabIndex={-1} aria-label={`${tab} search results`} className="mt-7 border-t border-[#eeeeF2] pt-5 outline-none">
          <p role="status" className="text-sm font-semibold text-[#30303b]">{results.length} {results.length === 1 ? { Courses: "course", Universities: "university", Scholarships: "scholarship" }[tab] : tab.toLowerCase()} {results.length === 1 ? "match" : "matches"}</p>
          {unconfirmed && <p className="mt-2 text-sm text-[#666674]">Results marked below need confirmation for {filters.qualification}; their qualification details are not specified.</p>}
          {cityScholarships && <p className="mt-2 text-sm text-[#666674]">Showing country-wide scholarship opportunities for this city. Confirm availability at your chosen university.</p>}
          {!results.length ? <p className="mt-3 text-sm text-[#666674]">No matches in our current listings. Try another selection or <Link href="/contact-us" className="font-semibold text-[#7044bd] underline">ask an Apex counselor</Link>.</p> : (
            <ul className="mt-4 grid max-h-80 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2">
              {results.map((result) => <li key={result.key} className="rounded-xl border border-[#e3e3e8] p-4">
                <Link href={result.href} className="text-sm font-semibold text-[#7044bd] hover:underline">{result.title}</Link>
                <p className="mt-1 text-xs leading-relaxed text-[#666674]">{result.detail}</p>
                {result.qualificationUnconfirmed && <p className="mt-2 text-xs font-medium text-[#954008]">Qualification to confirm</p>}
              </li>)}
            </ul>
          )}
        </div>
      )}
    </CourseFinderBar>
  );
}
