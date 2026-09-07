import React, { useEffect, useState } from 'react';
import {
  Clock,
  Eye,
  Calendar,
  Printer,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  Tag,
  ZoomIn,
  ZoomOut,
  User,
} from 'lucide-react';
import { Article } from '../types';
import { db } from '../services/db';
import { formatBengaliDate, formatBengaliRelativeTime, toBengaliNumber } from '../utils/bengali';
import { SocialShare } from '../components/news/SocialShare';
import { ReadingProgressBar } from '../components/news/ReadingProgressBar';
import { NewsCard } from '../components/news/NewsCard';
import { ArticleTopAd, ArticleMiddleAd, SidebarAd } from '../components/ads/AdPlacement';
import { CommentSection } from '../components/comments/CommentSection';
import { SEOHead } from '../components/seo/SEOHead';
import { MostReadSection } from '../components/news/MostReadSection';

interface ArticlePageProps {
  slug: string;
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (slug: string) => void;
  onSelectTag: (tag: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  slug,
  onSelectArticle,
  onSelectCategory,
  onSelectTag,
}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [mostRead, setMostRead] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  useEffect(() => {
    let isMounted = true;
    const fetchArticleData = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Fetch article by slug
      const found = await db.getArticleBySlug(slug);
      if (isMounted) {
        setArticle(found);
        if (found) {
          // Increment views
          db.incrementArticleViews(found.id);

          // Fetch related articles
          const related = await db.getRelatedArticles(found.id, found.category_id, 4);
          const topRead = await db.getMostReadArticles(5);
          if (isMounted) {
            setRelatedArticles(related);
            setMostRead(topRead);
          }
        }
        setLoading(false);
      }
    };

    fetchArticleData();
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-editorial-heading">সংবাদ লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 font-editorial-heading mb-3">
          সংবাদটি পাওয়া যায়নি
        </h2>
        <p className="text-slate-600 mb-6 font-editorial-body">
          দুঃখিত, আপনি যে সংবাদটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি পরিবর্তিত হয়েছে।
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-rose-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-rose-700 transition"
        >
          &larr; পিছনে ফিরে যান
        </button>
      </div>
    );
  }

  const publishedDateBn = formatBengaliDate(article.published_at || article.created_at);
  const publishedRelative = formatBengaliRelativeTime(article.published_at || article.created_at);
  const hasBeenUpdated = article.updated_at && article.updated_at !== article.created_at;
  const updatedDateBn = hasBeenUpdated ? formatBengaliDate(article.updated_at!) : null;

  const fontClasses = {
    normal: 'text-lg leading-relaxed sm:text-[19px] sm:leading-[1.8]',
    large: 'text-xl leading-relaxed sm:text-[22px] sm:leading-[1.85]',
    xlarge: 'text-2xl leading-relaxed sm:text-[25px] sm:leading-[1.9]',
  };

  const handlePrint = () => {
    window.print();
  };

  // Split content for ad injection into the middle
  const paragraphs = (article.content || '').split('\n\n').filter(Boolean);
  const midPoint = Math.ceil(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, midPoint);
  const secondHalf = paragraphs.slice(midPoint);

  return (
    <div className="bg-stone-50/40 min-h-screen">
      <ReadingProgressBar />

      <SEOHead
        title={`${article.title} - ওপেন ব্রেফ`}
        description={article.excerpt || article.meta_description}
        image={article.featured_image}
        type="article"
        publishedTime={article.published_at || article.created_at}
        modifiedTime={article.updated_at}
        authorName={article.author?.name}
        section={article.category?.name}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-editorial-heading mb-4 overflow-x-auto whitespace-nowrap py-1">
          <button onClick={() => window.location.assign('/')} className="hover:text-rose-600 transition">
            হোম
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {article.category && (
            <>
              <button
                onClick={() => onSelectCategory(article.category!.slug)}
                className="hover:text-rose-600 transition"
              >
                {article.category.name}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </>
          )}
          <span className="text-slate-800 font-medium truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Top Ad */}
        <ArticleTopAd />

        {/* Main Content Grid: Left Article (8 cols) + Right Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-4">
          {/* Article Main Column */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Category & Badge */}
            <div className="flex items-center gap-2 mb-3">
              {article.category && (
                <button
                  onClick={() => onSelectCategory(article.category!.slug)}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1 rounded transition shadow-2xs"
                >
                  {article.category.name}
                </button>
              )}
              {article.is_breaking && (
                <span className="bg-amber-500 text-slate-900 text-xs font-black px-2.5 py-1 rounded shadow-2xs">
                  ব্রেকিং
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight font-editorial-heading tracking-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt / Lead */}
            {article.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 font-semibold font-editorial-heading leading-relaxed border-l-4 border-rose-600 pl-4 py-1 my-5 bg-rose-50/30 rounded-r-md">
                {article.excerpt}
              </p>
            )}

            {/* Author & Timestamp Byline */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 text-xs text-slate-500 font-editorial-heading my-6">
              {/* Author details */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                  {article.author?.avatar_url ? (
                    <img
                      src={article.author.avatar_url}
                      alt={article.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {article.author?.name || 'স্টাফ করেসপন্ডেন্ট'}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {article.author?.designation || 'ওপেন ব্রেফ বার্তা বিভাগ'}
                  </div>
                </div>
              </div>

              {/* Timing & Views */}
              <div className="flex flex-col sm:items-end gap-1 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>প্রকাশ: {publishedDateBn}</span>
                </div>
                {updatedDateBn && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>আপডেট: {updatedDateBn}</span>
                  </div>
                )}
                {article.views > 0 && (
                  <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <Eye className="w-3 h-3" />
                    <span>{toBengaliNumber(article.views)} বার পঠিত</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reading Controls & Social Bar */}
            <div className="flex items-center justify-between gap-4 pb-6">
              <SocialShare title={article.title} url={`/article/${article.slug}`} />

              {/* Text Size & Print actions */}
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-slate-600">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
                  title="স্বাভাবিক ফন্ট"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded text-sm font-bold ${fontSize === 'large' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
                  title="বড় ফন্ট"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 rounded text-base font-bold ${fontSize === 'xlarge' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
                  title="অনেক বড় ফন্ট"
                >
                  A++
                </button>
                <span className="w-px h-4 bg-slate-300 mx-1" />
                <button
                  onClick={handlePrint}
                  className="p-1 text-slate-500 hover:text-slate-900 rounded"
                  title="প্রিন্ট করুন"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {article.featured_image && (
              <figure className="my-6 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-auto max-h-[520px] object-cover"
                />
                {(article.image_caption || article.photographer) && (
                  <figcaption className="p-3 bg-stone-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between font-editorial-heading">
                    <span>{article.image_caption || article.title}</span>
                    {article.photographer && (
                      <span className="font-semibold text-slate-500">
                        ছবি: {article.photographer}
                      </span>
                    )}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Main Editorial Article Body */}
            <div className={`font-editorial-body text-slate-800 tracking-normal ${fontClasses[fontSize]} space-y-5 my-8`}>
              {firstHalf.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {/* Middle Advertisement Placement */}
              <ArticleMiddleAd />

              {secondHalf.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Tags section */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 mt-8 border-t border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1 font-editorial-heading">
                    <Tag className="w-3.5 h-3.5 text-rose-600" />
                    ট্যাগ:
                  </span>
                  {article.tags.map((t) => (
                    <button
                      key={t}
                      onClick={() => onSelectTag(t)}
                      className="px-3 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-semibold transition font-editorial-heading"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Social Share */}
            <div className="my-8 p-4 bg-stone-50 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-bold text-slate-800 font-editorial-heading">
                সংবাদটি ভালো লাগলে বন্ধুদের সাথে শেয়ার করুন:
              </span>
              <SocialShare title={article.title} url={`/article/${article.slug}`} />
            </div>

            {/* Comments Component */}
            <CommentSection articleId={article.id} />
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Most Read Widget */}
            <MostReadSection
              articles={mostRead}
              onSelectArticle={onSelectArticle}
            />

            {/* Sidebar Ad Placement */}
            <SidebarAd />

            {/* Related Articles in same category */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 font-editorial-heading pb-3 mb-3 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-600 rounded-xs" />
                  আরও পড়ুন ({article.category?.name || 'একই বিষয়'})
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <NewsCard
                      key={rel.id}
                      article={rel}
                      variant="horizontal"
                      onClick={() => onSelectArticle(rel.slug)}
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
