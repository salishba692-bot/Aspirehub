import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Briefcase, Cpu, GraduationCap, Sparkles, X } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor: () => void;
}

const PATHWAYS = [
  {
    title: 'Find & Prepare for Scholarships',
    description:
      'Filter local Pakistan and international awards, verify eligibility, and bookmark upcoming programmes.',
    to: '/scholarships',
    icon: GraduationCap,
  },
  {
    title: 'Start Freelancing Step by Step',
    description:
      'Follow beginner playbooks for Fiverr, Upwork, portfolio case studies, and winning your first client.',
    to: '/freelancing',
    icon: Briefcase,
  },
  {
    title: 'Explore & Compare AI Tools',
    description:
      'Compare verified free and freemium AI tools side by side for studying, coding, writing, and research.',
    to: '/ai-tools/compare',
    icon: Cpu,
  },
];

export function GetStartedModal({ isOpen, onClose, onOpenAdvisor }: GetStartedModalProps) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Choose your AspireHub starting path"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#101B3D]/55 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-[#6956D8] mb-1">Choose Your Track</p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D]">
                  Where would you like to begin today?
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-lg text-slate-400 hover:text-[#101B3D] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3">
              {PATHWAYS.map((path) => {
                const Icon = path.icon;
                return (
                  <button
                    key={path.to}
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(path.to);
                    }}
                    className="w-full p-4 rounded-xl bg-[#F7F8FC] hover:bg-[#6956D8]/8 border border-slate-200/80 hover:border-[#6956D8]/40 text-left flex items-start justify-between gap-4 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#6956D8] shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#101B3D] group-hover:text-[#6956D8] transition-colors">
                          {path.title}
                        </h3>
                        <p className="text-xs text-[#202A44]/80 mt-1 leading-relaxed">
                          {path.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-slate-400 group-hover:text-[#6956D8] shrink-0 mt-1 transition-colors"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdvisor();
                }}
                className="w-full p-4 rounded-xl bg-[#101B3D] hover:bg-[#192854] text-left flex items-start justify-between gap-4 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#6956D8] flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Chat with AspireHub AI Advisor
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Ask multi-turn questions about SOP drafts, freelance proposals, or choosing an AI stack.
                    </p>
                  </div>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-[#4DA8FF] shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
