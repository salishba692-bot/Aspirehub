import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookmarkCheck,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Cpu,
  FileText,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AI_TOOLS_DATA } from '../data/aiToolsData';
import { BLOG_POSTS } from '../data/blogData';
import { FREELANCING_GUIDES } from '../data/freelancingData';
import { FREE_RESOURCES_DATA } from '../data/resourcesData';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { useLanguage } from '../context/LanguageContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AIToolCard } from '../components/AIToolCard';
import { BlogCard } from '../components/BlogCard';
import { GuideCard } from '../components/GuideCard';
import { NewsletterSection } from '../components/NewsletterSection';
import { ResourceCard } from '../components/ResourceCard';
import { SafeImage } from '../components/SafeImage';
import { ScholarshipCard } from '../components/ScholarshipCard';

const HERO_IMAGE = '/src/assets/images/hero_education_campus_1795001582302.jpg';

export function HomePage() {
  const { t } = useLanguage();

  useDocumentTitle(
    'AspireHub – Global Scholarships, Freelancing, Remote Careers & AI Tools',
    'Explore international scholarships, remote jobs, freelancing playbooks, verified AI tools, and free learning guides on AspireHub.',
    {
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AspireHub',
        description:
          'Explore international scholarships, remote jobs, freelancing playbooks, verified AI tools, and free learning guides on AspireHub.',
      },
    }
  );

  const mainCategories = [
    {
      index: '01',
      title: t.sections.pillar1Title,
      description: t.sections.pillar1Desc,
      to: '/scholarships',
      cta: t.sections.pillar1Cta,
      icon: GraduationCap,
    },
    {
      index: '02',
      title: t.sections.pillar2Title,
      description: t.sections.pillar2Desc,
      to: '/freelancing',
      cta: t.sections.pillar2Cta,
      icon: Briefcase,
    },
    {
      index: '03',
      title: t.sections.pillar3Title,
      description: t.sections.pillar3Desc,
      to: '/ai-tools',
      cta: t.sections.pillar3Cta,
      icon: Cpu,
    },
  ];

  const toolkitQuickLinks = [
    {
      title: t.toolkit.tabEligibility,
      description: t.toolkit.eligibilityDesc,
      to: '/toolkit?tab=eligibility',
      icon: ClipboardCheck,
    },
    {
      title: t.toolkit.tabCareerQuiz,
      description: t.toolkit.careerQuizDesc,
      to: '/toolkit?tab=career-quiz',
      icon: Compass,
    },
    {
      title: t.toolkit.tabCvTips,
      description: t.toolkit.cvTipsDesc,
      to: '/toolkit?tab=cv-tips',
      icon: FileText,
    },
    {
      title: t.toolkit.tabSkillQuiz,
      description: t.toolkit.skillQuizDesc,
      to: '/toolkit?tab=skill-quiz',
      icon: Award,
    },
  ];

  const whyAspireHub = [
    {
      title: t.sections.whyCard1Title,
      description: t.sections.whyCard1Desc,
      icon: ShieldCheck,
    },
    {
      title: t.sections.whyCard2Title,
      description: t.sections.whyCard2Desc,
      icon: Compass,
    },
    {
      title: t.sections.whyCard3Title,
      description: t.sections.whyCard3Desc,
      icon: CheckCircle2,
    },
    {
      title: t.sections.whyCard4Title,
      description: t.sections.whyCard4Desc,
      icon: BookmarkCheck,
    },
  ];

  const featuredScholarships = SCHOLARSHIPS_DATA.filter((item) => item.featured).slice(0, 3);
  const popularGuides = FREELANCING_GUIDES.filter((item) => item.featured).slice(0, 4);
  const trendingTools = AI_TOOLS_DATA.filter((item) => item.popular).slice(0, 6);
  const latestPosts = BLOG_POSTS.slice(0, 3);
  const featuredResources = FREE_RESOURCES_DATA.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#101B3D] via-[#172552] to-[#3B2E8A] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 15%, rgba(77, 168, 255, 0.25), transparent 42%), radial-gradient(circle at 12% 88%, rgba(105, 86, 216, 0.4), transparent 45%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#4DA8FF] mb-3">
                {t.hero.kicker}
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.12] max-w-2xl">
                {t.hero.title}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-200/90 max-w-xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/scholarships"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#6956D8] hover:bg-[#5542C0] rounded-xl shadow-lg shadow-[#6956D8]/25 transition-colors whitespace-nowrap"
                >
                  {t.hero.primaryCta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/ai-tools"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/18 border border-white/25 rounded-xl transition-colors whitespace-nowrap"
                >
                  {t.hero.secondaryCta}
                </Link>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {SCHOLARSHIPS_DATA.length}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">{t.hero.statAwards}</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {FREELANCING_GUIDES.length + FREE_RESOURCES_DATA.length + BLOG_POSTS.length}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">{t.hero.statGuides}</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {AI_TOOLS_DATA.length}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">{t.hero.statTools}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex"
            >
              <div className="w-full rounded-2xl overflow-hidden bg-white/95 p-2 shadow-2xl border border-white/20 flex">
                <SafeImage
                  src={HERO_IMAGE}
                  alt="University students collaborating together in a sunlit campus library with laptops and study books"
                  eager
                  width={1280}
                  height={720}
                  className="w-full h-full min-h-[260px] object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-wide text-[#6956D8] dark:text-[#4DA8FF] mb-2">
            {t.sections.pillarsKicker}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D] dark:text-white">
            {t.sections.pillarsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.to}
                to={category.to}
                className="group bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 hover:border-[#6956D8]/45 dark:hover:border-[#4DA8FF]/50 rounded-xl p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#F7F8FC] dark:bg-[#1B284F] border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-[#6956D8] dark:text-[#4DA8FF] group-hover:bg-[#6956D8] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-medium text-slate-400 tabular-nums">
                      {category.index}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#101B3D] dark:text-white mb-2.5 group-hover:text-[#6956D8] dark:group-hover:text-[#4DA8FF] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 inline-flex items-center gap-1.5 text-sm font-semibold text-[#101B3D] dark:text-slate-100 group-hover:text-[#6956D8] dark:group-hover:text-[#4DA8FF] transition-colors">
                  {category.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="bg-white dark:bg-[#111A36] border-y border-slate-200/80 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#6956D8] dark:text-[#4DA8FF] mb-2">
                {t.sections.scholarshipHubKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D] dark:text-white">
                {t.sections.featuredScholarships}
              </h2>
              <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-2 max-w-xl">
                {t.sections.scholarshipHubDesc}
              </p>
            </div>
            <Link
              to="/scholarships"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] whitespace-nowrap"
            >
              {t.sections.viewAllScholarships}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Student & Career Toolkit Quick-Launch Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#101B3D] via-[#172552] to-[#3B2E8A] text-white rounded-2xl p-7 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#4DA8FF] mb-2">
                {t.sections.toolkitKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.sections.toolkitTitle}
              </h2>
              <p className="text-sm text-slate-200/90 mt-2 leading-relaxed">
                {t.sections.toolkitDesc}
              </p>
            </div>
            <Link
              to="/toolkit"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#6956D8] hover:bg-[#5542C0] rounded-xl transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              {t.sections.openToolkit}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolkitQuickLinks.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="group rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 p-5 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-white/12 flex items-center justify-center text-[#4DA8FF] mb-3.5">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#4DA8FF] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#4DA8FF]">
                    {t.common.explore}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Freelancing & Career Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#6956D8] dark:text-[#4DA8FF] mb-2">
              {t.sections.popularGuidesKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D] dark:text-white">
              {t.sections.popularGuides}
            </h2>
            <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-2 max-w-xl">
              {t.sections.popularGuidesDesc}
            </p>
          </div>
          <Link
            to="/freelancing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] whitespace-nowrap"
          >
            {t.sections.allGuides} ({FREELANCING_GUIDES.length})
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      {/* Trending AI Tools */}
      <section className="bg-white dark:bg-[#111A36] border-y border-slate-200/80 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#6956D8] dark:text-[#4DA8FF] mb-2">
                {t.sections.aiDirKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D] dark:text-white">
                {t.sections.trendingTools}
              </h2>
              <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mt-2 max-w-xl">
                {t.sections.aiDirDesc}
              </p>
            </div>
            <Link
              to="/ai-tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] whitespace-nowrap"
            >
              {t.sections.exploreTools}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTools.map((tool) => (
              <AIToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AspireHub? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-[#6956D8] dark:text-[#4DA8FF] mb-2">
              {t.sections.whyKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D] dark:text-white">
              {t.sections.whyTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#202A44]/80 dark:text-slate-300 leading-relaxed">
              {t.sections.whyDesc}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#101B3D] dark:text-white hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors"
            >
              {t.sections.whyMissionCta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyAspireHub.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white dark:bg-[#141E3D] border border-slate-200/85 dark:border-slate-800 rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F7F8FC] dark:bg-[#1B284F] border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-[#6956D8] dark:text-[#4DA8FF] mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#101B3D] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#202A44]/80 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Learning Resources Preview */}
      <section className="bg-white dark:bg-[#111A36] border-y border-slate-200/80 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#6956D8] dark:text-[#4DA8FF] mb-2">
                {t.sections.resourcesKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D] dark:text-white">
                {t.sections.resourcesTitle}
              </h2>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] whitespace-nowrap"
            >
              {t.sections.browseResources}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Educational Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#6956D8] dark:text-[#4DA8FF] mb-2">
              {t.sections.blogKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D] dark:text-white">
              {t.sections.latestArticles}
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] whitespace-nowrap"
          >
            {t.sections.readAllArticles}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <NewsletterSection />
      </section>
    </div>
  );
}
