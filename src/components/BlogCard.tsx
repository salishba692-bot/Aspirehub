import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';
import { formatReadableDate } from '../utils/formatters';
import { SafeImage } from './SafeImage';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export function BlogCard({ post }: { post: BlogPost }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const saved = isBookmarked(post.id);

  return (
    <article className="bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] hover:border-[#6956D8]/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div>
        <Link to={`/blog/${post.slug}`} className="block aspect-[4/3] overflow-hidden bg-slate-100">
          <SafeImage
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        </Link>

        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              <span className="font-medium text-[#6956D8] dark:text-[#4DA8FF]">
                {post.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatReadableDate(post.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                const added = toggleBookmark({
                  id: post.id,
                  type: 'blog',
                  title: post.title,
                  subtitle: `${post.category} · ${post.readingTime}`,
                  path: `/blog/${post.slug}`,
                });
                showToast(
                  added ? t.common.savedToBookmarks : t.common.removedFromBookmarks,
                  added ? 'success' : 'info'
                );
              }}
              aria-label={saved ? `Remove ${post.title} from saved` : `Save ${post.title}`}
              className={`p-1.5 -mr-1.5 -mt-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                saved
                  ? 'text-[#6956D8] dark:text-[#4DA8FF] bg-[#6956D8]/10'
                  : 'text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <h3 className="text-lg font-bold text-[#101B3D] dark:text-slate-100 leading-snug mb-2">
            <Link
              to={`/blog/${post.slug}`}
              className="hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
            >
              {post.title}
            </Link>
          </h3>

          <p className="text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-[#243668] flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">{post.author}</span>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#101B3D] dark:text-slate-100 hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors whitespace-nowrap"
        >
          {t.common.readArticle}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
