import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, CheckSquare } from 'lucide-react';
import { FREELANCING_GUIDES } from '../data/freelancingData';
import { useBookmarks } from '../context/BookmarksContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchFreelancingGuideBySlug } from '../services/api';
import { formatReadableDate, slugify } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { GuideCard } from '../components/GuideCard';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { SafeImage } from '../components/SafeImage';

export function FreelancingDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const {
    data: result,
    loading,
    error,
    reload,
  } = useAsyncData(() => fetchFreelancingGuideBySlug(slug), [slug]);

  const guide = result?.data ?? null;

  const breadcrumbItems: BreadcrumbItem[] | undefined = guide
    ? [
        { label: 'Home', to: '/' },
        { label: 'Freelancing', to: '/freelancing' },
        {
          label: guide.category,
          to: `/freelancing?category=${encodeURIComponent(guide.category)}`,
        },
        { label: guide.title },
      ]
    : undefined;

  useDocumentTitle(
    guide ? `${guide.title} – AspireHub` : 'Freelancing Guide – AspireHub',
    guide?.shortDescription,
    guide
      ? {
          type: 'article',
          breadcrumbs: breadcrumbItems,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: guide.title,
            description: guide.shortDescription,
            step: guide.actionChecklist.map((step, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              text: step,
            })),
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

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Freelancing guide not found"
          description="The guide you requested could not be found."
          actionLabel="Back to Freelancing Guides"
          onAction={() => {
            window.location.href = '/freelancing';
          }}
        />
      </div>
    );
  }

  const saved = isBookmarked(guide.id);
  const related = FREELANCING_GUIDES.filter((g) => g.id !== guide.id).slice(0, 3);

  return (
    <div>
      <PageHeader
        sectionLabel={`${guide.category} · ${guide.readingTime} · ${guide.difficulty}`}
        title={guide.title}
        subtitle={guide.shortDescription}
        breadcrumbCurrent={guide.title}
        parentLink={{ label: 'Freelancing', to: '/freelancing' }}
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/freelancing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202A44] hover:text-[#6956D8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All Freelancing Guides
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 tabular-nums">
              Updated {formatReadableDate(guide.updatedAt)}
            </span>
            <button
              type="button"
              onClick={() =>
                toggleBookmark({
                  id: guide.id,
                  type: 'freelancing',
                  title: guide.title,
                  subtitle: `${guide.category} · ${guide.readingTime}`,
                  path: `/freelancing/${guide.slug}`,
                })
              }
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                saved
                  ? 'bg-[#6956D8]/10 text-[#6956D8] border-[#6956D8]/40'
                  : 'bg-white text-[#101B3D] border-slate-200 hover:border-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
              {saved ? 'Saved Guide' : 'Save Guide'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <article className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                <SafeImage
                  src={guide.thumbnail}
                  alt={guide.title}
                  eager
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-10 space-y-8">
                <nav
                  aria-label="Guide Contents"
                  className="rounded-xl bg-[#F7F8FC] border border-slate-200/80 p-4 sm:p-5"
                >
                  <p className="text-xs font-bold text-[#101B3D] mb-2">In This Playbook</p>
                  <ul className="space-y-1.5 text-sm">
                    {guide.sections.map((sec) => {
                      const anchor = slugify(sec.heading);
                      return (
                        <li key={anchor}>
                          <a
                            href={`#${anchor}`}
                            className="text-[#6956D8] hover:text-[#5542C0] hover:underline font-medium"
                          >
                            {sec.heading}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {guide.sections.map((section) => {
                  const anchor = slugify(section.heading);
                  return (
                    <section key={anchor} id={anchor} className="space-y-3.5 scroll-mt-24">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D]">
                        {section.heading}
                      </h2>
                      <p className="text-base text-[#202A44]/90 leading-[1.7] max-w-[70ch]">
                        {section.body}
                      </p>

                      {section.bullets && (
                        <ul className="space-y-2 list-disc pl-5 text-sm sm:text-base text-[#202A44]/90 leading-relaxed pt-1">
                          {section.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {section.exampleBox && (
                        <div className="mt-4 rounded-xl bg-[#F7F8FC] border border-slate-200/90 p-5">
                          <p className="text-xs font-bold text-[#6956D8] mb-2">
                            {section.exampleBox.title}
                          </p>
                          <pre className="font-sans text-sm text-[#101B3D] whitespace-pre-wrap leading-relaxed">
                            {section.exampleBox.content}
                          </pre>
                        </div>
                      )}

                      {section.internalLink && (
                        <div className="pt-1">
                          <Link
                            to={section.internalLink.to}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] hover:text-[#5542C0] hover:underline"
                          >
                            {section.internalLink.label}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </article>

            <RelatedCrossLinks links={guide.relatedLinks} />
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200/90 rounded-xl p-6">
              <h2 className="text-base font-bold text-[#101B3D] mb-4">Action Checklist</h2>
              <ul className="space-y-3">
                {guide.actionChecklist.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#202A44]/90">
                    <CheckSquare
                      className="w-4 h-4 text-[#6956D8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#101B3D] text-white rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-2">
                Need Templates &amp; Roadmaps?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Pair this guide with full on-site ATS resume blueprints, cover letter frameworks,
                and skill roadmaps.
              </p>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#6956D8] hover:bg-[#5542C0] rounded-lg transition-colors"
              >
                Open Free Resources
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-[#101B3D] mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <GuideCard key={item.id} guide={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
