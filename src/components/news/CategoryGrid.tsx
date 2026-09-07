import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Article, Category } from '../../types';
import { NewsCard } from './NewsCard';

interface CategorySectionProps {
  category: Category;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (slug: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  if (!articles || articles.length === 0) return null;

  const lead = articles[0];
  const secondary = articles.slice(1, 4);

  return (
    <div className="my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2.5 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-rose-600 rounded-xs" />
          <h2 className="text-xl font-bold text-slate-900 font-editorial-heading">
            {category.name}
          </h2>
        </div>
        <button
          onClick={() => onSelectCategory(category.slug)}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition"
        >
          <span>আরও সংবাদ</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid: 1 large card + 3 list/cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {lead && (
          <div className="md:col-span-6 lg:col-span-5">
            <NewsCard
              article={lead}
              variant="standard"
              onClick={() => onSelectArticle(lead.slug)}
            />
          </div>
        )}

        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between">
          {secondary.map((art) => (
            <NewsCard
              key={art.id}
              article={art}
              variant="horizontal"
              onClick={() => onSelectArticle(art.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
