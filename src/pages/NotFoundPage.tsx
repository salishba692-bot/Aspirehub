import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle(
    'Page Not Found — AspireHub',
    'The page you requested could not be found on AspireHub.',
    { robots: 'noindex, nofollow' }
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <p className="font-mono text-sm font-semibold text-[#6956D8] mb-2">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#101B3D] mb-4">
        We could not find that page
      </h1>
      <p className="text-base text-[#202A44]/80 mb-8 leading-relaxed">
        The link you followed may have moved or does not exist. Explore our core directories below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Home
        </Link>
        <Link
          to="/scholarships"
          className="px-5 py-2.5 text-sm font-semibold text-[#101B3D] bg-white border border-slate-200 hover:border-[#6956D8]/40 rounded-lg transition-colors"
        >
          Scholarship Hub
        </Link>
        <Link
          to="/ai-tools"
          className="px-5 py-2.5 text-sm font-semibold text-[#101B3D] bg-white border border-slate-200 hover:border-[#6956D8]/40 rounded-lg transition-colors"
        >
          AI Tools Directory
        </Link>
      </div>
    </div>
  );
}
