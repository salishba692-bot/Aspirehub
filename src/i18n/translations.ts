import { LanguageCode } from '../types';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeLabel: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeLabel: 'Français', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeLabel: 'اردو', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
];

export interface TranslationDictionary {
  nav: {
    home: string;
    scholarships: string;
    freelancing: string;
    aiTools: string;
    resources: string;
    toolkit: string;
    blog: string;
    about: string;
    contact: string;
    getStarted: string;
    searchPlaceholder: string;
    themeLight: string;
    themeDark: string;
  };
  common: {
    all: string;
    viewDetails: string;
    officialLink: string;
    readMore: string;
    visitTool: string;
    compare: string;
    selected: string;
    readFullGuide: string;
    readArticle: string;
    updated: string;
    expired: string;
    officialPortal: string;
    sampleData: string;
    verifiedTool: string;
    sampleListing: string;
    save: string;
    saved: string;
    savedToBookmarks: string;
    removedFromBookmarks: string;
    copy: string;
    copied: string;
    tryAgain: string;
    unableToLoad: string;
    backToHome: string;
    resetFilters: string;
    explore: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    statAwards: string;
    statGuides: string;
    statTools: string;
  };
  sections: {
    pillarsKicker: string;
    pillarsTitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar1Cta: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar2Cta: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar3Cta: string;
    scholarshipHubKicker: string;
    featuredScholarships: string;
    scholarshipHubDesc: string;
    viewAllScholarships: string;
    popularGuidesKicker: string;
    popularGuides: string;
    popularGuidesDesc: string;
    allGuides: string;
    aiDirKicker: string;
    trendingTools: string;
    aiDirDesc: string;
    exploreTools: string;
    toolkitKicker: string;
    toolkitTitle: string;
    toolkitDesc: string;
    openToolkit: string;
    whyKicker: string;
    whyTitle: string;
    whyDesc: string;
    whyMissionCta: string;
    whyCard1Title: string;
    whyCard1Desc: string;
    whyCard2Title: string;
    whyCard2Desc: string;
    whyCard3Title: string;
    whyCard3Desc: string;
    whyCard4Title: string;
    whyCard4Desc: string;
    resourcesKicker: string;
    resourcesTitle: string;
    browseResources: string;
    blogKicker: string;
    latestArticles: string;
    readAllArticles: string;
    crossLinksHeading: string;
    crossLinksSubheading: string;
  };
  filters: {
    searchLabel: string;
    countryLabel: string;
    degreeLabel: string;
    subjectLabel: string;
    fundingLabel: string;
    statusLabel: string;
    pricingLabel: string;
    levelLabel: string;
    internationalOnly: string;
    reset: string;
    allDegrees: string;
    allSubjects: string;
    allPricing: string;
    allStatuses: string;
    allLevels: string;
  };
  search: {
    dialogLabel: string;
    placeholder: string;
    allTab: string;
    scholarshipsTab: string;
    careerTab: string;
    aiToolsTab: string;
    resourcesTab: string;
    blogTab: string;
    toolkitTab: string;
    recentTitle: string;
    clearRecent: string;
    suggestionsTitle: string;
    shortcutsTitle: string;
    noResults: string;
    noResultsHint: string;
    resultsCount: string;
  };
  tracker: {
    drawerTitle: string;
    savedSingular: string;
    savedPlural: string;
    savedInBrowser: string;
    allTab: string;
    scholarshipsTab: string;
    otherTab: string;
    upcomingAlertTitle: string;
    emptyTitle: string;
    emptyDesc: string;
    stageLabel: string;
    reminderLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    clearAll: string;
    browseOpportunities: string;
    stageResearching: string;
    stagePreparing: string;
    stageSubmitted: string;
    stageShortlisted: string;
  };
  toolkit: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    breadcrumb: string;
    tabEligibility: string;
    tabCareerQuiz: string;
    tabCvTips: string;
    tabSkillQuiz: string;
    eligibilityTitle: string;
    eligibilityDesc: string;
    degreeSelectLabel: string;
    readinessScore: string;
    resetChecklist: string;
    careerQuizTitle: string;
    careerQuizDesc: string;
    seeCareerResult: string;
    retakeQuiz: string;
    cvTipsTitle: string;
    cvTipsDesc: string;
    copyBullets: string;
    skillQuizTitle: string;
    skillQuizDesc: string;
    checkSkillScore: string;
  };
  pages: {
    scholarshipsLabel: string;
    scholarshipsTitle: string;
    scholarshipsSubtitle: string;
    freelancingLabel: string;
    freelancingTitle: string;
    freelancingSubtitle: string;
    aiToolsLabel: string;
    aiToolsTitle: string;
    aiToolsSubtitle: string;
    compareLabel: string;
    compareTitle: string;
    compareSubtitle: string;
    resourcesLabel: string;
    resourcesTitle: string;
    resourcesSubtitle: string;
    blogLabel: string;
    blogTitle: string;
    blogSubtitle: string;
    aboutLabel: string;
    aboutTitle: string;
    aboutSubtitle: string;
    contactLabel: string;
    contactTitle: string;
    contactSubtitle: string;
    privacyLabel: string;
    privacyTitle: string;
    privacySubtitle: string;
    disclaimerLabel: string;
    disclaimerTitle: string;
    disclaimerSubtitle: string;
    notFoundTitle: string;
    notFoundDesc: string;
  };
  advisor: {
    launcher: string;
    title: string;
    roleGeneral: string;
    roleScholarship: string;
    roleFreelance: string;
    roleAiTools: string;
    detailLabel: string;
    speedFast: string;
    speedBalanced: string;
    speedDeep: string;
    welcomeTitle: string;
    welcomeDesc: string;
    tryAsking: string;
    placeholder: string;
    disclaimer: string;
    drafting: string;
    retry: string;
  };
  getStarted: {
    kicker: string;
    title: string;
    path1Title: string;
    path1Desc: string;
    path2Title: string;
    path2Desc: string;
    path3Title: string;
    path3Desc: string;
    path4Title: string;
    path4Desc: string;
    advisorTitle: string;
    advisorDesc: string;
  };
  newsletter: {
    kicker: string;
    title: string;
    subtitle: string;
    placeholder: string;
    subscribe: string;
    saving: string;
  };
  footer: {
    tagline: string;
    scholarshipsHeading: string;
    careersHeading: string;
    trustHeading: string;
    aboutLink: string;
    contactLink: string;
    privacyLink: string;
    disclaimerLink: string;
    toolkitLink: string;
    blogLink: string;
    languageLabel: string;
    copyright: string;
    verificationNote: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    account: string;
    welcomeBack: string;
    createAccountTitle: string;
    authSubtitle: string;
    fullNameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    passwordHint: string;
    countryLabel: string;
    focusGoalLabel: string;
    bioLabel: string;
    saveProfile: string;
    profileSaved: string;
    dashboardTitle: string;
    dashboardSubtitle: string;
    savedOverview: string;
    openBookmarks: string;
    noAccountPrompt: string;
    haveAccountPrompt: string;
    submitting: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      scholarships: 'Scholarships',
      freelancing: 'Career & Freelance',
      aiTools: 'AI Tools',
      resources: 'Resources',
      toolkit: 'Toolkit',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      getStarted: 'Get Started',
      searchPlaceholder: 'Search scholarships, career guides, AI tools, or courses...',
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
    },
    common: {
      all: 'All',
      viewDetails: 'View Details',
      officialLink: 'Official Link',
      readMore: 'Read More',
      visitTool: 'Visit Tool',
      compare: 'Compare',
      selected: 'Selected',
      readFullGuide: 'Read Full Guide',
      readArticle: 'Read Article',
      updated: 'Updated',
      expired: 'Expired',
      officialPortal: 'Official Portal',
      sampleData: 'Sample Data',
      verifiedTool: 'Verified Tool',
      sampleListing: 'Sample Listing',
      save: 'Save',
      saved: 'Saved',
      savedToBookmarks: 'Saved to bookmarks',
      removedFromBookmarks: 'Removed from bookmarks',
      copy: 'Copy',
      copied: 'Copied',
      tryAgain: 'Try Again',
      unableToLoad: 'Unable to load data',
      backToHome: 'Back to Home',
      resetFilters: 'Reset All Filters',
      explore: 'Explore',
    },
    hero: {
      kicker: 'Global Scholarships · Remote Careers · AI Tools · Interactive Toolkit',
      title: 'Explore Opportunities. Learn Skills. Build Your Future.',
      subtitle:
        'Discover verified international scholarships, track deadlines, master freelancing and remote careers, compare AI tools, and prepare with interactive tools worldwide.',
      primaryCta: 'Explore Scholarships',
      secondaryCta: 'Discover AI Tools',
      statAwards: 'Curated Scholarships',
      statGuides: 'Full Career & Study Guides',
      statTools: 'AI Directory Tools',
    },
    sections: {
      pillarsKicker: 'Global Learning & Career Pillars',
      pillarsTitle: 'Everything you need to move from learning to earning',
      pillar1Title: 'Global Scholarship Hub',
      pillar1Desc:
        'Filter verified international and local scholarships by country, degree, and subject with official portal links and deadline tracking.',
      pillar1Cta: 'Browse Scholarships',
      pillar2Title: 'Freelancing & Career Hub',
      pillar2Desc:
        'Explore remote jobs, international internships, beginner skill roadmaps, Fiverr/Upwork guides, and client pricing.',
      pillar2Cta: 'Read Career Guides',
      pillar3Title: 'AI Tools Directory',
      pillar3Desc:
        'Discover and compare verified Free, Freemium, and Paid AI tools for studying, coding, writing, and research.',
      pillar3Cta: 'Explore AI Tools',
      scholarshipHubKicker: 'Scholarship Hub',
      featuredScholarships: 'Featured Global Scholarships',
      scholarshipHubDesc:
        'Verified official scholarship portals across the UK, US, Europe, Japan, Australia, and Pakistan.',
      viewAllScholarships: 'View All Scholarships',
      popularGuidesKicker: 'Skill, Remote Work & Income Guides',
      popularGuides: 'Freelancing & Remote Career Hub',
      popularGuidesDesc:
        'Step-by-step playbooks covering remote jobs, internships, Fiverr, Upwork, portfolio case studies, and winning your first client.',
      allGuides: 'All Career & Freelance Guides',
      aiDirKicker: 'AI Tools Directory',
      trendingTools: 'Trending AI Tools',
      aiDirDesc:
        'Practical AI tools for studying, coding, writing, and citation-backed research.',
      exploreTools: 'Explore & Compare Tools',
      toolkitKicker: 'Interactive Student & Career Lab',
      toolkitTitle: 'Test readiness, match career paths, and build ATS CV bullets',
      toolkitDesc:
        'Use four interactive tools built directly into AspireHub—scholarship eligibility checklist, career interest quiz, CV bullet generator, and skill quiz.',
      openToolkit: 'Open Interactive Toolkit',
      whyKicker: 'Why Choose AspireHub?',
      whyTitle: 'Clarity and verified sources over noisy hype',
      whyDesc:
        'Students and beginners worldwide deserve complete on-site guides, accurate official portals, clearly flagged expired cycles, and interconnected learning paths.',
      whyMissionCta: 'Read our mission',
      whyCard1Title: 'Complete On-Site Guides',
      whyCard1Desc:
        'Read full step-by-step articles, study plans, certification financial aid guides, and interview handbooks directly on AspireHub.',
      whyCard2Title: 'Global Career & Study Roadmaps',
      whyCard2Desc:
        'Structured pathways covering international scholarships, remote jobs, internships, and beginner freelancing systems.',
      whyCard3Title: 'Side-by-Side Tool Comparison',
      whyCard3Desc:
        'Compare free tiers, learning curves, and core strengths across AI tools before investing your study hours or budget.',
      whyCard4Title: 'Save & Track Deadlines Locally',
      whyCard4Desc:
        'Bookmark scholarships, set application stages and reminder dates, and track progress privately in your browser.',
      resourcesKicker: 'Free Learning Guides',
      resourcesTitle: 'Free Courses, Certifications & Career Templates',
      browseResources: 'Browse All Free Guides',
      blogKicker: 'AspireHub Journal',
      latestArticles: 'Latest Educational Articles',
      readAllArticles: 'Read All Articles',
      crossLinksHeading: 'Recommended Next Steps Across AspireHub',
      crossLinksSubheading:
        'Continue with connected guides, templates, and interactive tools inside AspireHub.',
    },
    filters: {
      searchLabel: 'Search',
      countryLabel: 'Country / Region',
      degreeLabel: 'Degree Level',
      subjectLabel: 'Subject / Field',
      fundingLabel: 'Funding Type',
      statusLabel: 'Application Status',
      pricingLabel: 'Pricing Filter',
      levelLabel: 'Experience Level',
      internationalOnly: 'International Student Focus',
      reset: 'Reset Filters',
      allDegrees: 'All Degrees',
      allSubjects: 'All Subjects',
      allPricing: 'All Pricing',
      allStatuses: 'All Statuses',
      allLevels: 'All Levels',
    },
    search: {
      dialogLabel: 'Smart Search across AspireHub',
      placeholder: 'Search scholarships, remote jobs, AI tools, free courses, or toolkit...',
      allTab: 'All',
      scholarshipsTab: 'Scholarships',
      careerTab: 'Career & Freelance',
      aiToolsTab: 'AI Tools',
      resourcesTab: 'Courses & CV',
      blogTab: 'Blog',
      toolkitTab: 'Toolkit',
      recentTitle: 'Recent Searches',
      clearRecent: 'Clear',
      suggestionsTitle: 'Suggested Topics',
      shortcutsTitle: 'Quick Shortcuts',
      noResults: 'No matching entries for',
      noResultsHint: 'Try broader terms such as "UK", "remote jobs", "Fiverr", "coding", or "eligibility".',
      resultsCount: 'verified matches',
    },
    tracker: {
      drawerTitle: 'Saved Items & Scholarship Tracker',
      savedSingular: 'item',
      savedPlural: 'items',
      savedInBrowser: 'saved privately in your browser',
      allTab: 'All Saved',
      scholarshipsTab: 'Scholarship Tracker',
      otherTab: 'Careers & Tools',
      upcomingAlertTitle: 'Upcoming or Due Reminders',
      emptyTitle: 'No saved items yet',
      emptyDesc:
        'Bookmark any scholarship to track stages and reminder dates, or save career guides, AI tools, and courses for quick access.',
      stageLabel: 'Stage',
      reminderLabel: 'Reminder date',
      notesLabel: 'Notes',
      notesPlaceholder: 'SOP status, referee email, test score...',
      clearAll: 'Clear All',
      browseOpportunities: 'Browse Scholarships',
      stageResearching: 'Researching',
      stagePreparing: 'Preparing Docs',
      stageSubmitted: 'Submitted',
      stageShortlisted: 'Shortlisted',
    },
    toolkit: {
      sectionLabel: 'Interactive Readiness & Career Lab',
      title: 'AspireHub Student & Career Toolkit',
      subtitle:
        'Check scholarship document readiness, discover career tracks aligned with your strengths, generate ATS resume bullets, and test practical skills.',
      breadcrumb: 'Interactive Toolkit',
      tabEligibility: 'Scholarship Checklist',
      tabCareerQuiz: 'Career Interest Quiz',
      tabCvTips: 'Resume & CV Builder Tips',
      tabSkillQuiz: 'Skill Assessment Quiz',
      eligibilityTitle: 'Scholarship Eligibility & Readiness Checklist',
      eligibilityDesc:
        'Tick off verified milestones for your target degree level. Progress is saved locally in your browser.',
      degreeSelectLabel: 'Target Degree Level',
      readinessScore: 'Readiness Score',
      resetChecklist: 'Reset Checklist',
      careerQuizTitle: 'Career & Freelancing Interest Quiz',
      careerQuizDesc:
        'Answer 6 short questions to identify the career path and connected AspireHub guides that fit how you work.',
      seeCareerResult: 'View Recommended Path',
      retakeQuiz: 'Retake Quiz',
      cvTipsTitle: 'ATS Resume & Academic CV Bullet Generator',
      cvTipsDesc:
        'Choose your target role and focus area to generate structured, action-verb bullet templates you can tailor with your real metrics.',
      copyBullets: 'Copy Templates',
      skillQuizTitle: 'Practical Skill Assessment Quiz',
      skillQuizDesc:
        'Test your working knowledge across Web/AI, Freelancing, or Academic Applications with instant explanations.',
      checkSkillScore: 'Score My Answers',
    },
    pages: {
      scholarshipsLabel: 'Global Scholarship Finder',
      scholarshipsTitle: 'Scholarship Hub',
      scholarshipsSubtitle:
        'Filter international and local scholarships by country, degree level, and subject alongside clearly labeled sample templates and archived expired cycles.',
      freelancingLabel: 'Skill, Remote Work & Career Playbooks',
      freelancingTitle: 'Freelancing & Career Hub',
      freelancingSubtitle:
        'Beginner-friendly guides covering remote jobs, global internships, skill development roadmaps, Fiverr/Upwork profiles, portfolios, and client pricing.',
      aiToolsLabel: 'AI Productivity Directory',
      aiToolsTitle: 'AI Tools Directory',
      aiToolsSubtitle:
        'Discover, filter, and compare practical AI tools—including Grok, DeepSeek, Lovable, Replit, Readdy, ChatGPT, and Claude—for studying, coding, and building.',
      compareLabel: 'Side-by-Side Comparison',
      compareTitle: 'Compare AI Tools',
      compareSubtitle:
        'Compare up to 3 AI tools directly across pricing, free tier limits, core strengths, platforms, features, and limitations.',
      resourcesLabel: 'On-Site Learning, Certifications & International Student Toolkit',
      resourcesTitle: 'Learning Resources',
      resourcesSubtitle:
        'Free course curriculums, certification financial aid guides, copyable ATS CV templates, interview handbooks, and international student prep directly on AspireHub.',
      blogLabel: 'AspireHub Journal',
      blogTitle: 'Blog & Educational Articles',
      blogSubtitle:
        'Thoughtful, practical guidance on scholarship essays, balancing studies with freelance work, and learning high-value digital skills.',
      aboutLabel: 'About AspireHub',
      aboutTitle: 'Accessible guidance for students, graduates, and beginners',
      aboutSubtitle:
        'Building one dependable place to discover scholarships, learn practical digital skills, and navigate modern AI workflows responsibly.',
      contactLabel: 'Trust & Editorial Feedback',
      contactTitle: 'Contact AspireHub',
      contactSubtitle:
        'Help keep scholarship deadlines, official application links, and learning guides accurate for students worldwide.',
      privacyLabel: 'Trust & Legal',
      privacyTitle: 'Privacy Policy',
      privacySubtitle:
        'Clear, plain-language explanation of what data stays in your browser, how AI Advisor requests work, and how external links are handled.',
      disclaimerLabel: 'Trust & Legal',
      disclaimerTitle: 'Disclaimer & Verification Policy',
      disclaimerSubtitle:
        'AspireHub provides educational guides and official reference directories. Always verify live deadlines, fees, and eligibility directly on official host portals.',
      notFoundTitle: 'We could not find that page',
      notFoundDesc:
        'The link you followed may have moved or does not exist. Explore our core directories below.',
    },
    advisor: {
      launcher: 'AI Career & Study Advisor',
      title: 'AspireHub AI Advisor',
      roleGeneral: 'General',
      roleScholarship: 'Scholarships',
      roleFreelance: 'Careers',
      roleAiTools: 'AI Tools',
      detailLabel: 'Response detail',
      speedFast: 'Quick',
      speedBalanced: 'Balanced',
      speedDeep: 'Detailed',
      welcomeTitle: 'AI Career & Study Assistant',
      welcomeDesc:
        'Ask about suitable career paths, skill roadmaps, scholarship SOP outlines, or AI tools. We only reference verified AspireHub guides and official portals.',
      tryAsking: 'Try asking',
      placeholder: 'Ask career, scholarship, or AI advice...',
      disclaimer: 'Verify live scholarship deadlines & tool pricing on official portals.',
      drafting: 'Drafting guidance...',
      retry: 'Retry message',
    },
    getStarted: {
      kicker: 'Choose Your Track',
      title: 'Where would you like to begin today?',
      path1Title: 'Find & Track Scholarships',
      path1Desc:
        'Filter international awards, verify eligibility, and track application stages and reminders.',
      path2Title: 'Start Freelancing & Remote Careers',
      path2Desc:
        'Follow beginner playbooks for remote jobs, internships, Fiverr, Upwork, and portfolio projects.',
      path3Title: 'Explore & Compare AI Tools',
      path3Desc:
        'Compare verified free and freemium AI tools side by side for studying, coding, and research.',
      path4Title: 'Open Interactive Student Toolkit',
      path4Desc:
        'Run the scholarship checklist, career interest quiz, CV tips generator, and skill assessment.',
      advisorTitle: 'Chat with AspireHub AI Advisor',
      advisorDesc:
        'Explore suitable careers, learning roadmaps, and SOP frameworks without invented listings.',
    },
    newsletter: {
      kicker: 'Weekly Opportunity Digest',
      title: 'Stay updated on scholarship guides, freelance playbooks, and verified AI tools.',
      subtitle:
        'Receive practical study and career notes once a week—no spam, no clickbait deadlines.',
      placeholder: 'you@university.edu',
      subscribe: 'Subscribe',
      saving: 'Saving...',
    },
    footer: {
      tagline:
        'Making verified international scholarships, remote career playbooks, free certifications, interactive tools, and AI literacy accessible worldwide.',
      scholarshipsHeading: 'Scholarships',
      careersHeading: 'Careers, Toolkit & AI',
      trustHeading: 'Trust & Legal',
      aboutLink: 'About Us',
      contactLink: 'Contact & Corrections',
      privacyLink: 'Privacy Policy',
      disclaimerLink: 'Disclaimer',
      toolkitLink: 'Interactive Toolkit',
      blogLink: 'Editorial Blog',
      languageLabel: 'Interface Language',
      copyright:
        'AspireHub. Built for students, graduates, freelancers, and lifelong learners worldwide.',
      verificationNote: 'Verified official portal links · Always confirm live cycle dates on host websites.',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Create Account',
      signOut: 'Sign Out',
      account: 'Account',
      welcomeBack: 'Welcome back to AspireHub',
      createAccountTitle: 'Create your AspireHub account',
      authSubtitle: 'Save your profile, scholarship stages, and curated bookmarks in one place.',
      fullNameLabel: 'Full Name',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      passwordHint: 'At least 8 characters',
      countryLabel: 'Country / Region',
      focusGoalLabel: 'Primary Focus',
      bioLabel: 'Short Bio / Study or Career Goal',
      saveProfile: 'Save Profile',
      profileSaved: 'Profile updated.',
      dashboardTitle: 'Your AspireHub Account',
      dashboardSubtitle: 'Manage your personal learning profile and saved opportunities.',
      savedOverview: 'Saved Items & Tracker',
      openBookmarks: 'Open Bookmarks & Tracker',
      noAccountPrompt: 'New to AspireHub?',
      haveAccountPrompt: 'Already have an account?',
      submitting: 'Please wait...',
    },
  },

  es: {
    nav: {
      home: 'Inicio',
      scholarships: 'Becas',
      freelancing: 'Carreras y Freelance',
      aiTools: 'Herramientas IA',
      resources: 'Recursos',
      toolkit: 'Herramientas',
      blog: 'Blog',
      about: 'Nosotros',
      contact: 'Contacto',
      getStarted: 'Comenzar',
      searchPlaceholder: 'Buscar becas, guías profesionales, herramientas IA o cursos...',
      themeLight: 'Cambiar a modo claro',
      themeDark: 'Cambiar a modo oscuro',
    },
    common: {
      all: 'Todo',
      viewDetails: 'Ver Detalles',
      officialLink: 'Enlace Oficial',
      readMore: 'Leer Más',
      visitTool: 'Visitar Sitio',
      compare: 'Comparar',
      selected: 'Seleccionado',
      readFullGuide: 'Leer Guía Completa',
      readArticle: 'Leer Artículo',
      updated: 'Actualizado',
      expired: 'Expirada',
      officialPortal: 'Portal Oficial',
      sampleData: 'Datos de Ejemplo',
      verifiedTool: 'Verificada',
      sampleListing: 'Ejemplo',
      save: 'Guardar',
      saved: 'Guardado',
      savedToBookmarks: 'Guardado en marcadores',
      removedFromBookmarks: 'Eliminado de marcadores',
      copy: 'Copiar',
      copied: 'Copiado',
      tryAgain: 'Reintentar',
      unableToLoad: 'No se pudieron cargar los datos',
      backToHome: 'Volver al Inicio',
      resetFilters: 'Restablecer Filtros',
      explore: 'Explorar',
    },
    hero: {
      kicker: 'Becas Globales · Trabajo Remoto · Herramientas IA · Kit Interactivo',
      title: 'Explora Oportunidades. Aprende Habilidades. Construye Tu Futuro.',
      subtitle:
        'Descubre becas internacionales verificadas, controla plazos, domina el trabajo freelance y remoto, compara herramientas IA y prepárate con recursos interactivos.',
      primaryCta: 'Explorar Becas',
      secondaryCta: 'Descubrir Herramientas IA',
      statAwards: 'Becas Curadas',
      statGuides: 'Guías Completas',
      statTools: 'Herramientas IA',
    },
    sections: {
      pillarsKicker: 'Pilares Globales de Aprendizaje',
      pillarsTitle: 'Todo lo necesario para pasar del aprendizaje al trabajo profesional',
      pillar1Title: 'Centro Global de Becas',
      pillar1Desc:
        'Filtra becas internacionales y regionales por país, nivel y disciplina con enlaces oficiales y seguimiento de plazos.',
      pillar1Cta: 'Explorar Becas',
      pillar2Title: 'Centro de Carreras y Freelance',
      pillar2Desc:
        'Explora empleos remotos, pasantías internacionales, rutas de habilidades, guías de Fiverr/Upwork y tarifas.',
      pillar2Cta: 'Ver Guías Profesionales',
      pillar3Title: 'Directorio de Herramientas IA',
      pillar3Desc:
        'Compara herramientas IA gratuitas, freemium y de pago para estudiar, programar, redactar e investigar.',
      pillar3Cta: 'Explorar IA',
      scholarshipHubKicker: 'Centro de Becas',
      featuredScholarships: 'Becas Internacionales Destacadas',
      scholarshipHubDesc:
        'Portales oficiales verificados en Reino Unido, EE. UU., Europa, Japón, Australia y Pakistán.',
      viewAllScholarships: 'Ver Todas las Becas',
      popularGuidesKicker: 'Habilidades, Trabajo Remoto e Ingresos',
      popularGuides: 'Centro de Carreras y Freelancing',
      popularGuidesDesc:
        'Guías paso a paso sobre empleo remoto, pasantías, Fiverr, Upwork, portafolios y primeros clientes.',
      allGuides: 'Todas las Guías',
      aiDirKicker: 'Directorio IA',
      trendingTools: 'Herramientas IA Populares',
      aiDirDesc: 'Herramientas prácticas para estudiar, programar y redactar con fuentes.',
      exploreTools: 'Explorar y Comparar IA',
      toolkitKicker: 'Laboratorio Interactivo',
      toolkitTitle: 'Evalúa tu elegibilidad, descubre tu ruta profesional y mejora tu CV',
      toolkitDesc:
        'Utiliza cuatro herramientas interactivas gratuitas: lista de elegibilidad para becas, test de carrera, generador de logros para CV y evaluación de habilidades.',
      openToolkit: 'Abrir Kit Interactivo',
      whyKicker: '¿Por qué AspireHub?',
      whyTitle: 'Claridad y fuentes verificadas sin exageraciones',
      whyDesc:
        'Estudiantes de todo el mundo merecen guías completas, portales oficiales reales y advertencias claras sobre convocatorias cerradas.',
      whyMissionCta: 'Leer nuestra misión',
      whyCard1Title: 'Guías Completas en el Sitio',
      whyCard1Desc:
        'Lee planes de estudio, ayuda financiera para certificaciones y manuales de entrevista directamente en AspireHub.',
      whyCard2Title: 'Rutas Globales de Estudio y Empleo',
      whyCard2Desc:
        'Caminos estructurados para becas internacionales, empleo remoto, pasantías y trabajo independiente.',
      whyCard3Title: 'Comparación Lado a Lado',
      whyCard3Desc:
        'Compara planes gratuitos, curva de aprendizaje y puntos fuertes antes de elegir una herramienta IA.',
      whyCard4Title: 'Guarda y Controla Plazos',
      whyCard4Desc:
        'Marca becas favoritas, registra tu etapa de solicitud y configura recordatorios privados en tu navegador.',
      resourcesKicker: 'Guías Gratuitas',
      resourcesTitle: 'Cursos Gratis, Certificaciones y Plantillas de CV',
      browseResources: 'Ver Todos los Recursos',
      blogKicker: 'Revista AspireHub',
      latestArticles: 'Últimos Artículos Educativos',
      readAllArticles: 'Leer Todos los Artículos',
      crossLinksHeading: 'Siguientes Pasos Recomendados en AspireHub',
      crossLinksSubheading: 'Continúa con guías, plantillas y herramientas interactivas conectadas.',
    },
    filters: {
      searchLabel: 'Buscar',
      countryLabel: 'País / Región',
      degreeLabel: 'Nivel de Grado',
      subjectLabel: 'Área de Estudio',
      fundingLabel: 'Financiación',
      statusLabel: 'Estado',
      pricingLabel: 'Precio',
      levelLabel: 'Nivel',
      internationalOnly: 'Enfoque Estudiante Internacional',
      reset: 'Restablecer Filtros',
      allDegrees: 'Todos los Niveles',
      allSubjects: 'Todas las Áreas',
      allPricing: 'Todos los Precios',
      allStatuses: 'Todos los Estados',
      allLevels: 'Todos los Niveles',
    },
    search: {
      dialogLabel: 'Búsqueda Inteligente en AspireHub',
      placeholder: 'Buscar becas, empleos remotos, herramientas IA, cursos o kit...',
      allTab: 'Todo',
      scholarshipsTab: 'Becas',
      careerTab: 'Carreras y Freelance',
      aiToolsTab: 'Herramientas IA',
      resourcesTab: 'Cursos y CV',
      blogTab: 'Blog',
      toolkitTab: 'Kit Interactivo',
      recentTitle: 'Búsquedas Recientes',
      clearRecent: 'Limpiar',
      suggestionsTitle: 'Temas Sugeridos',
      shortcutsTitle: 'Accesos Rápidos',
      noResults: 'Sin resultados para',
      noResultsHint: 'Prueba términos más amplios como "UK", "remoto", "Fiverr", "programación" o "CV".',
      resultsCount: 'coincidencias verificadas',
    },
    tracker: {
      drawerTitle: 'Marcadores y Seguimiento de Becas',
      savedSingular: 'elemento',
      savedPlural: 'elementos',
      savedInBrowser: 'guardados localmente en tu navegador',
      allTab: 'Todo',
      scholarshipsTab: 'Seguimiento de Becas',
      otherTab: 'Carreras y Herramientas',
      upcomingAlertTitle: 'Recordatorios Próximos o Vencidos',
      emptyTitle: 'Aún no tienes elementos guardados',
      emptyDesc:
        'Guarda cualquier beca para controlar etapas y recordatorios, o marca guías, herramientas IA y cursos.',
      stageLabel: 'Etapa',
      reminderLabel: 'Fecha de recordatorio',
      notesLabel: 'Notas',
      notesPlaceholder: 'Estado del ensayo, cartas, examen...',
      clearAll: 'Borrar Todo',
      browseOpportunities: 'Explorar Becas',
      stageResearching: 'Investigando',
      stagePreparing: 'Preparando Documentos',
      stageSubmitted: 'Enviada',
      stageShortlisted: 'Preseleccionado',
    },
    toolkit: {
      sectionLabel: 'Laboratorio Interactivo de Preparación',
      title: 'Kit Interactivo de Estudiantes y Carrera',
      subtitle:
        'Verifica tu preparación para becas, descubre tu ruta profesional ideal, genera viñetas para tu CV y evalúa tus habilidades.',
      breadcrumb: 'Kit Interactivo',
      tabEligibility: 'Lista de Becas',
      tabCareerQuiz: 'Test de Carrera',
      tabCvTips: 'Consejos y Viñetas CV',
      tabSkillQuiz: 'Evaluación de Habilidades',
      eligibilityTitle: 'Lista de Verificación de Elegibilidad para Becas',
      eligibilityDesc:
        'Marca los requisitos clave para tu nivel de estudios. Tu progreso se guarda en el navegador.',
      degreeSelectLabel: 'Nivel de Grado Objetivo',
      readinessScore: 'Nivel de Preparación',
      resetChecklist: 'Reiniciar Lista',
      careerQuizTitle: 'Cuestionario de Intereses Profesionales',
      careerQuizDesc:
        'Responde 6 preguntas breves para identificar tu mejor ruta profesional y guías recomendadas.',
      seeCareerResult: 'Ver Ruta Recomendada',
      retakeQuiz: 'Repetir Test',
      cvTipsTitle: 'Generador de Logros ATS para CV y Currículum Académico',
      cvTipsDesc:
        'Elige tu área y enfoque para generar plantillas listas para personalizar con tus propios resultados.',
      copyBullets: 'Copiar Plantillas',
      skillQuizTitle: 'Evaluación Práctica de Habilidades',
      skillQuizDesc:
        'Pon a prueba tus conocimientos en Desarrollo/IA, Freelancing o Solicitudes Académicas con explicaciones.',
      checkSkillScore: 'Calificar Respuestas',
    },
    pages: {
      scholarshipsLabel: 'Buscador Global de Becas',
      scholarshipsTitle: 'Centro de Becas',
      scholarshipsSubtitle:
        'Filtra becas internacionales y locales por país, grado y disciplina, con ejemplos claramente etiquetados y convocatorias expiradas archivadas.',
      freelancingLabel: 'Guías de Habilidades y Trabajo Remoto',
      freelancingTitle: 'Centro de Carreras y Freelance',
      freelancingSubtitle:
        'Guías para principiantes sobre empleo remoto, pasantías globales, Fiverr, Upwork, portafolio y precios.',
      aiToolsLabel: 'Directorio de Productividad IA',
      aiToolsTitle: 'Directorio de Herramientas IA',
      aiToolsSubtitle:
        'Descubre, filtra y compara herramientas prácticas como Grok, DeepSeek, Lovable, Replit, ChatGPT y Claude.',
      compareLabel: 'Comparación Lado a Lado',
      compareTitle: 'Comparar Herramientas IA',
      compareSubtitle:
        'Compara hasta 3 herramientas IA en precios, planes gratuitos, fortalezas, plataformas y limitaciones.',
      resourcesLabel: 'Aprendizaje, Certificaciones y Estudiantes Internacionales',
      resourcesTitle: 'Recursos de Aprendizaje',
      resourcesSubtitle:
        'Planes de estudio gratuitos, becas de certificación, plantillas de CV ATS y preparación para entrevistas.',
      blogLabel: 'Revista AspireHub',
      blogTitle: 'Blog y Artículos Educativos',
      blogSubtitle:
        'Orientación práctica sobre ensayos de becas, trabajo freelance durante los estudios y habilidades digitales.',
      aboutLabel: 'Sobre AspireHub',
      aboutTitle: 'Orientación accesible para estudiantes, graduados y principiantes',
      aboutSubtitle:
        'Un espacio confiable para descubrir becas, aprender habilidades digitales y usar la IA con criterio.',
      contactLabel: 'Confianza y Correcciones',
      contactTitle: 'Contactar con AspireHub',
      contactSubtitle:
        'Ayúdanos a mantener actualizados los plazos de becas, enlaces oficiales y guías educativas.',
      privacyLabel: 'Confianza y Legal',
      privacyTitle: 'Política de Privacidad',
      privacySubtitle:
        'Explicación clara sobre qué datos permanecen en tu navegador y cómo funcionan las consultas del asesor IA.',
      disclaimerLabel: 'Confianza y Legal',
      disclaimerTitle: 'Aviso Legal y Verificación',
      disclaimerSubtitle:
        'AspireHub ofrece guías educativas. Verifica siempre fechas límite, tasas y requisitos directamente en los portales oficiales.',
      notFoundTitle: 'No pudimos encontrar esa página',
      notFoundDesc:
        'El enlace puede haberse movido o no existir. Explora nuestros directorios principales abajo.',
    },
    advisor: {
      launcher: 'Asesor IA de Carrera',
      title: 'Asesor IA AspireHub',
      roleGeneral: 'General',
      roleScholarship: 'Becas',
      roleFreelance: 'Carreras',
      roleAiTools: 'Herramientas IA',
      detailLabel: 'Nivel de detalle',
      speedFast: 'Breve',
      speedBalanced: 'Equilibrado',
      speedDeep: 'Detallado',
      welcomeTitle: 'Asistente IA de Carrera y Estudio',
      welcomeDesc:
        'Pregunta sobre rutas profesionales, habilidades, estructura de cartas SOP o herramientas IA sin datos inventados.',
      tryAsking: 'Prueba preguntar',
      placeholder: 'Pide consejos sobre carrera, becas o IA...',
      disclaimer: 'Verifica plazos de becas y precios en los portales oficiales.',
      drafting: 'Redactando respuesta...',
      retry: 'Reintentar',
    },
    getStarted: {
      kicker: 'Elige Tu Ruta',
      title: '¿Por dónde te gustaría empezar hoy?',
      path1Title: 'Buscar y Seguir Becas',
      path1Desc: 'Filtra convocatorias internacionales y lleva seguimiento de etapas y fechas.',
      path2Title: 'Iniciar Freelancing y Empleo Remoto',
      path2Desc: 'Explora guías para trabajo remoto, pasantías, Fiverr, Upwork y portafolio.',
      path3Title: 'Explorar y Comparar Herramientas IA',
      path3Desc: 'Compara opciones gratuitas y freemium lado a lado para estudio y código.',
      path4Title: 'Abrir Kit Interactivo de Carrera',
      path4Desc: 'Completa la lista de becas, test vocacional, consejos de CV y evaluación.',
      advisorTitle: 'Chatear con el Asesor IA AspireHub',
      advisorDesc: 'Explora carreras recomendadas y rutas de aprendizaje personalizadas.',
    },
    newsletter: {
      kicker: 'Resumen Semanal',
      title: 'Recibe guías de becas, trabajo remoto y herramientas IA verificadas.',
      subtitle: 'Notas prácticas una vez por semana—sin spam ni enlaces engañosos.',
      placeholder: 'tu@universidad.edu',
      subscribe: 'Suscribirse',
      saving: 'Guardando...',
    },
    footer: {
      tagline:
        'Facilitando becas internacionales verificadas, guías de trabajo remoto, certificaciones gratuitas y herramientas interactivas en todo el mundo.',
      scholarshipsHeading: 'Becas',
      careersHeading: 'Carreras, Kit e IA',
      trustHeading: 'Confianza y Legal',
      aboutLink: 'Sobre Nosotros',
      contactLink: 'Contacto y Correcciones',
      privacyLink: 'Política de Privacidad',
      disclaimerLink: 'Aviso Legal',
      toolkitLink: 'Kit Interactivo',
      blogLink: 'Blog Editorial',
      languageLabel: 'Idioma de Interfaz',
      copyright: 'AspireHub. Creado para estudiantes, profesionales remotos y aprendices globales.',
      verificationNote: 'Enlaces oficiales verificados · Confirma siempre las fechas vigentes.',
    },
    auth: {
      signIn: 'Iniciar sesión',
      signUp: 'Crear cuenta',
      signOut: 'Cerrar sesión',
      account: 'Cuenta',
      welcomeBack: 'Bienvenido de nuevo a AspireHub',
      createAccountTitle: 'Crea tu cuenta de AspireHub',
      authSubtitle: 'Guarda tu perfil, seguimiento de becas y marcadores en un solo lugar.',
      fullNameLabel: 'Nombre completo',
      emailLabel: 'Correo electrónico',
      passwordLabel: 'Contraseña',
      passwordHint: 'Al menos 8 caracteres',
      countryLabel: 'País / Región',
      focusGoalLabel: 'Objetivo principal',
      bioLabel: 'Breve biografía / Meta académica o profesional',
      saveProfile: 'Guardar perfil',
      profileSaved: 'Perfil actualizado.',
      dashboardTitle: 'Tu cuenta de AspireHub',
      dashboardSubtitle: 'Administra tu perfil de aprendizaje y tus oportunidades guardadas.',
      savedOverview: 'Elementos guardados y seguimiento',
      openBookmarks: 'Abrir marcadores y seguimiento',
      noAccountPrompt: '¿Nuevo en AspireHub?',
      haveAccountPrompt: '¿Ya tienes una cuenta?',
      submitting: 'Procesando...',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      scholarships: 'Bourses',
      freelancing: 'Carrière & Freelance',
      aiTools: 'Outils IA',
      resources: 'Ressources',
      toolkit: 'Boîte à outils',
      blog: 'Blog',
      about: 'À propos',
      contact: 'Contact',
      getStarted: 'Commencer',
      searchPlaceholder: 'Rechercher des bourses, guides carrière, outils IA ou cours...',
      themeLight: 'Passer au mode clair',
      themeDark: 'Passer au mode sombre',
    },
    common: {
      all: 'Tout',
      viewDetails: 'Voir les détails',
      officialLink: 'Lien officiel',
      readMore: 'Lire la suite',
      visitTool: 'Visiter le site',
      compare: 'Comparer',
      selected: 'Sélectionné',
      readFullGuide: 'Lire le guide complet',
      readArticle: 'Lire l’article',
      updated: 'Mis à jour',
      expired: 'Expirée',
      officialPortal: 'Portail officiel',
      sampleData: 'Exemple',
      verifiedTool: 'Outil vérifié',
      sampleListing: 'Exemple',
      save: 'Enregistrer',
      saved: 'Enregistré',
      savedToBookmarks: 'Ajouté aux favoris',
      removedFromBookmarks: 'Retiré des favoris',
      copy: 'Copier',
      copied: 'Copié',
      tryAgain: 'Réessayer',
      unableToLoad: 'Impossible de charger les données',
      backToHome: 'Retour à l’accueil',
      resetFilters: 'Réinitialiser les filtres',
      explore: 'Explorer',
    },
    hero: {
      kicker: 'Bourses Mondiales · Carrières à Distance · Outils IA · Outils Interactifs',
      title: 'Explorez les Opportunités. Apprenez. Construisez Votre Avenir.',
      subtitle:
        'Découvrez des bourses internationales vérifiées, suivez vos échéances, maîtrisez le freelancing et le travail à distance, comparez les outils IA et testez votre préparation.',
      primaryCta: 'Explorer les Bourses',
      secondaryCta: 'Découvrir les Outils IA',
      statAwards: 'Bourses Sélectionnées',
      statGuides: 'Guides Complets',
      statTools: 'Outils IA Référencés',
    },
    sections: {
      pillarsKicker: 'Piliers Mondiaux',
      pillarsTitle: 'Tout pour passer de l’apprentissage à la réussite professionnelle',
      pillar1Title: 'Hub Mondial des Bourses',
      pillar1Desc:
        'Filtrez les bourses internationales par pays, diplôme et discipline avec liens officiels et suivi.',
      pillar1Cta: 'Parcourir les Bourses',
      pillar2Title: 'Hub Carrière & Freelance',
      pillar2Desc:
        'Explorez les emplois à distance, stages internationaux, feuilles de route et guides Fiverr/Upwork.',
      pillar2Cta: 'Lire les Guides Carrière',
      pillar3Title: 'Annuaire des Outils IA',
      pillar3Desc:
        'Comparez les outils IA gratuits, freemium et payants pour étudier, coder, rédiger et chercher.',
      pillar3Cta: 'Explorer les Outils IA',
      scholarshipHubKicker: 'Hub des Bourses',
      featuredScholarships: 'Bourses Internationales à la Une',
      scholarshipHubDesc:
        'Portails officiels vérifiés au Royaume-Uni, aux États-Unis, en Europe, au Japon, en Australie et au Pakistan.',
      viewAllScholarships: 'Voir Toutes les Bourses',
      popularGuidesKicker: 'Compétences & Travail à Distance',
      popularGuides: 'Hub Carrière & Freelance',
      popularGuidesDesc:
        'Guides pratiques sur les emplois à distance, stages, Fiverr, Upwork, portfolios et premiers clients.',
      allGuides: 'Tous les Guides',
      aiDirKicker: 'Annuaire IA',
      trendingTools: 'Outils IA Tendances',
      aiDirDesc: 'Outils pratiques pour les études, le développement et la recherche documentaire.',
      exploreTools: 'Comparer les Outils IA',
      toolkitKicker: 'Laboratoire Interactif',
      toolkitTitle: 'Évaluez votre dossier, trouvez votre voie et créez des points CV ATS',
      toolkitDesc:
        'Quatre outils interactifs gratuits : liste d’éligibilité aux bourses, quiz carrière, générateur de réalisations CV et test de compétences.',
      openToolkit: 'Ouvrir la Boîte à outils',
      whyKicker: 'Pourquoi AspireHub ?',
      whyTitle: 'Clarté et sources officielles vérifiées',
      whyDesc:
        'Les étudiants méritent des guides complets sur place, des liens officiels exacts et un signalement transparent des cycles expirés.',
      whyMissionCta: 'Lire notre mission',
      whyCard1Title: 'Guides Complets sur Place',
      whyCard1Desc:
        'Consultez les plans d’études, l’aide financière aux certifications et les guides d’entretien directement ici.',
      whyCard2Title: 'Parcours Mondiaux Études & Carrière',
      whyCard2Desc:
        'Feuilles de route claires couvrant bourses internationales, télétravail, stages et freelancing.',
      whyCard3Title: 'Comparaison Côte à Côte',
      whyCard3Desc:
        'Comparez les offres gratuites et les points forts des outils IA avant de choisir votre stack.',
      whyCard4Title: 'Suivi Privé des Échéances',
      whyCard4Desc:
        'Enregistrez vos bourses, suivez l’état d’avancement et définissez des rappels dans votre navigateur.',
      resourcesKicker: 'Guides Gratuits',
      resourcesTitle: 'Cours Gratuits, Certifications & Modèles de CV',
      browseResources: 'Parcourir les Ressources',
      blogKicker: 'Journal AspireHub',
      latestArticles: 'Derniers Articles Éducatifs',
      readAllArticles: 'Lire Tous les Articles',
      crossLinksHeading: 'Prochaines Étapes Recommandées sur AspireHub',
      crossLinksSubheading: 'Poursuivez avec nos guides, modèles et outils interactifs associés.',
    },
    filters: {
      searchLabel: 'Rechercher',
      countryLabel: 'Pays / Région',
      degreeLabel: 'Niveau d’Études',
      subjectLabel: 'Domaine / Sujet',
      fundingLabel: 'Financement',
      statusLabel: 'Statut',
      pricingLabel: 'Tarification',
      levelLabel: 'Niveau',
      internationalOnly: 'Spécial Étudiants Internationaux',
      reset: 'Réinitialiser',
      allDegrees: 'Tous les niveaux',
      allSubjects: 'Tous les domaines',
      allPricing: 'Tous les tarifs',
      allStatuses: 'Tous les statuts',
      allLevels: 'Tous les niveaux',
    },
    search: {
      dialogLabel: 'Recherche Intelligente AspireHub',
      placeholder: 'Rechercher bourses, emplois à distance, outils IA, cours ou outils...',
      allTab: 'Tout',
      scholarshipsTab: 'Bourses',
      careerTab: 'Carrière & Freelance',
      aiToolsTab: 'Outils IA',
      resourcesTab: 'Cours & CV',
      blogTab: 'Blog',
      toolkitTab: 'Boîte à outils',
      recentTitle: 'Recherches Récentes',
      clearRecent: 'Effacer',
      suggestionsTitle: 'Sujets Suggérés',
      shortcutsTitle: 'Accès Rapides',
      noResults: 'Aucun résultat pour',
      noResultsHint: 'Essayez des termes plus larges comme "UK", "remote", "Fiverr", "code" ou "CV".',
      resultsCount: 'résultats vérifiés',
    },
    tracker: {
      drawerTitle: 'Favoris & Suivi des Bourses',
      savedSingular: 'élément',
      savedPlural: 'éléments',
      savedInBrowser: 'enregistrés dans votre navigateur',
      allTab: 'Tout',
      scholarshipsTab: 'Suivi Bourses',
      otherTab: 'Carrière & Outils',
      upcomingAlertTitle: 'Rappels Proches ou Échus',
      emptyTitle: 'Aucun élément enregistré',
      emptyDesc:
        'Ajoutez une bourse pour suivre ses étapes et rappels, ou sauvegardez des guides carrière, outils IA et cours.',
      stageLabel: 'Étape',
      reminderLabel: 'Date de rappel',
      notesLabel: 'Notes',
      notesPlaceholder: 'Avancement lettre, IELTS, références...',
      clearAll: 'Tout effacer',
      browseOpportunities: 'Voir les Bourses',
      stageResearching: 'En recherche',
      stagePreparing: 'Préparation dossier',
      stageSubmitted: 'Soumise',
      stageShortlisted: 'Présélectionné',
    },
    toolkit: {
      sectionLabel: 'Laboratoire Interactif de Préparation',
      title: 'Boîte à Outils Étudiant & Carrière',
      subtitle:
        'Vérifiez votre éligibilité aux bourses, explorez votre voie professionnelle, générez des points CV ATS et testez vos compétences.',
      breadcrumb: 'Boîte à outils',
      tabEligibility: 'Liste Bourses',
      tabCareerQuiz: 'Quiz Carrière',
      tabCvTips: 'Conseils CV ATS',
      tabSkillQuiz: 'Test de Compétences',
      eligibilityTitle: 'Liste de Contrôle d’Éligibilité aux Bourses',
      eligibilityDesc:
        'Cochez vos étapes clés selon votre niveau d’études. Votre progression reste enregistrée localement.',
      degreeSelectLabel: 'Niveau d’Études Visé',
      readinessScore: 'Score de Préparation',
      resetChecklist: 'Réinitialiser',
      careerQuizTitle: 'Quiz d’Orientation Carrière & Freelance',
      careerQuizDesc:
        'Répondez à 6 questions rapides pour identifier votre parcours idéal et les guides AspireHub adaptés.',
      seeCareerResult: 'Voir le Parcours Recommandé',
      retakeQuiz: 'Refaire le Quiz',
      cvTipsTitle: 'Générateur de Points CV ATS & CV Académique',
      cvTipsDesc:
        'Sélectionnez votre filière pour générer des exemples concrets à adapter avec vos propres résultats.',
      copyBullets: 'Copier les Modèles',
      skillQuizTitle: 'Évaluation Pratique des Compétences',
      skillQuizDesc:
        'Testez vos connaissances en Web/IA, Freelancing ou Dossiers Académiques avec explications immédiates.',
      checkSkillScore: 'Évaluer mes Réponses',
    },
    pages: {
      scholarshipsLabel: 'Moteur de Recherche de Bourses',
      scholarshipsTitle: 'Hub des Bourses',
      scholarshipsSubtitle:
        'Filtrez les bourses internationales et locales par pays, niveau et discipline, avec exemples identifiés et archives expirées.',
      freelancingLabel: 'Guides Compétences & Télétravail',
      freelancingTitle: 'Hub Carrière & Freelance',
      freelancingSubtitle:
        'Guides accessibles pour trouver un emploi à distance, décrocher un stage, débuter sur Fiverr/Upwork et fixer ses tarifs.',
      aiToolsLabel: 'Annuaire Productivité IA',
      aiToolsTitle: 'Annuaire des Outils IA',
      aiToolsSubtitle:
        'Découvrez et comparez Grok, DeepSeek, Lovable, Replit, ChatGPT et Claude pour vos études et projets.',
      compareLabel: 'Comparaison Détaillée',
      compareTitle: 'Comparer les Outils IA',
      compareSubtitle:
        'Comparez jusqu’à 3 outils IA selon les tarifs, offres gratuites, forces clés, plateformes et limites.',
      resourcesLabel: 'Apprentissage, Certifications & Étudiants Internationaux',
      resourcesTitle: 'Ressources d’Apprentissage',
      resourcesSubtitle:
        'Programmes de cours gratuits, aide financière pour certifications, modèles de CV ATS et guides d’entretien.',
      blogLabel: 'Journal AspireHub',
      blogTitle: 'Blog & Articles Éducatifs',
      blogSubtitle:
        'Conseils pratiques sur les lettres de motivation, le freelancing étudiant et les compétences numériques.',
      aboutLabel: 'À propos d’AspireHub',
      aboutTitle: 'Une orientation claire pour étudiants, diplômés et débutants',
      aboutSubtitle:
        'Rendre accessibles les bourses vérifiées, les compétences numériques et les usages responsables de l’IA.',
      contactLabel: 'Confiance & Corrections',
      contactTitle: 'Contacter AspireHub',
      contactSubtitle:
        'Aidez-nous à maintenir l’exactitude des dates de bourses, liens officiels et guides de formation.',
      privacyLabel: 'Confiance & Légal',
      privacyTitle: 'Politique de Confidentialité',
      privacySubtitle:
        'Explication transparente du stockage local dans votre navigateur et du fonctionnement de l’assistant IA.',
      disclaimerLabel: 'Confiance & Légal',
      disclaimerTitle: 'Avertissement & Vérification',
      disclaimerSubtitle:
        'AspireHub publie des guides éducatifs. Vérifiez toujours les dates et critères sur les portails officiels.',
      notFoundTitle: 'Page introuvable',
      notFoundDesc:
        'Le lien suivi n’existe plus ou a été déplacé. Explorez nos rubriques principales ci-dessous.',
    },
    advisor: {
      launcher: 'Conseiller IA Carrière',
      title: 'Conseiller IA AspireHub',
      roleGeneral: 'Général',
      roleScholarship: 'Bourses',
      roleFreelance: 'Carrière',
      roleAiTools: 'Outils IA',
      detailLabel: 'Détail de réponse',
      speedFast: 'Rapide',
      speedBalanced: 'Équilibré',
      speedDeep: 'Détaillé',
      welcomeTitle: 'Assistant IA Carrière & Études',
      welcomeDesc:
        'Demandez des conseils sur les débouchés, plans d’apprentissage, lettres SOP ou outils IA sans informations inventées.',
      tryAsking: 'Exemples de questions',
      placeholder: 'Posez une question carrière, bourse ou IA...',
      disclaimer: 'Vérifiez toujours les dates et tarifs sur les portails officiels.',
      drafting: 'Rédaction en cours...',
      retry: 'Réessayer',
    },
    getStarted: {
      kicker: 'Choisissez Votre Voie',
      title: 'Par où souhaitez-vous commencer aujourd’hui ?',
      path1Title: 'Trouver & Suivre des Bourses',
      path1Desc: 'Filtrez les bourses mondiales et suivez vos étapes et rappels d’échéance.',
      path2Title: 'Démarrer en Freelance & Télétravail',
      path2Desc: 'Consultez nos guides sur les emplois à distance, stages, Fiverr et Upwork.',
      path3Title: 'Explorer & Comparer les Outils IA',
      path3Desc: 'Comparez les meilleurs outils gratuits et freemium côte à côte.',
      path4Title: 'Ouvrir la Boîte à Outils Interactive',
      path4Desc: 'Utilisez la checklist bourses, le quiz carrière, les conseils CV et l’évaluation.',
      advisorTitle: 'Discuter avec le Conseiller IA',
      advisorDesc: 'Explorez des carrières adaptées et des plans d’études personnalisés.',
    },
    newsletter: {
      kicker: 'Bulletin Hebdomadaire',
      title: 'Recevez nos guides de bourses, conseils freelance et outils IA vérifiés.',
      subtitle: 'Des conseils concrets une fois par semaine—sans spam ni fausses dates.',
      placeholder: 'vous@universite.edu',
      subscribe: 'S’abonner',
      saving: 'Enregistrement...',
    },
    footer: {
      tagline:
        'Rendre accessibles les bourses d’études vérifiées, les guides de carrière à distance, les outils interactifs et les ressources gratuites.',
      scholarshipsHeading: 'Bourses',
      careersHeading: 'Carrières, Outils & IA',
      trustHeading: 'Confiance & Légal',
      aboutLink: 'À propos',
      contactLink: 'Contact & Corrections',
      privacyLink: 'Confidentialité',
      disclaimerLink: 'Avertissement',
      toolkitLink: 'Boîte à outils',
      blogLink: 'Blog Éditorial',
      languageLabel: 'Langue de l’interface',
      copyright: 'AspireHub. Conçu pour les étudiants, freelances et apprenants du monde entier.',
      verificationNote: 'Liens officiels vérifiés · Confirmez toujours les dates sur les sites hôtes.',
    },
    auth: {
      signIn: 'Connexion',
      signUp: 'Créer un compte',
      signOut: 'Déconnexion',
      account: 'Compte',
      welcomeBack: 'Bon retour sur AspireHub',
      createAccountTitle: 'Créez votre compte AspireHub',
      authSubtitle: 'Enregistrez votre profil, suivi des bourses et favoris au même endroit.',
      fullNameLabel: 'Nom complet',
      emailLabel: 'Adresse e-mail',
      passwordLabel: 'Mot de passe',
      passwordHint: 'Au moins 8 caractères',
      countryLabel: 'Pays / Région',
      focusGoalLabel: 'Objectif principal',
      bioLabel: 'Courte bio / Objectif d’étude ou de carrière',
      saveProfile: 'Enregistrer le profil',
      profileSaved: 'Profil mis à jour.',
      dashboardTitle: 'Votre compte AspireHub',
      dashboardSubtitle: 'Gérez votre profil et vos opportunités enregistrées.',
      savedOverview: 'Favoris et suivi',
      openBookmarks: 'Ouvrir les favoris et le suivi',
      noAccountPrompt: 'Nouveau sur AspireHub ?',
      haveAccountPrompt: 'Vous avez déjà un compte ?',
      submitting: 'Veuillez patienter...',
    },
  },

  ur: {
    nav: {
      home: 'ہوم',
      scholarships: 'اسکالرشپس',
      freelancing: 'کیریئر اور فری لانسنگ',
      aiTools: 'اے آئی ٹولز',
      resources: 'مفت وسائل',
      toolkit: 'ٹول کٹ',
      blog: 'بلاگ',
      about: 'ہمارے بارے میں',
      contact: 'رابطہ',
      getStarted: 'آغاز کریں',
      searchPlaceholder: 'اسکالرشپس، ریموٹ جابز، اے آئی ٹولز یا کورسز تلاش کریں...',
      themeLight: 'لائٹ موڈ آن کریں',
      themeDark: 'ڈارک موڈ آن کریں',
    },
    common: {
      all: 'تمام',
      viewDetails: 'تفصیلات دیکھیں',
      officialLink: 'آفیشل لنک',
      readMore: 'مزید پڑھیں',
      visitTool: 'ویب سائٹ دیکھیں',
      compare: 'موازنہ کریں',
      selected: 'منتخب شدہ',
      readFullGuide: 'مکمل گائیڈ پڑھیں',
      readArticle: 'مضمون پڑھیں',
      updated: 'اپ ڈیٹ',
      expired: 'ختم شدہ',
      officialPortal: 'آفیشل پورٹل',
      sampleData: 'نمونہ ڈیٹا',
      verifiedTool: 'مستند ٹول',
      sampleListing: 'نمونہ فہرست',
      save: 'محفوظ کریں',
      saved: 'محفوظ شدہ',
      savedToBookmarks: 'بک مارکس میں محفوظ ہو گیا',
      removedFromBookmarks: 'بک مارکس سے ہٹا دیا گیا',
      copy: 'کاپی کریں',
      copied: 'کاپی ہو گیا',
      tryAgain: 'دوبارہ کوشش کریں',
      unableToLoad: 'ڈیٹا لوڈ نہیں ہو سکا',
      backToHome: 'ہوم پر واپس جائیں',
      resetFilters: 'فلٹرز صاف کریں',
      explore: 'دیکھیں',
    },
    hero: {
      kicker: 'عالمی اسکالرشپس · ریموٹ کیریئر · اے آئی ٹولز · انٹرایکٹو ٹول کٹ',
      title: 'مواقع تلاش کریں۔ مہارت سیکھیں۔ اپنا مستقبل بنائیں۔',
      subtitle:
        'مستند بین الاقوامی اسکالرشپس دریافت کریں، ڈیڈلائنز ٹریک کریں، فری لانسنگ اور ریموٹ کام سیکھیں، اے آئی ٹولز کا موازنہ کریں اور انٹرایکٹو ٹولز سے تیاری کریں۔',
      primaryCta: 'اسکالرشپس دیکھیں',
      secondaryCta: 'اے آئی ٹولز دیکھیں',
      statAwards: 'منتخب اسکالرشپس',
      statGuides: 'مکمل تعلیمی گائیڈز',
      statTools: 'اے آئی ٹولز',
    },
    sections: {
      pillarsKicker: 'تعلیم اور کیریئر کے بنیادی ستون',
      pillarsTitle: 'سیکھنے سے کمانے تک کا ہر ضروری مرحلہ',
      pillar1Title: 'عالمی اسکالرشپ ہب',
      pillar1Desc:
        'ملک، ڈگری اور مضمون کے مطابق مستند اسکالرشپس تلاش کریں اور آفیشل لنکس کے ساتھ ڈیڈلائن ٹریک کریں۔',
      pillar1Cta: 'اسکالرشپس دیکھیں',
      pillar2Title: 'فری لانسنگ اور کیریئر ہب',
      pillar2Desc:
        'ریموٹ جابز، انٹرن شپس، اسکل روڈ میپس، فائیور اور اپ ورک گائیڈز سے عملی شروعات کریں۔',
      pillar2Cta: 'کیریئر گائیڈز پڑھیں',
      pillar3Title: 'اے آئی ٹولز ڈائریکٹری',
      pillar3Desc:
        'تعلیم، کوڈنگ، تحریر اور تحقیق کے لیے مفت اور فریمیم اے آئی ٹولز کا براہِ راست موازنہ کریں۔',
      pillar3Cta: 'اے آئی ٹولز دیکھیں',
      scholarshipHubKicker: 'اسکالرشپ ہب',
      featuredScholarships: 'نمایاں عالمی اسکالرشپس',
      scholarshipHubDesc:
        'برطانیہ، امریکہ، یورپ، جاپان، آسٹریلیا اور پاکستان کے مستند آفیشل اسکالرشپ پورٹلز۔',
      viewAllScholarships: 'تمام اسکالرشپس دیکھیں',
      popularGuidesKicker: 'مہارت، ریموٹ کام اور آمدنی گائیڈز',
      popularGuides: 'فری لانسنگ اور ریموٹ کیریئر ہب',
      popularGuidesDesc:
        'ریموٹ جابز، انٹرن شپس، فائیور، اپ ورک، پورٹ فولیو اور پہلے کلائنٹ کے حصول کی مکمل رہنمائی۔',
      allGuides: 'تمام کیریئر گائیڈز',
      aiDirKicker: 'اے آئی ڈائریکٹری',
      trendingTools: 'مقبول اے آئی ٹولز',
      aiDirDesc: 'مطالعے، پروگرامنگ اور تحقیق کے لیے عملی اے آئی ٹولز۔',
      exploreTools: 'ٹولز دیکھیں اور موازنہ کریں',
      toolkitKicker: 'انٹرایکٹو اسٹوڈنٹ اور کیریئر لیب',
      toolkitTitle: 'اپنی اہلیت چیک کریں، کیریئر ٹریک منتخب کریں اور سی وی بہتر بنائیں',
      toolkitDesc:
        'چار عملی ٹولز: اسکالرشپ اہلیت چیک لسٹ، کیریئر کوئز، سی وی بلٹس جنریٹر اور اسکل اسسمنٹ کوئز۔',
      openToolkit: 'انٹرایکٹو ٹول کٹ کھولیں',
      whyKicker: 'AspireHub ہی کیوں؟',
      whyTitle: 'مستند ذرائع اور واضح رہنمائی',
      whyDesc:
        'دنیا بھر کے طلبہ کے لیے مکمل آن سائٹ گائیڈز، درست آفیشل لنکس اور ختم شدہ مواقع کی واضح نشاندہی۔',
      whyMissionCta: 'ہمارا مشن پڑھیں',
      whyCard1Title: 'مکمل آن سائٹ گائیڈز',
      whyCard1Desc:
        'اسٹڈی پلانز، سرٹیفیکیشن فنانشل ایڈ اور انٹرویو ہینڈ بکس براہِ راست ویب سائٹ پر پڑھیں۔',
      whyCard2Title: 'عالمی کیریئر اور اسٹڈی روڈ میپس',
      whyCard2Desc:
        'بین الاقوامی اسکالرشپس، ریموٹ جابز، انٹرن شپس اور فری لانسنگ کے منظم مراحل۔',
      whyCard3Title: 'ٹولز کا براہِ راست موازنہ',
      whyCard3Desc:
        'وقت یا پیسہ لگانے سے پہلے اے آئی ٹولز کے مفت فیچرز اور حدود کا موازنہ کریں۔',
      whyCard4Title: 'ڈیڈلائن اور بک مارک ٹریکنگ',
      whyCard4Desc:
        'اسکالرشپس محفوظ کریں، تیاری کے مراحل اپ ڈیٹ کریں اور اپنے براؤزر میں ریمائنڈرز سیٹ کریں۔',
      resourcesKicker: 'مفت تعلیمی گائیڈز',
      resourcesTitle: 'مفت کورسز، سرٹیفیکیشنز اور سی وی ٹیمپلیٹس',
      browseResources: 'تمام مفت گائیڈز دیکھیں',
      blogKicker: 'ایسپائر ہب جرنل',
      latestArticles: 'تازہ ترین تعلیمی مضامین',
      readAllArticles: 'تمام مضامین پڑھیں',
      crossLinksHeading: 'AspireHub پر اگلے مفید مراحل',
      crossLinksSubheading: 'متعلقہ گائیڈز، ٹیمپلیٹس اور انٹرایکٹو ٹولز کے ساتھ تیاری جاری رکھیں۔',
    },
    filters: {
      searchLabel: 'تلاش کریں',
      countryLabel: 'ملک / خطہ',
      degreeLabel: 'ڈگری کی سطح',
      subjectLabel: 'مضمون / شعبہ',
      fundingLabel: 'فنڈنگ کی قسم',
      statusLabel: 'درخواست کی صورتحال',
      pricingLabel: 'قیمت کا فلٹر',
      levelLabel: 'تجربے کی سطح',
      internationalOnly: 'بین الاقوامی طلبہ کے لیے',
      reset: 'فلٹرز صاف کریں',
      allDegrees: 'تمام ڈگریاں',
      allSubjects: 'تمام مضامین',
      allPricing: 'تمام اقسام',
      allStatuses: 'تمام اسٹیٹس',
      allLevels: 'تمام لیولز',
    },
    search: {
      dialogLabel: 'AspireHub اسمارٹ سرچ',
      placeholder: 'اسکالرشپس، ریموٹ جابز، اے آئی ٹولز، کورسز یا ٹول کٹ تلاش کریں...',
      allTab: 'تمام',
      scholarshipsTab: 'اسکالرشپس',
      careerTab: 'کیریئر اور فری لانسنگ',
      aiToolsTab: 'اے آئی ٹولز',
      resourcesTab: 'کورسز اور سی وی',
      blogTab: 'بلاگ',
      toolkitTab: 'ٹول کٹ',
      recentTitle: 'حالیہ تلاش',
      clearRecent: 'صاف کریں',
      suggestionsTitle: 'تجویز کردہ موضوعات',
      shortcutsTitle: 'فوری لنکس',
      noResults: 'کوئی نتیجہ نہیں ملا برائے',
      noResultsHint: 'مختصر الفاظ آزمائیں مثلاً "UK"، "Fiverr"، "remote jobs"، یا "CV"۔',
      resultsCount: 'مستند نتائج',
    },
    tracker: {
      drawerTitle: 'محفوظ اشیاء اور اسکالرشپ ٹریکر',
      savedSingular: 'آئٹم',
      savedPlural: 'آئٹمز',
      savedInBrowser: 'آپ کے براؤزر میں محفوظ ہیں',
      allTab: 'تمام محفوظ',
      scholarshipsTab: 'اسکالرشپ ٹریکر',
      otherTab: 'کیریئر اور ٹولز',
      upcomingAlertTitle: 'قریبی یا واجب ریمائنڈرز',
      emptyTitle: 'ابھی کوئی آئٹم محفوظ نہیں',
      emptyDesc:
        'ڈیڈلائنز اور مراحل ٹریک کرنے کے لیے اسکالرشپس محفوظ کریں یا گائیڈز اور اے آئی ٹولز بک مارک کریں۔',
      stageLabel: 'مرحلہ',
      reminderLabel: 'ریمائنڈر کی تاریخ',
      notesLabel: 'ذاتی نوٹس',
      notesPlaceholder: 'ایس او پی، ریفرنس لیٹر یا ٹیسٹ اسکور...',
      clearAll: 'سب صاف کریں',
      browseOpportunities: 'اسکالرشپس دیکھیں',
      stageResearching: 'تحقیق جاری',
      stagePreparing: 'دستاویزات کی تیاری',
      stageSubmitted: 'درخواست جمع',
      stageShortlisted: 'شارٹ لسٹ',
    },
    toolkit: {
      sectionLabel: 'انٹرایکٹو تیاری اور کیریئر لیب',
      title: 'AspireHub اسٹوڈنٹ اور کیریئر ٹول کٹ',
      subtitle:
        'اسکالرشپ اہلیت چیک کریں، اپنی دلچسپی کے مطابق کیریئر چنیں، سی وی بلٹس بنائیں اور مہارت جانچیں۔',
      breadcrumb: 'انٹرایکٹو ٹول کٹ',
      tabEligibility: 'اسکالرشپ چیک لسٹ',
      tabCareerQuiz: 'کیریئر کوئز',
      tabCvTips: 'سی وی اور ریزیومے ٹپس',
      tabSkillQuiz: 'اسکل اسسمنٹ کوئز',
      eligibilityTitle: 'اسکالرشپ اہلیت اور تیاری چیک لسٹ',
      eligibilityDesc:
        'اپنی مطلوبہ ڈگری کے لیے ضروری مراحل پر نشان لگائیں۔ آپ کی پیش رفت براؤزر میں محفوظ رہتی ہے۔',
      degreeSelectLabel: 'مطلوبہ ڈگری کی سطح',
      readinessScore: 'تیاری کا اسکور',
      resetChecklist: 'چیک لسٹ ری سیٹ کریں',
      careerQuizTitle: 'کیریئر اور فری لانسنگ دلچسپی کوئز',
      careerQuizDesc:
        'اپنے رجحان کے مطابق بہترین کیریئر ٹریک اور متعلقہ گائیڈز جاننے کے لیے 6 مختصر سوالات کے جواب دیں۔',
      seeCareerResult: 'تجویز کردہ راستہ دیکھیں',
      retakeQuiz: 'دوبارہ کوئز دیں',
      cvTipsTitle: 'ATS ریزیومے اور اکیڈمک سی وی بلٹس جنریٹر',
      cvTipsDesc:
        'اپنا شعبہ اور تجربہ منتخب کریں اور اپنے حقیقی کام کے مطابق مؤثر سی وی بلٹس حاصل کریں۔',
      copyBullets: 'ٹیمپلیٹس کاپی کریں',
      skillQuizTitle: 'عملی مہارت کا جائزہ کوئز',
      skillQuizDesc:
        'ویب/اے آئی، فری لانسنگ یا اکیڈمک تیاری سے متعلق اپنی سمجھ بوجھ فوری وضاحت کے ساتھ چیک کریں۔',
      checkSkillScore: 'جوابات چیک کریں',
    },
    pages: {
      scholarshipsLabel: 'عالمی اسکالرشپ فائنڈر',
      scholarshipsTitle: 'اسکالرشپ ہب',
      scholarshipsSubtitle:
        'ملک، ڈگری اور مضمون کے مطابق بین الاقوامی و مقامی اسکالرشپس تلاش کریں۔ ختم شدہ مواقع واضح طور پر نشان زد ہیں۔',
      freelancingLabel: 'مہارت، ریموٹ کام اور کیریئر گائیڈز',
      freelancingTitle: 'فری لانسنگ اور کیریئر ہب',
      freelancingSubtitle:
        'ریموٹ جابز، عالمی انٹرن شپس، اسکل روڈ میپس، فائیور، اپ ورک اور پورٹ فولیو کی مکمل رہنمائی۔',
      aiToolsLabel: 'اے آئی پروڈکٹیوٹی ڈائریکٹری',
      aiToolsTitle: 'اے آئی ٹولز ڈائریکٹری',
      aiToolsSubtitle:
        'مطالعہ اور کوڈنگ کے لیے Grok، DeepSeek، Lovable، Replit، ChatGPT اور Claude کا جائزہ اور موازنہ کریں۔',
      compareLabel: 'براہِ راست موازنہ',
      compareTitle: 'اے آئی ٹولز کا موازنہ',
      compareSubtitle:
        'تین اے آئی ٹولز کی قیمت، مفت پلان، خصوصیات اور حدود کا ایک ساتھ موازنہ کریں۔',
      resourcesLabel: 'مفت کورسز، سرٹیفیکیشنز اور انٹرنیشنل اسٹوڈنٹ گائیڈز',
      resourcesTitle: 'مفت تعلیمی وسائل',
      resourcesSubtitle:
        'مکمل اسٹڈی پلانز، سرٹیفیکیشن فنانشل ایڈ گائیڈز، سی وی ٹیمپلیٹس اور انٹرویو کی تیاری۔',
      blogLabel: 'ایسپائر ہب جرنل',
      blogTitle: 'بلاگ اور تعلیمی مضامین',
      blogSubtitle:
        'اسکالرشپ مضامین، تعلیم کے ساتھ فری لانسنگ اور ڈیجیٹل مہارتوں پر عملی تحریریں۔',
      aboutLabel: 'AspireHub کے بارے میں',
      aboutTitle: 'طلبہ اور نئے سیکھنے والوں کے لیے مستند رہنمائی',
      aboutSubtitle:
        'اسکالرشپس، عملی ڈیجیٹل مہارتیں اور اے آئی کا ذمہ دارانہ استعمال سب کے لیے آسان بنانا۔',
      contactLabel: 'اعتماد اور تصحیح',
      contactTitle: 'AspireHub سے رابطہ کریں',
      contactSubtitle:
        'اسکالرشپ ڈیڈلائنز، آفیشل لنکس اور تعلیمی گائیڈز کو درست رکھنے میں ہماری مدد کریں۔',
      privacyLabel: 'اعتماد اور قانونی معلومات',
      privacyTitle: 'رازداری کی پالیسی',
      privacySubtitle:
        'آپ کے براؤزر میں محفوظ ڈیٹا اور اے آئی ایڈوائزر کے طریقہ کار کی واضح وضاحت۔',
      disclaimerLabel: 'اعتماد اور قانونی معلومات',
      disclaimerTitle: 'دستبرداری اور تصدیقی پالیسی',
      disclaimerSubtitle:
        'درخواست دینے سے پہلے ہمیشہ متعلقہ ادارے کے آفیشل پورٹل پر تازہ ترین تاریخوں کی تصدیق کریں۔',
      notFoundTitle: 'مطلوبہ صفحہ نہیں ملا',
      notFoundDesc:
        'یہ لنک تبدیل ہو چکا ہے یا موجود نہیں ہے۔ نیچے دیے گئے اہم شعبے ملاحظہ کریں۔',
    },
    advisor: {
      launcher: 'اے آئی کیریئر ایڈوائزر',
      title: 'AspireHub اے آئی ایڈوائزر',
      roleGeneral: 'عمومی',
      roleScholarship: 'اسکالرشپس',
      roleFreelance: 'کیریئر',
      roleAiTools: 'اے آئی ٹولز',
      detailLabel: 'جواب کی تفصیل',
      speedFast: 'مختصر',
      speedBalanced: 'متوازن',
      speedDeep: 'تفصیلی',
      welcomeTitle: 'اے آئی کیریئر اور اسٹڈی اسسٹنٹ',
      welcomeDesc:
        'موزوں کیریئر، اسکل روڈ میپ، SOP خاکہ یا اے آئی ٹولز کے بارے میں پوچھیں۔ ہم صرف مستند گائیڈز تجویز کرتے ہیں۔',
      tryAsking: 'یہ سوال پوچھیں',
      placeholder: 'کیریئر، اسکالرشپ یا اے آئی کے بارے میں پوچھیں...',
      disclaimer: 'آفیشل ویب سائٹس پر لائیو ڈیڈلائنز اور قیمتوں کی تصدیق ضرور کریں۔',
      drafting: 'جواب تیار ہو رہا ہے...',
      retry: 'دوبارہ بھیجیں',
    },
    getStarted: {
      kicker: 'اپنا راستہ منتخب کریں',
      title: 'آج آپ کہاں سے آغاز کرنا چاہیں گے؟',
      path1Title: 'اسکالرشپس تلاش اور ٹریک کریں',
      path1Desc: 'بین الاقوامی مواقع فلٹر کریں اور درخواست کے مراحل و ریمائنڈر محفوظ کریں۔',
      path2Title: 'فری لانسنگ اور ریموٹ کیریئر شروع کریں',
      path2Desc: 'ریموٹ جابز، انٹرن شپس، فائیور، اپ ورک اور پورٹ فولیو گائیڈز پڑھیں۔',
      path3Title: 'اے آئی ٹولز دیکھیں اور موازنہ کریں',
      path3Desc: 'مفت اور فریمیم اے آئی ٹولز کا ساتھ ساتھ موازنہ کریں۔',
      path4Title: 'انٹرایکٹو اسٹوڈنٹ ٹول کٹ کھولیں',
      path4Desc: 'اہلیت چیک لسٹ، کیریئر کوئز، سی وی ٹپس اور اسکل ٹیسٹ استعمال کریں۔',
      advisorTitle: 'AspireHub اے آئی ایڈوائزر سے بات کریں',
      advisorDesc: 'موزوں کیریئر، سیکھنے کے راستے اور SOP ڈھانچے پر رہنمائی حاصل کریں۔',
    },
    newsletter: {
      kicker: 'ہفتہ وار تعلیمی خلاصہ',
      title: 'اسکالرشپ گائیڈز، فری لانسنگ اور مستند اے آئی ٹولز سے باخبر رہیں۔',
      subtitle: 'ہفتے میں ایک بار عملی مشورے—بغیر اسپام یا جعلی خبروں کے۔',
      placeholder: 'you@university.edu',
      subscribe: 'سبسکرائب کریں',
      saving: 'محفوظ ہو رہا ہے...',
    },
    footer: {
      tagline:
        'دنیا بھر کے طلبہ اور نئے سیکھنے والوں کے لیے مستند اسکالرشپس، ریموٹ کیریئر گائیڈز، ٹول کٹ اور مفت کورسز تک آسان رسائی۔',
      scholarshipsHeading: 'اسکالرشپس',
      careersHeading: 'کیریئر، ٹول کٹ اور اے آئی',
      trustHeading: 'اعتماد اور قانونی معلومات',
      aboutLink: 'ہمارے بارے میں',
      contactLink: 'رابطہ کریں',
      privacyLink: 'رازداری کی پالیسی',
      disclaimerLink: 'دستبرداری',
      toolkitLink: 'انٹرایکٹو ٹول کٹ',
      blogLink: 'بلاگ',
      languageLabel: 'زبان منتخب کریں',
      copyright: 'AspireHub۔ دنیا بھر کے طلبہ، فری لانسرز اور سیکھنے والوں کے لیے۔',
      verificationNote: 'مستند آفیشل لنکس · ہمیشہ متعلقہ پورٹل پر تازہ تاریخوں کی تصدیق کریں۔',
    },
    auth: {
      signIn: 'لاگ ان',
      signUp: 'اکاؤنٹ بنائیں',
      signOut: 'لاگ آؤٹ',
      account: 'اکاؤنٹ',
      welcomeBack: 'AspireHub میں خوش آمدید',
      createAccountTitle: 'اپنا AspireHub اکاؤنٹ بنائیں',
      authSubtitle: 'اپنی پروفائل، اسکالرشپ مراحل اور محفوظ کردہ مواقع ایک جگہ محفوظ رکھیں۔',
      fullNameLabel: 'پورا نام',
      emailLabel: 'ای میل ایڈریس',
      passwordLabel: 'پاس ورڈ',
      passwordHint: 'کم از کم 8 حروف',
      countryLabel: 'ملک / خطہ',
      focusGoalLabel: 'بنیادی ہدف',
      bioLabel: 'مختصر تعارف / تعلیمی یا کیریئر ہدف',
      saveProfile: 'پروفائل محفوظ کریں',
      profileSaved: 'پروفائل اپ ڈیٹ ہو گئی۔',
      dashboardTitle: 'آپ کا AspireHub اکاؤنٹ',
      dashboardSubtitle: 'اپنی پروفائل اور محفوظ کردہ مواقع یہاں منظم کریں۔',
      savedOverview: 'محفوظ شدہ مواقع اور ٹریکر',
      openBookmarks: 'بک مارکس اور ٹریکر کھولیں',
      noAccountPrompt: 'AspireHub پر نئے ہیں؟',
      haveAccountPrompt: 'پہلے سے اکاؤنٹ موجود ہے؟',
      submitting: 'انتظار کریں...',
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      scholarships: 'المنح الدراسية',
      freelancing: 'العمل الحر والمسار المهني',
      aiTools: 'أدوات الذكاء الاصطناعي',
      resources: 'المصادر المجانية',
      toolkit: 'الأدوات التفاعلية',
      blog: 'المدونة',
      about: 'من نحن',
      contact: 'اتصل بنا',
      getStarted: 'ابدأ الآن',
      searchPlaceholder: 'ابحث عن المنح، الوظائف عن بعد، أدوات الذكاء الاصطناعي أو الدورات...',
      themeLight: 'التبديل إلى الوضع الفاتح',
      themeDark: 'التبديل إلى الوضع الداكن',
    },
    common: {
      all: 'الكل',
      viewDetails: 'عرض التفاصيل',
      officialLink: 'الرابط الرسمي',
      readMore: 'اقرأ المزيد',
      visitTool: 'زيارة الموقع',
      compare: 'مقارنة',
      selected: 'محدد',
      readFullGuide: 'اقرأ الدليل الكامل',
      readArticle: 'اقرأ المقال',
      updated: 'محدث',
      expired: 'منتهية',
      officialPortal: 'البوابة الرسمية',
      sampleData: 'بيانات نموذجية',
      verifiedTool: 'أداة موثقة',
      sampleListing: 'نموذج',
      save: 'حفظ',
      saved: 'محفوظ',
      savedToBookmarks: 'تم الحفظ في المحفوظات',
      removedFromBookmarks: 'تمت الإزالة من المحفوظات',
      copy: 'نسخ',
      copied: 'تم النسخ',
      tryAgain: 'حاول مرة أخرى',
      unableToLoad: 'تعذر تحميل البيانات',
      backToHome: 'العودة للرئيسية',
      resetFilters: 'إعادة ضبط الفلاتر',
      explore: 'استكشف',
    },
    hero: {
      kicker: 'منح عالمية · وظائف عن بعد · أدوات ذكاء اصطناعي · أدوات تفاعلية',
      title: 'استكشف الفرص. تعلم المهارات. ابنِ مستقبلك.',
      subtitle:
        'اكتشف المنح الدراسية الدولية الموثوقة، تابع المواعيد النهائية، أتقن العمل الحر والعمل عن بعد، قارن أدوات الذكاء الاصطناعي واستعد عبر الأدوات التفاعلية.',
      primaryCta: 'استكشف المنح',
      secondaryCta: 'استكشف أدوات الذكاء الاصطناعي',
      statAwards: 'منح مختارة',
      statGuides: 'أدلة تعليمية شاملة',
      statTools: 'أداة ذكاء اصطناعي',
    },
    sections: {
      pillarsKicker: 'ركائز التعلم والمسار المهني العالمية',
      pillarsTitle: 'كل ما تحتاجه للانتقال من التعلم إلى العمل الاحترافي',
      pillar1Title: 'مركز المنح العالمي',
      pillar1Desc:
        'صفِّ المنح الدولية والمحلية حسب الدولة والدرجة والتخصص مع الروابط الرسمية ومتابعة المواعيد.',
      pillar1Cta: 'تصفح المنح',
      pillar2Title: 'مركز العمل الحر والمسار المهني',
      pillar2Desc:
        'استكشف الوظائف عن بعد، التدريبات الدولية، خرائط المهارات وأدلة Fiverr وUpwork.',
      pillar2Cta: 'اقرأ الأدلة المهنية',
      pillar3Title: 'دليل أدوات الذكاء الاصطناعي',
      pillar3Desc:
        'قارن الأدوات المجانية والمدفوعة للدراسة والبرمجة والكتابة والبحث الأكاديمي.',
      pillar3Cta: 'استكشف الأدوات',
      scholarshipHubKicker: 'مركز المنح',
      featuredScholarships: 'أبرز المنح الدراسية العالمية',
      scholarshipHubDesc:
        'بوابات منح رسمية موثوقة في بريطانيا وأمريكا وأوروبا واليابان وأستراليا وباكستان.',
      viewAllScholarships: 'عرض جميع المنح',
      popularGuidesKicker: 'أدلة المهارات والعمل عن بعد',
      popularGuides: 'مركز العمل الحر والمسار المهني',
      popularGuidesDesc:
        'أدلة عملية خطوة بخطوة للوظائف عن بعد، التدريبات، Fiverr وUpwork وبناء معرض الأعمال.',
      allGuides: 'جميع الأدلة المهنية',
      aiDirKicker: 'دليل الذكاء الاصطناعي',
      trendingTools: 'أدوات الذكاء الاصطناعي الشائعة',
      aiDirDesc: 'أدوات عملية للدراسة والبرمجة والبحث المدعوم بالمصادر.',
      exploreTools: 'استكشاف ومقارنة الأدوات',
      toolkitKicker: 'مختبر الجاهزية التفاعلي',
      toolkitTitle: 'اختبر أهليتك، اكتشف مسارك المهني وأنشئ نقاط السيرة الذاتية',
      toolkitDesc:
        'أربع أدوات تفاعلية مجانية: قائمة أهلية المنح، اختبار المسار المهني، منشئ نقاط السيرة الذاتية واختبار المهارات.',
      openToolkit: 'افتح الأدوات التفاعلية',
      whyKicker: 'لماذا AspireHub؟',
      whyTitle: 'وضوح ومصادر رسمية موثوقة',
      whyDesc:
        'يستحق الطلاب حول العالم أدلة شاملة وروابط رسمية دقيقة وتنبيهات واضحة للمنح المنتهية.',
      whyMissionCta: 'اقرأ رسالتنا',
      whyCard1Title: 'أدلة شاملة داخل المنصة',
      whyCard1Desc:
        'اقرأ خطط الدراسة وطلبات الدعم المالي للشهادات وأدلة المقابلات مباشرة داخل AspireHub.',
      whyCard2Title: 'مسارات عالمية للدراسة والعمل',
      whyCard2Desc:
        'خطط منظمة تشمل المنح الدولية والوظائف عن بعد والتدريبات والعمل الحر للمبتدئين.',
      whyCard3Title: 'مقارنة مباشرة للأدوات',
      whyCard3Desc:
        'قارن الخطط المجانية ونقاط القوة بين أدوات الذكاء الاصطناعي قبل استثمار وقتك.',
      whyCard4Title: 'حفظ ومتابعة المواعيد بخصوصية',
      whyCard4Desc:
        'احفظ المنح، حدد مرحلة التقديم وأضف تذكيراتك وملاحظاتك محلياً في متصفحك.',
      resourcesKicker: 'مصادر تعليمية مجانية',
      resourcesTitle: 'دورات مجانية وشهادات ونماذج سيرة ذاتية',
      browseResources: 'تصفح جميع المصادر',
      blogKicker: 'مجلة AspireHub',
      latestArticles: 'أحدث المقالات التعليمية',
      readAllArticles: 'اقرأ جميع المقالات',
      crossLinksHeading: 'الخطوات التالية الموصى بها عبر AspireHub',
      crossLinksSubheading: 'تابع التعلم عبر الأدلة والنماذج والأدوات التفاعلية المرتبطة.',
    },
    filters: {
      searchLabel: 'بحث',
      countryLabel: 'الدولة / المنطقة',
      degreeLabel: 'الدرجة العلمية',
      subjectLabel: 'التخصص / المجال',
      fundingLabel: 'نوع التمويل',
      statusLabel: 'حالة التقديم',
      pricingLabel: 'التسعير',
      levelLabel: 'مستوى الخبرة',
      internationalOnly: 'خاص بالطلاب الدوليين',
      reset: 'إعادة ضبط الفلاتر',
      allDegrees: 'جميع الدرجات',
      allSubjects: 'جميع التخصصات',
      allPricing: 'جميع الخطط',
      allStatuses: 'جميع الحالات',
      allLevels: 'جميع المستويات',
    },
    search: {
      dialogLabel: 'البحث الذكي في AspireHub',
      placeholder: 'ابحث عن المنح، الوظائف عن بعد، أدوات الذكاء الاصطناعي أو الدورات...',
      allTab: 'الكل',
      scholarshipsTab: 'المنح',
      careerTab: 'المهنة والعمل الحر',
      aiToolsTab: 'أدوات الذكاء الاصطناعي',
      resourcesTab: 'الدورات والسيرة',
      blogTab: 'المدونة',
      toolkitTab: 'الأدوات التفاعلية',
      recentTitle: 'عمليات البحث الأخيرة',
      clearRecent: 'مسح',
      suggestionsTitle: 'مواضيع مقترحة',
      shortcutsTitle: 'اختصارات سريعة',
      noResults: 'لا توجد نتائج مطابقة لـ',
      noResultsHint: 'جرب كلمات أوسع مثل "UK" أو "Fiverr" أو "remote jobs" أو "CV".',
      resultsCount: 'نتيجة موثوقة',
    },
    tracker: {
      drawerTitle: 'المحفوظات ومتابعة المنح',
      savedSingular: 'عنصر',
      savedPlural: 'عناصر',
      savedInBrowser: 'محفوظة في متصفحك',
      allTab: 'الكل',
      scholarshipsTab: 'متابعة المنح',
      otherTab: 'المهنة والأدوات',
      upcomingAlertTitle: 'تذكيرات قريبة أو مستحقة',
      emptyTitle: 'لا توجد عناصر محفوظة بعد',
      emptyDesc:
        'احفظ أي منحة لمتابعة مراحل التقديم والتذكيرات، أو احفظ الأدلة المهنية وأدوات الذكاء الاصطناعي.',
      stageLabel: 'المرحلة',
      reminderLabel: 'تاريخ التذكير',
      notesLabel: 'ملاحظات',
      notesPlaceholder: 'حالة خطاب الدافع، التوصيات، الدرجات...',
      clearAll: 'مسح الكل',
      browseOpportunities: 'تصفح المنح',
      stageResearching: 'قيد البحث',
      stagePreparing: 'تجهيز المستندات',
      stageSubmitted: 'تم التقديم',
      stageShortlisted: 'قائمة مختصرة',
    },
    toolkit: {
      sectionLabel: 'مختبر الجاهزية والمهارات التفاعلي',
      title: 'أدوات AspireHub التفاعلية للطلاب والمسار المهني',
      subtitle:
        'تحقق من جاهزيتك للمنح، اكتشف المسار المهني الأنسب لك، أنشئ نقاط سيرة ذاتية احترافية واختبر مهاراتك.',
      breadcrumb: 'الأدوات التفاعلية',
      tabEligibility: 'قائمة أهلية المنح',
      tabCareerQuiz: 'اختبار المسار المهني',
      tabCvTips: 'منشئ نصائح السيرة الذاتية',
      tabSkillQuiz: 'اختبار تقييم المهارات',
      eligibilityTitle: 'قائمة التحقق من أهلية وجاهزية المنح',
      eligibilityDesc:
        'حدد المتطلبات المكتملة لدرجتك المستهدفة. يتم حفظ تقدمك محلياً في متصفحك.',
      degreeSelectLabel: 'الدرجة العلمية المستهدفة',
      readinessScore: 'نسبة الجاهزية',
      resetChecklist: 'إعادة ضبط القائمة',
      careerQuizTitle: 'اختبار الميول المهنية والعمل الحر',
      careerQuizDesc:
        'أجب عن 6 أسئلة قصيرة لتحديد المسار المهني والأدلة المناسبة لطريقة عملك.',
      seeCareerResult: 'عرض المسار الموصى به',
      retakeQuiz: 'إعادة الاختبار',
      cvTipsTitle: 'منشئ نقاط السيرة الذاتية ATS والسيرة الأكاديمية',
      cvTipsDesc:
        'اختر مسارك ومجال تركيزك للحصول على صيغ احترافية قابلة للتخصيص بإنجازاتك الحقيقية.',
      copyBullets: 'نسخ النماذج',
      skillQuizTitle: 'اختبار تقييم المهارات العملية',
      skillQuizDesc:
        'اختبر معرفتك العملية في البرمجة والذكاء الاصطناعي أو العمل الحر أو التقديم الأكاديمي مع شرح فوري.',
      checkSkillScore: 'تصحيح الإجابات',
    },
    pages: {
      scholarshipsLabel: 'باحث المنح العالمي',
      scholarshipsTitle: 'مركز المنح الدراسية',
      scholarshipsSubtitle:
        'صفِّ المنح الدولية والمحلية حسب الدولة والدرجة والتخصص، مع تمييز واضح للنماذج والمنح المنتهية.',
      freelancingLabel: 'أدلة المهارات والعمل عن بعد',
      freelancingTitle: 'مركز العمل الحر والمسار المهني',
      freelancingSubtitle:
        'أدلة شاملة للمبتدئين حول الوظائف عن بعد، التدريبات الدولية، Fiverr وUpwork والتسعير.',
      aiToolsLabel: 'دليل الإنتاجية والذكاء الاصطناعي',
      aiToolsTitle: 'دليل أدوات الذكاء الاصطناعي',
      aiToolsSubtitle:
        'اكتشف وقارن أدوات عملية مثل Grok وDeepSeek وLovable وReplit وChatGPT وClaude.',
      compareLabel: 'مقارنة جنباً إلى جنب',
      compareTitle: 'مقارنة أدوات الذكاء الاصطناعي',
      compareSubtitle:
        'قارن حتى 3 أدوات في التسعير والخطط المجانية ونقاط القوة والمنصات والقيود.',
      resourcesLabel: 'الدورات المجانية والشهادات وأدلة الطلاب الدوليين',
      resourcesTitle: 'مصادر التعلم',
      resourcesSubtitle:
        'مناهج مجانية، أدلة الدعم المالي للشهادات، قوالب السيرة الذاتية وأدلة المقابلات.',
      blogLabel: 'مجلة AspireHub',
      blogTitle: 'المدونة والمقالات التعليمية',
      blogSubtitle:
        'إرشادات عملية حول مقالات المنح، التوازن بين الدراسة والعمل الحر، وتعلم المهارات الرقمية.',
      aboutLabel: 'عن AspireHub',
      aboutTitle: 'إرشاد موثوق للطلاب والخريجين والمبتدئين',
      aboutSubtitle:
        'توفير منصة موثوقة لاكتشاف المنح الدراسية وتعلم المهارات الرقمية واستخدام الذكاء الاصطناعي بمسؤولية.',
      contactLabel: 'الثقة والتصحيحات',
      contactTitle: 'تواصل مع AspireHub',
      contactSubtitle:
        'ساعدنا في إبقاء مواعيد المنح والروابط الرسمية والأدلة التعليمية دقيقة للطلاب حول العالم.',
      privacyLabel: 'الثقة والقانونية',
      privacyTitle: 'سياسة الخصوصية',
      privacySubtitle:
        'شرح واضح للبيانات المحفوظة في متصفحك وآلية عمل مستشار الذكاء الاصطناعي والروابط الخارجية.',
      disclaimerLabel: 'الثقة والقانونية',
      disclaimerTitle: 'إخلاء المسؤولية وسياسة التحقق',
      disclaimerSubtitle:
        'تحقق دائماً من المواعيد النهائية والشروط مباشرة عبر البوابات الرسمية للجهات المانحة.',
      notFoundTitle: 'تعذر العثور على هذه الصفحة',
      notFoundDesc:
        'ربما تم نقل الرابط أو لم يعد موجوداً. تصفح أقسامنا الرئيسية أدناه.',
    },
    advisor: {
      launcher: 'مستشار الذكاء الاصطناعي المهني',
      title: 'مستشار AspireHub الذكي',
      roleGeneral: 'عام',
      roleScholarship: 'المنح',
      roleFreelance: 'المهنة',
      roleAiTools: 'أدوات AI',
      detailLabel: 'تفصيل الإجابة',
      speedFast: 'مختصر',
      speedBalanced: 'متوازن',
      speedDeep: 'مفصل',
      welcomeTitle: 'مساعد المسار المهني والدراسة',
      welcomeDesc:
        'اسأل عن المسارات المهنية المناسبة، خرائط المهارات، هيكل خطاب الدافع أو أدوات الذكاء الاصطناعي بدون أي فرص مختلقة.',
      tryAsking: 'جرب أن تسأل',
      placeholder: 'اسأل عن مسار مهني، منحة أو أداة ذكاء اصطناعي...',
      disclaimer: 'تحقق من مواعيد المنح والأسعار على البوابات الرسمية.',
      drafting: 'جارٍ إعداد الإرشاد...',
      retry: 'إعادة المحاولة',
    },
    getStarted: {
      kicker: 'اختر مسارك',
      title: 'من أين تود أن تبدأ اليوم؟',
      path1Title: 'ابحث عن المنح وتابعها',
      path1Desc: 'صفِّ المنح العالمية وتابع مراحل التقديم وتواريخ التذكير.',
      path2Title: 'ابدأ العمل الحر والوظائف عن بعد',
      path2Desc: 'اتبع الأدلة العملية للوظائف عن بعد والتدريبات وFiverr وUpwork.',
      path3Title: 'استكشف وقارن أدوات الذكاء الاصطناعي',
      path3Desc: 'قارن الخيارات المجانية والمدفوعة للدراسة والبرمجة والبحث.',
      path4Title: 'افتح الأدوات التفاعلية للطلاب',
      path4Desc: 'جرب قائمة أهلية المنح، اختبار المهنة، منشئ السيرة الذاتية واختبار المهارات.',
      advisorTitle: 'تحدث مع مستشار AspireHub الذكي',
      advisorDesc: 'استكشف المسارات المهنية المناسبة وخطط التعلم دون روابط وهمية.',
    },
    newsletter: {
      kicker: 'النشرة الأسبوعية للفرص',
      title: 'ابقَ على اطلاع بأدلة المنح والعمل الحر وأدوات الذكاء الاصطناعي الموثوقة.',
      subtitle: 'نصائح عملية أسبوعية للدراسة والعمل—بدون رسائل مزعجة.',
      placeholder: 'you@university.edu',
      subscribe: 'اشترك الآن',
      saving: 'جارٍ الحفظ...',
    },
    footer: {
      tagline:
        'توفير منح دراسية دولية موثوقة وأدلة عمل عن بعد وأدوات تفاعلية ودورات مجانية للطلاب حول العالم.',
      scholarshipsHeading: 'المنح الدراسية',
      careersHeading: 'المهنة والأدوات التفاعلية',
      trustHeading: 'الثقة والقانونية',
      aboutLink: 'من نحن',
      contactLink: 'اتصل بنا والتصحيحات',
      privacyLink: 'سياسة الخصوصية',
      disclaimerLink: 'إخلاء المسؤولية',
      toolkitLink: 'الأدوات التفاعلية',
      blogLink: 'المدونة التعليمية',
      languageLabel: 'لغة الواجهة',
      copyright: 'AspireHub. صُمم للطلاب والعمل الحر والمتعلمين حول العالم.',
      verificationNote: 'روابط رسمية موثوقة · تأكد دائماً من التواريخ على المواقع الرسمية.',
    },
    auth: {
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      signOut: 'تسجيل الخروج',
      account: 'الحساب',
      welcomeBack: 'مرحباً بعودتك إلى AspireHub',
      createAccountTitle: 'أنشئ حسابك على AspireHub',
      authSubtitle: 'احفظ ملفك الشخصي ومراحل المنح الدراسية والمحفوظات في مكان واحد.',
      fullNameLabel: 'الاسم الكامل',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      passwordHint: '8 أحرف على الأقل',
      countryLabel: 'الدولة / المنطقة',
      focusGoalLabel: 'الهدف الأساسي',
      bioLabel: 'نبذة قصيرة / الهدف الدراسي أو المهني',
      saveProfile: 'حفظ الملف الشخصي',
      profileSaved: 'تم تحديث الملف الشخصي.',
      dashboardTitle: 'حسابك على AspireHub',
      dashboardSubtitle: 'أدر ملفك التعليمي والفرص المحفوظة بسهولة.',
      savedOverview: 'المحفوظات والمتابعة',
      openBookmarks: 'فتح المحفوظات والمتابعة',
      noAccountPrompt: 'جديد على AspireHub؟',
      haveAccountPrompt: 'لديك حساب بالفعل؟',
      submitting: 'جارٍ المعالجة...',
    },
  },
};
