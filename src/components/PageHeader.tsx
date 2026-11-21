import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

interface PageHeaderProps {
  sectionLabel: string;
  title: string;
  subtitle: string;
  breadcrumbCurrent: string;
  parentLink?: { label: string; to: string };
  showBreadcrumb?: boolean;
}

export function PageHeader({
  sectionLabel,
  title,
  subtitle,
  breadcrumbCurrent,
  parentLink,
  showBreadcrumb = true,
}: PageHeaderProps) {
  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', to: '/' }];
  if (parentLink) {
    breadcrumbItems.push({ label: parentLink.label, to: parentLink.to });
  }
  breadcrumbItems.push({ label: breadcrumbCurrent });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#101B3D] via-[#172552] to-[#3B2E8A] text-white">
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(77, 168, 255, 0.35), transparent 45%), radial-gradient(circle at 15% 85%, rgba(105, 86, 216, 0.45), transparent 45%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {showBreadcrumb && (
          <Breadcrumb items={breadcrumbItems} variant="dark" className="mb-5" />
        )}

        <p className="text-xs font-medium tracking-wide text-[#4DA8FF] mb-2">{sectionLabel}</p>
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white max-w-3xl leading-[1.15]">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
