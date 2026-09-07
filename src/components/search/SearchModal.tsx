import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Article } from '../../types';
import { db } from '../../services/db';
import { formatBengaliRelativeTime } from '../../utils/bengali';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
  onViewAllResults: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onViewAllResults,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const hits = await db.getArticles({ search: query.trim(), limit: 6, status: 'published' });
      setResults(hits);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && query.trim()) {
      onViewAllResults(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="সংবাদ, বিষয় বা কীওয়ার্ড দিয়ে খুঁজুন..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-base font-editorial-heading focus:outline-hidden"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 mr-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-500 hover:bg-slate-200 rounded font-medium transition"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-rose-600 mb-2" />
              <span className="text-xs font-editorial-heading">সংবাদ খোঁজা হচ্ছে...</span>
            </div>
          ) : query && results.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-editorial-heading">
              <p className="text-base font-medium">"{query}" সম্পর্কিত কোনো সংবাদ পাওয়া যায়নি।</p>
              <p className="text-xs text-slate-400 mt-1 font-editorial-body">অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন।</p>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-editorial-heading">
                অনুসন্ধানের ফলাফল ({results.length})
              </div>
              {results.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art.slug);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-slate-50 rounded-lg cursor-pointer transition group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {art.category && (
                        <span className="text-[10px] font-bold text-rose-600 uppercase">
                          {art.category.name}
                        </span>
                      )}
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-editorial-heading">
                        <Clock className="w-3 h-3" />
                        {formatBengaliRelativeTime(art.published_at || art.created_at)}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition truncate font-editorial-heading">
                      {art.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 group-hover:translate-x-1 transition shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-slate-400 text-xs font-editorial-heading">
              কীওয়ার্ড লিখে এন্টার চাপুন অথবা সংবাদ নির্বাচন করুন
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {query && results.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-editorial-heading">সম্পূর্ণ সার্চ পেজ দেখতে চান?</span>
            <button
              onClick={() => {
                onViewAllResults(query);
                onClose();
              }}
              className="text-rose-600 font-bold hover:underline flex items-center gap-1 cursor-pointer font-editorial-heading"
            >
              সকল ফলাফল দেখুন &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
