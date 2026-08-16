// Central source of truth for Apex Consulting Services facts: contact
// details, offices, stats, and site copy. Figures here are the client's
// published information, not placeholders — confirm with Apex before
// changing them. See destinations-data.ts and services-data.ts for the
// larger structured content sets.

import { destinations as destinationList } from "./destinations-data";
import { services as serviceList } from "./services-data";

export const site = {
  name: "Apex Consulting Services",
  shortName: "Apex",
  domain: "apexconsultants.org",
  url: "https://apexconsultants.org",
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
  hours: "Monday to Friday, 10am to 6pm",
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

// The fourth stat is intentionally qualitative rather than a made-up
// percentage — replace with a real figure once Apex provides one.
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
  vision: {
    intro:
      "We want every capable student in Pakistan to know that a leading university abroad is a realistic option, not just an aspiration, and to have a trustworthy team beside them from the first conversation to the day they settle into their new city.",
    points: [
      "A future where distance and unfamiliar systems no longer hold students back",
      "Honest guidance over sales targets, even when that means recommending a different path",
      "Long-term relationships with students that outlast a single application cycle",
      "A reputation built on outcomes our counselors are willing to stand behind",
    ],
  },
  globalFocus: {
    intro:
      "Our counselors track admissions, visa policy, and cost-of-living changes across every region we support, so the advice you get reflects what's actually happening this intake, not what was true a year ago.",
    points: [
      "Guidance across 50+ countries, with 19 dedicated destination guides covering the UK, USA, Canada, Australia, and further afield",
      "Coverage spanning North America, the UK and Ireland, Northern and Southern Europe, the Gulf, and East and Southeast Asia",
      "Counselors who specialize by region, so you're advised by someone who actually knows that destination's process",
      "Continuous monitoring of visa policy and immigration rule changes across our supported destinations",
    ],
  },
  studentFirst: {
    intro:
      "Every recommendation starts with your academic profile, budget, and goals, not with which university pays the highest commission. If a partner institution isn't the right fit for you, we'll say so.",
    points: [
      "Personalized counseling based on your actual academic record and finances, not a generic checklist",
      "Transparent conversations about costs, scholarship realism, and visa risk before you commit to anything",
      "One point of contact who stays with you from your first consultation through to arrival",
      "No pressure to enrol before you're ready to make an informed decision",
    ],
  },
} as const;

// Curated 4-highlight homepage summary. The full 9-service breakdown lives
// in services-data.ts and powers the individual service pages.
export const homeServiceHighlights = [
  {
    number: "01",
    icon: "admission",
    slug: "admission-guidance",
    title: "Admission Services & Partner Universities",
    body: "We help you choose the right course and institution as authorized representatives for partner colleges and universities abroad, with a student-first focus.",
  },
  {
    number: "02",
    icon: "visa",
    slug: "student-visa-assistance",
    title: "Visa Filing & Interview Assistance",
    body: "Hands-on support for visa application preparation and visa interview coaching, so you are ready for the questions that matter.",
  },
  {
    number: "03",
    icon: "travel",
    slug: "pre-departure-after-arrival",
    title: "Pre- & Post-Departure, Travel & Stay",
    body: "Guidance on pre- and post-departure steps, airline ticketing, and accommodation options suited to your budget.",
  },
  {
    number: "04",
    icon: "test-prep",
    slug: "test-preparation",
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

// Real students and universities, used with Apex's permission. Two students
// from the full success-stories list don't have a usable photo on file, so
// they're omitted here rather than shown with a placeholder image.
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
    q: "When should I start my student visa process?",
    a: "As soon as you accept your university offer. Most destinations expect financial and supporting documents close to the intake date, so we recommend starting at least 2 to 3 months before your intended departure, earlier for destinations with additional steps like the UK's Immigration Health Surcharge or Germany's APS certificate.",
  },
  {
    q: "What documents are normally required for a student visa?",
    a: "Typically a valid passport, your university admission/acceptance letter, proof of financial means, academic transcripts, and proof of English (or the local language's) proficiency. Some destinations also require a medical exam, police clearance, or a specific visa-application form. We confirm the exact list for your destination before you apply.",
  },
  {
    q: "Do visa requirements differ by country?",
    a: "Yes, significantly. Financial evidence thresholds, required documents, interview requirements, and processing steps vary by destination, and sometimes by intake. Each of our destination guides sets out what applies specifically to that country.",
  },
  {
    q: "How long does student visa processing usually take?",
    a: "It varies by country, embassy workload, and intake season, from a couple of weeks in some destinations to a few months in others. We give you a realistic timeline for your specific destination once we know your intake.",
  },
  {
    q: "What financial documentation may be needed?",
    a: "Most destinations expect bank statements, sponsor letters, or proof of a loan/scholarship covering tuition and living costs, formatted the way that country's immigration authority expects. Our Financial Assistance service helps you prepare this correctly before you apply.",
  },
  {
    q: "Is an English language test required?",
    a: "Most destinations require IELTS, PTE, TOEFL, or an equivalent, though requirements vary by university and, in some cases, by your prior education. Some institutions accept a Medium of Instruction (MOI) letter instead. We confirm what your specific university and visa category require.",
  },
  {
    q: "What happens after I receive my university admission offer?",
    a: "You move into financial planning and visa preparation: gathering documents, formatting financial evidence, and, where required, preparing for a visa interview. Our team stays with you through this stage rather than handing you off after admission.",
  },
  {
    q: "Can students work while studying abroad?",
    a: "In most destinations, yes, generally part-time during term and longer hours during scheduled breaks, though exact limits depend on your destination and visa type. We confirm the current work-rights rules for your specific visa before you travel.",
  },
  {
    q: "Can family members accompany students abroad?",
    a: "This depends on the destination, your course level, and program length. Some countries allow spouses or dependants to apply for their own visa alongside eligible students, others restrict it to postgraduate research students or don't permit it at all. We'll tell you honestly whether it applies to your situation.",
  },
  {
    q: "Do you help with scholarships too?",
    a: "Yes. Identifying, applying, and strengthening your scholarship applications is part of our standard guidance, alongside your course and visa planning.",
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
  {
    q: "How can your team assist with the visa process?",
    a: "We prepare and review your documentation, format your financial evidence, run mock interviews where a destination requires one, and keep track of policy changes so your application reflects current requirements, not outdated ones.",
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
