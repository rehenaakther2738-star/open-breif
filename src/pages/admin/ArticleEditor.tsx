import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  ArrowLeft,
  Image,
  Flame,
  Star,
  Tag,
  FolderTree,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Eye,
  UploadCloud,
  Link,
  Loader2,
  Check,
} from 'lucide-react';
import { Article, Category } from '../../types';
import { db } from '../../services/db';
import { generateSlug } from '../../utils/bengali';
import { uploadImageFile } from '../../utils/imageUpload';

interface ArticleEditorProps {
  initialArticle?: Article | null;
  onSaveComplete: () => void;
  onCancel: () => void;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  initialArticle,
  onSaveComplete,
  onCancel,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [slug, setSlug] = useState(initialArticle?.slug || '');
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || '');
  const [content, setContent] = useState(initialArticle?.content || '');
  const [categoryId, setCategoryId] = useState(initialArticle?.category_id || '');
  const [featuredImage, setFeaturedImage] = useState(
    initialArticle?.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80'
  );
  const [imageCaption, setImageCaption] = useState(initialArticle?.image_caption || '');
  const [photographer, setPhotographer] = useState(initialArticle?.photographer || '');
  const [tagsInput, setTagsInput] = useState((initialArticle?.tags || []).join(', '));
  const [isBreaking, setIsBreaking] = useState(initialArticle?.is_breaking || false);
  const [isFeatured, setIsFeatured] = useState(initialArticle?.is_featured || false);
  const [status, setStatus] = useState<'published' | 'draft'>(initialArticle?.status || 'published');
  const [metaTitle, setMetaTitle] = useState(initialArticle?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialArticle?.meta_description || '');

  // Image upload states
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleProcessFile = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(false);
    setUploadingImage(true);

    const result = await uploadImageFile(file, title || 'ফিচার্ড ইমেজ');
    setUploadingImage(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.url) {
      setFeaturedImage(result.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleProcessFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleProcessFile(file);
    }
  };

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await db.getCategories();
      setCategories(cats);
      if (!categoryId && cats.length > 0) {
        setCategoryId(cats[0].id);
      }
    };
    fetchCats();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialArticle) {
      setSlug(generateSlug(val));
    }
  };

  const handleSave = async (targetStatus?: 'published' | 'draft') => {
    if (!title.trim()) {
      setFeedback({ type: 'error', message: 'সংবাদের শিরোনাম আবশ্যক।' });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const activeStatus = targetStatus || status;
    const finalSlug = slug.trim() || generateSlug(title);
    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const articleData: Partial<Article> = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      category_id: categoryId,
      featured_image: featuredImage.trim(),
      image_caption: imageCaption.trim(),
      photographer: photographer.trim(),
      tags: tagsArray,
      is_breaking: isBreaking,
      is_featured: isFeatured,
      status: activeStatus,
      meta_title: metaTitle.trim() || title.trim(),
      meta_description: metaDescription.trim() || excerpt.trim(),
    };

    try {
      if (initialArticle) {
        await db.updateArticle(initialArticle.id, articleData);
      } else {
        await db.createArticle(articleData);
      }

      setSaving(false);
      setFeedback({ type: 'success', message: 'সংবাদটি সফলভাবে সংরক্ষিত হয়েছে!' });
      setTimeout(() => {
        onSaveComplete();
      }, 700);
    } catch (e: any) {
      setSaving(false);
      setFeedback({ type: 'error', message: e.message || 'সংরক্ষণ ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white font-editorial-heading">
              {initialArticle ? 'সংবাদ সম্পাদনা করুন' : 'নতুন সংবাদ রচনা করুন'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              শিরোনাম, বিস্তারিত অনুচ্ছেদ, ছবি ও মেটা তথ্য পূরণ করুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs transition cursor-pointer disabled:opacity-50 font-editorial-heading"
          >
            ড্রাফট হিসেবে রাখুন
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2 rounded-lg text-xs transition shadow-md cursor-pointer disabled:opacity-50 font-editorial-heading"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'প্রকাশ করুন'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs font-editorial-heading ${
            feedback.type === 'success'
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Editor Grid: Left Content (8 cols) + Right Options (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left main article input fields */}
        <div className="lg:col-span-8 space-y-5">
          {/* Headline */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-editorial-heading">
                সংবাদের শিরোনাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="যেমন: দেশে বিদেশি বিনিয়োগে নতুন রেকর্ড, তৈরি হলো কর্মসংস্থান"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-base font-bold font-editorial-heading focus:outline-hidden focus:border-rose-500"
              />
            </div>

            {/* Slug URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 font-editorial-heading">
                ইউআরএল স্লাগ (Slug)
              </label>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="shrink-0 font-mono text-[11px]">/article/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="custom-news-slug"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 text-xs font-mono focus:outline-hidden focus:border-rose-500"
                />
              </div>
            </div>

            {/* Excerpt / Lead */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-editorial-heading">
                সারসংক্ষেপ / লিড প্যারাগ্রাফ (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="সংবাদের মূল সারমর্ম ১-২ লাইনে লিখুন..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-sm font-editorial-body focus:outline-hidden focus:border-rose-500"
              />
            </div>
          </div>

          {/* Main Article Content */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-editorial-heading">
              মূল সংবাদ প্রতিবেদন (প্যারাগ্রাফ আলাদা করতে ডাবল এন্টার ব্যবহার করুন)
            </label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="এখানে বিস্তারিত সংবাদ লিখুন..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm font-editorial-body leading-relaxed focus:outline-hidden focus:border-rose-500"
            />
          </div>

          {/* SEO Meta Box */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-editorial-heading flex items-center gap-2">
              <Eye className="w-4 h-4 text-rose-500" />
              এসইও ও মেটা ডেটা (Google & Social Snippet)
            </h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-editorial-heading">
                মেটা টাইটেল (Title)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="ডিফল্ট: সংবাদের শিরোনাম"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-editorial-heading">
                মেটা ডেসক্রিপশন (Description)
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="ডিফল্ট: সংবাদের সারসংক্ষেপ"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Right side settings panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* Category & Status */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-editorial-heading">
              প্রকাশনা সেটিংস
            </h3>

            <div>
              <label className="block text-xs text-slate-300 mb-1.5 font-editorial-heading">
                সংবাদ বিভাগ (Category)
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-editorial-heading focus:outline-hidden"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1.5 font-editorial-heading">
                স্ট্যাটাস (Status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-editorial-heading focus:outline-hidden"
              >
                <option value="published">সরাসরি প্রকাশিত (Published)</option>
                <option value="draft">ড্রাফট (Draft)</option>
              </select>
            </div>

            {/* Special Badges */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-editorial-heading text-slate-300">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-0"
                />
                <Flame className="w-4 h-4 text-rose-500" />
                <span>ব্রেকিং নিউজ টিকার এ দেখান</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-editorial-heading text-slate-300">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <Star className="w-4 h-4 text-amber-400" />
                <span>হোমপেজের শীর্ষ সংবাদ (Hero Lead)</span>
              </label>
            </div>
          </div>

          {/* Featured Image Section with Upload Settings */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-editorial-heading flex items-center gap-2">
                <Image className="w-4 h-4 text-rose-500" />
                <span>ফিচার্ড ছবি (Featured Image)</span>
              </h3>
              
              {/* Upload vs URL Mode Selector */}
              <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px] font-editorial-heading">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-2.5 py-1 rounded cursor-pointer transition ${
                    imageMode === 'upload'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  আপলোড করুন
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-2.5 py-1 rounded cursor-pointer transition ${
                    imageMode === 'url'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ছবির লিংক
                </button>
              </div>
            </div>

            {/* Current Image Preview */}
            {featuredImage && (
              <div className="relative group rounded-lg overflow-hidden bg-slate-950 border border-slate-800 aspect-[16/10]">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer font-editorial-heading shadow-md"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>নতুন ছবি আপলোড করুন</span>
                  </button>
                </div>
              </div>
            )}

            {/* Upload Area Mode */}
            {imageMode === 'upload' ? (
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onClick={() => !uploadingImage && fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
                    uploadingImage
                      ? 'border-rose-500 bg-rose-500/5'
                      : 'border-slate-700 hover:border-rose-500 bg-slate-950/60 hover:bg-slate-950'
                  }`}
                >
                  {uploadingImage ? (
                    <div className="py-2 flex flex-col items-center justify-center gap-2 text-rose-400">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="text-xs font-editorial-heading font-medium">ছবি প্রসেস ও আপলোড হচ্ছে...</span>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center justify-center gap-1.5 text-slate-400">
                      <div className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-rose-500">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-200 font-editorial-heading mt-1">
                        গ্যালারি বা ডিভাইস থেকে ছবি নির্বাচন করুন
                      </p>
                      <p className="text-[11px] text-slate-500 font-editorial-heading">
                        ক্লিক করুন বা ছবি ড্র্যাগ করে আনুন (JPG, PNG, WebP)
                      </p>
                    </div>
                  )}
                </div>

                {uploadSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-editorial-heading bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                    <Check className="w-4 h-4" />
                    <span>ছবি সফলভাবে আপলোড সম্পন্ন হয়েছে!</span>
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs text-rose-400 font-editorial-heading bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                    {uploadError}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-editorial-heading">
                  ছবির অনলাইন লিংক (Image URL)
                </label>
                <div className="relative">
                  <Link className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs font-mono focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>
            )}

            {/* Caption & Photographer */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-editorial-heading">ছবির ক্যাপশন</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="ছবির সংক্ষিপ্ত বিবরণ..."
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-editorial-heading">ফটোগ্রাফার / ছবির উৎস</label>
                <input
                  type="text"
                  value={photographer}
                  onChange={(e) => setPhotographer(e.target.value)}
                  placeholder="যেমন: ফোকাস বাংলা / সংগৃহীত"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs font-editorial-heading focus:outline-hidden focus:border-rose-500"
                />
              </div>
            </div>
          </div>


          {/* Tags */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white font-editorial-heading flex items-center gap-2">
              <Tag className="w-4 h-4 text-rose-500" />
              সংবাদ ট্যাগ (Tags)
            </h3>
            <p className="text-[11px] text-slate-400">কমা (,) দিয়ে আলাদা করুন</p>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="বাংলাদেশ, বাণিজ্য, ঢাকা, অর্থনীতি"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs font-editorial-heading focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
