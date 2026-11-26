import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Bookmark,
  Calendar,
  Trash2,
  X,
} from 'lucide-react';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { ScholarshipTrackingStage } from '../types';

type DrawerTab = 'all' | 'scholarships' | 'other';

export function BookmarksDrawer() {
  const {
    bookmarks,
    upcomingReminders,
    isDrawerOpen,
    closeDrawer,
    removeBookmark,
    clearBookmarks,
    updateBookmarkTracking,
  } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<DrawerTab>('all');

  const filteredBookmarks = useMemo(() => {
    if (activeTab === 'scholarships') {
      return bookmarks.filter((b) => b.type === 'scholarship');
    }
    if (activeTab === 'other') {
      return bookmarks.filter((b) => b.type !== 'scholarship');
    }
    return bookmarks;
  }, [bookmarks, activeTab]);

  const scholarshipCount = useMemo(
    () => bookmarks.filter((b) => b.type === 'scholarship').length,
    [bookmarks]
  );

  const stageOptions: Array<{ value: ScholarshipTrackingStage; label: string }> = [
    { value: 'Researching', label: t.tracker.stageResearching },
    { value: 'Preparing Docs', label: t.tracker.stagePreparing },
    { value: 'Submitted', label: t.tracker.stageSubmitted },
    { value: 'Shortlisted', label: t.tracker.stageShortlisted },
  ];

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.tracker.drawerTitle}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex justify-end bg-[#101B3D]/50 backdrop-blur-xs"
          onClick={closeDrawer}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? undefined : { x: '100%' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg bg-white dark:bg-[#131D3B] h-full shadow-2xl border-l border-slate-200 dark:border-[#243668] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-[#243668] flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#101B3D] dark:text-slate-100">
                  {t.tracker.drawerTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  {bookmarks.length}{' '}
                  {bookmarks.length === 1 ? t.tracker.savedSingular : t.tracker.savedPlural}{' '}
                  {t.tracker.savedInBrowser}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close saved drawer"
                className="p-2 rounded-lg text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Filter Tabs */}
            {bookmarks.length > 0 && (
              <div className="px-6 py-2.5 bg-[#F7F8FC] dark:bg-[#0D152E] border-b border-slate-200 dark:border-[#243668] flex items-center gap-2 overflow-x-auto">
                {[
                  { id: 'all' as DrawerTab, label: `${t.tracker.allTab} (${bookmarks.length})` },
                  {
                    id: 'scholarships' as DrawerTab,
                    label: `${t.tracker.scholarshipsTab} (${scholarshipCount})`,
                  },
                  {
                    id: 'other' as DrawerTab,
                    label: `${t.tracker.otherTab} (${bookmarks.length - scholarshipCount})`,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#6956D8] text-white'
                        : 'bg-white dark:bg-[#131D3B] text-[#202A44] dark:text-slate-300 border border-slate-200 dark:border-[#243668]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Upcoming Reminders Banner */}
            {upcomingReminders.length > 0 && (
              <div className="mx-6 mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/60 flex items-start gap-2.5">
                <BellRing className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <p className="font-bold">
                    {t.tracker.upcomingAlertTitle} ({upcomingReminders.length})
                  </p>
                  <ul className="space-y-0.5">
                    {upcomingReminders.slice(0, 3).map((alert) => (
                      <li key={`rem-${alert.item.id}`} className="truncate">
                        <Link
                          to={alert.item.path}
                          onClick={closeDrawer}
                          className="font-semibold underline underline-offset-2"
                        >
                          {alert.item.title}
                        </Link>{' '}
                        — <span className="tabular-nums">{alert.item.reminderDate}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Bookmarks List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredBookmarks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-11 h-11 rounded-lg bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-[#243668] flex items-center justify-center mx-auto mb-3 text-[#6956D8]">
                    <Bookmark className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#101B3D] dark:text-slate-100">
                    {t.tracker.emptyTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
                    {t.tracker.emptyDesc}
                  </p>
                </div>
              ) : (
                <ul className="space-y-3.5">
                  {filteredBookmarks.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6956D8] dark:text-[#4DA8FF]">
                              {item.type.replace('-', ' ')}
                            </span>
                            {item.isExpired && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 dark:text-red-400">
                                <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                                {t.common.expired}
                              </span>
                            )}
                          </div>
                          <Link
                            to={item.path}
                            onClick={closeDrawer}
                            className="text-sm font-semibold text-[#101B3D] dark:text-slate-100 hover:text-[#6956D8] dark:hover:text-[#4DA8FF] transition-colors block"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                            {item.subtitle}
                          </p>
                          {item.deadline && (
                            <p className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              <Calendar className="w-3 h-3" aria-hidden="true" />
                              {item.deadline}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            removeBookmark(item.id);
                            showToast(t.common.removedFromBookmarks, 'info');
                          }}
                          aria-label={`Remove ${item.title}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Scholarship Tracking Controls */}
                      {item.type === 'scholarship' && (
                        <div className="pt-2.5 border-t border-slate-200/80 dark:border-[#243668] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label
                              htmlFor={`stage-${item.id}`}
                              className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1"
                            >
                              {t.tracker.stageLabel}
                            </label>
                            <select
                              id={`stage-${item.id}`}
                              value={item.trackingStage || 'Researching'}
                              onChange={(e) =>
                                updateBookmarkTracking(item.id, {
                                  trackingStage: e.target.value as ScholarshipTrackingStage,
                                })
                              }
                              className="w-full px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100"
                            >
                              {stageOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor={`rem-${item.id}`}
                              className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1"
                            >
                              {t.tracker.reminderLabel}
                            </label>
                            <input
                              id={`rem-${item.id}`}
                              type="date"
                              value={item.reminderDate || ''}
                              onChange={(e) =>
                                updateBookmarkTracking(item.id, {
                                  reminderDate: e.target.value,
                                })
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor={`note-${item.id}`}
                              className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1"
                            >
                              {t.tracker.notesLabel}
                            </label>
                            <input
                              id={`note-${item.id}`}
                              type="text"
                              value={item.notes || ''}
                              onChange={(e) =>
                                updateBookmarkTracking(item.id, {
                                  notes: e.target.value,
                                })
                              }
                              placeholder={t.tracker.notesPlaceholder}
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-lg text-[#101B3D] dark:text-slate-100 placeholder:text-slate-400"
                            />
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-[#243668] flex items-center justify-between gap-3 bg-[#F7F8FC] dark:bg-[#0D152E]">
              {bookmarks.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    clearBookmarks();
                    showToast(t.common.removedFromBookmarks, 'info');
                  }}
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors cursor-pointer"
                >
                  {t.tracker.clearAll}
                </button>
              ) : (
                <span />
              )}

              <Link
                to="/scholarships"
                onClick={closeDrawer}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-lg transition-colors"
              >
                {t.tracker.browseOpportunities}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
