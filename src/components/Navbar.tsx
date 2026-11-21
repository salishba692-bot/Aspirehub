import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bookmark, Menu, Search, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useBookmarks } from '../context/BookmarksContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'Freelancing', to: '/freelancing' },
  { label: 'AI Tools', to: '/ai-tools' },
  { label: 'Free Resources', to: '/resources' },
  { label: 'Blog', to: '/blog' },
  { label: 'About Us', to: '/about' },
];

export function Navbar({ onOpenSearch, onOpenGetStarted }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { bookmarks, openDrawer } = useBookmarks();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">
        <Link to="/" aria-label="AspireHub Home" className="shrink-0">
          <BrandLogo variant="light" size="md" />
        </Link>

        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#6956D8] border-[#6956D8]'
                    : 'text-[#202A44]/85 border-transparent hover:text-[#101B3D] hover:border-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search AspireHub"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#202A44] hover:text-[#101B3D] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Search className="w-[18px] h-[18px]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open saved items (${bookmarks.length} saved)`}
            className="h-10 px-2.5 inline-flex items-center gap-1.5 rounded-lg text-[#202A44] hover:text-[#101B3D] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Bookmark className="w-[18px] h-[18px]" aria-hidden="true" />
            {bookmarks.length > 0 && (
              <span className="text-xs font-semibold tabular-nums text-[#6956D8]">
                {bookmarks.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenGetStarted}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden w-11 h-11 inline-flex items-center justify-center rounded-lg text-[#101B3D] hover:bg-slate-100 transition-colors cursor-pointer"
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
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav
            aria-label="Mobile Navigation"
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#6956D8]/10 text-[#6956D8]'
                      : 'text-[#202A44] hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenGetStarted();
                }}
                className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors text-center cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
