import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import { RESOURCE_CATEGORIES } from '../data/resourcesData';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchFreeResources } from '../services/api';
import { matchesSearch } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';
import { ResourceCard } from '../components/ResourceCard';

export function ResourcesPage() {
  useDocumentTitle(
    'Free Resources & Career Guides – AspireHub',
    'Read complete on-site study plans, ATS CV templates, cover letter frameworks, interview handbooks, and tech learning roadmaps on AspireHub.',
    {
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'AspireHub Free Resources & Career Guides',
        description:
          'Complete on-site learning roadmaps, resume blueprints, cover letter templates, and interview preparation guides.',
      },
    }
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

  const { data: result, loading, error, reload } = useAsyncData(() => fetchFreeResources(), []);
  const resources = result?.data ?? [];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      if (selectedCategory !== 'All' && res.category !== selectedCategory) return false;
      return matchesSearch(searchQuery, [res.title, res.provider, res.category, res.description]);
    });
  }, [resources, selectedCategory, searchQuery]);

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
        sectionLabel="On-Site Learning & Career Toolkit"
        title="Free Resources"
        subtitle="Read complete study curriculums, copyable ATS CV templates, cover letter frameworks, interview handbooks, and tech roadmaps directly inside AspireHub."
        breadcrumbCurrent="Free Resources"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
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
                placeholder="Search courses, CV templates, interview prep..."
                aria-label="Search free resources"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] border border-slate-200 rounded-lg text-[#101B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#202A44]/80 tabular-nums">
                <strong className="text-[#101B3D]">{filteredResources.length}</strong> of{' '}
                {resources.length} guides
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
            aria-label="Resource Categories"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100"
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

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : filteredResources.length === 0 ? (
          <EmptyState
            title="No resources matched your search"
            description="Try selecting All categories or searching with another term such as resume, roadmap, or CS50."
            actionLabel="Show All Resources"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
