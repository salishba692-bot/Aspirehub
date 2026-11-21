import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101B3D] text-slate-300 border-t border-[#1E2E5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" aria-label="AspireHub Home" className="inline-block">
              <BrandLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm">
              Making educational opportunities, complete on-site freelancing playbooks, and modern
              AI productivity resources accessible for students and beginners worldwide.
            </p>
            <div className="flex items-center gap-3 pt-1">
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
                to="/about"
                aria-label="About AspireHub"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Scholarships</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/scholarships" className="hover:text-white transition-colors">
                  Scholarship Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarships?category=Pakistan%20Scholarships"
                  className="hover:text-white transition-colors"
                >
                  Pakistan Scholarships
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
                  to="/blog/how-to-write-a-standout-statement-of-purpose"
                  className="hover:text-white transition-colors"
                >
                  SOP Writing Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">Freelancing &amp; Career</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/freelancing" className="hover:text-white transition-colors">
                  Freelancing Complete Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/freelancing/fiverr-complete-guide-for-beginners"
                  className="hover:text-white transition-colors"
                >
                  Fiverr Complete Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/freelancing/upwork-complete-guide-winning-proposals"
                  className="hover:text-white transition-colors"
                >
                  Upwork Proposal Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/one-page-ats-resume-blueprint"
                  className="hover:text-white transition-colors"
                >
                  ATS Resume Blueprint
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">Guides &amp; Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/ai-tools" className="hover:text-white transition-colors">
                  AI Tools Directory
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Free Learning Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/interview-preparation-complete-handbook"
                  className="hover:text-white transition-colors"
                >
                  Interview Prep Handbook
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Editorial Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About AspireHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} AspireHub. Built for students, graduates, and independent learners.</p>
          <p>All articles, study plans, and templates hosted directly on AspireHub.</p>
        </div>
      </div>
    </footer>
  );
}
