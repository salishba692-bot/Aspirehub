import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import { FREELANCING_CATEGORIES } from '../data/freelancingData';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchFreelancingGuides } from '../services/api';
import { matchesSearch } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { GuideCard } from '../components/GuideCard';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';

export function FreelancingPage() {
  useDocumentTitle(
    'Freelancing Guide — AspireHub',
    'Step-by-step freelancing guides covering Fiverr, Upwork, portfolio creation, client communication, pricing, and avoiding beginner mistakes.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const paramCat = searchParams.get('category');
    setSelectedCategory(paramCat || 'All');
  }, [searchParams]);

  const { data: result, loading, error, reload } = useAsyncData(() => fetchFreelancingGuides(), []);
  const guides = result?.data ?? [];

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      if (selectedCategory !== 'All' && guide.category !== selectedCategory) return false;
      return matchesSearch(searchQuery, [guide.title, guide.category, guide.shortDescription]);
    });
  }, [guides, selectedCategory, searchQuery]);

  function handleCategoryChange(cat: string) {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams, { replace: true });
  }

  function resetFilters() {
    setSelectedCategory('All');
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div>
      <PageHeader
        sectionLabel="Skill & Career Playbooks"
        title="Freelancing Guide"
        subtitle="Practical, beginner-friendly step-by-step guides to help you choose a skill, build portfolio proof, land your first client, and price your work sustainably."
        breadcrumbCurrent="Freelancing"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search & Filter Controls */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Fiverr, Upwork, portfolio, pricing..."
                aria-label="Search freelancing guides"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] border border-slate-200 rounded-lg text-[#101B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#202A44]/80 tabular-nums">
                <strong className="text-[#101B3D]">{filteredGuides.length}</strong> of {guides.length}{' '}
                guides
              </span>
              {(selectedCategory !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6956D8] hover:text-[#5542C0] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  Reset
                </button>
              )}
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Freelancing Guide Categories"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100"
          >
            {['All', ...FREELANCING_CATEGORIES].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#101B3D] text-white'
                      : 'bg-[#F7F8FC] text-[#202A44] border border-slate-200 hover:border-[#6956D8]/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : filteredGuides.length === 0 ? (
          <EmptyState
            title="No freelancing guides matched your search"
            description="Try searching for a platform like Fiverr or Upwork, or switch back to All categories."
            actionLabel="Show All Guides"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
