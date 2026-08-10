// Central source of truth for real, verified Apex Consulting Services facts.
// Nothing in this file is invented; every value traces back to the live
// apexconsultants.org site (crawled 2026-08-09) or a client-supplied fact.
// See destinations-data.ts, services-data.ts, and universities-data.ts for
// the larger structured content sets.

import { destinations as destinationList } from "./destinations-data";
import { services as serviceList } from "./services-data";

export const site = {
  name: "Apex Consulting Services",
  shortName: "Apex",
  domain: "apexconsultants.org",
  url: "https://www.apexconsultants.org",
  foundedYear: 2009,
  tagline: "Where Futures Cross Continents",
  description:
    "ICEF-accredited overseas education consultants since 2009, with offices in Karachi, Hyderabad and the UK. Admissions, visas, and scholarships.",
};

export const contact = {
  phoneDisplay: "+92 334 6668227",
  phoneHref: "tel:+923346668227",
  whatsappHref: "https://api.whatsapp.com/send/?phone=923346668227&text=Hi&type=phone_number",
  email: "info@apexconsultants.org",
  hours: "Monday to Friday, 9am to 5pm",
};

export const socials = {
  facebook: "https://www.facebook.com/ApexConsultingServices",
  linkedin: "https://www.linkedin.com/company/apex-consulting-services-pakistan/",
};

export const offices = [
  {
    id: "karachi",
    name: "Karachi (Head Office)",
    address: "Office no. 301, 3rd Floor, Crown Square, Block 13A, Gulshan-e-Iqbal, Karachi 75300, Pakistan",
    mapQuery: "Crown+Square+Block+13A+Gulshan-e-Iqbal+Karachi+75300+Pakistan",
    mapZoom: 15,
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    address: "Auto Bhan Tower, Auto Bhan Road, Mezzanine Floor, Hyderabad, Pakistan",
    mapQuery: "Auto+Bhan+Tower+Auto+Bhan+Road+Hyderabad+Pakistan",
    mapZoom: 16,
  },
  {
    id: "uk",
    name: "United Kingdom",
    address: "International office support for UK admissions, student visas, and post-arrival guidance.",
    mapQuery: "London+United+Kingdom",
    mapZoom: 11,
  },
] as const;

export const icef = {
  iasId: "4511",
  certificateUrl: "https://accreditations.icef.com/certificate?id=b75cc564-646f-423c-8a6d-273b864d5a92",
  agencyProfileUrl: "https://www.icef.com/agency/0012000001XE53lAAD",
  aboutUrl: "https://www.icef.com/",
};

// Stats exactly as currently published by the client. The fourth figure is
// intentionally qualitative: the source site avoids a specific percentage,
// and we're not inventing one. Replace with a real number if the client
// supplies verified data.
export const stats = [
  { value: "15+", label: "Years", sub: "Since 2009" },
  { value: "50+", label: "Countries Covered" },
  { value: "1000+", label: "Students Guided" },
  { value: "Strong", label: "Visa Success Rate", isQualitative: true },
] as const;

export const coreValues = [
  {
    title: "Student-First Guidance",
    body: "Personalized counselling aligned with your academic goals, budget, and preferred study destination.",
  },
  {
    title: "Transparent Process",
    body: "Clear advice on admissions, documentation, timelines, and visa requirements, with no hidden steps.",
  },
  {
    title: "Global Reach",
    body: "Support for the UK, USA, Canada, Australia, Ireland, Europe, and more through partner institutions abroad.",
  },
  {
    title: "End-to-End Support",
    body: "From course selection and applications to visa filing, interview prep, travel, and post-arrival guidance.",
  },
] as const;

export const journey = [
  { year: "2009", text: "Apex Consulting Services founded to guide students pursuing education abroad." },
  { year: "2015", text: "Expanded counseling services across admissions, visas, and test preparation." },
  { year: "2020", text: "Strengthened partnerships with universities in the UK, Canada, and Australia." },
  { year: "Today", text: "Supporting students from Karachi, Hyderabad, and the UK with end-to-end guidance." },
] as const;

export const aboutSections = {
  story: {
    intro:
      "Founded in 2009, Apex Consulting Services began with a simple goal: help Pakistani students access quality education abroad with honest guidance and dependable support.",
    body: "Over the years, we have built trusted relationships with partner colleges and universities, supported thousands of students, and expanded our presence across Karachi, Hyderabad, and the UK.",
    points: [
      "Trusted overseas education consultancy since 2009",
      "Authorized representatives for partner institutions abroad",
      "High success in admissions and student visas",
      "Counselors focused on clarity, compliance, and student outcomes",
    ],
  },
  mission: {
    intro:
      "We deliver reliable, transparent, and result-oriented guidance so every student receives personalized advice for their goals, from university and course selection through applications, visas, scholarships, pre-departure support, and accommodation.",
    points: [
      "Admission services and partner university guidance",
      "Student visa filing and interview assistance",
      "Course guidance for UK, USA, Canada, Australia, and Europe",
      "IELTS and PTE preparation support",
      "Pre- and post-departure, travel, and stay assistance",
    ],
  },
  whyChoose: {
    intro:
      "Students choose Apex because we combine experienced counselors, practical visa support, and a student-first approach at every stage of the journey.",
    points: [
      "Strong international university network",
      "Hands-on visa application and interview coaching",
      "Scholarship identification and application support",
      "Free consultation to help you plan with confidence",
      "ICEF Agency Status (IAS) certified education agent",
    ],
  },
} as const;

// Curated 4-highlight homepage summary. The full 9-service breakdown lives
// in services-data.ts and powers the individual service pages.
export const homeServiceHighlights = [
  {
    number: "01",
    title: "Admission Services & Partner Universities",
    body: "We help you choose the right course and institution as authorized representatives for partner colleges and universities abroad, with a student-first focus.",
  },
  {
    number: "02",
    title: "Visa Filing & Interview Assistance",
    body: "Hands-on support for visa application preparation and visa interview coaching, so you are ready for the questions that matter.",
  },
  {
    number: "03",
    title: "Pre- & Post-Departure, Travel & Stay",
    body: "Guidance on pre- and post-departure steps, airline ticketing, and accommodation options suited to your budget.",
  },
  {
    number: "04",
    title: "IELTS & PTE Preparation",
    body: "Structured preparation for English tests that support admissions and visa outcomes for the UK, USA, Canada, Australia, and more.",
  },
] as const;

// Lightweight nav-friendly views derived from the richer data files, so
// there is exactly one source of truth for slugs and names.
export const destinations = destinationList.map((d) => ({
  name: d.name,
  short: d.short,
  slug: d.slug,
  flag: d.flag,
  region: d.region,
}));

export const serviceLinks = [
  ...serviceList.map((s) => ({ label: s.name, slug: s.slug })),
  { label: "Partner Universities", slug: "partner-universities" },
  { label: "Courses", slug: "courses" },
] as const;

// Real students, real universities, reused with the same permission basis
// as the source site (testimonial photography is the one image category
// explicitly safe to carry forward). Two students from the full success
// stories list do not have a usable photo on file; they render with an
// initials avatar instead of a placeholder image.
export const testimonials = [
  { name: "Ali Hamza", program: "MSc Applied Ecology", university: "University of Hertfordshire", country: "United Kingdom", image: "/images/testimonials/ali-hamza.jpeg" },
  { name: "Zeeshan Ali Shah", program: "MSc Data Science", university: "University of Gloucestershire", country: "United Kingdom", image: "/images/testimonials/zeeshan-ali-shah.jpeg" },
  { name: "Fahad Shaikh", program: "International Foundation Year in Managing and Economics", university: "Royal Holloway, University of London", country: "United Kingdom", image: "/images/testimonials/fahad-shaikh.jpeg" },
  { name: "Muhsin Hussain", program: "Master in Law", university: "University of Hertfordshire", country: "United Kingdom", image: "/images/testimonials/muhsin-hussain.jpeg" },
  { name: "Sana Abbasi", program: "MSc Cyber Security", university: "University of Gloucestershire", country: "United Kingdom", image: "/images/testimonials/sana-abbasi.jpeg" },
  { name: "Ali Jessani", program: undefined, university: "Teesside University", country: "United Kingdom", image: "/images/testimonials/ali-jessani.jpeg" },
  { name: "Aqsa Ishaq", program: "MBA in Global Business", university: "University of Gloucestershire", country: "United Kingdom", image: "/images/testimonials/aqsa-ishaq.jpeg" },
  { name: "Waqar Lund", program: "MSc Global Sustainability Engineering", university: "Heriot-Watt University", country: "United Kingdom", image: "/images/testimonials/waqar-lund.jpeg" },
  { name: "Mr. Inayat Ali Mirza", program: "LLM (Master of Laws)", university: "University of Hertfordshire", country: "United Kingdom", image: "/images/testimonials/mr.inayat-ali-mirza.jpeg" },
  { name: "Basit Ali", program: "BSc (Hons) Computer Science including International Year One (Computing)", university: "Teesside University", country: "United Kingdom", image: "/images/testimonials/basit-ali.jpeg" },
  { name: "Tabish Shoukat", program: "International Year One Computing", university: "University of Sussex", country: "United Kingdom", image: "/images/testimonials/tabish-shoukat.jpeg" },
  { name: "Mr. Muhammad Ali", program: "MSc International Business Management", university: "University of East London", country: "United Kingdom", image: "/images/testimonials/muhammad-ali.jpeg" },
] as const;

export const faqs = [
  {
    q: "How long does the student visa process take?",
    a: "It varies by country and intake. We give you a realistic timeline for your specific destination.",
  },
  {
    q: "Do you help with scholarships too?",
    a: "Yes, identifying, applying, and strengthening your scholarship applications is part of our standard guidance.",
  },
  {
    q: "Is Apex accredited?",
    a: "Yes. We hold ICEF Agency Status (IAS #4511), independently verifiable at accreditations.icef.com.",
  },
  {
    q: "What does it cost to get started?",
    a: "Your first consultation is free, with no obligation.",
  },
  {
    q: "What happens if my visa gets rejected?",
    a: "Visa refusals happen, even with strong applications. If it does, our team reviews the refusal reason with you, strengthens your file, and helps you reapply or explore other options.",
  },
] as const;

export const contactFormDestinations = [
  "UK",
  "USA",
  "Canada",
  "Australia",
  "New Zealand",
  "China",
  "Ireland",
  "Italy",
  "Germany",
  "France",
  "UAE",
  "Spain",
  "Netherlands",
  "Finland",
  "Sweden",
  "Malaysia",
  "South Korea",
  "North Cyprus",
  "South Cyprus",
  "Other",
] as const;
