import { FreelancingCategory, FreelancingGuide } from '../types';

export const FREELANCING_CATEGORIES: FreelancingCategory[] = [
  'Introduction to Freelancing',
  'Remote Jobs & Internships',
  'Fiverr Complete Guide',
  'Upwork Complete Guide',
  'How to Create a Portfolio',
  'How to Find Your First Client',
  'Freelancing Skills to Learn',
  'Client Communication',
  'Pricing and Payment Methods',
  'Common Freelancing Mistakes',
];

export const FREELANCING_GUIDES: FreelancingGuide[] = [
  {
    id: 'fr-intro',
    slug: 'introduction-to-freelancing-for-beginners',
    title: 'Introduction to Freelancing: How Beginners Start Ethically & Sustainably',
    category: 'Introduction to Freelancing',
    shortDescription:
      'Understand how independent client work operates, choose one starter service, and avoid common beginner myths.',
    readingTime: '7 min read',
    thumbnail: '/src/assets/images/freelance_coworking_hub_1795001906004.jpg',
    featured: true,
    difficulty: 'Beginner',
    regionScope: 'Global / Remote',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. What Freelancing Actually Means',
        body: 'Freelancing is selling a clearly defined skill outcome to businesses or individuals on a project or retainer basis—not "quick passive money". Clients pay for reliable problem solving, clear communication, and on-time delivery.',
        bullets: [
          'Pick one concrete deliverable (e.g., landing page build, Shopify speed audit, SEO blog package, or clean UI prototype).',
          'Start with 10–15 hours per week around university classes or a day job so you never rush client work.',
          'Treat every small project like a long-term portfolio case study.',
        ],
      },
      {
        heading: '2. Your First 30-Day Launch Plan',
        body: 'Instead of opening accounts on ten marketplaces at once, follow a focused sequence during your first month:',
        paragraphs: [
          'Week 1: Audit your current skills and pick one clear service niche. Week 2: Build two realistic sample projects from scratch so clients can inspect real proof of work.',
          'Week 3: Set up a clean portfolio page and one marketplace profile (Fiverr or Upwork) plus a LinkedIn headline stating who you help. Week 4: Send tailored, problem-first outreach messages daily.',
        ],
        exampleBox: {
          title: 'Example Positioning Statement',
          content:
            '"I help SaaS and education startups turn messy Figma drafts into fast, accessible React + Tailwind landing pages within 5 business days."',
        },
        internalLink: {
          label: 'Take the Career Interest Quiz in Toolkit',
          to: '/toolkit?tab=career-quiz',
        },
      },
    ],
    actionChecklist: [
      'Choose 1 primary skill and 1 clear target client type.',
      'Reserve 1–2 consistent hours daily for skill practice and outreach.',
      'Build 2–3 self-initiated sample projects before pitching paid clients.',
    ],
    relatedLinks: [
      {
        title: 'How to Create a Portfolio With No Clients',
        description: 'Build credible proof-of-work case studies in one weekend.',
        to: '/freelancing/how-to-create-a-portfolio-with-no-clients',
        badge: 'Freelancing',
      },
      {
        title: 'Skill Assessment Quiz',
        description: 'Benchmark your digital readiness and spot priority gaps.',
        to: '/toolkit?tab=skill-quiz',
        badge: 'Toolkit',
      },
    ],
  },
  {
    id: 'fr-remote-jobs',
    slug: 'remote-jobs-and-global-internships-guide',
    title: 'Remote Jobs & Global Internships: Where to Find Verified Roles Worldwide',
    category: 'Remote Jobs & Internships',
    shortDescription:
      'Navigate trustworthy remote job boards, international internships, async hiring expectations, and scam red flags.',
    readingTime: '9 min read',
    thumbnail: '/src/assets/images/freelance_remote_jobs_desk_1795626930434.jpg',
    featured: true,
    difficulty: 'Beginner',
    regionScope: 'Global / Async Remote',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Trusted Channels for Remote Jobs & Internships',
        body: 'Remote-first companies rarely rely solely on generic local classifieds. Focus your weekly applications on vetted boards and direct company career pages:',
        bullets: [
          'We Work Remotely, Remotive, Working Nomads, and Himalayas for remote tech, product, and content roles.',
          'Wellfound (formerly AngelList) for startup internships and junior engineering/design positions.',
          'UN Careers, ReliefWeb, and UNESCO portals for international policy, research, and NGO internships.',
          'Direct company career pages (GitLab, Automattic, Zapier, Wikimedia, Mozilla) with "Work from Anywhere" filters.',
        ],
      },
      {
        heading: '2. Spotting Remote Job & Internship Scams Immediately',
        body: 'Legitimate international employers NEVER ask candidates to pay for training, equipment deposits, visa fees upfront, or telegram-only interviews.',
        bullets: [
          'Verify the recruiter email domain matches the real company website.',
          'Never accept "cheque deposit" equipment purchases or crypto registration fees.',
          'Cross-check every job listing directly on the company’s official /careers page.',
        ],
        internalLink: {
          label: 'Use the One-Page ATS Resume Blueprint',
          to: '/resources/one-page-ats-resume-blueprint',
        },
      },
    ],
    actionChecklist: [
      'Bookmark 4 verified remote job boards and check twice weekly.',
      'Tailor your ATS resume keywords to each role description before applying.',
      'Include timezone availability (e.g., UTC+5 with 4h US/EU overlap) on your CV.',
    ],
    relatedLinks: [
      {
        title: 'Freelancing to Full-Time Remote Career Roadmap',
        description: 'Convert short-term freelance contracts into full-time remote salaries.',
        to: '/freelancing/freelancing-to-remote-career-roadmap',
        badge: 'Freelancing',
      },
      {
        title: 'Resume & CV Tips Generator',
        description: 'Generate action-oriented resume bullet points for remote roles.',
        to: '/toolkit?tab=cv-tips',
        badge: 'Toolkit',
      },
    ],
  },
  {
    id: 'fr-roadmap',
    slug: 'freelancing-to-remote-career-roadmap',
    title: 'Skill Development & Career Roadmap: From Beginner Freelancer to Remote Professional',
    category: 'Remote Jobs & Internships',
    shortDescription:
      'A 6-month structured progression plan linking free learning courses, portfolio proof, client work, and remote full-time roles.',
    readingTime: '8 min read',
    thumbnail: '/src/assets/images/freelance_global_internship_1795626930169.jpg',
    featured: false,
    difficulty: 'Intermediate',
    regionScope: 'Global / Career Progression',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Months 1–2: Core Skill & Documentation Discipline',
        body: 'Focus on one marketable digital craft—frontend engineering, data analytics, UI/UX design, technical SEO, or performance content—and pair it with written async communication.',
        bullets: [
          'Complete one structured project-based curriculum instead of watching disconnected playlists.',
          'Write clear README summaries or Loom walkthroughs explaining your technical decisions.',
        ],
      },
      {
        heading: '2. Months 3–6: Proof of Work to Retainer or Full-Time Remote Role',
        body: 'Turn early freelance deliverables into quantifiable portfolio results ("cut checkout page load time by 42%" or "published 12 technical docs reducing support tickets") that remote hiring managers trust.',
        internalLink: {
          label: 'Explore Developer & Career Learning Roadmaps',
          to: '/resources/developer-and-career-learning-roadmaps',
        },
      },
    ],
    actionChecklist: [
      'Pick one core track and complete 3 end-to-end projects.',
      'Document measurable before/after metrics on every deliverable.',
      'Convert top 1–2 freelance clients into referrals or retainer interviews.',
    ],
  },
  {
    id: 'fr-fiverr',
    slug: 'fiverr-complete-guide-for-beginners',
    title: 'Fiverr Complete Guide: Structuring High-Converting Gigs Without Race-to-the-Bottom Pricing',
    category: 'Fiverr Complete Guide',
    shortDescription:
      'Design searchable gig titles, clean 3-tier packages, honest scope boundaries, and crisp gallery thumbnails on Fiverr.',
    readingTime: '8 min read',
    thumbnail: '/src/assets/images/freelance_fiverr_gigs_1795001586036.jpg',
    featured: true,
    difficulty: 'Beginner',
    regionScope: 'Global Marketplace',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Niche Down Your Gig Title & Search Tags',
        body: 'Generic titles like "I will build a website" get buried beneath tens of thousands of listings. Target a narrow buyer problem with high intent.',
        exampleBox: {
          title: 'Specific vs. Generic Gig Titles',
          content:
            'Weak: "I will do graphic design for you."\nStrong: "I will design clean pitch deck slides for SaaS and edtech founders."',
        },
      },
      {
        heading: '2. Clear 3-Tier Packaging & Revision Rules',
        body: 'Separate Basic (diagnostic or single asset), Standard (core deliverable), and Premium (full package + priority turnaround) so buyers self-select transparently without scope creep.',
        bullets: [
          'Specify exact deliverables, file formats, and number of included revisions.',
          'Upload clean, legible thumbnail graphics with at most 4–6 words—avoid cluttered badges.',
          'Answer 4–5 realistic buyer FAQs right inside your gig description.',
        ],
      },
    ],
    actionChecklist: [
      'Write a specific gig title targeting one buyer use case.',
      'Create 3 clean portfolio slides/screenshots for your gig gallery.',
      'Define exact deliverables and revision limits in Basic/Standard/Premium tiers.',
    ],
  },
  {
    id: 'fr-upwork',
    slug: 'upwork-complete-guide-winning-proposals',
    title: 'Upwork Complete Guide: Writing Proposals That Clients Actually Read',
    category: 'Upwork Complete Guide',
    shortDescription:
      'Stop pasting generic templates. Structure the first two lines of your Upwork proposal around the client’s exact problem.',
    readingTime: '8 min read',
    thumbnail: '/src/assets/images/freelance_proposal_closeup_1795001906066.jpg',
    featured: false,
    difficulty: 'Beginner',
    regionScope: 'Global Marketplace',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Why the First Two Sentences Decide Everything',
        body: 'Clients see only the first ~180 characters of your proposal in their Upwork inbox before deciding whether to open it. Never waste that space on "Dear Sir/Madam, I am a hardworking freelancer with 5 years experience."',
        exampleBox: {
          title: 'High-Signal Opening Lines',
          content:
            '"Hi Maya — I checked your current Shopify collection page on mobile and noticed three layout shifts slowing add-to-cart. Here is how I fixed the exact same issue for a wellness store last month (2-min Loom + live link below)."',
        },
      },
      {
        heading: '2. Smart Connect Usage & Job Vetting',
        body: 'Protect your Upwork Connects by applying selectively to jobs with verified payment methods, clear deliverables, and fewer than 15–20 proposals when possible.',
        bullets: [
          'Lead with a relevant sample link or 60-second Loom walkthrough.',
          'Ask 1–2 thoughtful clarifying questions showing you actually read the brief.',
          'Close with a low-friction next step (e.g., "Happy to hop on a 10-minute call or outline a milestone plan").',
        ],
      },
    ],
    actionChecklist: [
      'Audit 5 live Upwork briefs in your niche and list recurring client pain points.',
      'Replace generic greetings with a specific observation in line 1.',
      'Attach 1–2 directly relevant portfolio pieces rather than 10 unrelated files.',
    ],
  },
  {
    id: 'fr-portfolio',
    slug: 'how-to-create-a-portfolio-with-no-clients',
    title: 'How to Create a High-Trust Portfolio When You Have Zero Paid Clients',
    category: 'How to Create a Portfolio',
    shortDescription:
      'Build three realistic, self-initiated case studies that prove your problem-solving process to international clients and recruiters.',
    readingTime: '7 min read',
    thumbnail: '/src/assets/images/freelance_portfolio_build_1795001587404.jpg',
    featured: false,
    difficulty: 'Beginner',
    regionScope: 'Global',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Clients Care About Proof, Not Invoices',
        body: 'No client asks whether a great UI redesign, Python automation script, or SEO teardown was paid or self-initiated—provided you label it honestly as a concept or case study and show real craftsmanship.',
        bullets: [
          'Case Study 1: Redesign or rebuild a broken real-world workflow (clearly marked as an independent concept).',
          'Case Study 2: Solve a problem for a local community group, student club, or open-source repo.',
          'Case Study 3: Create a reusable template or mini-tool demonstrating clean architecture.',
        ],
      },
      {
        heading: '2. The 4-Part Case Study Formula',
        body: 'Structure every portfolio entry around: (1) Context & Goal, (2) Constraints & Approach, (3) Deliverable Preview (live demo/screenshots), and (4) Outcome or Trade-offs.',
        internalLink: {
          label: 'Read 5 Portfolio Upgrades That Make Clients Stay',
          to: '/blog/5-portfolio-upgrades-that-make-recruiters-and-clients-stay',
        },
      },
    ],
    actionChecklist: [
      'Create 3 focused sample case studies in your target niche.',
      'Add a 1-sentence summary of the problem and solution above the fold.',
      'Test every live link and image on mobile before sharing your portfolio.',
    ],
  },
  {
    id: 'fr-first-client',
    slug: 'how-to-find-your-first-client',
    title: 'How to Find Your First Paying Client Without Spamming',
    category: 'How to Find Your First Client',
    shortDescription:
      'Combine warm referrals, niche communities, marketplace filters, and personalized micro-audits to land client #1 cleanly.',
    readingTime: '7 min read',
    thumbnail: '/src/assets/images/freelance_networking_coffee_1795001906306.jpg',
    difficulty: 'Beginner',
    regionScope: 'Global',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Four Practical First-Client Channels',
        body: 'Relying on a single marketplace takes patience. Pair marketplace applications with direct, respectful relationship building:',
        bullets: [
          'Warm network announcement: Tell university peers, alumni, and local founders specifically what service you offer.',
          'Helpful community contributions: Answer real questions in developer, Notion, Shopify, or creator communities.',
          'Targeted micro-audits: Record a concise 90-second video showing a real bug fix or UX improvement for a prospect.',
          'Curated starter projects on Upwork or Fiverr with rapid, reliable turnaround.',
        ],
      },
    ],
    actionChecklist: [
      'Share a clear 3-line summary of your service with 10 people in your existing network.',
      'Send 5 customized value-first outreach notes per day for 14 days.',
      'Deliver above expectations on your very first project to earn a detailed testimonial.',
    ],
  },
  {
    id: 'fr-skills',
    slug: 'freelancing-skills-to-learn-in-demand',
    title: 'In-Demand Freelancing & Remote Skills to Learn in 2026',
    category: 'Freelancing Skills to Learn',
    shortDescription:
      'Compare technical, creative, data, and AI-augmented skills by learning curve, equipment needs, and global client demand.',
    readingTime: '8 min read',
    thumbnail: '/src/assets/images/freelance_skills_whiteboard_1795001906956.jpg',
    difficulty: 'Beginner',
    regionScope: 'Global',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. High-Leverage Skill Tracks for Beginners & Graduates',
        body: 'Choose a skill where AI assists productivity rather than replaces human judgment, context, and QA:',
        bullets: [
          'Full-Stack & Frontend Web Development (React, TypeScript, Next.js, Shopify/Webflow).',
          'Data Analytics, Dashboards & Automation (SQL, Python, Looker Studio, Zapier/Make workflows).',
          'UI/UX Product Design & Design Systems (Figma prototyping, accessibility audits).',
          'Technical Writing, Documentation & B2B SEO Content.',
          'Short-Form Video Editing & Motion Graphics for educational/SaaS brands.',
        ],
        internalLink: {
          label: 'Take the Career Interest & Skill Quizzes',
          to: '/toolkit?tab=skill-quiz',
        },
      },
    ],
    actionChecklist: [
      'Select 1 primary skill stack aligned with your current strengths.',
      'Commit 6–8 weeks to structured practice before bidding on advanced briefs.',
      'Learn how to pair your craft with AI tools responsibly without skipping fundamentals.',
    ],
  },
  {
    id: 'fr-comms',
    slug: 'client-communication-that-builds-repeat-work',
    title: 'Client Communication That Builds Trust & Repeat Retainers',
    category: 'Client Communication',
    shortDescription:
      'Use crisp kickoff briefs, weekly async status updates, and polite scope-change scripts to keep international clients happy.',
    readingTime: '6 min read',
    thumbnail: '/src/assets/images/freelance_client_call_male_1795001907899.jpg',
    difficulty: 'Beginner',
    regionScope: 'Global / Async',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Proactive Updates Beat Silent Perfection',
        body: 'Remote clients get anxious when freelancers go silent for days. Send short, structured Friday or milestone updates covering what is done, what is next, and any blockers.',
        exampleBox: {
          title: 'Scope Change Script',
          content:
            '"That extra dashboard view sounds very useful! It sits outside our original 3-page scope, so I can either add it as a separate milestone for $X (2 extra days) or save it for Phase 2 after launch. Which works better for you?"',
        },
      },
    ],
    actionChecklist: [
      'Confirm deliverables, timeline, and revision limits in writing before starting.',
      'Send proactive milestone check-ins at least twice a week.',
      'Always propose a constructive option when handling extra client requests.',
    ],
  },
  {
    id: 'fr-pricing',
    slug: 'pricing-and-payment-methods-for-freelancers',
    title: 'Pricing Projects & Receiving International Freelance Payments Safely',
    category: 'Pricing and Payment Methods',
    shortDescription:
      'Calculate sustainable hourly and fixed-milestone rates, protect yourself with escrow or 50% deposits, and compare cross-border payout rails.',
    readingTime: '7 min read',
    thumbnail: '/src/assets/images/freelance_pricing_finance_1795001586998.jpg',
    difficulty: 'Intermediate',
    regionScope: 'Global Cross-Border',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Pricing Models: Hourly vs. Fixed Milestone',
        body: 'Use milestone-based fixed pricing when requirements are crystal clear, and hourly tracking when discovery or ongoing maintenance is open-ended. Always account for taxes, platform fees (10%–20%), and non-billable admin hours.',
      },
      {
        heading: '2. Safe Payment Rails & Deposit Protection',
        body: 'Never deliver final editable source files before milestone funding or invoice settlement.',
        bullets: [
          'On Upwork/Fiverr, keep all communication and payments strictly on-platform as required by terms.',
          'For direct off-platform clients, request a 40%–50% upfront deposit and split larger work into funded milestones.',
          'Compare Wise, Payoneer, Stripe/local bank SWIFT wires, and local compliance rules in your country.',
        ],
      },
    ],
    actionChecklist: [
      'Write a simple 1-page Scope & Payment Terms agreement for direct clients.',
      'Verify payout fees and withdrawal timelines in your country before invoicing.',
      'Collect 50% upfront or escrow funding before starting direct projects.',
    ],
  },
  {
    id: 'fr-mistakes',
    slug: 'common-freelancing-mistakes-beginners-make',
    title: '9 Common Freelancing Mistakes That Stall Beginners (and How to Fix Each One)',
    category: 'Common Freelancing Mistakes',
    shortDescription:
      'Avoid underpricing, unclear scopes, missed deadlines, zero contracts, and over-relying on one client.',
    readingTime: '6 min read',
    thumbnail: '/src/assets/images/freelance_deadline_checklist_1795001907430.jpg',
    difficulty: 'Beginner',
    regionScope: 'Global',
    updatedAt: '2026-11-25',
    sections: [
      {
        heading: '1. Mistakes That Hurt New Freelancers Most',
        body: 'Most beginner setbacks stem from unclear expectations rather than lack of technical talent:',
        bullets: [
          'Saying "yes" to vague briefs without locking down deliverables and deadlines.',
          'Sharing full production files before milestone approval.',
          'Relying on 100% of income from a single client without ongoing pipeline outreach.',
          'Overpromising unrealistic 24-hour delivery just to win a bid.',
        ],
      },
    ],
    actionChecklist: [
      'Build buffer time (20%) into every client deadline estimate.',
      'Keep at least 2–3 active pipeline conversations running even when busy.',
      'Review every completed project for lessons to refine your next proposal.',
    ],
  },
];
