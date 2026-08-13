// Partner university listing sourced from Apex's published site. Logos are
// not reproduced here (third-party marks); each entry uses the country flag
// plus name/city instead. Slugs follow a consistent kebab-case convention.

export type PartnerUniversity = {
  slug: string;
  name: string;
  country: string;
  city: string;
  countrySlug: string;
  flag: string;
  homepage: string;
};

export const partnerUniversities: PartnerUniversity[] = [
  { slug: "the-university-of-edinburgh", name: "The University of Edinburgh", country: "United Kingdom", city: "Edinburgh", countrySlug: "study-in-uk", flag: "gb", homepage: "https://www.ed.ac.uk" },
  { slug: "university-of-cambridge", name: "University of Cambridge", country: "United Kingdom", city: "Cambridge", countrySlug: "study-in-uk", flag: "gb", homepage: "https://www.cam.ac.uk" },
  { slug: "kings-college-london", name: "King's College London", country: "United Kingdom", city: "London", countrySlug: "study-in-uk", flag: "gb", homepage: "https://www.kcl.ac.uk" },
  { slug: "university-of-bristol", name: "University of Bristol", country: "United Kingdom", city: "Bristol", countrySlug: "study-in-uk", flag: "gb", homepage: "https://www.bristol.ac.uk" },
  { slug: "johns-hopkins-university", name: "Johns Hopkins University", country: "United States", city: "Baltimore", countrySlug: "study-in-usa", flag: "us", homepage: "https://www.jhu.edu" },
  { slug: "university-of-california-los-angeles-ucla", name: "University of California, Los Angeles (UCLA)", country: "United States", city: "Los Angeles", countrySlug: "study-in-usa", flag: "us", homepage: "https://www.ucla.edu" },
  { slug: "new-york-university", name: "New York University", country: "United States", city: "New York", countrySlug: "study-in-usa", flag: "us", homepage: "https://www.nyu.edu" },
  { slug: "the-university-of-melbourne", name: "The University of Melbourne", country: "Australia", city: "Melbourne", countrySlug: "study-in-australia", flag: "au", homepage: "https://www.unimelb.edu.au" },
  { slug: "unsw-sydney", name: "UNSW Sydney", country: "Australia", city: "Sydney", countrySlug: "study-in-australia", flag: "au", homepage: "https://www.unsw.edu.au" },
  { slug: "the-university-of-queensland", name: "The University of Queensland", country: "Australia", city: "Brisbane", countrySlug: "study-in-australia", flag: "au", homepage: "https://www.uq.edu.au" },
  { slug: "the-university-of-sydney", name: "The University of Sydney", country: "Australia", city: "Sydney", countrySlug: "study-in-australia", flag: "au", homepage: "https://www.sydney.edu.au" },
  { slug: "monash-university", name: "Monash University", country: "Australia", city: "Melbourne", countrySlug: "study-in-australia", flag: "au", homepage: "https://www.monash.edu" },
  { slug: "the-university-of-western-australia", name: "The University of Western Australia", country: "Australia", city: "Perth", countrySlug: "study-in-australia", flag: "au", homepage: "https://www.uwa.edu.au" },
  { slug: "national-university-of-singapore-nus", name: "National University of Singapore (NUS)", country: "Singapore", city: "Singapore", countrySlug: "", flag: "sg", homepage: "https://www.nus.edu.sg" },
  { slug: "the-university-of-auckland", name: "The University of Auckland", country: "New Zealand", city: "Auckland", countrySlug: "study-in-new-zealand", flag: "nz", homepage: "https://www.auckland.ac.nz" },
  { slug: "university-of-amsterdam", name: "University of Amsterdam", country: "Netherlands", city: "Amsterdam", countrySlug: "study-in-netherlands", flag: "nl", homepage: "https://www.uva.nl" },
];

export const universityFilterCountries = ["All", "UK", "USA", "Australia", "New Zealand", "Netherlands", "Singapore"];

export function getUniversity(slug: string) {
  return partnerUniversities.find((u) => u.slug === slug);
}
