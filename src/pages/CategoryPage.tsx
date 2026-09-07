import React, { useEffect, useState } from 'react';
import { Article, Category } from '../types';
import { db } from '../services/db';
import { NewsCard } from '../components/news/NewsCard';
import { MostReadSection } from '../components/news/MostReadSection';
import { SidebarAd, HomepageAd } from '../components/ads/AdPlacement';
import { SEOHead } from '../components/seo/SEOHead';
import { ChevronRight, Grid, ListFilter } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (slug: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  onSelectArticle,
  onSelectCategory,
}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [mostRead, setMostRead] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'latest' | 'views'>('latest');

  useEffect(() => {
    let isMounted = true;
    const fetchCategoryData = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const allCats = await db.getCategories();
      const currentCat = allCats.find((c) => c.slug === categorySlug);
      
      if (currentCat && isMounted) {
        setCategory(currentCat);
        const [catArticles, topRead] = await Promise.all([
          db.getArticlesByCategory(currentCat.id, 24),
          db.getMostReadArticles(5),
        ]);
        if (isMounted) {
          setArticles(catArticles);
          setMostRead(topRead);
        }
      }
      setLoading(false);
    };

    fetchCategoryData();
    return () => { isMounted = false; };
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-editorial-heading">ক্যাটাগরি লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 font-editorial-heading mb-3">
          বিভাগটি পাওয়া যায়নি
        </h2>
        <button
          onClick={() => window.location.assign('/')}
          className="bg-rose-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-rose-700 transition"
        >
          &larr; হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
    return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime();
  });

  const leadArticle = sortedArticles[0];
  const otherArticles = sortedArticles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SEOHead
        title={`${category.name} - ওপেন ব্রেফ`}
        description={category.description || `${category.name} সম্পর্কিত সর্বশেষ সংবাদ ও প্রতিবেদন।`}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-editorial-heading mb-4">
        <button onClick={() => window.location.assign('/')} className="hover:text-rose-600 transition">
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">{category.name}</span>
      </nav>

      {/* Category Header Banner */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2 font-editorial-heading">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-xs" />
              সংবাদ বিভাগ
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-editorial-heading">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-sm text-slate-600 font-editorial-body mt-1">
                {category.description}
              </p>
            )}
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs font-editorial-heading self-start sm:self-center">
            <button
              onClick={() => setSortBy('latest')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                sortBy === 'latest' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সর্বশেষ
            </button>
            <button
              onClick={() => setSortBy('views')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                sortBy === 'views' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সর্বাধিক পঠিত
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Articles + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8">
          {sortedArticles.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 font-editorial-heading">
              এই বিভাগে বর্তমানে কোনো সংবাদ নেই।
            </div>
          ) : (
            <div className="space-y-8">
              {/* Lead Article if available */}
              {leadArticle && (
                <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs">
                  <NewsCard
                    article={leadArticle}
                    variant="standard"
                    onClick={() => onSelectArticle(leadArticle.slug)}
                  />
                </div>
              )}

              <HomepageAd />

              {/* Grid for remainder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {otherArticles.map((art) => (
                  <NewsCard
                    key={art.id}
                    article={art}
                    variant="standard"
                    onClick={() => onSelectArticle(art.slug)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <MostReadSection
            articles={mostRead}
            onSelectArticle={onSelectArticle}
          />
          <SidebarAd />
        </div>
      </div>
    </div>
  );
};
