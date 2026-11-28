import { BlogCategory, BlogPost } from '../types';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Scholarships & Study Abroad',
  'Freelancing & Career',
  'AI & Productivity',
  'Skill Building',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-sop',
    slug: 'how-to-write-a-standout-statement-of-purpose',
    title: 'How to Write a Standout Statement of Purpose for Global Scholarships',
    category: 'Scholarships & Study Abroad',
    excerpt:
      'Replace generic childhood stories with a crisp 4-part narrative connecting your past proof, chosen curriculum, and measurable post-graduation impact.',
    author: 'AspireHub Editorial Desk',
    authorRole: 'International Admissions & Scholarship Research',
    publishedAt: '2026-11-25',
    readingTime: '8 min read',
    thumbnail: '/src/assets/images/blog_sop_library_archive_1795001908735.jpg',
    featured: true,
    sections: [
      {
        heading: '1. Why Generic Openings Lose Reviewers in 20 Seconds',
        paragraphs: [
          'Scholarship committees read hundreds of essays beginning with "Since childhood, I have been passionate about helping my country." Reviewers look for concrete evidence of what you have already built, researched, or led—and why a specific degree unlocks your next impact.',
        ],
      },
      {
        heading: '2. The 4-Part Evidence-First SOP Blueprint',
        paragraphs: [
          'Structure your essay cleanly across four balanced sections so every paragraph earns its word count:',
        ],
        bullets: [
          'Part 1 (20%): Defining problem or academic question you observed firsthand through work or study.',
          'Part 2 (30%): Concrete proof of past action—research projects, leadership, or community initiatives with outcomes.',
          'Part 3 (25%): Why this exact program, modules, faculty, or host country curriculum bridges your skill gap.',
          'Part 4 (25%): Realistic 2–5 year post-study trajectory and measurable home-country or industry contribution.',
        ],
        callout: {
          title: 'Quick Self-Edit Check',
          body: 'If you can swap the university or scholarship name in your third paragraph without changing a sentence, your "Why This Program" section is still too generic.',
        },
        internalLink: {
          label: 'Explore Global Scholarships Directory',
          to: '/scholarships',
        },
      },
    ],
    keyTakeaways: [
      'Open with a concrete problem or turning point—never generic clichés.',
      'Cite real courses, labs, or faculty strengths when explaining program fit.',
      'Connect your post-study goals back to measurable local or global impact.',
    ],
    relatedLinks: [
      {
        title: '12-Month International Scholarship Calendar',
        description: 'Plan test scores, references, and essays month by month.',
        to: '/blog/12-month-international-scholarship-preparation-calendar',
        badge: 'Blog',
      },
      {
        title: 'Academic CV Template',
        description: 'Align your CV evidence with every claim in your SOP.',
        to: '/resources/academic-cv-template-for-scholarships-and-research',
        badge: 'Resource',
      },
    ],
  },
  {
    id: 'blog-balancing',
    slug: 'balancing-university-classes-and-first-freelance-clients',
    title: 'Balancing University Classes and Your First Freelance Clients Without Burnout',
    category: 'Freelancing & Career',
    excerpt:
      'Protect your GPA while building real client income by setting async boundaries, weekly time blocks, and realistic delivery windows.',
    author: 'AspireHub Career Desk',
    authorRole: 'Student Career & Remote Work Advisory',
    publishedAt: '2026-11-25',
    readingTime: '6 min read',
    thumbnail: '/src/assets/images/blog_campus_schedule_1795001904436.jpg',
    sections: [
      {
        heading: '1. Never Sacrifice Core GPA for Low-Value Rush Gigs',
        paragraphs: [
          'Your university degree and long-term technical foundation remain major assets for scholarships and senior roles. Cap client work at 10–15 hours per week during semester weeks and pause new bookings 10 days before final exams.',
        ],
        bullets: [
          'Add 48-hour buffers to every freelance milestone deadline.',
          'Favor async written updates over unpredictable mid-class voice calls.',
          'Choose projects that double as real portfolio case studies.',
        ],
        internalLink: {
          label: 'Read Client Communication Playbook',
          to: '/freelancing/client-communication-that-builds-repeat-work',
        },
      },
    ],
    keyTakeaways: [
      'Treat study blocks and exam weeks as non-negotiable calendar commitments.',
      'Quote realistic delivery windows rather than stressful 24-hour turnarounds.',
    ],
  },
  {
    id: 'blog-ai-learning',
    slug: 'using-ai-tools-to-learn-faster-without-hollowing-out-your-skills',
    title: 'Using AI Tools to Learn Faster Without Hollowing Out Your Core Skills',
    category: 'AI & Productivity',
    excerpt:
      'Use ChatGPT, Claude, DeepSeek, and NotebookLM as Socratic tutors and quiz partners rather than copy-paste shortcuts.',
    author: 'AspireHub Research Team',
    authorRole: 'Digital Learning & AI Literacy',
    publishedAt: '2026-11-25',
    readingTime: '7 min read',
    thumbnail: '/src/assets/images/blog_ai_terminal_notes_1795001905553.jpg',
    sections: [
      {
        heading: '1. The Illusion of Competence Trap',
        paragraphs: [
          'Asking an AI model to write an entire assignment or React component makes progress feel effortless—until a live technical interview or exam strips away the chat window. Real skill builds during active struggle and retrieval.',
        ],
        bullets: [
          'Attempt the code or problem yourself for 15 minutes before asking AI for a hint.',
          'Ask AI to act as a reviewer ("Spot 3 edge-case bugs in my code without rewriting it").',
          'Use NotebookLM on your own lecture PDFs to generate retrieval quizzes.',
        ],
        internalLink: {
          label: 'Compare AI Tools Side by Side',
          to: '/ai-tools/compare',
        },
      },
    ],
    keyTakeaways: [
      'Use AI for hints, code reviews, and mock quizzes—not blind copy-pasting.',
      'Always verify citations and official deadlines on primary source sites.',
    ],
  },
  {
    id: 'blog-portfolio',
    slug: '5-portfolio-upgrades-that-make-recruiters-and-clients-stay',
    title: '5 Portfolio Upgrades That Make International Clients and Recruiters Stay',
    category: 'Freelancing & Career',
    excerpt:
      'Replace generic percentage skill bars with crisp problem-solution summaries, live demos, and honest architecture notes.',
    author: 'AspireHub Career Desk',
    authorRole: 'Portfolio & Hiring Research',
    publishedAt: '2026-11-25',
    readingTime: '6 min read',
    thumbnail: '/src/assets/images/blog_portfolio_upgrades_1795001584052.jpg',
    sections: [
      {
        heading: '1. Five High-Impact Portfolio Fixes You Can Ship Today',
        paragraphs: [
          'Hiring managers spend under 30 seconds scanning a portfolio before deciding whether to inspect a project. Make every second count:',
        ],
        bullets: [
          'State exactly what role you target in the top headline.',
          'Drop fake "90% HTML" progress bars—show real shipped projects instead.',
          'Put a working Live Demo link beside every GitHub repo or Figma file.',
          'Summarize each project in 3 lines: Problem, Approach, Outcome.',
          'Fix mobile layout overflow and broken screenshots before sending applications.',
        ],
        internalLink: {
          label: 'How to Build a Portfolio With Zero Clients',
          to: '/freelancing/how-to-create-a-portfolio-with-no-clients',
        },
      },
    ],
    keyTakeaways: [
      'Clarity above the fold beats heavy animations.',
      'Three deep case studies outperform twelve unfinished clones.',
    ],
  },
  {
    id: 'blog-calendar',
    slug: '12-month-international-scholarship-preparation-calendar',
    title: 'The 12-Month International Scholarship Preparation Calendar',
    category: 'Scholarships & Study Abroad',
    excerpt:
      'Coordinate university shortlisting, GRE/IELTS exams, transcript attestation, and SOP drafts without last-minute panic.',
    author: 'AspireHub Editorial Desk',
    authorRole: 'Global Scholarship Strategy',
    publishedAt: '2026-11-25',
    readingTime: '8 min read',
    thumbnail: '/src/assets/images/blog_scholarship_timeline_1795001584920.jpg',
    sections: [
      {
        heading: '1. Quarter-by-Quarter Preparation Timeline',
        paragraphs: [
          'Starting 10–12 months ahead turns stressful last-minute scrambles into calm, polished submissions.',
        ],
        bullets: [
          'Months 1–3: Shortlist 6–8 programs/scholarships and verify GPA/work-hour rules on official portals.',
          'Months 4–6: Complete IELTS/TOEFL/GRE exams and start academic transcript attestations.',
          'Months 7–9: Draft Statement of Purpose & Academic CV; brief 2–3 referees early.',
          'Months 10–12: Submit applications 7 days before cutoffs and prep STAR interview stories.',
        ],
        internalLink: {
          label: 'Run the Scholarship Eligibility Checklist',
          to: '/toolkit?tab=eligibility',
        },
      },
    ],
    keyTakeaways: [
      'Take standardized tests at least 3–4 months before major deadlines.',
      'Always aim to submit forms 5–7 days before official portal closure.',
    ],
  },
  {
    id: 'blog-skill',
    slug: 'choosing-your-first-high-value-digital-skill',
    title: 'Choosing Your First High-Value Digital Skill (Without Tutorial Hopping)',
    category: 'Skill Building',
    excerpt:
      'Pick one durable career track using a 90-day commitment rule and measurable weekly project milestones.',
    author: 'AspireHub Research Team',
    authorRole: 'Curriculum & Career Design',
    publishedAt: '2026-11-25',
    readingTime: '6 min read',
    thumbnail: '/src/assets/images/blog_digital_skills_1795001586410.jpg',
    sections: [
      {
        heading: '1. Why Switching Stacks Every 3 Weeks Keeps Beginners Stuck',
        paragraphs: [
          'Beginners often jump from Python to Figma to copywriting every time a module gets hard. Commit to one foundational track for 90 days before judging your aptitude.',
        ],
        internalLink: {
          label: 'Take the Career Interest Quiz',
          to: '/toolkit?tab=career-quiz',
        },
      },
    ],
    keyTakeaways: [
      'Pick one primary skill track for 90 days.',
      'Measure progress by shipped projects, not hours of video watched.',
    ],
  },
];
