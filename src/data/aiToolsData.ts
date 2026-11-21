import { AITool, AIToolCategory } from '../types';

export const AI_TOOL_CATEGORIES: AIToolCategory[] = [
  'AI Tools for Students',
  'AI Tools for Coding',
  'AI Writing Tools',
  'AI Image Generators',
  'AI Video Tools',
  'AI Productivity Tools',
  'AI Research Tools',
  'AI Presentation Tools',
];

export const AI_TOOLS_DATA: AITool[] = [
  {
    id: 'ai-chatgpt',
    slug: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Tools for Students',
    shortDescription:
      'Conversational AI assistant for concept explanations, study outlines, coding help, and drafting structured ideas.',
    fullDescription:
      'Developed by OpenAI, ChatGPT helps students, researchers, and freelancers brainstorm, summarize complex readings, practice interview questions, and analyze uploaded documents across web and mobile.',
    pricingType: 'Freemium',
    pricingNote:
      'Free tier available with usage limits; paid Plus/Pro plans unlock higher quotas (verify current pricing at chatgpt.com).',
    officialUrl: 'https://chatgpt.com',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Pricing tiers and model limits change periodically—confirm on chatgpt.com.',
    popular: true,
    mainFeatures: [
      'Interactive study Q&A and step-by-step concept tutoring',
      'File, image, and PDF analysis support',
      'Custom instructions and project workspaces',
      'Web search and code execution capabilities',
    ],
    useCases: [
      'Breaking down difficult textbook chapters into practice quizzes',
      'Rehearsing scholarship and job interview responses',
      'Drafting outlines for freelance proposals and documentation',
    ],
    limitations: [
      'Can produce inaccurate facts or citations—always verify academic sources independently.',
      'Free tier enforces rate limits on flagship models.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (with usage caps)',
      bestFor: 'General study, brainstorming & versatile daily assistance',
      platforms: 'Web, iOS, Android, macOS, Windows',
      learningCurve: 'Easy',
      keyStrength: 'Broadest all-around multimodal workflow',
    },
    iconKey: 'sparkles',
  },
  {
    id: 'ai-deepseek',
    slug: 'deepseek',
    name: 'DeepSeek',
    category: 'AI Tools for Coding',
    shortDescription:
      'High-efficiency reasoning and coding AI assistant offering step-by-step logic chains, math problem solving, and technical debugging.',
    fullDescription:
      'DeepSeek provides conversational and deep-reasoning AI models (such as DeepSeek-V3 and DeepSeek-R1) widely used by students and developers for algorithm breakdowns, mathematical derivations, and clean code explanations.',
    pricingType: 'Freemium',
    pricingNote:
      'Free web/app chat access with generous usage; developer API is billed per token (verify current terms at deepseek.com).',
    officialUrl: 'https://chat.deepseek.com',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Review DeepSeek’s privacy policy before uploading sensitive personal or client documents.',
    popular: true,
    mainFeatures: [
      'Visible step-by-step DeepThink reasoning mode for math and logic',
      'Strong code generation and debugging across Python, C++, JS, and SQL',
      'Document and text file upload analysis',
      'Open-weight model ecosystem for developers',
    ],
    useCases: [
      'Working through university computer science algorithms and calculus proofs',
      'Debugging backend SQL queries and Python scripts',
      'Comparing alternative architectural solutions on a budget',
    ],
    limitations: [
      'Avoid pasting confidential client credentials or private academic records into any third-party chat tool.',
      'May face occasional high-traffic server slowdowns during peak hours.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (generous web chat)',
      bestFor: 'Step-by-step math reasoning, algorithms & budget-friendly coding help',
      platforms: 'Web, iOS, Android, API',
      learningCurve: 'Easy',
      keyStrength: 'Transparent reasoning trace & strong coding accuracy at zero cost',
    },
    iconKey: 'code',
  },
  {
    id: 'ai-grok',
    slug: 'grok',
    name: 'Grok',
    category: 'AI Research Tools',
    shortDescription:
      'xAI’s conversational assistant featuring real-time web and social trend awareness, image generation, and fast research synthesis.',
    fullDescription:
      'Built by xAI, Grok combines conversational reasoning, live web search, and real-time public discourse tracking to help researchers, writers, and analysts stay current on emerging news, tech releases, and market shifts.',
    pricingType: 'Freemium',
    pricingNote:
      'Free tier available with usage caps on grok.com and X; SuperGrok / X Premium plans expand quotas (verify at grok.com).',
    officialUrl: 'https://grok.com',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Verify live sources directly before citing real-time web summaries.',
    popular: true,
    mainFeatures: [
      'Real-time web and X platform information synthesis',
      'DeepSearch mode for multi-step research briefs',
      'Image generation and visual understanding',
      'Coding, summarizing, and conversational brainstorming',
    ],
    useCases: [
      'Tracking breaking industry announcements and AI tool updates',
      'Synthesizing public developer discussions around new frameworks',
      'Drafting quick competitive research briefs for freelance pitches',
    ],
    limitations: [
      'Real-time social posts can include noise or unverified claims—cross-check primary documentation.',
      'Higher query limits require paid tiers.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (usage limits apply)',
      bestFor: 'Real-time news synthesis, trend research & fast DeepSearch briefs',
      platforms: 'Web, iOS, Android, X integration',
      learningCurve: 'Easy',
      keyStrength: 'Live web + real-time social context in one search flow',
    },
    iconKey: 'search',
  },
  {
    id: 'ai-lovable',
    slug: 'lovable',
    name: 'Lovable',
    category: 'AI Tools for Coding',
    shortDescription:
      'Full-stack AI software builder that turns natural-language product prompts into live React, Tailwind, and database-connected web apps.',
    fullDescription:
      'Lovable enables founders, designers, and freelance builders to generate responsive React + TypeScript frontends, connect authentication/databases, sync to GitHub, and deploy working prototypes rapidly from plain English.',
    pricingType: 'Freemium',
    pricingNote:
      'Free starter daily/monthly credits available; paid Pro plans unlock higher message quotas and custom domains (verify at lovable.dev).',
    officialUrl: 'https://lovable.dev',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Check current free daily credit caps and export options on lovable.dev.',
    popular: true,
    mainFeatures: [
      'Prompt-to-React + Tailwind CSS full-stack web generation',
      'Two-way GitHub repository synchronization',
      'Visual element selection for targeted UI edits',
      'One-click preview and hosting deployment',
    ],
    useCases: [
      'Building rapid MVP prototypes for freelance client discovery calls',
      'Creating interactive portfolio tools or student hackathon projects',
      'Exporting clean React code to GitHub for further manual engineering',
    ],
    limitations: [
      'Free credit allowance fills up quickly during complex multi-page iterations.',
      'Developers still need to review generated security rules and edge cases before production launch.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (limited starter credits)',
      bestFor: 'Rapid full-stack React MVPs, client prototypes & visual UI iteration',
      platforms: 'Web (Cloud IDE + GitHub sync)',
      learningCurve: 'Easy',
      keyStrength: 'Fastest prompt-to-live React app workflow with GitHub sync',
    },
    iconKey: 'layers',
  },
  {
    id: 'ai-replit',
    slug: 'replit',
    name: 'Replit',
    category: 'AI Tools for Coding',
    shortDescription:
      'Browser-based collaborative IDE with Replit Agent for writing, running, debugging, and deploying full-stack applications in the cloud.',
    fullDescription:
      'Replit combines an instant zero-setup cloud development environment supporting 50+ languages with Replit Agent and Assistant—making it ideal for students learning to code or freelancers deploying web backends from any laptop.',
    pricingType: 'Freemium',
    pricingNote:
      'Free Starter tier available for public workspaces; Replit Core unlocks full Replit Agent usage and private deployments (verify at replit.com).',
    officialUrl: 'https://replit.com',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Confirm current Replit Agent limits and compute credits on replit.com.',
    popular: true,
    mainFeatures: [
      'Zero-setup browser IDE supporting Python, Node.js, React, PHP, and more',
      'Replit Agent for end-to-end app scaffolding and environment configuration',
      'Built-in database, secrets manager, and cloud deployment',
      'Real-time multiplayer code collaboration',
    ],
    useCases: [
      'Practicing CS50 or backend APIs on a low-spec laptop or Chromebook',
      'Building and hosting client prototypes with live shareable URLs',
      'Pair-programming with classmates or freelance teammates remotely',
    ],
    limitations: [
      'Autonomous Agent runs and always-on deployments require paid Core/usage credits.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (Starter workspace)',
      bestFor: 'Full cloud coding, backend sandboxes & instant deployment from browser',
      platforms: 'Web, macOS, Windows, iOS, Android',
      learningCurve: 'Moderate',
      keyStrength: 'Complete zero-setup cloud IDE + multi-language runtime',
    },
    iconKey: 'terminal',
  },
  {
    id: 'ai-readdy',
    slug: 'readdy-ai',
    name: 'Readdy',
    category: 'AI Presentation Tools',
    shortDescription:
      'AI website and product UI builder that generates clean landing pages, multi-section layouts, and exportable code from plain descriptions.',
    fullDescription:
      'Readdy (readdy.ai) helps creators, freelancers, and students turn product briefs into structured, visually cohesive web pages and UI mockups without needing deep CSS or Figma setup first.',
    pricingType: 'Freemium',
    pricingNote:
      'Free trial credits available to generate and preview projects; paid plans expand exports and generation credits (verify at readdy.ai).',
    officialUrl: 'https://readdy.ai',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Verify current export formats and credit tiers on readdy.ai.',
    mainFeatures: [
      'Text-to-UI landing page and web app generation',
      'Iterative section editing via natural-language prompts',
      'Responsive desktop and mobile layout previews',
      'Code and design export support',
    ],
    useCases: [
      'Drafting clean client landing page concepts before finalizing in Figma or code',
      'Building a personal portfolio or student club site quickly',
    ],
    limitations: [
      'Custom backend business logic still requires manual code integration.',
      'Free plan limits total generations and project exports.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (starter credits)',
      bestFor: 'Fast AI website & UI concept generation for non-designers',
      platforms: 'Web',
      learningCurve: 'Easy',
      keyStrength: 'Clean visual layout generation with minimal prompt engineering',
    },
    iconKey: 'presentation',
  },
  {
    id: 'ai-bolt-new',
    slug: 'bolt-new',
    name: 'Bolt.new',
    category: 'AI Tools for Coding',
    shortDescription:
      'In-browser AI web development sandbox by StackBlitz that installs npm packages, runs Node servers, and previews live code immediately.',
    fullDescription:
      'Powered by StackBlitz WebContainers, Bolt.new lets developers prompt, edit, install dependencies, and deploy full-stack JavaScript/TypeScript applications directly inside their browser tab.',
    pricingType: 'Freemium',
    pricingNote:
      'Free daily/monthly token tier available; Pro plans add larger token budgets (verify at bolt.new).',
    officialUrl: 'https://bolt.new',
    isVerified: true,
    dataNotice: 'Verified official tool & URL. Check current token quotas on bolt.new.',
    mainFeatures: [
      'Instant browser WebContainer running Vite, Next.js, and Node.js',
      'Full file-tree access and manual code editing alongside AI',
      'Package installation and terminal logs inside the browser',
    ],
    useCases: [
      'Prototyping React/Tailwind freelance client demos rapidly',
      'Testing libraries and API integrations without local setup',
    ],
    limitations: [
      'Token limits can deplete quickly on large codebases; export code regularly.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (token-capped free tier)',
      bestFor: 'Browser-native JS/TS prototyping with direct terminal & file control',
      platforms: 'Web',
      learningCurve: 'Moderate',
      keyStrength: 'Instant full-stack Node/Vite runtime right inside the browser',
    },
    iconKey: 'code',
  },
  {
    id: 'ai-read-ai',
    slug: 'read-ai',
    name: 'Read AI',
    category: 'AI Productivity Tools',
    shortDescription:
      'AI meeting assistant providing automated transcripts, action items, speaker metrics, and concise recaps across Zoom, Meet, and Teams.',
    fullDescription:
      'Read AI joins or integrates with virtual meetings to capture transcripts, highlight decisions, and generate follow-up action items—helping remote freelancers and student project teams stay aligned.',
    pricingType: 'Freemium',
    pricingNote:
      'Free plan supports limited monthly meeting reports; paid Pro/Enterprise plans unlock unlimited reports (verify at read.ai).',
    officialUrl: 'https://www.read.ai',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Always inform meeting participants before enabling automated note-taking bots.',
    mainFeatures: [
      'Automated meeting summaries, action items, and topic chapters',
      'Zoom, Google Meet, and Microsoft Teams integration',
      'Searchable cross-meeting transcript archive',
    ],
    useCases: [
      'Capturing exact freelance client requirements during discovery calls',
      'Summarizing weekly university capstone or research team meetings',
    ],
    limitations: [
      'Always ask client consent before inviting an AI notetaker into private calls.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (monthly report cap)',
      bestFor: 'Client discovery call recaps, transcripts & action-item tracking',
      platforms: 'Web, Zoom, Google Meet, Microsoft Teams',
      learningCurve: 'Easy',
      keyStrength: 'Structured meeting summaries with clear action items',
    },
    iconKey: 'layers',
  },
  {
    id: 'ai-claude',
    slug: 'claude',
    name: 'Claude',
    category: 'AI Writing Tools',
    shortDescription:
      'Anthropic’s AI assistant known for nuanced long-form writing clarity, code reasoning, and large-document comprehension.',
    fullDescription:
      'Claude by Anthropic excels at structured writing review, careful technical explanations, and working through lengthy PDFs or codebases with interactive Artifacts.',
    pricingType: 'Freemium',
    pricingNote:
      'Free tier with daily message limits; Pro and Team plans available (verify current details at claude.ai).',
    officialUrl: 'https://claude.ai',
    isVerified: true,
    dataNotice: 'Verified official tool & URL. Verify current plan quotas on claude.ai.',
    popular: true,
    mainFeatures: [
      'Long-context document reading and synthesis',
      'Interactive Artifacts panel for code, diagrams, and documents',
      'Clear, natural prose editing without overly robotic tone',
    ],
    useCases: [
      'Critiquing scholarship essay clarity and structure (without letting AI write your personal voice)',
      'Refining client documentation and technical specs',
      'Analyzing complex multi-page PDFs',
    ],
    limitations: [
      'Daily usage caps on free plan during peak hours.',
      'Always double-check factual claims against primary references.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (message limits apply)',
      bestFor: 'Long-document synthesis, editing & clear reasoning',
      platforms: 'Web, iOS, Android, Desktop',
      learningCurve: 'Easy',
      keyStrength: 'Nuanced writing feedback & interactive Artifacts',
    },
    iconKey: 'pen',
  },
  {
    id: 'ai-gemini',
    slug: 'google-gemini',
    name: 'Google Gemini',
    category: 'AI Tools for Students',
    shortDescription:
      'Google’s multimodal AI assistant integrated across research, document drafting, coding, and Google Workspace workflows.',
    fullDescription:
      'Google Gemini assists with studying, summarizing videos and documents, coding support, and deep research workflows connected cleanly with Google Docs and Drive.',
    pricingType: 'Freemium',
    pricingNote:
      'Free version available with Google account; paid AI plans offer expanded capabilities (verify at gemini.google.com).',
    officialUrl: 'https://gemini.google.com',
    isVerified: true,
    dataNotice: 'Verified official tool & URL. Check current plan features on gemini.google.com.',
    mainFeatures: [
      'Multimodal text, image, and document understanding',
      'Workspace integration for Docs, Gmail, and Sheets',
      'Guided learning and Deep Research reports',
    ],
    useCases: [
      'Organizing study schedules and summarizing lecture notes',
      'Exploring unfamiliar technical topics with cited web overviews',
      'Exporting structured drafts directly into Google Docs',
    ],
    limitations: ['Workspace extensions require compatible Google account permissions.'],
    comparison: {
      freeTierAvailable: 'Yes',
      bestFor: 'Google Workspace users & multimodal study tasks',
      platforms: 'Web, iOS, Android',
      learningCurve: 'Easy',
      keyStrength: 'Native Google Docs/Drive workflow integration',
    },
    iconKey: 'book',
  },
  {
    id: 'ai-notebooklm',
    slug: 'notebooklm',
    name: 'NotebookLM',
    category: 'AI Research Tools',
    shortDescription:
      'Source-grounded AI research notebook that answers questions strictly from your uploaded PDFs, notes, and slides.',
    fullDescription:
      'Built by Google, NotebookLM lets students and researchers upload syllabi, papers, and PDFs into dedicated notebooks, generating grounded citations, study guides, and audio overviews directly from your sources.',
    pricingType: 'Free',
    pricingNote:
      'Free to use with a Google account; NotebookLM Plus available via paid tiers (verify at notebooklm.google.com).',
    officialUrl: 'https://notebooklm.google.com',
    isVerified: true,
    dataNotice: 'Verified official tool & URL. Check current upload limits on notebooklm.google.com.',
    mainFeatures: [
      'Inline citations pointing straight to your uploaded source passages',
      'Automated study guides, FAQs, and briefing docs',
      'Audio Overview discussions generated from your notes',
    ],
    useCases: [
      'Preparing for university exams from lecture PDFs',
      'Reviewing multiple scholarship guidelines side by side',
      'Synthesizing literature review sources without outside noise',
    ],
    limitations: ['Limited to the sources you provide—output quality depends on source quality.'],
    comparison: {
      freeTierAvailable: 'Yes (core product free)',
      bestFor: 'Exam revision & source-grounded academic reading',
      platforms: 'Web',
      learningCurve: 'Easy',
      keyStrength: 'Strict citation grounding in your own files',
    },
    iconKey: 'book',
  },
  {
    id: 'ai-perplexity',
    slug: 'perplexity-ai',
    name: 'Perplexity',
    category: 'AI Research Tools',
    shortDescription:
      'Citation-first AI answer engine combining live web search with clean source links for rapid topic verification.',
    fullDescription:
      'Perplexity searches the live web in real time and synthesizes structured answers with numbered source citations, making it easier to verify facts and discover primary documentation.',
    pricingType: 'Freemium',
    pricingNote:
      'Free unlimited quick searches + limited Pro searches; paid plan available (verify at perplexity.ai).',
    officialUrl: 'https://www.perplexity.ai',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Always click through to primary citations for academic work.',
    mainFeatures: [
      'Real-time web search with clickable inline citations',
      'Academic and Focus search modes',
      'Follow-up thread exploration',
    ],
    useCases: [
      'Finding official university department pages and faculty research areas',
      'Researching market benchmarks before writing a freelance proposal',
      'Fact-checking statistics with direct source links',
    ],
    limitations: [
      'Summaries can still misread nuanced source pages—always inspect the linked source.',
    ],
    comparison: {
      freeTierAvailable: 'Yes',
      bestFor: 'Fact-finding & citation-backed web research',
      platforms: 'Web, iOS, Android, macOS',
      learningCurve: 'Easy',
      keyStrength: 'Live web citations on every answer',
    },
    iconKey: 'search',
  },
  {
    id: 'ai-github-copilot',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'AI Tools for Coding',
    shortDescription:
      'AI coding assistant inside VS Code, JetBrains, and GitHub for inline completions, unit tests, and code explanations.',
    fullDescription:
      'GitHub Copilot accelerates software development with context-aware code suggestions, repository chat, and pull-request help. Verified students can check eligibility for GitHub Education benefits.',
    pricingType: 'Freemium',
    pricingNote:
      'Free tier available with monthly caps; free access may apply for verified students via GitHub Education (verify at github.com/features/copilot).',
    officialUrl: 'https://github.com/features/copilot',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Confirm student eligibility and plan limits on GitHub.',
    mainFeatures: [
      'Inline autocomplete directly inside VS Code and major IDEs',
      'Workspace chat for debugging and explaining unfamiliar code',
      'Unit test generation and refactoring assistance',
    ],
    useCases: [
      'Shipping client freelance web projects faster with fewer boilerplate errors',
      'Learning new frameworks by asking chat to explain codeblocks',
    ],
    limitations: ['Generated code must be reviewed for security, edge cases, and licensing.'],
    comparison: {
      freeTierAvailable: 'Yes (limited free tier + GitHub Education)',
      bestFor: 'Students & developers inside VS Code / JetBrains',
      platforms: 'VS Code, JetBrains, Xcode, Neovim, GitHub Web',
      learningCurve: 'Moderate',
      keyStrength: 'Seamless IDE and GitHub ecosystem integration',
    },
    iconKey: 'code',
  },
  {
    id: 'ai-cursor',
    slug: 'cursor-editor',
    name: 'Cursor',
    category: 'AI Tools for Coding',
    shortDescription:
      'AI-native code editor built on VS Code supporting multi-file edits, codebase indexing, and inline refactoring.',
    fullDescription:
      'Cursor embeds AI directly into the editor experience, allowing developers to query their entire repository, apply multi-file diffs, and iterate quickly on full-stack applications.',
    pricingType: 'Freemium',
    pricingNote:
      'Hobby free tier with limited requests; Pro and Business plans available (verify at cursor.com).',
    officialUrl: 'https://www.cursor.com',
    isVerified: true,
    dataNotice: 'Verified official tool & URL. Check current Hobby vs Pro limits on cursor.com.',
    mainFeatures: [
      'Full-codebase semantic indexing and chat',
      'Multi-file edit previews with clear diff review',
      'Familiar VS Code extensions and keybindings support',
    ],
    useCases: [
      'Building full-stack freelance MVPs and portfolio applications',
      'Refactoring legacy client codebases safely with diff inspection',
    ],
    limitations: ['Requires disciplined code review—never accept multi-file edits blindly.'],
    comparison: {
      freeTierAvailable: 'Yes (Hobby tier)',
      bestFor: 'Multi-file editing & rapid full-stack development',
      platforms: 'macOS, Windows, Linux',
      learningCurve: 'Technical',
      keyStrength: 'Deep multi-file codebase context',
    },
    iconKey: 'terminal',
  },
  {
    id: 'ai-canva',
    slug: 'canva-magic-studio',
    name: 'Canva',
    category: 'AI Image Generators',
    shortDescription:
      'Accessible visual design platform featuring AI image generation, background removal, and clean layout templates.',
    fullDescription:
      'Canva combines beginner-friendly graphic design templates with Magic Studio tools for social graphics, gig thumbnails, CVs, and presentations.',
    pricingType: 'Freemium',
    pricingNote:
      'Generous free design tier; advanced Magic Studio features require Canva Pro (verify at canva.com).',
    officialUrl: 'https://www.canva.com',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Check free vs Pro feature availability on canva.com.',
    mainFeatures: [
      'Drag-and-drop templates for resumes, decks, and gig thumbnails',
      'Text-to-image generation and Magic Edit tools',
      'Brand kits and easy PDF/PNG exports',
    ],
    useCases: [
      'Designing clean Fiverr gig thumbnails and portfolio PDFs',
      'Creating academic posters and club event graphics',
    ],
    limitations: ['Many premium stock assets and background-remover tools require Pro.'],
    comparison: {
      freeTierAvailable: 'Yes (generous core editor)',
      bestFor: 'Non-designers creating thumbnails, slides & social assets',
      platforms: 'Web, iOS, Android, Desktop',
      learningCurve: 'Easy',
      keyStrength: 'Fast template-to-publish visual workflow',
    },
    iconKey: 'image',
  },
  {
    id: 'ai-gamma',
    slug: 'gamma-app',
    name: 'Gamma',
    category: 'AI Presentation Tools',
    shortDescription:
      'Generate structured slide decks, project proposals, and visual documents from an outline or rough notes.',
    fullDescription:
      'Gamma turns structured prompts or pasted documents into clean, responsive slide decks and web-style presentations that you can refine and export to PDF or PowerPoint.',
    pricingType: 'Freemium',
    pricingNote:
      'Free starter credits upon signup; Plus/Pro subscriptions remove branding and expand credits (verify at gamma.app).',
    officialUrl: 'https://gamma.app',
    isVerified: true,
    dataNotice: 'Verified official tool & URL. Confirm credit allowances on gamma.app.',
    mainFeatures: [
      'Prompt-to-deck generation with clean responsive layouts',
      'One-click theme switching and card layouts',
      'Export to PDF and PPTX',
    ],
    useCases: [
      'Preparing university seminar presentations rapidly',
      'Building client discovery decks and freelance proposals',
    ],
    limitations: [
      'Credit-based generation on free accounts; exported decks still need manual fact-checking.',
    ],
    comparison: {
      freeTierAvailable: 'Yes (starter credits)',
      bestFor: 'Turning outlines into polished presentations quickly',
      platforms: 'Web',
      learningCurve: 'Easy',
      keyStrength: 'Clean layout automation without manual slide alignment',
    },
    iconKey: 'presentation',
  },
  {
    id: 'ai-runway',
    slug: 'runway-ml',
    name: 'Runway',
    category: 'AI Video Tools',
    shortDescription:
      'Browser-based creative suite for AI video generation, background masking, and post-production cleanup.',
    fullDescription:
      'Runway offers generative video models alongside practical browser editing utilities such as background removal, inpainting, and audio cleanup for creators and editors.',
    pricingType: 'Freemium',
    pricingNote:
      'Free trial credits available; ongoing video generation requires paid credit plans (verify at runwayml.com).',
    officialUrl: 'https://runwayml.com',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Verify current generation credit pricing on runwayml.com.',
    mainFeatures: [
      'Text-to-video and image-to-video generation',
      'Smart rotoscoping and object removal',
      'Browser-based timeline editing',
    ],
    useCases: [
      'Creating short conceptual B-roll clips for client explainers',
      'Cleaning backgrounds in talking-head educational videos',
    ],
    limitations: ['Free credits deplete quickly with video generation.'],
    comparison: {
      freeTierAvailable: 'Yes (limited trial credits)',
      bestFor: 'Short-form video concepts & browser post-production',
      platforms: 'Web, iOS',
      learningCurve: 'Moderate',
      keyStrength: 'Combined generative video + practical editing utilities',
    },
    iconKey: 'video',
  },
  {
    id: 'ai-notion',
    slug: 'notion-ai',
    name: 'Notion',
    category: 'AI Productivity Tools',
    shortDescription:
      'All-in-one workspace for organizing scholarship trackers, freelance client CRMs, and class notes with optional AI.',
    fullDescription:
      'Notion lets students and freelancers build connected databases for deadlines, reading lists, and client tasks, with built-in AI add-ons for summarizing meeting notes and action items.',
    pricingType: 'Freemium',
    pricingNote:
      'Core Notion workspace is free for individuals; AI features and team plans are paid add-ons/tiers (verify at notion.so).',
    officialUrl: 'https://www.notion.so',
    isVerified: true,
    dataNotice:
      'Verified official tool & URL. Core workspace is free; verify Notion AI add-on pricing at notion.so.',
    mainFeatures: [
      'Relational databases for scholarship deadlines and client pipelines',
      'Meeting note summarization and action item extraction',
      'Shareable portfolio pages',
    ],
    useCases: [
      'Tracking 15+ scholarship applications, documents, and deadlines',
      'Managing freelance client deliverables and invoices in one place',
    ],
    limitations: ['Full Notion AI capabilities require a paid plan after trial usage.'],
    comparison: {
      freeTierAvailable: 'Yes (workspace free; limited AI trial)',
      bestFor: 'Organizing academic trackers, notes & freelance CRMs',
      platforms: 'Web, macOS, Windows, iOS, Android',
      learningCurve: 'Moderate',
      keyStrength: 'Structured databases + sharable pages',
    },
    iconKey: 'layers',
  },
];
