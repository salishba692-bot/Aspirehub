import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, GitCompareArrows, Info, RotateCcw, Search, X } from 'lucide-react';
import { AI_TOOL_CATEGORIES } from '../data/aiToolsData';
import { useLanguage } from '../context/LanguageContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchAITools } from '../services/api';
import { matchesSearch } from '../utils/formatters';
import { AIToolCard } from '../components/AIToolCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';

export function AIToolsPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    'AI Tools Directory & Comparison – AspireHub',
    'Browse and compare DeepSeek, Grok, ChatGPT, Claude, Lovable, Replit, Readdy, NotebookLM, and more AI tools on AspireHub.'
  );

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [pricingFilter, setPricingFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareIds, setCompareIds] = useState<string[]>(['ai-deepseek', 'ai-grok', 'ai-chatgpt']);

  useEffect(() => {
    const paramCat = searchParams.get('category');
    setSelectedCategory(paramCat || 'All');
  }, [searchParams]);

  const { data: result, loading, error, reload } = useAsyncData(() => fetchAITools(), []);
  const tools = result?.data ?? [];

  const popularTools = useMemo(() => tools.filter((tool) => tool.popular).slice(0, 6), [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (selectedCategory !== 'All' && tool.category !== selectedCategory) return false;
      if (pricingFilter !== 'All' && tool.pricingType !== pricingFilter) return false;
      return matchesSearch(searchQuery, [
        tool.name,
        tool.category,
        tool.shortDescription,
        ...tool.mainFeatures,
      ]);
    });
  }, [tools, selectedCategory, pricingFilter, searchQuery]);

  const comparedTools = useMemo(
    () => tools.filter((tool) => compareIds.includes(tool.id)),
    [tools, compareIds]
  );

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  }

  function openComparisonPage() {
    const slugs = comparedTools.map((tool) => tool.slug);
    const query = slugs.length > 0 ? `?tools=${slugs.join(',')}` : '';
    navigate(`/ai-tools/compare${query}`);
  }

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
    setPricingFilter('All');
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div>
      <PageHeader
        sectionLabel={t.pages.aiToolsLabel}
        title={t.pages.aiToolsTitle}
        subtitle={t.pages.aiToolsSubtitle}
        breadcrumbCurrent={t.nav.aiTools}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Honesty Banner */}
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
            <strong className="text-[#101B3D] dark:text-white">{t.common.verifiedTool}:</strong> Every listed tool links
            to its official website. Pricing tiers and free limits evolve rapidly—always confirm
            current plan quotas on each official site.
          </p>
        </div>

        {/* Interactive Compare Launcher Bar */}
        <section
          aria-label="Comparison Selection Bar"
          className="bg-gradient-to-r from-[#101B3D] to-[#2B256B] text-white rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4DA8FF]">
              <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
              {t.pages.compareTitle} ({comparedTools.length}/3 {t.common.selected})
            </div>
            <p className="text-sm text-slate-200">
              {t.pages.compareSubtitle}
            </p>

            {comparedTools.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {comparedTools.map((tool) => (
                  <span
                    key={tool.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/12 text-xs font-semibold text-white"
                  >
                    {tool.name}
                    <button
                      type="button"
                      onClick={() => toggleCompare(tool.id)}
                      aria-label={`Remove ${tool.name} from comparison`}
                      className="text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openComparisonPage}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#6956D8] hover:bg-[#5542C0] rounded-xl transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.pages.compareTitle}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Popular AI Tools Spotlight */}
        {!loading && !error && popularTools.length > 0 && (
          <section aria-labelledby="popular-ai-heading">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 id="popular-ai-heading" className="text-xl font-bold text-[#101B3D] dark:text-white">
                {t.sections.trendingTools}
              </h2>
              <Link
                to="/ai-tools/compare?tools=deepseek,grok,chatgpt"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0]"
              >
                DeepSeek vs Grok vs ChatGPT
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool) => (
                <AIToolCard
                  key={`pop-${tool.id}`}
                  tool={tool}
                  isSelectedForCompare={compareIds.includes(tool.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
          </section>
        )}

        {/* Filter Bar */}
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
            <div className="md:col-span-6">
              <label htmlFor="ai-search" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
                {t.filters.searchLabel}
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="ai-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Grok, DeepSeek, Lovable, Replit, Readdy..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="ai-pricing" className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5">
                {t.filters.pricingLabel}
              </label>
              <select
                id="ai-pricing"
                value={pricingFilter}
                onChange={(e) => setPricingFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              >
                <option value="All">{t.filters.allPricing}</option>
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 pb-1">
              <span className="text-sm text-[#202A44]/80 dark:text-slate-300 tabular-nums">
                <strong className="text-[#101B3D] dark:text-white">{filteredTools.length}</strong> /{' '}
                {tools.length}
              </span>
              {(selectedCategory !== 'All' || pricingFilter !== 'All' || searchQuery) && (
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
            aria-label="AI Tool Categories"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
          >
            {['All', ...AI_TOOL_CATEGORIES].map((cat) => {
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

        {/* All Tools Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : filteredTools.length === 0 ? (
          <EmptyState
            title="No AI tools matched your filters"
            description="Try clearing the pricing or category filter, or search with a broader term."
            actionLabel={t.common.resetFilters}
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <AIToolCard
                key={tool.id}
                tool={tool}
                isSelectedForCompare={compareIds.includes(tool.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}

        <RelatedCrossLinks
          links={[
            {
              title: 'Using AI Tools to Study Faster Without Losing Core Skills',
              description: 'Active-recall and verification guidelines for students worldwide.',
              to: '/blog/using-ai-tools-to-learn-faster-without-hollowing-out-your-skills',
              badge: 'Blog',
            },
            {
              title: 'Full-Stack Web Development Curriculum',
              description: 'Pair AI coding editors with real engineering fundamentals.',
              to: '/resources/full-stack-web-development-curriculum-guide',
              badge: 'Resource',
            },
            {
              title: 'Practical Skill Assessment Quiz',
              description: 'Check your Web/AI and workflow skills in 5 quick questions.',
              to: '/toolkit?tab=skill-quiz',
              badge: 'Toolkit',
            },
          ]}
        />
      </div>
    </div>
  );
}
