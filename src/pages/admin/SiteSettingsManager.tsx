import React, { useEffect, useState } from 'react';
import { Save, Settings, Globe, Share2, Mail, CheckCircle2, AlertCircle, Database, Key } from 'lucide-react';
import { SiteSettings } from '../../types';
import { db } from '../../services/db';
import { isSupabaseConfigured } from '../../lib/supabase';

export const SiteSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isSupabase = isSupabaseConfigured();

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const data = await db.getSettings();
      setSettings(data);
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setFeedback(null);

    await db.updateSettings(settings);
    setSaving(false);
    setFeedback('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
    setTimeout(() => setFeedback(null), 3000);
  };

  if (loading || !settings) {
    return <div className="p-8 text-center text-slate-400">সেটিংস লোড হচ্ছে...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white font-editorial-heading">
            পোর্টাল সেটিংস ও কনফিগারেশন
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            ওয়েবসাইটের নাম, লোগো, যোগাযোগ, সোশ্যাল মিডিয়া ও এসইও বিবরণী
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md cursor-pointer disabled:opacity-50 font-editorial-heading self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সেভ করুন'}</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2 font-editorial-heading">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Identity */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-editorial-heading flex items-center gap-2">
            <Globe className="w-4 h-4 text-rose-500" />
            ব্র্যান্ড ও সাধারণ পরিচিতি
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                ওয়েবসাইটের বাংলা নাম
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                ইংরেজি ব্র্যান্ড নাম
              </label>
              <input
                type="text"
                value={settings.site_name_en}
                onChange={(e) => setSettings({ ...settings, site_name_en: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs focus:outline-hidden focus:border-rose-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
              স্লোগান / ট্যাগলাইন (Tagline)
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
              ফুটার কপিরাইট টেক্সট
            </label>
            <input
              type="text"
              value={settings.footer_text}
              onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-editorial-heading flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-500" />
            যোগাযোগ ও সম্পাদকীয় ঠিকানা
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                যোগাযোগ ইমেইল
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                হটলাইন / ফোন
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs focus:outline-hidden focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
              অফিস ঠিকানা
            </label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-editorial-heading flex items-center gap-2">
            <Share2 className="w-4 h-4 text-rose-500" />
            সোশ্যাল মিডিয়া পেজ লিংক
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Facebook URL</label>
              <input
                type="url"
                value={settings.facebook_url}
                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-mono focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={settings.youtube_url}
                onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-mono focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Telegram Channel URL</label>
              <input
                type="url"
                value={settings.telegram_url}
                onChange={(e) => setSettings({ ...settings, telegram_url: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-mono focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">X (Twitter) URL</label>
              <input
                type="url"
                value={settings.x_url}
                onChange={(e) => setSettings({ ...settings, x_url: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-mono focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Database info card */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white font-editorial-heading flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Supabase ক্লাউড ব্যাকএন্ড ইন্টিগ্রেশন
          </h3>
          <p className="text-xs text-slate-300 font-editorial-body leading-relaxed">
            ওপেন ব্রেফ পূর্ণাঙ্গ প্রোডাকশন মোডে চালানোর জন্য Supabase PostgreSQL ডাটাবেস প্রস্তুত করা আছে। 
            আপনার Netlify অথবা হোস্টিং সেটিংসে নিচের এনভায়রনমেন্ট ভ্যারিয়েবল দুটি সেট করলেই এটি স্বয়ংক্রিয়ভাবে ক্লাউড মোডে চলবে:
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div>VITE_SUPABASE_URL=https://your-project.supabase.co</div>
            <div>VITE_SUPABASE_ANON_KEY=your-anon-key</div>
          </div>
        </div>
      </form>
    </div>
  );
};
