import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Code2,
  GitCompareArrows,
  Image as ImageIcon,
  Layers,
  PenLine,
  Presentation,
  Search,
  Sparkles,
  Terminal,
  Video,
} from 'lucide-react';
import { AITool } from '../types';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { formatReadableDate } from '../utils/formatters';

export function getAIToolIcon(iconKey: AITool['iconKey']) {
  switch (iconKey) {
    case 'code':
      return Code2;
    case 'pen':
      return PenLine;
    case 'image':
      return ImageIcon;
    case 'video':
      return Video;
    case 'layers':
      return Layers;
    case 'search':
      return Search;
    case 'presentation':
      return Presentation;
    case 'book':
      return BookOpen;
    case 'terminal':
      return Terminal;
    default:
      return Sparkles;
  }
}

interface AIToolCardProps {
  tool: AITool;
  isSelectedForCompare?: boolean;
  onToggleCompare?: (toolId: string) => void;
}

export function AIToolCard({
  tool,
  isSelectedForCompare = false,
  onToggleCompare,
}: AIToolCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const saved = isBookmarked(tool.id);
  const Icon = getAIToolIcon(tool.iconKey);
  const defaultPeer = tool.slug === 'chatgpt' ? 'deepseek,grok' : 'chatgpt,deepseek';
  const compareHref = `/ai-tools/compare?tools=${tool.slug},${defaultPeer}`;

  return (
    <article className="bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] hover:border-[#6956D8]/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] flex items-center justify-center text-[#6956D8] dark:text-[#4DA8FF] shrink-0">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#101B3D] dark:text-slate-100 truncate">
                <Link
                  to={`/ai-tools/${tool.slug}`}
                  className="hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
                >
                  {tool.name}
                </Link>
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                <span>{tool.category}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const added = toggleBookmark({
                id: tool.id,
                type: 'ai-tool',
                title: tool.name,
                subtitle: `${tool.category} · ${tool.pricingType}`,
                path: `/ai-tools/${tool.slug}`,
              });
              showToast(
                added ? t.common.savedToBookmarks : t.common.removedFromBookmarks,
                added ? 'success' : 'info'
              );
            }}
            aria-label={saved ? `Remove ${tool.name} from saved` : `Save ${tool.name}`}
            className={`p-2 -mr-2 -mt-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              saved
                ? 'text-[#6956D8] dark:text-[#4DA8FF] bg-[#6956D8]/10'
                : 'text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {tool.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <span className="font-semibold text-[#101B3D] dark:text-slate-100">{tool.pricingType}</span>
          <span aria-hidden="true">·</span>
          <span>{tool.isVerified ? t.common.verifiedTool : t.common.sampleListing}</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-400 tabular-nums">
            {t.common.updated} {formatReadableDate(tool.lastUpdated)}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-[#243668] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={`/ai-tools/${tool.slug}`}
            className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors whitespace-nowrap"
          >
            {t.common.viewDetails}
          </Link>

          {onToggleCompare ? (
            <button
              type="button"
              onClick={() => onToggleCompare(tool.id)}
              aria-pressed={isSelectedForCompare}
              className={`inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                isSelectedForCompare
                  ? 'bg-[#6956D8]/10 text-[#6956D8] dark:text-[#4DA8FF] border-[#6956D8]/40'
                  : 'bg-[#F7F8FC] dark:bg-[#0D152E] text-[#202A44] dark:text-slate-200 border-slate-200 dark:border-[#243668] hover:border-slate-300'
              }`}
            >
              <GitCompareArrows className="w-3.5 h-3.5" aria-hidden="true" />
              {isSelectedForCompare ? t.common.selected : t.common.compare}
            </button>
          ) : (
            <Link
              to={compareHref}
              className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border bg-[#F7F8FC] dark:bg-[#0D152E] text-[#202A44] dark:text-slate-200 border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/40 hover:text-[#6956D8] transition-colors whitespace-nowrap"
            >
              <GitCompareArrows className="w-3.5 h-3.5" aria-hidden="true" />
              {t.common.compare}
            </Link>
          )}
        </div>

        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] transition-colors whitespace-nowrap"
        >
          {t.common.visitTool}
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
