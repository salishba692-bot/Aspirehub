import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';
import { formatReadableDate } from '../utils/formatters';
import { SafeImage } from './SafeImage';
import { useBookmarks } from '../context/BookmarksContext';

export function BlogCard({ post }: { post: BlogPost }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(post.id);

  return (
    <article className="bg-white border border-slate-200/90 hover:border-[#6956D8]/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md">
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
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 tabular-nums">
              <span className="font-medium text-[#6956D8]">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span>{formatReadableDate(post.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>

            <button
              type="button"
              onClick={() =>
                toggleBookmark({
                  id: post.id,
                  type: 'blog',
                  title: post.title,
                  subtitle: `${post.category} · ${post.readingTime}`,
                  path: `/blog/${post.slug}`,
                })
              }
              aria-label={saved ? `Remove ${post.title} from saved` : `Save ${post.title}`}
              className={`p-1.5 -mr-1.5 -mt-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                saved
                  ? 'text-[#6956D8] bg-[#6956D8]/10'
                  : 'text-slate-400 hover:text-[#101B3D] hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <h3 className="text-lg font-bold text-[#101B3D] leading-snug mb-2">
            <Link to={`/blog/${post.slug}`} className="hover:text-[#6956D8] transition-colors">
              {post.title}
            </Link>
          </h3>

          <p className="text-sm text-[#202A44]/85 leading-relaxed line-clamp-3">{post.excerpt}</p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500">{post.author}</span>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#101B3D] hover:text-[#6956D8] transition-colors whitespace-nowrap"
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
