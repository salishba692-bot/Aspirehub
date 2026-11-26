import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InternalLinkRef } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RelatedCrossLinksProps {
  heading?: string;
  links?: InternalLinkRef[];
}

export function RelatedCrossLinks({ heading, links }: RelatedCrossLinksProps) {
  const { t } = useLanguage();
  if (!links || links.length === 0) return null;

  const resolvedHeading = heading || t.sections.crossLinksHeading;

  return (
    <section
      aria-label={resolvedHeading}
      className="mt-10 bg-white dark:bg-[#131D3B] border border-slate-200/90 dark:border-[#243668] rounded-2xl p-6 sm:p-8"
    >
      <h2 className="text-lg sm:text-xl font-bold text-[#101B3D] dark:text-slate-100 mb-1.5">
        {resolvedHeading}
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
        {t.sections.crossLinksSubheading}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] hover:border-[#6956D8]/45 flex items-start justify-between gap-3 transition-colors"
          >
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-[#6956D8] dark:text-[#4DA8FF] block mb-1">
                {item.badge}
              </span>
              <h3 className="text-sm font-bold text-[#101B3D] dark:text-slate-100 group-hover:text-[#6956D8] dark:group-hover:text-[#4DA8FF] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#202A44]/80 dark:text-slate-300 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
            <ArrowRight
              className="w-4 h-4 text-slate-400 group-hover:text-[#6956D8] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
