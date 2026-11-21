export type ScholarshipCategory =
  | 'Pakistan Scholarships'
  | 'International Scholarships'
  | 'Fully Funded Scholarships'
  | 'Undergraduate Scholarships'
  | "Master's Scholarships"
  | 'PhD Scholarships';

export type DegreeLevel = 'Undergraduate' | "Master's" | 'PhD' | 'Postdoctoral';

export type FundingType = 'Fully Funded' | 'Partial Funding' | 'Tuition Waiver';

export type ApplicationStatus = 'Active (Sample Cycle)' | 'Check Official Portal' | 'Expired';

export interface InternalLinkRef {
  title: string;
  description: string;
  to: string;
  badge: 'Scholarship' | 'Freelancing' | 'AI Tool' | 'Resource' | 'Blog';
}

export interface Scholarship {
  id: string;
  slug: string;
  title: string;
  country: string;
  organization: string;
  degreeLevel: DegreeLevel;
  categories: ScholarshipCategory[];
  fundingType: FundingType;
  fundingCoverage: string;
  eligibilitySummary: string;
  deadline: string;
  status: ApplicationStatus;
  officialUrl: string;
  isSampleData: boolean;
  dataNotice: string;
  featured?: boolean;
  fullDescription: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  benefits: string[];
  applicationProcess: string[];
  importantDates: { label: string; date: string }[];
  relatedLinks?: InternalLinkRef[];
}

export type FreelancingCategory =
  | 'Introduction to Freelancing'
  | 'Fiverr Complete Guide'
  | 'Upwork Complete Guide'
  | 'How to Create a Portfolio'
  | 'How to Find Your First Client'
  | 'Freelancing Skills to Learn'
  | 'Client Communication'
  | 'Pricing and Payment Methods'
  | 'Common Freelancing Mistakes';

export interface GuideSection {
  heading: string;
  body: string;
  paragraphs?: string[];
  bullets?: string[];
  exampleBox?: {
    title: string;
    content: string;
  };
  internalLink?: {
    label: string;
    to: string;
  };
}

export interface FreelancingGuide {
  id: string;
  slug: string;
  title: string;
  category: FreelancingCategory;
  shortDescription: string;
  readingTime: string;
  thumbnail: string;
  featured?: boolean;
  difficulty: 'Beginner' | 'Intermediate';
  updatedAt: string;
  sections: GuideSection[];
  actionChecklist: string[];
  relatedLinks?: InternalLinkRef[];
}

export type AIToolCategory =
  | 'AI Tools for Students'
  | 'AI Tools for Coding'
  | 'AI Writing Tools'
  | 'AI Image Generators'
  | 'AI Video Tools'
  | 'AI Productivity Tools'
  | 'AI Research Tools'
  | 'AI Presentation Tools';

export type PricingTier = 'Free' | 'Freemium' | 'Paid';

export interface AITool {
  id: string;
  slug: string;
  name: string;
  category: AIToolCategory;
  shortDescription: string;
  fullDescription: string;
  pricingType: PricingTier;
  pricingNote: string;
  officialUrl: string;
  isVerified: boolean;
  dataNotice: string;
  popular?: boolean;
  mainFeatures: string[];
  useCases: string[];
  limitations: string[];
  comparison: {
    freeTierAvailable: string;
    bestFor: string;
    platforms: string;
    learningCurve: 'Easy' | 'Moderate' | 'Technical';
    keyStrength: string;
  };
  iconKey:
    | 'sparkles'
    | 'code'
    | 'pen'
    | 'image'
    | 'video'
    | 'layers'
    | 'search'
    | 'presentation'
    | 'book'
    | 'terminal';
  relatedLinks?: InternalLinkRef[];
}

export type ResourceCategory =
  | 'Free Online Courses'
  | 'CV Templates'
  | 'Resume Writing Guides'
  | 'Cover Letter Guides'
  | 'Interview Preparation'
  | 'Useful Educational Websites'
  | 'Learning Roadmaps';

export interface ResourceArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  copyableBlock?: {
    title: string;
    content: string;
  };
  internalLink?: {
    label: string;
    to: string;
  };
}

export interface FreeResource {
  id: string;
  slug: string;
  title: string;
  provider: string;
  category: ResourceCategory;
  description: string;
  readingTime: string;
  externalUrl?: string;
  isVerifiedLink: boolean;
  isSampleTemplate?: boolean;
  formatLabel: string;
  articleIntro: string;
  sections: ResourceArticleSection[];
  actionSteps: string[];
  relatedLinks?: InternalLinkRef[];
}

export type BlogCategory =
  | 'Scholarships & Study Abroad'
  | 'Freelancing & Career'
  | 'AI & Productivity'
  | 'Skill Building';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: {
    title: string;
    body: string;
  };
  internalLink?: {
    label: string;
    to: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readingTime: string;
  thumbnail: string;
  featured?: boolean;
  sections: BlogSection[];
  keyTakeaways: string[];
  relatedLinks?: InternalLinkRef[];
}

export type BookmarkEntityType =
  | 'scholarship'
  | 'ai-tool'
  | 'freelancing'
  | 'blog'
  | 'resource';

export interface BookmarkItem {
  id: string;
  type: BookmarkEntityType;
  title: string;
  subtitle: string;
  path: string;
  savedAt: string;
}

export interface ApiResult<T> {
  data: T;
  meta: {
    source: 'static-ready' | 'php-mysql-api';
    total: number;
    timestamp: string;
  };
}
