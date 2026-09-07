import React, { useEffect, useState } from 'react';
import {
  FileText,
  Eye,
  Flame,
  MessageSquare,
  Mail,
  PlusCircle,
  ExternalLink,
  FolderTree,
  CheckCircle2,
  AlertCircle,
  Database,
} from 'lucide-react';
import { Article, Category, BreakingNews, Comment, NewsletterSubscriber } from '../../types';
import { db } from '../../services/db';
import { toBengaliNumber, formatBengaliRelativeTime } from '../../utils/bengali';
import { isSupabaseConfigured } from '../../lib/supabase';

interface DashboardOverviewProps {
  onNavigateTab: (tab: any) => void;
  onEditArticle: (article: Article) => void;
  onViewArticle: (slug: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateTab,
  onEditArticle,
  onViewArticle,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const isSupabase = isSupabaseConfigured();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const [allArticles, allCats, allBreaking, allComments, allSubs] = await Promise.all([
        db.getArticles({ limit: 100 }),
        db.getCategories(),
        db.getBreakingNews(),
        db.getAllComments(),
        db.getNewsletterSubscribers(),
      ]);

      setArticles(allArticles);
      setCategories(allCats);
      setBreakingNews(allBreaking);
      setComments(allComments);
      setSubscribers(allSubs);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const pendingComments = comments.filter((c) => c.status === 'pending');
  const activeBreaking = breakingNews.filter((b) => b.is_active);

  return (
    <div className="space-y-8">
      {/* Header with Greeting & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-editorial-heading">
            ওভারভিউ ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-editorial-body">
            ওপেন ব্রেফ (OPEN BRIEF) নিউজ পোর্টাল লাইভ মনিটরিং ও মেট্রিক্স
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('new-article')}
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md cursor-pointer font-editorial-heading"
          >
            <PlusCircle className="w-4 h-4" />
            <span>নতুন সংবাদ লিখুন</span>
          </button>
        </div>
      </div>

      {/* Supabase Status Alert Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isSupabase ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm font-editorial-heading flex items-center gap-2">
              <span>ডাটাবেস স্থিতি:</span>
              <span className={isSupabase ? 'text-emerald-400' : 'text-amber-400'}>
                {isSupabase ? 'Supabase ক্লাউড PostgreSQL সংযুক্ত' : 'ব্রাউজার লোকাল সিঙ্ক মোড সক্রিয়'}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              {isSupabase
                ? 'রিয়েলটাইম রো-লেভেল সিকিউরিটি ও স্টোরেজ সক্রিয় আছে।'
                : 'সব ধরনের CRUD টেস্ট করতে পারবেন। স্থায়ীভাবে ক্লাউডে সেভ করতে .env-এ Supabase ক্রেডেনশিয়াল যুক্ত করুন।'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('settings')}
          className="text-slate-300 hover:text-white underline text-xs font-medium shrink-0"
        >
          সেটিংস কনফিগার করুন
        </button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Articles */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium font-editorial-heading">মোট সংবাদ</span>
            <FileText className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-white font-editorial-heading">
            {toBengaliNumber(articles.length)}
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium font-editorial-heading">মোট পঠিত</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-editorial-heading">
            {toBengaliNumber(totalViews)}
          </div>
        </div>

        {/* Active Breaking */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium font-editorial-heading">ব্রেকিং নিউজ</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-editorial-heading">
            {toBengaliNumber(activeBreaking.length)}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium font-editorial-heading">ক্যাটাগরি</span>
            <FolderTree className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-editorial-heading">
            {toBengaliNumber(categories.length)}
          </div>
        </div>

        {/* Pending Comments */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium font-editorial-heading">মন্তব্য (অপেক্ষমান)</span>
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-editorial-heading">
            {toBengaliNumber(pendingComments.length)}
          </div>
        </div>

        {/* Subscribers */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium font-editorial-heading">নিউজলেটার</span>
            <Mail className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white font-editorial-heading">
            {toBengaliNumber(subscribers.length)}
          </div>
        </div>
      </div>

      {/* Recent Articles Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-editorial-heading">
              সাম্প্রতিক প্রকাশিত সংবাদ
            </h3>
            <p className="text-xs text-slate-400">সর্বশেষ সংযোজিত ও সম্পাদিত সংবাদের তালিকা</p>
          </div>
          <button
            onClick={() => onNavigateTab('articles')}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
          >
            সব সংবাদ দেখুন &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-editorial-heading border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">সংবাদ শিরোনাম</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4">ভিউ</th>
                <th className="py-3 px-4">প্রকাশকাল</th>
                <th className="py-3 px-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-editorial-heading">
              {articles.slice(0, 7).map((art) => (
                <tr key={art.id} className="hover:bg-slate-850 transition">
                  <td className="py-3.5 px-4 font-bold text-white max-w-sm truncate">
                    {art.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {art.category?.name || 'সাধারণ'}
                  </td>
                  <td className="py-3.5 px-4">
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
                  <td className="py-3.5 px-4 text-slate-400">
                    {toBengaliNumber(art.views)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {formatBengaliRelativeTime(art.published_at || art.created_at)}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => onEditArticle(art)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                    >
                      সম্পাদনা
                    </button>
                    <button
                      onClick={() => onViewArticle(art.slug)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                      title="সাইটে দেখুন"
                    >
                      <ExternalLink className="w-3 h-3 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
