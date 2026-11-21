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
  const saved = isBookmarked(tool.id);
  const Icon = getAIToolIcon(tool.iconKey);
  const defaultPeer = tool.slug === 'chatgpt' ? 'deepseek,grok' : 'chatgpt,deepseek';
  const compareHref = `/ai-tools/compare?tools=${tool.slug},${defaultPeer}`;

  return (
    <article className="bg-white border border-slate-200/90 hover:border-[#6956D8]/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#F7F8FC] border border-slate-200/80 flex items-center justify-center text-[#6956D8] shrink-0">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#101B3D] truncate">
                <Link
                  to={`/ai-tools/${tool.slug}`}
                  className="hover:text-[#6956D8] transition-colors"
                >
                  {tool.name}
                </Link>
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 truncate">
                <span>{tool.category}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              toggleBookmark({
                id: tool.id,
                type: 'ai-tool',
                title: tool.name,
                subtitle: `${tool.category} · ${tool.pricingType}`,
                path: `/ai-tools/${tool.slug}`,
              })
            }
            aria-label={saved ? `Remove ${tool.name} from saved` : `Save ${tool.name}`}
            className={`p-2 -mr-2 -mt-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              saved
                ? 'text-[#6956D8] bg-[#6956D8]/10'
                : 'text-slate-400 hover:text-[#101B3D] hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm text-[#202A44]/85 leading-relaxed mb-4 line-clamp-3">
          {tool.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 mb-4">
          <span className="font-semibold text-[#101B3D]">{tool.pricingType}</span>
          <span aria-hidden="true">·</span>
          <span>{tool.isVerified ? 'Verified Tool' : 'Sample Listing'}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={`/ai-tools/${tool.slug}`}
            className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors whitespace-nowrap"
          >
            View Details
          </Link>

          {onToggleCompare ? (
            <button
              type="button"
              onClick={() => onToggleCompare(tool.id)}
              aria-pressed={isSelectedForCompare}
              className={`inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                isSelectedForCompare
                  ? 'bg-[#6956D8]/10 text-[#6956D8] border-[#6956D8]/40'
                  : 'bg-[#F7F8FC] text-[#202A44] border-slate-200 hover:border-slate-300'
              }`}
            >
              <GitCompareArrows className="w-3.5 h-3.5" aria-hidden="true" />
              {isSelectedForCompare ? 'Selected' : 'Compare'}
            </button>
          ) : (
            <Link
              to={compareHref}
              className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border bg-[#F7F8FC] text-[#202A44] border-slate-200 hover:border-[#6956D8]/40 hover:text-[#6956D8] transition-colors whitespace-nowrap"
            >
              <GitCompareArrows className="w-3.5 h-3.5" aria-hidden="true" />
              Compare
            </Link>
          )}
        </div>

        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#6956D8] hover:text-[#5542C0] transition-colors whitespace-nowrap"
        >
          Visit Tool
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
