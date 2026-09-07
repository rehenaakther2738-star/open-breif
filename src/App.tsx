import React, { useState, useEffect } from 'react';
import { AuthProvider } from './services/auth';
import { db } from './services/db';
import { Category, BreakingNews, SiteSettings } from './types';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { BreakingNewsTicker } from './components/news/BreakingNewsTicker';
import { SearchModal } from './components/search/SearchModal';
import { HeaderAd, FooterAd } from './components/ads/AdPlacement';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { StaticPage } from './pages/StaticPage';
import { AdminPortal } from './pages/admin/AdminPortal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'ওপেন ব্রেফ',
    site_name_en: 'OPEN BRIEF',
    tagline: 'সত্যের সন্ধানে, খবরের সাথে',
    contact_email: 'info@openbrief.news',
    phone: '+৮৮০ ১৭০০-০০০০০০',
    address: 'লেভেল ৪, রূপায়ন সেন্টার, কাকরাইল, ঢাকা-১০০০',
  });

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Sync route on popstate (browser back / forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch initial global data
  useEffect(() => {
    const loadGlobals = async () => {
      const [cats, breaking, siteSettings] = await Promise.all([
        db.getCategories(),
        db.getActiveBreakingNews(),
        db.getSettings(),
      ]);
      setCategories(cats);
      setBreakingNews(breaking);
      if (siteSettings) {
        setSettings(siteSettings);
      }
    };
    loadGlobals();
  }, []);

  // Navigation handler
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectArticle = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  const handleSearchExecute = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Admin route
    if (currentPath.startsWith('/admin')) {
      return (
        <AdminPortal
          onGoToSite={() => navigate('/')}
          onViewArticleLive={(slug) => navigate(`/article/${slug}`)}
        />
      );
    }

    // 2. Article detail page
    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      return (
        <ArticlePage
          slug={slug}
          onSelectArticle={handleSelectArticle}
          onSelectCategory={handleSelectCategory}
          onSelectTag={(tag) => handleSearchExecute(tag)}
        />
      );
    }

    // 3. Category archive page
    if (currentPath.startsWith('/category/')) {
      const catSlug = currentPath.replace('/category/', '');
      return (
        <CategoryPage
          categorySlug={catSlug}
          onSelectArticle={handleSelectArticle}
          onSelectCategory={handleSelectCategory}
        />
      );
    }

    // 4. Search results page
    if (currentPath.startsWith('/search')) {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q') || searchQuery;
      return (
        <SearchResultsPage
          initialQuery={q}
          onSelectArticle={handleSelectArticle}
        />
      );
    }

    // 5. Static Pages
    if (['/about', '/contact', '/privacy', '/terms', '/disclaimer', '/cookie-policy'].includes(currentPath)) {
      const pageType = currentPath.replace('/', '') as any;
      return <StaticPage pageType={pageType} settings={settings} />;
    }

    // Default: Home Page
    return (
      <HomePage
        onSelectArticle={handleSelectArticle}
        onSelectCategory={handleSelectCategory}
      />
    );
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-stone-50/50 text-slate-900 selection:bg-rose-600 selection:text-white antialiased font-sans">
        {/* Render Public Header & Ticker only when NOT in Admin CMS */}
        {!isAdminRoute && (
          <>
            <TopBar onOpenSearch={() => setSearchModalOpen(true)} />
            <Header
              categories={categories}
              currentPath={currentPath}
              onNavigate={navigate}
              onOpenSearch={() => setSearchModalOpen(true)}
              onOpenMobileMenu={() => setMobileMenuOpen(true)}
            />
            {/* Header Ad Placement */}
            <HeaderAd />

            {/* Breaking News Ticker */}
            <BreakingNewsTicker
              items={breakingNews}
              onSelectArticleUrl={(url) => {
                if (url.startsWith('http')) {
                  window.open(url, '_blank');
                } else {
                  navigate(url);
                }
              }}
            />

            {/* Mobile Navigation Drawer */}
            <MobileNav
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              categories={categories}
              currentPath={currentPath}
              onNavigate={navigate}
              onOpenSearch={() => setSearchModalOpen(true)}
            />
          </>
        )}

        {/* Dynamic Route Content */}
        <main className="flex-1">
          {renderRoute()}
        </main>

        {/* Render Public Footer only when NOT in Admin CMS */}
        {!isAdminRoute && (
          <>
            <FooterAd />
            <Footer
              categories={categories}
              settings={settings}
              onNavigate={navigate}
            />
          </>
        )}

        {/* Global Search Modal */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectArticle={handleSelectArticle}
          onViewAllResults={handleSearchExecute}
        />
      </div>
    </AuthProvider>
  );
}
