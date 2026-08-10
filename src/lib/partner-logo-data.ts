// Partner university logo marks, supplied directly by Apex (2026-08-10) as
// three logo sheets (UK, USA, and a mixed international set). These are
// separate from the richer `partnerUniversities` entries in
// universities-data.ts, which have real per-university course/detail pages
// crawled from the source site — no course or admissions data exists for
// the universities below, so they get a logo + name only, not a full
// profile page. `featured` marks the set shown on the homepage; everything
// else appears on the partner-universities page.

export type PartnerLogo = {
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  flag: string;
  logo: string;
  featured: boolean;
};

export const partnerLogos: PartnerLogo[] = [
  // UK
  { slug: "durham-university", name: "Durham University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "durham-university.png", featured: true },
  { slug: "university-of-leeds", name: "University of Leeds", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-leeds.png", featured: true },
  { slug: "university-of-sheffield", name: "University of Sheffield", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-sheffield.png", featured: true },
  { slug: "university-of-bath", name: "University of Bath", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-bath.png", featured: true },
  { slug: "cardiff-university", name: "Cardiff University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "cardiff-university.png", featured: true },
  { slug: "royal-holloway-university-of-london", name: "Royal Holloway, University of London", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "royal-holloway-university-of-london.png", featured: false },
  { slug: "university-of-huddersfield", name: "University of Huddersfield", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-huddersfield.png", featured: false },
  { slug: "kingston-university-london", name: "Kingston University London", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "kingston-university-london.png", featured: false },
  { slug: "liverpool-john-moores-university", name: "Liverpool John Moores University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "liverpool-john-moores-university.png", featured: false },
  { slug: "university-of-aberdeen", name: "University of Aberdeen", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-aberdeen.png", featured: false },
  { slug: "university-of-surrey", name: "University of Surrey", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-surrey.png", featured: false },
  { slug: "university-of-sussex", name: "University of Sussex", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-sussex.png", featured: false },
  { slug: "university-of-strathclyde", name: "University of Strathclyde", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-strathclyde.png", featured: false },
  { slug: "university-of-dundee", name: "University of Dundee", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-dundee.png", featured: false },
  { slug: "university-of-derby", name: "University of Derby", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-derby.png", featured: false },
  { slug: "bournemouth-university", name: "Bournemouth University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "bournemouth-university.png", featured: false },
  { slug: "lancaster-university-leipzig", name: "Lancaster University Leipzig", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "lancaster-university-leipzig.png", featured: false },
  { slug: "london-metropolitan-university", name: "London Metropolitan University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "london-metropolitan-university.png", featured: false },
  { slug: "sruc-scotlands-rural-college", name: "SRUC (Scotland's Rural College)", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "sruc-scotlands-rural-college.png", featured: false },

  // USA
  { slug: "louisiana-state-university", name: "Louisiana State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "louisiana-state-university.png", featured: true },
  { slug: "northeastern-university", name: "Northeastern University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "northeastern-university.png", featured: true },
  { slug: "boston-university", name: "Boston University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "boston-university.png", featured: true },
  { slug: "arizona-state-university", name: "Arizona State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "arizona-state-university.png", featured: true },
  { slug: "depaul-university", name: "DePaul University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "depaul-university.png", featured: true },
  { slug: "adelphi-university", name: "Adelphi University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "adelphi-university.png", featured: false },
  { slug: "cleveland-state-university", name: "Cleveland State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "cleveland-state-university.png", featured: false },
  { slug: "university-of-wyoming", name: "University of Wyoming", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-wyoming.png", featured: false },
  { slug: "auburn-university", name: "Auburn University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "auburn-university.png", featured: false },
  { slug: "florida-international-university", name: "Florida International University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "florida-international-university.png", featured: false },
  { slug: "missouri-university-of-science-and-technology", name: "Missouri University of Science and Technology", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "missouri-university-of-science-and-technology.png", featured: false },
  { slug: "university-of-central-florida", name: "University of Central Florida", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-central-florida.png", featured: false },
  { slug: "university-of-illinois-chicago", name: "University of Illinois Chicago", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-illinois-chicago.png", featured: false },
  { slug: "university-of-illinois-springfield", name: "University of Illinois Springfield", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-illinois-springfield.png", featured: false },
  { slug: "umass-boston", name: "UMass Boston", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "umass-boston.png", featured: false },
  { slug: "university-of-nevada", name: "University of Nevada", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-nevada.png", featured: false },
  { slug: "ut-san-antonio", name: "UT San Antonio", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "ut-san-antonio.png", featured: false },
  { slug: "texas-state-university", name: "Texas State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "texas-state-university.png", featured: false },
  { slug: "california-state-university-san-bernardino", name: "California State University, San Bernardino", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "california-state-university-san-bernardino.png", featured: false },

  // Australia
  { slug: "james-cook-university-australia", name: "James Cook University Australia", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "james-cook-university-australia.png", featured: true },
  { slug: "curtin-university", name: "Curtin University", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "curtin-university.png", featured: true },
  { slug: "southern-cross-university", name: "Southern Cross University", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "southern-cross-university.png", featured: false },
  { slug: "federation-university-australia", name: "Federation University Australia", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "federation-university-australia.png", featured: false },
  { slug: "university-of-tasmania", name: "University of Tasmania", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "university-of-tasmania.png", featured: false },

  // Germany
  { slug: "arden-university-berlin", name: "Arden University Berlin", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "arden-university-berlin.png", featured: false },
  { slug: "iu-internationale-hochschule", name: "IU Internationale Hochschule", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "iu-internationale-hochschule.png", featured: false },
  { slug: "university-of-europe-for-applied-sciences", name: "University of Europe for Applied Sciences", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "university-of-europe-for-applied-sciences.png", featured: false },

  // Ireland
  { slug: "griffith-college", name: "Griffith College", country: "Ireland", countrySlug: "study-in-ireland", flag: "ie", logo: "griffith-college.png", featured: false },

  // Global
  { slug: "spj-global", name: "SP Jain School of Global Management", country: "Global", countrySlug: "", flag: "", logo: "spj-global.png", featured: false },
];

export const featuredPartnerLogos = partnerLogos.filter((u) => u.featured);
export const otherPartnerLogos = partnerLogos.filter((u) => !u.featured);
