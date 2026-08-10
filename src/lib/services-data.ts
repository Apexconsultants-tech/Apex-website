// Real per-service facts extracted from the live apexconsultants.org service
// pages (crawled 2026-08-09), rewritten to remove em dashes.

export type ServiceFaq = { q: string; a: string };
export type ServiceInclude = { title: string; body: string };

export type ServiceData = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  whyChoose: string[];
  body: string[];
  includes: ServiceInclude[];
  faqs: ServiceFaq[];
};

export const services: ServiceData[] = [
  {
    slug: "student-services",
    name: "Student Services",
    headline: "Your study abroad journey, handled end to end",
    intro:
      "Studying abroad involves more than an admission offer. Choosing the right country, preparing documents, applying for a visa, and settling into a new life all take careful planning. Apex Consultants manages every step, so you're never navigating it alone.",
    whyChoose: [
      "Personalized counseling based on your academic profile",
      "One team, every stage, from course selection to visa approval",
      "Scholarship and financial planning guidance",
      "Continued support before and after departure",
    ],
    body: [
      "It starts with choosing the right fit. Our Course Guidance team compares programs, tuition, and career outcomes so your decision is informed, not rushed. Once you've shortlisted universities, Admission Guidance handles your application prep, document review, and submissions.",
      "If you need to meet language requirements, our Test Preparation support gets you the IELTS or PTE score your university actually requires. Affordability is often the biggest question mark. Financial Assistance helps you explore scholarships, estimate costs, and plan your budget with clarity.",
      "Once you're accepted, Student Visa Assistance walks you through documentation, financial evidence, and interview prep, with counselors who stay current on shifting immigration rules. Our support doesn't stop at visa approval. Pre-Departure & After Arrival guidance covers travel, accommodation, and settling in.",
    ],
    includes: [
      { title: "Free initial counseling", body: "One-on-one sessions to understand your goals, budget, and preferred destinations." },
      { title: "Document preparation", body: "Help compiling transcripts, references, statements of purpose, and supporting documents." },
      { title: "Application management", body: "We prepare, review, and submit your applications and track them to a decision." },
      { title: "Accommodation guidance", body: "Options suited to your budget near your chosen university." },
      { title: "Ongoing communication", body: "Regular updates by phone, WhatsApp, and email at every stage." },
      { title: "After-enrolment support", body: "We remain available for guidance even after you begin your studies." },
    ],
    faqs: [
      { q: "What services does Apex Consultants provide?", a: "Course guidance, admissions support, test prep, scholarships, visa assistance, career counseling, and pre-departure support, all under one team." },
      { q: "Do you help with scholarships?", a: "Yes, as part of our Financial Assistance service." },
      { q: "Do you support me after my visa is approved?", a: "Yes, through Pre-Departure & After Arrival guidance." },
    ],
  },
  {
    slug: "test-preparation",
    name: "Test Preparation",
    headline: "The score you actually need, not just a high one",
    intro:
      "Most universities and visa applications require proof of language proficiency, usually English, but German for programs taught in Germany and Austria. Our Test Preparation service gets you ready for the exact exam your program and destination require.",
    whyChoose: [
      "IELTS Preparation",
      "PTE Academic Preparation",
      "TOEFL iBT Preparation",
      "Duolingo English Test Guidance",
      "German Language Preparation",
      "Mock Tests & Score Improvement",
    ],
    body: [
      "IELTS Preparation covers Academic and General modules, with practice tests and one-on-one feedback. PTE Academic Preparation focuses on computer-based test strategies for faster results, while TOEFL iBT Preparation supports universities that specifically require it, mainly in the US.",
      "Duolingo English Test Guidance helps for institutions accepting it as an alternative. German Language Preparation covers Goethe-Institut, TestDaF, and DSH prep for German-taught programs in Germany and Austria.",
      "Our instructors don't just teach the test. They know the score cutoffs at each of our Partner Universities, so you're prepping for the score you need, not guessing at a target.",
    ],
    includes: [
      { title: "IELTS preparation", body: "Academic and General modules with practice tests and feedback." },
      { title: "PTE Academic", body: "Computer-based strategies for faster results." },
      { title: "TOEFL & Duolingo", body: "Support for universities that require TOEFL or accept Duolingo." },
      { title: "German language prep", body: "Goethe-Institut, TestDaF, and DSH guidance for German-taught programs." },
      { title: "Score-focused planning", body: "Prep aimed at the score your university and visa actually need." },
      { title: "Mock tests", body: "Timed practice under real exam conditions." },
    ],
    faqs: [
      { q: "Do I need IELTS if I'm not applying to the UK?", a: "Most likely yes. Canada, Australia, the USA, and much of Europe accept it too, often alongside PTE or TOEFL depending on the university." },
      { q: "Can I skip the English test entirely?", a: "Some universities accept a Medium of Instruction (MOI) letter instead of a test score. Our Admission Guidance team can check if you qualify." },
      { q: "How long does preparation take?", a: "Most students need 4 to 8 weeks of focused prep, depending on their starting level and target score." },
    ],
  },
  {
    slug: "course-guidance",
    name: "Course Guidance",
    headline: "Course guidance for international students",
    intro:
      "Choosing the right course is one of the most important decisions in your study abroad journey. Apex Consultants helps you find a program that matches your academic background, career goals, budget, and preferred study destination.",
    whyChoose: [
      "Experienced education counselors",
      "Guidance for 50+ study destinations",
      "Personalized course recommendations",
      "Transparent and student-focused advice",
      "End-to-end support from course selection to admission",
    ],
    body: [
      "Whether you're planning to study in the UK, USA, Canada, Australia, Germany, Ireland, France, Spain, Malaysia, China, South Korea, or other leading destinations, our experienced counselors provide personalized guidance to help you make the right choice.",
      "Our course guidance includes personalized career and academic counseling, course recommendations based on your interests, university and country comparison, admission requirement guidance, tuition fee and scholarship advice, and future career and post-study opportunities.",
      "We support assistance for Bachelor's, Master's, PhD, diploma, and language programs, and we don't only recommend partner universities. We recommend universities based on your profile and goals.",
    ],
    includes: [
      { title: "Profile assessment", body: "A realistic review of your academics, test scores, and experience." },
      { title: "Program shortlisting", body: "Courses matched to your goals from our partner network." },
      { title: "Career outcome focus", body: "Recommendations based on employability and post-study work rights." },
      { title: "Budget planning", body: "Tuition and living cost comparisons across destinations." },
      { title: "Intake planning", body: "Choosing the intake that fits your timeline and preparation." },
      { title: "Alternative pathways", body: "Foundation, diploma, and transfer routes when needed." },
    ],
    faqs: [
      { q: "How do I choose the right course?", a: "Our counselors evaluate your education, career goals, interests, and budget to recommend the most suitable options." },
      { q: "Do you only recommend partner universities?", a: "No. We recommend universities based on your profile and goals, not just partnerships." },
      { q: "Can you help with scholarships?", a: "Yes. We identify scholarship opportunities available for eligible students and guide you through the application process." },
    ],
  },
  {
    slug: "admission-guidance",
    name: "Admission Guidance",
    headline: "Applications done right, the first time",
    intro:
      "A strong profile can still get rejected over a missed document or a late deadline. Our admission guidance handles your applications end to end, so nothing slips through.",
    whyChoose: [
      "Document preparation and review (SOPs, transcripts, references)",
      "Application submission across multiple universities",
      "Deadline tracking so nothing is missed",
      "Direct coordination with university admissions offices",
    ],
    body: [
      "Once your course is finalized through Course Guidance, we prepare your complete application, SOPs, transcripts, recommendation letters, and university-specific requirements, and review everything before submission.",
      "We track every deadline across your shortlisted universities and follow up directly with institutions where needed, so you're never left wondering about your application status.",
      "Universities reject strong students over avoidable errors: incomplete documents, missed deadlines, generic SOPs. We catch these before submission, not after rejection.",
    ],
    includes: [
      { title: "Document preparation and review", body: "SOPs, transcripts, and references, prepared and checked before submission." },
      { title: "Application submission", body: "Across multiple universities, managed from one place." },
      { title: "Deadline tracking", body: "So nothing is missed across your shortlisted institutions." },
      { title: "Direct university coordination", body: "We follow up directly with admissions offices where needed." },
    ],
    faqs: [
      { q: "Can you help with my Statement of Purpose?", a: "Yes. We review and refine your SOP so it reflects your actual strengths, not a generic template." },
      { q: "How many universities can I apply to?", a: "As many as make sense for your profile and budget. We help you decide the right number, not just the maximum." },
      { q: "What happens after I'm accepted?", a: "You move directly into Student Visa Assistance with the same team." },
    ],
  },
  {
    slug: "financial-assistance",
    name: "Financial Assistance",
    headline: "Plan your budget before you commit",
    intro:
      "Studying abroad is a major investment, and unclear costs cause more stress than the application itself. Our financial assistance service helps you understand exactly what you'll spend, and where you can save.",
    whyChoose: [
      "Full cost breakdown",
      "Scholarship and grant matching based on your profile",
      "Financial documentation prep for visa applications",
      "Guidance on education loans and sponsor requirements",
    ],
    body: [
      "We break down tuition, living costs, and hidden expenses for your specific university and country, so there are no surprises after enrollment. Where eligible, we identify scholarships, grants, and fee waivers tied to your academic profile, factored in early during Course Guidance.",
      "We also help you prepare the financial documentation required for both your university application and your Student Visa Assistance: proof of funds, sponsor letters, and bank statements, formatted the way immigration officers expect to see them.",
      "Visa refusals often come down to weak or unclear financial evidence, not lack of funds, but poor documentation. We make sure your paperwork reflects your actual financial standing clearly.",
    ],
    includes: [
      { title: "Full cost breakdown", body: "Tuition, living expenses, and one-off fees." },
      { title: "Scholarship and grant matching", body: "Based on your profile and destination." },
      { title: "Financial documentation prep", body: "For visa applications, formatted correctly." },
      { title: "Loan and sponsor guidance", body: "Education loan options and sponsor requirements." },
    ],
    faqs: [
      { q: "Can you help me find scholarships?", a: "Yes. We match you to scholarships and grants you're actually eligible for, based on your academic profile." },
      { q: "What financial documents will I need?", a: "Typically proof of funds, sponsor letters, and bank statements. We tell you exactly what your destination country requires." },
      { q: "Will this affect my visa application?", a: "Yes. Strong financial documentation directly supports your Student Visa Assistance application." },
    ],
  },
  {
    slug: "career-counseling",
    name: "Career Counseling",
    headline: "Choose a degree that leads somewhere",
    intro:
      "A degree should open doors, not just fill four years. Our career counseling connects your course choice to real industry demand and where it can actually take you after graduation.",
    whyChoose: [
      "Career pathway mapping based on your field of study",
      "Industry demand and job market insights per destination",
      "Post-study work rights guidance by country",
      "Support comparing career outcomes across course options",
    ],
    body: [
      "Before you finalize a program through Course Guidance, we look at where the degree leads: job markets, in-demand skills, and post-study work rights in your target country. This isn't generic advice; it's based on your specific field and destination.",
      "For students unsure between multiple career paths, we map out realistic outcomes for each: salary expectations, industry growth, and further study options, so you're choosing based on evidence, not guesswork.",
      "Many students choose a course based on rankings or trends, then discover limited job prospects too late. We help you factor career reality into the decision upfront.",
    ],
    includes: [
      { title: "Career pathway mapping", body: "Based on your field of study and destination." },
      { title: "Industry demand insights", body: "Job market data specific to your target country." },
    ],
    faqs: [
      { q: "How does career counseling work?", a: "We assess your field of interest against real job market data and post-study opportunities in your target country." },
      { q: "Is this separate from course guidance?", a: "It works alongside Course Guidance. Career fit is one of the factors we weigh before recommending a program." },
    ],
  },
  {
    slug: "student-visa-assistance",
    name: "Student Visa Assistance",
    headline: "Your visa, handled with precision",
    intro:
      "An admission offer means nothing without an approved visa. Our student visa assistance service manages the entire process, documentation, financial evidence, and interview prep, so your application is accurate the first time.",
    whyChoose: [
      "Complete documentation review and preparation",
      "Financial evidence formatting for visa requirements",
      "Interview preparation where applicable",
      "Up-to-date guidance on changing immigration policy",
      "Support with reapplication in case of refusal",
    ],
    body: [
      "Once you're accepted through Admission Guidance, we prepare your complete visa file, application forms, supporting documents, and the financial evidence built during Financial Assistance, formatted exactly the way immigration officers expect.",
      "We stay current on visa policy changes for every destination we support, so you're never working off outdated requirements. Where interviews are required, we run mock sessions to prepare you for common questions.",
      "If a visa is refused, we don't leave you to start over alone. We review the refusal reason with you, strengthen your file, and guide you through reapplying.",
    ],
    includes: [
      { title: "Documentation review", body: "Complete preparation and review before submission." },
      { title: "Financial evidence formatting", body: "Built directly from your Financial Assistance file." },
      { title: "Interview preparation", body: "Mock sessions where a visa interview is required." },
      { title: "Policy guidance", body: "Up to date on changing immigration requirements per country." },
      { title: "Reapplication support", body: "If a visa is refused, we help you strengthen and reapply." },
    ],
    faqs: [
      { q: "What if my visa gets rejected?", a: "We review the refusal reason with you, strengthen your application, and support you through reapplying." },
      { q: "Do all countries require a visa interview?", a: "No, it varies by country. We tell you upfront whether your destination requires one and prepare you accordingly." },
    ],
  },
  {
    slug: "pre-departure-after-arrival",
    name: "Pre Departure & After Arrival",
    headline: "Support that doesn't end at your visa approval",
    intro:
      "Getting your visa approved is a milestone, not the finish line. Our pre-departure and after-arrival support prepares you for the practical realities of moving abroad, so you start your studies with confidence, not confusion.",
    whyChoose: [
      "Pre-departure briefing",
      "Accommodation guidance near your university",
      "Banking, SIM, and local registration support after arrival",
      "Ongoing point of contact during your first weeks abroad",
      "Orientation guidance tied to your specific university",
    ],
    body: [
      "Before you fly, we walk you through what to pack, travel documentation, currency and banking setup, and what to expect in your first few weeks. We also guide you on accommodation options near your university.",
      "Once you land, our support continues, covering local registration requirements, opening a bank account, SIM cards, and getting oriented in your new city. If questions come up in your first weeks abroad, our team remains a point of contact.",
      "The biggest culture shock isn't academic, it's logistical. Knowing what to expect before you land makes the transition far smoother.",
    ],
    includes: [
      { title: "Pre-departure briefing", body: "Packing, documentation, and travel preparation." },
      { title: "Accommodation guidance", body: "Options near your university before you arrive." },
      { title: "Post-arrival support", body: "Banking, SIM cards, and local registration." },
      { title: "Ongoing point of contact", body: "Support during your first weeks abroad." },
    ],
    faqs: [
      { q: "Do you help me find accommodation?", a: "Yes. We guide you toward accommodation options near your university before you arrive." },
      { q: "Is support available after I land?", a: "Yes. We help with local registration, banking, SIM cards, and remain a point of contact during your first weeks." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
