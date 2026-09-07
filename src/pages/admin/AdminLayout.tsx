import React, { useState } from 'react';
import { useAuth } from '../../services/auth';
import { Logo } from '../../components/brand/Logo';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Flame,
  BadgeDollarSign,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export type AdminTab =
  | 'overview'
  | 'articles'
  | 'new-article'
  | 'categories'
  | 'breaking'
  | 'ads'
  | 'comments'
  | 'newsletter'
  | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onGoToSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onGoToSite,
  children,
}) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSupabaseReady = isSupabaseConfigured();

  const navItems: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: 'overview', label: 'ড্যাশবোর্ড ওভারভিউ', icon: LayoutDashboard },
    { id: 'articles', label: 'সকল সংবাদ', icon: FileText },
    { id: 'new-article', label: 'নতুন সংবাদ লিখুন', icon: PlusCircle },
    { id: 'categories', label: 'ক্যাটাগরি সমূহ', icon: FolderTree },
    { id: 'breaking', label: 'ব্রেকিং নিউজ', icon: Flame },
    { id: 'ads', label: 'বিজ্ঞাপন (Adsterra/Banner)', icon: BadgeDollarSign },
    { id: 'comments', label: 'পাঠকের মন্তব্য', icon: MessageSquare },
    { id: 'newsletter', label: 'নিউজলেটার গ্রাহক', icon: Mail },
    { id: 'settings', label: 'পোর্টাল সেটিংস', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <Logo variant="admin" />
        <div className="flex items-center gap-2">
          <button
            onClick={onGoToSite}
            className="p-2 text-slate-400 hover:text-white"
            title="পাবলিক সাইট"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 border-b border-slate-800">
            <Logo variant="admin" />
            {/* Database status indicator */}
            <div className="mt-3 flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/60 border border-slate-800 text-[11px]">
              <Database className={`w-3.5 h-3.5 ${isSupabaseReady ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="text-slate-400">স্টোরেজ:</span>
              <span className={`font-semibold ${isSupabaseReady ? 'text-emerald-400' : 'text-amber-300'}`}>
                {isSupabaseReady ? 'Supabase PG' : 'Local Persistence'}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer font-editorial-heading ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile & actions in bottom sidebar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate font-editorial-heading">
                {user?.name || 'অ্যাডমিন'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={onGoToSite}
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>সাইট দেখুন</span>
            </button>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition cursor-pointer"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
