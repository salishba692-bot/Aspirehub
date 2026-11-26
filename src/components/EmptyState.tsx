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
    <div className="bg-white dark:bg-[#131D3B] border border-slate-200/80 dark:border-[#243668] rounded-xl p-10 text-center max-w-xl mx-auto">
      <div className="w-11 h-11 rounded-lg bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] flex items-center justify-center mx-auto mb-4 text-[#6956D8] dark:text-[#4DA8FF]">
        <SearchX className="w-5 h-5" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-[#101B3D] dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-[#202A44]/75 dark:text-slate-300 leading-relaxed mb-5">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
