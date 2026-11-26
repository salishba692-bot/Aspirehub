import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Bookmark,
  Calendar,
  CheckCircle2,
  FileCheck,
  Globe2,
  GraduationCap,
  Info,
} from 'lucide-react';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchScholarshipBySlug } from '../services/api';
import { formatReadableDate } from '../utils/formatters';
import { InternalLinkRef, ScholarshipTrackingStage } from '../types';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { ScholarshipCard } from '../components/ScholarshipCard';

const SCHOLARSHIP_PREP_LINKS: InternalLinkRef[] = [
  {
    title: 'Scholarship Eligibility Checklist',
    description: 'Check transcripts, SOP drafts, referee confirmations, and language readiness.',
    to: '/toolkit?tab=eligibility',
    badge: 'Toolkit',
  },
  {
    title: 'How to Write a Standout Statement of Purpose',
    description: 'Follow our 4-part SOP narrative structure built for selection committees.',
    to: '/blog/how-to-write-a-standout-statement-of-purpose',
    badge: 'Blog',
  },
  {
    title: 'Academic CV Complete Guide & Template',
    description: 'Format education, research projects, and referees for international awards.',
    to: '/resources/academic-cv-template-for-scholarships-and-research',
    badge: 'Resource',
  },
  {
    title: '12-Month International Scholarship Preparation Calendar',
    description: 'Plan IELTS/GRE tests, transcripts, and referee briefs without panic.',
    to: '/blog/12-month-international-scholarship-preparation-calendar',
    badge: 'Blog',
  },
];

export function ScholarshipDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { isBookmarked, getBookmark, toggleBookmark, updateBookmarkTracking, openDrawer } =
    useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const {
    data: result,
    loading,
    error,
    reload,
  } = useAsyncData(() => fetchScholarshipBySlug(slug), [slug]);

  const scholarship = result?.data ?? null;
  const primaryCategory = scholarship?.categories[0];

  const breadcrumbItems: BreadcrumbItem[] | undefined = scholarship
    ? [
        { label: t.nav.home, to: '/' },
        { label: t.nav.scholarships, to: '/scholarships' },
        ...(primaryCategory
          ? [
              {
                label: primaryCategory,
                to: `/scholarships?category=${encodeURIComponent(primaryCategory)}`,
              },
            ]
          : []),
        { label: scholarship.title },
      ]
    : undefined;

  useDocumentTitle(
    scholarship ? `${scholarship.title} – AspireHub` : 'Scholarship Details – AspireHub',
    scholarship?.eligibilitySummary,
    scholarship
      ? {
          type: 'article',
          breadcrumbs: breadcrumbItems,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: scholarship.title,
            description: scholarship.eligibilitySummary,
            provider: {
              '@type': 'Organization',
              name: scholarship.organization,
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

  if (!scholarship) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Scholarship not found"
          description="The scholarship entry you requested could not be found or may have moved."
          actionLabel={t.tracker.browseOpportunities}
          onAction={() => {
            window.location.href = '/scholarships';
          }}
        />
      </div>
    );
  }

  const isExpired = scholarship.status === 'Expired';
  const saved = isBookmarked(scholarship.id);
  const trackedEntry = getBookmark(scholarship.id);
  const related = SCHOLARSHIPS_DATA.filter(
    (s) => s.id !== scholarship.id && s.degreeLevel === scholarship.degreeLevel
  ).slice(0, 3);

  const mergedCrossLinks: InternalLinkRef[] = [];
  const seenTo = new Set<string>();
  for (const item of [...(scholarship.relatedLinks ?? []), ...SCHOLARSHIP_PREP_LINKS]) {
    if (!seenTo.has(item.to)) {
      seenTo.add(item.to);
      mergedCrossLinks.push(item);
    }
  }

  const stageOptions: { value: ScholarshipTrackingStage; label: string }[] = [
    { value: 'Researching', label: t.tracker.stageResearching },
    { value: 'Preparing Docs', label: t.tracker.stagePreparing },
    { value: 'Submitted', label: t.tracker.stageSubmitted },
    { value: 'Shortlisted', label: t.tracker.stageShortlisted },
  ];

  function handleBookmarkToggle() {
    if (!scholarship) return;
    const added = toggleBookmark({
      id: scholarship.id,
      type: 'scholarship',
      title: scholarship.title,
      subtitle: `${scholarship.country} · ${scholarship.degreeLevel}`,
      path: `/scholarships/${scholarship.slug}`,
      deadline: scholarship.deadline,
      isExpired,
    });
    showToast(added ? t.common.savedToBookmarks : t.common.removedFromBookmarks, 'info');
  }

  return (
    <div>
      <PageHeader
        sectionLabel={`${scholarship.country} · ${scholarship.degreeLevel} · ${scholarship.fundingType}`}
        title={scholarship.title}
        subtitle={scholarship.organization}
        breadcrumbCurrent={scholarship.title}
        parentLink={{ label: t.nav.scholarships, to: '/scholarships' }}
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
        <div className="mb-6">
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202A44] dark:text-slate-200 hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t.sections.viewAllScholarships}
          </Link>
        </div>

        {isExpired && (
          <div
            role="alert"
            className="mb-8 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl p-5 flex items-start gap-3.5"
          >
            <AlertTriangle className="w-5 h-5 text-red-700 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-red-900 dark:text-red-200">
                {t.common.expired} ({scholarship.deadline})
              </h2>
              <p className="text-sm text-red-800/90 dark:text-red-200/90 mt-1 leading-relaxed">
                This scholarship entry is currently closed and retained for planning and archive
                reference. Visit the official portal below to check whether a newer annual cycle has
                been announced.
              </p>
            </div>
          </div>
        )}

        <div className="mb-8 bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
            {scholarship.dataNotice}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] dark:text-white mb-3">
                Programme Overview
              </h2>
              <p className="text-base text-[#202A44]/90 dark:text-slate-300 leading-relaxed">
                {scholarship.fullDescription}
              </p>
            </section>

            <section className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] dark:text-white mb-4">
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {scholarship.eligibilityCriteria.map((criterion, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-[#202A44]/90 dark:text-slate-300"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] dark:text-white mb-4">
                Required Documents
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scholarship.requiredDocuments.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200/70 dark:border-slate-700 text-sm text-[#202A44] dark:text-slate-200"
                  >
                    <FileCheck className="w-4 h-4 text-[#101B3D] dark:text-[#4DA8FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] dark:text-white mb-4">
                Scholarship Benefits
              </h2>
              <ul className="space-y-2.5 list-disc pl-5 text-sm sm:text-base text-[#202A44]/90 dark:text-slate-300 leading-relaxed">
                {scholarship.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </section>

            <section className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] dark:text-white mb-4">
                Application Process
              </h2>
              <ol className="space-y-4">
                {scholarship.applicationProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-lg bg-[#101B3D] dark:bg-[#6956D8] text-white font-mono text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
                      0{idx + 1}
                    </span>
                    <p className="text-sm sm:text-base text-[#202A44]/90 dark:text-slate-300 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <RelatedCrossLinks
              heading={t.sections.crossLinksHeading}
              links={mergedCrossLinks.slice(0, 4)}
            />
          </div>

          {/* Sidebar Summary & Inline Application Tracker */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-[#101B3D] dark:text-white">
                Key Facts &amp; Dates
              </h2>

              <dl className="space-y-3.5 text-sm">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4" aria-hidden="true" />
                    {t.filters.countryLabel}
                  </dt>
                  <dd className="font-semibold text-[#101B3D] dark:text-white text-right">
                    {scholarship.country}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    {t.filters.degreeLabel}
                  </dt>
                  <dd className="font-semibold text-[#101B3D] dark:text-white text-right">
                    {scholarship.degreeLevel}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500 dark:text-slate-400">{t.filters.subjectLabel}</dt>
                  <dd className="font-medium text-[#101B3D] dark:text-slate-200 text-right">
                    {scholarship.subjects.join(', ')}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500 dark:text-slate-400">{t.filters.fundingLabel}</dt>
                  <dd className="font-semibold text-[#6956D8] dark:text-[#4DA8FF] text-right">
                    {scholarship.fundingType}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Deadline
                  </dt>
                  <dd
                    className={`font-semibold text-right tabular-nums ${
                      isExpired ? 'text-red-700 dark:text-red-400' : 'text-[#101B3D] dark:text-white'
                    }`}
                  >
                    {scholarship.deadline}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500 dark:text-slate-400">{t.common.updated}</dt>
                  <dd className="font-medium text-[#101B3D] dark:text-slate-200 text-right tabular-nums">
                    {formatReadableDate(scholarship.lastUpdated)}
                  </dd>
                </div>

                {scholarship.importantDates.map((d) => (
                  <div key={d.label} className="pt-1">
                    <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {d.label}
                    </dt>
                    <dd className="text-xs text-[#202A44] dark:text-slate-300 mt-0.5 leading-relaxed">
                      {d.date}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="pt-2 space-y-2.5">
                <a
                  href={scholarship.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors ${
                    isExpired
                      ? 'bg-slate-800 hover:bg-slate-900 text-white'
                      : 'bg-[#6956D8] hover:bg-[#5542C0] text-white'
                  }`}
                >
                  {isExpired ? 'Check Official Archive / Updates' : t.common.officialLink}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleBookmarkToggle}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border transition-colors cursor-pointer ${
                    saved
                      ? 'bg-[#6956D8]/10 text-[#6956D8] dark:text-[#4DA8FF] border-[#6956D8]/40'
                      : 'bg-[#F7F8FC] dark:bg-[#0F1733] text-[#101B3D] dark:text-white border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
                  {saved ? t.common.saved : t.common.save}
                </button>
              </div>
            </div>

            {saved && trackedEntry && (
              <div className="bg-white dark:bg-[#141E3D] border border-[#6956D8]/35 rounded-xl p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#101B3D] dark:text-white flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
                    {t.tracker.scholarshipsTab}
                  </h3>
                  <button
                    type="button"
                    onClick={openDrawer}
                    className="text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:underline cursor-pointer"
                  >
                    {t.tracker.drawerTitle}
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="detail-stage"
                    className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1"
                  >
                    {t.tracker.stageLabel}
                  </label>
                  <select
                    id="detail-stage"
                    value={trackedEntry.trackingStage ?? 'Researching'}
                    onChange={(e) => {
                      updateBookmarkTracking(scholarship.id, {
                        trackingStage: e.target.value as ScholarshipTrackingStage,
                      });
                      showToast(t.tracker.stageLabel + ': ' + e.target.value, 'info');
                    }}
                    className="w-full px-3 py-2 text-xs font-medium bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                  >
                    {stageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="detail-reminder"
                    className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1"
                  >
                    {t.tracker.reminderLabel}
                  </label>
                  <input
                    id="detail-reminder"
                    type="date"
                    value={trackedEntry.reminderDate ?? ''}
                    onChange={(e) =>
                      updateBookmarkTracking(scholarship.id, { reminderDate: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-medium bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="detail-notes"
                    className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1"
                  >
                    {t.tracker.notesLabel}
                  </label>
                  <input
                    id="detail-notes"
                    type="text"
                    value={trackedEntry.notes ?? ''}
                    onChange={(e) =>
                      updateBookmarkTracking(scholarship.id, { notes: e.target.value })
                    }
                    placeholder={t.tracker.notesPlaceholder}
                    className="w-full px-3 py-2 text-xs bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                  />
                </div>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-[#101B3D] dark:text-white mb-6">
              Related Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <ScholarshipCard key={item.id} scholarship={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
