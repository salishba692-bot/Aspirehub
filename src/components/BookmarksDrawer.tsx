import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Bookmark, Trash2, X, ArrowRight } from 'lucide-react';
import { useBookmarks } from '../context/BookmarksContext';

export function BookmarksDrawer() {
  const { bookmarks, isDrawerOpen, closeDrawer, removeBookmark, clearBookmarks } = useBookmarks();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Saved Items"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex justify-end bg-[#101B3D]/45 backdrop-blur-xs"
          onClick={closeDrawer}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? undefined : { x: '100%' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#101B3D]">Saved Bookmarks</h2>
                <p className="text-xs text-slate-500 tabular-nums">
                  {bookmarks.length} {bookmarks.length === 1 ? 'item' : 'items'} saved in your browser
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close saved drawer"
                className="p-2 rounded-lg text-slate-400 hover:text-[#101B3D] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {bookmarks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-11 h-11 rounded-lg bg-[#F7F8FC] border border-slate-200 flex items-center justify-center mx-auto mb-3 text-[#6956D8]">
                    <Bookmark className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#101B3D]">No saved items yet</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs mx-auto">
                    Click the bookmark icon on any scholarship, freelancing guide, AI tool, or article
                    to save it here for quick reference.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {bookmarks.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 rounded-xl bg-[#F7F8FC] border border-slate-200/80 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6956D8] mb-0.5">
                          {item.type.replace('-', ' ')}
                        </p>
                        <Link
                          to={item.path}
                          onClick={closeDrawer}
                          className="text-sm font-semibold text-[#101B3D] hover:text-[#6956D8] transition-colors block"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">{item.subtitle}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeBookmark(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 bg-[#F7F8FC]">
              {bookmarks.length > 0 ? (
                <button
                  type="button"
                  onClick={clearBookmarks}
                  className="text-xs font-medium text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              ) : (
                <span />
              )}

              <Link
                to="/scholarships"
                onClick={closeDrawer}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#101B3D] hover:bg-[#192854] rounded-lg transition-colors"
              >
                Browse Opportunities
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
