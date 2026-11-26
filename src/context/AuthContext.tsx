import React, { createContext, useCallback, useContext, useState } from 'react';
import { BookmarkItem, UserAccount, UserFocusGoal } from '../types';

export type AuthModalMode = 'login' | 'signup';

interface AuthContextValue {
  user: UserAccount | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: AuthModalMode;
  serverBookmarks: BookmarkItem[] | null;
  clearServerBookmarks: () => void;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: AuthModalMode) => void;
  login: (email: string, password: string) => Promise<UserAccount>;
  signup: (
    name: string,
    email: string,
    password: string,
    initialBookmarks?: BookmarkItem[]
  ) => Promise<UserAccount>;
  updateProfile: (patch: {
    name: string;
    country: string;
    focusGoal: UserFocusGoal;
    bio: string;
  }) => Promise<UserAccount>;
  syncBookmarks: (bookmarks: BookmarkItem[]) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Session bearer token stays strictly in React memory (never persisted to browser storage)
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [serverBookmarks, setServerBookmarks] = useState<BookmarkItem[] | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');

  const openAuthModal = useCallback((mode: AuthModalMode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const clearServerBookmarks = useCallback(() => {
    setServerBookmarks(null);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<UserAccount> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      token?: string;
      user?: UserAccount;
      bookmarks?: BookmarkItem[];
      error?: string;
    };
    if (!res.ok || !data.token || !data.user) {
      throw new Error(data.error || 'Unable to sign in.');
    }
    setToken(data.token);
    setUser(data.user);
    setServerBookmarks(Array.isArray(data.bookmarks) ? data.bookmarks : []);
    return data.user;
  }, []);

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      initialBookmarks: BookmarkItem[] = []
    ): Promise<UserAccount> => {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, bookmarks: initialBookmarks }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        token?: string;
        user?: UserAccount;
        bookmarks?: BookmarkItem[];
        error?: string;
      };
      if (!res.ok || !data.token || !data.user) {
        throw new Error(data.error || 'Unable to create account.');
      }
      setToken(data.token);
      setUser(data.user);
      setServerBookmarks(Array.isArray(data.bookmarks) ? data.bookmarks : []);
      return data.user;
    },
    []
  );

  const updateProfile = useCallback(
    async (patch: {
      name: string;
      country: string;
      focusGoal: UserFocusGoal;
      bio: string;
    }): Promise<UserAccount> => {
      if (!token) {
        throw new Error('Please sign in first.');
      }
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patch),
      });
      const data = (await res.json().catch(() => ({}))) as {
        user?: UserAccount;
        error?: string;
      };
      if (!res.ok || !data.user) {
        if (res.status === 401) {
          setToken(null);
          setUser(null);
        }
        throw new Error(data.error || 'Unable to update profile.');
      }
      setUser(data.user);
      return data.user;
    },
    [token]
  );

  const syncBookmarks = useCallback(
    async (bookmarks: BookmarkItem[]): Promise<void> => {
      if (!token) return;
      try {
        const res = await fetch('/api/auth/bookmarks', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookmarks }),
        });
        if (res.status === 401) {
          setToken(null);
          setUser(null);
        }
      } catch {
        // Local bookmarks remain intact even if network sync momentarily fails
      }
    },
    [token]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setServerBookmarks(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isAuthModalOpen,
        authModalMode,
        serverBookmarks,
        clearServerBookmarks,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        login,
        signup,
        updateProfile,
        syncBookmarks,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
