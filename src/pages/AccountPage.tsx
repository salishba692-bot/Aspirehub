import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  GraduationCap,
  LogOut,
  Save,
  UserCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarksContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { UserFocusGoal } from '../types';
import { PageHeader } from '../components/PageHeader';

const FOCUS_GOALS: UserFocusGoal[] = [
  'All-in-One Growth',
  'Scholarships',
  'Freelancing & Remote Jobs',
  'AI Workflows',
];

export function AccountPage() {
  const { user, isAuthenticated, openAuthModal, updateProfile, logout } = useAuth();
  const { bookmarks, upcomingReminders, getCountByType, openDrawer } = useBookmarks();
  const { t } = useLanguage();
  const { showToast } = useToast();

  useDocumentTitle(
    `${t.auth.dashboardTitle} — AspireHub`,
    t.auth.dashboardSubtitle,
    { robots: 'noindex, nofollow' }
  );

  const [name, setName] = useState(user?.name ?? '');
  const [country, setCountry] = useState(user?.country ?? '');
  const [focusGoal, setFocusGoal] = useState<UserFocusGoal>(user?.focusGoal ?? 'All-in-One Growth');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCountry(user.country);
      setFocusGoal(user.focusGoal);
      setBio(user.bio);
    }
  }, [user]);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      showToast('Please enter your name (at least 2 characters).', 'error');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        name: trimmedName,
        country: country.trim(),
        focusGoal,
        bio: bio.trim(),
      });
      showToast(t.auth.profileSaved, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to save profile.';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        sectionLabel={t.auth.account}
        title={t.auth.dashboardTitle}
        subtitle={t.auth.dashboardSubtitle}
        breadcrumbCurrent={t.auth.account}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isAuthenticated || !user ? (
          <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5">
            <div className="w-12 h-12 rounded-xl bg-[#F7F8FC] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-[#6956D8] dark:text-[#4DA8FF]">
              <UserCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-white">
              {t.auth.welcomeBack}
            </h2>
            <p className="text-sm text-[#202A44]/80 dark:text-slate-300 leading-relaxed">
              {t.auth.authSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-xl transition-colors cursor-pointer"
              >
                {t.auth.signIn}
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('signup')}
                className="px-6 py-2.5 text-sm font-semibold text-[#101B3D] dark:text-white bg-[#F7F8FC] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#6956D8]/40 rounded-xl transition-colors cursor-pointer"
              >
                {t.auth.signUp}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Editable Profile Card */}
            <form
              onSubmit={handleSaveProfile}
              className="lg:col-span-7 bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-[#6956D8]/12 dark:bg-[#4DA8FF]/15 text-[#6956D8] dark:text-[#4DA8FF] font-bold flex items-center justify-center shrink-0">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-[#101B3D] dark:text-white truncate">
                      {user.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    showToast('Signed out.', 'info');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.auth.signOut}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                  >
                    {t.auth.fullNameLabel}
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="profile-country"
                    className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                  >
                    {t.auth.countryLabel}
                  </label>
                  <input
                    id="profile-country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Pakistan, UK, Canada..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-goal"
                  className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                >
                  {t.auth.focusGoalLabel}
                </label>
                <select
                  id="profile-goal"
                  value={focusGoal}
                  onChange={(e) => setFocusGoal(e.target.value as UserFocusGoal)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                >
                  {FOCUS_GOALS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="profile-bio"
                  className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                >
                  {t.auth.bioLabel}
                </label>
                <textarea
                  id="profile-bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Preparing for Master's scholarships and building remote frontend skills..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] disabled:opacity-60 rounded-xl transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" aria-hidden="true" />
                {saving ? t.auth.submitting : t.auth.saveProfile}
              </button>
            </form>

            {/* Saved Items & Tracker Summary */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
                    <Bookmark
                      className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF]"
                      aria-hidden="true"
                    />
                    {t.auth.savedOverview}
                  </h3>
                  <span className="text-xs font-bold tabular-nums text-[#6956D8] dark:text-[#4DA8FF]">
                    {bookmarks.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400">{t.nav.scholarships}</p>
                    <p className="text-lg font-bold text-[#101B3D] dark:text-white tabular-nums mt-0.5">
                      {getCountByType('scholarship')}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400">{t.nav.aiTools}</p>
                    <p className="text-lg font-bold text-[#101B3D] dark:text-white tabular-nums mt-0.5">
                      {getCountByType('ai-tool')}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400">{t.nav.freelancing}</p>
                    <p className="text-lg font-bold text-[#101B3D] dark:text-white tabular-nums mt-0.5">
                      {getCountByType('freelancing')}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400">{t.nav.resources}</p>
                    <p className="text-lg font-bold text-[#101B3D] dark:text-white tabular-nums mt-0.5">
                      {getCountByType('resource') + getCountByType('blog')}
                    </p>
                  </div>
                </div>

                {upcomingReminders.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/60 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      {t.tracker.upcomingAlertTitle}: {upcomingReminders.length}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={openDrawer}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#101B3D] dark:text-white bg-[#F7F8FC] dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  {t.auth.openBookmarks}
                </button>
              </div>

              <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-3">
                <h3 className="text-sm font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
                  <GraduationCap
                    className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF]"
                    aria-hidden="true"
                  />
                  {t.nav.toolkit}
                </h3>
                <div className="flex flex-col gap-2 text-xs font-semibold">
                  <Link
                    to="/toolkit?tab=eligibility"
                    className="inline-flex items-center justify-between py-2 px-3 rounded-lg bg-[#F7F8FC] dark:bg-[#0D152E] text-[#101B3D] dark:text-slate-200 hover:text-[#6956D8] dark:hover:text-[#4DA8FF]"
                  >
                    <span>{t.toolkit.tabEligibility}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/toolkit?tab=career-quiz"
                    className="inline-flex items-center justify-between py-2 px-3 rounded-lg bg-[#F7F8FC] dark:bg-[#0D152E] text-[#101B3D] dark:text-slate-200 hover:text-[#6956D8] dark:hover:text-[#4DA8FF]"
                  >
                    <span>{t.toolkit.tabCareerQuiz}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
