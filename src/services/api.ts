import { AI_TOOLS_DATA } from '../data/aiToolsData';
import { BLOG_POSTS } from '../data/blogData';
import { FREELANCING_GUIDES } from '../data/freelancingData';
import { FREE_RESOURCES_DATA } from '../data/resourcesData';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import {
  AITool,
  ApiResult,
  BlogPost,
  FreeResource,
  FreelancingGuide,
  Scholarship,
} from '../types';
import { isValidEmail } from '../utils/formatters';

/**
 * AspireHub Data Access Layer
 * Structured for seamless migration to a PHP + MySQL REST backend
 * (e.g., swapping local datasets for fetch(`${API_BASE}/scholarships.php`)).
 */

const SIMULATED_DELAY_MS = 100;

function withResponseMeta<T>(data: T, total?: number): ApiResult<T> {
  return {
    data,
    meta: {
      source: 'static-ready',
      total: total ?? (Array.isArray(data) ? data.length : 1),
      timestamp: new Date().toISOString(),
    },
  };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchScholarships(): Promise<ApiResult<Scholarship[]>> {
  await wait(SIMULATED_DELAY_MS);
  return withResponseMeta(SCHOLARSHIPS_DATA);
}

export async function fetchScholarshipBySlug(slug: string): Promise<ApiResult<Scholarship | null>> {
  await wait(SIMULATED_DELAY_MS);
  const found = SCHOLARSHIPS_DATA.find((item) => item.slug === slug) ?? null;
  return withResponseMeta(found, found ? 1 : 0);
}

export async function fetchFreelancingGuides(): Promise<ApiResult<FreelancingGuide[]>> {
  await wait(SIMULATED_DELAY_MS);
  return withResponseMeta(FREELANCING_GUIDES);
}

export async function fetchFreelancingGuideBySlug(
  slug: string
): Promise<ApiResult<FreelancingGuide | null>> {
  await wait(SIMULATED_DELAY_MS);
  const found = FREELANCING_GUIDES.find((item) => item.slug === slug) ?? null;
  return withResponseMeta(found, found ? 1 : 0);
}

export async function fetchAITools(): Promise<ApiResult<AITool[]>> {
  await wait(SIMULATED_DELAY_MS);
  return withResponseMeta(AI_TOOLS_DATA);
}

export async function fetchAIToolBySlug(slug: string): Promise<ApiResult<AITool | null>> {
  await wait(SIMULATED_DELAY_MS);
  const found = AI_TOOLS_DATA.find((item) => item.slug === slug) ?? null;
  return withResponseMeta(found, found ? 1 : 0);
}

export async function fetchFreeResources(): Promise<ApiResult<FreeResource[]>> {
  await wait(SIMULATED_DELAY_MS);
  return withResponseMeta(FREE_RESOURCES_DATA);
}

export async function fetchFreeResourceBySlug(
  slug: string
): Promise<ApiResult<FreeResource | null>> {
  await wait(SIMULATED_DELAY_MS);
  const found = FREE_RESOURCES_DATA.find((item) => item.slug === slug) ?? null;
  return withResponseMeta(found, found ? 1 : 0);
}

export async function fetchBlogPosts(): Promise<ApiResult<BlogPost[]>> {
  await wait(SIMULATED_DELAY_MS);
  return withResponseMeta(BLOG_POSTS);
}

export async function fetchBlogPostBySlug(slug: string): Promise<ApiResult<BlogPost | null>> {
  await wait(SIMULATED_DELAY_MS);
  const found = BLOG_POSTS.find((item) => item.slug === slug) ?? null;
  return withResponseMeta(found, found ? 1 : 0);
}

export interface NewsletterSubscriptionResult {
  ok: boolean;
  message: string;
}

const NEWSLETTER_STORAGE_KEY = 'aspirehub_newsletter_subscribers_v1';

export async function subscribeNewsletter(email: string): Promise<NewsletterSubscriptionResult> {
  await wait(220);
  const cleanEmail = email.trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) {
    return {
      ok: false,
      message: 'Please enter a valid email address (for example, name@example.com).',
    };
  }

  try {
    const existingRaw = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    const existing: string[] = existingRaw ? JSON.parse(existingRaw) : [];

    if (existing.includes(cleanEmail)) {
      return {
        ok: true,
        message: 'This email is already saved in your browser preview list for AspireHub updates.',
      };
    }

    const updated = [...existing, cleanEmail];
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(updated));

    return {
      ok: true,
      message:
        'Subscribed locally! Your email passed validation and is saved in browser storage (ready to connect to a PHP/MySQL newsletter endpoint).',
    };
  } catch {
    return {
      ok: false,
      message: 'Unable to save subscription locally. Please check your browser storage settings.',
    };
  }
}
