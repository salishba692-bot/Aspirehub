import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  GitCompareArrows,
  Plus,
  X,
} from 'lucide-react';
import { AI_TOOLS_DATA } from '../data/aiToolsData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AITool } from '../types';
import { getAIToolIcon } from '../components/AIToolCard';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { PageHeader } from '../components/PageHeader';
import { RelatedCrossLinks } from '../components/RelatedCrossLinks';

const PRESET_COMPARISONS = [
  {
    label: 'DeepSeek vs Grok vs ChatGPT',
    slugs: ['deepseek', 'grok', 'chatgpt'],
  },
  {
    label: 'Lovable vs Replit vs Bolt.new',
    slugs: ['lovable', 'replit', 'bolt-new'],
  },
  {
    label: 'Readdy vs Gamma vs Canva',
    slugs: ['readdy-ai', 'gamma-app', 'canva-magic-studio'],
  },
  {
    label: 'Claude vs Perplexity vs NotebookLM',
    slugs: ['claude', 'perplexity-ai', 'notebooklm'],
  },
];

const COMPARE_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'AI Tools', to: '/ai-tools' },
  { label: 'Compare AI Tools' },
];

export function AIToolsComparePage() {
  useDocumentTitle(
    'Compare AI Tools Side by Side – AspireHub',
    'Compare DeepSeek, Grok, ChatGPT, Claude, Lovable, Replit, Readdy, and more side by side across pricing, free tiers, features, and use cases.',
    { breadcrumbs: COMPARE_BREADCRUMBS }
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSlugs = useMemo(() => {
    const raw = searchParams.get('tools');
    if (!raw) return ['deepseek', 'grok', 'chatgpt'];
    const parsed = raw
      .split(',')
      .map((s) => s.trim())
      .filter((slug) => AI_TOOLS_DATA.some((t) => t.slug === slug));
    return parsed.length > 0 ? Array.from(new Set(parsed)).slice(0, 3) : ['deepseek', 'grok', 'chatgpt'];
  }, [searchParams]);

  const selectedTools: AITool[] = useMemo(
    () =>
      selectedSlugs
        .map((slug) => AI_TOOLS_DATA.find((t) => t.slug === slug))
        .filter((item): item is AITool => Boolean(item)),
    [selectedSlugs]
  );

  function updateSelectedSlugs(nextSlugs: string[]) {
    const clean = Array.from(new Set(nextSlugs)).slice(0, 3);
    if (clean.length === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ tools: clean.join(',') });
    }
  }

  function handleSlotChange(slotIndex: number, newSlug: string) {
    const next = [...selectedSlugs];
    if (!newSlug) {
      next.splice(slotIndex, 1);
    } else {
      next[slotIndex] = newSlug;
    }
    updateSelectedSlugs(next);
  }

  function handleAddTool(slug: string) {
    if (selectedSlugs.includes(slug) || selectedSlugs.length >= 3) return;
    updateSelectedSlugs([...selectedSlugs, slug]);
  }

  function handleRemoveSlot(slotIndex: number) {
    if (selectedSlugs.length <= 1) return;
    const next = [...selectedSlugs];
    next.splice(slotIndex, 1);
    updateSelectedSlugs(next);
  }

  const remainingTools = AI_TOOLS_DATA.filter((t) => !selectedSlugs.includes(t.slug));

  return (
    <div>
      <PageHeader
        sectionLabel="Side-by-Side Comparison"
        title="Compare AI Tools"
        subtitle="Compare up to 3 AI tools directly across pricing, free tier limits, core strengths, platforms, features, and limitations."
        breadcrumbCurrent="Compare AI Tools"
        parentLink={{ label: 'AI Tools', to: '/ai-tools' }}
        showBreadcrumb={false}
      />

      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <Breadcrumb items={COMPARE_BREADCRUMBS} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/ai-tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202A44] hover:text-[#6956D8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to AI Tools Directory
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">Popular Matchups:</span>
            {PRESET_COMPARISONS.map((preset) => {
              const isCurrent =
                preset.slugs.length === selectedSlugs.length &&
                preset.slugs.every((s, idx) => selectedSlugs[idx] === s);
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => updateSelectedSlugs(preset.slugs)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#6956D8] text-white'
                      : 'bg-white text-[#101B3D] border border-slate-200 hover:border-[#6956D8]/40'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tool Slot Selector Bar */}
        <section
          aria-label="Select Tools to Compare"
          className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <GitCompareArrows className="w-5 h-5 text-[#6956D8]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#101B3D]">
                Select 2 or 3 Tools to Compare ({selectedTools.length}/3)
              </h2>
            </div>

            {selectedTools.length < 3 && remainingTools.length > 0 && (
              <button
                type="button"
                onClick={() => handleAddTool(remainingTools[0].slug)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6956D8] bg-[#6956D8]/10 hover:bg-[#6956D8]/15 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                Add 3rd Tool
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedTools.map((tool, index) => (
              <div
                key={`${tool.id}-${index}`}
                className="p-3.5 rounded-xl bg-[#F7F8FC] border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor={`compare-slot-${index}`}
                    className="text-xs font-semibold text-slate-500"
                  >
                    Tool {index + 1}
                  </label>
                  {selectedTools.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(index)}
                      aria-label={`Remove ${tool.name} from slot ${index + 1}`}
                      className="text-slate-400 hover:text-red-600 p-1 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <select
                  id={`compare-slot-${index}`}
                  value={tool.slug}
                  onChange={(e) => handleSlotChange(index, e.target.value)}
                  className="w-full px-3 py-2 text-sm font-semibold bg-white border border-slate-200 rounded-lg text-[#101B3D] focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                >
                  {AI_TOOLS_DATA.map((option) => {
                    const alreadyInOtherSlot =
                      option.slug !== tool.slug && selectedSlugs.includes(option.slug);
                    return (
                      <option
                        key={option.id}
                        value={option.slug}
                        disabled={alreadyInOtherSlot}
                      >
                        {option.name} ({option.category})
                      </option>
                    );
                  })}
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* Full Side-by-Side Comparison Matrix */}
        <section
          aria-label="Detailed AI Tools Comparison Table"
          className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#101B3D] text-white">
                  <th className="p-5 text-xs font-semibold uppercase tracking-wider w-48 align-top">
                    Comparison Criteria
                  </th>
                  {selectedTools.map((tool) => {
                    const Icon = getAIToolIcon(tool.iconKey);
                    return (
                      <th key={tool.id} className="p-5 min-w-[240px] align-top border-l border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#4DA8FF] shrink-0">
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <div>
                            <Link
                              to={`/ai-tools/${tool.slug}`}
                              className="text-base font-bold text-white hover:text-[#4DA8FF] transition-colors"
                            >
                              {tool.name}
                            </Link>
                            <p className="text-xs font-normal text-slate-300">{tool.category}</p>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-sm">
                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Summary
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 text-[#202A44]/90 leading-relaxed align-top border-l border-slate-100">
                      {t.shortDescription}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Pricing Model
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 align-top border-l border-slate-100">
                      <span className="font-bold text-[#6956D8] block">{t.pricingType}</span>
                      <span className="text-xs text-slate-500 mt-1 block leading-relaxed">
                        {t.pricingNote}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Free Tier Access
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 font-medium text-[#101B3D] align-top border-l border-slate-100">
                      {t.comparison.freeTierAvailable}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Best For
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 text-[#202A44] align-top border-l border-slate-100 leading-relaxed">
                      {t.comparison.bestFor}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Standout Strength
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 font-medium text-[#101B3D] align-top border-l border-slate-100 leading-relaxed">
                      {t.comparison.keyStrength}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Supported Platforms
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 text-[#202A44] align-top border-l border-slate-100">
                      {t.comparison.platforms}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Learning Curve
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 font-medium text-[#101B3D] align-top border-l border-slate-100">
                      {t.comparison.learningCurve}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Main Features
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 align-top border-l border-slate-100">
                      <ul className="space-y-2">
                        {t.mainFeatures.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#202A44]/90">
                            <CheckCircle2
                              className="w-4 h-4 text-[#6956D8] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Best Use Cases
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 align-top border-l border-slate-100">
                      <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-sm text-[#202A44]/90">
                        {t.useCases.map((uc, i) => (
                          <li key={i}>{uc}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Limitations
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 align-top border-l border-slate-100">
                      <ul className="space-y-2">
                        {t.limitations.map((lim, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#202A44]/85">
                            <AlertCircle
                              className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{lim}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#101B3D] bg-[#F7F8FC] align-top">
                    Actions
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="p-5 align-top border-l border-slate-100">
                      <div className="flex flex-col gap-2">
                        <Link
                          to={`/ai-tools/${t.slug}`}
                          className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors"
                        >
                          Read Full Profile
                        </Link>
                        <a
                          href={t.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold text-[#6956D8] bg-[#F7F8FC] hover:bg-slate-200/70 border border-slate-200 rounded-lg transition-colors"
                        >
                          Official Website
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <RelatedCrossLinks
          heading="Learn How to Apply These AI Tools"
          links={[
            {
              title: 'Using AI Tools to Study Faster Without Losing Core Skills',
              description: 'Active-recall and verification guidelines for students.',
              to: '/blog/using-ai-tools-to-learn-faster-without-hollowing-out-your-skills',
              badge: 'Blog',
            },
            {
              title: 'Full-Stack Web Development Curriculum',
              description: 'Combine Lovable, Replit, or Cursor with strong coding fundamentals.',
              to: '/resources/full-stack-web-development-curriculum-guide',
              badge: 'Resource',
            },
          ]}
        />
      </div>
    </div>
  );
}
