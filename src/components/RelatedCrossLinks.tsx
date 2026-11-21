import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InternalLinkRef } from '../types';

interface RelatedCrossLinksProps {
  heading?: string;
  links?: InternalLinkRef[];
}

export function RelatedCrossLinks({
  heading = 'Recommended Next Steps Across AspireHub',
  links,
}: RelatedCrossLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <section
      aria-label={heading}
      className="mt-10 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8"
    >
      <h2 className="text-lg sm:text-xl font-bold text-[#101B3D] mb-1.5">{heading}</h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-5">
        Continue with connected guides, templates, and tools inside AspireHub.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group p-4 rounded-xl bg-[#F7F8FC] border border-slate-200/80 hover:border-[#6956D8]/45 flex items-start justify-between gap-3 transition-colors"
          >
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-[#6956D8] block mb-1">
                {item.badge}
              </span>
              <h3 className="text-sm font-bold text-[#101B3D] group-hover:text-[#6956D8] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#202A44]/80 mt-1 leading-relaxed">
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
