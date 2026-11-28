import { FreeResource, ResourceCategory } from '../types';

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'Free Online Courses',
  'Certifications & Aid',
  'International Student Guides',
  'CV Templates',
  'Resume Writing Guides',
  'Cover Letter Guides',
  'Interview Preparation',
  'Useful Educational Websites',
  'Learning Roadmaps',
];

export const FREE_RESOURCES_DATA: FreeResource[] = [
  {
    id: 'res-cs50',
    slug: 'cs50-computer-science-complete-study-guide',
    title: 'CS50x Computer Science Complete Self-Study Guide (Harvard OCW)',
    provider: 'Harvard University (CS50 / edX)',
    category: 'Free Online Courses',
    description:
      'Complete week-by-week self-study blueprint for Harvard CS50x covering C, Python, SQL, web development, and the final project.',
    readingTime: '8 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    externalUrl: 'https://cs50.harvard.edu/x/',
    isVerifiedLink: true,
    formatLabel: 'Free Full Curriculum',
    articleIntro:
      'Harvard’s CS50x is widely regarded as the gold-standard free introduction to computer science for beginners worldwide. Every lecture, problem set, and automated grading tool (check50) is accessible completely free online.',
    sections: [
      {
        heading: '1. How to Complete CS50x Without Getting Stuck',
        paragraphs: [
          'Do not rush from lecture to lecture passively. Pause after each lecture, type every example yourself in CS50.dev (free browser VS Code Codespace), and solve all standard problem sets before moving forward.',
        ],
        bullets: [
          'Weeks 0–4: Scratch, C fundamentals, arrays, algorithms, and memory pointers.',
          'Weeks 5–7: Data structures, Python transition, and SQL relational queries.',
          'Weeks 8–10: HTML/CSS/JavaScript, Flask web apps, and your capstone Final Project.',
        ],
      },
      {
        heading: '2. Free Harvard CS50 Certificate vs. Paid edX Certificate',
        paragraphs: [
          'Students who submit all problem sets and the final project through Harvard’s own cs50.me portal receive a free verifiable CS50 Certificate from Harvard CS50 without needing to pay for the optional edX verified upgrade.',
        ],
      },
    ],
    actionSteps: [
      'Bookmark cs50.harvard.edu/x/ and watch Week 0 + Week 1 lectures.',
      'Set up your free GitHub account and log into cs50.dev.',
      'Schedule 6–8 hours weekly so you finish Problem Sets 1–9 steadily.',
    ],
    relatedLinks: [
      {
        title: 'Developer & Career Learning Roadmaps',
        description: 'Plan what to study right after completing CS50x.',
        to: '/resources/developer-and-career-learning-roadmaps',
        badge: 'Resource',
      },
    ],
  },
  {
    id: 'res-fullstack',
    slug: 'full-stack-web-development-curriculum-guide',
    title: 'Full-Stack Web Development Free Curriculum Guide (freeCodeCamp & The Odin Project)',
    provider: 'freeCodeCamp & The Odin Project',
    category: 'Free Online Courses',
    description:
      'Combine freeCodeCamp interactive drills with The Odin Project’s Git-based portfolio builds to become job-ready for free.',
    readingTime: '8 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    externalUrl: 'https://www.theodinproject.com/',
    isVerifiedLink: true,
    formatLabel: 'Open Curriculum',
    articleIntro:
      'You do not need expensive coding bootcamps to learn modern React, TypeScript, Node.js, and PostgreSQL. Pairing freeCodeCamp’s structured exercises with The Odin Project’s real GitHub assignments builds authentic engineering muscle.',
    sections: [
      {
        heading: '1. Recommended Sequence (16–24 Weeks)',
        paragraphs: [
          'Start with semantic HTML, modern CSS Flexbox/Grid, and vanilla JavaScript DOM manipulation before touching any framework.',
        ],
        bullets: [
          'Phase 1 (Weeks 1–4): HTML5, CSS Grid/Flexbox, Git/GitHub CLI workflows.',
          'Phase 2 (Weeks 5–10): Modern JavaScript, async/await, REST APIs, and automated testing.',
          'Phase 3 (Weeks 11–18): React + TypeScript frontend + Node.js/Express + SQL backend projects.',
        ],
      },
    ],
    actionSteps: [
      'Complete Foundations on theodinproject.com using Git commits for every project.',
      'Deploy at least 3 interactive apps so recruiters can inspect live links.',
      'Write clean READMEs explaining architecture choices and trade-offs.',
    ],
  },
  {
    id: 'res-academic-cv',
    slug: 'academic-cv-template-for-scholarships-and-research',
    title: 'Academic CV Template for International Scholarships & Research Applications',
    provider: 'AspireHub Editorial Guide',
    category: 'CV Templates',
    description:
      'Copyable, ATS-friendly Academic CV structure highlighting education, thesis work, publications, awards, and leadership.',
    readingTime: '7 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    isVerifiedLink: true,
    isSampleTemplate: true,
    formatLabel: 'Copyable Template',
    articleIntro:
      'An Academic CV for Chevening, Fulbright, Erasmus Mundus, DAAD, or Swiss Excellence differs from a corporate 1-page resume: selection committees expect structured detail on coursework, thesis research, academic honors, and civic leadership.',
    sections: [
      {
        heading: '1. Essential Sections in Priority Order',
        paragraphs: [
          'Keep typography clean (single column, 10.5–11pt body font, clear section headings, reverse-chronological order) across 2 concise pages.',
        ],
        copyableBlock: {
          title: 'Academic CV Skeleton (Copy & Customize)',
          content: `[FULL NAME]
City, Country | Email | LinkedIn | GitHub / ORCID (optional)

EDUCATION
[Degree Title, e.g., B.S. in Computer Science] — [University Name, City] ([Start Year – End Year])
• CGPA / Grade: [e.g., 3.78/4.00 — Top 5% of graduating class]
• Thesis / Capstone: "[Title]" — [1-line outcome or method]

RESEARCH & ACADEMIC PROJECTS
[Project / Lab Assistant Title] — [Institution / Lab] ([Dates])
• [Action verb + method + measurable finding or deliverable]

WORK & INTERNSHIP EXPERIENCE
[Role Title] — [Organization] ([Dates])
• [Outcome-focused bullet with concrete metrics]

HONORS, SCHOLARSHIPS & CERTIFICATIONS
• [Award Name, Issuing Body, Year]

LEADERSHIP & VOLUNTEERING
• [Role, Organization, Impact Metric]

TECHNICAL & LANGUAGE SKILLS
• Languages: English (IELTS X.X), [Native Language]
• Tools / Methods: [Python, SQL, LaTeX, etc.]`,
        },
      },
    ],
    actionSteps: [
      'Use consistent date alignment and export as a text-selectable PDF (never a scanned image).',
      'Highlight thesis topics, lab methods, and measurable community impact.',
      'Tailor your skills and projects to the target scholarship discipline.',
    ],
  },
  {
    id: 'res-ats-resume',
    slug: 'one-page-ats-resume-blueprint',
    title: 'One-Page ATS Resume Blueprint for Remote Jobs & Tech Internships',
    provider: 'AspireHub Career Guide',
    category: 'CV Templates',
    description:
      'Clean single-column ATS-safe resume layout engineered to pass automated screening and catch recruiter attention in 10 seconds.',
    readingTime: '6 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    isVerifiedLink: true,
    isSampleTemplate: true,
    formatLabel: 'ATS Blueprint',
    articleIntro:
      'Remote companies and global internship programs frequently filter hundreds of applications through Applicant Tracking Systems (ATS). Fancy two-column Canva graphics often scramble text parsing—clean single-column structure wins.',
    sections: [
      {
        heading: '1. Single-Column ATS Template Structure',
        paragraphs: [
          'Avoid tables, text boxes, skill progress bars, and headshots (unless specifically customary in your local market). Keep everything in standard selectable headings.',
        ],
        copyableBlock: {
          title: 'One-Page Remote Resume Skeleton',
          content: `[YOUR NAME]
[City, Country] (Remote / [Timezone, e.g. UTC+5]) | [Email] | [LinkedIn] | [Portfolio/GitHub]

SUMMARY (2 lines)
[Role] with [X years/projects] in [core stack/skills], experienced in async remote collaboration and delivering [measurable outcome].

SKILLS
• Core: [React, TypeScript, Node.js, PostgreSQL]
• Workflow: [Git, REST APIs, Figma, Technical Writing]

EXPERIENCE & FREELANCE PROJECTS
[Role / Independent Developer] — [Company or Client Type] ([Month Year – Present])
• Built/Improved [what] using [tool], resulting in [metric or outcome].

EDUCATION
[Degree], [University] ([Graduation Year])`,
        },
        internalLink: {
          label: 'Use the Interactive Resume / CV Tips Generator',
          to: '/toolkit?tab=cv-tips',
        },
      },
    ],
    actionSteps: [
      'Mirror exact skill keywords from the job post naturally inside your bullets.',
      'Limit your entry-level remote resume strictly to 1 crisp page.',
      'Test PDF text selection by copying and pasting into Notepad to verify ATS readability.',
    ],
  },
  {
    id: 'res-bullet-writing',
    slug: 'bullet-point-resume-writing-guide',
    title: 'Bullet-Point Resume Writing Guide: Turning Weak Duties into Impact Metrics',
    provider: 'AspireHub Career Guide',
    category: 'Resume Writing Guides',
    description:
      'Apply the Action + Context + Measurable Result formula to transform generic job duties into persuasive achievements.',
    readingTime: '6 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    isVerifiedLink: true,
    formatLabel: 'Writing Playbook',
    articleIntro:
      'Recruiters already know what a "Frontend Intern" or "Content Writer" is supposed to do. What separates shortlisted applicants is showing what changed because you did the work.',
    sections: [
      {
        heading: '1. The Action + Method + Result Formula',
        paragraphs: [
          'Replace passive phrases like "Responsible for managing social media" with active proof: "Grew organic LinkedIn referral traffic by 34% over 12 weeks by shipping 3 weekly data-backed product breakdowns."',
        ],
        bullets: [
          'Start every bullet with a strong past-tense verb (Engineered, Redesigned, Automated, Audited, Authored).',
          'Quantify scale even when you lack revenue numbers (hours saved, test coverage %, pages refactored, team size).',
        ],
      },
    ],
    actionSteps: [
      'Rewrite the top 6 bullets on your resume using Action + Tool/Method + Outcome.',
      'Remove filler words like "helped with", "worked on", and "duties included".',
    ],
  },
  {
    id: 'res-cover-letter',
    slug: 'scholarship-and-job-cover-letter-guide',
    title: 'Cover Letter & Motivation Letter Guide for Global Jobs and Scholarships',
    provider: 'AspireHub Editorial Guide',
    category: 'Cover Letter Guides',
    description:
      'A concise 3-paragraph framework connecting your proven skills directly to the organization’s goals without generic fluff.',
    readingTime: '6 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    isVerifiedLink: true,
    isSampleTemplate: true,
    formatLabel: '3-Paragraph Template',
    articleIntro:
      'A high-converting cover letter fits comfortably on half a page (220–300 words). It answers three questions quickly: Why this role/program, what proof you bring, and how you work.',
    sections: [
      {
        heading: '1. Copyable 3-Paragraph Structure',
        paragraphs: ['Keep sentences direct, concrete, and tailored to the recipient organization.'],
        copyableBlock: {
          title: 'Concise Cover Letter Framework',
          content: `Dear [Hiring Manager / Admissions Committee],

[Paragraph 1 — Direct Hook & Fit]: State the exact role or program you are applying for and highlight your strongest relevant credential or project in 2 sentences.

[Paragraph 2 — Proof & Measurable Impact]: Share 1–2 concrete achievements (with numbers or live links) that directly match their stated priorities.

[Paragraph 3 — Alignment & Close]: Explain briefly why this specific team/university aligns with your next 2-year trajectory, and thank them for their time.

Sincerely,
[Your Full Name]`,
        },
      },
    ],
    actionSteps: [
      'Never send a cover letter addressed "To Whom It May Concern" when a team name is public.',
      'Keep word count under 300 words so busy reviewers read every line.',
    ],
  },
  {
    id: 'res-interview',
    slug: 'interview-preparation-complete-handbook',
    title: 'Interview Preparation Handbook: Behavioral STAR Answers & Technical Screenings',
    provider: 'AspireHub Career Guide',
    category: 'Interview Preparation',
    description:
      'Master scholarship panel interviews and remote hiring calls with the STAR framework, audio checks, and smart closing questions.',
    readingTime: '8 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    isVerifiedLink: true,
    formatLabel: 'Interview Handbook',
    articleIntro:
      'Whether facing a Chevening embassy panel or a remote engineering screening call, structured storytelling wins. Prepare 5 versatile stories beforehand using Situation, Task, Action, and Result (STAR).',
    sections: [
      {
        heading: '1. Five Core Stories Every Candidate Needs',
        paragraphs: [
          'Keep each STAR story under 90–120 seconds, spending 70% of your speaking time on your personal Actions and measurable Results.',
        ],
        bullets: [
          'A leadership moment where you mobilized people without formal authority.',
          'A tough technical or academic failure—and what you changed afterward.',
          'A cross-cultural or team conflict resolved constructively.',
          'A project delivered under tight resource or deadline constraints.',
          'Why this specific scholarship, degree, or remote role fits your 5-year plan.',
        ],
      },
    ],
    actionSteps: [
      'Write bullet outlines for 5 STAR stories and practice aloud with a timer.',
      'Prepare 3 thoughtful questions to ask your interviewers at the end.',
    ],
  },
  {
    id: 'res-ocw',
    slug: 'university-open-courseware-self-study-guide',
    title: 'University OpenCourseWare Guide: MIT OCW, Stanford & Yale Free Lectures',
    provider: 'MIT OpenCourseWare / Academic Archives',
    category: 'Useful Educational Websites',
    description:
      'Access authentic university syllabi, lecture notes, and problem sets across engineering, economics, and humanities for free.',
    readingTime: '6 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    externalUrl: 'https://ocw.mit.edu/',
    isVerifiedLink: true,
    formatLabel: 'Official Archive',
    articleIntro:
      'MIT OpenCourseWare (ocw.mit.edu) publishes complete undergraduate and graduate course materials—including syllabi, reading lists, exams, and video lectures—free with no registration required.',
    sections: [
      {
        heading: '1. Best Ways to Use OpenCourseWare for Scholarship Prep',
        paragraphs: [
          'Before applying for Master’s programs abroad, inspect target university level expectations in Linear Algebra (18.06), Algorithms (6.006), or Macroeconomics directly on MIT OCW.',
        ],
      },
    ],
    actionSteps: [
      'Pick 1 foundational gap subject and download its MIT OCW syllabus + problem sets.',
      'Pair video lectures with active problem solving rather than passive watching.',
    ],
  },
  {
    id: 'res-quant',
    slug: 'quantitative-foundations-and-test-prep-guide',
    title: 'Quantitative Foundations & Free Standardized Test Prep (Khan Academy)',
    provider: 'Khan Academy',
    category: 'Useful Educational Websites',
    description:
      'Build rock-solid math, statistics, and SAT/GRE quantitative foundations free of charge using structured mastery drills.',
    readingTime: '6 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    externalUrl: 'https://www.khanacademy.org/',
    isVerifiedLink: true,
    formatLabel: 'Free Practice Portal',
    articleIntro:
      'Many scholarship applicants lose competitive GRE/SAT points not on advanced calculus, but on basic algebra speed, ratios, probability, and data interpretation—areas where Khan Academy’s free mastery modules excel.',
    sections: [
      {
        heading: '1. High-Yield GRE & SAT Quant Review Order',
        paragraphs: [
          'Spend 30 minutes daily drilling weak fundamentals before buying expensive commercial test prep books.',
        ],
        bullets: [
          'Arithmetic, fractions, ratios, percentages, and linear inequalities.',
          'Data interpretation, standard deviation, combinatorics, and basic probability.',
          'Official Khan Academy Digital SAT prep partner modules.',
        ],
      },
    ],
    actionSteps: [
      'Take a baseline diagnostic quiz to identify your 3 weakest quant topics.',
      'Complete 20–30 minutes of targeted practice daily for 6 weeks.',
    ],
  },
  {
    id: 'res-roadmaps',
    slug: 'developer-and-career-learning-roadmaps',
    title: 'Developer & Career Learning Roadmaps (roadmap.sh & Skill Sequences)',
    provider: 'roadmap.sh / Open Community',
    category: 'Learning Roadmaps',
    description:
      'Follow community-vetted visual skill trees for Frontend, Backend, Data Science, DevOps, and UX Design without overwhelm.',
    readingTime: '6 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    externalUrl: 'https://roadmap.sh/',
    isVerifiedLink: true,
    formatLabel: 'Visual Skill Trees',
    articleIntro:
      'Beginners often stall because they do not know what order to learn tools in. Interactive role roadmaps on roadmap.sh map essential foundations separately from optional nice-to-have tools.',
    sections: [
      {
        heading: '1. Follow the 80/20 Roadmap Rule',
        paragraphs: [
          'Focus strictly on core purple/required fundamentals first. Never try to learn five frameworks simultaneously—master one stack deeply enough to ship real apps.',
        ],
      },
    ],
    actionSteps: [
      'Open roadmap.sh and choose one role track for the next 90 days.',
      'Build 1 small practical project after every major roadmap milestone.',
    ],
  },
  {
    id: 'res-digital-skills',
    slug: 'digital-skills-and-career-readiness-guide',
    title: 'Digital Skills & Career Readiness Guide (Google Digital Garage & SkillsBuild)',
    provider: 'Google Digital Garage / IBM SkillsBuild',
    category: 'Learning Roadmaps',
    description:
      'Structured introductory courses in digital marketing, cybersecurity basics, cloud fundamentals, and workplace readiness.',
    readingTime: '6 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    externalUrl: 'https://skillshop.exceedlms.com/student/catalog/list?category_ids=7879-google-digital-garage',
    isVerifiedLink: true,
    formatLabel: 'Free Skill Portal',
    articleIntro:
      'For non-CS students and career switchers, Google Digital Garage and IBM SkillsBuild provide structured, beginner-accessible foundations with free digital completion badges.',
    sections: [
      {
        heading: '1. Pairing Free Badges With Real Portfolio Proof',
        paragraphs: [
          'Employers rarely hire based on certificates alone. Always follow up an introductory digital marketing or data course with a concrete mini-project (like an SEO audit or Looker Studio dashboard).',
        ],
      },
    ],
    actionSteps: [
      'Select 1 career track aligned with your career quiz recommendation.',
      'Turn your final module exercise into a public portfolio artifact.',
    ],
  },
  {
    id: 'res-coursera-aid',
    slug: 'free-certifications-and-coursera-financial-aid-guide',
    title: 'Free Certifications & Coursera Financial Aid Complete Application Guide',
    provider: 'Coursera / edX / freeCodeCamp',
    category: 'Certifications & Aid',
    description:
      'Learn how to audit top university courses for free, apply legitimately for Coursera Financial Aid, and earn free verified certs.',
    readingTime: '7 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    externalUrl: 'https://www.coursera.support/s/article/209819033-Apply-for-Financial-Aid-or-a-Scholarship',
    isVerifiedLink: true,
    formatLabel: 'Aid & Cert Guide',
    articleIntro:
      'Learners with limited budgets can still complete top university specializations from Stanford, DeepLearning.AI, and Yale by auditing courses free or submitting honest Coursera Financial Aid applications.',
    sections: [
      {
        heading: '1. Writing a Sincere Coursera Financial Aid Request',
        paragraphs: [
          'Coursera reviews aid requests per individual course (typically taking ~15 days). Explain your current educational/financial situation honestly and describe specifically how the course supports your career or community goals.',
        ],
        bullets: [
          'freeCodeCamp, Kaggle Learn, and Harvard CS50x offer 100% free completion certificates without any aid application.',
          'Audit mode on Coursera/edX gives immediate free access to video lectures while financial aid is reviewed.',
        ],
      },
    ],
    actionSteps: [
      'Audit the first week of a course to ensure the syllabus fits your level.',
      'Submit a clear, specific financial aid application if you need graded assessments.',
    ],
  },
  {
    id: 'res-intl-readiness',
    slug: 'international-student-readiness-and-english-tests-guide',
    title: 'International Student Readiness: IELTS, TOEFL, Duolingo & Document Attestation',
    provider: 'AspireHub Global Study Desk',
    category: 'International Student Guides',
    description:
      'Prepare IELTS/TOEFL scores, official transcript attestations, reference briefings, and visa financial planning smoothly.',
    readingTime: '9 min read',
    lastUpdated: '2026-11-25',
    internationalFocus: true,
    isVerifiedLink: true,
    formatLabel: 'Global Study Guide',
    articleIntro:
      'International scholarship rejections often happen not because of weak grades, but due to missed English test validity windows, unattested transcripts, or rushed reference letters.',
    sections: [
      {
        heading: '1. English Proficiency Test Comparison (IELTS vs. TOEFL vs. DET)',
        paragraphs: [
          'Check exact score requirements on your target university AND scholarship websites—UK Chevening/Commonwealth rules may differ from U.S. or European consortium rules.',
        ],
        bullets: [
          'IELTS Academic: Accepted worldwide (UK, EU, Australia, Canada); typical Master’s benchmark 6.5–7.0 overall.',
          'TOEFL iBT: Widely preferred by U.S. and global research universities; typical benchmark 90–100+.',
          'Duolingo English Test (DET): Fast, lower-cost online option accepted by many U.S./global universities (verify scholarship rules first).',
        ],
      },
      {
        heading: '2. Attestation, Translations & Passport Validity',
        paragraphs: [
          'Verify your passport remains valid for at least 12–18 months beyond your intended travel date, and allow 4–8 weeks for national higher education attestations (e.g., HEC/IBCC in Pakistan or apostilles elsewhere).',
        ],
      },
    ],
    actionSteps: [
      'Schedule IELTS or TOEFL at least 3 months before major scholarship cutoffs.',
      'Scan high-resolution PDFs of attested transcripts, degree certificates, and passport.',
      'Brief your academic/employer referees 4 weeks ahead with your CV and SOP outline.',
    ],
  },
];
