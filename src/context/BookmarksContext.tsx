import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BookmarkEntityType, BookmarkItem, ScholarshipTrackingStage } from '../types';
import { useAuth } from './AuthContext';

const BOOKMARKS_KEY = 'aspirehub_bookmarks_v1';

export interface ReminderAlert {
  item: BookmarkItem;
  daysUntil: number;
  isOverdue: boolean;
}

interface BookmarksContextValue {
  bookmarks: BookmarkItem[];
  isBookmarked: (id: string) => boolean;
  getBookmark: (id: string) => BookmarkItem | undefined;
  toggleBookmark: (item: Omit<BookmarkItem, 'savedAt'>) => boolean;
  updateBookmarkTracking: (
    id: string,
    patch: {
      trackingStage?: ScholarshipTrackingStage;
      reminderDate?: string;
      notes?: string;
    }
  ) => void;
  removeBookmark: (id: string) => void;
  clearBookmarks: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  getCountByType: (type: BookmarkEntityType) => number;
  upcomingReminders: ReminderAlert[];
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
  const { isAuthenticated, serverBookmarks, clearServerBookmarks, syncBookmarks } = useAuth();
  const skipNextSyncRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch {
      // Ignore storage quota errors silently
    }
    if (isAuthenticated) {
      if (skipNextSyncRef.current) {
        skipNextSyncRef.current = false;
      } else {
        void syncBookmarks(bookmarks);
      }
    }
  }, [bookmarks, isAuthenticated, syncBookmarks]);

  useEffect(() => {
    if (!isAuthenticated || !serverBookmarks) return;
    setBookmarks((localList) => {
      const mergedMap = new Map<string, BookmarkItem>();
      for (const item of serverBookmarks) {
        mergedMap.set(item.id, item);
      }
      for (const localItem of localList) {
        if (!mergedMap.has(localItem.id)) {
          mergedMap.set(localItem.id, localItem);
        }
      }
      const merged = Array.from(mergedMap.values());
      const serverIds = new Set(serverBookmarks.map((b) => b.id));
      const hadLocalAdditions = localList.some((b) => !serverIds.has(b.id));
      skipNextSyncRef.current = !hadLocalAdditions;
      return merged;
    });
    clearServerBookmarks();
  }, [isAuthenticated, serverBookmarks, clearServerBookmarks]);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((entry) => entry.id === id),
    [bookmarks]
  );

  const getBookmark = useCallback(
    (id: string) => bookmarks.find((entry) => entry.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback((item: Omit<BookmarkItem, 'savedAt'>): boolean => {
    let added = false;
    setBookmarks((prev) => {
      const exists = prev.some((entry) => entry.id === item.id);
      if (exists) {
        added = false;
        return prev.filter((entry) => entry.id !== item.id);
      }
      added = true;
      return [
        {
          ...item,
          trackingStage:
            item.type === 'scholarship' ? item.trackingStage ?? 'Researching' : item.trackingStage,
          savedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
    return added;
  }, []);

  const updateBookmarkTracking = useCallback(
    (
      id: string,
      patch: {
        trackingStage?: ScholarshipTrackingStage;
        reminderDate?: string;
        notes?: string;
      }
    ) => {
      setBookmarks((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry))
      );
    },
    []
  );

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

  const upcomingReminders = useMemo<ReminderAlert[]>(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayMs = todayStart.getTime();
    const MS_PER_DAY = 86_400_000;

    return bookmarks
      .filter((item) => item.type === 'scholarship' && Boolean(item.reminderDate))
      .map((item) => {
        const target = new Date(`${item.reminderDate}T00:00:00`);
        const diffDays = Math.ceil((target.getTime() - todayMs) / MS_PER_DAY);
        return {
          item,
          daysUntil: diffDays,
          isOverdue: diffDays < 0,
        };
      })
      .filter((alert) => !Number.isNaN(alert.daysUntil) && alert.daysUntil <= 21)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [bookmarks]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        getBookmark,
        toggleBookmark,
        updateBookmarkTracking,
        removeBookmark,
        clearBookmarks,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        getCountByType,
        upcomingReminders,
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
