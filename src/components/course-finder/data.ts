import { courses } from "@/lib/courses-data";
import { destinations } from "@/lib/destinations-data";
import { partnerUniversities } from "@/lib/universities-data";

export const tabs = ["Courses", "Universities", "Scholarships"] as const;
export type FinderTab = (typeof tabs)[number];
export const qualifications = ["Undergraduate", "Postgraduate", "Postgraduate by Research"] as const;
export const subjects = [
  "Architecture", "Arts & Humanities", "Business & Management", "Computer & IT",
  "Education", "Engineering & Technology", "Health & Medicine", "Law",
  "Life Sciences", "Physical Science & Math", "Social & Behavioural Science",
  "Tourism & Hospitality",
] as const;

const subjectPatterns: Record<string, RegExp> = {
  Architecture: /architecture|construction/i,
  "Arts & Humanities": /arts|humanities|design|history|literature/i,
  "Business & Management": /business|management|finance|accounting|economics/i,
  "Computer & IT": /computer|\bit\b|data science|software/i,
  Education: /education|teaching/i,
  "Engineering & Technology": /engineering|\btechnology\b/i,
  "Health & Medicine": /medicine|health|nursing|physiotherapy|dentistry/i,
  Law: /law/i,
  "Life Sciences": /biotechnology|biology|ecology|environmental/i,
  "Physical Science & Math": /physics|chemistry|math/i,
  "Social & Behavioural Science": /social|psychology|behaviour|sociology/i,
  "Tourism & Hospitality": /tourism|hospitality/i,
};

// Geographic groups contain only countries already represented in Apex data.
const regionFlags: Record<string, string[]> = {
  Europe: ["gb", "ie", "it", "de", "fr", "es", "nl", "fi", "se", "cy"],
  "North America": ["us", "ca"],
  "Asia & Middle East": ["cn", "ae", "my", "kr", "sg"],
  Oceania: ["au", "nz"],
};
const countryFlags = new Map([
  ...destinations.map((d) => [d.name, d.flag] as const),
  ...partnerUniversities.map((u) => [u.country, u.flag] as const),
]);
export type LocationOption = { value: string; label: string; countries: string[]; city?: string };
export const locationGroups = [
  {
    label: "Popular Countries",
    options: destinations.filter((d) => d.region === "Popular").map((d) => ({
      value: `country:${d.name}`, label: d.name, countries: [d.name],
    })),
  },
  {
    label: "Popular Cities",
    options: [...new Map(partnerUniversities.map((u) => [`${u.city}, ${u.country}`, {
      value: `city:${u.city}, ${u.country}`, label: `${u.city}, ${u.country}`, countries: [u.country], city: u.city,
    }])).values()],
  },
  {
    label: "All Regions",
    options: Object.entries(regionFlags).map(([region, flags]) => ({
      value: `region:${region}`, label: region,
      countries: [...countryFlags].filter(([, flag]) => flags.includes(flag)).map(([country]) => country),
    })),
  },
];
export const allLocations: LocationOption[] = locationGroups.flatMap((group) => group.options);
export type FinderFilters = { subject: string; qualification: string; university: string; location: string };
export const emptyFilters: FinderFilters = { subject: "", qualification: "", university: "", location: "" };
export type FinderResult = { key: string; title: string; detail: string; href: string; qualificationUnconfirmed: boolean };

function qualificationMatches(level: string, qualification: string) {
  if (qualification === "Postgraduate by Research") return /phd|doctoral|research/i.test(level);
  if (qualification === "Postgraduate") return /\bmaster|\bpostgraduate(?! by research)|\bgraduate/i.test(level);
  return /undergraduate|bachelor|foundation/i.test(level);
}

export function findResults(tab: FinderTab, filters: FinderFilters): FinderResult[] {
  const location = allLocations.find((option) => option.value === filters.location);
  const matchesLocation = (country: string, city?: string) => !location || (
    location.countries.includes(country) && (!location.city || city === location.city)
  );
  if (tab === "Universities") {
    return partnerUniversities.filter((u) => (!filters.university || u.slug === filters.university) && matchesLocation(u.country, u.city)).map((u) => ({
      key: u.slug, title: u.name, detail: `${u.city}, ${u.country}`,
      href: `/partner-universities/${u.slug}`, qualificationUnconfirmed: false,
    }));
  }
  if (tab === "Courses") {
    return courses.filter((course) => {
      const university = partnerUniversities.find((u) => u.slug === course.universitySlug);
      return (!filters.subject || subjectPatterns[filters.subject]?.test(course.name)) &&
        matchesLocation(course.country, university?.city) &&
        (!filters.qualification || !course.level || qualificationMatches(course.level, filters.qualification));
    }).map((course) => ({
      key: course.slug, title: course.name, detail: `${course.university} · ${course.country}${course.duration ? ` · ${course.duration}` : ""}`,
      href: `/courses?${new URLSearchParams({ q: course.name, university: course.universitySlug })}`,
      qualificationUnconfirmed: Boolean(filters.qualification && !course.level),
    }));
  }
  // Scholarship location is country-wide; existing records have no city field.
  return destinations.filter((d) => !location || location.countries.includes(d.name)).flatMap((d) => d.scholarships.flatMap((scholarship, index) => {
    const hasLevel = /undergraduate|bachelor|foundation|master|postgraduate|graduate|phd|doctoral|research/i.test(scholarship);
    if (filters.qualification && hasLevel && !qualificationMatches(scholarship, filters.qualification)) return [];
    return [{
      key: `${d.slug}-${index}`, title: scholarship, detail: d.name,
      href: `/${d.slug}#scholarships`, qualificationUnconfirmed: Boolean(filters.qualification && !hasLevel),
    }];
  }));
}
