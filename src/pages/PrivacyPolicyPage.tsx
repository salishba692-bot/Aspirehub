import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Lock, ShieldCheck } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';

export function PrivacyPolicyPage() {
  const { t } = useLanguage();

  useDocumentTitle(
    `${t.pages.privacyTitle} — AspireHub`,
    t.pages.privacySubtitle,
    {
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'AspireHub Privacy Policy',
        description:
          'Privacy practices covering browser storage, AI advisor requests, and external scholarship or tool portals.',
      },
    }
  );

  return (
    <div>
      <PageHeader
        sectionLabel={t.pages.privacyLabel}
        title={t.pages.privacyTitle}
        subtitle={t.pages.privacySubtitle}
        breadcrumbCurrent={t.footer.privacyLink}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[#101B3D] dark:text-white">
              AspireHub Platform Policy
            </span>
            <span className="tabular-nums">Last updated: November 25, 2026</span>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
              1. Local Browser Storage (Bookmarks, Tracker, Theme &amp; Chat History)
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              AspireHub is designed so you can browse scholarships, career playbooks, AI tools,
              interactive toolkit checklists, and learning roadmaps without creating an account.
              When you save bookmarks, set scholarship deadline reminders, switch dark/light mode or
              interface language, preview newsletter interest, or chat with the AI Advisor, those
              preferences stay privately in your browser’s <code>localStorage</code> under your own
              control.
            </p>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              You can clear your saved bookmarks, recent searches, or chat history at any time
              through the AspireHub UI or your browser’s site data controls.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
              <ShieldCheck
                className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF]"
                aria-hidden="true"
              />
              2. AI Advisor Processing
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              When you send a prompt inside the optional AspireHub AI Advisor widget, your message
              and recent conversation context are transmitted over HTTPS to AspireHub’s server
              endpoint (<code>/api/chat</code>) solely to generate a reply via the configured Gemini
              API service. Please avoid entering sensitive personal identifiers such as passport
              numbers, national ID numbers, or financial credentials in chat prompts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
              3. Official External Links
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              Scholarship application buttons, AI tool links, and course companion links redirect to
              official third-party organizations (such as Chevening, DAAD, HEC Pakistan, MEXT,
              coursera.org, or tool vendors). Once you leave AspireHub, those external websites
              operate under their own privacy policies and terms of service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#101B3D] dark:text-white">
              4. Contact for Privacy Questions
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
              If you have questions about how AspireHub handles information or wish to request a
              content correction, please visit our{' '}
              <Link
                to="/contact"
                className="text-[#6956D8] dark:text-[#4DA8FF] font-semibold hover:underline"
              >
                {t.nav.contact}
              </Link>{' '}
              page or read our{' '}
              <Link
                to="/disclaimer"
                className="text-[#6956D8] dark:text-[#4DA8FF] font-semibold hover:underline"
              >
                {t.footer.disclaimerLink}
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
