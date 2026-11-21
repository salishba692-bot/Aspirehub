import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Scholarship } from '../types';
import { useBookmarks } from '../context/BookmarksContext';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(scholarship.id);
  const isExpired = scholarship.status === 'Expired';

  return (
    <article
      className={`bg-white border rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
        isExpired ? 'border-slate-200/80 opacity-90' : 'border-slate-200/90 hover:border-[#6956D8]/40'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="font-medium text-[#101B3D]">{scholarship.country}</span>
            <span aria-hidden="true">·</span>
            <span>{scholarship.degreeLevel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#6956D8] font-medium">{scholarship.fundingType}</span>
          </div>

          <button
            type="button"
            onClick={() =>
              toggleBookmark({
                id: scholarship.id,
                type: 'scholarship',
                title: scholarship.title,
                subtitle: `${scholarship.country} · ${scholarship.degreeLevel}`,
                path: `/scholarships/${scholarship.slug}`,
              })
            }
            aria-label={saved ? `Remove ${scholarship.title} from saved` : `Save ${scholarship.title}`}
            className={`p-2 -mr-2 -mt-1 rounded-lg transition-colors cursor-pointer ${
              saved
                ? 'text-[#6956D8] bg-[#6956D8]/10'
                : 'text-slate-400 hover:text-[#101B3D] hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-[#101B3D] leading-snug mb-1.5">
          <Link
            to={`/scholarships/${scholarship.slug}`}
            className="hover:text-[#6956D8] transition-colors"
          >
            {scholarship.title}
          </Link>
        </h3>

        <p className="text-xs font-medium text-slate-500 mb-3">{scholarship.organization}</p>

        <p className="text-sm text-[#202A44]/85 leading-relaxed mb-4 line-clamp-3">
          {scholarship.eligibilitySummary}
        </p>

        <div className="text-xs text-[#202A44]/80 leading-relaxed mb-4">
          <span className="font-semibold text-[#101B3D]">Coverage: </span>
          {scholarship.fundingCoverage}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 text-slate-600 tabular-nums">
            <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            {scholarship.deadline}
          </span>

          {isExpired ? (
            <span className="inline-flex items-center gap-1 font-semibold text-red-700">
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              Expired
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              {scholarship.isSampleData ? 'Sample Cycle' : 'Official Portal'}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <Link
            to={`/scholarships/${scholarship.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors whitespace-nowrap"
          >
            View Details
          </Link>

          <a
            href={scholarship.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#6956D8] hover:text-[#5542C0] transition-colors whitespace-nowrap"
          >
            Official Link
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
