import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-busy="true"
      aria-label="Loading content"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#131D3B] border border-slate-200/80 dark:border-[#243668] rounded-xl p-6 animate-pulse"
        >
          <div className="h-3.5 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="h-5 w-4/5 bg-slate-200 dark:bg-slate-700 rounded mb-2.5" />
          <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded mb-5" />
          <div className="space-y-2 mb-6">
            <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="h-3.5 w-5/6 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-[#243668] flex items-center justify-between">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-9 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div
      role="alert"
      className="bg-white dark:bg-[#131D3B] border border-red-200 dark:border-red-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-semibold text-[#101B3D] dark:text-slate-100">
            {t.common.unableToLoad}
          </h3>
          <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-0.5">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#0D152E] hover:bg-slate-200/70 border border-slate-200 dark:border-[#243668] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          {t.common.tryAgain}
        </button>
      )}
    </div>
  );
}
