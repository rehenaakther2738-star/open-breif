import React, { useState, useEffect } from 'react';
import { Menu, Search, Radio, MoreHorizontal, Shield } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { Category } from '../../types';

interface HeaderProps {
  categories: Category[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenMobileMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show top 9 in main bar, rest in 'More' dropdown
  const visibleCategories = categories.slice(0, 9);
  const overflowCategories = categories.slice(9);

  return (
    <header
      className={`sticky top-0 z-40 bg-white border-b transition-all duration-200 ${
        isScrolled ? 'shadow-md border-slate-200 py-1.5' : 'border-slate-200/80 py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div onClick={() => onNavigate('/')} className="shrink-0">
            <Logo showTagline={!isScrolled} />
          </div>

          {/* Center Navigation: Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-1 font-editorial-heading">
            <button
              onClick={() => onNavigate('/')}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                currentPath === '/'
                  ? 'text-rose-600 bg-rose-50/80 font-bold'
                  : 'text-slate-800 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              হোম
            </button>

            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate(`/category/${cat.slug}`)}
                className={`px-2.5 py-1.5 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                  currentPath === `/category/${cat.slug}`
                    ? 'text-rose-600 bg-rose-50/80 font-bold'
                    : 'text-slate-800 hover:text-rose-600 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {overflowCategories.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm font-semibold text-slate-700 hover:text-rose-600 hover:bg-slate-50 transition"
                  aria-label="More categories"
                >
                  <span>আরও</span>
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>

                {showMoreMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowMoreMenu(false)}
                    />
                    <div className="absolute top-full right-0 mt-1.5 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1.5 z-20 animate-in fade-in-50 zoom-in-95">
                      {overflowCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onNavigate(`/category/${cat.slug}`);
                            setShowMoreMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition font-medium ${
                            currentPath === `/category/${cat.slug}`
                              ? 'text-rose-600 bg-rose-50 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-rose-600'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Indicator Button */}
            <button
              onClick={() => onNavigate('/category/video')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>লাইভ</span>
            </button>

            {/* Desktop Search Button */}
            <button
              onClick={onOpenSearch}
              className="hidden md:flex p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
              title="সংবাদ অনুসন্ধান"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin CMS Portal Quick Link */}
            <button
              onClick={() => onNavigate('/admin')}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              title="অ্যাডমিন প্যানেল"
              aria-label="Admin CMS"
            >
              <Shield className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={onOpenMobileMenu}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
