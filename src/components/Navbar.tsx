import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bookmark, Globe2, LogIn, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { LanguageCode } from '../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
}

export function Navbar({ onOpenSearch, onOpenGetStarted }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { bookmarks, upcomingReminders, openDrawer } = useBookmarks();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();

  const navItems = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.scholarships, to: '/scholarships' },
    { label: t.nav.freelancing, to: '/freelancing' },
    { label: t.nav.aiTools, to: '/ai-tools' },
    { label: t.nav.resources, to: '/resources' },
    { label: t.nav.toolkit, to: '/toolkit' },
    { label: t.nav.blog, to: '/blog' },
    { label: t.nav.about, to: '/about' },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0D152E]/95 backdrop-blur-md border-b border-slate-200/85 dark:border-[#1E2E5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 lg:gap-4">
        <Link to="/" aria-label="AspireHub Home" className="shrink-0">
          <BrandLogo variant={isDark ? 'dark' : 'light'} size="md" />
        </Link>

        <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-4 2xl:gap-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#6956D8] dark:text-[#4DA8FF] border-[#6956D8] dark:border-[#4DA8FF]'
                    : 'text-[#202A44]/85 dark:text-slate-300 border-transparent hover:text-[#101B3D] dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t.search.dialogLabel}
            title="Ctrl+K / Cmd+K"
            className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-lg text-[#202A44] dark:text-slate-200 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Search className="w-[18px] h-[18px]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
            title={isDark ? t.nav.themeLight : t.nav.themeDark}
            className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-lg text-[#202A44] dark:text-slate-200 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-[18px] h-[18px] text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </button>

          <div className="hidden md:flex items-center relative">
            <Globe2
              className="w-3.5 h-3.5 text-[#6956D8] dark:text-[#4DA8FF] absolute left-2.5 pointer-events-none"
              aria-hidden="true"
            />
            <select
              aria-label={t.footer.languageLabel}
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="h-9 pl-7 pr-2 text-xs font-semibold bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF] cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeLabel}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`${t.tracker.drawerTitle} (${bookmarks.length})`}
            className="relative h-9 sm:h-10 px-2.5 inline-flex items-center gap-1.5 rounded-lg text-[#202A44] dark:text-slate-200 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Bookmark className="w-[18px] h-[18px]" aria-hidden="true" />
            {bookmarks.length > 0 && (
              <span className="text-xs font-semibold tabular-nums text-[#6956D8] dark:text-[#4DA8FF]">
                {bookmarks.length}
              </span>
            )}
            {upcomingReminders.length > 0 && (
              <span
                title={`${upcomingReminders.length} ${t.tracker.upcomingAlertTitle}`}
                className="w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-[#0D152E]"
              />
            )}
          </button>

          {isAuthenticated && user ? (
            <Link
              to="/account"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span className="w-5 h-5 rounded-full bg-[#6956D8] text-white text-[10px] font-bold flex items-center justify-center">
                {user.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
              <span>{t.auth.signIn}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenGetStarted}
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.getStarted}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#101B3D] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-[#1E2E5C] bg-white dark:bg-[#0D152E] shadow-lg max-h-[85vh] overflow-y-auto">
          <nav
            aria-label="Mobile Navigation"
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
          >
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenSearch();
              }}
              className="mb-2 w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] text-sm text-slate-500 dark:text-slate-300 text-left cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              <span className="truncate">{t.nav.searchPlaceholder}</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#6956D8]/12 text-[#6956D8] dark:text-[#4DA8FF]'
                        : 'text-[#202A44] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#6956D8]/12 text-[#6956D8] dark:text-[#4DA8FF]'
                      : 'text-[#202A44] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`
                }
              >
                {t.nav.contact}
              </NavLink>
            </div>

            <div className="mt-2 pt-3 border-t border-slate-100 dark:border-[#1E2E5C] flex flex-wrap items-center justify-between gap-3">
              <label
                htmlFor="mobile-lang-select"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#202A44] dark:text-slate-300"
              >
                <Globe2 className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
                {t.footer.languageLabel}
              </label>
              <select
                id="mobile-lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="px-3 py-1.5 text-xs font-medium bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeLabel} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-[#1E2E5C] flex items-center gap-2.5">
              <button
                type="button"
                onClick={toggleTheme}
                className="py-2.5 px-3 text-xs font-medium text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4 text-[#6956D8]" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openDrawer();
                }}
                className="py-2.5 px-3.5 text-sm font-medium text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
                <span className="tabular-nums">{bookmarks.length}</span>
              </button>

              {isAuthenticated && user ? (
                <Link
                  to="/account"
                  className="py-2.5 px-3.5 text-sm font-medium text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#6956D8] text-white text-[10px] font-bold flex items-center justify-center">
                    {user.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="truncate max-w-[90px]">{t.auth.account}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openAuthModal('login');
                  }}
                  className="py-2.5 px-3.5 text-sm font-medium text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
                  <span>{t.auth.signIn}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenGetStarted();
                }}
                className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors text-center cursor-pointer"
              >
                {t.nav.getStarted}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
