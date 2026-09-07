import React, { useState } from 'react';
import { Play, X, Video } from 'lucide-react';
import { Article } from '../../types';

interface VideoSectionProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; url: string } | null>(null);

  // Filter video articles or use top articles
  const videoArticles = articles.filter(a => a.category_id === 'cat-14' || a.slug.includes('video')).slice(0, 4);
  const items = videoArticles.length > 0 ? videoArticles : articles.slice(0, 4);

  if (items.length === 0) return null;

  const mainVideo = items[0];
  const sideVideos = items.slice(1, 4);

  return (
    <section className="my-10 bg-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-editorial-heading tracking-tight">
              ভিডিও গ্যালারি ও ভিজ্যুয়াল কভারেজ
            </h2>
            <p className="text-xs text-slate-400 font-editorial-body">
              মাঠপর্যায়ের বিশেষ ভিডিও প্রতিবেদন ও বিশ্লেষণ
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectArticle(mainVideo.slug)}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition"
        >
          সব ভিডিও দেখুন &rarr;
        </button>
      </div>

      {/* Grid: 1 large video on left, 3 small on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Big Video (7 cols) */}
        <div className="lg:col-span-7">
          <div
            onClick={() => setActiveVideoModal({ title: mainVideo.title, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' })}
            className="group cursor-pointer aspect-video rounded-xl overflow-hidden bg-slate-900 relative shadow-md"
          >
            <img
              src={mainVideo.featured_image}
              alt={mainVideo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">
              {/* Play Button Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-600 transition-all">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-1">
                প্রধান ভিডিও প্রতিবেদন
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-editorial-heading leading-snug group-hover:text-rose-300 transition-colors">
                {mainVideo.title}
              </h3>
            </div>
          </div>
        </div>

        {/* 3 Secondary Videos on Right (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
          {sideVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectArticle(video.slug)}
              className="group cursor-pointer flex gap-3.5 p-2 rounded-lg hover:bg-slate-900/90 transition border border-slate-800/60"
            >
              <div className="w-28 sm:w-36 aspect-video shrink-0 rounded-md overflow-hidden bg-slate-800 relative">
                <img
                  src={video.featured_image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center group-hover:bg-rose-600 transition-colors">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-rose-400 transition line-clamp-2 leading-snug font-editorial-heading">
                  {video.title}
                </h4>
                <span className="text-[11px] text-slate-400 mt-1">ভিডিও প্লে করুন</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <h4 className="text-sm font-bold text-slate-200 truncate pr-4 font-editorial-heading">
                {activeVideoModal.title}
              </h4>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
