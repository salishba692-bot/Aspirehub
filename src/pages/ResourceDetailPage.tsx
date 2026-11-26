import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  CheckSquare,
  Copy,
} from 'lucide-react';
import { FREE_RESOURCES_DATA } from '../data/resourcesData';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchFreeResourceBySlug } from '../services/api';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { ResourceCard } from '../components/ResourceCard';
import { formatReadableDate, slugify } from '../utils/formatters';

export function ResourceDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const {
    data: result,
    loading,
    error,
    reload,
  } = useAsyncData(() => fetchFreeResourceBySlug(slug), [slug]);

  const resource = result?.data ?? null;

  const breadcrumbItems: BreadcrumbItem[] | undefined = resource
    ? [
        { label: t.nav.home, to: '/' },
        { label: t.nav.resources, to: '/resources' },
        {
          label: resource.category,
          to: `/resources?category=${encodeURIComponent(resource.category)}`,
        },
        { label: resource.title },
      ]
    : undefined;

  useDocumentTitle(
    resource ? `${resource.title} – AspireHub` : 'Resource Guide – AspireHub',
    resource?.description,
    resource
      ? {
          type: 'article',
          breadcrumbs: breadcrumbItems,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: resource.title,
            description: resource.description,
            author: {
              '@type': 'Organization',
              name: resource.provider,
            },
            publisher: {
              '@type': 'Organization',
              name: 'AspireHub',
            },
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

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Resource guide not found"
          description="The resource guide you requested could not be found."
          actionLabel={t.sections.browseResources}
          onAction={() => {
            window.location.href = '/resources';
          }}
        />
      </div>
    );
  }

  const saved = isBookmarked(resource.id);
  const relatedResources = FREE_RESOURCES_DATA.filter((r) => r.id !== resource.id).slice(0, 3);

  async function handleCopy(blockId: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(blockId);
      showToast(t.common.copied, 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
      showToast('Copy unavailable in this browser context.', 'error');
    }
  }

  function handleBookmarkToggle() {
    if (!resource) return;
    const added = toggleBookmark({
      id: resource.id,
      type: 'resource',
      title: resource.title,
      subtitle: `${resource.provider} · ${resource.category}`,
      path: `/resources/${resource.slug}`,
    });
    showToast(added ? t.common.savedToBookmarks : t.common.removedFromBookmarks, 'info');
  }

  return (
    <div>
      <PageHeader
        sectionLabel={`${resource.category} · ${resource.readingTime} · ${resource.formatLabel}`}
        title={resource.title}
        subtitle={resource.description}
        breadcrumbCurrent={resource.title}
        parentLink={{ label: t.nav.resources, to: '/resources' }}
        showBreadcrumb={false}
      />

      {breadcrumbItems && (
        <div className="bg-white dark:bg-[#141E3D] border-b border-slate-200/80 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202A44] dark:text-slate-200 hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t.sections.browseResources}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              {resource.provider} · {t.common.updated} {formatReadableDate(resource.lastUpdated)}
            </span>
            <button
              type="button"
              onClick={handleBookmarkToggle}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                saved
                  ? 'bg-[#6956D8]/10 text-[#6956D8] dark:text-[#4DA8FF] border-[#6956D8]/40'
                  : 'bg-white dark:bg-[#141E3D] text-[#101B3D] dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
              {saved ? t.common.saved : t.common.save}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8">
            <p className="text-base sm:text-lg text-[#101B3D] dark:text-white font-medium leading-relaxed pb-6 border-b border-slate-100 dark:border-slate-800">
              {resource.articleIntro}
            </p>

            {/* In-Page Table of Contents */}
            <nav
              aria-label="Guide Contents"
              className="rounded-xl bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5"
            >
              <p className="text-xs font-bold text-[#101B3D] dark:text-white mb-2">In This Guide</p>
              <ul className="space-y-1.5 text-sm">
                {resource.sections.map((sec) => {
                  const anchor = slugify(sec.heading);
                  return (
                    <li key={anchor}>
                      <a
                        href={`#${anchor}`}
                        className="text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] hover:underline font-medium"
                      >
                        {sec.heading}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {resource.sections.map((section) => {
              const anchor = slugify(section.heading);
              const blockKey = `${resource.id}-${anchor}`;
              return (
                <section key={anchor} id={anchor} className="space-y-4 scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-white">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-base text-[#202A44]/90 dark:text-slate-300 leading-[1.75] max-w-[70ch]"
                    >
                      {para}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-2 list-disc pl-5 text-sm sm:text-base text-[#202A44]/90 dark:text-slate-300 leading-relaxed pt-1">
                      {section.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {section.copyableBlock && (
                    <div className="mt-4 rounded-xl bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200/90 dark:border-slate-700 p-5">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <p className="text-xs font-bold text-[#6956D8] dark:text-[#4DA8FF]">
                          {section.copyableBlock.title}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(blockKey, section.copyableBlock!.content)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#101B3D] dark:text-white bg-white dark:bg-[#141E3D] hover:bg-slate-100 dark:hover:bg-[#1B284F] border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
                        >
                          {copiedId === blockKey ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                              {t.common.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                              {t.common.copy}
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="font-sans text-sm text-[#101B3D] dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {section.copyableBlock.content}
                      </pre>
                    </div>
                  )}

                  {section.internalLink && (
                    <div className="pt-1">
                      <Link
                        to={section.internalLink.to}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] hover:underline"
                      >
                        {section.internalLink.label}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </section>
              );
            })}

            <RelatedCrossLinks links={resource.relatedLinks} />
          </article>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-bold text-[#101B3D] dark:text-white mb-4">
                Action Checklist
              </h2>
              <ul className="space-y-3">
                {resource.actionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#202A44]/90 dark:text-slate-300">
                    <CheckSquare
                      className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {resource.externalUrl && (
              <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-3">
                <h3 className="text-sm font-bold text-[#101B3D] dark:text-white">
                  Official Companion Portal
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  After reading this full AspireHub guide, you can optionally visit the original
                  source portal for interactive exercises or downloads.
                </p>
                <a
                  href={resource.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0]"
                >
                  {t.common.officialLink}
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            )}

            <div className="bg-[#101B3D] text-white rounded-xl p-6 space-y-3">
              <h3 className="text-base font-bold text-white">Explore Connected Hubs</h3>
              <div className="space-y-2 text-xs">
                <Link
                  to="/scholarships"
                  className="block py-2 px-3 rounded-lg bg-white/10 hover:bg-white/18 text-white transition-colors"
                >
                  {t.nav.scholarships}
                </Link>
                <Link
                  to="/freelancing"
                  className="block py-2 px-3 rounded-lg bg-white/10 hover:bg-white/18 text-white transition-colors"
                >
                  {t.nav.freelancing}
                </Link>
                <Link
                  to="/toolkit"
                  className="block py-2 px-3 rounded-lg bg-white/10 hover:bg-white/18 text-white transition-colors"
                >
                  {t.nav.toolkit}
                </Link>
                <Link
                  to="/ai-tools"
                  className="block py-2 px-3 rounded-lg bg-white/10 hover:bg-white/18 text-white transition-colors"
                >
                  {t.nav.aiTools}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-[#101B3D] dark:text-white mb-6">
            More Free On-Site Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedResources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
