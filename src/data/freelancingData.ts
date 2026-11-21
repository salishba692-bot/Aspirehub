import { FreelancingCategory, FreelancingGuide } from '../types';

export const FREELANCING_CATEGORIES: FreelancingCategory[] = [
  'Introduction to Freelancing',
  'Fiverr Complete Guide',
  'Upwork Complete Guide',
  'How to Create a Portfolio',
  'How to Find Your First Client',
  'Freelancing Skills to Learn',
  'Client Communication',
  'Pricing and Payment Methods',
  'Common Freelancing Mistakes',
];

const IMG_REMOTE_INTRO = '/src/assets/images/freelance_coworking_hub_1795001906004.jpg';
const IMG_FIVERR_GIGS = '/src/assets/images/freelance_fiverr_gigs_1795001586036.jpg';
const IMG_UPWORK_PROPOSALS = '/src/assets/images/freelance_proposal_closeup_1795001906066.jpg';
const IMG_PORTFOLIO_BUILD = '/src/assets/images/freelance_portfolio_build_1795001587404.jpg';
const IMG_CLIENT_OUTREACH = '/src/assets/images/freelance_networking_coffee_1795001906306.jpg';
const IMG_SKILLS_STUDY = '/src/assets/images/freelance_skills_whiteboard_1795001906956.jpg';
const IMG_CLIENT_COMM = '/src/assets/images/freelance_client_call_male_1795001907899.jpg';
const IMG_PRICING_FINANCE = '/src/assets/images/freelance_pricing_finance_1795001586998.jpg';
const IMG_MISTAKES_REVIEW = '/src/assets/images/freelance_deadline_checklist_1795001907430.jpg';

export const FREELANCING_GUIDES: FreelancingGuide[] = [
  {
    id: 'fg-intro',
    slug: 'introduction-to-freelancing-for-beginners',
    title: 'Introduction to Freelancing: How Independent Work Actually Works',
    category: 'Introduction to Freelancing',
    shortDescription:
      'Understand the core business model of freelancing, what clients actually pay for, and a realistic 30-day launch plan for students and beginners.',
    readingTime: '8 min read',
    thumbnail: IMG_REMOTE_INTRO,
    featured: true,
    difficulty: 'Beginner',
    updatedAt: '2026-10-12',
    sections: [
      {
        heading: '1. What Clients Actually Buy From Freelancers',
        body: 'Beginners often assume clients hire freelancers simply because they know a tool like Figma, Python, or Excel. In practice, businesses hire freelancers to remove a bottleneck, save time, or increase revenue reliably without committing to a full-time salary.',
        bullets: [
          'Speed & Reliability: Delivering clean work on the agreed date.',
          'Clarity: Asking smart clarifying questions before starting.',
          'Problem Solving: Translating vague requirements into a finished deliverable.',
        ],
      },
      {
        heading: '2. Choose One Specific Service Before Creating Accounts',
        body: 'Offering "everything" (logo design + video editing + data entry + web development) signals inexperience. Pick one narrow skill and one clear client type for your first 90 days.',
        exampleBox: {
          title: 'Positioning Example (Before vs. After)',
          content:
            'Weak: "I do graphic design and social media." \nStrong: "I design clean pitch decks and one-page flyers for early-stage tech founders."',
        },
        internalLink: {
          label: 'Compare skill tracks in our Career & Tech Learning Roadmaps Guide',
          to: '/resources/developer-and-career-learning-roadmaps',
        },
      },
      {
        heading: '3. Your Realistic First 30-Day Roadmap',
        body: 'Do not rush onto marketplaces on Day 1 with an empty profile. Spend two weeks building proof of skill, then launch with targeted outreach and marketplace profiles.',
        bullets: [
          'Days 1–7: Pick one skill and audit 10 high-performing freelancer profiles in that niche.',
          'Days 8–18: Build 3 realistic self-initiated sample projects with clear before/after explanations.',
          'Days 19–30: Set up one focused marketplace profile + send 3 personalized outreach messages per day.',
        ],
      },
    ],
    actionChecklist: [
      'Select one primary marketable skill and one target industry.',
      'Write a 2-sentence positioning statement describing who you help and what outcome you deliver.',
      'Create 3 clean portfolio samples before opening paid proposals.',
    ],
    relatedLinks: [
      {
        title: 'How to Create a Portfolio With No Clients',
        description: 'Build 3 credible self-initiated case studies this week.',
        to: '/freelancing/how-to-create-a-portfolio-with-no-clients',
        badge: 'Freelancing',
      },
      {
        title: '1-Page ATS Resume Blueprint',
        description: 'Package your skills cleanly for remote job & client outreach.',
        to: '/resources/one-page-ats-resume-blueprint',
        badge: 'Resource',
      },
    ],
  },
  {
    id: 'fg-fiverr',
    slug: 'fiverr-complete-guide-for-beginners',
    title: 'Fiverr Complete Guide: Structuring Gigs That Convert Views Into Orders',
    category: 'Fiverr Complete Guide',
    shortDescription:
      'Learn how to research low-competition gig keywords, write clear 3-tier packages, design readable thumbnails, and handle your first Fiverr buyer.',
    readingTime: '9 min read',
    thumbnail: IMG_FIVERR_GIGS,
    featured: true,
    difficulty: 'Beginner',
    updatedAt: '2026-10-18',
    sections: [
      {
        heading: '1. Keyword Research Inside Fiverr Search',
        body: 'Fiverr operates like a search engine for packaged services. Before writing a single word of your gig, search your core skill in Fiverr’s search bar and look at the auto-suggest phrases buyers actually type.',
        bullets: [
          'Look for sub-niches with 500–3,500 competing gigs rather than 50,000+.',
          'Use specific outcome keywords (e.g., "Shopify speed optimization" instead of "website help").',
        ],
      },
      {
        heading: '2. Crafting Clear 3-Tier Packages (Basic, Standard, Premium)',
        body: 'Never price all three tiers randomly. Structure them as a natural progression so buyers immediately understand what each tier unlocks.',
        exampleBox: {
          title: 'Sample 3-Tier Package Structure (Landing Page UI)',
          content:
            'Basic: Hero section + wireframe concept (2 days)\nStandard: Full responsive 5-section Figma design (4 days)\nPremium: Full design + interactive prototype + developer handoff kit (7 days)',
        },
      },
      {
        heading: '3. Gig Gallery & First-Impression Discipline',
        body: 'Avoid cluttered thumbnails crammed with 10 badges and tiny text. Use 3–4 words maximum on the cover image, high contrast, and include a crisp PDF portfolio case study in your secondary slides.',
        internalLink: {
          label: 'Use Canva Magic Studio to design clean, legible gig thumbnails',
          to: '/ai-tools/canva-magic-studio',
        },
      },
    ],
    actionChecklist: [
      'Identify 5 specific search keywords from Fiverr auto-suggest.',
      'Write an FAQ section answering revision limits, source files, and delivery formats.',
      'Use clean, readable 1280×769px gig imagery without fake star ratings.',
    ],
    relatedLinks: [
      {
        title: 'Upwork Complete Guide: Winning Proposals',
        description: 'Pair Fiverr inbound gigs with proactive Upwork proposals.',
        to: '/freelancing/upwork-complete-guide-winning-proposals',
        badge: 'Freelancing',
      },
      {
        title: '5 Portfolio Upgrades That Keep Clients Reading',
        description: 'Improve your gig gallery PDFs with clean case studies.',
        to: '/blog/5-portfolio-upgrades-that-make-recruiters-and-clients-stay',
        badge: 'Blog',
      },
    ],
  },
  {
    id: 'fg-upwork',
    slug: 'upwork-complete-guide-winning-proposals',
    title: 'Upwork Complete Guide: Profile Optimization & Proposal Frameworks',
    category: 'Upwork Complete Guide',
    shortDescription:
      'Master specialized profiles, spot quality job posts, avoid wasted Connects, and write concise proposals that actually get opened.',
    readingTime: '10 min read',
    thumbnail: IMG_UPWORK_PROPOSALS,
    featured: true,
    difficulty: 'Beginner',
    updatedAt: '2026-10-22',
    sections: [
      {
        heading: '1. Filtering Out Low-Quality Job Posts',
        body: 'Your Connects are a finite budget. Before applying to any Upwork listing, run a 30-second quality check on the client’s history.',
        bullets: [
          'Check Payment Verified status and average hourly rate paid previously.',
          'Look at Hire Rate (aim for clients with 40%+ hire rate when they have past posts).',
          'Avoid vague 1-sentence posts with 50+ proposals unless you have an exact portfolio match.',
        ],
      },
      {
        heading: '2. The First Two Lines Win or Lose the Click',
        body: 'Clients only see the first ~2 lines of your proposal in their dashboard preview. Never start with "Hello sir, I am a hardworking developer with 5 years experience." Start directly with their problem and your relevant proof.',
        exampleBox: {
          title: 'High-Converting Opening Lines Template',
          content:
            '"Hi [Client Name] — I noticed your React checkout form is dropping mobile users on step 2. I recently rebuilt a multi-step checkout flow that cut drop-off and works cleanly on iOS/Android; here is a 60-second walkthrough of how I would approach yours."',
        },
        internalLink: {
          label: 'Check our Cover Letter & Proposal Structure Guide for reusable hooks',
          to: '/resources/scholarship-and-job-cover-letter-guide',
        },
      },
      {
        heading: '3. Specialized Profiles & Milestone Protection',
        body: 'Use Upwork’s Specialized Profiles feature if you offer two related services (e.g., Technical Writing and Documentation). Always confirm milestone scope in writing inside Upwork Messages before accepting an offer.',
      },
    ],
    actionChecklist: [
      'Rewrite your Upwork headline around a specific deliverable and client outcome.',
      'Attach 2–3 tailored work samples relevant to each proposal rather than generic links.',
      'Always keep communication and payments inside Upwork’s Terms of Service.',
    ],
    relatedLinks: [
      {
        title: 'Pricing & Payment Methods Guide',
        description: 'Decide between hourly contracts and fixed-scope milestones.',
        to: '/freelancing/pricing-and-payment-methods-for-freelancers',
        badge: 'Freelancing',
      },
      {
        title: 'Claude AI Writing Assistant',
        description: 'Critique proposal clarity while keeping your genuine voice.',
        to: '/ai-tools/claude',
        badge: 'AI Tool',
      },
    ],
  },
  {
    id: 'fg-portfolio',
    slug: 'how-to-create-a-portfolio-with-no-clients',
    title: 'How to Create a Portfolio (Even Without Paid Clients Yet)',
    category: 'How to Create a Portfolio',
    shortDescription:
      'Turn practice builds, redesigns, and university projects into credible case studies that prove your judgment and execution.',
    readingTime: '7 min read',
    thumbnail: IMG_PORTFOLIO_BUILD,
    featured: true,
    difficulty: 'Beginner',
    updatedAt: '2026-10-10',
    sections: [
      {
        heading: '1. Why 3 Deep Case Studies Beat 15 Screenshots',
        body: 'Clients want to see how you think, not just a collage of pretty thumbnails. Each portfolio project should answer four short questions: What was the problem? What constraints existed? What did you build? What changed?',
      },
      {
        heading: '2. Ethical Ways to Build Samples Before Your First Client',
        body: 'Never claim fake client work as real paid engagements. Label self-initiated work honestly as a Concept Project or Redesign Study—clients respect initiative and transparency.',
        bullets: [
          'Redesign a confusing landing page for a real local business and explain the usability fixes.',
          'Build an open-source tool or clean template solving a real workflow annoyance.',
          'Volunteer one scoped deliverable for a student club or non-profit and request a factual testimonial.',
        ],
        internalLink: {
          label: 'Read 5 Portfolio Upgrades That Make Clients Stay',
          to: '/blog/5-portfolio-upgrades-that-make-recruiters-and-clients-stay',
        },
      },
    ],
    actionChecklist: [
      'Publish 3 case studies using Notion, GitHub, Behance, or a simple personal site.',
      'Include clear context, tools used, and live preview links or PDFs.',
      'Label concept projects transparently as self-initiated case studies.',
    ],
    relatedLinks: [
      {
        title: 'Notion AI Workspace',
        description: 'Host clean, shareable case study pages quickly.',
        to: '/ai-tools/notion-ai',
        badge: 'AI Tool',
      },
    ],
  },
  {
    id: 'fg-first-client',
    slug: 'how-to-find-your-first-client',
    title: 'How to Find Your First Client Beyond Crowded Marketplaces',
    category: 'How to Find Your First Client',
    shortDescription:
      'Combine warm network outreach, thoughtful cold emails, and community contributions to land your first paying project ethically.',
    readingTime: '8 min read',
    thumbnail: IMG_CLIENT_OUTREACH,
    featured: true,
    difficulty: 'Beginner',
    updatedAt: '2026-10-25',
    sections: [
      {
        heading: '1. Start With Your Warm Circle Without Being Pushy',
        body: 'Let classmates, former managers, local business owners, and LinkedIn connections know clearly what problem you now solve. A concise status update with one concrete example often surfaces leads faster than cold bidding.',
      },
      {
        heading: '2. Value-First Cold Outreach (No Spam Blasts)',
        body: 'Instead of sending 100 identical emails, research 5 businesses per day whose website, content, or workflow has an obvious fixable gap. Send a brief, respectful note pointing out one helpful observation.',
        exampleBox: {
          title: 'Short Cold Outreach Structure',
          content:
            '1. Specific observation about their current page/product.\n2. Concrete suggestion or 2-minute sample fix.\n3. Low-friction next step ("Happy to send a quick outline if helpful—no obligation.").',
        },
        internalLink: {
          label: 'Review our Digital Skills & Career Readiness Guide before outreach',
          to: '/resources/digital-skills-and-career-readiness-guide',
        },
      },
    ],
    actionChecklist: [
      'List 15 people in your existing network and share your focused service offer.',
      'Research 5 real businesses per day and send personalized, helpful observations.',
      'Track follow-ups calmly in a simple spreadsheet (follow up once after 5 business days).',
    ],
    relatedLinks: [
      {
        title: 'Client Communication Scripts & Boundaries',
        description: 'Convert replies into smooth kickoff calls.',
        to: '/freelancing/client-communication-that-builds-repeat-work',
        badge: 'Freelancing',
      },
    ],
  },
  {
    id: 'fg-skills',
    slug: 'freelancing-skills-to-learn-in-demand',
    title: 'Freelancing Skills to Learn: High-Demand Paths & Realistic Timelines',
    category: 'Freelancing Skills to Learn',
    shortDescription:
      'Compare technical, creative, and operational freelance skills by learning curve, startup cost, and market demand.',
    readingTime: '7 min read',
    thumbnail: IMG_SKILLS_STUDY,
    difficulty: 'Beginner',
    updatedAt: '2026-10-08',
    sections: [
      {
        heading: '1. Pick Skills With Clear Business Value',
        body: 'The most resilient freelance skills are tied directly to how companies build products, reach customers, or save operational hours.',
        bullets: [
          'Web & No-Code Development: React, WordPress, Webflow, Shopify customization.',
          'Design & Content: UI/UX design in Figma, pitch deck design, technical documentation, short-form video editing.',
          'Data & Automation: Excel/Google Sheets modeling, SQL reporting, CRM workflow setup.',
        ],
        internalLink: {
          label: 'Follow our step-by-step Full-Stack Web Development Curriculum',
          to: '/resources/full-stack-web-development-curriculum-guide',
        },
      },
      {
        heading: '2. Combine a Core Skill With Domain Context',
        body: 'Learning basic React is common; learning React + accessible e-commerce storefront optimization makes you far more valuable to clients.',
      },
    ],
    actionChecklist: [
      'Pick one skill track you can practice 60 minutes daily for 60 days.',
      'Pair your skill with free structured roadmaps inside our Resources Hub.',
    ],
    relatedLinks: [
      {
        title: 'Choosing Your First High-Value Digital Skill',
        description: 'Break out of tutorial paralysis with the 30/70 build ratio.',
        to: '/blog/choosing-your-first-high-value-digital-skill',
        badge: 'Blog',
      },
    ],
  },
  {
    id: 'fg-communication',
    slug: 'client-communication-that-builds-repeat-work',
    title: 'Client Communication: Setting Expectations, Updates & Boundaries',
    category: 'Client Communication',
    shortDescription:
      'Professional scripts for project kickoffs, handling scope creep politely, and sending weekly progress updates clients appreciate.',
    readingTime: '6 min read',
    thumbnail: IMG_CLIENT_COMM,
    difficulty: 'Beginner',
    updatedAt: '2026-10-14',
    sections: [
      {
        heading: '1. Eliminate Ambiguity at Kickoff',
        body: 'Most freelance disputes happen because deliverables, revision counts, and timelines were assumed rather than written down. Always send a 5-line recap message right after a kickoff call.',
      },
      {
        heading: '2. Handling Scope Creep Calmly',
        body: 'When a client asks for extra features outside the original agreement, say yes to helping while clarifying the impact on timeline and budget.',
        exampleBox: {
          title: 'Scope Creep Response Script',
          content:
            '"That extra reporting screen is a great idea. Since it sits outside our Phase 1 milestone, I can either add it as a separate mini-milestone for [Amount] after Friday’s delivery, or swap it with [Item X]. Which works better for you?"',
        },
        internalLink: {
          label: 'Balancing University Classes and Your First Freelance Clients',
          to: '/blog/balancing-university-classes-and-first-freelance-clients',
        },
      },
    ],
    actionChecklist: [
      'Send a written summary after every client call confirming deliverables and dates.',
      'Proactively update clients mid-project—never wait until the deadline if a blocker appears.',
    ],
    relatedLinks: [
      {
        title: 'Interview & Discovery Call Preparation Handbook',
        description: 'Questions to ask clients before sending a quote.',
        to: '/resources/interview-preparation-complete-handbook',
        badge: 'Resource',
      },
    ],
  },
  {
    id: 'fg-pricing',
    slug: 'pricing-and-payment-methods-for-freelancers',
    title: 'Pricing & Payment Methods: Hourly vs. Fixed Scope and Getting Paid Safely',
    category: 'Pricing and Payment Methods',
    shortDescription:
      'Learn how to calculate your baseline rate, structure milestone payments, and choose reliable international payout options.',
    readingTime: '8 min read',
    thumbnail: IMG_PRICING_FINANCE,
    difficulty: 'Intermediate',
    updatedAt: '2026-10-28',
    sections: [
      {
        heading: '1. Hourly vs. Fixed-Project Pricing',
        body: 'Use hourly billing when requirements are evolving or exploratory (such as ongoing debugging or advisory support). Use fixed-project pricing when deliverables are tightly defined so your speed rewards you rather than penalizing you.',
      },
      {
        heading: '2. Milestone Structure & Safe International Payments',
        body: 'For direct off-platform clients, never deliver 100% of final source files without an upfront deposit (commonly 30%–50% upfront, 50% upon approved delivery) and a simple written agreement.',
        bullets: [
          'Marketplace Escrow: Fiverr and Upwork handle escrow protection automatically.',
          'Direct Invoicing: Use established cross-border services available in your country (e.g., Payoneer, Wise Business where supported, or official bank wire / SWIFT) and keep clear invoice records.',
        ],
      },
    ],
    actionChecklist: [
      'Calculate your minimum sustainable monthly expenses and working hours before setting rates.',
      'Use clear written invoices listing scope, currency, payment terms, and due date.',
    ],
    relatedLinks: [
      {
        title: 'Common Freelancing Mistakes Beginners Make',
        description: 'Avoid underpricing traps and single-client dependency.',
        to: '/freelancing/common-freelancing-mistakes-beginners-make',
        badge: 'Freelancing',
      },
    ],
  },
  {
    id: 'fg-mistakes',
    slug: 'common-freelancing-mistakes-beginners-make',
    title: 'Common Freelancing Mistakes (And How to Avoid Them Early)',
    category: 'Common Freelancing Mistakes',
    shortDescription:
      'Spot early traps—from underpricing and vague contracts to relying on a single client—before they stall your growth.',
    readingTime: '6 min read',
    thumbnail: IMG_MISTAKES_REVIEW,
    difficulty: 'Beginner',
    updatedAt: '2026-11-02',
    sections: [
      {
        heading: '1. Racing to the Bottom on Price',
        body: 'Charging rock-bottom prices often attracts the most demanding clients and leaves you burned out. Competitive starter pricing should still respect your time and allow you to over-deliver with care.',
      },
      {
        heading: '2. Depending on One Client for 100% of Income',
        body: 'Even a wonderful retainer client can pause budgets overnight. Keep your portfolio updated and continue light networking so your pipeline never drops to zero.',
      },
      {
        heading: '3. Ignoring Contracts, Backups, and Taxes',
        body: 'Always store work in version control or cloud backups, verify local freelance tax/registration rules in your country, and confirm usage rights before handing off final work.',
      },
    ],
    actionChecklist: [
      'Avoid starting direct client work without written scope and deposit confirmation.',
      'Dedicate 2 hours every Friday to updating your portfolio and pipeline.',
    ],
    relatedLinks: [
      {
        title: 'How to Find Your First Client Beyond Marketplaces',
        description: 'Build a diversified client pipeline early.',
        to: '/freelancing/how-to-find-your-first-client',
        badge: 'Freelancing',
      },
    ],
  },
];
