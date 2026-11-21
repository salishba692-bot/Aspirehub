import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass, Eye, ShieldCheck, Target } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NewsletterSection } from '../components/NewsletterSection';
import { PageHeader } from '../components/PageHeader';
import { SafeImage } from '../components/SafeImage';

const ABOUT_IMAGE = '/src/assets/images/about_mentorship_study_1795001583679.jpg';

const PLATFORM_BENEFITS = [
  {
    title: 'Clear Scholarship Structure',
    description:
      'Every scholarship page organizes eligibility, required documents, benefits, official portal links, and expired-cycle warnings in one predictable layout.',
    icon: ShieldCheck,
  },
  {
    title: 'Practical Freelancing Roadmaps',
    description:
      'Actionable beginner guides covering Fiverr, Upwork, portfolio building without prior clients, communication scripts, and fair pricing.',
    icon: Compass,
  },
  {
    title: 'Honest AI Tool Comparisons',
    description:
      'Compare free tiers, supported platforms, and real limitations of AI tools without exaggerated claims or fabricated pricing.',
    icon: CheckCircle2,
  },
];

export function AboutPage() {
  useDocumentTitle(
    'About Us — AspireHub',
    'Learn about AspireHub’s mission, vision, and commitment to accessible education, digital skills, and transparent guidance.'
  );

  return (
    <div>
      <PageHeader
        sectionLabel="About AspireHub"
        title="Accessible guidance for students, graduates, and beginners"
        subtitle="Building one dependable place to discover scholarships, learn practical digital skills, and navigate modern AI workflows responsibly."
        breadcrumbCurrent="About Us"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Mission & Visual */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-10 flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6956D8] mb-2">
                <Target className="w-4 h-4" aria-hidden="true" />
                Our Mission
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101B3D] leading-snug">
                Removing information barriers between talent and opportunity
              </h2>
              <p className="mt-4 text-base text-[#202A44]/90 leading-relaxed">
                Our mission is to make educational opportunities, digital skills, and modern
                technology resources accessible to everyone. We help students and beginners discover
                opportunities and build a better future.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6956D8] mb-2">
                <Eye className="w-4 h-4" aria-hidden="true" />
                Our Vision
              </div>
              <p className="text-sm sm:text-base text-[#202A44]/85 leading-relaxed">
                A future where any motivated learner—regardless of background or geography—can find
                trustworthy scholarship guidance, master an independent digital income skill, and
                use AI tools thoughtfully to accelerate their growth.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200/90 bg-white min-h-[280px]">
            <SafeImage
              src={ABOUT_IMAGE}
              alt="Academic advisor mentoring university students over laptops and study roadmaps"
              eager
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Platform Benefits */}
        <section>
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold text-[#6956D8] mb-2">Platform Benefits</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101B3D]">
              Designed for clarity, accuracy, and real next steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLATFORM_BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white border border-slate-200/90 rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F7F8FC] border border-slate-200 flex items-center justify-center text-[#6956D8] mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-[#101B3D] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#202A44]/85 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data Transparency & Architecture */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D]">
              Our Commitment to Honest Information
            </h2>
            <p className="text-sm sm:text-base text-[#202A44]/85 leading-relaxed">
              Too many student portals publish outdated deadlines or fabricated scholarship promises
              for clicks. AspireHub strictly separates verified official portals from clearly labeled
              sample entries and marks closed cycles as expired. All bookmarks and newsletter
              previews in this edition operate cleanly in your browser while maintaining a modular
              data layer ready for PHP and MySQL integration.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/scholarships"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-xl transition-colors"
            >
              Explore Scholarships
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/freelancing"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#101B3D] bg-[#F7F8FC] hover:bg-slate-200/70 border border-slate-200 rounded-xl transition-colors"
            >
              Start Freelancing Guide
            </Link>
          </div>
        </section>

        <NewsletterSection />
      </div>
    </div>
  );
}
