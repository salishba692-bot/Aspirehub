import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import { FREELANCING_CATEGORIES } from '../data/freelancingData';
import { useLanguage } from '../context/LanguageContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchFreelancingGuides } from '../services/api';
import { matchesSearch } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { GuideCard } from '../components/GuideCard';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';

export function FreelancingPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    'Freelancing & Career Hub — AspireHub',
    'Remote job search guides, international internships, skill development roadmaps, Fiverr/Upwork playbooks, portfolio creation, and client pricing.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
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
      if (difficultyFilter !== 'All' && guide.difficulty !== difficultyFilter) return false;
      return matchesSearch(searchQuery, [
        guide.title,
        guide.category,
        guide.shortDescription,
        guide.regionScope,
      ]);
    });
  }, [guides, selectedCategory, difficultyFilter, searchQuery]);

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
    setDifficultyFilter('All');
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div>
      <PageHeader
        sectionLabel={t.pages.freelancingLabel}
        title={t.pages.freelancingTitle}
        subtitle={t.pages.freelancingSubtitle}
        breadcrumbCurrent={t.nav.freelancing}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search & Filter Controls */}
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search remote jobs, internships, Fiverr, Upwork..."
                  aria-label={t.filters.searchLabel}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                />
              </div>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                aria-label={t.filters.levelLabel}
                className="px-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              >
                <option value="All">{t.filters.allLevels}</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#202A44]/80 dark:text-slate-300 tabular-nums">
                <strong className="text-[#101B3D] dark:text-white">{filteredGuides.length}</strong> /{' '}
                {guides.length}
              </span>
              {(selectedCategory !== 'All' || difficultyFilter !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.filters.reset}
                </button>
              )}
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Freelancing and Career Categories"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
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
                      ? 'bg-[#101B3D] dark:bg-[#6956D8] text-white'
                      : 'bg-[#F7F8FC] dark:bg-[#0F1733] text-[#202A44] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40'
                  }`}
                >
                  {cat === 'All' ? t.common.all : cat}
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
            title="No career or freelancing guides matched your filters"
            description="Try searching for remote jobs, internships, Fiverr, or switch back to All categories."
            actionLabel={t.common.resetFilters}
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}

        <RelatedCrossLinks
          links={[
            {
              title: 'Career Interest Quiz',
              description: 'Discover the freelance and remote track that fits your strengths.',
              to: '/toolkit?tab=career-quiz',
              badge: 'Toolkit',
            },
            {
              title: 'ATS Resume & CV Bullet Generator',
              description: 'Draft metric-driven bullets for remote job and internship CVs.',
              to: '/toolkit?tab=cv-tips',
              badge: 'Toolkit',
            },
            {
              title: 'Practical Skill Assessment Quiz',
              description: 'Test your knowledge of web/AI, client proposals, or scholarships.',
              to: '/toolkit?tab=skill-quiz',
              badge: 'Toolkit',
            },
            {
              title: 'One-Page ATS Resume Blueprint',
              description: 'Read our complete template guide and interview preparation handbook.',
              to: '/resources/one-page-ats-resume-blueprint',
              badge: 'Resource',
            },
          ]}
        />
      </div>
    </div>
  );
}
