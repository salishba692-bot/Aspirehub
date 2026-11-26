import { useEffect } from 'react';
import type { BreadcrumbItem } from '../components/Breadcrumb';

interface SeoOptions {
  type?: 'website' | 'article';
  robots?: string;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SEGMENT_LABELS: Record<string, string> = {
  scholarships: 'Scholarships',
  freelancing: 'Career & Freelancing',
  'ai-tools': 'AI Tools Directory',
  compare: 'Compare AI Tools',
  resources: 'Free Resources',
  blog: 'Blog',
  about: 'About AspireHub',
  contact: 'Contact Us',
  'privacy-policy': 'Privacy Policy',
  disclaimer: 'Disclaimer',
};

function formatSegmentLabel(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .split('-')
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function buildBreadcrumbJsonLd(
  origin: string,
  pathname: string,
  explicitItems?: BreadcrumbItem[]
): Record<string, unknown> | null {
  if (explicitItems && explicitItems.length > 0) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: explicitItems.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.label,
        item: crumb.to ? `${origin}${crumb.to}` : `${origin}${pathname}`,
      })),
    };
  }

  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const segments = cleanPath === '/' ? [] : cleanPath.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const itemListElement: Array<Record<string, unknown>> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${origin}/`,
    },
  ];

  let runningPath = '';
  segments.forEach((seg, idx) => {
    runningPath += `/${seg}`;
    itemListElement.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: formatSegmentLabel(seg),
      item: `${origin}${runningPath}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function useDocumentTitle(title: string, description?: string, options?: SeoOptions) {
  const serializedJsonLd = options?.jsonLd ? JSON.stringify(options.jsonLd) : '';
  const serializedBreadcrumbs = options?.breadcrumbs ? JSON.stringify(options.breadcrumbs) : '';
  const ogType = options?.type ?? 'website';
  const robots = options?.robots ?? 'index, follow';

  useEffect(() => {
    document.title = title;

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const currentUrl = typeof window !== 'undefined' ? `${origin}${pathname}` : '/';

    upsertCanonical(currentUrl);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:url', currentUrl);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', title);
    upsertMeta('name', 'twitter:title', title);

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }

    const graphEntries: Array<Record<string, unknown>> = [];
    if (serializedJsonLd) {
      try {
        const parsed = JSON.parse(serializedJsonLd) as
          | Record<string, unknown>
          | Array<Record<string, unknown>>;
        if (Array.isArray(parsed)) {
          graphEntries.push(...parsed);
        } else if (parsed && typeof parsed === 'object') {
          graphEntries.push(parsed);
        }
      } catch {
        // Ignore malformed custom JSON-LD
      }
    }

    if (!robots.includes('noindex') && origin) {
      let parsedBreadcrumbs: BreadcrumbItem[] | undefined;
      if (serializedBreadcrumbs) {
        try {
          parsedBreadcrumbs = JSON.parse(serializedBreadcrumbs) as BreadcrumbItem[];
        } catch {
          parsedBreadcrumbs = undefined;
        }
      }
      const breadcrumbSchema = buildBreadcrumbJsonLd(origin, pathname, parsedBreadcrumbs);
      if (breadcrumbSchema) {
        graphEntries.push(breadcrumbSchema);
      }
    }

    const existingScript = document.getElementById('aspirehub-route-jsonld');
    if (graphEntries.length > 0) {
      const scriptEl = existingScript ?? document.createElement('script');
      scriptEl.id = 'aspirehub-route-jsonld';
      scriptEl.setAttribute('type', 'application/ld+json');
      scriptEl.textContent = JSON.stringify(
        graphEntries.length === 1 ? graphEntries[0] : graphEntries
      );
      if (!existingScript) {
        document.head.appendChild(scriptEl);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [title, description, ogType, robots, serializedJsonLd, serializedBreadcrumbs]);
}
