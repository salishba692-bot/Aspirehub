import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, RotateCcw, Search } from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchBlogPosts } from '../services/api';
import { formatReadableDate, matchesSearch } from '../utils/formatters';
import { BlogCard } from '../components/BlogCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { SafeImage } from '../components/SafeImage';

export function BlogPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    'Blog & Articles — AspireHub',
    'Read practical essays and study guides on scholarships, student freelancing, AI literacy, and portfolio design.'
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

  const { data: result, loading, error, reload } = useAsyncData(() => fetchBlogPosts(), []);
  const posts = result?.data ?? [];

  const featuredPost = useMemo(() => posts.find((p) => p.featured) ?? posts[0], [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
      return matchesSearch(searchQuery, [post.title, post.category, post.excerpt, post.author]);
    });
  }, [posts, selectedCategory, searchQuery]);

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
        sectionLabel={t.pages.blogLabel}
        title={t.pages.blogTitle}
        subtitle={t.pages.blogSubtitle}
        breadcrumbCurrent={t.nav.blog}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Featured Post */}
        {!loading && !error && featuredPost && selectedCategory === 'All' && !searchQuery && (
          <section
            aria-label="Featured Article"
            className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            <div className="lg:col-span-6 bg-slate-100 dark:bg-slate-900 min-h-[240px]">
              <SafeImage
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                eager
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums mb-3">
                  <span className="font-semibold text-[#6956D8] dark:text-[#4DA8FF]">
                    {t.sections.blogKicker}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatReadableDate(featuredPost.publishedAt)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.readingTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#101B3D] dark:text-white leading-snug mb-3">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">{featuredPost.author}</span>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#101B3D] dark:bg-[#6956D8] hover:bg-[#192854] dark:hover:bg-[#5542C0] rounded-lg transition-colors"
                >
                  {t.common.readArticle}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
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
                placeholder="Search articles by topic or keyword..."
                aria-label={t.filters.searchLabel}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#202A44]/80 dark:text-slate-300 tabular-nums">
                <strong className="text-[#101B3D] dark:text-white">{filteredPosts.length}</strong> /{' '}
                {posts.length}
              </span>
              {(selectedCategory !== 'All' || searchQuery) && (
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
            aria-label="Blog Categories"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
          >
            {['All', ...BLOG_CATEGORIES].map((cat) => {
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

        {/* Articles Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : filteredPosts.length === 0 ? (
          <EmptyState
            title="No articles matched your search"
            description="Try clearing the category filter or searching with a broader keyword."
            actionLabel={t.common.resetFilters}
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <RelatedCrossLinks
          links={[
            {
              title: 'Scholarship Hub',
              description: 'Apply essay techniques from the journal to real international portals.',
              to: '/scholarships',
              badge: 'Scholarship',
            },
            {
              title: 'Interactive Student & Career Toolkit',
              description: 'Run the eligibility checklist, career quiz, and CV bullet generator.',
              to: '/toolkit',
              badge: 'Toolkit',
            },
            {
              title: 'AI Tools Directory',
              description: 'Compare verified AI research and coding workflows side by side.',
              to: '/ai-tools',
              badge: 'AI Tool',
            },
          ]}
        />
      </div>
    </div>
  );
}
