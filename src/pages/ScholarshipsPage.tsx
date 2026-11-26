import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, RotateCcw, Search } from 'lucide-react';
import { SCHOLARSHIP_CATEGORIES, SCHOLARSHIP_SUBJECTS } from '../data/scholarshipsData';
import { useLanguage } from '../context/LanguageContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchScholarships } from '../services/api';
import { matchesSearch } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { ScholarshipCard } from '../components/ScholarshipCard';

export function ScholarshipsPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    'Global Scholarship Finder — AspireHub',
    'Browse international and regional scholarships by country, degree level, subject discipline, funding type, and status with official application portal links.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [degreeFilter, setDegreeFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [fundingFilter, setFundingFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat) {
      setSelectedCategory(paramCat);
    }
  }, [searchParams]);

  const { data: result, loading, error, reload } = useAsyncData(() => fetchScholarships(), []);
  const scholarships = result?.data ?? [];

  const countries = useMemo(() => {
    const set = new Set(scholarships.map((s) => s.country));
    return ['All', ...Array.from(set).sort()];
  }, [scholarships]);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      if (
        selectedCategory !== 'All' &&
        !item.categories.includes(selectedCategory as (typeof item.categories)[number])
      ) {
        return false;
      }
      if (countryFilter !== 'All' && item.country !== countryFilter) return false;
      if (degreeFilter !== 'All' && item.degreeLevel !== degreeFilter) return false;
      if (
        subjectFilter !== 'All' &&
        !item.subjects.includes(subjectFilter) &&
        !item.subjects.includes('All Disciplines')
      ) {
        return false;
      }
      if (fundingFilter !== 'All' && item.fundingType !== fundingFilter) return false;
      if (statusFilter === 'Open / Official' && item.status === 'Expired') return false;
      if (statusFilter === 'Expired' && item.status !== 'Expired') return false;

      return matchesSearch(searchQuery, [
        item.title,
        item.country,
        item.organization,
        item.degreeLevel,
        item.eligibilitySummary,
        ...item.subjects,
      ]);
    });
  }, [
    scholarships,
    selectedCategory,
    countryFilter,
    degreeFilter,
    subjectFilter,
    fundingFilter,
    statusFilter,
    searchQuery,
  ]);

  function resetAllFilters() {
    setSelectedCategory('All');
    setSearchQuery('');
    setCountryFilter('All');
    setDegreeFilter('All');
    setSubjectFilter('All');
    setFundingFilter('All');
    setStatusFilter('All');
    setSearchParams({});
  }

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery ||
    countryFilter !== 'All' ||
    degreeFilter !== 'All' ||
    subjectFilter !== 'All' ||
    fundingFilter !== 'All' ||
    statusFilter !== 'All';

  return (
    <div>
      <PageHeader
        sectionLabel={t.pages.scholarshipsLabel}
        title={t.pages.scholarshipsTitle}
        subtitle={t.pages.scholarshipsSubtitle}
        breadcrumbCurrent={t.nav.scholarships}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Data Transparency Notice */}
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
            <strong className="text-[#101B3D] dark:text-white">Transparency Standard:</strong> AspireHub never
            fabricates deadlines or eligibility criteria. Entries marked{' '}
            <span className="font-semibold text-[#101B3D] dark:text-white">{t.common.officialPortal}</span> link directly to
            real host websites so you can verify live cycle dates, while illustrative records and
            past cycles are explicitly marked as <span className="font-semibold">{t.common.sampleData}</span>{' '}
            or <span className="font-semibold text-red-700 dark:text-red-400">{t.common.expired}</span>.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Scholarship Categories"
          className="flex items-center gap-2 overflow-x-auto pb-2"
        >
          {['All', ...SCHOLARSHIP_CATEGORIES].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (cat === 'All') {
                    setSearchParams({});
                  } else {
                    setSearchParams({ category: cat });
                  }
                }}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#101B3D] dark:bg-[#6956D8] text-white'
                    : 'bg-white dark:bg-[#141E3D] text-[#202A44] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40'
                }`}
              >
                {cat === 'All' ? t.common.all : cat}
              </button>
            );
          })}
        </div>

        {/* Quick Destination Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
            {t.filters.countryLabel}:
          </span>
          {[
            'All',
            'India',
            'London (UK)',
            'New York (USA)',
            'Pakistan',
            'United Kingdom',
            'United States',
            'Germany',
          ].map((dest) => {
            const active = countryFilter === dest;
            return (
              <button
                key={dest}
                type="button"
                onClick={() => setCountryFilter(dest)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#6956D8] text-white'
                    : 'bg-white dark:bg-[#141E3D] text-[#202A44] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40'
                }`}
              >
                {dest === 'All' ? t.common.all : dest}
              </button>
            );
          })}
        </div>

        {/* Search & Multi-Filters Bar */}
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
          <div className="sm:col-span-2 lg:col-span-3">
            <label htmlFor="sch-search" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
              {t.filters.searchLabel}
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="sch-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Country, title, field..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-country" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
              {t.filters.countryLabel}
            </label>
            <select
              id="sch-country"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country === 'All' ? t.common.all : country}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-degree" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
              {t.filters.degreeLabel}
            </label>
            <select
              id="sch-degree"
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              <option value="All">{t.filters.allDegrees}</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-subject" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
              {t.filters.subjectLabel}
            </label>
            <select
              id="sch-subject"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              <option value="All">{t.filters.allSubjects}</option>
              {SCHOLARSHIP_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="sch-funding" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
              {t.filters.fundingLabel}
            </label>
            <select
              id="sch-funding"
              value={fundingFilter}
              onChange={(e) => setFundingFilter(e.target.value)}
              className="w-full px-2.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              <option value="All">{t.common.all}</option>
              <option value="Fully Funded">Fully Funded</option>
              <option value="Partial Funding">Partial</option>
              <option value="Tuition Waiver">Tuition Waiver</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-status" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
              {t.filters.statusLabel}
            </label>
            <select
              id="sch-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              <option value="All">{t.filters.allStatuses}</option>
              <option value="Open / Official">Active / Official Portal</option>
              <option value="Expired">{t.common.expired}</option>
            </select>
          </div>
        </div>

        {/* Count & Reset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-[#202A44]/80 dark:text-slate-300 tabular-nums">
            <span className="font-semibold text-[#101B3D] dark:text-white">{filteredScholarships.length}</span>{' '}
            / {scholarships.length}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              {t.filters.reset}
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : filteredScholarships.length === 0 ? (
          <EmptyState
            title="No scholarships match your current filters"
            description="Try clearing one of the country, degree, subject, or status filters, or search with a broader keyword."
            actionLabel={t.common.resetFilters}
            onAction={resetAllFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}

        <RelatedCrossLinks
          links={[
            {
              title: 'Scholarship Eligibility Checklist',
              description: 'Audit your academic transcripts, SOP drafts, and test scores.',
              to: '/toolkit?tab=eligibility',
              badge: 'Toolkit',
            },
            {
              title: 'How to Write a Standout Statement of Purpose',
              description: 'Follow our 4-part narrative essay method for selection committees.',
              to: '/blog/how-to-write-a-standout-statement-of-purpose',
              badge: 'Blog',
            },
            {
              title: 'International Student Readiness & English Tests',
              description: 'Plan IELTS, TOEFL, GRE, and official document attestation.',
              to: '/resources/international-student-readiness-and-english-tests-guide',
              badge: 'Resource',
            },
            {
              title: 'Remote Jobs & Global Internships Guide',
              description: 'Explore remote career opportunities alongside or after study abroad.',
              to: '/freelancing/remote-jobs-and-global-internships-guide',
              badge: 'Freelancing',
            },
          ]}
        />
      </div>
    </div>
  );
}
