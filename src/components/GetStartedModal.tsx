import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Briefcase, Cpu, GraduationCap, Sparkles, Wrench, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor: () => void;
}

export function GetStartedModal({ isOpen, onClose, onOpenAdvisor }: GetStartedModalProps) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const pathways = [
    {
      title: t.getStarted.path1Title,
      description: t.getStarted.path1Desc,
      to: '/scholarships',
      icon: GraduationCap,
    },
    {
      title: t.getStarted.path2Title,
      description: t.getStarted.path2Desc,
      to: '/freelancing',
      icon: Briefcase,
    },
    {
      title: t.getStarted.path3Title,
      description: t.getStarted.path3Desc,
      to: '/ai-tools/compare',
      icon: Cpu,
    },
    {
      title: t.getStarted.path4Title,
      description: t.getStarted.path4Desc,
      to: '/toolkit',
      icon: Wrench,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.getStarted.title}
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
            className="w-full max-w-xl bg-white dark:bg-[#131D3B] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#243668] p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] mb-1">
                  {t.getStarted.kicker}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-slate-100">
                  {t.getStarted.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-lg text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3">
              {pathways.map((path) => {
                const Icon = path.icon;
                return (
                  <button
                    key={path.to}
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(path.to);
                    }}
                    className="w-full p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] hover:bg-[#6956D8]/8 border border-slate-200/80 dark:border-[#243668] hover:border-[#6956D8]/40 text-left flex items-start justify-between gap-4 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] flex items-center justify-center text-[#6956D8] dark:text-[#4DA8FF] shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#101B3D] dark:text-slate-100 group-hover:text-[#6956D8] dark:group-hover:text-[#4DA8FF] transition-colors">
                          {path.title}
                        </h3>
                        <p className="text-xs text-[#202A44]/80 dark:text-slate-300 mt-1 leading-relaxed">
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
                      {t.getStarted.advisorTitle}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {t.getStarted.advisorDesc}
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
