import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchBlogPostBySlug } from '../services/api';
import { formatReadableDate, slugify } from '../utils/formatters';
import { BlogCard } from '../components/BlogCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { NewsletterSection } from '../components/NewsletterSection';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';
import { SafeImage } from '../components/SafeImage';

export function BlogDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const {
    data: result,
    loading,
    error,
    reload,
  } = useAsyncData(() => fetchBlogPostBySlug(slug), [slug]);

  const post = result?.data ?? null;

  const breadcrumbItems: BreadcrumbItem[] | undefined = post
    ? [
        { label: t.nav.home, to: '/' },
        { label: t.nav.blog, to: '/blog' },
        {
          label: post.category,
          to: `/blog?category=${encodeURIComponent(post.category)}`,
        },
        { label: post.title },
      ]
    : undefined;

  useDocumentTitle(
    post ? `${post.title} – AspireHub` : 'Article – AspireHub',
    post?.excerpt,
    post
      ? {
          type: 'article',
          breadcrumbs: breadcrumbItems,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Organization',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'AspireHub',
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

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Article not found"
          description="The blog article you requested could not be found."
          actionLabel={t.sections.readAllArticles}
          onAction={() => {
            window.location.href = '/blog';
          }}
        />
      </div>
    );
  }

  const saved = isBookmarked(post.id);
  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  function handleBookmarkToggle() {
    if (!post) return;
    const added = toggleBookmark({
      id: post.id,
      type: 'blog',
      title: post.title,
      subtitle: `${post.category} · ${post.readingTime}`,
      path: `/blog/${post.slug}`,
    });
    showToast(added ? t.common.savedToBookmarks : t.common.removedFromBookmarks, 'info');
  }

  return (
    <div>
      <PageHeader
        sectionLabel={`${post.category} · ${formatReadableDate(post.publishedAt)} · ${post.readingTime}`}
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbCurrent={post.title}
        parentLink={{ label: t.nav.blog, to: '/blog' }}
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202A44] dark:text-slate-200 hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t.sections.readAllArticles}
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {post.author} · {post.authorRole}
            </span>
            <button
              type="button"
              onClick={handleBookmarkToggle}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                saved
                  ? 'bg-[#6956D8]/10 text-[#6956D8] dark:text-[#4DA8FF] border-[#6956D8]/40'
                  : 'bg-white dark:bg-[#141E3D] text-[#101B3D] dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
              {saved ? t.common.saved : t.common.save}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <article className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <SafeImage
                  src={post.thumbnail}
                  alt={post.title}
                  eager
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-10 space-y-8">
                {/* Table of Contents */}
                <nav
                  aria-label="Article Contents"
                  className="rounded-xl bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5"
                >
                  <p className="text-xs font-bold text-[#101B3D] dark:text-white mb-2">
                    In This Article
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    {post.sections.map((sec) => {
                      const anchor = slugify(sec.heading);
                      return (
                        <li key={anchor}>
                          <a
                            href={`#${anchor}`}
                            className="text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] hover:underline font-medium"
                          >
                            {sec.heading}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {post.sections.map((section) => {
                  const anchor = slugify(section.heading);
                  return (
                    <section key={anchor} id={anchor} className="space-y-4 scroll-mt-24">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-white">
                        {section.heading}
                      </h2>

                      {section.paragraphs.map((para, idx) => (
                        <p
                          key={idx}
                          className="text-base text-[#202A44]/90 dark:text-slate-300 leading-[1.75] max-w-[70ch]"
                        >
                          {para}
                        </p>
                      ))}

                      {section.bullets && (
                        <ul className="space-y-2 list-disc pl-5 text-sm sm:text-base text-[#202A44]/90 dark:text-slate-300 leading-relaxed pt-1">
                          {section.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {section.callout && (
                        <div className="mt-3 rounded-xl bg-[#F7F8FC] dark:bg-[#0F1733] border border-slate-200/90 dark:border-slate-700 p-5">
                          <p className="text-xs font-bold text-[#6956D8] dark:text-[#4DA8FF] mb-1.5">
                            {section.callout.title}
                          </p>
                          <p className="text-sm text-[#101B3D] dark:text-slate-200 leading-relaxed">
                            {section.callout.body}
                          </p>
                        </div>
                      )}

                      {section.internalLink && (
                        <div className="pt-1">
                          <Link
                            to={section.internalLink.to}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] hover:underline"
                          >
                            {section.internalLink.label}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </article>

            <RelatedCrossLinks links={post.relatedLinks} />
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-bold text-[#101B3D] dark:text-white mb-4">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {post.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#202A44]/90 dark:text-slate-300">
                    <CheckCircle2
                      className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-[#101B3D] dark:text-white mb-2">
                Explore Directories
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Put these insights into action across our curated hubs.
              </p>
              <div className="space-y-2">
                <Link
                  to="/scholarships"
                  className="block w-full py-2.5 px-4 text-xs font-semibold text-[#101B3D] dark:text-slate-200 bg-[#F7F8FC] dark:bg-[#0F1733] hover:bg-slate-200/60 dark:hover:bg-[#1B284F] rounded-lg transition-colors"
                >
                  {t.nav.scholarships}
                </Link>
                <Link
                  to="/freelancing"
                  className="block w-full py-2.5 px-4 text-xs font-semibold text-[#101B3D] dark:text-slate-200 bg-[#F7F8FC] dark:bg-[#0F1733] hover:bg-slate-200/60 dark:hover:bg-[#1B284F] rounded-lg transition-colors"
                >
                  {t.nav.freelancing}
                </Link>
                <Link
                  to="/toolkit"
                  className="block w-full py-2.5 px-4 text-xs font-semibold text-[#101B3D] dark:text-slate-200 bg-[#F7F8FC] dark:bg-[#0F1733] hover:bg-slate-200/60 dark:hover:bg-[#1B284F] rounded-lg transition-colors"
                >
                  {t.nav.toolkit}
                </Link>
                <Link
                  to="/resources"
                  className="block w-full py-2.5 px-4 text-xs font-semibold text-[#101B3D] dark:text-slate-200 bg-[#F7F8FC] dark:bg-[#0F1733] hover:bg-slate-200/60 dark:hover:bg-[#1B284F] rounded-lg transition-colors"
                >
                  {t.nav.resources}
                </Link>
                <Link
                  to="/ai-tools"
                  className="block w-full py-2.5 px-4 text-xs font-semibold text-[#101B3D] dark:text-slate-200 bg-[#F7F8FC] dark:bg-[#0F1733] hover:bg-slate-200/60 dark:hover:bg-[#1B284F] rounded-lg transition-colors"
                >
                  {t.nav.aiTools}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-[#101B3D] dark:text-white mb-6">
            More From AspireHub Journal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <BlogCard key={item.id} post={item} />
            ))}
          </div>
        </section>

        <div className="mt-16">
          <NewsletterSection />
        </div>
      </div>
    </div>
  );
}
