import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookmarkCheck,
  Briefcase,
  CheckCircle2,
  Compass,
  Cpu,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AI_TOOLS_DATA } from '../data/aiToolsData';
import { BLOG_POSTS } from '../data/blogData';
import { FREELANCING_GUIDES } from '../data/freelancingData';
import { FREE_RESOURCES_DATA } from '../data/resourcesData';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AIToolCard } from '../components/AIToolCard';
import { BlogCard } from '../components/BlogCard';
import { GuideCard } from '../components/GuideCard';
import { NewsletterSection } from '../components/NewsletterSection';
import { ResourceCard } from '../components/ResourceCard';
import { SafeImage } from '../components/SafeImage';
import { ScholarshipCard } from '../components/ScholarshipCard';

const HERO_IMAGE = '/src/assets/images/hero_education_campus_1795001582302.jpg';

const MAIN_CATEGORIES = [
  {
    index: '01',
    title: 'Scholarship Hub',
    description:
      'Find local and international scholarships, eligibility details, required documents, and direct official portal links.',
    to: '/scholarships',
    cta: 'Browse Scholarships',
    icon: GraduationCap,
  },
  {
    index: '02',
    title: 'Freelancing Guide',
    description:
      'Learn how to start freelancing, build high-demand skills, create strong portfolios, find clients, and get paid safely.',
    to: '/freelancing',
    cta: 'Read Freelance Guides',
    icon: Briefcase,
  },
  {
    index: '03',
    title: 'AI Tools Directory',
    description:
      'Discover and compare verified AI tools for studying, coding, writing, research, presentations, and daily productivity.',
    to: '/ai-tools',
    cta: 'Explore AI Tools',
    icon: Cpu,
  },
];

const WHY_ASPIREHUB = [
  {
    title: 'Complete On-Site Guides',
    description:
      'Read full step-by-step articles, study plans, resume blueprints, and interview scripts directly on AspireHub without jumping between external sites.',
    icon: ShieldCheck,
  },
  {
    title: 'Structured For Beginners',
    description:
      'No scattered advice. Follow step-by-step roadmaps covering scholarship applications, Fiverr/Upwork proposals, and client boundaries.',
    icon: Compass,
  },
  {
    title: 'Side-by-Side Tool Comparison',
    description:
      'Compare free tiers, learning curves, and core strengths across AI tools before investing your study hours or budget.',
    icon: CheckCircle2,
  },
  {
    title: 'Save & Track Locally',
    description:
      'Bookmark scholarships, guides, and free resources directly in your browser so your shortlist stays one click away.',
    icon: BookmarkCheck,
  },
];

export function HomePage() {
  useDocumentTitle(
    'AspireHub – Scholarships, Freelancing & AI Tools Guide',
    'Explore scholarships, read complete freelancing playbooks, compare verified AI tools, and access free career guides on AspireHub.',
    {
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AspireHub',
        description:
          'Explore scholarships, read complete freelancing playbooks, compare verified AI tools, and access free career guides on AspireHub.',
      },
    }
  );

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
                Scholarships · Freelancing · AI Tools · Free Resources
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.12] max-w-2xl">
                Explore Opportunities. Learn Skills. Build Your Future.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-200/90 max-w-xl leading-relaxed">
                Discover scholarships, master freelancing, and explore the best AI tools to unlock
                your potential.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/scholarships"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#6956D8] hover:bg-[#5542C0] rounded-xl shadow-lg shadow-[#6956D8]/25 transition-colors whitespace-nowrap"
                >
                  Explore Scholarships
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/ai-tools"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/18 border border-white/25 rounded-xl transition-colors whitespace-nowrap"
                >
                  Discover AI Tools
                </Link>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {SCHOLARSHIPS_DATA.length}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">Curated Awards</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {FREELANCING_GUIDES.length + FREE_RESOURCES_DATA.length + BLOG_POSTS.length}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">On-Site Full Guides</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {AI_TOOLS_DATA.length}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">AI Directory Tools</p>
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
          <p className="text-xs font-semibold tracking-wide text-[#6956D8] mb-2">
            Three Core Pillars
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D]">
            Everything you need to move from learning to earning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MAIN_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.to}
                to={category.to}
                className="group bg-white border border-slate-200/90 hover:border-[#6956D8]/45 rounded-xl p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#F7F8FC] border border-slate-200/80 flex items-center justify-center text-[#6956D8] group-hover:bg-[#6956D8] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-medium text-slate-400 tabular-nums">
                      {category.index}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#101B3D] mb-2.5 group-hover:text-[#6956D8] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[#202A44]/85 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 text-sm font-semibold text-[#101B3D] group-hover:text-[#6956D8] transition-colors">
                  {category.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#6956D8] mb-2">
                Scholarship Hub
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D]">
                Featured Scholarships
              </h2>
              <p className="text-sm text-[#202A44]/80 mt-2 max-w-xl">
                Verified official scholarship portals and clearly structured eligibility guides.
              </p>
            </div>
            <Link
              to="/scholarships"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] hover:text-[#5542C0] whitespace-nowrap"
            >
              View All Scholarships
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

      {/* Popular Freelancing Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#6956D8] mb-2">
              Skill &amp; Income Guides
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D]">
              Popular Freelancing Guides
            </h2>
            <p className="text-sm text-[#202A44]/80 mt-2 max-w-xl">
              Step-by-step playbooks covering Fiverr, Upwork, portfolio case studies, and winning
              your first client.
            </p>
          </div>
          <Link
            to="/freelancing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] hover:text-[#5542C0] whitespace-nowrap"
          >
            All 9 Freelancing Guides
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
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#6956D8] mb-2">
                AI Tools Directory
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D]">
                Trending AI Tools
              </h2>
              <p className="text-sm text-[#202A44]/80 mt-2 max-w-xl">
                Practical AI tools for studying, coding, writing, and citation-backed research.
              </p>
            </div>
            <Link
              to="/ai-tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] hover:text-[#5542C0] whitespace-nowrap"
            >
              Explore &amp; Compare Tools
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
            <p className="text-xs font-semibold tracking-wide text-[#6956D8] mb-2">
              Why Choose AspireHub?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D]">
              Clarity and honesty over noisy hype
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#202A44]/80 leading-relaxed">
              Students and beginners deserve complete on-site guides, accurate official portals,
              clearly flagged expired cycles, and interconnected learning paths.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#101B3D] hover:text-[#6956D8] transition-colors"
            >
              Read our mission
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_ASPIREHUB.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200/85 rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F7F8FC] border border-slate-200/80 flex items-center justify-center text-[#6956D8] mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#101B3D] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#202A44]/80 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Learning Resources Preview */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#6956D8] mb-2">
                Free Learning Guides
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D]">
                On-Site Curriculums, CV Templates &amp; Roadmaps
              </h2>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] hover:text-[#5542C0] whitespace-nowrap"
            >
              Browse All Free Guides
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
            <p className="text-xs font-semibold tracking-wide text-[#6956D8] mb-2">
              AspireHub Journal
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101B3D]">
              Latest Educational Articles
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6956D8] hover:text-[#5542C0] whitespace-nowrap"
          >
            Read All Articles
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
