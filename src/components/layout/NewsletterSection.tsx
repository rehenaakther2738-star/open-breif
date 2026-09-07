import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Facebook, Youtube, Send, Twitter } from 'lucide-react';
import { db } from '../../services/db';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedbackMsg('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন।');
      return;
    }

    setStatus('loading');
    const res = await db.subscribeNewsletter(email, name);
    if (res.success) {
      setStatus('success');
      setFeedbackMsg(res.message);
      setEmail('');
      setName('');
    } else {
      setStatus('error');
      setFeedbackMsg(res.message);
    }
  };

  return (
    <section className="my-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg border border-slate-800">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left column */}
        <div className="md:col-span-6">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-rose-500/30">
            <Mail className="w-3.5 h-3.5" />
            <span>নিউজলেটার সাবস্ক্রিপশন</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-editorial-heading tracking-tight leading-snug">
            দিনের সেরা খবরের বিশ্লেষণ সবার আগে পেতে যুক্ত থাকুন
          </h3>
          <p className="text-sm text-slate-300 font-editorial-body mt-2 leading-relaxed">
            প্রতিদিন সকালে আপনার ইনবক্সে পৌঁছাবে গুরুত্বপূর্ণ জাতীয়, আন্তর্জাতিক ও ব্যবসায়িক সংবাদের সারসংক্ষেপ। কোনো স্প্যাম নেই।
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">অনুসরণ করুন:</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-rose-600 transition"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-sky-500 transition"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition"
              aria-label="X"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="md:col-span-6 bg-slate-800/80 p-6 rounded-xl border border-slate-700 backdrop-blur-xs">
          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold font-editorial-heading text-white">
                ধন্যবাদ!
              </h4>
              <p className="text-sm text-slate-300 mt-1 font-editorial-body">
                {feedbackMsg}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-xs font-semibold text-rose-400 hover:underline"
              >
                আরেকটি ইমেইল সাবস্ক্রাইব করুন
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 font-editorial-heading">
                  আপনার নাম (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানজিল আহমেদ"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 font-editorial-heading">
                  ইমেইল ঠিকানা <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-rose-500 transition"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-400 text-xs mt-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-sm cursor-pointer disabled:opacity-50 mt-2 font-editorial-heading"
              >
                {status === 'loading' ? 'প্রসেসিং হচ্ছে...' : 'নিউজলেটার সাবস্ক্রাইব করুন'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
