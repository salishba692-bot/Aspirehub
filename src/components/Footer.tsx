import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Globe2, Linkedin, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { LanguageCode } from '../types';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-[#101B3D] text-slate-300 border-t border-[#1E2E5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" aria-label="AspireHub Home" className="inline-block">
              <BrandLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-200 transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-200 transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                to="/contact"
                aria-label={t.nav.contact}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="pt-2 max-w-[230px]">
              <label
                htmlFor="footer-language-select"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#4DA8FF]" aria-hidden="true" />
                {t.footer.languageLabel}
              </label>
              <select
                id="footer-language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="w-full px-3 py-2 text-xs font-medium bg-[#182652] border border-white/15 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeLabel} — {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.footer.scholarshipsHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/scholarships" className="hover:text-white transition-colors">
                  {t.sections.pillar1Title}
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarships?category=International%20Scholarships"
                  className="hover:text-white transition-colors"
                >
                  International Awards
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarships?category=Fully%20Funded%20Scholarships"
                  className="hover:text-white transition-colors"
                >
                  Fully Funded Awards
                </Link>
              </li>
              <li>
                <Link
                  to="/toolkit?tab=eligibility"
                  className="hover:text-white transition-colors"
                >
                  {t.toolkit.tabEligibility}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/how-to-write-a-standout-statement-of-purpose"
                  className="hover:text-white transition-colors"
                >
                  SOP Writing Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.footer.careersHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/freelancing" className="hover:text-white transition-colors">
                  {t.sections.pillar2Title}
                </Link>
              </li>
              <li>
                <Link
                  to="/freelancing/remote-jobs-and-global-internships-guide"
                  className="hover:text-white transition-colors"
                >
                  Remote Jobs &amp; Internships
                </Link>
              </li>
              <li>
                <Link to="/toolkit" className="hover:text-white transition-colors">
                  {t.footer.toolkitLink}
                </Link>
              </li>
              <li>
                <Link to="/ai-tools" className="hover:text-white transition-colors">
                  {t.sections.pillar3Title}
                </Link>
              </li>
              <li>
                <Link to="/ai-tools/compare" className="hover:text-white transition-colors">
                  {t.pages.compareTitle}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  {t.pages.resourcesTitle}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">{t.footer.trustHeading}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t.footer.aboutLink}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t.footer.contactLink}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  {t.footer.privacyLink}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  {t.footer.disclaimerLink}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  {t.footer.blogLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} {t.footer.copyright}</p>
          <p>{t.footer.verificationNote}</p>
        </div>
      </div>
    </footer>
  );
}
