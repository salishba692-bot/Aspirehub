import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, RotateCcw, Search } from 'lucide-react';
import { SCHOLARSHIP_CATEGORIES } from '../data/scholarshipsData';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchScholarships } from '../services/api';
import { matchesSearch } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';
import { ScholarshipCard } from '../components/ScholarshipCard';

export function ScholarshipsPage() {
  useDocumentTitle(
    'Scholarship Hub — AspireHub',
    'Browse Pakistan and international scholarships, filter by degree level, funding type, and status, and verify official deadlines.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [degreeFilter, setDegreeFilter] = useState('All');
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
      if (fundingFilter !== 'All' && item.fundingType !== fundingFilter) return false;
      if (statusFilter === 'Open / Official' && item.status === 'Expired') return false;
      if (statusFilter === 'Expired' && item.status !== 'Expired') return false;

      return matchesSearch(searchQuery, [
        item.title,
        item.country,
        item.organization,
        item.degreeLevel,
        item.eligibilitySummary,
      ]);
    });
  }, [
    scholarships,
    selectedCategory,
    countryFilter,
    degreeFilter,
    fundingFilter,
    statusFilter,
    searchQuery,
  ]);

  function resetAllFilters() {
    setSelectedCategory('All');
    setSearchQuery('');
    setCountryFilter('All');
    setDegreeFilter('All');
    setFundingFilter('All');
    setStatusFilter('All');
    setSearchParams({});
  }

  return (
    <div>
      <PageHeader
        sectionLabel="Scholarship Directory"
        title="Scholarship Hub"
        subtitle="Explore verified official scholarship portals alongside clearly labeled sample templates and archived expired cycles."
        breadcrumbCurrent="Scholarships"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Data Transparency Notice */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#6956D8] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#202A44]/85 leading-relaxed">
            <strong className="text-[#101B3D]">Transparency Standard:</strong> AspireHub never
            fabricates deadlines or eligibility criteria. Entries marked{' '}
            <span className="font-semibold text-[#101B3D]">Official Portal</span> link directly to
            real host websites so you can verify live cycle dates, while illustrative records and
            past cycles are explicitly marked as <span className="font-semibold">Sample Data</span>{' '}
            or <span className="font-semibold text-red-700">Expired</span>.
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
                    ? 'bg-[#101B3D] text-white'
                    : 'bg-white text-[#202A44] border border-slate-200 hover:border-[#6956D8]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Multi-Filters Bar */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
          <div className="lg:col-span-4">
            <label htmlFor="sch-search" className="block text-xs font-semibold text-[#101B3D] mb-1.5">
              Search Scholarships
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
                placeholder="Title, country, organization..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] border border-slate-200 rounded-lg text-[#101B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-country" className="block text-xs font-semibold text-[#101B3D] mb-1.5">
              Country
            </label>
            <select
              id="sch-country"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] border border-slate-200 rounded-lg text-[#101B3D] focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-degree" className="block text-xs font-semibold text-[#101B3D] mb-1.5">
              Degree Level
            </label>
            <select
              id="sch-degree"
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] border border-slate-200 rounded-lg text-[#101B3D] focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              <option value="All">All Degrees</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-funding" className="block text-xs font-semibold text-[#101B3D] mb-1.5">
              Funding Type
            </label>
            <select
              id="sch-funding"
              value={fundingFilter}
              onChange={(e) => setFundingFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] border border-slate-200 rounded-lg text-[#101B3D] focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              <option value="All">All Funding</option>
              <option value="Fully Funded">Fully Funded</option>
              <option value="Partial Funding">Partial Funding</option>
              <option value="Tuition Waiver">Tuition Waiver</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="sch-status" className="block text-xs font-semibold text-[#101B3D] mb-1.5">
              Application Status
            </label>
            <select
              id="sch-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] border border-slate-200 rounded-lg text-[#101B3D] focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
            >
              <option value="All">All Statuses</option>
              <option value="Open / Official">Active / Official Portal</option>
              <option value="Expired">Expired (Archived)</option>
            </select>
          </div>
        </div>

        {/* Count & Reset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-[#202A44]/80 tabular-nums">
            Showing <span className="font-semibold text-[#101B3D]">{filteredScholarships.length}</span>{' '}
            of {scholarships.length} scholarships
          </p>

          {(selectedCategory !== 'All' ||
            searchQuery ||
            countryFilter !== 'All' ||
            degreeFilter !== 'All' ||
            fundingFilter !== 'All' ||
            statusFilter !== 'All') && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6956D8] hover:text-[#5542C0] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset Filters
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
            description="Try clearing one of the country, degree, or status filters, or search with a broader keyword."
            actionLabel="Reset All Filters"
            onAction={resetAllFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
