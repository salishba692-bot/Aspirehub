import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';

export function DisclaimerPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    `${t.pages.disclaimerTitle} — AspireHub`,
    t.pages.disclaimerSubtitle,
    {
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'AspireHub Disclaimer',
        description:
          'Editorial disclaimer and verification requirements for international scholarships, career guides, and AI tools.',
      },
    }
  );

  return (
    <div>
      <PageHeader
        sectionLabel={t.pages.disclaimerLabel}
        title={t.pages.disclaimerTitle}
        subtitle={t.pages.disclaimerSubtitle}
        breadcrumbCurrent={t.footer.disclaimerLink}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[#101B3D] dark:text-white">
              Editorial Verification Standards
            </span>
            <span className="tabular-nums">Last updated: November 25, 2026</span>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
              <CheckCircle2
                className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF]"
                aria-hidden="true"
              />
              1. Informational Purpose Only
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              All content on AspireHub—including scholarship summaries, remote career guides,
              freelancing roadmaps, AI tool comparisons, interactive self-assessment quizzes, and
              study plans—is provided strictly for educational and informational purposes. AspireHub
              does not guarantee admission, scholarship awards, remote job placement, visas, or
              freelance earnings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
              <ExternalLink
                className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF]"
                aria-hidden="true"
              />
              2. Mandatory Official Portal Verification
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              Scholarship committees, governments, and university portals update annual intake
              windows, stipend amounts, and country eligibility rules frequently. AspireHub links to
              verified official host websites on every verified listing and marks illustrative
              templates as <strong>Sample Data</strong> and past cycles as{' '}
              <strong className="text-red-700 dark:text-red-400">Expired</strong>. Before preparing
              documents or paying any official exam fee, always confirm current terms directly on
              the host institution’s official portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
              <AlertTriangle
                className="w-5 h-5 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              3. AI Directory Pricing &amp; Chatbot Guidance
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              AI platforms regularly change free-tier limits, model access, and subscription plans.
              Similarly, responses from the optional AspireHub AI Advisor are automated study and
              planning aids—not legal, immigration, or financial advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white">
              4. Report Inaccurate Information
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              If you notice an outdated deadline, broken external link, or unclear detail, please let
              us know via the{' '}
              <Link
                to="/contact"
                className="text-[#6956D8] dark:text-[#4DA8FF] font-semibold hover:underline"
              >
                {t.nav.contact}
              </Link>{' '}
              page so we can review and update the entry promptly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
