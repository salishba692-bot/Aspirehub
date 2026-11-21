import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-10 text-center max-w-xl mx-auto">
      <div className="w-11 h-11 rounded-lg bg-[#F7F8FC] border border-slate-200/80 flex items-center justify-center mx-auto mb-4 text-[#6956D8]">
        <SearchX className="w-5 h-5" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-[#101B3D] mb-2">{title}</h3>
      <p className="text-sm text-[#202A44]/75 leading-relaxed mb-5">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors whitespace-nowrap"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
