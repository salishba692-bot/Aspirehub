import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookmarksProvider } from './context/BookmarksContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AdvisorChatbot } from './components/AdvisorChatbot';
import { AuthModal } from './components/AuthModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';
import { GetStartedModal } from './components/GetStartedModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';

const ScholarshipsPage = lazy(() =>
  import('./pages/ScholarshipsPage').then((m) => ({ default: m.ScholarshipsPage }))
);
const ScholarshipDetailPage = lazy(() =>
  import('./pages/ScholarshipDetailPage').then((m) => ({ default: m.ScholarshipDetailPage }))
);
const FreelancingPage = lazy(() =>
  import('./pages/FreelancingPage').then((m) => ({ default: m.FreelancingPage }))
);
const FreelancingDetailPage = lazy(() =>
  import('./pages/FreelancingDetailPage').then((m) => ({ default: m.FreelancingDetailPage }))
);
const AIToolsPage = lazy(() =>
  import('./pages/AIToolsPage').then((m) => ({ default: m.AIToolsPage }))
);
const AIToolsComparePage = lazy(() =>
  import('./pages/AIToolsComparePage').then((m) => ({ default: m.AIToolsComparePage }))
);
const AIToolDetailPage = lazy(() =>
  import('./pages/AIToolDetailPage').then((m) => ({ default: m.AIToolDetailPage }))
);
const ResourcesPage = lazy(() =>
  import('./pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage }))
);
const ResourceDetailPage = lazy(() =>
  import('./pages/ResourceDetailPage').then((m) => ({ default: m.ResourceDetailPage }))
);
const ToolkitPage = lazy(() =>
  import('./pages/ToolkitPage').then((m) => ({ default: m.ToolkitPage }))
);
const BlogPage = lazy(() =>
  import('./pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const BlogDetailPage = lazy(() =>
  import('./pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const DisclaimerPage = lazy(() =>
  import('./pages/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage }))
);
const AccountPage = lazy(() =>
  import('./pages/AccountPage').then((m) => ({ default: m.AccountPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function RouteLoadingFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <LoadingSkeleton count={3} />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [advisorOpen, setAdvisorOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC] text-[#202A44] dark:bg-[#0D152E] dark:text-slate-200 transition-colors">
      <ScrollToTop />
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGetStarted={() => setGetStartedOpen(true)}
      />

      <main className="flex-1">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/scholarships/:slug" element={<ScholarshipDetailPage />} />
            <Route path="/freelancing" element={<FreelancingPage />} />
            <Route path="/freelancing/:slug" element={<FreelancingDetailPage />} />
            <Route path="/ai-tools" element={<AIToolsPage />} />
            <Route path="/ai-tools/compare" element={<AIToolsComparePage />} />
            <Route path="/ai-tools/:slug" element={<AIToolDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            <Route path="/toolkit" element={<ToolkitPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal />
      <BookmarksDrawer />
      <GetStartedModal
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
        onOpenAdvisor={() => setAdvisorOpen(true)}
      />
      <AdvisorChatbot
        isOpen={advisorOpen}
        onOpen={() => setAdvisorOpen(true)}
        onClose={() => setAdvisorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <AuthProvider>
              <BookmarksProvider>
                <AppShell />
              </BookmarksProvider>
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
