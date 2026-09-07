import React, { useState, useEffect } from 'react';
import { CloudSun, Search, Facebook, Youtube, Send, Clock } from 'lucide-react';
import { getTodayBengaliDate, toBengaliNumber } from '../../utils/bengali';

interface TopBarProps {
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSearch }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const todayBn = getTodayBengaliDate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      setTimeStr(`${toBengaliNumber(h)}:${toBengaliNumber(m)}:${toBengaliNumber(s)}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Dynamic Bangla date */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            আজ: <span className="font-editorial-heading text-slate-200">{todayBn}</span>
          </span>
          <span className="hidden md:inline-block text-slate-700">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{timeStr}</span>
          </span>
        </div>

        {/* Center / Right: Weather & Location */}
        <div className="hidden lg:flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/50">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-slate-200">ঢাকা: ২৮° সে.</span>
            <span className="text-slate-400 text-[11px]">(আংশিক মেঘলা)</span>
          </div>
        </div>

        {/* Right: Social Links + Search button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 border-r border-slate-800 pr-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition"
              title="ফেসবুক"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-slate-400 hover:text-rose-500 hover:bg-slate-800 rounded transition"
              title="ইউটিউব"
              aria-label="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded transition"
              title="টেলিগ্রাম"
              aria-label="Telegram"
            >
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-2.5 py-1 rounded transition border border-slate-700 text-xs font-medium cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">খুঁজুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
