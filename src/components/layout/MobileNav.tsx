import React from 'react';
import { X, Search, Radio, Shield, ChevronRight, Facebook, Youtube, Send } from 'lucide-react';
import { Category } from '../../types';
import { Logo } from '../brand/Logo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  categories,
  currentPath,
  onNavigate,
  onOpenSearch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-stone-50">
          <div onClick={() => { onNavigate('/'); onClose(); }}>
            <Logo variant="minimal" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Action */}
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between bg-slate-100 text-slate-500 px-3.5 py-2.5 rounded-lg text-sm hover:bg-slate-200 transition"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              সংবাদ খুঁজুন...
            </span>
            <kbd className="text-[10px] bg-white border border-slate-300 px-1.5 py-0.5 rounded text-slate-400 font-mono">
              /
            </kbd>
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto py-2 px-3 divide-y divide-slate-100">
          <div className="pb-2">
            <button
              onClick={() => {
                onNavigate('/');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition font-editorial-heading ${
                currentPath === '/' ? 'bg-rose-50 text-rose-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>হোম (Home)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="py-2 space-y-0.5">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              সকল বিভাগ
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onNavigate(`/category/${cat.slug}`);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition font-editorial-heading ${
                  currentPath === `/category/${cat.slug}`
                    ? 'bg-rose-50 text-rose-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </button>
            ))}
          </div>

          <div className="pt-3 pb-2 space-y-1">
            <button
              onClick={() => {
                onNavigate('/admin');
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <Shield className="w-4 h-4 text-rose-600" />
              <span>অ্যাডমিন ড্যাশবোর্ড (CMS)</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer with Socials */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-center gap-4 text-slate-500 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-600">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-rose-600">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-sky-500">
              <Send className="w-4 h-4" />
            </a>
          </div>
          <div className="text-center text-[11px] text-slate-400 font-editorial-heading">
            © ২০২৬ ওপেন ব্রেফ • সত্যের সন্ধানে, খবরের সাথে
          </div>
        </div>
      </div>
    </div>
  );
};
