// Partner university logo marks supplied directly by Apex. The full set
// slides across the homepage logo marquee.

export type PartnerLogo = {
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  flag: string;
  logo: string;
  // True when the source file is a white-only wordmark (the institution's
  // real logo, pulled from a dark website header) that would be invisible
  // on this site's light logo cards without a dark chip behind it.
  darkLogo?: boolean;
};

export const partnerLogos: PartnerLogo[] = [
  // UK
  { slug: "durham-university", name: "Durham University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "durham-university.svg" },
  { slug: "university-of-leeds", name: "University of Leeds", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-leeds.png" },
  { slug: "university-of-sheffield", name: "University of Sheffield", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-sheffield.svg" },
  { slug: "university-of-bath", name: "University of Bath", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-bath.svg" },
  { slug: "cardiff-university", name: "Cardiff University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "cardiff-university.svg" },
  { slug: "royal-holloway-university-of-london", name: "Royal Holloway, University of London", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "royal-holloway-university-of-london.png" },
  { slug: "university-of-huddersfield", name: "University of Huddersfield", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-huddersfield.png" },
  { slug: "kingston-university-london", name: "Kingston University London", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "kingston-university-london.svg" },
  { slug: "liverpool-john-moores-university", name: "Liverpool John Moores University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "liverpool-john-moores-university.png" },
  { slug: "university-of-aberdeen", name: "University of Aberdeen", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-aberdeen.png" },
  { slug: "university-of-surrey", name: "University of Surrey", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-surrey.png" },
  { slug: "university-of-sussex", name: "University of Sussex", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-sussex.png" },
  { slug: "university-of-strathclyde", name: "University of Strathclyde", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-strathclyde.png" },
  { slug: "university-of-dundee", name: "University of Dundee", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-dundee.png" },
  { slug: "university-of-derby", name: "University of Derby", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-derby.svg" },
  { slug: "bournemouth-university", name: "Bournemouth University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "bournemouth-university.png" },
  { slug: "london-metropolitan-university", name: "London Metropolitan University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "london-metropolitan-university.png" },
  { slug: "sruc-scotlands-rural-college", name: "SRUC (Scotland's Rural College)", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "sruc-scotlands-rural-college.png" },
  { slug: "anglia-ruskin-university", name: "Anglia Ruskin University", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "anglia-ruskin-university.svg" },
  { slug: "brunel-university-london", name: "Brunel University London", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "brunel-university-london.png" },
  { slug: "middlesex-university-london", name: "Middlesex University London", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "middlesex-university-london.svg" },
  { slug: "the-university-of-buckingham", name: "The University of Buckingham", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "the-university-of-buckingham.svg" },
  { slug: "the-university-of-law", name: "The University of Law", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "the-university-of-law.svg" },
  { slug: "university-of-kent", name: "University of Kent", country: "United Kingdom", countrySlug: "study-in-uk", flag: "gb", logo: "university-of-kent.svg" },

  // USA
  { slug: "louisiana-state-university", name: "Louisiana State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "louisiana-state-university.svg" },
  { slug: "northeastern-university", name: "Northeastern University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "northeastern-university.svg" },
  { slug: "boston-university", name: "Boston University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "boston-university.png" },
  { slug: "arizona-state-university", name: "Arizona State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "arizona-state-university.png" },
  { slug: "depaul-university", name: "DePaul University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "depaul-university.svg" },
  { slug: "adelphi-university", name: "Adelphi University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "adelphi-university.svg" },
  { slug: "cleveland-state-university", name: "Cleveland State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "cleveland-state-university.png" },
  { slug: "university-of-wyoming", name: "University of Wyoming", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-wyoming.svg" },
  { slug: "auburn-university", name: "Auburn University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "auburn-university.svg" },
  { slug: "florida-international-university", name: "Florida International University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "florida-international-university.svg" },
  { slug: "missouri-university-of-science-and-technology", name: "Missouri University of Science and Technology", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "missouri-university-of-science-and-technology.svg" },
  { slug: "university-of-central-florida", name: "University of Central Florida", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-central-florida.png" },
  { slug: "university-of-illinois-chicago", name: "University of Illinois Chicago", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-illinois-chicago.png" },
  { slug: "university-of-illinois-springfield", name: "University of Illinois Springfield", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-illinois-springfield.png" },
  { slug: "umass-boston", name: "UMass Boston", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "umass-boston.svg" },
  { slug: "university-of-nevada", name: "University of Nevada", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "university-of-nevada.svg" },
  { slug: "ut-san-antonio", name: "UT San Antonio", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "ut-san-antonio.svg" },
  { slug: "texas-state-university", name: "Texas State University", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "texas-state-university.svg" },
  { slug: "california-state-university-san-bernardino", name: "California State University, San Bernardino", country: "United States", countrySlug: "study-in-usa", flag: "us", logo: "california-state-university-san-bernardino.svg" },

  // Australia
  { slug: "james-cook-university-australia", name: "James Cook University Australia", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "james-cook-university-australia.png" },
  { slug: "curtin-university", name: "Curtin University", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "curtin-university.png" },
  { slug: "southern-cross-university", name: "Southern Cross University", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "southern-cross-university.png" },
  { slug: "federation-university-australia", name: "Federation University Australia", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "federation-university-australia.svg" },
  { slug: "university-of-tasmania", name: "University of Tasmania", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "university-of-tasmania.svg" },
  { slug: "charles-sturt-university", name: "Charles Sturt University", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "charles-sturt-university.svg" },
  { slug: "canberra-college", name: "Canberra College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "canberra-college.png" },
  { slug: "western-sydney-university", name: "Western Sydney University", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "western-sydney-university.png" },
  { slug: "acap-university-college", name: "ACAP University College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "acap-university-college.svg" },
  { slug: "sae-university-college", name: "SAE University College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "sae-university-college.png", darkLogo: true },
  { slug: "box-hill-institute", name: "Box Hill Institute", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "box-hill-institute.svg" },
  { slug: "western-sydney-university-international-college", name: "Western Sydney University International College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "western-sydney-university-international-college.svg" },
  { slug: "university-of-canberra-college", name: "University of Canberra College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "university-of-canberra-college.png" },
  { slug: "deakin-college", name: "Deakin College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "deakin-college.svg", darkLogo: true },
  { slug: "sydney-institute-of-business-and-technology", name: "Sydney Institute of Business and Technology", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "sydney-institute-of-business-and-technology.svg", darkLogo: true },
  { slug: "australia-institute-of-business-and-technology", name: "Australia Institute of Business and Technology", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "australia-institute-of-business-and-technology.svg", darkLogo: true },
  { slug: "tafe-nsw", name: "TAFE NSW", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "tafe-nsw.svg", darkLogo: true },
  { slug: "tastafe", name: "TasTAFE", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "tastafe.png", darkLogo: true },
  { slug: "the-hotel-school", name: "The Hotel School", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "the-hotel-school.svg" },
  { slug: "taylors-college", name: "Taylors College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "taylors-college.svg" },
  { slug: "national-polytechnic-of-australia", name: "National Polytechnic of Australia", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "national-polytechnic-of-australia.svg" },
  { slug: "canberra-business-and-technology-college", name: "Canberra Business and Technology College", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "canberra-business-and-technology-college.png" },
  { slug: "australian-institute-of-business-intelligence", name: "Australian Institute of Business Intelligence", country: "Australia", countrySlug: "study-in-australia", flag: "au", logo: "australian-institute-of-business-intelligence.png", darkLogo: true },

  // Germany
  { slug: "arden-university-berlin", name: "Arden University Berlin Campus", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "arden-university-berlin.svg" },
  { slug: "berlin-school-of-business-and-innovation", name: "Berlin School of Business and Innovation", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "berlin-school-of-business-and-innovation.svg" },
  { slug: "eu-business-school-munich-campus", name: "EU Business School (Munich Campus)", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "eu-business-school-munich-campus.svg" },
  { slug: "gisma-university-of-applied-sciences", name: "GISMA University of Applied Sciences", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "gisma-university-of-applied-sciences.svg" },
  { slug: "iu-internationale-hochschule", name: "IU International University of Applied Sciences", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "iu-internationale-hochschule.png" },
  { slug: "lancaster-university-leipzig", name: "Lancaster University Leipzig", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "lancaster-university-leipzig.png" },
  { slug: "macromedia-university-of-applied-sciences", name: "Macromedia University of Applied Sciences", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "macromedia-university-of-applied-sciences.svg", darkLogo: true },
  { slug: "munich-business-school", name: "Munich Business School", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "munich-business-school.svg", darkLogo: true },
  { slug: "schiller-international-university-german-campus", name: "Schiller International University - German Campus", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "schiller-international-university-german-campus.svg" },
  { slug: "srh-international-college", name: "SRH International College", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "srh-international-college.svg" },
  { slug: "university-of-europe-for-applied-sciences", name: "University of Europe for Applied Sciences", country: "Germany", countrySlug: "study-in-germany", flag: "de", logo: "university-of-europe-for-applied-sciences.png" },

  // Ireland
  { slug: "griffith-college", name: "Griffith College", country: "Ireland", countrySlug: "study-in-ireland", flag: "ie", logo: "griffith-college.png" },

  // Global
  { slug: "spj-global", name: "SP Jain School of Global Management", country: "Global", countrySlug: "", flag: "", logo: "spj-global.png" },
];

// Alias used by the "More Partner Institutions" section, distinct from the
// featured universities in universities-data.ts.
export const otherPartnerLogos = partnerLogos;
