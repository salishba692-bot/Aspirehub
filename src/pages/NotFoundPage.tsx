import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';

export function NotFoundPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    `${t.pages.notFoundTitle} — AspireHub`,
    t.pages.notFoundDesc,
    { robots: 'noindex, nofollow' }
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <p className="font-mono text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] mb-2">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#101B3D] dark:text-white mb-4">
        {t.pages.notFoundTitle}
      </h1>
      <p className="text-base text-[#202A44]/80 dark:text-slate-300 mb-8 leading-relaxed">
        {t.pages.notFoundDesc}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t.common.backToHome}
        </Link>
        <Link
          to="/scholarships"
          className="px-5 py-2.5 text-sm font-semibold text-[#101B3D] dark:text-slate-200 bg-white dark:bg-[#141E3D] border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40 rounded-lg transition-colors"
        >
          {t.nav.scholarships}
        </Link>
        <Link
          to="/freelancing"
          className="px-5 py-2.5 text-sm font-semibold text-[#101B3D] dark:text-slate-200 bg-white dark:bg-[#141E3D] border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40 rounded-lg transition-colors"
        >
          {t.nav.freelancing}
        </Link>
        <Link
          to="/ai-tools"
          className="px-5 py-2.5 text-sm font-semibold text-[#101B3D] dark:text-slate-200 bg-white dark:bg-[#141E3D] border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40 rounded-lg transition-colors"
        >
          {t.nav.aiTools}
        </Link>
        <Link
          to="/toolkit"
          className="px-5 py-2.5 text-sm font-semibold text-[#101B3D] dark:text-slate-200 bg-white dark:bg-[#141E3D] border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40 rounded-lg transition-colors"
        >
          {t.nav.toolkit}
        </Link>
      </div>
    </div>
  );
}
