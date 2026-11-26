import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';
import { FreeResource } from '../types';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { formatReadableDate } from '../utils/formatters';

interface ResourceCardProps {
  resource: FreeResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const saved = isBookmarked(resource.id);

  return (
    <article className="bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] hover:border-[#6956D8]/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-[#6956D8] dark:text-[#4DA8FF]">
              {resource.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{resource.readingTime}</span>
            {resource.internationalFocus && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#101B3D] dark:text-slate-100 font-medium">Global</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              const added = toggleBookmark({
                id: resource.id,
                type: 'resource',
                title: resource.title,
                subtitle: `${resource.provider} · ${resource.category}`,
                path: `/resources/${resource.slug}`,
              });
              showToast(
                added ? t.common.savedToBookmarks : t.common.removedFromBookmarks,
                added ? 'success' : 'info'
              );
            }}
            aria-label={saved ? `Remove ${resource.title} from saved` : `Save ${resource.title}`}
            className={`p-2 -mr-2 -mt-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              saved
                ? 'text-[#6956D8] dark:text-[#4DA8FF] bg-[#6956D8]/10'
                : 'text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <h3 className="text-base font-bold text-[#101B3D] dark:text-slate-100 leading-snug mb-1">
          <Link
            to={`/resources/${resource.slug}`}
            className="hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
          >
            {resource.title}
          </Link>
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
          {resource.provider} · {t.common.updated} {formatReadableDate(resource.lastUpdated)}
        </p>
        <p className="text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed mb-5">
          {resource.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-[#243668] flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500 dark:text-slate-400">{resource.formatLabel}</span>

        <Link
          to={`/resources/${resource.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors whitespace-nowrap"
        >
          {t.common.readFullGuide}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
