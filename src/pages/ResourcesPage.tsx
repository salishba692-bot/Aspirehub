import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Globe2, RotateCcw, Search } from 'lucide-react';
import { RESOURCE_CATEGORIES } from '../data/resourcesData';
import { useLanguage } from '../context/LanguageContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchFreeResources } from '../services/api';
import { matchesSearch } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { ResourceCard } from '../components/ResourceCard';

export function ResourcesPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    'Learning Resources, Free Certifications & International Student Guides – AspireHub',
    'Read complete on-site study plans, free certification & Coursera financial aid guides, ATS CV templates, interview handbooks, and international student prep guides.',
    {
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'AspireHub Learning Resources & Career Guides',
        description:
          'Complete on-site learning roadmaps, free certifications, resume blueprints, and international student preparation guides.',
      },
    }
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [internationalOnly, setInternationalOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const paramCat = searchParams.get('category');
    setSelectedCategory(paramCat || 'All');
  }, [searchParams]);

  const { data: result, loading, error, reload } = useAsyncData(() => fetchFreeResources(), []);
  const resources = result?.data ?? [];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      if (selectedCategory !== 'All' && res.category !== selectedCategory) return false;
      if (internationalOnly && !res.internationalFocus) return false;
      return matchesSearch(searchQuery, [res.title, res.provider, res.category, res.description]);
    });
  }, [resources, selectedCategory, internationalOnly, searchQuery]);

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
    setInternationalOnly(false);
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div>
      <PageHeader
        sectionLabel={t.pages.resourcesLabel}
        title={t.pages.resourcesTitle}
        subtitle={t.pages.resourcesSubtitle}
        breadcrumbCurrent={t.nav.resources}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
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
                  placeholder="Search courses, certifications, IELTS, CV templates..."
                  aria-label={t.filters.searchLabel}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                />
              </div>

              <button
                type="button"
                aria-pressed={internationalOnly}
                onClick={() => setInternationalOnly((prev) => !prev)}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                  internationalOnly
                    ? 'bg-[#6956D8] text-white border-[#6956D8]'
                    : 'bg-[#F7F8FC] dark:bg-[#0F1733] text-[#202A44] dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" aria-hidden="true" />
                {t.filters.internationalOnly}
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#202A44]/80 dark:text-slate-300 tabular-nums">
                <strong className="text-[#101B3D] dark:text-white">{filteredResources.length}</strong> /{' '}
                {resources.length}
              </span>
              {(selectedCategory !== 'All' || internationalOnly || searchQuery) && (
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
            aria-label="Resource Categories"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
          >
            {['All', ...RESOURCE_CATEGORIES].map((cat) => {
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

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : filteredResources.length === 0 ? (
          <EmptyState
            title="No resources matched your filters"
            description="Try selecting All categories, turning off the International filter, or searching with another term such as certifications, IELTS, or resume."
            actionLabel={t.common.resetFilters}
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}

        <RelatedCrossLinks
          links={[
            {
              title: 'ATS Resume & Academic CV Bullet Generator',
              description: 'Turn course projects into structured CV bullet points.',
              to: '/toolkit?tab=cv-tips',
              badge: 'Toolkit',
            },
            {
              title: 'Scholarship Hub',
              description: 'Apply your Academic CV and English test plans to verified awards.',
              to: '/scholarships',
              badge: 'Scholarship',
            },
            {
              title: 'Freelancing & Career Hub',
              description: 'Translate new digital skills into remote internships or freelance work.',
              to: '/freelancing',
              badge: 'Freelancing',
            },
          ]}
        />
      </div>
    </div>
  );
}
