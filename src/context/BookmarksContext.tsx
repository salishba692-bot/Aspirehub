import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { BookmarkEntityType, BookmarkItem } from '../types';

const BOOKMARKS_KEY = 'aspirehub_bookmarks_v1';

interface BookmarksContextValue {
  bookmarks: BookmarkItem[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (item: Omit<BookmarkItem, 'savedAt'>) => void;
  removeBookmark: (id: string) => void;
  clearBookmarks: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  getCountByType: (type: BookmarkEntityType) => number;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

function readStoredBookmarks(): BookmarkItem[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => readStoredBookmarks());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch {
      // Ignore storage quota errors silently
    }
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((entry) => entry.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback((item: Omit<BookmarkItem, 'savedAt'>) => {
    setBookmarks((prev) => {
      const exists = prev.some((entry) => entry.id === item.id);
      if (exists) {
        return prev.filter((entry) => entry.id !== item.id);
      }
      return [{ ...item, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const getCountByType = useCallback(
    (type: BookmarkEntityType) => bookmarks.filter((item) => item.type === type).length,
    [bookmarks]
  );

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearBookmarks,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        getCountByType,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks(): BookmarksContextValue {
  const ctx = useContext(BookmarksContext);
  if (!ctx) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return ctx;
}
