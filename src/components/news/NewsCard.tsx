import React from 'react';
import { Clock, Eye, User } from 'lucide-react';
import { Article } from '../../types';
import { formatBengaliRelativeTime, toBengaliNumber } from '../../utils/bengali';

interface NewsCardProps {
  article: Article;
  variant?: 'standard' | 'horizontal' | 'compact' | 'hero-secondary';
  onClick: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  variant = 'standard',
  onClick,
}) => {
  const publishedTime = formatBengaliRelativeTime(article.published_at || article.created_at);
  const fallbackImg = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';

  if (variant === 'compact') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition px-2 rounded -mx-2"
      >
        <div className="flex items-center gap-2 mb-1">
          {article.category && (
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
              {article.category.name}
            </span>
          )}
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-editorial-heading">
            <Clock className="w-3 h-3" />
            {publishedTime}
          </span>
        </div>
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition line-clamp-2 leading-snug font-editorial-heading">
          {article.title}
        </h4>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer flex gap-4 py-3.5 border-b border-slate-200/80 last:border-b-0 hover:bg-slate-50/50 transition p-2 rounded -mx-2"
      >
        <div className="w-28 sm:w-36 h-20 sm:h-24 shrink-0 rounded overflow-hidden bg-slate-100 relative">
          <img
            src={article.featured_image || fallbackImg}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs mb-1">
              {article.category && (
                <span className="font-bold text-rose-600 text-[11px]">
                  {article.category.name}
                </span>
              )}
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {publishedTime}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-600 transition line-clamp-2 leading-snug font-editorial-heading">
              {article.title}
            </h4>
          </div>
          {article.author && (
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <User className="w-3 h-3 text-slate-400" />
              <span>{article.author.name}</span>
            </div>
          )}
        </div>
      </article>
    );
  }

  if (variant === 'hero-secondary') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer bg-white border border-slate-200/80 rounded-lg overflow-hidden hover:shadow-md transition duration-200 flex flex-col"
      >
        <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
          <img
            src={article.featured_image || fallbackImg}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
            loading="lazy"
          />
          {article.category && (
            <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              {article.category.name}
            </span>
          )}
        </div>
        <div className="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1 mb-1.5 font-editorial-heading">
              <Clock className="w-3 h-3" />
              <span>{publishedTime}</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition line-clamp-2 leading-snug font-editorial-heading">
              {article.title}
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-editorial-body">
              {article.excerpt}
            </p>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{article.author?.name || 'স্টাফ করেসপন্ডেন্ট'}</span>
            {article.views > 0 && (
              <span className="flex items-center gap-1 text-slate-400">
                <Eye className="w-3 h-3" />
                {toBengaliNumber(article.views)}
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default Standard Card
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white border border-slate-200/80 rounded-lg overflow-hidden hover:shadow-md transition duration-200 flex flex-col"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
        <img
          src={article.featured_image || fallbackImg}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          loading="lazy"
        />
        {article.category && (
          <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
            {article.category.name}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-editorial-heading">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {publishedTime}
            </span>
            {article.views > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {toBengaliNumber(article.views)}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition line-clamp-2 leading-snug font-editorial-heading">
            {article.title}
          </h3>

          <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed font-editorial-body">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-700">
            {article.author?.name || 'ডেস্ক রিপোর্ট'}
          </span>
          <span className="text-rose-600 font-semibold group-hover:translate-x-0.5 transition-transform">
            বিস্তারিত &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};
