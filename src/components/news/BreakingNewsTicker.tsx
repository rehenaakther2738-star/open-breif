import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BellRing } from 'lucide-react';
import { BreakingNews } from '../../types';

interface BreakingNewsTickerProps {
  items: BreakingNews[];
  onSelectArticleUrl?: (url: string) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  items,
  onSelectArticleUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleClick = () => {
    if (currentItem.url && onSelectArticleUrl) {
      onSelectArticleUrl(currentItem.url);
    }
  };

  return (
    <div className="bg-rose-50/70 border-y border-rose-200/70 text-slate-900 py-1.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-rose-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-xs">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>ব্রেকিং নিউজ</span>
        </div>

        {/* Content item with smooth fade/slide transition */}
        <div
          className="flex-1 overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={handleClick}
        >
          <div className="text-sm font-semibold text-slate-900 hover:text-rose-600 transition truncate font-editorial-heading">
            {currentItem.headline}
          </div>
        </div>

        {/* Controls if multiple */}
        {items.length > 1 && (
          <div className="shrink-0 flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1 rounded hover:bg-rose-100 text-slate-600 hover:text-rose-600 transition"
              aria-label="Previous breaking news"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded hover:bg-rose-100 text-slate-600 hover:text-rose-600 transition"
              aria-label="Next breaking news"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
