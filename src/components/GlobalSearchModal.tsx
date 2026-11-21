import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BookOpen, Compass, Cpu, FileText, GraduationCap, Search, X } from 'lucide-react';
import { AI_TOOLS_DATA } from '../data/aiToolsData';
import { BLOG_POSTS } from '../data/blogData';
import { FREELANCING_GUIDES } from '../data/freelancingData';
import { FREE_RESOURCES_DATA } from '../data/resourcesData';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { matchesSearch } from '../utils/formatters';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchHit {
  id: string;
  section: 'Scholarship' | 'Freelancing' | 'AI Tool' | 'Free Resource' | 'Blog';
  title: string;
  subtitle: string;
  to: string;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo<SearchHit[]>(() => {
    const q = query.trim();
    if (!q) return [];

    const hits: SearchHit[] = [];

    SCHOLARSHIPS_DATA.forEach((item) => {
      if (matchesSearch(q, [item.title, item.country, item.organization, item.degreeLevel])) {
        hits.push({
          id: item.id,
          section: 'Scholarship',
          title: item.title,
          subtitle: `${item.country} · ${item.degreeLevel} · ${item.status}`,
          to: `/scholarships/${item.slug}`,
        });
      }
    });

    FREELANCING_GUIDES.forEach((item) => {
      if (matchesSearch(q, [item.title, item.category, item.shortDescription])) {
        hits.push({
          id: item.id,
          section: 'Freelancing',
          title: item.title,
          subtitle: `${item.category} · ${item.readingTime}`,
          to: `/freelancing/${item.slug}`,
        });
      }
    });

    AI_TOOLS_DATA.forEach((item) => {
      if (matchesSearch(q, [item.name, item.category, item.shortDescription])) {
        hits.push({
          id: item.id,
          section: 'AI Tool',
          title: item.name,
          subtitle: `${item.category} · ${item.pricingType}`,
          to: `/ai-tools/${item.slug}`,
        });
      }
    });

    FREE_RESOURCES_DATA.forEach((item) => {
      if (matchesSearch(q, [item.title, item.provider, item.category, item.description])) {
        hits.push({
          id: item.id,
          section: 'Free Resource',
          title: item.title,
          subtitle: `${item.category} · ${item.readingTime}`,
          to: `/resources/${item.slug}`,
        });
      }
    });

    BLOG_POSTS.forEach((item) => {
      if (matchesSearch(q, [item.title, item.category, item.excerpt])) {
        hits.push({
          id: item.id,
          section: 'Blog',
          title: item.title,
          subtitle: `${item.category} · ${item.readingTime}`,
          to: `/blog/${item.slug}`,
        });
      }
    });

    return hits.slice(0, 12);
  }, [query]);

  function handleSelect(to: string) {
    onClose();
    navigate(to);
  }

  function renderIcon(section: SearchHit['section']) {
    switch (section) {
      case 'Scholarship':
        return <GraduationCap className="w-4 h-4 text-[#6956D8]" aria-hidden="true" />;
      case 'Freelancing':
        return <Compass className="w-4 h-4 text-[#6956D8]" aria-hidden="true" />;
      case 'AI Tool':
        return <Cpu className="w-4 h-4 text-[#4DA8FF]" aria-hidden="true" />;
      case 'Free Resource':
        return <BookOpen className="w-4 h-4 text-[#101B3D]" aria-hidden="true" />;
      default:
        return <FileText className="w-4 h-4 text-[#6956D8]" aria-hidden="true" />;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search AspireHub"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#101B3D]/55 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-200">
              <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scholarships, Fiverr/Upwork guides, AI tools, or resources..."
                className="flex-1 min-w-0 text-sm sm:text-base text-[#101B3D] placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#101B3D] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4">
              {!query.trim() ? (
                <div className="p-4">
                  <p className="text-xs font-semibold text-slate-500 mb-3">Quick Shortcuts</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { label: 'Fully Funded Scholarships', to: '/scholarships?category=Fully%20Funded%20Scholarships' },
                      { label: 'Fiverr & Upwork Guides', to: '/freelancing' },
                      { label: 'Compare AI Tools Side by Side', to: '/ai-tools/compare' },
                      { label: 'Academic CV & ATS Resume Guides', to: '/resources/one-page-ats-resume-blueprint' },
                    ].map((shortcut) => (
                      <button
                        key={shortcut.label}
                        type="button"
                        onClick={() => handleSelect(shortcut.to)}
                        className="flex items-center justify-between px-3.5 py-2.5 text-left text-sm font-medium text-[#101B3D] bg-[#F7F8FC] hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{shortcut.label}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="py-10 px-4 text-center">
                  <p className="text-sm font-semibold text-[#101B3D]">
                    No matching entries for "{query}"
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try broader terms such as "UK", "Fiverr", "coding", "resume", or "Master's".
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {results.map((hit) => (
                    <li key={`${hit.section}-${hit.id}`}>
                      <button
                        type="button"
                        onClick={() => handleSelect(hit.to)}
                        className="w-full flex items-center justify-between gap-3 px-3 py-3 text-left rounded-lg hover:bg-[#F7F8FC] transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="mt-0.5 shrink-0">{renderIcon(hit.section)}</div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#101B3D] truncate">{hit.title}</p>
                            <p className="text-xs text-slate-500 truncate">
                              {hit.section} · {hit.subtitle}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
