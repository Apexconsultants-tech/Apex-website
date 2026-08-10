// Real course catalog extracted from apexconsultants.org/courses and the
// per-destination "Popular courses" tables (crawled 2026-08-09). Duration is
// included only where the source site displayed it explicitly.

export type CourseEntry = {
  slug: string;
  name: string;
  university: string;
  universitySlug: string;
  country: string;
  countrySlug: string;
  level?: string;
  duration?: string;
};

export const courses: CourseEntry[] = [
  { slug: "business-administration", name: "Business Administration", university: "Johns Hopkins University", universitySlug: "johns-hopkins-university", country: "United States", countrySlug: "study-in-usa", duration: "3 years" },
  { slug: "business-management", name: "Business Management", university: "The University of Edinburgh", universitySlug: "the-university-of-edinburgh", country: "United Kingdom", countrySlug: "study-in-uk", duration: "3 years" },
  { slug: "it-computer-science", name: "IT & Computer Science", university: "University of California, Los Angeles (UCLA)", universitySlug: "university-of-california-los-angeles-ucla", country: "United States", countrySlug: "study-in-usa", duration: "3 years" },
  { slug: "it-data-science", name: "IT & Data Science", university: "The University of Melbourne", universitySlug: "the-university-of-melbourne", country: "Australia", countrySlug: "study-in-australia", duration: "3 years" },
  { slug: "engineering", name: "Engineering", university: "University of Cambridge", universitySlug: "university-of-cambridge", country: "United Kingdom", countrySlug: "study-in-uk", duration: "3 years" },
  { slug: "engineering-1", name: "Engineering", university: "Johns Hopkins University", universitySlug: "johns-hopkins-university", country: "United States", countrySlug: "study-in-usa", duration: "3 years" },
  { slug: "engineering-2", name: "Engineering", university: "University of California, Los Angeles (UCLA)", universitySlug: "university-of-california-los-angeles-ucla", country: "United States", countrySlug: "study-in-usa", duration: "3 years" },
  { slug: "engineering-3", name: "Engineering", university: "UNSW Sydney", universitySlug: "unsw-sydney", country: "Australia", countrySlug: "study-in-australia", duration: "3 years" },
  { slug: "biotechnology", name: "Biotechnology", university: "The University of Queensland", universitySlug: "the-university-of-queensland", country: "Australia", countrySlug: "study-in-australia", duration: "3 years" },
  { slug: "business-administration-1", name: "Business Administration", university: "New York University", universitySlug: "new-york-university", country: "United States", countrySlug: "study-in-usa" },
  { slug: "computer-science", name: "Computer Science", university: "King's College London", universitySlug: "kings-college-london", country: "United Kingdom", countrySlug: "study-in-uk", duration: "3 years" },
  { slug: "computer-science-1", name: "Computer Science", university: "New York University", universitySlug: "new-york-university", country: "United States", countrySlug: "study-in-usa" },
  { slug: "finance", name: "Finance", university: "University of California, Los Angeles (UCLA)", universitySlug: "university-of-california-los-angeles-ucla", country: "United States", countrySlug: "study-in-usa", duration: "3 years" },
  { slug: "hospitality-tourism", name: "Hospitality & Tourism", university: "Johns Hopkins University", universitySlug: "johns-hopkins-university", country: "United States", countrySlug: "study-in-usa", duration: "3 years" },
  { slug: "law", name: "Law", university: "University of Bristol", universitySlug: "university-of-bristol", country: "United Kingdom", countrySlug: "study-in-uk", duration: "3 years" },
  { slug: "nursing-physiotherapy", name: "Nursing & Physiotherapy", university: "The University of Sydney", universitySlug: "the-university-of-sydney", country: "Australia", countrySlug: "study-in-australia", duration: "3 years" },
  { slug: "business-management-1", name: "Business & Management", university: "Monash University", universitySlug: "monash-university", country: "Australia", countrySlug: "study-in-australia", duration: "3 years" },
  { slug: "data-science", name: "Data Science", university: "Johns Hopkins University", universitySlug: "johns-hopkins-university", country: "United States", countrySlug: "study-in-usa", duration: "3 years" },
  { slug: "education", name: "Education", university: "University of California, Los Angeles (UCLA)", universitySlug: "university-of-california-los-angeles-ucla", country: "United States", countrySlug: "study-in-usa" },
  { slug: "finance-1", name: "Finance", university: "The University of Edinburgh", universitySlug: "the-university-of-edinburgh", country: "United Kingdom", countrySlug: "study-in-uk", duration: "3 years" },
  { slug: "architecture", name: "Architecture", university: "University of Cambridge", universitySlug: "university-of-cambridge", country: "United Kingdom", countrySlug: "study-in-uk", duration: "3 years" },
  { slug: "architecture-1", name: "Architecture", university: "The University of Western Australia", universitySlug: "the-university-of-western-australia", country: "Australia", countrySlug: "study-in-australia", duration: "3 years" },
  { slug: "biotechnology-1", name: "Biotechnology", university: "New York University", universitySlug: "new-york-university", country: "United States", countrySlug: "study-in-usa" },
  { slug: "environmental-science", name: "Environmental Science", university: "New York University", universitySlug: "new-york-university", country: "United States", countrySlug: "study-in-usa" },
];

export const courseCountries = ["All countries", "United Kingdom", "United States", "Australia"];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function coursesForUniversity(universitySlug: string) {
  return courses.filter((c) => c.universitySlug === universitySlug);
}
