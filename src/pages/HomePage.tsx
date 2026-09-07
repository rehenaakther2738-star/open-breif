import React, { useEffect, useState } from 'react';
import { Article, Category, BreakingNews } from '../types';
import { db } from '../services/db';
import { HeroSection } from '../components/news/HeroSection';
import { MostReadSection } from '../components/news/MostReadSection';
import { NewsCard } from '../components/news/NewsCard';
import { CategorySection } from '../components/news/CategoryGrid';
import { VideoSection } from '../components/news/VideoSection';
import { NewsletterSection } from '../components/layout/NewsletterSection';
import { HomepageAd, SidebarAd } from '../components/ads/AdPlacement';
import { SEOHead } from '../components/seo/SEOHead';
import { Flame, Clock } from 'lucide-react';

interface HomePageProps {
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectArticle,
  onSelectCategory,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mostRead, setMostRead] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      const [allArticles, allCats, topRead] = await Promise.all([
        db.getArticles({ limit: 30, status: 'published' }),
        db.getCategories(),
        db.getMostReadArticles(5),
      ]);

      setArticles(allArticles);
      setCategories(allCats);
      setMostRead(topRead);
      setLoading(false);
    };

    loadHomeData();
  }, []);

  if (loading && articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-editorial-heading font-medium">
          ওপেন ব্রেফ সংবাদ লোড হচ্ছে...
        </p>
      </div>
    );
  }

  // Segment articles
  const leadStory = articles.find((a) => a.is_featured) || articles[0];
  const secondaryStories = articles.filter((a) => a.id !== leadStory?.id).slice(0, 4);
  const latestStories = articles.slice(4, 10);

  // Group by category
  const nationalCategory = categories.find((c) => c.slug === 'national');
  const nationalArticles = articles.filter((a) => a.category_id === 'cat-1' || a.category?.slug === 'national');

  const politicsCategory = categories.find((c) => c.slug === 'politics');
  const politicsArticles = articles.filter((a) => a.category_id === 'cat-2' || a.category?.slug === 'politics');

  const internationalCategory = categories.find((c) => c.slug === 'international');
  const internationalArticles = articles.filter((a) => a.category_id === 'cat-3' || a.category?.slug === 'international');

  const economyCategory = categories.find((c) => c.slug === 'economy');
  const economyArticles = articles.filter((a) => a.category_id === 'cat-4' || a.category?.slug === 'economy');

  const sportsCategory = categories.find((c) => c.slug === 'sports');
  const sportsArticles = articles.filter((a) => a.category_id === 'cat-6' || a.category?.slug === 'sports');

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <SEOHead
        title="ওপেন ব্রেফ | OPEN BRIEF - সত্যের সন্ধানে, খবরের সাথে"
        description="আধুনিক ও বস্তুনিষ্ঠ বাংলা ডিজিটাল সংবাদ প্ল্যাটফর্ম। সর্বশেষ জাতীয়, রাজনীতি, আন্তর্জাতিক, অর্থনীতি ও খেলার খবর।"
      />

      {/* Hero Section */}
      <HeroSection
        leadStory={leadStory || null}
        secondaryStories={secondaryStories}
        onSelectArticle={onSelectArticle}
      />

      {/* Homepage Ad Banner */}
      <HomepageAd />

      {/* Main 2-Column Grid: Left (Articles & Categories) + Right (Latest, Most Read, Ads) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8">
          {/* Latest News Grid */}
          <div className="border-b-2 border-slate-900 pb-2 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-rose-600 rounded-xs" />
              <h2 className="text-xl font-bold text-slate-900 font-editorial-heading">
                তাজা খবর
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {latestStories.slice(0, 4).map((art) => (
              <NewsCard
                key={art.id}
                article={art}
                variant="standard"
                onClick={() => onSelectArticle(art.slug)}
              />
            ))}
          </div>

          {/* National News Category Section */}
          {nationalCategory && nationalArticles.length > 0 && (
            <CategorySection
              category={nationalCategory}
              articles={nationalArticles}
              onSelectArticle={onSelectArticle}
              onSelectCategory={onSelectCategory}
            />
          )}

          {/* Politics Category Section */}
          {politicsCategory && politicsArticles.length > 0 && (
            <CategorySection
              category={politicsCategory}
              articles={politicsArticles}
              onSelectArticle={onSelectArticle}
              onSelectCategory={onSelectCategory}
            />
          )}

          {/* Economy Category Section */}
          {economyCategory && economyArticles.length > 0 && (
            <CategorySection
              category={economyCategory}
              articles={economyArticles}
              onSelectArticle={onSelectArticle}
              onSelectCategory={onSelectCategory}
            />
          )}
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Most Read Widget */}
          <MostReadSection
            articles={mostRead.length > 0 ? mostRead : articles.slice(0, 5)}
            onSelectArticle={onSelectArticle}
          />

          {/* Sidebar Ad Placement */}
          <SidebarAd />

          {/* Instant Updates / Latest headlines ticker list */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900 font-editorial-heading">
                  সর্বশেষ আপডেট
                </h3>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {articles.slice(5, 12).map((art) => (
                <NewsCard
                  key={art.id}
                  article={art}
                  variant="compact"
                  onClick={() => onSelectArticle(art.slug)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Gallery Section */}
      <VideoSection
        articles={articles}
        onSelectArticle={onSelectArticle}
      />

      {/* International & Sports Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {internationalCategory && (
          <div>
            <CategorySection
              category={internationalCategory}
              articles={internationalArticles.length > 0 ? internationalArticles : articles.slice(2, 6)}
              onSelectArticle={onSelectArticle}
              onSelectCategory={onSelectCategory}
            />
          </div>
        )}

        {sportsCategory && (
          <div>
            <CategorySection
              category={sportsCategory}
              articles={sportsArticles.length > 0 ? sportsArticles : articles.slice(3, 7)}
              onSelectArticle={onSelectArticle}
              onSelectCategory={onSelectCategory}
            />
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};
