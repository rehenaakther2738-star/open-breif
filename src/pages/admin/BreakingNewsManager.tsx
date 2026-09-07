import React, { useEffect, useState } from 'react';
import { Flame, Plus, Trash2, Edit2, CheckCircle2, XCircle } from 'lucide-react';
import { BreakingNews } from '../../types';
import { db } from '../../services/db';

export const BreakingNewsManager: React.FC = () => {
  const [items, setItems] = useState<BreakingNews[]>([]);
  const [headline, setHeadline] = useState('');
  const [url, setUrl] = useState('');
  const [priority, setPriority] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await db.getBreakingNews();
    setItems(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) return;

    if (editingId) {
      await db.updateBreakingNews(editingId, {
        headline: headline.trim(),
        url: url.trim(),
        priority,
      });
    } else {
      await db.createBreakingNews({
        headline: headline.trim(),
        url: url.trim(),
        priority,
        is_active: true,
      });
    }

    setEditingId(null);
    setHeadline('');
    setUrl('');
    setPriority(1);
    loadData();
  };

  const handleToggle = async (item: BreakingNews) => {
    await db.updateBreakingNews(item.id, { is_active: !item.is_active });
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('এই ব্রেকিং নিউজটি মুছে ফেলতে চান?')) {
      await db.deleteBreakingNews(id);
      loadData();
    }
  };

  const handleEdit = (item: BreakingNews) => {
    setEditingId(item.id);
    setHeadline(item.headline);
    setUrl(item.url || '');
    setPriority(item.priority || 1);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white font-editorial-heading">
          ব্রেকিং নিউজ টিকার ব্যবস্থাপনা
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          ওয়েবসাইটের হেডারের নিচে চলমান লাল ব্রেকিং নিউজ টিকার নিয়ন্ত্রণ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 h-fit">
          <h3 className="text-base font-bold text-white font-editorial-heading mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>{editingId ? 'ব্রেকিং নিউজ সম্পাদনা' : 'নতুন ব্রেকিং নিউজ যুক্ত করুন'}</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                ব্রেকিং শিরোনাম <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="যেমন: বঙ্গোপসাগরে গভীর নিম্নচাপ সৃষ্টি, ৩ নম্বর সতর্কসংকেত জারি"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                টার্গেট সংবাদ লিংক / ইউআরএল (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="/article/news-slug"
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-mono focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                অগ্রাধিকার ক্রম (Priority)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
                className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-3 rounded text-xs transition cursor-pointer font-editorial-heading"
              >
                {editingId ? 'আপডেট করুন' : 'টিকার এ যোগ করুন'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setHeadline('');
                    setUrl('');
                  }}
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
                  <th className="py-3 px-4">শিরোনাম</th>
                  <th className="py-3 px-4 text-center">সক্রিয়তা</th>
                  <th className="py-3 px-4 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-editorial-heading">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-500">
                      কোনো ব্রেকিং নিউজ নেই।
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-850 transition">
                      <td className="py-3 px-4 font-bold text-white max-w-sm">
                        <div>{item.headline}</div>
                        {item.url && (
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                            {item.url}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggle(item)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition ${
                            item.is_active
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {item.is_active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          <span>{item.is_active ? 'চলমান' : 'স্থগিত'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="সম্পাদনা"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
