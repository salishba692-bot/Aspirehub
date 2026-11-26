import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  CheckSquare,
  Compass,
  Copy,
  FileText,
  GraduationCap,
  HelpCircle,
  RotateCcw,
  Square,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { InternalLinkRef } from '../types';

type ToolkitTab = 'eligibility' | 'career-quiz' | 'cv-tips' | 'skill-quiz';

const VALID_TABS: ToolkitTab[] = ['eligibility', 'career-quiz', 'cv-tips', 'skill-quiz'];
const CHECKLIST_STORAGE_KEY = 'aspirehub_scholarship_checklist_v1';

interface ChecklistItem {
  id: string;
  title: string;
  hint: string;
  degrees: Array<'Undergraduate' | "Master's" | 'PhD'>;
  guideTo: string;
  guideLabel: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-passport',
    title: 'Valid Passport / National ID (6+ months validity)',
    hint: 'Ensure exact legal name matches transcripts and test score reports.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/blog/12-month-international-scholarship-preparation-calendar',
    guideLabel: '12-Month Calendar',
  },
  {
    id: 'chk-transcripts',
    title: 'Certified Academic Transcripts & Degree Certificates',
    hint: 'Request sealed English translations or HEC/university attestations early.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/scholarships',
    guideLabel: 'Scholarship Hub',
  },
  {
    id: 'chk-english',
    title: 'English Proficiency Test (IELTS / TOEFL / PTE / Duolingo)',
    hint: 'Verify whether your target country or consortium accepts medium-of-instruction waivers.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/resources/international-student-readiness-and-english-tests-guide',
    guideLabel: 'English Tests Guide',
  },
  {
    id: 'chk-standardized',
    title: 'Program-Required Entrance Score (SAT / GRE / HAT / USAT)',
    hint: 'Required by programmes like Fulbright (GRE), US universities, or HEC Pakistan.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/resources/quantitative-foundations-and-test-prep-guide',
    guideLabel: 'Test Prep Guide',
  },
  {
    id: 'chk-cv',
    title: 'Tailored Academic CV or Europass Format',
    hint: 'Highlight GPA, research theses, scholarships, technical skills, and leadership clearly.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/resources/academic-cv-template-for-scholarships-and-research',
    guideLabel: 'Academic CV Guide',
  },
  {
    id: 'chk-sop',
    title: 'Drafted & Peer-Reviewed Statement of Purpose (SOP)',
    hint: 'Connect prior preparation, specific target modules, and post-study impact.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/blog/how-to-write-a-standout-statement-of-purpose',
    guideLabel: 'SOP Writing Guide',
  },
  {
    id: 'chk-referees',
    title: 'Two to Three Confirmed Academic / Professional Referees',
    hint: 'Brief referees 4–6 weeks ahead with your CV, SOP draft, and portal deadlines.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/resources/scholarship-and-job-cover-letter-guide',
    guideLabel: 'Cover Letter & Referees',
  },
  {
    id: 'chk-work',
    title: 'Documented Work or Leadership Experience Hours (If Required)',
    hint: 'Mandatory for awards like Chevening, DAAD EPOS, and Swedish Institute (SISGP).',
    degrees: ["Master's", 'PhD'],
    guideTo: '/freelancing/remote-jobs-and-global-internships-guide',
    guideLabel: 'Experience Guide',
  },
  {
    id: 'chk-research',
    title: 'Research Proposal & Host Supervisor Outreach Letter',
    hint: 'Essential for doctoral fellowships such as Swiss Excellence (ESKAS) and MEXT.',
    degrees: ['PhD'],
    guideTo: '/ai-tools/perplexity-ai',
    guideLabel: 'Research Discovery',
  },
  {
    id: 'chk-interview',
    title: 'STAR-Method Interview Stories & Country Policy Notes',
    hint: 'Prepare concise examples of leadership, teamwork, and setback recovery.',
    degrees: ['Undergraduate', "Master's", 'PhD'],
    guideTo: '/resources/interview-preparation-complete-handbook',
    guideLabel: 'Interview Handbook',
  },
];

type CareerTrackId = 'engineering' | 'data-ai' | 'design-content' | 'freelance-ops' | 'global-policy';

interface QuizQuestion {
  id: string;
  prompt: string;
  options: Array<{ label: string; track: CareerTrackId }>;
}

const CAREER_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cq1',
    prompt: 'Which activity makes you lose track of time in a good way?',
    options: [
      { label: 'Building interactive websites, apps, or debugging systems', track: 'engineering' },
      { label: 'Analyzing datasets, experiments, or reading research papers', track: 'data-ai' },
      { label: 'Designing clean interfaces, slides, or visual stories', track: 'design-content' },
      { label: 'Writing persuasive proposals, guides, or managing projects', track: 'freelance-ops' },
      { label: 'Researching public policy, climate impact, or community leadership', track: 'global-policy' },
    ],
  },
  {
    id: 'cq2',
    prompt: 'What type of portfolio artifact would you enjoy creating this month?',
    options: [
      { label: 'A deployed full-stack web app with real API integration', track: 'engineering' },
      { label: 'An analytical notebook or cited AI research benchmark', track: 'data-ai' },
      { label: 'A Figma UI redesign case study and brand landing page', track: 'design-content' },
      { label: 'Three client-ready freelance packages with clear deliverables', track: 'freelance-ops' },
      { label: 'A scholarship SOP and community development policy brief', track: 'global-policy' },
    ],
  },
  {
    id: 'cq3',
    prompt: 'How do you prefer to earn or progress over the next 6–12 months?',
    options: [
      { label: 'Land a remote software internship or junior developer role', track: 'engineering' },
      { label: 'Qualify for an MSc/PhD scholarship or technical research fellowship', track: 'data-ai' },
      { label: 'Win freelance design or video/brand projects on Fiverr & Upwork', track: 'design-content' },
      { label: 'Build recurring international freelance clients while studying', track: 'freelance-ops' },
      { label: 'Win a funded Master’s fellowship in governance or sustainability', track: 'global-policy' },
    ],
  },
  {
    id: 'cq4',
    prompt: 'Which skill challenge excites you most?',
    options: [
      { label: 'TypeScript, React, APIs, and database architecture', track: 'engineering' },
      { label: 'Python, SQL, statistics, and scientific evaluation', track: 'data-ai' },
      { label: 'Typography, hierarchy, prototyping, and user flows', track: 'design-content' },
      { label: 'Client communication, SEO writing, and scope pricing', track: 'freelance-ops' },
      { label: 'Essay storytelling, academic writing, and interview panels', track: 'global-policy' },
    ],
  },
  {
    id: 'cq5',
    prompt: 'Which AI workflow fits your natural style?',
    options: [
      { label: 'Code review, refactoring, and building prototypes faster', track: 'engineering' },
      { label: 'Synthesizing papers and checking citations across PDFs', track: 'data-ai' },
      { label: 'Drafting visual concepts, wireframes, and presentation decks', track: 'design-content' },
      { label: 'Structuring client briefs, SOP drafts, and project timelines', track: 'freelance-ops' },
      { label: 'Critiquing policy arguments and preparing mock interviews', track: 'global-policy' },
    ],
  },
  {
    id: 'cq6',
    prompt: 'When someone asks for your help, what do they usually ask for?',
    options: [
      { label: 'Fixing technical bugs or automating a tedious workflow', track: 'engineering' },
      { label: 'Explaining complex data, math, or research clearly', track: 'data-ai' },
      { label: 'Making slides, graphics, or pages look polished', track: 'design-content' },
      { label: 'Organizing plans, editing CVs, or drafting clear emails', track: 'freelance-ops' },
      { label: 'Connecting big-picture goals to community or global impact', track: 'global-policy' },
    ],
  },
];

const CAREER_TRACK_RESULTS: Record<
  CareerTrackId,
  {
    title: string;
    summary: string;
    nextSkills: string[];
    links: InternalLinkRef[];
  }
> = {
  engineering: {
    title: 'Full-Stack Web & Remote Software Engineering',
    summary:
      'You thrive when building functional systems and shipping code. Pair foundational web engineering with real deployed projects to target remote internships and freelance dev retainers.',
    nextSkills: ['TypeScript & React', 'REST APIs & SQL Basics', 'Git Workflows & Automated Testing'],
    links: [
      {
        title: 'Full-Stack Web Development Curriculum',
        description: 'Follow a structured roadmap from HTML/CSS to deployed backend services.',
        to: '/resources/full-stack-web-development-curriculum-guide',
        badge: 'Resource',
      },
      {
        title: 'Remote Jobs & Global Internships Guide',
        description: 'Apply safely to verified remote software roles and paid internships.',
        to: '/freelancing/remote-jobs-and-global-internships-guide',
        badge: 'Freelancing',
      },
      {
        title: 'Compare Lovable vs Replit vs Bolt.new',
        description: 'Choose the right AI coding environment without skipping fundamentals.',
        to: '/ai-tools/compare?tools=lovable,replit,bolt-new',
        badge: 'AI Tool',
      },
    ],
  },
  'data-ai': {
    title: 'Data Science, AI Systems & Funded Research Track',
    summary:
      'You enjoy analytical depth, citation accuracy, and solving technical problems cleanly. This profile matches STEM Master’s/PhD scholarships and data-driven engineering roles.',
    nextSkills: ['Python & SQL Data Analysis', 'Research Literature Synthesis', 'GRE Quantitative Prep'],
    links: [
      {
        title: 'CS50 & Quantitative Study Guides',
        description: 'Build rock-solid computational thinking and quantitative foundations.',
        to: '/resources/cs50-computer-science-complete-study-guide',
        badge: 'Resource',
      },
      {
        title: 'Compare Claude vs Perplexity vs NotebookLM',
        description: 'Build an evidence-backed research and study workflow.',
        to: '/ai-tools/compare?tools=claude,perplexity-ai,notebooklm',
        badge: 'AI Tool',
      },
      {
        title: 'Browse STEM & AI Scholarships',
        description: 'Filter Erasmus Mundus, DAAD, Swiss Excellence, and MEXT programmes.',
        to: '/scholarships?category=Fully%20Funded%20Scholarships',
        badge: 'Scholarship',
      },
    ],
  },
  'design-content': {
    title: 'UI/UX Design, Visual Communication & Digital Products',
    summary:
      'You notice visual hierarchy, usability, and storytelling immediately. Product design, landing-page systems, and presentation design are strong remote and freelance niches.',
    nextSkills: ['Figma Component Systems', 'Conversion Landing Page UX', '2-Case-Study Portfolio'],
    links: [
      {
        title: 'How to Create a Portfolio With No Clients',
        description: 'Build 3 self-initiated design & product case studies recruiters trust.',
        to: '/freelancing/how-to-create-a-portfolio-with-no-clients',
        badge: 'Freelancing',
      },
      {
        title: '5 Portfolio Upgrades That Win Clients',
        description: 'Present before/after thinking and measurable outcomes cleanly.',
        to: '/blog/5-portfolio-upgrades-that-make-recruiters-and-clients-stay',
        badge: 'Blog',
      },
      {
        title: 'Compare Readdy vs Gamma vs Canva',
        description: 'Speed up wireframes and client presentation decks ethically.',
        to: '/ai-tools/compare?tools=readdy-ai,gamma-app,canva-magic-studio',
        badge: 'AI Tool',
      },
    ],
  },
  'freelance-ops': {
    title: 'Freelance Consulting, Technical Writing & Remote Operations',
    summary:
      'You combine clear communication with dependable execution. Packaging well-scoped freelance services on Upwork/Fiverr or supporting remote teams fits you strongly.',
    nextSkills: ['Scoped Gig Packaging', 'Client Proposal Writing', 'ATS Resume & Case Studies'],
    links: [
      {
        title: 'Upwork Winning Proposals Complete Guide',
        description: 'Write diagnostic, client-first proposals instead of generic templates.',
        to: '/freelancing/upwork-complete-guide-winning-proposals',
        badge: 'Freelancing',
      },
      {
        title: 'Fiverr Complete Guide for Beginners',
        description: 'Structure tiered packages, clear deliverables, and portfolio thumbnails.',
        to: '/freelancing/fiverr-complete-guide-for-beginners',
        badge: 'Freelancing',
      },
      {
        title: 'Pricing & Safe Payment Methods',
        description: 'Protect your margins and receive cross-border client payouts cleanly.',
        to: '/freelancing/pricing-and-payment-methods-for-freelancers',
        badge: 'Freelancing',
      },
    ],
  },
  'global-policy': {
    title: 'Global Fellowships, Public Policy & Funded Graduate Study',
    summary:
      'You are motivated by leadership, sustainability, and long-term impact. Fully funded international fellowships like Chevening, Fulbright, Australia Awards, and SISGP align with your goals.',
    nextSkills: ['Impact Storytelling (SOP)', 'Academic CV Formatting', 'Panel Interview Prep'],
    links: [
      {
        title: 'How to Write a Standout Statement of Purpose',
        description: 'Connect past leadership to concrete post-scholarship goals.',
        to: '/blog/how-to-write-a-standout-statement-of-purpose',
        badge: 'Blog',
      },
      {
        title: 'Chevening & Commonwealth Scholarship Details',
        description: 'Review eligibility criteria, required docs, and official portals.',
        to: '/scholarships/chevening-uk-government-scholarships',
        badge: 'Scholarship',
      },
      {
        title: 'Interview Preparation Complete Handbook',
        description: 'Practice structured STAR stories for selection panels.',
        to: '/resources/interview-preparation-complete-handbook',
        badge: 'Resource',
      },
    ],
  },
};

type CvRole = 'dev' | 'research' | 'freelance' | 'scholarship';
type CvFocus = 'impact' | 'leadership' | 'technical';

const CV_BULLET_TEMPLATES: Record<CvRole, Record<CvFocus, { tips: string[]; bullets: string[] }>> = {
  dev: {
    impact: {
      tips: [
        'Lead with a strong past-tense verb and state what improved (latency, conversion, test coverage, or hours saved).',
        'Include a live repository or deployment link in the project header rather than stuffing tech buzzwords everywhere.',
      ],
      bullets: [
        'Engineered a responsive React + TypeScript web application serving [X] weekly student users, cutting page load time by [X]% via lazy route splitting.',
        'Automated weekly CSV report validation using Node.js and schema checks, reducing manual data cleanup time by [X] hours per week.',
        'Redesigned checkout/onboarding form validation and error states, lowering user submission failures by [X]% across mobile devices.',
      ],
    },
    leadership: {
      tips: [
        'Show ownership across code reviews, documentation, or mentoring junior contributors.',
      ],
      bullets: [
        'Led a 4-student capstone engineering team using Git feature branches and weekly sprint reviews to ship an accessible MVP ahead of deadline.',
        'Authored onboarding documentation and API usage guides that helped [X] new contributors run local builds in under 15 minutes.',
      ],
    },
    technical: {
      tips: [
        'Pair every tool or framework with the exact engineering problem you solved.',
      ],
      bullets: [
        'Built RESTful API endpoints in Express/TypeScript with input sanitization, rate-limit handling, and structured JSON error responses.',
        'Implemented accessible keyboard navigation, semantic landmarks, and responsive Tailwind CSS grids verified across desktop and mobile viewports.',
      ],
    },
  },
  research: {
    impact: {
      tips: [
        'Highlight dataset size, experimental rigor, reproducibility, or publications/posters clearly.',
      ],
      bullets: [
        'Analyzed a multi-year dataset of [X] records using Python (pandas) and statistical hypothesis testing, identifying [X] key predictors for the thesis report.',
        'Designed a reproducible literature review matrix across [X] peer-reviewed studies to benchmark climate/health policy outcomes.',
      ],
    },
    leadership: {
      tips: [
        'Include lab coordination, teaching assistantships, or seminar organization.',
      ],
      bullets: [
        'Assisted faculty supervisors as Undergraduate Teaching Assistant for [Course Name], leading weekly lab sessions for [X] students.',
        'Coordinated a cross-department student research symposium featuring [X] poster presentations and peer Q&A.',
      ],
    },
    technical: {
      tips: [
        'Mention exact methods, statistical tools, and verification steps.',
      ],
      bullets: [
        'Validated model predictions against baseline benchmarks using k-fold cross-validation and documented failure cases cleanly.',
        'Maintained structured citation archives and reproducible experiment logs to support faculty manuscript submission.',
      ],
    },
  },
  freelance: {
    impact: {
      tips: [
        'Translate client projects into business results (speed, clarity, engagement, repeat contracts).',
      ],
      bullets: [
        'Delivered [X] custom client landing pages and portfolio redesigns for international small businesses with a [X]% on-time milestone rate.',
        'Audited and rewrote technical documentation and onboarding emails for a SaaS client, reducing recurring support tickets by [X]%.',
      ],
    },
    leadership: {
      tips: [
        'Emphasize scoping, milestone communication, and client retention.',
      ],
      bullets: [
        'Managed end-to-end client discovery, milestone scoping, and weekly Loom progress updates across [X] concurrent remote contracts.',
        'Converted [X] initial one-off freelance contracts into multi-month retainers through proactive post-launch audits.',
      ],
    },
    technical: {
      tips: [
        'Specify tools, QA checklists, and handoff deliverables clients actually pay for.',
      ],
      bullets: [
        'Delivered production Figma component libraries paired with responsive implementation specs and accessibility contrast checks.',
        'Configured SEO metadata, XML sitemaps, and semantic HTML structure to improve search indexability for client launches.',
      ],
    },
  },
  scholarship: {
    impact: {
      tips: [
        'Scholarship committees evaluate leadership, measurable community impact, and alignment with national/global priorities.',
      ],
      bullets: [
        'Founded or coordinated a peer-mentoring initiative supporting [X] first-generation applicants with scholarship SOP and CV reviews.',
        'Graduated in the top [X]% of class (CGPA [X]/4.0) while completing a capstone research project focused on [Social/Technical Problem].',
      ],
    },
    leadership: {
      tips: [
        'Show concrete initiative where you mobilized others or solved a campus/community bottleneck.',
      ],
      bullets: [
        'Directed a [X]-member university society workshop series on digital literacy, reaching [X] students across [X] departments.',
        'Represented department students on the academic curriculum committee, advocating for updated lab resources and mentorship hours.',
      ],
    },
    technical: {
      tips: [
        'Connect your analytical or technical background to your planned graduate research.',
      ],
      bullets: [
        'Completed verified OpenCourseWare and technical certifications in [Field] to bridge undergraduate coursework with target Master’s research.',
        'Authored an analytical policy/technical brief synthesizing international case studies applicable to regional challenges.',
      ],
    },
  },
};

type SkillQuizTrack = 'web-ai' | 'freelancing' | 'scholarships';

interface SkillQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SKILL_QUIZ_BANKS: Record<SkillQuizTrack, SkillQuestion[]> = {
  'web-ai': [
    {
      id: 'wa1',
      question: 'Why should developers avoid copying AI-generated code directly without reading it?',
      options: [
        'AI code always uses a slower programming language',
        'AI can hallucinate edge-case bugs, outdated APIs, or security flaws',
        'Browsers block code assisted by AI tools',
        'Git rejects commits written faster than 10 minutes',
      ],
      correctIndex: 1,
      explanation:
        'AI assistants can invent non-existent flags, subtle security issues, or broken state flows—reviewing and testing every line preserves engineering judgment.',
    },
    {
      id: 'wa2',
      question: 'Which HTML/React habit improves both accessibility and SEO?',
      options: [
        'Replacing buttons with clickable <div> tags',
        'Using one clear <h1>, ordered headings (<h2>, <h3>), and descriptive alt text',
        'Hiding extra keywords in invisible white text',
        'Omitting labels on form inputs',
      ],
      correctIndex: 1,
      explanation:
        'Semantic heading hierarchy, native <button> elements, form labels, and descriptive image alt text help screen readers and search engines alike.',
    },
    {
      id: 'wa3',
      question: 'Where should secret API keys like GEMINI_API_KEY live in a web application?',
      options: [
        'Inside client-side React components so every user browser has it',
        'Committed directly inside README.md',
        'Server-side environment variables accessed only via backend API routes',
        'Inside URL query parameters',
      ],
      correctIndex: 2,
      explanation:
        'Keeping secret keys on the server behind /api/* endpoints prevents anyone from inspecting browser network tabs or bundles to steal your quota.',
    },
    {
      id: 'wa4',
      question: 'When researching academic papers with AI tools like NotebookLM or Perplexity, what is essential?',
      options: [
        'Treat every AI summary as a primary peer-reviewed citation',
        'Verify claims and quotes against the original cited PDF or source URL',
        'Ask the AI to invent matching DOI numbers',
        'Never check publication years',
      ],
      correctIndex: 1,
      explanation:
        'Always open and verify the primary cited paper or official source before quoting statistics or methods in essays or theses.',
    },
    {
      id: 'wa5',
      question: 'What makes a student software portfolio stand out most to technical recruiters?',
      options: [
        '15 half-finished tutorial clones with default styling',
        '2–3 deployed projects with clear problem statements, architecture notes, and trade-offs',
        'Only listing 20 programming languages with star ratings',
        'A PDF screenshot of code without a live link or README',
      ],
      correctIndex: 1,
      explanation:
        'Recruiters look for depth over quantity: working demos, clean READMEs, edge-case handling, and clear explanations of why you built something.',
    },
  ],
  freelancing: [
    {
      id: 'fr1',
      question: 'What makes an Upwork proposal stand out in the first two lines?',
      options: [
        'Copy-pasting a 500-word biography listing every tool you know',
        'Diagnosing the client’s exact goal/problem and proposing a concrete first step',
        'Promising to work for $1/hour regardless of scope',
        'Asking the client to read your entire portfolio before replying',
      ],
      correctIndex: 1,
      explanation:
        'Clients scan the first 2–3 lines previewed in their inbox—opening with their specific problem and a clear deliverable immediately separates you from spam.',
    },
    {
      id: 'fr2',
      question: 'How can a beginner build credible portfolio proof with zero prior paid clients?',
      options: [
        'Use fake client logos and invented testimonials',
        'Build 3 self-initiated case studies solving realistic problems for real-world niches',
        'Copy another freelancer’s screenshots',
        'Wait until someone pays you without seeing samples',
      ],
      correctIndex: 1,
      explanation:
        'Self-initiated case studies (with honest labeling) show real craft, problem-solving, and deliverables without fabricating client history.',
    },
    {
      id: 'fr3',
      question: 'Which practice protects both you and the client from scope creep?',
      options: [
        'Agreeing verbally to "whatever changes are needed forever"',
        'Writing clear deliverables, revision limits, and milestone acceptance criteria upfront',
        'Never sending progress updates until the final day',
        'Accepting off-platform unverified crypto transfers on day one',
      ],
      correctIndex: 1,
      explanation:
        'Explicit deliverables, included revision rounds, and milestone escrow keep expectations transparent and professional.',
    },
    {
      id: 'fr4',
      question: 'When a remote job posting asks for an upfront "registration or training fee", what should you do?',
      options: [
        'Pay immediately to reserve the slot',
        'Treat it as a red flag—legitimate employers and internships never charge applicants to apply',
        'Share your bank PIN to speed verification',
        'Ignore official company domains',
      ],
      correctIndex: 1,
      explanation:
        'Verified remote companies, internships, and freelance marketplaces never charge job seekers an upfront hiring fee.',
    },
    {
      id: 'fr5',
      question: 'Why are packaged tiers (Basic / Standard / Premium) effective on platforms like Fiverr?',
      options: [
        'They hide the actual price from buyers',
        'They clarify exact scope, turnaround time, and upsell paths before messaging starts',
        'They guarantee first-page ranking automatically',
        'They remove the need for portfolio thumbnails',
      ],
      correctIndex: 1,
      explanation:
        'Clear tiered packages filter out mismatched inquiries and help clients self-select the scope that fits their budget.',
    },
  ],
  scholarships: [
    {
      id: 'sc1',
      question: 'What is the strongest way to structure a Statement of Purpose (SOP)?',
      options: [
        'Start from childhood memories and summarize your transcript line by line',
        'Connect your academic/work foundation -> specific program fit -> concrete future impact',
        'Use generic praise about how famous the host country is',
        'Submit the exact same essay to every scholarship without changing university names',
      ],
      correctIndex: 1,
      explanation:
        'Selection committees look for logical continuity between what you have already done, why that specific program is necessary, and measurable post-study goals.',
    },
    {
      id: 'sc2',
      question: 'When should you approach academic or professional referees before a scholarship deadline?',
      options: [
        '24 hours before the portal closes',
        '4–6 weeks ahead, sharing your CV, SOP outline, and exact submission link',
        'After the application deadline passes',
        'Without telling them which scholarship you are applying for',
      ],
      correctIndex: 1,
      explanation:
        'Giving referees 4–6 weeks plus context (your CV and goals) leads to detailed, specific recommendation letters instead of rushed generic notes.',
    },
    {
      id: 'sc3',
      question: 'How should you verify any international scholarship’s real deadline and stipend?',
      options: [
        'Rely only on viral social media graphics',
        'Confirm directly on the official host organization or government scholarship portal',
        'Assume every deadline is identical every year',
        'Pay an unverified third-party agent for "guaranteed slots"',
      ],
      correctIndex: 1,
      explanation:
        'Host agencies update eligibility lists, stipends, and dates annually—always verify on the official .gov, .edu, or consortium website.',
    },
    {
      id: 'sc4',
      question: 'What distinguishes an Academic CV from a 1-page corporate resume?',
      options: [
        'Academic CVs include research projects, theses, coursework, publications, and referees',
        'Academic CVs should omit GPA and university degrees',
        'Corporate resumes must be at least 6 pages long',
        'Academic CVs never list technical or language skills',
      ],
      correctIndex: 0,
      explanation:
        'Academic CVs prioritize education, research output, conferences, awards, and academic references over purely commercial sales metrics.',
    },
    {
      id: 'sc5',
      question: 'Why does AspireHub mark closed cycles explicitly as "Expired"?',
      options: [
        'Because expired scholarships are better than open ones',
        'So applicants do not waste preparation time on closed dates and can plan for the next official cycle',
        'To force users to create paid accounts',
        'Because expired scholarships can still be submitted late',
      ],
      correctIndex: 1,
      explanation:
        'Clear cycle status lets you distinguish active/upcoming official portals from archived intakes while planning 12 months ahead.',
    },
  ],
};

export function ToolkitPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramTab = searchParams.get('tab') as ToolkitTab | null;
  const activeTab: ToolkitTab =
    paramTab && VALID_TABS.includes(paramTab) ? paramTab : 'eligibility';

  useDocumentTitle(
    `${t.toolkit.title} — AspireHub`,
    t.toolkit.subtitle,
    {
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'AspireHub Interactive Student & Career Toolkit',
        applicationCategory: 'EducationalApplication',
        description: t.toolkit.subtitle,
      },
    }
  );

  function setTab(nextTab: ToolkitTab) {
    setSearchParams({ tab: nextTab }, { replace: true });
  }

  // Tool 1: Scholarship Eligibility Checklist State
  const [targetDegree, setTargetDegree] = useState<'Undergraduate' | "Master's" | 'PhD'>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { degree?: 'Undergraduate' | "Master's" | 'PhD' };
        if (parsed.degree) return parsed.degree;
      }
    } catch {
      // Ignore storage read error
    }
    return "Master's";
  });

  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { checked?: string[] };
        if (Array.isArray(parsed.checked)) return parsed.checked;
      }
    } catch {
      // Ignore storage read error
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        CHECKLIST_STORAGE_KEY,
        JSON.stringify({ degree: targetDegree, checked: checkedIds })
      );
    } catch {
      // Ignore storage write error
    }
  }, [targetDegree, checkedIds]);

  const degreeChecklist = useMemo(
    () => CHECKLIST_ITEMS.filter((item) => item.degrees.includes(targetDegree)),
    [targetDegree]
  );

  const completedCount = useMemo(
    () => degreeChecklist.filter((item) => checkedIds.includes(item.id)).length,
    [degreeChecklist, checkedIds]
  );
  const readinessPct =
    degreeChecklist.length > 0 ? Math.round((completedCount / degreeChecklist.length) * 100) : 0;

  function toggleChecklistItem(id: string) {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function resetChecklist() {
    setCheckedIds([]);
    showToast(t.toolkit.resetChecklist, 'info');
  }

  // Tool 2: Career Interest Quiz State
  const [careerAnswers, setCareerAnswers] = useState<Record<string, CareerTrackId>>({});
  const [showCareerResult, setShowCareerResult] = useState(false);

  const careerAnsweredCount = Object.keys(careerAnswers).length;
  const topCareerTrack = useMemo<CareerTrackId>(() => {
    const scores: Record<CareerTrackId, number> = {
      engineering: 0,
      'data-ai': 0,
      'design-content': 0,
      'freelance-ops': 0,
      'global-policy': 0,
    };
    Object.values(careerAnswers).forEach((track) => {
      scores[track] = (scores[track] || 0) + 1;
    });
    return (Object.keys(scores) as CareerTrackId[]).sort((a, b) => scores[b] - scores[a])[0];
  }, [careerAnswers]);

  // Tool 3: CV Tips Generator State
  const [cvRole, setCvRole] = useState<CvRole>('dev');
  const [cvFocus, setCvFocus] = useState<CvFocus>('impact');
  const [copiedCv, setCopiedCv] = useState(false);

  const currentCvContent = CV_BULLET_TEMPLATES[cvRole][cvFocus];

  async function copyCvTemplates() {
    const text = currentCvContent.bullets.map((b) => `• ${b}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCv(true);
      showToast(t.common.copied, 'success');
      setTimeout(() => setCopiedCv(false), 1800);
    } catch {
      showToast('Copy failed. Please highlight and copy manually.', 'error');
    }
  }

  // Tool 4: Skill Assessment Quiz State
  const [skillTrack, setSkillTrack] = useState<SkillQuizTrack>('web-ai');
  const [skillAnswers, setSkillAnswers] = useState<Record<string, number>>({});
  const [skillSubmitted, setSkillSubmitted] = useState(false);

  const activeSkillQuestions = SKILL_QUIZ_BANKS[skillTrack];
  const skillScore = useMemo(
    () =>
      activeSkillQuestions.reduce(
        (acc, q) => (skillAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
        0
      ),
    [activeSkillQuestions, skillAnswers]
  );

  return (
    <div>
      <PageHeader
        sectionLabel={t.toolkit.sectionLabel}
        title={t.toolkit.title}
        subtitle={t.toolkit.subtitle}
        breadcrumbCurrent={t.toolkit.breadcrumb}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Tool Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Interactive Toolkit Tabs"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            { id: 'eligibility' as ToolkitTab, label: t.toolkit.tabEligibility, icon: CheckSquare },
            { id: 'career-quiz' as ToolkitTab, label: t.toolkit.tabCareerQuiz, icon: Compass },
            { id: 'cv-tips' as ToolkitTab, label: t.toolkit.tabCvTips, icon: FileText },
            { id: 'skill-quiz' as ToolkitTab, label: t.toolkit.tabSkillQuiz, icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(tab.id)}
                className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#101B3D] dark:bg-[#6956D8] text-white border-[#101B3D] dark:border-[#6956D8] shadow-sm'
                    : 'bg-white dark:bg-[#131D3B] text-[#101B3D] dark:text-slate-100 border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    active ? 'text-[#4DA8FF] dark:text-white' : 'text-[#6956D8] dark:text-[#4DA8FF]'
                  }`}
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm font-bold leading-snug">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TOOL 1: SCHOLARSHIP ELIGIBILITY CHECKLIST */}
        {activeTab === 'eligibility' && (
          <section className="bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#243668]">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-slate-100">
                  {t.toolkit.eligibilityTitle}
                </h2>
                <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-1">
                  {t.toolkit.eligibilityDesc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label
                    htmlFor="toolkit-degree-select"
                    className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1"
                  >
                    {t.toolkit.degreeSelectLabel}
                  </label>
                  <select
                    id="toolkit-degree-select"
                    value={targetDegree}
                    onChange={(e) =>
                      setTargetDegree(e.target.value as 'Undergraduate' | "Master's" | 'PhD')
                    }
                    className="px-3 py-2 text-sm font-semibold bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD / Research</option>
                  </select>
                </div>

                {checkedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={resetChecklist}
                    className="self-end inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    {t.toolkit.resetChecklist}
                  </button>
                )}
              </div>
            </div>

            {/* Readiness Progress */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[#101B3D] dark:text-slate-100">
                  {t.toolkit.readinessScore}: {completedCount} / {degreeChecklist.length}
                </span>
                <span className="font-bold text-[#6956D8] dark:text-[#4DA8FF] tabular-nums">
                  {readinessPct}%
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-[#6956D8] transition-all duration-300"
                  style={{ width: `${readinessPct}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <ul className="space-y-3">
              {degreeChecklist.map((item) => {
                const checked = checkedIds.includes(item.id);
                return (
                  <li
                    key={item.id}
                    className={`p-4 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      checked
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/70'
                        : 'bg-[#F7F8FC] dark:bg-[#0D152E] border-slate-200/80 dark:border-[#243668]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleChecklistItem(item.id)}
                      className="flex items-start gap-3 text-left cursor-pointer flex-1"
                    >
                      {checked ? (
                        <CheckSquare
                          className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      ) : (
                        <Square
                          className="w-5 h-5 text-slate-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            checked
                              ? 'text-emerald-950 dark:text-emerald-200 line-through'
                              : 'text-[#101B3D] dark:text-slate-100'
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-[#202A44]/80 dark:text-slate-300 mt-0.5 leading-relaxed">
                          {item.hint}
                        </p>
                      </div>
                    </button>

                    <Link
                      to={item.guideTo}
                      className="self-start sm:self-center inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] bg-white dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg hover:border-[#6956D8]/50 whitespace-nowrap shrink-0"
                    >
                      {item.guideLabel}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ready to shortlist programmes? Filter open official portals in Scholarship Hub.
              </p>
              <Link
                to="/scholarships"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] rounded-xl transition-colors"
              >
                <GraduationCap className="w-4 h-4" aria-hidden="true" />
                {t.hero.primaryCta}
              </Link>
            </div>
          </section>
        )}

        {/* TOOL 2: CAREER INTEREST QUIZ */}
        {activeTab === 'career-quiz' && (
          <section className="bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="pb-5 border-b border-slate-100 dark:border-[#243668]">
              <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-slate-100">
                {t.toolkit.careerQuizTitle}
              </h2>
              <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-1">
                {t.toolkit.careerQuizDesc}
              </p>
            </div>

            {!showCareerResult ? (
              <div className="space-y-6">
                {CAREER_QUIZ_QUESTIONS.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] space-y-3"
                  >
                    <p className="text-sm font-bold text-[#101B3D] dark:text-slate-100">
                      {idx + 1}. {q.prompt}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {q.options.map((opt) => {
                        const selected = careerAnswers[q.id] === opt.track;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              setCareerAnswers((prev) => ({ ...prev, [q.id]: opt.track }))
                            }
                            className={`p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                              selected
                                ? 'bg-[#6956D8] text-white border-[#6956D8]'
                                : 'bg-white dark:bg-[#131D3B] text-[#202A44] dark:text-slate-200 border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/50'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                    {careerAnsweredCount} / {CAREER_QUIZ_QUESTIONS.length} answered
                  </span>
                  <button
                    type="button"
                    disabled={careerAnsweredCount < CAREER_QUIZ_QUESTIONS.length}
                    onClick={() => {
                      setShowCareerResult(true);
                      showToast(CAREER_TRACK_RESULTS[topCareerTrack].title, 'success');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] disabled:opacity-45 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    {t.toolkit.seeCareerResult}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101B3D] to-[#2B256B] text-white space-y-4">
                  <p className="text-xs font-semibold text-[#4DA8FF]">Recommended Path</p>
                  <h3 className="text-2xl font-bold">{CAREER_TRACK_RESULTS[topCareerTrack].title}</h3>
                  <p className="text-sm text-slate-200 leading-relaxed max-w-2xl">
                    {CAREER_TRACK_RESULTS[topCareerTrack].summary}
                  </p>
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-300 mb-2">
                      Core Skills to Build Next:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CAREER_TRACK_RESULTS[topCareerTrack].nextSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-white/12 text-xs font-semibold text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <RelatedCrossLinks
                  heading="Connected AspireHub Playbooks for Your Track"
                  links={CAREER_TRACK_RESULTS[topCareerTrack].links}
                />

                <button
                  type="button"
                  onClick={() => {
                    setCareerAnswers({});
                    setShowCareerResult(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-[#243668] rounded-lg cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.toolkit.retakeQuiz}
                </button>
              </div>
            )}
          </section>
        )}

        {/* TOOL 3: RESUME / CV TIPS GENERATOR */}
        {activeTab === 'cv-tips' && (
          <section className="bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="pb-5 border-b border-slate-100 dark:border-[#243668]">
              <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-slate-100">
                {t.toolkit.cvTipsTitle}
              </h2>
              <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-1">
                {t.toolkit.cvTipsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cv-role-select"
                  className="block text-xs font-semibold text-[#101B3D] dark:text-slate-100 mb-1.5"
                >
                  Target Profile / Application Type
                </label>
                <select
                  id="cv-role-select"
                  value={cvRole}
                  onChange={(e) => setCvRole(e.target.value as CvRole)}
                  className="w-full px-3.5 py-2.5 text-sm font-medium bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100"
                >
                  <option value="dev">Software &amp; Web Engineering</option>
                  <option value="research">Data Science &amp; Research</option>
                  <option value="freelance">Freelancing &amp; Remote Operations</option>
                  <option value="scholarship">Academic / Scholarship CV</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="cv-focus-select"
                  className="block text-xs font-semibold text-[#101B3D] dark:text-slate-100 mb-1.5"
                >
                  Bullet Emphasis
                </label>
                <select
                  id="cv-focus-select"
                  value={cvFocus}
                  onChange={(e) => setCvFocus(e.target.value as CvFocus)}
                  className="w-full px-3.5 py-2.5 text-sm font-medium bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100"
                >
                  <option value="impact">Measurable Impact &amp; Outcomes</option>
                  <option value="leadership">Leadership &amp; Teamwork</option>
                  <option value="technical">Technical Depth &amp; Methods</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 p-5 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/90 dark:border-[#243668] space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-[#6956D8] dark:text-[#4DA8FF]">
                    Customizable Bullet Templates (Replace [X] with real numbers)
                  </h3>
                  <button
                    type="button"
                    onClick={copyCvTemplates}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#101B3D] dark:text-slate-100 bg-white dark:bg-[#131D3B] hover:bg-slate-100 border border-slate-200 dark:border-[#243668] rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedCv ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        {t.common.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        {t.toolkit.copyBullets}
                      </>
                    )}
                  </button>
                </div>

                <ul className="space-y-3">
                  {currentCvContent.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="p-3.5 rounded-lg bg-white dark:bg-[#131D3B] border border-slate-200/80 dark:border-[#243668] text-sm text-[#101B3D] dark:text-slate-100 leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 p-5 rounded-xl bg-white dark:bg-[#0D152E] border border-slate-200 dark:border-[#243668] space-y-4">
                <h3 className="text-sm font-bold text-[#101B3D] dark:text-slate-100">
                  Formatting &amp; ATS Rules
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
                  {currentCvContent.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-[#6956D8] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-[#6956D8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      Use single-column text-selectable PDFs so automated ATS parsers read every date
                      and heading cleanly.
                    </span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 dark:border-[#243668] flex flex-col gap-2">
                  <Link
                    to="/resources/one-page-ats-resume-blueprint"
                    className="inline-flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] hover:border-[#6956D8]/40 border border-slate-200 dark:border-[#243668] rounded-lg"
                  >
                    <span>One-Page ATS Resume Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/resources/academic-cv-template-for-scholarships-and-research"
                    className="inline-flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] hover:border-[#6956D8]/40 border border-slate-200 dark:border-[#243668] rounded-lg"
                  >
                    <span>Academic CV Template &amp; Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TOOL 4: SKILL ASSESSMENT QUIZ */}
        {activeTab === 'skill-quiz' && (
          <section className="bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-[#243668]">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-slate-100">
                  {t.toolkit.skillQuizTitle}
                </h2>
                <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-1">
                  {t.toolkit.skillQuizDesc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'web-ai' as SkillQuizTrack, label: 'Web & AI Literacy' },
                  { id: 'freelancing' as SkillQuizTrack, label: 'Freelancing & Remote' },
                  { id: 'scholarships' as SkillQuizTrack, label: 'Scholarships Strategy' },
                ].map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      setSkillTrack(track.id);
                      setSkillAnswers({});
                      setSkillSubmitted(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      skillTrack === track.id
                        ? 'bg-[#6956D8] text-white'
                        : 'bg-[#F7F8FC] dark:bg-[#0D152E] text-[#101B3D] dark:text-slate-200 border border-slate-200 dark:border-[#243668]'
                    }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            </div>

            {skillSubmitted && (
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#101B3D] to-[#2B256B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#4DA8FF]">Assessment Complete</p>
                  <p className="text-xl font-bold tabular-nums mt-0.5">
                    Score: {skillScore} / {activeSkillQuestions.length} (
                    {Math.round((skillScore / activeSkillQuestions.length) * 100)}%)
                  </p>
                  <p className="text-xs text-slate-200 mt-1">
                    {skillScore >= 4
                      ? 'Strong practical foundation—review any missed notes below and move straight to execution.'
                      : 'Good baseline—read the explanations below and follow the connected AspireHub study guides.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSkillAnswers({});
                    setSkillSubmitted(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white/15 hover:bg-white/25 text-white rounded-lg cursor-pointer self-start sm:self-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.toolkit.retakeQuiz}
                </button>
              </div>
            )}

            <div className="space-y-5">
              {activeSkillQuestions.map((q, qIdx) => {
                const chosen = skillAnswers[q.id];
                const isCorrect = chosen === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] space-y-3"
                  >
                    <p className="text-sm font-bold text-[#101B3D] dark:text-slate-100 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-[#6956D8] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        {qIdx + 1}. {q.question}
                      </span>
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const selected = chosen === optIdx;
                        let style =
                          'bg-white dark:bg-[#131D3B] text-[#202A44] dark:text-slate-200 border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/50';
                        if (skillSubmitted) {
                          if (optIdx === q.correctIndex) {
                            style =
                              'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-400';
                          } else if (selected && optIdx !== q.correctIndex) {
                            style =
                              'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 border-red-400';
                          }
                        } else if (selected) {
                          style = 'bg-[#6956D8] text-white border-[#6956D8]';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={skillSubmitted}
                            onClick={() =>
                              setSkillAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                            }
                            className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:cursor-default ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {skillSubmitted && (
                      <p
                        className={`text-xs leading-relaxed pt-1 ${
                          isCorrect
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        <strong>{isCorrect ? 'Correct:' : 'Explanation:'}</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!skillSubmitted && (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  {Object.keys(skillAnswers).length} / {activeSkillQuestions.length} answered
                </span>
                <button
                  type="button"
                  disabled={Object.keys(skillAnswers).length < activeSkillQuestions.length}
                  onClick={() => {
                    setSkillSubmitted(true);
                    showToast(
                      `Score: ${skillScore}/${activeSkillQuestions.length}`,
                      skillScore >= 4 ? 'success' : 'info'
                    );
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] disabled:opacity-45 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  {t.toolkit.checkSkillScore}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
