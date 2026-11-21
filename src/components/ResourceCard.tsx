import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';
import { FreeResource } from '../types';
import { useBookmarks } from '../context/BookmarksContext';

interface ResourceCardProps {
  resource: FreeResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(resource.id);

  return (
    <article className="bg-white border border-slate-200/90 hover:border-[#6956D8]/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="font-medium text-[#6956D8]">{resource.category}</span>
            <span aria-hidden="true">·</span>
            <span>{resource.readingTime}</span>
          </div>

          <button
            type="button"
            onClick={() =>
              toggleBookmark({
                id: resource.id,
                type: 'resource',
                title: resource.title,
                subtitle: `${resource.provider} · ${resource.category}`,
                path: `/resources/${resource.slug}`,
              })
            }
            aria-label={saved ? `Remove ${resource.title} from saved` : `Save ${resource.title}`}
            className={`p-2 -mr-2 -mt-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              saved
                ? 'text-[#6956D8] bg-[#6956D8]/10'
                : 'text-slate-400 hover:text-[#101B3D] hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <h3 className="text-base font-bold text-[#101B3D] leading-snug mb-1">
          <Link
            to={`/resources/${resource.slug}`}
            className="hover:text-[#6956D8] transition-colors"
          >
            {resource.title}
          </Link>
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-3">{resource.provider}</p>
        <p className="text-sm text-[#202A44]/85 leading-relaxed mb-5">{resource.description}</p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500">{resource.formatLabel}</span>

        <Link
          to={`/resources/${resource.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors whitespace-nowrap"
        >
          Read Full Guide
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
