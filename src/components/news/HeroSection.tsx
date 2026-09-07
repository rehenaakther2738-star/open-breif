import React from 'react';
import { Clock, Eye, Flame, ArrowUpRight } from 'lucide-react';
import { Article } from '../../types';
import { formatBengaliRelativeTime, toBengaliNumber } from '../../utils/bengali';
import { NewsCard } from './NewsCard';

interface HeroSectionProps {
  leadStory: Article | null;
  secondaryStories: Article[];
  onSelectArticle: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  leadStory,
  secondaryStories,
  onSelectArticle,
}) => {
  if (!leadStory) return null;

  const fallbackImg = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80';
  const leadTime = formatBengaliRelativeTime(leadStory.published_at || leadStory.created_at);

  return (
    <section className="my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Main Lead Story on Left (7 cols on desktop) */}
        <div className="lg:col-span-7 xl:col-span-7">
          <div
            onClick={() => onSelectArticle(leadStory.slug)}
            className="group cursor-pointer bg-white rounded-xl border border-slate-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
          >
            {/* Lead Image */}
            <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
              <img
                src={leadStory.featured_image || fallbackImg}
                alt={leadStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Category & Lead Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {leadStory.category && (
                  <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                    {leadStory.category.name}
                  </span>
                )}
                {leadStory.is_breaking && (
                  <span className="bg-amber-500 text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    শীর্ষ খবর
                  </span>
                )}
              </div>

              {/* Title inside overlay on mobile or large view */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-3 text-xs text-slate-200 mb-1.5 font-editorial-heading">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                    {leadTime}
                  </span>
                  <span>•</span>
                  <span>{leadStory.author?.name || 'প্রধান বার্তা বিভাগ'}</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md group-hover:text-rose-300 transition-colors font-editorial-heading">
                  {leadStory.title}
                </h1>
              </div>
            </div>

            {/* Lead Story Body Excerpt & Details */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-white">
              <p className="text-slate-600 text-base leading-relaxed line-clamp-3 font-editorial-body">
                {leadStory.excerpt}
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-editorial-heading">
                <span className="text-slate-600 font-medium">
                  {leadStory.author?.designation || 'ওপেন ব্রেফ ইনভেস্টিগেশন টিম'}
                </span>
                <span className="flex items-center gap-1 font-bold text-rose-600 group-hover:underline">
                  সম্পূর্ণ সংবাদ পড়ুন
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stories on Right (5 cols on desktop) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b-2 border-rose-600 pb-2">
            <h2 className="text-lg font-bold text-slate-900 font-editorial-heading flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm" />
              বিশেষ সংবাদ ও বিশ্লেষণ
            </h2>
            <span className="text-xs text-slate-500 font-medium">হালনাগাদ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 flex-1">
            {secondaryStories.slice(0, 3).map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="horizontal"
                onClick={() => onSelectArticle(article.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
