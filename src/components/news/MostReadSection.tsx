import React, { useState } from 'react';
import { TrendingUp, Clock, Eye } from 'lucide-react';
import { Article } from '../../types';
import { toBengaliNumber, formatBengaliRelativeTime } from '../../utils/bengali';

interface MostReadSectionProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const MostReadSection: React.FC<MostReadSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');

  // Filter or sort depending on timeframe
  const displayArticles = [...articles].slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-editorial-heading">
            সর্বাধিক পঠিত
          </h3>
        </div>

        {/* Timeframe Tabs */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-editorial-heading">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-2 py-1 rounded-md transition font-medium ${
              activeTab === 'today'
                ? 'bg-white text-rose-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            আজ
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`px-2 py-1 rounded-md transition font-medium ${
              activeTab === 'week'
                ? 'bg-white text-rose-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সপ্তাহ
          </button>
          <button
            onClick={() => setActiveTab('month')}
            className={`px-2 py-1 rounded-md transition font-medium ${
              activeTab === 'month'
                ? 'bg-white text-rose-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            মাস
          </button>
        </div>
      </div>

      {/* List with Bengali Numbers */}
      <div className="divide-y divide-slate-100">
        {displayArticles.map((article, index) => {
          const rankBn = toBengaliNumber(index + 1);
          const timeBn = formatBengaliRelativeTime(article.published_at || article.created_at);

          return (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article.slug)}
              className="py-3 flex gap-3.5 group cursor-pointer hover:bg-slate-50/70 transition px-2 rounded -mx-2"
            >
              <div
                className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-black text-sm transition-colors ${
                  index === 0
                    ? 'bg-rose-600 text-white shadow-xs'
                    : index === 1
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {rankBn}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-rose-600 transition leading-snug line-clamp-2 font-editorial-heading">
                  {article.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-editorial-heading">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {timeBn}
                  </span>
                  {article.views > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-400" />
                      {toBengaliNumber(article.views)} পঠিত
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
