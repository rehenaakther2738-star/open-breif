import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, FolderTree, Check, X } from 'lucide-react';
import { Category } from '../../types';
import { db } from '../../services/db';
import { generateSlug, toBengaliNumber } from '../../utils/bengali';

export const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [showInNav, setShowInNav] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    const data = await db.getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setShowInNav(cat.show_in_nav ?? true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setShowInNav(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSlug = slug.trim() || generateSlug(name);

    if (editingId) {
      await db.updateCategory(editingId, {
        name: name.trim(),
        slug: finalSlug,
        description: description.trim(),
        show_in_nav: showInNav,
      });
    } else {
      await db.createCategory({
        name: name.trim(),
        slug: finalSlug,
        description: description.trim(),
        show_in_nav: showInNav,
      });
    }

    handleCancelEdit();
    loadCategories();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('এই ক্যাটাগরি মুছে ফেলতে চান?')) {
      await db.deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white font-editorial-heading">
          ক্যাটাগরি ব্যবস্থাপনা (Category Management)
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          নিউজ পোর্টালের সকল বিভাগ পরিচালনা, নতুন বিভাগ যুক্ত ও নেভিগেশন নিয়ন্ত্রণ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-4 bg-slate-900 p-5 rounded-xl border border-slate-800 h-fit">
          <h3 className="text-base font-bold text-white font-editorial-heading mb-4 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-rose-500" />
            <span>{editingId ? 'ক্যাটাগরি সম্পাদনা' : 'নতুন ক্যাটাগরি যোগ করুন'}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                বিভাগের নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!editingId) setSlug(generateSlug(e.target.value));
                }}
                placeholder="যেমন: বিনোদন"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 font-editorial-heading">
                স্লাগ (URL Slug)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="entertainment"
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 text-xs font-mono focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-editorial-heading">
                বিবরণ (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="এই বিভাগের সংক্ষিপ্ত পরিচিতি..."
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-editorial-body focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-editorial-heading">
                <input
                  type="checkbox"
                  checked={showInNav}
                  onChange={(e) => setShowInNav(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-0"
                />
                <span>হেডার মেনু বারে দেখান (Show in Nav)</span>
              </label>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-3 rounded text-xs transition cursor-pointer font-editorial-heading"
              >
                {editingId ? 'আপডেট করুন' : 'যোগ করুন'}
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

        {/* Right: Table */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-editorial-heading border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">বিভাগের নাম</th>
                  <th className="py-3 px-4">স্লাগ</th>
                  <th className="py-3 px-4 text-center">হেডারে সক্রিয়</th>
                  <th className="py-3 px-4 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-editorial-heading">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-850 transition">
                    <td className="py-3 px-4 font-bold text-white">
                      {cat.name}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {cat.slug}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          cat.show_in_nav
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {cat.show_in_nav ? 'হ্যাঁ' : 'না'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleStartEdit(cat)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="সম্পাদনা"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/60 text-rose-400"
                        title="মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
