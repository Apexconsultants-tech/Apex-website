// Real per-country facts extracted from the live apexconsultants.org destination
// pages (crawled 2026-08-09). Rewritten for clarity and to remove em dashes.
// Nothing here is invented. UK/USA/Canada/Australia/New Zealand carry full
// depth to match the source site; the remaining destinations are presented
// at the depth the source content actually supports, honestly.

export type FaqItem = { q: string; a: string };
export type WhyPoint = { title: string; body: string };
export type University = { name: string; note?: string };

export type Destination = {
  slug: string;
  name: string;
  short: string;
  flag: string;
  region: string;
  heroStats: string[];
  intro: string;
  whyPoints: WhyPoint[];
  requirements: string[];
  universities: University[];
  cost: string;
  scholarships: string[];
  visaName: string;
  visaRequirements: string[];
  postStudyWork: string;
  faqs: FaqItem[];
};

export const destinations: Destination[] = [
  {
    slug: "study-in-uk",
    name: "United Kingdom",
    short: "UK",
    flag: "gb",
    region: "Popular",
    heroStats: ["150+ Universities", "GBP 10,000 to GBP 30,000 annual tuition", "2 to 3 years Graduate Route (post-study work)"],
    intro:
      "The United Kingdom is one of the world's most popular study destinations, home to some of the oldest and most respected universities on earth. With globally ranked institutions, rigorous academic standards, and a genuinely multicultural student experience, Apex Consulting Services guides you through every step, from university selection to visa approval.",
    whyPoints: [
      { title: "World-class, globally ranked universities", body: "Institutions like Oxford, Cambridge, and Imperial College London consistently rank among the global top 10, giving students access to a genuinely elite academic environment." },
      { title: "Rigorous, regulated quality of teaching", body: "UK universities operate under strict national quality standards, monitored by bodies like the Office for Students (OfS) and the Quality Assurance Agency (QAA)." },
      { title: "Strong research culture", body: "UK universities are consistently at the forefront of global research output, giving students real opportunities to contribute to meaningful work during their studies." },
    ],
    requirements: [
      "A valid passport",
      "Confirmation of Acceptance for Studies (CAS) from your university",
      "Proof of financial support, per UKVI requirements",
      "Proof of English language proficiency (IELTS UKVI or equivalent)",
      "Tuberculosis (TB) test results, if required for your country",
      "Immigration Health Surcharge (IHS) payment",
    ],
    universities: [
      { name: "The University of Edinburgh" },
      { name: "University of Cambridge" },
      { name: "King's College London" },
      { name: "University of Bristol" },
    ],
    cost:
      "Annual tuition fees typically range from GBP 10,000 to GBP 30,000, depending on your course, university, and city. Many UK universities also offer flexible fee installment plans, letting you split tuition payments across the academic year.",
    scholarships: [
      "Chevening Scholarships, a fully funded UK government scholarship covering one-year postgraduate study in any discipline",
      "Commonwealth Scholarships, funding for master's and PhD study for students from developing Commonwealth nations like Pakistan",
      "University Merit Scholarships, partial to full tuition awards based on academic merit",
      "Need-Based Bursaries, additional financial support at select universities",
    ],
    visaName: "UK Student Visa",
    visaRequirements: [
      "A valid passport",
      "Confirmation of Acceptance for Studies (CAS)",
      "Proof of financial support for tuition and living costs",
      "Proof of English language proficiency",
      "Tuberculosis test results, if required",
      "Immigration Health Surcharge payment and biometric information",
    ],
    postStudyWork:
      "The UK's Graduate Route allows international students to stay and work after completing their degree: 2 years for Bachelor's and Master's graduates, 3 years for PhD graduates, with no sponsorship required during this period.",
    faqs: [
      { q: "How much study gap is acceptable in the UK?", a: "UK universities generally accept a study gap of 2 to 3 years for undergraduate programs, and longer for postgraduate courses, provided it's well explained with supporting documentation." },
      { q: "Can I work while studying in the UK?", a: "Yes. Most full-time students on a Student Visa can work up to 20 hours per week during term and full-time during scheduled breaks." },
      { q: "What IELTS score do I need for a UK student visa?", a: "The minimum UKVI-approved level is B2 (around IELTS 5.5 overall), though most universities require 6.0 to 7.0 overall depending on the course." },
      { q: "How long does a UK student visa take to process from Pakistan?", a: "Standard processing typically takes up to 3 weeks. Priority services, where available, can reduce this significantly." },
    ],
  },
  {
    slug: "study-in-usa",
    name: "United States",
    short: "USA",
    flag: "us",
    region: "Popular",
    heroStats: ["250+ Universities & colleges", "$10,000 to $40,000 annual tuition", "Up to 3 years post-study work (OPT)"],
    intro:
      "The United States hosts over 1.1 million international students and remains the world's top study destination. With 250+ universities, flexible programs, strong scholarships, and excellent post-study work options through OPT, Apex Consulting Services guides you from university selection to F-1 visa approval.",
    whyPoints: [
      { title: "Academic flexibility", body: "Flexible program structures let you explore subjects before committing to a major, alongside strong research output and globally respected degrees." },
      { title: "Post-study work through OPT", body: "Optional Practical Training gives graduates real, structured work authorization in their field of study." },
      { title: "Diverse campus communities", body: "Universities are known for academic excellence and campuses that carry weight with employers everywhere." },
    ],
    requirements: [
      "High school or bachelor's transcripts, depending on program level",
      "Standardized test scores (SAT/ACT for undergraduate, GRE/GMAT for graduate, where required)",
      "English proficiency scores (TOEFL/IELTS/PTE)",
      "Statement of Purpose",
      "Letters of Recommendation",
      "Updated resume/CV and application fee",
    ],
    universities: [
      { name: "Johns Hopkins University", note: "Research and medicine" },
      { name: "University of California, Los Angeles (UCLA)" },
      { name: "New York University" },
      { name: "Northeastern University", note: "Co-op program" },
      { name: "Boston University" },
    ],
    cost:
      "Annual tuition for international students typically ranges from $10,000 to $40,000, depending on the university, program level, and whether it's public or private. Living expenses generally add $10,000 to $22,000 per year.",
    scholarships: [
      "University Merit Scholarships, partial to full tuition waivers based on academic performance",
      "Fulbright Program, a US government-funded scholarship for graduate study and research",
      "Need-Based Financial Aid at select universities",
      "External scholarships for Pakistani students, when available",
    ],
    visaName: "F-1 Student Visa",
    visaRequirements: [
      "A valid passport",
      "Form I-20, issued by your university after acceptance",
      "Completed DS-160 online visa application",
      "SEVIS I-901 fee payment receipt",
      "Proof of financial support and academic transcripts",
      "Visa interview at the US Embassy or Consulate",
    ],
    postStudyWork:
      "F-1 students can apply for Optional Practical Training (OPT): 12 months standard, with STEM graduates eligible for a 24-month extension, up to 36 months total, filed through your university's Designated School Official and USCIS.",
    faqs: [
      { q: "Can I study in the USA on a B1/B2 visa?", a: "No. You must apply for an F-1 (or J-1 for exchange programs) student visa to study in the USA." },
      { q: "Can international students work while studying?", a: "Yes. F-1 students can work up to 20 hours per week on campus during term, and full-time during breaks." },
      { q: "Is it possible to study in the USA without IELTS?", a: "Some universities accept alternatives like TOEFL, PTE, or a Medium of Instruction letter." },
      { q: "How long does the USA student visa process take?", a: "After receiving your I-20, processing typically takes several weeks. We recommend starting at least 3 to 4 months before your intake." },
    ],
  },
  {
    slug: "study-in-canada",
    name: "Canada",
    short: "Canada",
    flag: "ca",
    region: "Popular",
    heroStats: ["100+ Partner universities", "CAD 15,000 to CAD 40,000 annual tuition", "Up to 3 years Post-Graduation Work Permit"],
    intro:
      "From globally ranked universities to affordable tuition and a clear path to permanent residency, Canada offers one of the most attractive education systems in the world. As trusted Study in Canada Consultants, Apex Consulting Services guides you through every step, from university selection to study permit approval.",
    whyPoints: [
      { title: "Globally recognized programs", body: "Institutions like the University of Toronto, McGill, and UBC lead global rankings, and Canadian degrees are widely recognized by employers worldwide." },
      { title: "Affordable relative to other Western countries", body: "Tuition sits below equivalent programs in the US, UK, or Australia for many fields." },
      { title: "Strong permanent residency pathways", body: "Canada offers some of the clearest routes from graduation to long-term settlement of any major destination." },
    ],
    requirements: [
      "Minimum 12 years of education (HSSC/Intermediate or A-Levels) for undergraduate",
      "Academic transcripts with at least 60 to 70% marks",
      "IELTS Academic, minimum 6.0 overall for undergraduate, 6.5 for postgraduate",
      "Statement of Purpose and letters of recommendation",
      "Bachelor's degree with a minimum GPA of 2.5 to 3.0 for postgraduate applicants",
    ],
    universities: [
      { name: "University of Toronto" },
      { name: "University of British Columbia" },
      { name: "McGill University" },
      { name: "University of Waterloo" },
      { name: "McMaster University" },
    ],
    cost:
      "Annual tuition typically ranges from CAD 15,000 to CAD 40,000, depending on your program level and institution. Living expenses run up to approximately CAD 15,000 per year, with Toronto and Vancouver running higher.",
    scholarships: [
      "Vanier Canada Graduate Scholarships",
      "University of Toronto International Scholars Program",
      "York University International Student Scholarships",
      "Lester B. Pearson International Scholarships",
    ],
    visaName: "Canadian Study Permit",
    visaRequirements: [
      "Valid passport and Letter of Acceptance from a Designated Learning Institution",
      "Proof of funds (tuition plus living expenses, per current IRCC requirements)",
      "IELTS Test Report Form and Statement of Purpose",
      "Police clearance certificate, if applicable",
      "Medical examination report",
      "Biometrics and visa application fee payment",
    ],
    postStudyWork:
      "Graduates are eligible for a Post-Graduation Work Permit (PGWP) of up to 3 years, depending on program length, giving graduates a faster route toward permanent residency than many other destinations.",
    faqs: [
      { q: "Can I get PR while studying in Canada?", a: "Not directly, but international students can gain points toward permanent residency through programs like the Canadian Experience Class within Express Entry after graduating." },
      { q: "How much can I earn in Canada while studying?", a: "International students can work up to 20 hours per week during academic sessions and full-time during scheduled breaks, typically earning CAD 14 to 20 per hour." },
      { q: "Can I bring my spouse to Canada on a student visa?", a: "Yes, if you're enrolled full-time in a master's or doctoral program. Your spouse can then apply for an open work permit." },
      { q: "What IELTS score is needed to study in Canada?", a: "Most universities require 6.0 to 6.5 overall, with top universities like Toronto and UBC requiring 6.5 to 7.0." },
    ],
  },
  {
    slug: "study-in-australia",
    name: "Australia",
    short: "Australia",
    flag: "au",
    region: "Popular",
    heroStats: ["100+ Partner universities", "AUD 20,000 to AUD 50,000 annual tuition", "2 to 4 years post-study work visa"],
    intro:
      "Australia has grown into one of the most popular destinations for international students seeking a world-class education and a genuinely life-changing experience. As trusted Study in Australia Consultants, Apex Consulting Services breaks down everything you need to know and guides you through every step.",
    whyPoints: [
      { title: "Top-ranked institutions", body: "The education system places heavy emphasis on academic rigor, innovation, and research output, and Australian graduates are in strong demand with employers globally." },
      { title: "The Group of Eight (Go8)", body: "Australia's eight most research-intensive universities, formed in 1999, consistently rank among the world's best." },
      { title: "Genuinely multicultural society", body: "A welcoming, diverse student experience across every major city." },
    ],
    requirements: [
      "A valid passport copy and official academic transcripts",
      "English language proficiency (IELTS or PTE)",
      "Letters of recommendation and a statement of purpose",
      "A resume/CV, if applicable",
      "Bank statements with supporting financial documentation",
    ],
    universities: [
      { name: "The University of Melbourne" },
      { name: "UNSW Sydney" },
      { name: "The University of Queensland" },
      { name: "The University of Sydney" },
      { name: "Monash University" },
      { name: "The University of Western Australia" },
    ],
    cost:
      "Undergraduate tuition typically ranges from AUD 20,000 to AUD 50,000 per year, while living expenses average around AUD 24,000 to 25,000 annually. Students on a Subclass 500 visa can work up to 48 hours per fortnight during term time.",
    scholarships: [
      "University merit-based awards covering up to 30% of tuition and living costs, depending on academic profile and program",
    ],
    visaName: "Student Visa (Subclass 500)",
    visaRequirements: [
      "Enrolment in a full-time course registered under CRICOS",
      "Genuine Student (GS) requirement, demonstrating genuine intent to study",
      "Overseas Student Health Cover (OSHC) for your entire stay",
      "Valid passport and Confirmation of Enrolment (CoE)",
      "Proof of English proficiency and financial capacity",
    ],
    postStudyWork:
      "Bachelor's graduates can apply for a Post-Study Work visa (Subclass 485) for 2 to 4 years, and Master's graduates are typically eligible for 3 to 5 years, depending on course and study location.",
    faqs: [
      { q: "Can I bring my spouse or children to Australia on a student visa?", a: "Yes. Your spouse or de facto partner can apply for a Student Dependent Visa and work up to 48 hours per fortnight." },
      { q: "How much study gap is acceptable in Australia?", a: "Generally up to two years for undergraduate programs, and longer for postgraduate programs, provided the gap is well explained." },
      { q: "Can I apply for PR after studying in Australia?", a: "Yes, though not automatically. Graduates typically transition through post-study work visas and meet criteria such as regional work experience or state nomination." },
      { q: "What IELTS or PTE score is required?", a: "There's no single fixed score. Most universities require IELTS 6.0 to 6.5 overall or equivalent PTE Academic scores." },
    ],
  },
  {
    slug: "study-in-new-zealand",
    name: "New Zealand",
    short: "New Zealand",
    flag: "nz",
    region: "Popular",
    heroStats: ["NZ$27,000 to NZ$45,000 annual tuition", "Up to 3 years post-study work visa"],
    intro:
      "New Zealand combines internationally recognised degrees with a safe, welcoming environment. With research-driven universities, three intakes a year, and generous post-study work rights, Apex Consulting Services guides you from university selection to student visa approval.",
    whyPoints: [
      { title: "High academic standards", body: "Universities emphasise critical thinking and practical learning, backed by qualified faculty and modern facilities." },
      { title: "Three intakes a year", body: "More flexibility to plan your application timeline than most single-intake destinations." },
      { title: "Straightforward part-time work rights", body: "A clear pathway to post-study work rounds out a well-balanced option for Pakistani students." },
    ],
    requirements: [
      "Academic transcripts (secondary school or bachelor's, depending on program level)",
      "English proficiency scores (IELTS/PTE)",
      "Statement of Purpose and letters of recommendation",
      "Updated resume/CV and application fee",
    ],
    universities: [
      { name: "University of Auckland", note: "Largest and highest-ranked" },
      { name: "University of Otago", note: "Medicine, dentistry, life sciences" },
      { name: "Victoria University of Wellington", note: "Law, public policy" },
      { name: "University of Canterbury", note: "Engineering" },
    ],
    cost:
      "Annual tuition typically ranges from NZ$27,000 to NZ$45,000, depending on the university and program level. You'll need to show a bank statement covering one year's tuition plus NZ$20,000 in living expenses for your visa.",
    scholarships: [
      "University Merit Scholarships, partial to full tuition waivers",
      "New Zealand Government Scholarships for select developing countries",
      "Faculty-specific scholarships for high-achieving students",
    ],
    visaName: "Fee-Paying Student Visa",
    visaRequirements: [
      "A valid passport",
      "Confirmed offer of place from a recognised institution",
      "Proof of funds (tuition plus NZ$20,000 living costs)",
      "English proficiency scores and medical/police clearance certificates",
    ],
    postStudyWork:
      "Graduates can apply for a post-study work visa valid for up to 3 years, open rather than tied to a single employer, with skilled work experience during this period counting toward long-term residency options.",
    faqs: [
      { q: "What are the intakes for New Zealand universities?", a: "New Zealand universities generally admit students in February, July, and November each year." },
      { q: "Can international students work while studying?", a: "Yes. Students can work up to 25 hours per week during the academic year." },
      { q: "Is it possible to study in New Zealand without IELTS?", a: "Some universities accept alternatives like PTE or proof of prior study in English-medium institutions." },
    ],
  },
  {
    slug: "study-in-china",
    name: "China",
    short: "China",
    flag: "cn",
    region: "More",
    heroStats: ["100+ Partner universities", "RMB 16,000 to RMB 40,000 annual tuition", "MBBS, BDS & fully funded nursing available"],
    intro:
      "China has rapidly become one of Asia's leading study destinations, offering internationally recognized medical, engineering, and science programs at a fraction of the cost of studying in the West. Apex Consulting Services guides Pakistani students through every step, from choosing the right university to visa approval.",
    whyPoints: [
      { title: "Affordable, high-quality education", body: "Tuition and living costs are significantly lower than in the US, UK, or Australia." },
      { title: "English-taught programs", body: "Most international programs, especially at the undergraduate level, are taught entirely in English." },
      { title: "Strong scholarship support", body: "Thousands of international students are funded each year through government and university scholarships." },
    ],
    requirements: [
      "Valid passport and academic transcripts (attested, where required)",
      "Proof of finances and health certificate/medical examination",
      "Statement of purpose or motivation letter",
      "English proficiency (IELTS/TOEFL, or a university-issued English proficiency letter)",
      "Entrance exam or interview, required by some universities for MBBS/BDS",
    ],
    universities: [
      { name: "Zhejiang University", note: "Top-ranked, broad program range" },
      { name: "Huazhong University of Science and Technology", note: "Engineering and medicine" },
      { name: "Southeast University", note: "Engineering and architecture" },
      { name: "Dalian Medical University", note: "MBBS and BDS" },
      { name: "30+ additional partner institutions", note: "MBBS, BDS, nursing, and engineering" },
    ],
    cost:
      "Annual tuition typically ranges from RMB 16,000 to RMB 40,000, depending on the program and university, with MBBS, BDS, and specialized engineering programs toward the higher end. Living expenses are notably lower in second-tier cities.",
    scholarships: [
      "Chinese Government Scholarship (CSC), covering tuition, accommodation, and often a monthly stipend",
      "Merit-based scholarships of up to RMB 20,000 per year from partner universities",
      "Fully funded options for select nursing programs",
    ],
    visaName: "X1 or X2 Student Visa",
    visaRequirements: [
      "Valid passport and Admission Notice from your Chinese university",
      "JW201 or JW202 form",
      "Physical Examination Record for Foreigners",
      "Proof of financial support",
    ],
    postStudyWork:
      "China is primarily an academic destination rather than a post-study work pathway. Once enrolled, you'll register locally and convert your visa into a Residence Permit for Study within 30 days of arrival.",
    faqs: [
      { q: "Is PMDC recognition confirmed for MBBS/BDS programs?", a: "Confirming PMDC recognition for your specific university is essential before applying, since it directly affects your ability to practice in Pakistan. Our team verifies this for every university we recommend." },
      { q: "What is the Chinese Government Scholarship?", a: "The CSC is one of the most prestigious funding options, covering tuition, accommodation, and often a monthly living stipend for eligible international students." },
    ],
  },
  {
    slug: "study-in-ireland",
    name: "Ireland",
    short: "Ireland",
    flag: "ie",
    region: "More",
    heroStats: ["100+ Universities & colleges", "EUR 9,000 to EUR 25,000 annual tuition", "Up to 2 years post-study work"],
    intro:
      "Ireland has become one of Europe's most popular study destinations, combining globally respected universities with a safe, welcoming, and genuinely friendly environment. Apex Consulting Services guides Pakistani students through every step, from university selection to visa approval.",
    whyPoints: [
      { title: "Globally recognized degrees", body: "Graduates from Irish universities are respected by employers worldwide." },
      { title: "A genuinely international campus culture", body: "Home to over 35,000 international students across the country." },
      { title: "Major global employers based in Ireland", body: "Including Google, Airbnb, Pfizer, and Dell, giving students real exposure to top companies during and after their studies." },
    ],
    requirements: [
      "High school or bachelor's transcripts, depending on program level",
      "English proficiency test scores (IELTS 6.0 to 6.5 undergraduate, 6.5 postgraduate)",
      "Statement of Purpose and letters of recommendation",
      "Updated resume/CV and application fee, where applicable",
    ],
    universities: [
      { name: "Trinity College Dublin" },
      { name: "University College Dublin" },
      { name: "University of Galway" },
      { name: "Dublin City University", note: "Business and computing" },
    ],
    cost:
      "Tuition generally ranges from EUR 9,000 to EUR 25,000 per year for undergraduate programs. Living expenses typically range from EUR 7,000 to EUR 12,000 per year, with Dublin costing more than smaller university towns.",
    scholarships: [
      "Government-funded scholarships and bursaries for international students",
      "University-specific scholarships based on academic merit",
      "Research program funding covering up to 100% of living expenses for select postgraduate research",
    ],
    visaName: "Irish Student Visa (Stamp 2)",
    visaRequirements: [
      "Valid passport and health insurance",
      "Proof of sufficient funds, including the Euro Bond (around EUR 7,000) where applicable",
      "Evidence of course fee payment and English proficiency scores",
      "Letter of Acceptance from your Irish institution",
    ],
    postStudyWork:
      "Graduates can apply for the Third Level Graduate Scheme: 1 year for Bachelor's graduates, 2 years for postgraduate (Master's and above) graduates, to remain in Ireland and look for work.",
    faqs: [
      { q: "What is the Euro Bond for Ireland?", a: "Students from certain non-EU/EEA countries, including Pakistan, must purchase a Euro Bond, typically around EUR 7,000, as proof of sufficient funds for living expenses." },
      { q: "Can Pakistani students work in Ireland while studying?", a: "Yes. Under Stamp 2 permission, you can work up to 20 hours per week during term time and 40 hours during summer and Christmas holidays." },
      { q: "How can I get PR in Ireland after studying?", a: "Graduates typically need to secure a work permit or enter a critical-skills occupation first, then apply for permanent residency after 5 years of legal work." },
    ],
  },
  {
    slug: "study-in-italy",
    name: "Italy",
    short: "Italy",
    flag: "it",
    region: "More",
    heroStats: ["English & Italian-taught degrees", "Up to 12 months post-study job search"],
    intro:
      "Italy is home to the world's oldest university, Bologna, founded in 1088, and a public education system that offers many students free or heavily discounted tuition through its income-based fee exemption scheme. Apex Consulting Services guides you through Universitaly pre-enrolment, your dichiarazione di valore, and visa approval.",
    whyPoints: [
      { title: "A thousand years of higher learning", body: "Institutions like Bologna, Padua, and Naples predate most of the world's university systems, yet run on Italy's modern 3+2 Bologna-process structure, so degrees transfer and are recognised across Europe." },
      { title: "Genuinely strong in specific fields", body: "Art and design, architecture, fashion, culinary arts, and engineering all draw international students specifically for those programs." },
      { title: "Lower cost of living", body: "Noticeably lower than the UK, France, or Germany, with easy travel across the Schengen area." },
    ],
    requirements: [
      "Academic transcripts (secondary school or bachelor's, depending on program level)",
      "Universitaly pre-enrolment, mandatory online registration for Pakistani applicants",
      "English or Italian language proficiency scores, depending on the program",
      "Dichiarazione di Valore for your previous qualification, issued by the Italian Embassy in Islamabad",
    ],
    universities: [
      { name: "University of Bologna", note: "Law, humanities, medicine" },
      { name: "Sapienza University of Rome" },
      { name: "Politecnico di Milano", note: "Engineering and architecture" },
      { name: "Bocconi University", note: "Economics, finance, management" },
    ],
    cost:
      "Public university tuition is calculated on a sliding scale tied to family income (the ISEE system), so many students pay only a small regional tax. Private universities and specialised business schools charge their own rates.",
    scholarships: [
      "ISEE-Based Fee Exemption, a full or near-full tuition waiver at public universities below the regional income threshold",
      "DSU Regional Scholarships, covering accommodation and meals",
      "Invest Your Talent in Italy, government-backed scholarships for STEM and design master's programs",
    ],
    visaName: "Italian National Visa",
    visaRequirements: [
      "A valid passport and Universitaly pre-enrolment confirmation",
      "Letter of acceptance from your Italian institution",
      "Dichiarazione di Valore, or proof of an active application",
      "Proof of financial means and accommodation in Italy",
    ],
    postStudyWork:
      "Non-EU graduates can extend their permit for up to 12 months to search for work in Italy, converting to a standard work permit once a job offer is secured, with PR eligibility after 5 years of legal residence and employment.",
    faqs: [
      { q: "What is the Dichiarazione di Valore, and who needs it?", a: "An official certificate from the Italian Embassy in Islamabad that verifies your Pakistani qualifications. Most Italian universities require it for admission, and it takes several weeks to process." },
      { q: "Is IELTS required to study in Italy?", a: "It depends on the program. English-taught courses generally require IELTS or an equivalent test, while Italian-taught programs require an Italian proficiency certificate instead." },
    ],
  },
  {
    slug: "study-in-germany",
    name: "Germany",
    short: "Germany",
    flag: "de",
    region: "More",
    heroStats: ["100+ Partner universities", "Public universities: zero tuition fee", "18-month job-seeker visa after graduation"],
    intro:
      "Germany has become one of Europe's most attractive study destinations, offering world-class education at a fraction of the cost of the UK, USA, or Australia. Apex Consulting Services guides Pakistani students through every step, from university selection to visa approval.",
    whyPoints: [
      { title: "Zero tuition at public universities", body: "A genuine rarity globally, applying to most programs including for international students." },
      { title: "Strong in engineering and technical fields", body: "Globally recognized degrees with a large, growing international student community, including a well-established Pakistani network." },
      { title: "18-month job-seeker visa", body: "One of Europe's stronger post-study work opportunities after graduation." },
    ],
    requirements: [
      "High school diploma or bachelor's degree, depending on program level",
      "English proficiency (IELTS/TOEFL) for English-taught programs, or German proficiency for German-taught programs",
      "CV/resume, motivational letter, and proof of finances (Blocked Account)",
      "Official transcripts, translated into English or German",
    ],
    universities: [
      { name: "TU Munich" },
      { name: "RWTH Aachen" },
      { name: "Heidelberg University" },
      { name: "Karlsruhe Institute of Technology" },
    ],
    cost:
      "Public universities charge zero tuition for most programs, plus a small semester contribution of EUR 150 to 300. Private universities charge EUR 7,500 to 12,000 per year. Budget roughly EUR 900 to 1,200 per month for living expenses.",
    scholarships: [
      "DAAD (German Academic Exchange Service), Germany's largest scholarship body",
      "University-specific scholarships, particularly for master's and PhD students",
      "Deutschlandstipendium, a national scholarship jointly funded by government and private sponsors",
    ],
    visaName: "German National (D) Visa",
    visaRequirements: [
      "APS Certificate, a mandatory academic document verification for applicants from Pakistan",
      "Proof of means of subsistence via a Blocked Account (Sperrkonto)",
      "Valid passport and student health insurance",
      "Proof of admission at a German institution",
    ],
    postStudyWork:
      "Graduates are eligible for an 18-month job-seeker visa to search for employment related to their field of study, transitioning to a work visa or EU Blue Card once a job offer is secured.",
    faqs: [
      { q: "Is German language necessary to study in Germany?", a: "Only if you're enrolling in a German-taught program. Many universities, especially at master's level, teach entirely in English." },
      { q: "What is the APS Certificate?", a: "A mandatory academic document verification process specific to applicants from Pakistan and a few other countries, required before applying to most German universities." },
      { q: "Can I work part-time while studying?", a: "Yes. Non-EU students can work up to 120 full days or 240 half days per year without additional work authorization." },
    ],
  },
  {
    slug: "study-in-france",
    name: "France",
    short: "France",
    flag: "fr",
    region: "More",
    heroStats: ["100+ Universities & Grandes Ecoles", "EUR 5,000 to EUR 20,000+ annual tuition", "Up to 1 year post-study job search"],
    intro:
      "France is one of the world's most popular study destinations, combining a globally respected education system with rich culture and world-class institutions. Apex Consulting Services guides you through every step, from Campus France registration to visa approval.",
    whyPoints: [
      { title: "Globally ranked institutions", body: "Including Ecole Normale Superieure, Ecole Polytechnique, and Sorbonne Universite." },
      { title: "Genuinely affordable public education", body: "Tuition far lower than the UK, USA, or Australia." },
      { title: "Strong global recognition", body: "French degrees carry particular weight in engineering, business, and the arts." },
    ],
    requirements: [
      "Applying for a DAP (Demande d'Admission Prealable) via Campus France's Etudes en France platform",
      "Official academic transcripts and standardized test scores, if required",
      "Proof of English or French language proficiency",
      "Motivation letter and letter of recommendation",
    ],
    universities: [
      { name: "Sorbonne Universite" },
      { name: "Ecole Polytechnique", note: "Engineering" },
      { name: "Ecole Normale Superieure" },
      { name: "Sciences Po", note: "Politics, economics, international affairs" },
      { name: "100+ additional public universities and Grandes Ecoles" },
    ],
    cost:
      "Public university tuition for non-EU/EEA students generally runs EUR 5,000 to 20,000+ per year. Private institutions and Grandes Ecoles often exceed EUR 20,000. Living expenses run EUR 850 to 1,400 per month depending on the city.",
    scholarships: [
      "Erasmus+ Program, supporting international student mobility across Europe",
      "French Government Scholarships through Campus France and various ministries",
      "University-specific grants and loans",
    ],
    visaName: "Long-Stay Student Visa",
    visaRequirements: [
      "University acceptance letter and Campus France (DAP/CEF) number",
      "Proof of accommodation in France",
      "Proof of medical insurance and sufficient financial resources",
      "Completed visa application form",
    ],
    postStudyWork:
      "Graduates can apply for a Temporary Residence Permit for up to 1 year to search for employment, transitioning to employment-linked residency once a qualifying job offer is secured.",
    faqs: [
      { q: "Do I need to learn French to study in France?", a: "Not necessarily. Many graduate-level programs are taught fully in English, though French makes daily life and part-time work easier." },
      { q: "What is Campus France, and is it mandatory?", a: "Yes, mandatory for every Pakistani student. It includes an interview at the French Embassy in Islamabad, which must be handled carefully to avoid visa rejection." },
    ],
  },
  {
    slug: "study-in-uae",
    name: "United Arab Emirates",
    short: "UAE",
    flag: "ae",
    region: "More",
    heroStats: ["120+ nationalities on campus", "AED 37,500 to AED 75,000 annual tuition", "1-year renewable student residence visa"],
    intro:
      "The United Arab Emirates has become a leading study destination in the Middle East, combining modern campuses and English-taught degrees with close ties to global industry across finance, aviation, and technology. Apex Consulting Services helps Pakistani students choose the right UAE university, from Abu Dhabi's research-focused institutions to Dubai's international branch campuses, and complete student visa requirements with confidence.",
    whyPoints: [
      { title: "A genuine mix of local and international branch campuses", body: "From nationally ranked institutions like Khalifa University to branch campuses of respected international universities, all offering recognised, internationally accredited degrees." },
      { title: "English-medium programs across in-demand fields", body: "Business, engineering, IT, health sciences, and hospitality are widely taught in English, with minimal need for Arabic in most programs." },
      { title: "Direct proximity to major regional employers", body: "Strong internship pipelines and graduate hiring in finance, aviation, logistics, hospitality, and technology, with many programs building industry placements into the curriculum." },
    ],
    requirements: [
      "Academic transcripts and certificates, attested where required",
      "English proficiency scores (IELTS/TOEFL), where the program requires them",
      "Offer/admission letter from a UAE-accredited institution",
      "Valid passport with at least 6 months validity",
      "Passport-sized photographs and a completed application form",
    ],
    universities: [
      { name: "Khalifa University", note: "Abu Dhabi. Engineering, science, and health, strong research focus" },
      { name: "United Arab Emirates University (UAEU)", note: "Al Ain. The UAE's founding national university" },
      { name: "American University of Sharjah (AUS)", note: "Sharjah. Broad undergraduate and graduate programs" },
      { name: "NYU Abu Dhabi", note: "Abu Dhabi. Selective liberal arts and sciences branch campus" },
      { name: "Zayed University", note: "Dubai and Abu Dhabi campuses" },
      { name: "Abu Dhabi University", note: "UAE's largest private university, multiple campuses" },
    ],
    cost:
      "Undergraduate tuition for international students typically ranges from AED 37,500 to AED 70,000 per year, with postgraduate programs generally running AED 55,000 to AED 75,000. Living expenses in Dubai or Abu Dhabi typically add AED 3,000 to AED 4,500 per month, depending on lifestyle and accommodation.",
    scholarships: [
      "University merit-based tuition waivers, offered by most UAE universities based on academic results",
      "Need-based financial aid at select institutions, assessed on a case-by-case basis",
    ],
    visaName: "UAE Student Visa (Residence Permit)",
    visaRequirements: [
      "Valid passport with at least 6 months validity and passport photographs",
      "University admission letter and proof of tuition payment",
      "Proof of financial means or a sponsor letter",
      "Medical fitness certificate and valid health/travel insurance",
    ],
    postStudyWork:
      "The student residence visa is typically valid for 1 year and renewable while studies continue. Post-study career options are growing across the Gulf region as UAE universities build stronger links to regional employers, though staying on to work after graduation generally requires securing an employer-sponsored work visa.",
    faqs: [
      { q: "Is English widely used at UAE universities?", a: "Yes. Most undergraduate and postgraduate programs at the universities we work with are taught in English, especially at international and branch campuses." },
      { q: "How much does a UAE student visa cost?", a: "Budget roughly AED 5,500 to AED 8,500 in total for the student visa, covering the application fee (AED 3,000 to AED 5,000) and university processing charges (AED 500 to AED 1,500). Costs vary by institution and visa type." },
      { q: "Can Apex help with UAE student visas?", a: "Yes. We support documentation, timelines, and visa guidance after you receive a university offer, working directly with your chosen institution's admissions office." },
    ],
  },
  {
    slug: "study-in-spain",
    name: "Spain",
    short: "Spain",
    flag: "es",
    region: "More",
    heroStats: ["EUR 750 to EUR 20,000+ annual tuition", "12-month post-study job search visa"],
    intro:
      "Spain has become one of Europe's most cost-effective study destinations for Pakistani students, offering globally recognised degrees at a fraction of UK or USA tuition. Apex Consulting Services guides you from university selection to visa approval.",
    whyPoints: [
      { title: "Cost-effective European degree", body: "Public universities charge a fraction of what students pay in the UK or USA." },
      { title: "Growing English-taught programs", body: "Especially at master's level, so Spanish isn't always a requirement for admission." },
      { title: "Access to the Schengen Area", body: "Travel across 27 Schengen countries on a single residence permit." },
    ],
    requirements: [
      "Academic transcripts, depending on program level",
      "Proof of English proficiency, or a Spanish language certificate for Spanish-taught programs",
      "Statement of Purpose and application fee",
    ],
    universities: [
      { name: "University of Barcelona" },
      { name: "Complutense University of Madrid" },
      { name: "Pompeu Fabra University" },
      { name: "University of Valencia" },
    ],
    cost:
      "Annual tuition ranges from EUR 750 to 3,500 at public universities, and EUR 5,000 to 20,000+ at private institutions. Living expenses generally add EUR 750 to 1,100 per month.",
    scholarships: [
      "MAEC-AECID Scholarships for master's and PhD students",
      "Erasmus Mundus Joint Master Degrees, EU-funded",
      "La Caixa Foundation Scholarships, highly competitive postgraduate funding",
    ],
    visaName: "Type D Student Visa",
    visaRequirements: [
      "Offer/acceptance letter from a recognised Spanish institution",
      "Proof of financial means, from roughly EUR 600+ per month",
      "Private health insurance valid across Spain",
      "Proof of accommodation in Spain",
    ],
    postStudyWork:
      "Non-EU students can apply for Spain's Job Search Visa, a 12-month residence permit within 60 days of finishing final exams, converting into a full work permit once a job offer is secured.",
    faqs: [
      { q: "Can I study in Spain on a Schengen tourist visa?", a: "No. A Schengen visa only covers stays up to 90 days. Any program longer requires a Type D national student visa." },
      { q: "Is it possible to study in Spain without IELTS?", a: "Some universities accept TOEFL, PTE, or a Medium of Instruction letter instead." },
    ],
  },
  {
    slug: "study-in-netherlands",
    name: "Netherlands",
    short: "Netherlands",
    flag: "nl",
    region: "More",
    heroStats: ["Hundreds of English-taught programs", "EUR 8,000 to EUR 20,000+ annual tuition", "1-year post-study orientation permit"],
    intro:
      "The Netherlands is one of Europe's most popular destinations for international students, known for hundreds of English-taught degrees, practical and discussion-based teaching styles, and a high quality of life within easy reach of the rest of Europe. Apex Consulting Services helps students from Pakistan shortlist Dutch universities and navigate the MVV entry visa and residence permit process from application to arrival.",
    whyPoints: [
      { title: "Hundreds of English-taught programs", body: "Across top Dutch universities, especially strong in engineering, business, technology, and design, so Dutch language skills are rarely required for admission." },
      { title: "Innovative, practice-oriented education", body: "Small-group teaching, group projects, and strong industry links throughout the curriculum rather than lecture-and-exam-only formats." },
      { title: "A clear post-study orientation pathway", body: "A dedicated residence permit lets graduates stay on to search for qualifying employment after finishing their degree." },
    ],
    requirements: [
      "Academic transcripts (secondary school certificate or bachelor's degree, depending on program level)",
      "English proficiency scores (IELTS/TOEFL), as required by the program",
      "A Statement of Purpose and, for some master's programs, letters of recommendation",
      "Application submitted through Studielink and the university's own portal",
    ],
    universities: [
      { name: "University of Amsterdam" },
      { name: "Delft University of Technology (TU Delft)", note: "Engineering and technology" },
      { name: "Erasmus University Rotterdam", note: "Business, economics, law" },
      { name: "Utrecht University" },
      { name: "Leiden University", note: "The Netherlands' oldest university" },
      { name: "Eindhoven University of Technology (TU/e)", note: "Engineering and design" },
    ],
    cost:
      "Non-EU/EEA students typically pay institutional tuition of approximately EUR 8,000 to EUR 20,000+ per year, depending on the university and program level, considerably more than the statutory fee EU/EEA students pay. For your student visa, you'll need to show at least around EUR 12,000 to EUR 13,000 in financial resources to cover one year of study and living costs.",
    scholarships: [
      "Holland Scholarship, a one-time EUR 5,000 grant for the first year of study, open to non-EU/EEA students",
      "University-specific scholarships, including some institutions' own OTS-branded awards for high-achieving applicants",
    ],
    visaName: "MVV Entry Visa & Residence Permit (VVR)",
    visaRequirements: [
      "An unconditional offer/admission letter from a recognised Dutch institution",
      "Proof of financial means, roughly EUR 12,000 to EUR 13,000 for one year",
      "Valid health insurance covering your stay in the Netherlands",
      "Valid passport; your university typically applies to the IND on your behalf",
    ],
    postStudyWork:
      "Graduates can apply for the Netherlands' post-study orientation year (zoekjaar), a residence permit that gives time to search for qualifying employment or start a business, before transitioning to a work-related residence permit once a job offer is secured.",
    faqs: [
      { q: "Do I need Dutch language skills to study there?", a: "Many programs are fully English-taught. Dutch helps with daily life and part-time work but isn't always required for admission." },
      { q: "Do I need an MVV entry visa, or just a residence permit?", a: "Most Pakistani students need both the MVV entry visa and the VVR residence permit; your university's international office typically applies for both on your behalf once you accept your offer." },
      { q: "Can Apex help with Netherlands student visas?", a: "Yes. After you receive an offer, we guide you through the documentation and visa process step by step." },
    ],
  },
  {
    slug: "study-in-finland",
    name: "Finland",
    short: "Finland",
    flag: "fi",
    region: "More",
    heroStats: ["EUR 4,000 to EUR 20,000 annual tuition (non-EU)", "Up to 2-year post-study job search permit"],
    intro:
      "Finland consistently ranks among the world's safest, most liveable countries, and its universities carry that same reputation for quality, strong in technology, design, and the sciences, with hundreds of programs taught fully in English. Apex Consulting Services guides you from university selection to residence permit approval.",
    whyPoints: [
      { title: "Trust and small class sizes", body: "Finland built its education system around genuine lifelong learning rather than exams alone." },
      { title: "Near-universal English proficiency", body: "A straightforward path from student to job-seeker to long-term resident." },
      { title: "Genuinely low cost of living", body: "Especially outside Helsinki, in cities like Tampere and Turku." },
    ],
    requirements: [
      "Completed upper secondary certificate or relevant bachelor's degree, depending on level",
      "English proficiency: IELTS 6.0 to 6.5, TOEFL iBT 90 to 100, or PTE 59+",
      "Statement of Purpose for master's applicants and portfolio for art/design/architecture programs",
    ],
    universities: [
      { name: "Aalto University", note: "Engineering, design, business" },
      { name: "University of Helsinki" },
      { name: "Tampere University" },
      { name: "University of Turku" },
    ],
    cost:
      "Non-EU/EEA students typically pay EUR 5,000 to 18,000 per year for bachelor's programs and EUR 11,000 to 20,000 for master's programs. Living expenses generally run EUR 700 to 1,200 per month.",
    scholarships: [
      "Finnish Government Scholarship Pool",
      "University of Helsinki and Tampere University scholarships, 50 to 100% tuition waivers",
      "Aalto University Scholarship, merit-based",
      "EDUFI Fellowship for doctoral and postdoctoral researchers",
    ],
    visaName: "Residence Permit for Studies",
    visaRequirements: [
      "Valid passport and official letter of acceptance",
      "Proof of financial means, at least EUR 560 per month or EUR 6,720 for one year",
      "Valid health insurance covering your entire stay",
    ],
    postStudyWork:
      "You can work an average of 30 hours per week year-round while studying, and after graduating, apply for a residence permit to look for work or start a business, valid for up to 2 years.",
    faqs: [
      { q: "Where do Pakistani students apply for a Finland residence permit now?", a: "Since 16 June 2026, following the closure of the Islamabad embassy, Pakistani applicants apply through the Embassy of Finland in Doha and its VFS Global centre. We confirm the current process before you file." },
      { q: "Can international students work while studying in Finland?", a: "Yes, an average of 30 hours per week over the year, with unrestricted hours during holidays." },
    ],
  },
  {
    slug: "study-in-sweden",
    name: "Sweden",
    short: "Sweden",
    flag: "se",
    region: "More",
    heroStats: ["SEK 80,000 to SEK 295,000 annual tuition", "Up to 12 months post-study work visa"],
    intro:
      "Free tuition in Sweden applies to EU/EEA and Swiss citizens only. Pakistani students pay tuition ranging from SEK 80,000 to SEK 295,000 a year, but what's left once you get past the free-tuition headline is still genuinely strong: top-200 ranked universities, discussion-based teaching, and no cap on how many hours international students can work during term.",
    whyPoints: [
      { title: "A genuinely unlimited right to work while studying", body: "Unlike most destinations that cap work at 20 hours a week, Sweden places no official limit, as long as academic progress stays satisfactory." },
      { title: "World-class, research-driven universities", body: "Institutions like Lund University and KTH Royal Institute of Technology have genuine international research standing." },
      { title: "Education built around discussion, not memorization", body: "Seminars, group projects, and independent research rather than lecture-and-exam formats." },
    ],
    requirements: [
      "Minimum 12 years of schooling for Bachelor's, a relevant Bachelor's degree for Master's",
      "English proficiency: IELTS 6.0 to 6.5, TOEFL iBT 90 to 100, or PTE 62+",
      "Maximum of 4 program choices per application round",
      "Statement of Purpose and 2 recommendation letters for Master's programs",
    ],
    universities: [
      { name: "Lund University" },
      { name: "Uppsala University" },
      { name: "KTH Royal Institute of Technology" },
      { name: "Stockholm University" },
      { name: "Karolinska Institute" },
    ],
    cost:
      "Bachelor's programs run SEK 80,000 to 190,000 per year, Master's SEK 100,000 to 295,000, and PhD study is free for all students regardless of nationality. Living costs benchmark around SEK 8,568 per month.",
    scholarships: [
      "Swedish Institute Scholarships, covering tuition, living costs, and travel for eligible countries",
      "Uppsala University Global Scholarships",
      "Lund University Global Scholarship Programme",
    ],
    visaName: "Residence Permit for Studies",
    visaRequirements: [
      "Valid passport covering the full study period",
      "Acceptance letter from a Swedish university",
      "Proof of funds, SEK 8,568 per month for the duration of study",
      "Apply at least 3 months before the course start date",
    ],
    postStudyWork:
      "After completing a degree of at least two semesters, graduates can apply for a residence permit extension of up to 12 months to look for work or start a business.",
    faqs: [
      { q: "Is it free to study in Sweden?", a: "Only for EU/EEA and Swiss citizens. Pakistani applicants pay tuition ranging from roughly SEK 80,000 to SEK 295,000 per year, though PhD study remains free for everyone." },
      { q: "Can I work unlimited hours while studying?", a: "Yes. Sweden places no official cap on part-time work hours for students holding a valid residence permit, as long as academic progress stays satisfactory." },
    ],
  },
  {
    slug: "study-in-malaysia",
    name: "Malaysia",
    short: "Malaysia",
    flag: "my",
    region: "More",
    heroStats: ["RM 20,000 to RM 70,000 annual tuition", "Western branch campuses at Asian prices"],
    intro:
      "Malaysia has become one of the most budget-friendly ways to earn an internationally recognised degree, with tuition and living costs well below the UK, USA, or Australia. Apex Consulting Services guides you from university selection to student pass approval.",
    whyPoints: [
      { title: "Western-style education at Asian prices", body: "Several UK and Australian universities run full branch campuses here, carrying the same degree name and accreditation as the home campus." },
      { title: "Almost every program taught in English", body: "Public or private, with an easier cultural adjustment than most study destinations for Pakistani students." },
      { title: "Halal food and mosques near most campuses", body: "Ramadan is accommodated as a matter of course rather than an exception." },
    ],
    requirements: [
      "Academic transcripts and certificates, depending on program level",
      "Offer/admission letter from a recognised Malaysian university or branch campus",
      "Medical examination for the student pass",
      "Proof of English proficiency, sometimes waived for English-medium prior education",
    ],
    universities: [
      { name: "Universiti Malaya (UM)" },
      { name: "Monash University Malaysia", note: "Australian branch campus" },
      { name: "Taylor's University", note: "Hospitality, business, design" },
      { name: "Sunway University" },
    ],
    cost:
      "Annual tuition typically ranges from RM 20,000 to RM 70,000 (roughly USD 4,500 to 16,000). Living expenses generally add RM 1,500 to 3,500 per month.",
    scholarships: [
      "Malaysia International Scholarship (MIS), covering tuition, stipend, and return airfare for outstanding postgraduate applicants",
      "MTCP Scholarship for select postgraduate applicants",
      "University Merit Scholarships, 10 to 100% tuition waivers",
    ],
    visaName: "Student Pass (via EMGS)",
    visaRequirements: [
      "Valid passport with sufficient remaining validity",
      "Offer letter and completed EMGS student pass application",
      "Medical screening report",
      "Proof of financial means for tuition and living costs",
    ],
    postStudyWork:
      "Part-time work is allowed only during official semester breaks longer than 7 days, up to 20 hours per week in approved sectors. Pakistani graduates are not currently eligible for Malaysia's 12-month post-study Graduate Pass.",
    faqs: [
      { q: "Can international students work while studying in Malaysia?", a: "Only during official semester breaks longer than 7 days, up to 20 hours per week, in approved sectors, with prior approval." },
      { q: "Can I stay in Malaysia after graduation to look for work?", a: "Pakistani graduates are not currently eligible for Malaysia's Graduate Pass. An employer would need to sponsor an Employment Pass before your student pass expires." },
    ],
  },
  {
    slug: "study-in-south-korea",
    name: "South Korea",
    short: "South Korea",
    flag: "kr",
    region: "More",
    heroStats: ["$500 to $6,000 annual tuition", "D-10 post-study work pathway"],
    intro:
      "South Korea has emerged as one of the fastest-growing study destinations for Pakistani students, combining low-cost, high-quality education with genuine scholarship access and a booming tech and semiconductor industry. Apex Consulting Services guides you from university selection to D-2 visa approval.",
    whyPoints: [
      { title: "A pipeline into global tech leaders", body: "Home to Samsung, LG, Hyundai, and SK Hynix, making Korea a strong choice for engineering, semiconductors, IT, and business." },
      { title: "A genuine affordability advantage", body: "Public and national universities charge a fraction of comparable programs in the US, UK, or Australia." },
      { title: "Strong scholarship access", body: "The Global Korea Scholarship can cover tuition, a monthly stipend, and airfare for qualifying students." },
    ],
    requirements: [
      "High school or bachelor's transcripts, depending on program level",
      "English proficiency scores (IELTS/TOEFL/PTE) for English-taught programs, or TOPIK for Korean-taught programs",
      "Statement of Purpose/study plan and letters of recommendation",
    ],
    universities: [
      { name: "Seoul National University" },
      { name: "KAIST", note: "Engineering, robotics, semiconductors" },
      { name: "Yonsei University" },
      { name: "Korea University" },
    ],
    cost:
      "Annual tuition typically ranges from $500 to $6,000, with national/public universities at the lower end. Living expenses generally add $6,500 to 10,500 per year, with Seoul running higher than smaller cities.",
    scholarships: [
      "Global Korea Scholarship (GKS), covering tuition, stipend, airfare, and Korean language training",
      "University Merit Scholarships, partial to full tuition waivers",
      "Research Assistantships at research-focused universities like KAIST and POSTECH",
    ],
    visaName: "D-2 Student Visa",
    visaRequirements: [
      "Valid passport with at least 6 months validity",
      "Certificate of Admission from a recognised Korean university",
      "Academic transcripts and proof of financial support",
      "Health/medical certificate, including a TB test result in most cases",
    ],
    postStudyWork:
      "Graduates can apply for the D-10 job-seeking visa, transitioning to an E-7 work visa once a qualifying job offer is secured. Part-time work during studies is generally capped at 20 to 25 hours per week during term.",
    faqs: [
      { q: "Can Pakistani students get a scholarship to study in South Korea?", a: "Yes. The Global Korea Scholarship covers tuition, a living stipend, and airfare for eligible students, and most universities also run their own merit-based tuition waivers." },
      { q: "Is there a post-study work visa for South Korea?", a: "Yes. Graduates can apply for the D-10 job-seeking visa, and transition to an E-7 work visa once a qualifying job offer is secured." },
    ],
  },
  {
    slug: "study-in-north-cyprus",
    name: "North Cyprus",
    short: "North Cyprus",
    flag: "cy",
    region: "More",
    heroStats: ["$500 to $4,000 annual tuition", "Direct admissions, no entrance exam at most universities"],
    intro:
      "North Cyprus has become one of the most affordable places for Pakistani students to earn an internationally accredited degree, with universities accredited by Turkey's Higher Education Council (YOK) and recognised by international bodies worldwide. Apex Consulting Services guides you from university selection to residence permit.",
    whyPoints: [
      { title: "Some of the lowest tuition of any English-taught destination", body: "Without the rigid entry requirements that make other countries feel out of reach." },
      { title: "Direct admissions, no separate entrance exam", body: "Many universities run English preparation years for applicants who don't yet have an IELTS score." },
      { title: "An established Pakistani student community", body: "Particularly around Famagusta and Nicosia, on a small, safe island." },
    ],
    requirements: [
      "Academic transcripts (secondary school certificate or bachelor's degree, depending on level)",
      "English proficiency scores, or an English preparatory year for students without a qualifying score",
      "Valid passport copy and completed university application form",
    ],
    universities: [
      { name: "Eastern Mediterranean University (EMU)" },
      { name: "Near East University (NEU)", note: "Large medical and dental faculties" },
      { name: "Cyprus International University (CIU)" },
      { name: "Girne American University (GAU)" },
    ],
    cost:
      "Annual tuition typically ranges from $500 to $4,000, with specialised programs like Medicine and Dentistry priced higher. Living expenses generally run $250 to 400 per month.",
    scholarships: [
      "Merit-based tuition discounts, 25 to 100% based on academic results",
      "Early application discounts for students who apply and pay their deposit ahead of the intake deadline",
      "Sibling and family discounts at several private universities",
    ],
    visaName: "Residence Permit (post-arrival)",
    visaRequirements: [
      "Valid passport and university acceptance letter",
      "Proof of tuition payment or registration",
      "Health insurance",
      "Residence permit application after arrival, including a health check and local registration",
    ],
    postStudyWork:
      "Post-study work opportunities on the island itself are limited, given the small economy. Many graduates use their North Cyprus qualification as a foundation for further study in Turkey, the UK, or Canada.",
    faqs: [
      { q: "Is a North Cyprus degree internationally recognised?", a: "Yes. Universities are accredited by Turkey's Higher Education Council (YOK), and many also hold additional international accreditations." },
      { q: "How do I travel to North Cyprus from Pakistan?", a: "Since there are no direct international flights, students typically fly via Istanbul on Turkish Airlines or Pegasus and land at Ercan Airport." },
    ],
  },
  {
    slug: "study-in-south-cyprus",
    name: "South Cyprus",
    short: "South Cyprus",
    flag: "cy",
    region: "More",
    heroStats: ["EUR 4,000 to EUR 8,000 annual tuition", "Full EU member state since 2004"],
    intro:
      "The Republic of Cyprus (South Cyprus) is one of the most accessible entry points into EU higher education. As a full EU member state, a degree from an accredited Cypriot university carries the same recognition as one from any other EU country. Apex Consulting Services guides you from university selection to visa approval.",
    whyPoints: [
      { title: "A genuine EU member state", body: "Your degree is automatically recognised across all EU countries." },
      { title: "English operates as a genuine working language", body: "Thanks to the island's history under British administration, day-to-day life is genuinely bilingual." },
      { title: "A small, safe Mediterranean setting", body: "With a large international student population drawn from across Asia, Africa, and the Middle East." },
    ],
    requirements: [
      "Academic transcripts, depending on program level",
      "English proficiency scores, typically B1 to B2 level, or a Medium of Instruction letter",
      "Statement of Purpose and letters of recommendation for postgraduate programs",
    ],
    universities: [
      { name: "University of Cyprus" },
      { name: "Cyprus University of Technology" },
      { name: "University of Nicosia" },
      { name: "European University Cyprus" },
    ],
    cost:
      "Annual tuition typically ranges from EUR 4,000 to 8,000, with professional programs such as Medicine and Dentistry priced higher. Living expenses generally add EUR 500 to 800 per month.",
    scholarships: [
      "Merit-based scholarships from most private universities",
      "Early application discounts, typically 5 to 15%",
      "Sports and talent scholarships for notable non-academic achievements",
    ],
    visaName: "National Visa (Type D)",
    visaRequirements: [
      "Valid passport with minimum one year validity",
      "Offer letter from a recognised university in Cyprus",
      "Proof of sufficient financial resources and police clearance certificate",
      "Medical certificate and proof of accommodation, recommended",
    ],
    postStudyWork:
      "International students can generally work part-time, around 20 hours per week, during their studies. Graduates who secure a job offer can apply for a work permit, with PR eligibility after around 5 years of continuous legal residence.",
    faqs: [
      { q: "Is South Cyprus part of the Schengen zone?", a: "No. Cyprus is an EU member but not part of Schengen, so your student visa only covers travel within Cyprus." },
      { q: "Can I work while studying in South Cyprus?", a: "Yes. International students can typically work up to 20 hours per week during term time, and more during official holidays." },
    ],
  },
];

export const popularDestinationSlugs = [
  "study-in-uk",
  "study-in-usa",
  "study-in-canada",
  "study-in-australia",
  "study-in-new-zealand",
  "study-in-ireland",
  "study-in-germany",
  "study-in-china",
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

/** Every destination slug follows "study-in-{name}", matching a verified,
 * high-resolution landmark photo at the same {name} under /images/destinations. */
export function destinationPhoto(slug: string) {
  return `/images/destinations/${slug.replace("study-in-", "")}.webp`;
}

