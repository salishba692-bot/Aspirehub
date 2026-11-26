import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Cpu,
  FileText,
  GraduationCap,
  History,
  Search,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { AI_TOOLS_DATA } from '../data/aiToolsData';
import { BLOG_POSTS } from '../data/blogData';
import { FREELANCING_GUIDES } from '../data/freelancingData';
import { FREE_RESOURCES_DATA } from '../data/resourcesData';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { useLanguage } from '../context/LanguageContext';
import { matchesSearch } from '../utils/formatters';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchSectionFilter =
  | 'All'
  | 'Scholarship'
  | 'Freelancing'
  | 'AI Tool'
  | 'Free Resource'
  | 'Blog'
  | 'Toolkit';

interface SearchHit {
  id: string;
  section: Exclude<SearchSectionFilter, 'All'>;
  title: string;
  subtitle: string;
  to: string;
  badge?: string;
}

const RECENT_SEARCH_KEY = 'aspirehub_recent_searches_v1';

const TOOLKIT_ENTRIES: Array<{
  id: string;
  title: string;
  subtitle: string;
  keywords: string;
  to: string;
}> = [
  {
    id: 'tool-eligibility',
    title: 'Scholarship Eligibility & Readiness Checklist',
    subtitle: 'Interactive Toolkit · Degree readiness & document tracking',
    keywords: 'scholarship eligibility checklist documents transcript ielts gre',
    to: '/toolkit?tab=eligibility',
  },
  {
    id: 'tool-career-quiz',
    title: 'Career & Freelancing Interest Quiz',
    subtitle: 'Interactive Toolkit · Match skills & work style to a career track',
    keywords: 'career interest quiz job path remote freelancing tech',
    to: '/toolkit?tab=career-quiz',
  },
  {
    id: 'tool-cv-tips',
    title: 'ATS Resume & Academic CV Bullet Generator',
    subtitle: 'Interactive Toolkit · Copyable action-verb resume templates',
    keywords: 'resume cv tips generator ats academic bullets template',
    to: '/toolkit?tab=cv-tips',
  },
  {
    id: 'tool-skill-quiz',
    title: 'Practical Skill Assessment Quiz',
    subtitle: 'Interactive Toolkit · Test coding, freelance & scholarship readiness',
    keywords: 'skill assessment quiz test practice readiness score',
    to: '/toolkit?tab=skill-quiz',
  },
];

const SUGGESTED_TOPICS = [
  'Fully Funded',
  'Remote Jobs',
  'DeepSeek',
  'Fiverr',
  'IELTS',
  'ATS Resume',
  'Chevening',
  'Checklist',
];

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<SearchSectionFilter>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCH_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        if (Array.isArray(parsed)) return parsed.slice(0, 6);
      }
    } catch {
      // Ignore storage read error
    }
    return [];
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(0);
    } else {
      setQuery('');
      setSectionFilter('All');
    }
  }, [isOpen]);

  function saveRecentQuery(term: string) {
    const clean = term.trim();
    if (clean.length < 2) return;
    setRecentSearches((prev) => {
      const next = [clean, ...prev.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(
        0,
        6
      );
      try {
        localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage write error
      }
      return next;
    });
  }

  function clearRecentSearches() {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCH_KEY);
    } catch {
      // Ignore storage remove error
    }
  }

  const allMatchingHits = useMemo<SearchHit[]>(() => {
    const q = query.trim();
    if (!q) return [];

    const hits: SearchHit[] = [];

    SCHOLARSHIPS_DATA.forEach((item) => {
      if (
        matchesSearch(q, [
          item.title,
          item.country,
          item.organization,
          item.degreeLevel,
          item.fundingType,
          item.status,
          ...item.subjects,
        ])
      ) {
        hits.push({
          id: item.id,
          section: 'Scholarship',
          title: item.title,
          subtitle: `${item.country} · ${item.degreeLevel} · ${item.fundingType}`,
          badge: item.status === 'Expired' ? t.common.expired : item.isSampleData ? t.common.sampleData : undefined,
          to: `/scholarships/${item.slug}`,
        });
      }
    });

    FREELANCING_GUIDES.forEach((item) => {
      if (matchesSearch(q, [item.title, item.category, item.shortDescription, item.regionScope])) {
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
      if (matchesSearch(q, [item.name, item.category, item.pricingType, item.shortDescription])) {
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

    TOOLKIT_ENTRIES.forEach((item) => {
      if (matchesSearch(q, [item.title, item.subtitle, item.keywords])) {
        hits.push({
          id: item.id,
          section: 'Toolkit',
          title: item.title,
          subtitle: item.subtitle,
          to: item.to,
        });
      }
    });

    return hits;
  }, [query, t.common.expired, t.common.sampleData]);

  const results = useMemo(() => {
    const filtered =
      sectionFilter === 'All'
        ? allMatchingHits
        : allMatchingHits.filter((hit) => hit.section === sectionFilter);
    return filtered.slice(0, 18);
  }, [allMatchingHits, sectionFilter]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, sectionFilter]);

  function handleSelect(to: string) {
    if (query.trim()) {
      saveRecentQuery(query.trim());
    }
    onClose();
    navigate(to);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown' && results.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp' && results.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results.length > 0 && document.activeElement === inputRef.current) {
        e.preventDefault();
        const chosen = results[activeIndex] ?? results[0];
        if (chosen) handleSelect(chosen.to);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const filterTabs: Array<{ id: SearchSectionFilter; label: string; count: number }> = [
    { id: 'All', label: t.search.allTab, count: allMatchingHits.length },
    {
      id: 'Scholarship',
      label: t.search.scholarshipsTab,
      count: allMatchingHits.filter((h) => h.section === 'Scholarship').length,
    },
    {
      id: 'Freelancing',
      label: t.search.careerTab,
      count: allMatchingHits.filter((h) => h.section === 'Freelancing').length,
    },
    {
      id: 'AI Tool',
      label: t.search.aiToolsTab,
      count: allMatchingHits.filter((h) => h.section === 'AI Tool').length,
    },
    {
      id: 'Free Resource',
      label: t.search.resourcesTab,
      count: allMatchingHits.filter((h) => h.section === 'Free Resource').length,
    },
    {
      id: 'Blog',
      label: t.search.blogTab,
      count: allMatchingHits.filter((h) => h.section === 'Blog').length,
    },
    {
      id: 'Toolkit',
      label: t.search.toolkitTab,
      count: allMatchingHits.filter((h) => h.section === 'Toolkit').length,
    },
  ];

  function renderIcon(section: SearchHit['section']) {
    switch (section) {
      case 'Scholarship':
        return <GraduationCap className="w-4 h-4 text-[#6956D8]" aria-hidden="true" />;
      case 'Freelancing':
        return <Compass className="w-4 h-4 text-[#6956D8]" aria-hidden="true" />;
      case 'AI Tool':
        return <Cpu className="w-4 h-4 text-[#4DA8FF]" aria-hidden="true" />;
      case 'Free Resource':
        return <BookOpen className="w-4 h-4 text-[#101B3D] dark:text-[#4DA8FF]" aria-hidden="true" />;
      case 'Toolkit':
        return <Wrench className="w-4 h-4 text-emerald-600" aria-hidden="true" />;
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
          aria-label={t.search.dialogLabel}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-[#101B3D]/60 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl bg-white dark:bg-[#131D3B] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#243668] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-200 dark:border-[#243668]">
              <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-[#101B3D] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs font-medium text-slate-400 hover:text-[#101B3D] dark:hover:text-white px-1.5 py-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Category Filters when typing */}
            {query.trim() && (
              <div className="px-4 py-2.5 bg-[#F7F8FC] dark:bg-[#0D152E] border-b border-slate-200 dark:border-[#243668] flex items-center gap-1.5 overflow-x-auto">
                {filterTabs.map((tab) => {
                  const active = sectionFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSectionFilter(tab.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#6956D8] text-white'
                          : 'bg-white dark:bg-[#131D3B] text-[#202A44] dark:text-slate-300 border border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/50'
                      }`}
                    >
                      {tab.label}{' '}
                      <span className="opacity-75 tabular-nums">({tab.count})</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Results & Suggestions Body */}
            <div className="max-h-[62vh] overflow-y-auto p-3 sm:p-4">
              {!query.trim() ? (
                <div className="space-y-5 p-2">
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <History className="w-3.5 h-3.5" aria-hidden="true" />
                          {t.search.recentTitle}
                        </p>
                        <button
                          type="button"
                          onClick={clearRecentSearches}
                          className="text-xs font-medium text-[#6956D8] dark:text-[#4DA8FF] hover:underline cursor-pointer"
                        >
                          {t.search.clearRecent}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setQuery(term)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F7F8FC] dark:bg-[#0D152E] text-[#101B3D] dark:text-slate-200 border border-slate-200 dark:border-[#243668] hover:border-[#6956D8]/50 transition-colors cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#6956D8]" aria-hidden="true" />
                      {t.search.suggestionsTitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_TOPICS.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setQuery(topic)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#6956D8]/8 text-[#6956D8] dark:text-[#4DA8FF] hover:bg-[#6956D8]/16 transition-colors cursor-pointer"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
                      {t.search.shortcutsTitle}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        {
                          label: t.sections.featuredScholarships,
                          to: '/scholarships?category=Fully%20Funded%20Scholarships',
                        },
                        {
                          label: t.toolkit.title,
                          to: '/toolkit',
                        },
                        {
                          label: t.pages.compareTitle,
                          to: '/ai-tools/compare',
                        },
                        {
                          label: 'Remote Jobs & Internships Guide',
                          to: '/freelancing/remote-jobs-and-global-internships-guide',
                        },
                      ].map((shortcut) => (
                        <button
                          key={shortcut.to}
                          type="button"
                          onClick={() => handleSelect(shortcut.to)}
                          className="flex items-center justify-between px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-[#101B3D] dark:text-slate-100 bg-[#F7F8FC] dark:bg-[#0D152E] hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <span className="truncate">{shortcut.label}</span>
                          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="py-10 px-4 text-center">
                  <p className="text-sm font-semibold text-[#101B3D] dark:text-slate-100">
                    {t.search.noResults} "{query}"
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t.search.noResultsHint}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="px-3 pb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                    {results.length} {t.search.resultsCount}
                  </p>
                  <ul className="divide-y divide-slate-100 dark:divide-[#243668]">
                    {results.map((hit, idx) => {
                      const focused = idx === activeIndex;
                      return (
                        <li key={`${hit.section}-${hit.id}`}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => handleSelect(hit.to)}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-3 text-left rounded-lg transition-colors cursor-pointer ${
                              focused
                                ? 'bg-[#F7F8FC] dark:bg-[#0D152E]'
                                : 'hover:bg-[#F7F8FC] dark:hover:bg-[#0D152E]'
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="mt-0.5 shrink-0">{renderIcon(hit.section)}</div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-semibold text-[#101B3D] dark:text-slate-100 truncate">
                                    {hit.title}
                                  </p>
                                  {hit.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 shrink-0">
                                      {hit.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {hit.section} · {hit.subtitle}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
