import { FreeResource, ResourceCategory } from '../types';

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'Free Online Courses',
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
    title: 'CS50x Computer Science Study Guide & 10-Week Self-Paced Plan',
    provider: 'AspireHub Curriculum Guide (CS50x Breakdown)',
    category: 'Free Online Courses',
    description:
      'Complete on-site breakdown of CS50’s 10 core modules—from C memory fundamentals to Python, SQL, and Flask web apps—with weekly study targets.',
    readingTime: '8 min read',
    externalUrl: 'https://cs50.harvard.edu/x/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Study Guide',
    articleIntro:
      'Introduction to Computer Science (CS50x) is widely regarded as one of the strongest free computer science foundations online. Instead of jumping blindly into random videos, follow this structured 10-week study plan right here so you finish every core concept.',
    sections: [
      {
        heading: 'Weeks 1–3: Computational Thinking, C, and Memory',
        paragraphs: [
          'The first third of the curriculum teaches how computers actually store numbers, strings, and pointers in memory using the C language. Beginners sometimes feel intimidated by C syntax, yet understanding memory early makes JavaScript, Python, and debugging dramatically easier later.',
          'Focus on writing clean loops, understanding arrays, and tracing why off-by-one bugs occur before moving to algorithms.',
        ],
        bullets: [
          'Week 0–1: Binary, ASCII, Scratch logic, and basic C conditionals/loops.',
          'Week 2: Arrays, command-line arguments, and cryptography exercises.',
          'Week 3: Searching algorithms (linear vs. binary search) and sorting (merge sort).',
        ],
        internalLink: {
          label: 'Use GitHub Copilot responsibly while learning syntax in our AI Tools Directory',
          to: '/ai-tools/github-copilot',
        },
      },
      {
        heading: 'Weeks 4–7: Data Structures, Python, and SQL Databases',
        paragraphs: [
          'Once you grasp pointers and hash tables in C, transitioning to Python feels effortless. You will implement the same problems in 10 lines instead of 60, and learn how relational SQL databases store structured records.',
        ],
        bullets: [
          'Week 4–5: Pointers, dynamic memory allocation, linked lists, and hash tables.',
          'Week 6: Python data structures, file parsing, and clean scripting.',
          'Week 7: SQLite queries—SELECT, JOIN, GROUP BY, and indexing.',
        ],
      },
      {
        heading: 'Weeks 8–10: HTML, CSS, JavaScript, and Capstone Project',
        paragraphs: [
          'The final stretch connects backend logic to browser interfaces using HTML, CSS, JavaScript, and Flask. Treat the final project as your first real portfolio piece rather than an afterthought.',
        ],
        internalLink: {
          label: 'Learn how to turn your capstone into a client-ready portfolio case study',
          to: '/freelancing/how-to-create-a-portfolio-with-no-clients',
        },
      },
    ],
    actionSteps: [
      'Schedule 6–8 focused hours per week and solve at least one lab problem per module without copying solutions.',
      'Push every completed project to GitHub with a clear README explaining what you built.',
      'Pair CS50 lectures with our Developer Learning Roadmaps guide once you finish Week 10.',
    ],
    relatedLinks: [
      {
        title: 'Full-Stack Web Development Complete Curriculum',
        description: 'Move from HTML/CSS fundamentals into React and APIs with weekly milestones.',
        to: '/resources/full-stack-web-development-curriculum-guide',
        badge: 'Resource',
      },
      {
        title: 'Freelancing Skills to Learn: High-Demand Paths',
        description: 'See how technical foundations convert into freelance web services.',
        to: '/freelancing/freelancing-skills-to-learn-in-demand',
        badge: 'Freelancing',
      },
    ],
  },
  {
    id: 'res-freecodecamp',
    slug: 'full-stack-web-development-curriculum-guide',
    title: 'Full-Stack Web Development Complete Free Curriculum & Practice Plan',
    provider: 'AspireHub Engineering Desk',
    category: 'Free Online Courses',
    description:
      'Step-by-step zero-cost roadmap covering HTML/CSS, JavaScript, React, Node/Express, and relational databases with real project milestones.',
    readingTime: '9 min read',
    externalUrl: 'https://www.freecodecamp.org/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Complete Guide',
    articleIntro:
      'You do not need expensive bootcamps to become job-ready or freelance-ready in web development. Below is the complete, sequenced curriculum used by self-taught engineers to build real browser and backend applications.',
    sections: [
      {
        heading: 'Phase 1: Semantic HTML5 & Responsive CSS (Weeks 1–3)',
        paragraphs: [
          'Master semantic HTML tags (<header>, <main>, <article>, <nav>), Flexbox, CSS Grid, and mobile-first media queries. Accessibility starts with proper HTML—not divs everywhere.',
        ],
        bullets: [
          'Build 1 personal biography page using pure semantic HTML and CSS Grid.',
          'Build 1 responsive 3-column pricing or product landing page that adapts cleanly at 375px and 1440px.',
        ],
      },
      {
        heading: 'Phase 2: Modern JavaScript & TypeScript Foundations (Weeks 4–8)',
        paragraphs: [
          'Focus on array methods (.map, .filter, .reduce), asynchronous fetch() calls, Promises, DOM events, and clean error handling before touching frameworks.',
        ],
        copyableBlock: {
          title: 'Weekly Practice Routine (70/30 Rule)',
          content:
            '30% Reading/Lectures (45 mins) -> 70% Building from blank editor (105 mins)\nEvery Friday: Rebuild one UI widget (modal, filterable list, form validator) from scratch without tutorials.',
        },
      },
      {
        heading: 'Phase 3: React Components, Routing & Backend APIs (Weeks 9–16)',
        paragraphs: [
          'Learn functional React components, state hooks, client-side routing, and REST APIs. Connect a real database or PHP/MySQL / Node backend so your portfolio demonstrates full-stack capability.',
        ],
        internalLink: {
          label: 'Read our guide on choosing your first skill without tutorial paralysis',
          to: '/blog/choosing-your-first-high-value-digital-skill',
        },
      },
    ],
    actionSteps: [
      'Complete Phase 1 and Phase 2 projects before installing React.',
      'Deploy at least 3 live projects with clean mobile layouts.',
      'Document every build in a short case study for freelance outreach.',
    ],
    relatedLinks: [
      {
        title: 'Cursor AI Editor Review & Coding Workflow',
        description: 'Learn how experienced developers use Cursor safely for multi-file edits.',
        to: '/ai-tools/cursor-editor',
        badge: 'AI Tool',
      },
      {
        title: 'Developer & Role-Based Learning Roadmaps',
        description: 'Compare Frontend, Backend, and Data paths side by side.',
        to: '/resources/developer-and-career-learning-roadmaps',
        badge: 'Resource',
      },
    ],
  },
  {
    id: 'res-overleaf-cv',
    slug: 'academic-cv-template-for-scholarships-and-research',
    title: 'Academic CV Complete Guide & Copyable LaTeX/Word Structure for Scholarships',
    provider: 'AspireHub Academic Desk',
    category: 'CV Templates',
    description:
      'Complete academic CV template and section-by-section guide built specifically for Master’s, PhD, Erasmus Mundus, DAAD, and Fulbright applications.',
    readingTime: '8 min read',
    externalUrl: 'https://www.overleaf.com/gallery/tagged/cv',
    isVerifiedLink: true,
    formatLabel: 'On-Site CV Guide + Template',
    articleIntro:
      'An Academic CV differs sharply from a 1-page corporate resume. Scholarship committees in Europe, the UK, and North America look for clear research interests, coursework, publications or capstones, and teaching/leadership experience—formatted cleanly without decorative graphics.',
    sections: [
      {
        heading: 'Exact Section Order for Scholarship Applications',
        paragraphs: [
          'Keep your Academic CV between 1.5 and 2 pages for Master’s applicants (and 2–3 pages for PhD applicants with publications). Use reverse-chronological order inside every section.',
        ],
        bullets: [
          '1. Contact Header (Name, City/Country, Email, LinkedIn/ORCID/GitHub — omit marital status or unnecessary personal IDs unless required).',
          '2. Education (Degree, Institution, Dates, CGPA/Scale, Thesis Title, Relevant Coursework).',
          '3. Research & Academic Projects (Thesis, lab work, data analysis, methods used).',
          '4. Work, Internship & Teaching Experience (Bullet points starting with action verbs).',
          '5. Honors, Awards & Leadership (Scholarships, dean’s list, student society roles).',
          '6. Technical Skills, Languages (CEFR levels if applying to Europe) & Referees.',
        ],
      },
      {
        heading: 'Copyable Academic CV Template',
        paragraphs: [
          'Copy the clean text structure below into Google Docs, Microsoft Word, or a single-column LaTeX template on Overleaf.',
        ],
        copyableBlock: {
          title: 'Academic CV Master Structure',
          content:
            'FULL NAME\nCity, Country | email@domain.com | linkedin.com/in/username | github.com/username\n\nEDUCATION\nB.S. in [Your Major] — [University Name], [City, Country] (2022–2026)\nCGPA: X.XX / 4.00 | Thesis: "[Title of Undergraduate Thesis]"\nRelevant Coursework: [Course 1], [Course 2], [Course 3]\n\nRESEARCH & ACADEMIC PROJECTS\n[Project Title] | [Role / Lab] (Month Year – Month Year)\n• Investigated [research question] using [methodology/tools].\n• Analyzed [dataset/sample] and documented findings in a [report/poster/paper].\n\nEXPERIENCE & LEADERSHIP\n[Role Title] — [Organization / University Club] (Month Year – Month Year)\n• Coordinated [initiative] for [X participants], improving [clear outcome].\n\nSKILLS & LANGUAGES\nTechnical: Python, R, SQL, LaTeX, SPSS\nLanguages: English (IELTS X.X / Fluent), Urdu (Native)',
        },
        internalLink: {
          label: 'Pair this CV with our Statement of Purpose Writing Guide',
          to: '/blog/how-to-write-a-standout-statement-of-purpose',
        },
      },
    ],
    actionSteps: [
      'Use a clean 10.5pt–11pt sans or serif font with consistent margins (0.7–1 inch).',
      'Export as a text-selectable PDF named Firstname_Lastname_CV.pdf.',
      'Match the language and terminology of your target scholarship (e.g., Europass conventions for EU consortia).',
    ],
    relatedLinks: [
      {
        title: 'Erasmus Mundus Joint Masters Guide',
        description: 'Review EMJM document checklists and application steps.',
        to: '/scholarships/erasmus-mundus-joint-masters',
        badge: 'Scholarship',
      },
      {
        title: '12-Month Scholarship Preparation Calendar',
        description: 'Plan transcripts, referees, and language tests quarter by quarter.',
        to: '/blog/12-month-international-scholarship-preparation-calendar',
        badge: 'Blog',
      },
    ],
  },
  {
    id: 'res-sample-cv-blueprint',
    slug: 'one-page-ats-resume-blueprint',
    title: '1-Page ATS Resume Blueprint for Graduates & Freelancers',
    provider: 'AspireHub Career Desk',
    category: 'CV Templates',
    description:
      'Complete single-column ATS-safe resume guide and copyable template designed to pass automated screening and impress hiring managers.',
    readingTime: '6 min read',
    isVerifiedLink: true,
    isSampleTemplate: true,
    formatLabel: 'On-Site Blueprint + Copyable',
    articleIntro:
      'Multi-column Canva resumes with percentage skill bars frequently break Applicant Tracking Systems (ATS) and waste space. Use this clean single-column layout built for recent graduates, interns, and freelancers applying to remote roles.',
    sections: [
      {
        heading: 'Why Single-Column ATS Layouts Win',
        paragraphs: [
          'Recruiters spend an average of 6–10 seconds on a first resume scan. A predictable top-to-bottom hierarchy lets both software parsers and human reviewers spot your degree, projects, and technical stack immediately.',
        ],
        bullets: [
          'Avoid tables, text boxes, icons replacing words, and arbitrary progress bars ("HTML: 85%").',
          'Stick to 1 page if you have under 5 years of full-time experience.',
          'Quantify scope or deliverables whenever possible.',
        ],
      },
      {
        heading: 'Complete Copyable 1-Page ATS Resume Template',
        paragraphs: [
          'Copy this exact structure and replace the bracketed placeholders with your genuine projects and skills.',
        ],
        copyableBlock: {
          title: 'ATS-Friendly 1-Page Resume Template',
          content:
            'FULL NAME\nCity, Country | email@domain.com | +XX XXX XXXXXXX | Portfolio: yoursite.com | GitHub / LinkedIn\n\nSUMMARY (Optional — 2 Lines Max)\nFinal-year [Major] graduate & [Skill] freelancer experienced in building [deliverable type] using [2–3 key tools].\n\nSKILLS\nCore: [Skill 1], [Skill 2], [Skill 3] | Tools: [Tool 1], [Tool 2] | Languages: English (Fluent)\n\nPROJECTS & FREELANCE EXPERIENCE\n[Project or Client Deliverable Title] — [Role] (Month Year – Month Year)\n• Built [what you built] using [stack/tools] to solve [specific user or business problem].\n• Delivered [result: e.g., responsive 5-page interface, clean documentation, faster load flow].\n\nEDUCATION\n[Degree Name] — [University Name] (Expected / Graduated Month Year)\nRelevant Coursework: [Subject 1], [Subject 2], [Subject 3]',
        },
      },
    ],
    actionSteps: [
      'Test your exported PDF by copying all text and pasting into Notepad—if it reads in clean order, ATS can parse it.',
      'Tailor your top 3 skills to match the exact wording in the job description.',
    ],
    relatedLinks: [
      {
        title: 'Bullet-Point Resume Writing Formula Guide',
        description: 'Learn how to rewrite weak duties into strong impact bullets.',
        to: '/resources/bullet-point-resume-writing-guide',
        badge: 'Resource',
      },
      {
        title: '5 Portfolio Upgrades That Keep Recruiters Reading',
        description: 'Align your live portfolio with your 1-page resume.',
        to: '/blog/5-portfolio-upgrades-that-make-recruiters-and-clients-stay',
        badge: 'Blog',
      },
    ],
  },
  {
    id: 'res-harvard-resume',
    slug: 'bullet-point-resume-writing-guide',
    title: 'Bullet-Point Resume Writing Guide: Action Verbs & Impact Formulas',
    provider: 'AspireHub Career Desk',
    category: 'Resume Writing Guides',
    description:
      'Complete on-site writing handbook showing how to transform generic job duties into crisp, evidence-backed resume bullets.',
    readingTime: '7 min read',
    externalUrl: 'https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Writing Handbook',
    articleIntro:
      'Most beginner resumes fail not because the applicant lacks ability, but because every bullet reads like a passive job description ("Responsible for social media" or "Worked on a React website"). Here is the exact formula to fix every line on your resume.',
    sections: [
      {
        heading: 'The Action + Context + Outcome Formula',
        paragraphs: [
          'Every bullet point should start with a strong past-tense action verb (present tense only for ongoing roles), state what you built or improved, and clarify the measurable or practical outcome.',
        ],
        copyableBlock: {
          title: 'Before vs. After Bullet Rewrites',
          content:
            'Weak: "Helped build a website for a university club."\nStrong: "Designed and coded a responsive 4-page event portal in React and Tailwind CSS, enabling 300+ student registrations online."\n\nWeak: "Did data entry in Excel."\nStrong: "Cleaned and standardized 2,400+ client inventory records in Excel using VLOOKUP and pivot summaries, cutting weekly reporting time by 3 hours."',
        },
      },
      {
        heading: 'High-Signal Action Verbs by Field',
        paragraphs: [
          'Replace repetitive verbs like "Helped", "Worked on", or "Made" with precise verbs that reflect your actual role.',
        ],
        bullets: [
          'Engineering & Tech: Architected, Automated, Debugged, Deployed, Integrated, Optimized, Refactored.',
          'Design & Content: Authored, Designed, Illustrated, Prototyped, Restructured, Simplified, Storyboarded.',
          'Research & Leadership: Analyzed, Coordinated, Evaluated, Facilitated, Investigated, Mentored, Synthesized.',
        ],
      },
    ],
    actionSteps: [
      'Audit your current resume and rewrite any bullet starting with "Responsible for" or "Helped with".',
      'Limit each role or project to 2–4 crisp bullets (max 2 lines per bullet).',
    ],
    relatedLinks: [
      {
        title: '1-Page ATS Resume Blueprint',
        description: 'Paste your rewritten bullets into our clean ATS-safe layout.',
        to: '/resources/one-page-ats-resume-blueprint',
        badge: 'Resource',
      },
      {
        title: 'Scholarship & Entry-Level Cover Letter Guide',
        description: 'Pair your resume with a tailored 4-paragraph cover letter.',
        to: '/resources/scholarship-and-job-cover-letter-guide',
        badge: 'Resource',
      },
    ],
  },
  {
    id: 'res-sample-cover-letter',
    slug: 'scholarship-and-job-cover-letter-guide',
    title: 'Cover Letter Complete Guide: 4-Paragraph Framework & Ready Examples',
    provider: 'AspireHub Editorial',
    category: 'Cover Letter Guides',
    description:
      'Write concise, persuasive cover letters for internships, remote freelance roles, and scholarship motivation letters without stiff clichés.',
    readingTime: '7 min read',
    isVerifiedLink: true,
    isSampleTemplate: true,
    formatLabel: 'On-Site Complete Guide',
    articleIntro:
      'A cover letter is not a prose repetition of your CV. Its job is to connect two dots in under 300 words: why your specific background solves what this team needs, and why you genuinely care about this exact role or programme.',
    sections: [
      {
        heading: 'The 4-Paragraph Structure (Under 300 Words)',
        paragraphs: [
          'Keep your cover letter to three or four short paragraphs on one page. Hiring managers and review panels prefer crisp specificity over long formal speeches.',
        ],
        bullets: [
          'Paragraph 1 (The Hook): Name the role/award and share your strongest single qualification or relevant project.',
          'Paragraph 2 (Evidence): Walk through 1–2 concrete achievements showing skills in action.',
          'Paragraph 3 (Alignment): Explain why this specific organization, product, or research lab fits your work.',
          'Paragraph 4 (Close): State availability cleanly and thank the reader.',
        ],
      },
      {
        heading: 'Copyable Cover Letter Example (Junior Frontend / Remote Role)',
        paragraphs: [
          'Adapt this sample structure cleanly for remote internships, freelance retainers, or graduate fellowships.',
        ],
        copyableBlock: {
          title: 'Complete Cover Letter Sample',
          content:
            'Dear [Hiring Manager / Selection Committee],\n\nI am writing to apply for the Junior Frontend Developer role at [Company Name]. Over the past year, I have built and deployed accessible React and TypeScript interfaces—including a multi-filter educational directory serving fast mobile and desktop layouts.\n\nIn my recent freelance and capstone work, I focused on turning complex workflows into clear, responsive screens. For example, I rebuilt a multi-step intake form that simplified navigation and cut mobile layout errors across viewports.\n\nI have followed [Company Name]’s work on [specific product feature or initiative], and I appreciate your emphasis on clean user experience and readable documentation. I would love to bring that same attention to detail to your front-end team.\n\nThank you for your time and consideration. My portfolio and code samples are linked above, and I welcome the chance to discuss how I can contribute.\n\nSincerely,\n[Your Full Name]',
        },
        internalLink: {
          label: 'Also check out our Upwork Proposal Framework for client outreach',
          to: '/freelancing/upwork-complete-guide-winning-proposals',
        },
      },
    ],
    actionSteps: [
      'Customize Paragraph 1 and Paragraph 3 for every single application.',
      'Never send a letter starting with "To Whom It May Concern" if the organization or team name is public.',
    ],
    relatedLinks: [
      {
        title: 'Technical & Behavioral Interview Handbook',
        description: 'Prepare for the interview stage once your cover letter gets opened.',
        to: '/resources/interview-preparation-complete-handbook',
        badge: 'Resource',
      },
      {
        title: 'Claude AI Writing Assistant Guide',
        description: 'Use Claude to critique tone and clarity while preserving your authentic voice.',
        to: '/ai-tools/claude',
        badge: 'AI Tool',
      },
    ],
  },
  {
    id: 'res-tech-interview',
    slug: 'interview-preparation-complete-handbook',
    title: 'Interview Preparation Complete Handbook: STAR Method, Tech & Scholarship Q&A',
    provider: 'AspireHub Career Desk',
    category: 'Interview Preparation',
    description:
      'Master behavioral STAR storytelling, scholarship panel questions, and technical interview preparation with sample scripts and checklists.',
    readingTime: '10 min read',
    externalUrl: 'https://www.techinterviewhandbook.org/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Interview Handbook',
    articleIntro:
      'Whether you are stepping into a Chevening/Fulbright scholarship interview, a freelance discovery call, or a junior software engineering interview, preparation comes down to structured storytelling and calm thinking aloud.',
    sections: [
      {
        heading: '1. Answering Behavioral Questions With the STAR Method',
        paragraphs: [
          'When interviewers ask "Tell me about a time you handled a difficult deadline or conflict," ramblers lose the room in 45 seconds. Use STAR to keep every story crisp in 90–120 seconds.',
        ],
        bullets: [
          'Situation (15%): Set brief context—where you were and what the project was.',
          'Task (15%): State your specific responsibility or constraint.',
          'Action (50%): Walk through the exact steps YOU took (say "I", not only "we").',
          'Result (20%): Share the concrete outcome and what you learned.',
        ],
      },
      {
        heading: '2. Top Questions in Scholarship & Graduate Interviews',
        paragraphs: [
          'Scholarship panels check consistency between your essays and your spoken answers. Prepare clear 90-second responses for these five core prompts:',
        ],
        bullets: [
          'Why this specific country, university, and degree programme right now?',
          'What specific problem in your home country or field do you intend to address afterward?',
          'Tell us about a leadership moment where you mobilized others without formal authority.',
          'What happens if you face academic or cultural difficulty during your first semester?',
        ],
      },
      {
        heading: '3. Technical & Freelance Discovery Call Prep',
        paragraphs: [
          'In technical coding interviews, clarify input edge cases before writing code, narrate your brute-force idea first, then optimize. In freelance client calls, spend 70% of the call asking smart questions about their goals, timeline, and users rather than reciting your resume.',
        ],
        copyableBlock: {
          title: '5 Smart Questions to Ask Your Interviewer',
          content:
            '1. What does success look like for someone in this role during the first 90 days?\n2. What is the biggest bottleneck the team is trying to solve right now?\n3. How do engineering/design and product teams collaborate on feedback?\n4. What qualities set your top performers apart?\n5. What are the next steps in the selection timeline?',
        },
      },
    ],
    actionSteps: [
      'Write down 5 STAR stories covering teamwork, failure/recovery, leadership, tight deadlines, and initiative.',
      'Rehearse answers out loud—do not memorize word-for-word scripts.',
      'Test your microphone, lighting, and internet 15 minutes before any video interview.',
    ],
    relatedLinks: [
      {
        title: 'Chevening UK Government Scholarships Guide',
        description: 'Explore Chevening leadership criteria and interview timeline.',
        to: '/scholarships/chevening-uk-government-scholarships',
        badge: 'Scholarship',
      },
      {
        title: 'Client Communication Scripts & Boundaries',
        description: 'Run smoother freelance client discovery and kickoff calls.',
        to: '/freelancing/client-communication-that-builds-repeat-work',
        badge: 'Freelancing',
      },
    ],
  },
  {
    id: 'res-mit-ocw',
    slug: 'university-open-courseware-self-study-guide',
    title: 'How to Study From Free University OpenCourseWare Effectively',
    provider: 'AspireHub Academic Desk',
    category: 'Useful Educational Websites',
    description:
      'Turn open MIT, Harvard, and university lecture archives into structured self-study semesters with problem sets and exam prep.',
    readingTime: '6 min read',
    externalUrl: 'https://ocw.mit.edu/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Study Guide',
    articleIntro:
      'Open university portals publish full syllabi, lecture notes, problem sets, and past exams from top institutions for free. The challenge is never access—it is knowing how to finish a full course independently without a classroom schedule.',
    sections: [
      {
        heading: 'Pick "Scholar" Editions With Full Solutions',
        paragraphs: [
          'When browsing university open courseware (such as MIT OCW or Yale Open Courses), prioritize courses labeled with complete video lectures, reading lists, and problem sets with posted solution PDFs so you can verify your work.',
        ],
        bullets: [
          'Mathematics & Foundations: Linear Algebra (18.06), Single & Multivariable Calculus, Probability.',
          'Computer Science: Introduction to Algorithms (6.006), Software Construction, AI foundations.',
          'Economics & Policy: Microeconomics, Development Economics, Financial Theory.',
        ],
      },
      {
        heading: 'Use Active Problem Solving Over Passive Watching',
        paragraphs: [
          'Treat every lecture like a live class: take handwritten or structured notes, pause when a proof or derivation starts, and attempt the weekly problem set before reading any solution key.',
        ],
        internalLink: {
          label: 'Use NotebookLM to organize and quiz yourself from course PDFs',
          to: '/ai-tools/notebooklm',
        },
      },
    ],
    actionSteps: [
      'Choose just 1 university open course per 8-week block.',
      'Download the syllabus and map all problem set deadlines onto your calendar.',
    ],
    relatedLinks: [
      {
        title: 'Using AI Tools to Study Faster Without Losing Core Skills',
        description: 'Apply active recall workflows to university lectures.',
        to: '/blog/using-ai-tools-to-learn-faster-without-hollowing-out-your-skills',
        badge: 'Blog',
      },
    ],
  },
  {
    id: 'res-khan-academy',
    slug: 'quantitative-foundations-and-test-prep-guide',
    title: 'Quantitative Foundations & Free GRE / SAT Math Rebuild Plan',
    provider: 'AspireHub Academic Desk',
    category: 'Useful Educational Websites',
    description:
      'A 6-week diagnostic and practice guide to fix math gaps in algebra, statistics, and quantitative reasoning before GRE, USAT, or university exams.',
    readingTime: '6 min read',
    externalUrl: 'https://www.khanacademy.org/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Test Prep Plan',
    articleIntro:
      'Many scholarship and university applicants delay applying simply because quantitative math feels rusty years after high school. A focused 6-week mastery rebuild fixes foundational gaps faster than memorizing test tricks.',
    sections: [
      {
        heading: 'The 4 Core Math Pillars Tested Everywhere',
        paragraphs: [
          'Whether preparing for the GRE Quantitative section, HEC HAT/USAT, or undergraduate calculus, over 80% of mistakes come from four foundational areas:',
        ],
        bullets: [
          'Arithmetic & Number Properties: Ratios, percentages, exponents, divisibility, and rates.',
          'Algebra: Linear equations, inequalities, quadratic factoring, and word-problem translation.',
          'Geometry: Triangles, circles, coordinate slopes, and area/volume relationships.',
          'Data & Probability: Mean/median/standard deviation, combinations, and chart interpretation.',
        ],
      },
      {
        heading: 'Keep an Error Log Every Study Session',
        paragraphs: [
          'Do not just solve 50 questions and move on. Write every missed problem in a simple notebook with one line explaining WHY you missed it (conceptual gap, misread constraint, or rushed arithmetic).',
        ],
      },
    ],
    actionSteps: [
      'Take one untimed diagnostic quiz to locate your weakest 2 math topics.',
      'Practice 25 minutes daily with an error log before taking timed mock exams.',
    ],
    relatedLinks: [
      {
        title: 'Fulbright Foreign Student Program (GRE Guidance)',
        description: 'Review Fulbright GRE timing and eligibility checklist.',
        to: '/scholarships/fulbright-graduate-program-pakistan',
        badge: 'Scholarship',
      },
    ],
  },
  {
    id: 'res-roadmap-sh',
    slug: 'developer-and-career-learning-roadmaps',
    title: 'Career & Tech Learning Roadmaps: Frontend, Backend, Data & UI/UX Paths',
    provider: 'AspireHub Curriculum Advisors',
    category: 'Learning Roadmaps',
    description:
      'Compare the four most beginner-friendly digital career tracks side by side with exact tool stacks, starter projects, and realistic timelines.',
    readingTime: '9 min read',
    externalUrl: 'https://roadmap.sh/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Career Roadmap',
    articleIntro:
      'Beginners frequently ask: "Should I learn Web Development, Data Analytics, UI/UX Design, or Python?" Use this complete comparison roadmap inside AspireHub to pick one track aligned with your strengths and commit for 90 days.',
    sections: [
      {
        heading: 'Track 1: Frontend Web Developer (Months 1–4)',
        paragraphs: [
          'Best if you enjoy visual interfaces, immediate feedback in the browser, and building interactive web products.',
        ],
        bullets: [
          'Core Stack: HTML5, CSS3/Tailwind, JavaScript (ES6+), TypeScript, React, Git/GitHub.',
          'Starter Portfolio: 1 accessible landing page, 1 API-powered filterable directory, 1 full-stack form dashboard.',
        ],
      },
      {
        heading: 'Track 2: Backend & API Developer (Months 1–5)',
        paragraphs: [
          'Best if you prefer databases, system logic, authentication, and server architecture over visual styling.',
        ],
        bullets: [
          'Core Stack: Node.js/Express or PHP/Laravel or Python/Django, PostgreSQL/MySQL, REST APIs, Git.',
          'Starter Portfolio: Clean CRUD REST API with validation, auth, and documented endpoints.',
        ],
      },
      {
        heading: 'Track 3: Data Analyst (Months 1–4)',
        paragraphs: [
          'Best if you enjoy spreadsheets, business metrics, clean charts, and translating raw tables into clear decisions.',
        ],
        bullets: [
          'Core Stack: Excel/Google Sheets, SQL, Python (Pandas) or Power BI / Looker Studio.',
          'Starter Portfolio: 2–3 clean public dataset analyses answering clear business questions.',
        ],
      },
      {
        heading: 'Track 4: UI/UX Product Designer (Months 1–4)',
        paragraphs: [
          'Best if you care deeply about typography, layout hierarchy, user flows, and wireframing.',
        ],
        bullets: [
          'Core Stack: Figma, layout grids, typography, accessibility contrast, clickable prototypes.',
          'Starter Portfolio: 3 case studies showing user problem -> wireframes -> final polished UI.',
        ],
        internalLink: {
          label: 'Learn how to turn any of these 4 tracks into paid freelance services',
          to: '/freelancing/introduction-to-freelancing-for-beginners',
        },
      },
    ],
    actionSteps: [
      'Pick exactly ONE track above for the next 90 days—ignore all other trends during this sprint.',
      'Build one small real project every two weeks instead of watching endless playlists.',
    ],
    relatedLinks: [
      {
        title: 'How to Create a Portfolio With No Clients',
        description: 'Package your roadmap builds into client-ready case studies.',
        to: '/freelancing/how-to-create-a-portfolio-with-no-clients',
        badge: 'Freelancing',
      },
      {
        title: 'Full-Stack Web Development Curriculum',
        description: 'Follow our weekly engineering breakdown.',
        to: '/resources/full-stack-web-development-curriculum-guide',
        badge: 'Resource',
      },
    ],
  },
  {
    id: 'res-grow-google',
    slug: 'digital-skills-and-career-readiness-guide',
    title: 'Digital Skills & Career Readiness Guide for Students and First-Time Job Seekers',
    provider: 'AspireHub Career Desk',
    category: 'Learning Roadmaps',
    description:
      'Essential workplace, LinkedIn, productivity, and portfolio readiness checklist for graduates transitioning from university to remote or local careers.',
    readingTime: '6 min read',
    externalUrl: 'https://grow.google/',
    isVerifiedLink: true,
    formatLabel: 'On-Site Career Guide',
    articleIntro:
      'Technical knowledge alone rarely lands interviews if your LinkedIn profile, GitHub/portfolio links, and professional communication feel incomplete. Use this readiness checklist to close every gap before applying.',
    sections: [
      {
        heading: '1. Clean Up Your Digital Footprint in 60 Minutes',
        paragraphs: [
          'Before sending a single job or scholarship application, Google your own name and inspect every link you list on your CV.',
        ],
        bullets: [
          'Professional Email: Use firstname.lastname@domain.com rather than old gaming handles.',
          'LinkedIn Headline: State your exact field and value (e.g., "Computer Science Graduate | React & TypeScript Developer"), not "Aspiring Hustler".',
          'Pinned Proof: Pin your top 2–3 projects at the top of LinkedIn Featured and GitHub.',
        ],
      },
      {
        heading: '2. Build a Weekly Application & Outreach Rhythm',
        paragraphs: [
          'Replace random 1-click mass applications with a focused weekly habit: 5 deeply tailored applications + 3 thoughtful networking or client messages + 6 hours of deliberate skill building.',
        ],
      },
    ],
    actionSteps: [
      'Update your LinkedIn headline, bio, and Featured project links today.',
      'Prepare a 1-page ATS resume and a customizable cover letter template.',
    ],
    relatedLinks: [
      {
        title: 'How to Find Your First Client Beyond Marketplaces',
        description: 'Use warm outreach and value-first pitches ethically.',
        to: '/freelancing/how-to-find-your-first-client',
        badge: 'Freelancing',
      },
    ],
  },
];
