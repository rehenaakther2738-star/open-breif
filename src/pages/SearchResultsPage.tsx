import React, { useEffect, useState } from 'react';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { db } from '../services/db';
import { NewsCard } from '../components/news/NewsCard';
import { MostReadSection } from '../components/news/MostReadSection';
import { SidebarAd } from '../components/ads/AdPlacement';
import { SEOHead } from '../components/seo/SEOHead';
import { toBengaliNumber } from '../utils/bengali';

interface SearchResultsPageProps {
  initialQuery: string;
  onSelectArticle: (slug: string) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  initialQuery,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);
  const [mostRead, setMostRead] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const executeSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    const [hits, topRead] = await Promise.all([
      db.getArticles({ search: q.trim(), status: 'published', limit: 20 }),
      db.getMostReadArticles(5),
    ]);
    setResults(hits);
    setMostRead(topRead);
    setLoading(false);
  };

  useEffect(() => {
    executeSearch(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEOHead
        title={`অনুসন্ধান: ${query} - ওপেন ব্রেফ`}
        description={`"${query}" সম্পর্কিত অনুসন্ধান ফলাফল - ওপেন ব্রেফ`}
      />

      {/* Search Input Box */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-editorial-heading mb-4 text-center">
          সংবাদ অনুসন্ধান করুন
        </h1>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="কীওয়ার্ড বা সংবাদ শিরোনাম লিখুন..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-rose-600 font-editorial-heading"
            />
          </div>
          <button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-xs cursor-pointer font-editorial-heading shrink-0"
          >
            খুঁজুন
          </button>
        </form>
      </div>

      {/* Results & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="border-b border-slate-200 pb-3 mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-editorial-heading">
              "{query}" সংক্রান্ত ফলাফল ({toBengaliNumber(results.length)})
            </h2>
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-500 font-editorial-heading">
              খোঁজা হচ্ছে...
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-600 font-editorial-heading">
              <p className="text-lg font-bold mb-1">কোনো সংবাদ পাওয়া যায়নি</p>
              <p className="text-sm text-slate-400">বানান সঠিক আছে কিনা নিশ্চিত করুন অথবা অন্য কোনো শব্দ ব্যবহার করুন।</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((art) => (
                <NewsCard
                  key={art.id}
                  article={art}
                  variant="horizontal"
                  onClick={() => onSelectArticle(art.slug)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <MostReadSection articles={mostRead} onSelectArticle={onSelectArticle} />
          <SidebarAd />
        </div>
      </div>
    </div>
  );
};
