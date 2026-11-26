import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Scholarship } from '../types';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { formatReadableDate } from '../utils/formatters';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const saved = isBookmarked(scholarship.id);
  const isExpired = scholarship.status === 'Expired';
  const subjectSummary = scholarship.subjects.slice(0, 2).join(' · ');

  return (
    <article
      className={`bg-white dark:bg-[#131D3B] border rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
        isExpired
          ? 'border-slate-200/80 dark:border-[#243668] opacity-90'
          : 'border-slate-200/90 dark:border-[#243668] hover:border-[#6956D8]/40'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-[#101B3D] dark:text-slate-100">
              {scholarship.country}
            </span>
            <span aria-hidden="true">·</span>
            <span>{scholarship.degreeLevel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#6956D8] dark:text-[#4DA8FF] font-medium">
              {scholarship.fundingType}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const added = toggleBookmark({
                id: scholarship.id,
                type: 'scholarship',
                title: scholarship.title,
                subtitle: `${scholarship.country} · ${scholarship.degreeLevel}`,
                path: `/scholarships/${scholarship.slug}`,
                deadline: scholarship.deadline,
                isExpired,
              });
              showToast(
                added ? t.common.savedToBookmarks : t.common.removedFromBookmarks,
                added ? 'success' : 'info'
              );
            }}
            aria-label={saved ? `Remove ${scholarship.title} from saved` : `Save ${scholarship.title}`}
            className={`p-2 -mr-2 -mt-1 rounded-lg transition-colors cursor-pointer ${
              saved
                ? 'text-[#6956D8] dark:text-[#4DA8FF] bg-[#6956D8]/10'
                : 'text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-[#101B3D] dark:text-slate-100 leading-snug mb-1.5">
          <Link
            to={`/scholarships/${scholarship.slug}`}
            className="hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
          >
            {scholarship.title}
          </Link>
        </h3>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
          {scholarship.organization}
          {subjectSummary ? ` · ${subjectSummary}` : ''}
        </p>

        <p className="text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {scholarship.eligibilitySummary}
        </p>

        <div className="text-xs text-[#202A44]/80 dark:text-slate-300 leading-relaxed mb-4">
          <span className="font-semibold text-[#101B3D] dark:text-slate-100">Coverage: </span>
          {scholarship.fundingCoverage}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-[#243668] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 tabular-nums">
            <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            {scholarship.deadline}
          </span>

          {isExpired ? (
            <span className="inline-flex items-center gap-1 font-semibold text-red-700 dark:text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              {t.common.expired}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              {scholarship.isSampleData ? t.common.sampleData : t.common.officialPortal}
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-400 tabular-nums">
          {t.common.updated} {formatReadableDate(scholarship.lastUpdated)}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <Link
            to={`/scholarships/${scholarship.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors whitespace-nowrap"
          >
            {t.common.viewDetails}
          </Link>

          <a
            href={scholarship.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] transition-colors whitespace-nowrap"
          >
            {t.common.officialLink}
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
