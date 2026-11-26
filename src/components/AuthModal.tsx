import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { isValidEmail } from '../utils/formatters';

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    login,
    signup,
  } = useAuth();
  const { bookmarks } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const nameOrEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthModalOpen) return;
    setError('');
    setTimeout(() => nameOrEmailRef.current?.focus(), 60);
  }, [isAuthModalOpen, authModalMode]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (authModalMode === 'signup' && trimmedName.length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      if (authModalMode === 'signup') {
        const created = await signup(trimmedName, trimmedEmail, password, bookmarks);
        showToast(`${t.auth.welcomeBack}, ${created.name}`, 'success');
      } else {
        const signedIn = await login(trimmedEmail, password);
        showToast(`${t.auth.welcomeBack}, ${signedIn.name}`, 'success');
      }
      setPassword('');
      closeAuthModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to complete request.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101B3D]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="w-full max-w-md bg-white dark:bg-[#141E3D] border border-slate-200 dark:border-[#243668] rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-[#1E2E5C] flex items-start justify-between gap-4">
          <div>
            <h2
              id="auth-modal-title"
              className="text-lg font-bold text-[#101B3D] dark:text-white"
            >
              {authModalMode === 'login' ? t.auth.welcomeBack : t.auth.createAccountTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t.auth.authSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-[#243668]">
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('login');
                setError('');
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                authModalMode === 'login'
                  ? 'bg-white dark:bg-[#192854] text-[#101B3D] dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#101B3D] dark:hover:text-white'
              }`}
            >
              {t.auth.signIn}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('signup');
                setError('');
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                authModalMode === 'signup'
                  ? 'bg-white dark:bg-[#192854] text-[#101B3D] dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#101B3D] dark:hover:text-white'
              }`}
            >
              {t.auth.signUp}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          {authModalMode === 'signup' && (
            <div>
              <label
                htmlFor="auth-name"
                className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
              >
                {t.auth.fullNameLabel}
              </label>
              <div className="relative">
                <User
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  ref={nameOrEmailRef}
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ayesha Khan"
                  autoComplete="name"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="auth-email"
              className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
            >
              {t.auth.emailLabel}
            </label>
            <div className="relative">
              <Mail
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                ref={authModalMode === 'login' ? nameOrEmailRef : undefined}
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="auth-password"
                className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200"
              >
                {t.auth.passwordLabel}
              </label>
              {authModalMode === 'signup' && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.auth.passwordHint}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={authModalMode === 'login' ? 'current-password' : 'new-password'}
                required
                className="w-full pl-9 pr-10 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#101B3D] dark:hover:text-white cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] disabled:opacity-60 rounded-xl transition-colors cursor-pointer"
          >
            {submitting
              ? t.auth.submitting
              : authModalMode === 'login'
                ? t.auth.signIn
                : t.auth.signUp}
          </button>

          <div className="pt-2 border-t border-slate-100 dark:border-[#1E2E5C] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {authModalMode === 'login' ? t.auth.noAccountPrompt : t.auth.haveAccountPrompt}{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode(authModalMode === 'login' ? 'signup' : 'login');
                  setError('');
                }}
                className="font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:underline cursor-pointer"
              >
                {authModalMode === 'login' ? t.auth.signUp : t.auth.signIn}
              </button>
            </span>
            <Link
              to="/privacy-policy"
              onClick={closeAuthModal}
              className="hover:underline"
            >
              {t.footer.privacyLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
