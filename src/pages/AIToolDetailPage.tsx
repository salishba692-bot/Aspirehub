import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  GitCompareArrows,
  Info,
} from 'lucide-react';
import { AI_TOOLS_DATA } from '../data/aiToolsData';
import { useBookmarks } from '../context/BookmarksContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchAIToolBySlug } from '../services/api';
import { InternalLinkRef } from '../types';
import { AIToolCard, getAIToolIcon } from '../components/AIToolCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';

function getToolInternalLinks(category: string): InternalLinkRef[] {
  const base: InternalLinkRef[] = [
    {
      title: 'Using AI Tools to Study Faster Without Losing Core Skills',
      description: 'Learn active-recall workflows and verification rules for students.',
      to: '/blog/using-ai-tools-to-learn-faster-without-hollowing-out-your-skills',
      badge: 'Blog',
    },
  ];

  if (category.includes('Coding')) {
    base.push({
      title: 'Full-Stack Web Development Complete Curriculum',
      description: 'Follow our structured engineering roadmap alongside your AI editor.',
      to: '/resources/full-stack-web-development-curriculum-guide',
      badge: 'Resource',
    });
  } else if (category.includes('Writing') || category.includes('Research')) {
    base.push({
      title: 'How to Write a Standout Statement of Purpose',
      description: 'Keep your authentic voice while organizing scholarship essays clearly.',
      to: '/blog/how-to-write-a-standout-statement-of-purpose',
      badge: 'Blog',
    });
  } else {
    base.push({
      title: 'Freelancing Skills to Learn & Career Roadmaps',
      description: 'Turn modern digital workflows into reliable client deliverables.',
      to: '/freelancing/freelancing-skills-to-learn-in-demand',
      badge: 'Freelancing',
    });
  }

  return base;
}

export function AIToolDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const {
    data: result,
    loading,
    error,
    reload,
  } = useAsyncData(() => fetchAIToolBySlug(slug), [slug]);

  const tool = result?.data ?? null;

  const breadcrumbItems: BreadcrumbItem[] | undefined = tool
    ? [
        { label: 'Home', to: '/' },
        { label: 'AI Tools', to: '/ai-tools' },
        {
          label: tool.category,
          to: `/ai-tools?category=${encodeURIComponent(tool.category)}`,
        },
        { label: tool.name },
      ]
    : undefined;

  useDocumentTitle(
    tool ? `${tool.name} – AI Tools Directory – AspireHub` : 'AI Tool Details – AspireHub',
    tool?.shortDescription,
    tool
      ? {
          type: 'article',
          breadcrumbs: breadcrumbItems,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            applicationCategory: tool.category,
            operatingSystem: tool.comparison.platforms,
            description: tool.shortDescription,
          },
        }
      : undefined
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorBanner message={error} onRetry={reload} />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="AI tool not found"
          description="The requested AI tool could not be found in the directory."
          actionLabel="Back to AI Tools Directory"
          onAction={() => {
            window.location.href = '/ai-tools';
          }}
        />
      </div>
    );
  }

  const saved = isBookmarked(tool.id);
  const Icon = getAIToolIcon(tool.iconKey);
  const related = AI_TOOLS_DATA.filter(
    (item) => item.id !== tool.id && item.category === tool.category
  ).slice(0, 3);
  const peerSlugs = related.slice(0, 2).map((r) => r.slug);
  const fallbackPeer = tool.slug === 'chatgpt' ? 'deepseek' : 'chatgpt';
  const compareTarget = `/ai-tools/compare?tools=${[
    tool.slug,
    ...(peerSlugs.length > 0 ? peerSlugs : [fallbackPeer]),
  ].join(',')}`;
  const internalLinks = getToolInternalLinks(tool.category);

  return (
    <div>
      <PageHeader
        sectionLabel={`${tool.category} · ${tool.pricingType}`}
        title={tool.name}
        subtitle={tool.shortDescription}
        breadcrumbCurrent={tool.name}
        parentLink={{ label: 'AI Tools', to: '/ai-tools' }}
        showBreadcrumb={false}
      />

      {breadcrumbItems && (
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Link
            to="/ai-tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202A44] hover:text-[#6956D8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to AI Tools Directory
          </Link>
        </div>

        <div className="mb-8 bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#6956D8] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#202A44]/85 leading-relaxed">{tool.dataNotice}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#F7F8FC] border border-slate-200 flex items-center justify-center text-[#6956D8]">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#101B3D]">Overview</h2>
                  <p className="text-xs text-slate-500">
                    {tool.isVerified ? 'Verified Official Listing' : 'Sample Directory Listing'}
                  </p>
                </div>
              </div>
              <p className="text-base text-[#202A44]/90 leading-relaxed">{tool.fullDescription}</p>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-4">Main Features</h2>
              <ul className="space-y-3">
                {tool.mainFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#202A44]/90">
                    <CheckCircle2
                      className="w-5 h-5 text-[#6956D8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-4">
                Practical Use Cases for Students &amp; Freelancers
              </h2>
              <ul className="space-y-2.5 list-disc pl-5 text-sm sm:text-base text-[#202A44]/90 leading-relaxed">
                {tool.useCases.map((uc, idx) => (
                  <li key={idx}>{uc}</li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-4">
                Considerations &amp; Limitations
              </h2>
              <ul className="space-y-3">
                {tool.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#202A44]/85">
                    <AlertCircle
                      className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{lim}</span>
                  </li>
                ))}
              </ul>
            </section>

            <RelatedCrossLinks
              heading="Related Guides on AspireHub"
              links={internalLinks}
            />
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-[#101B3D]">Quick Specs</h2>

              <dl className="space-y-3 text-sm">
                <div className="pb-3 border-b border-slate-100">
                  <dt className="text-xs text-slate-500">Pricing Tier</dt>
                  <dd className="font-semibold text-[#6956D8] mt-0.5">{tool.pricingType}</dd>
                  <dd className="text-xs text-[#202A44]/80 mt-1 leading-relaxed">
                    {tool.pricingNote}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <dt className="text-slate-500">Free Tier</dt>
                  <dd className="font-semibold text-[#101B3D] text-right">
                    {tool.comparison.freeTierAvailable}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <dt className="text-slate-500">Platforms</dt>
                  <dd className="font-medium text-[#101B3D] text-right">
                    {tool.comparison.platforms}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <dt className="text-slate-500">Learning Curve</dt>
                  <dd className="font-medium text-[#101B3D] text-right">
                    {tool.comparison.learningCurve}
                  </dd>
                </div>
              </dl>

              <div className="pt-2 space-y-2.5">
                <Link
                  to={compareTarget}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-xl transition-colors"
                >
                  <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
                  Compare With Similar Tools
                </Link>

                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#6956D8] hover:bg-[#5542C0] rounded-xl transition-colors"
                >
                  Visit Official Website
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark({
                      id: tool.id,
                      type: 'ai-tool',
                      title: tool.name,
                      subtitle: `${tool.category} · ${tool.pricingType}`,
                      path: `/ai-tools/${tool.slug}`,
                    })
                  }
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border transition-colors cursor-pointer ${
                    saved
                      ? 'bg-[#6956D8]/10 text-[#6956D8] border-[#6956D8]/40'
                      : 'bg-[#F7F8FC] text-[#101B3D] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
                  {saved ? 'Saved to Bookmarks' : 'Save Tool'}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#101B3D] mb-6">Similar AI Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <AIToolCard key={item.id} tool={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
