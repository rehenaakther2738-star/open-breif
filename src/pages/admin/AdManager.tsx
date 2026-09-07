import React, { useEffect, useState } from 'react';
import { BadgeDollarSign, Plus, Trash2, Edit2, CheckCircle2, XCircle, Code, Shield } from 'lucide-react';
import { Advertisement, AdPlacement, AdType } from '../../types';
import { db } from '../../services/db';

export const AdManager: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [placement, setPlacement] = useState<AdPlacement>('homepage');
  const [adType, setAdType] = useState<AdType>('banner');
  const [adCode, setAdCode] = useState('');
  const [isActive, setIsActive] = useState(true);

  const loadAds = async () => {
    setLoading(true);
    const data = await db.getAds();
    setAds(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAds();
  }, []);

  const handleStartEdit = (ad: Advertisement) => {
    setEditingId(ad.id);
    setName(ad.name);
    setPlacement(ad.placement);
    setAdType(ad.ad_type);
    setAdCode(ad.ad_code);
    setIsActive(ad.status === 'active' || Boolean(ad.is_active));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setPlacement('homepage');
    setAdType('banner');
    setAdCode('');
    setIsActive(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !adCode.trim()) return;

    if (editingId) {
      await db.updateAd(editingId, {
        name: name.trim(),
        placement,
        ad_type: adType,
        ad_code: adCode.trim(),
        status: isActive ? 'active' : 'inactive',
        is_active: isActive,
      });
    } else {
      await db.createAd({
        name: name.trim(),
        placement,
        ad_type: adType,
        ad_code: adCode.trim(),
        status: isActive ? 'active' : 'inactive',
        is_active: isActive,
      });
    }

    handleCancelEdit();
    loadAds();
  };

  const handleToggle = async (ad: Advertisement) => {
    const nextActive = !(ad.status === 'active' || ad.is_active);
    await db.updateAd(ad.id, {
      status: nextActive ? 'active' : 'inactive',
      is_active: nextActive,
    });
    loadAds();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('এই বিজ্ঞাপন স্লটটি মুছে ফেলতে চান?')) {
      await db.deleteAd(id);
      loadAds();
    }
  };

  const placementLabels: Record<AdPlacement, string> = {
    header: 'হেডার বিজ্ঞাপন (Header)',
    homepage: 'হোমপেজ ব্যানার (Homepage)',
    between_articles: 'সংবাদের মাঝে (Between Articles)',
    article_top: 'সংবাদ লেখার শীর্ষে (Article Top)',
    article_middle: 'সংবাদের মধ্যবর্তী (Article Middle)',
    sidebar: 'সাইডবার বিজ্ঞাপন (Sidebar)',
    mobile: 'মোবাইল অ্যাড (Mobile)',
    footer: 'ফুটার বিজ্ঞাপন (Footer)',
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white font-editorial-heading">
          বিজ্ঞাপন ও মনিটাইজেশন ব্যবস্থাপনা
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Adsterra স্ক্রিপ্ট, ব্যানার বিজ্ঞাপন, সোশ্যাল বার ও পপআন্ডার কোড নিয়ন্ত্রণ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 h-fit">
          <h3 className="text-base font-bold text-white font-editorial-heading mb-4 flex items-center gap-2">
            <BadgeDollarSign className="w-4 h-4 text-rose-500" />
            <span>{editingId ? 'বিজ্ঞাপন কোড পরিবর্তন' : 'নতুন বিজ্ঞাপন স্লট যোগ'}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                বিজ্ঞাপনের নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: Adsterra 728x90 Header"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                  বিজ্ঞাপনের ধরন
                </label>
                <select
                  value={adType}
                  onChange={(e) => setAdType(e.target.value as AdType)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-white text-xs focus:outline-hidden"
                >
                  <option value="banner">ব্যানার (Banner)</option>
                  <option value="popunder">পপআন্ডার (Popunder)</option>
                  <option value="social_bar">সোশ্যাল বার (Social Bar)</option>
                  <option value="native">নেটিভ কোড (Native)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                  প্লেসমেন্ট (অবস্থান)
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value as AdPlacement)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-white text-xs focus:outline-hidden"
                >
                  <option value="header">Header</option>
                  <option value="homepage">Homepage</option>
                  <option value="article_top">Article Top</option>
                  <option value="article_middle">Article Middle</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="mobile">Mobile</option>
                  <option value="footer">Footer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading flex items-center justify-between">
                <span>অ্যাড কোড / স্ক্রিপ্ট (HTML / JS / Adsterra)</span>
                <Code className="w-3.5 h-3.5 text-slate-400" />
              </label>
              <textarea
                rows={5}
                required
                value={adCode}
                onChange={(e) => setAdCode(e.target.value)}
                placeholder={'<script type="text/javascript">...</script>'}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-mono focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-editorial-heading">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-0"
                />
                <span>বিজ্ঞাপনটি লাইভ রাখুন (Active)</span>
              </label>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-3 rounded text-xs transition cursor-pointer font-editorial-heading"
              >
                {editingId ? 'আপডেট করুন' : 'বিজ্ঞাপন সেভ করুন'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded text-xs font-editorial-heading"
                >
                  বাতিল
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Table */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-editorial-heading border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">বিজ্ঞাপন</th>
                  <th className="py-3 px-4">প্লেসমেন্ট</th>
                  <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-editorial-heading">
                {ads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500">
                      কোনো বিজ্ঞাপন সংরক্ষিত নেই।
                    </td>
                  </tr>
                ) : (
                  ads.map((ad) => (
                    <tr key={ad.id} className="hover:bg-slate-850 transition">
                      <td className="py-3 px-4 font-bold text-white">
                        <div>{ad.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">
                          {ad.ad_type}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-[11px]">
                        {placementLabels[ad.placement] || ad.placement}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggle(ad)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            ad.is_active
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {ad.is_active ? 'সক্রিয়' : 'বন্ধ'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleStartEdit(ad)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="সম্পাদনা"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(ad.id)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/60 text-rose-400"
                          title="মুছুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
