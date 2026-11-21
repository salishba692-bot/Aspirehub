import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { BookmarksProvider } from './context/BookmarksContext';
import { AdvisorChatbot } from './components/AdvisorChatbot';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';
import { GetStartedModal } from './components/GetStartedModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Navbar } from './components/Navbar';
import { AboutPage } from './pages/AboutPage';
import { AIToolDetailPage } from './pages/AIToolDetailPage';
import { AIToolsComparePage } from './pages/AIToolsComparePage';
import { AIToolsPage } from './pages/AIToolsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { BlogPage } from './pages/BlogPage';
import { FreelancingDetailPage } from './pages/FreelancingDetailPage';
import { FreelancingPage } from './pages/FreelancingPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ScholarshipDetailPage } from './pages/ScholarshipDetailPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC] text-[#202A44]">
      <ScrollToTop />
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGetStarted={() => setGetStartedOpen(true)}
      />

      <main className="flex-1">
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
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
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
      <BookmarksProvider>
        <AppShell />
      </BookmarksProvider>
    </BrowserRouter>
  );
}
