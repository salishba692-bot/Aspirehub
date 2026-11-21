import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
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
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchScholarshipBySlug } from '../services/api';
import { InternalLinkRef } from '../types';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { ScholarshipCard } from '../components/ScholarshipCard';

const SCHOLARSHIP_PREP_LINKS: InternalLinkRef[] = [
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
  {
    title: 'Interview Preparation Complete Handbook',
    description: 'Practice scholarship panel questions using the STAR method.',
    to: '/resources/interview-preparation-complete-handbook',
    badge: 'Resource',
  },
];

export function ScholarshipDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();

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
        { label: 'Home', to: '/' },
        { label: 'Scholarships', to: '/scholarships' },
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
          actionLabel="Back to Scholarship Hub"
          onAction={() => {
            window.location.href = '/scholarships';
          }}
        />
      </div>
    );
  }

  const isExpired = scholarship.status === 'Expired';
  const saved = isBookmarked(scholarship.id);
  const related = SCHOLARSHIPS_DATA.filter(
    (s) => s.id !== scholarship.id && s.degreeLevel === scholarship.degreeLevel
  ).slice(0, 3);

  return (
    <div>
      <PageHeader
        sectionLabel={`${scholarship.country} · ${scholarship.degreeLevel} · ${scholarship.fundingType}`}
        title={scholarship.title}
        subtitle={scholarship.organization}
        breadcrumbCurrent={scholarship.title}
        parentLink={{ label: 'Scholarships', to: '/scholarships' }}
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
            to="/scholarships"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202A44] hover:text-[#6956D8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Scholarship Hub
          </Link>
        </div>

        {isExpired && (
          <div
            role="alert"
            className="mb-8 bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3.5"
          >
            <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-red-900">
                Application Cycle Expired ({scholarship.deadline})
              </h2>
              <p className="text-sm text-red-800/90 mt-1 leading-relaxed">
                This scholarship entry is currently closed and retained for planning and archive
                reference. Visit the official portal below to check whether a newer annual cycle has
                been announced.
              </p>
            </div>
          </div>
        )}

        <div className="mb-8 bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#6956D8] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#202A44]/85 leading-relaxed">
            {scholarship.dataNotice}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-3">Programme Overview</h2>
              <p className="text-base text-[#202A44]/90 leading-relaxed">
                {scholarship.fullDescription}
              </p>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-4">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {scholarship.eligibilityCriteria.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#202A44]/90">
                    <CheckCircle2
                      className="w-5 h-5 text-[#6956D8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-4">Required Documents</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scholarship.requiredDocuments.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#F7F8FC] border border-slate-200/70 text-sm text-[#202A44]"
                  >
                    <FileCheck className="w-4 h-4 text-[#101B3D] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-4">Scholarship Benefits</h2>
              <ul className="space-y-2.5 list-disc pl-5 text-sm sm:text-base text-[#202A44]/90 leading-relaxed">
                {scholarship.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#101B3D] mb-4">Application Process</h2>
              <ol className="space-y-4">
                {scholarship.applicationProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-lg bg-[#101B3D] text-white font-mono text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
                      0{idx + 1}
                    </span>
                    <p className="text-sm sm:text-base text-[#202A44]/90 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <RelatedCrossLinks
              heading="Prepare Your Scholarship Application Inside AspireHub"
              links={SCHOLARSHIP_PREP_LINKS}
            />
          </div>

          {/* Sidebar Summary */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-[#101B3D]">Key Facts &amp; Dates</h2>

              <dl className="space-y-3.5 text-sm">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <dt className="text-slate-500 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4" aria-hidden="true" />
                    Country
                  </dt>
                  <dd className="font-semibold text-[#101B3D] text-right">{scholarship.country}</dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <dt className="text-slate-500 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    Degree Level
                  </dt>
                  <dd className="font-semibold text-[#101B3D] text-right">
                    {scholarship.degreeLevel}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <dt className="text-slate-500">Funding</dt>
                  <dd className="font-semibold text-[#6956D8] text-right">
                    {scholarship.fundingType}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <dt className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Deadline
                  </dt>
                  <dd
                    className={`font-semibold text-right tabular-nums ${
                      isExpired ? 'text-red-700' : 'text-[#101B3D]'
                    }`}
                  >
                    {scholarship.deadline}
                  </dd>
                </div>

                {scholarship.importantDates.map((d) => (
                  <div key={d.label} className="pt-1">
                    <dt className="text-xs font-semibold text-slate-500">{d.label}</dt>
                    <dd className="text-xs text-[#202A44] mt-0.5 leading-relaxed">{d.date}</dd>
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
                  {isExpired ? 'Check Official Archive / Updates' : 'Official Apply Now'}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark({
                      id: scholarship.id,
                      type: 'scholarship',
                      title: scholarship.title,
                      subtitle: `${scholarship.country} · ${scholarship.degreeLevel}`,
                      path: `/scholarships/${scholarship.slug}`,
                    })
                  }
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border transition-colors cursor-pointer ${
                    saved
                      ? 'bg-[#6956D8]/10 text-[#6956D8] border-[#6956D8]/40'
                      : 'bg-[#F7F8FC] text-[#101B3D] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
                  {saved ? 'Saved to Bookmarks' : 'Save Scholarship'}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#101B3D] mb-6">Related Opportunities</h2>
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
