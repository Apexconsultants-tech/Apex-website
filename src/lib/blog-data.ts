// Real blog posts extracted from apexconsultants.org/blogs (crawled 2026-08-09).
// All three live posts, full body content, rewritten only to remove em dashes.

export type BlogSection = { heading?: string; body: string };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  intro: string;
  sections: BlogSection[];
  closing?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "tips-to-prepare-financial-documents-for-visa-approval",
    title: "Tips to Prepare Financial Documents for Visa Approval",
    category: "IELTS / TOEFL",
    date: "19 June, 2026",
    excerpt: "Financial documentation is one of the most important parts of a visa file. Here is how to prepare it correctly.",
    intro:
      "Financial documentation is one of the most important parts of a visa file. Here is how to prepare it correctly. Visa officers review financial documents to confirm that you can fund your education and living costs abroad. Weak or inconsistent paperwork is a frequent cause of refusals.",
    sections: [
      { heading: "Use recent and verified statements", body: "Submit statements that meet the embassy's validity window. Sudden large deposits should be explained with supporting documents." },
      { heading: "Match sponsor details", body: "If a parent or guardian is sponsoring you, include relationship proof, income evidence, and a clear sponsorship letter." },
      { heading: "Keep amounts realistic", body: "Ensure your funds cover tuition plus the required maintenance amount for your destination." },
    ],
    closing: "Our counselors review financial files before submission to reduce avoidable errors.",
  },
  {
    slug: "step-by-step-guide-to-applying-for-a-student-visa",
    title: "Step-by-Step Guide to Applying for a Student Visa",
    category: "Student Visa",
    date: "17 June, 2026",
    excerpt: "A practical walkthrough of student visa requirements, documentation, timelines, and interview preparation for study abroad applicants.",
    intro:
      "Applying for a student visa can feel overwhelming, but a clear step-by-step approach makes the process manageable. At Apex Consulting Services, we help students prepare complete files aligned with embassy expectations.",
    sections: [
      { heading: "1. Confirm your admission documents", body: "Before you apply, make sure you have your admission letter, CAS/COE/I-20 (as applicable), and financial evidence ready." },
      { heading: "2. Prepare financial documents", body: "Most destinations require proof of tuition funds, living expenses, and sponsor details. Keep bank statements recent, consistent, and well-organized." },
      { heading: "3. Complete the online application", body: "Fill every section carefully. Mismatched dates or incomplete forms are common reasons for delays." },
      { heading: "4. Book biometrics and interview", body: "Practice credibility questions and keep your story consistent with your application and academic goals." },
    ],
    closing: "Need help? Book a free consultation with our visa counselors in Karachi, Hyderabad, or the UK.",
  },
  {
    slug: "post-arrival-guide-what-every-student-should-know",
    title: "Post-Arrival Guide: What Every Student Should Know",
    category: "Study Abroad",
    date: "19 May, 2026",
    excerpt: "Landing abroad is exciting and busy. Use this checklist for accommodation, banking, university registration, and settling in.",
    intro:
      "Congratulations on arriving at your study destination! A smooth first week helps you focus on academics instead of admin stress.",
    sections: [
      { heading: "Complete university registration", body: "Attend orientation, collect your student ID, and confirm your enrolment status on time." },
      { heading: "Set up essentials", body: "Arrange a local SIM, transport card, and temporary or permanent accommodation before classes begin." },
      { heading: "Understand visa conditions", body: "Know your work-hour limits, attendance requirements, and reporting obligations to stay compliant." },
      { heading: "Stay connected with support", body: "Apex provides pre- and post-departure guidance so you are not navigating everything alone." },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
