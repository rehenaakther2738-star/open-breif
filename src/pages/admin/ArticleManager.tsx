import React, { useEffect, useState } from 'react';
import {
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Flame,
  Star,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Article, Category } from '../../types';
import { db } from '../../services/db';
import { toBengaliNumber, formatBengaliRelativeTime } from '../../utils/bengali';

interface ArticleManagerProps {
  onNewArticle: () => void;
  onEditArticle: (article: Article) => void;
  onViewArticle: (slug: string) => void;
}

export const ArticleManager: React.FC<ArticleManagerProps> = ({
  onNewArticle,
  onEditArticle,
  onViewArticle,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [allArticles, allCats] = await Promise.all([
      db.getArticles({ limit: 200 }),
      db.getCategories(),
    ]);
    setArticles(allArticles);
    setCategories(allCats);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই সংবাদটি স্থায়ীভাবে মুছে ফেলতে চান?')) {
      await db.deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleToggleBreaking = async (article: Article) => {
    const updated = await db.updateArticle(article.id, { is_breaking: !article.is_breaking });
    if (updated) {
      setArticles((prev) => prev.map((a) => (a.id === article.id ? updated : a)));
    }
  };

  const handleToggleFeatured = async (article: Article) => {
    const updated = await db.updateArticle(article.id, { is_featured: !article.is_featured });
    if (updated) {
      setArticles((prev) => prev.map((a) => (a.id === article.id ? updated : a)));
    }
  };

  // Filter articles
  const filteredArticles = articles.filter((art) => {
    if (search && !art.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory !== 'all' && art.category_id !== selectedCategory) return false;
    if (selectedStatus !== 'all' && art.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white font-editorial-heading">
            সংবাদ ব্যবস্থাপনা (Articles)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            মোট {toBengaliNumber(articles.length)} টি সংবাদ নিবন্ধিত রয়েছে
          </p>
        </div>

        <button
          onClick={onNewArticle}
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md cursor-pointer font-editorial-heading self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন সংবাদ যুক্ত করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="শিরোনাম অনুসন্ধান করুন..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-editorial-heading focus:outline-hidden"
          >
            <option value="all">সকল বিভাগ</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-editorial-heading focus:outline-hidden"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="published">প্রকাশিত</option>
            <option value="draft">ড্রাফট</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-editorial-heading border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">সংবাদ</th>
                <th className="py-3.5 px-4">বিভাগ</th>
                <th className="py-3.5 px-4">স্ট্যাটাস</th>
                <th className="py-3.5 px-4">ভিউ</th>
                <th className="py-3.5 px-4 text-center">শীর্ষ / ব্রেকিং</th>
                <th className="py-3.5 px-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-editorial-heading">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    কোনো সংবাদ পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-850 transition">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-bold text-white line-clamp-1">{art.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {formatBengaliRelativeTime(art.published_at || art.created_at)} • {art.author?.name || 'ডেস্ক'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {art.category?.name || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          art.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {art.status === 'published' ? 'প্রকাশিত' : 'ড্রাফট'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {toBengaliNumber(art.views)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleFeatured(art)}
                          className={`p-1 rounded ${
                            art.is_featured ? 'text-amber-400 bg-amber-500/20' : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title="শীর্ষ খবর টগল করুন"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleBreaking(art)}
                          className={`p-1 rounded ${
                            art.is_breaking ? 'text-rose-500 bg-rose-500/20' : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title="ব্রেকিং নিউজ টগল করুন"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => onEditArticle(art)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="সম্পাদনা"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onViewArticle(art.slug)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="লাইভ দেখুন"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition"
                        title="মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
