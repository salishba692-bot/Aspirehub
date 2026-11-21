import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark';
  className?: string;
}

export function Breadcrumb({
  items,
  variant = 'light',
  className = '',
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  const isDark = variant === 'dark';

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs sm:text-[13px] ${
          isDark ? 'text-slate-300' : 'text-slate-500'
        }`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isFirst = idx === 0;

          return (
            <li
              key={`${item.label}-${idx}`}
              className="inline-flex items-center gap-1.5 min-w-0"
            >
              {idx > 0 && (
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isDark ? 'text-slate-400' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
              )}

              {!isLast && item.to ? (
                <Link
                  to={item.to}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-4 ${
                    isDark
                      ? 'hover:text-white text-slate-300'
                      : 'hover:text-[#6956D8] text-slate-600'
                  }`}
                >
                  {isFirst && (
                    <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  )}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={`truncate max-w-[220px] sm:max-w-md ${
                    isDark
                      ? 'text-white/95 font-medium'
                      : 'text-[#101B3D] font-semibold'
                  }`}
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
