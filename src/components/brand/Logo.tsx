import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer' | 'admin' | 'minimal' | 'badge';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'header', className = '', showTagline = false }) => {
  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-extrabold shadow-sm">
          <span className="text-base tracking-tighter">OB</span>
        </div>
        <span className="font-extrabold text-lg text-slate-900 font-editorial-heading">ওপেন ব্রেফ</span>
      </div>
    );
  }

  if (variant === 'admin') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center text-white shadow-md">
          <span className="font-extrabold text-lg tracking-tighter">OB</span>
        </div>
        <div>
          <div className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
            <span>OPEN BRIEF</span>
            <span className="text-[10px] bg-rose-500/30 text-rose-300 font-bold px-1.5 py-0.5 rounded border border-rose-500/40 uppercase">CMS</span>
          </div>
          <div className="text-xs text-slate-400 font-editorial-heading">নিউজ কন্ট্রোল প্যানেল</div>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-xl shadow-md border border-rose-500/30">
            OB
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight font-editorial-heading">
              ওপেন ব্রেফ
            </div>
            <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase">
              OPEN BRIEF
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-400 font-editorial-body max-w-sm mt-1">
          সত্যের সন্ধানে, খবরের সাথে — আধুনিক ও বিশ্বস্ত বাংলা ডিজিটাল সংবাদ প্ল্যাটফর্ম।
        </p>
      </div>
    );
  }

  // Default header variant
  return (
    <div className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      {/* Brand Icon Badge */}
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-sm group-hover:bg-rose-700 transition-colors border border-rose-500">
          OB
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white" />
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-editorial-heading group-hover:text-rose-600 transition-colors">
            ওপেন ব্রেফ
          </span>
          <span className="hidden md:inline-block text-[10px] font-extrabold text-slate-500 tracking-[0.25em] uppercase border-l border-slate-300 pl-2">
            OPEN BRIEF
          </span>
        </div>

        {showTagline && (
          <span className="text-xs text-slate-500 font-medium font-editorial-heading -mt-0.5">
            সত্যের সন্ধানে, খবরের সাথে
          </span>
        )}
      </div>
    </div>
  );
};
