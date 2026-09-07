import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle, Clock, User } from 'lucide-react';
import { Comment } from '../../types';
import { db } from '../../services/db';
import { formatBengaliRelativeTime, toBengaliNumber } from '../../utils/bengali';

interface CommentSectionProps {
  articleId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchComments = async () => {
      const data = await db.getCommentsForArticle(articleId, true);
      if (isMounted) setComments(data);
    };
    fetchComments();
    return () => { isMounted = false; };
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || !email.trim()) return;

    setSubmitting(true);
    await db.addComment({
      article_id: articleId,
      author_name: name.trim(),
      author_email: email.trim(),
      content: content.trim(),
    });

    setSubmitting(false);
    setSubmitted(true);
    setName('');
    setEmail('');
    setContent('');
  };

  return (
    <div className="my-10 bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
        <MessageSquare className="w-5 h-5 text-rose-600" />
        <h3 className="text-xl font-bold text-slate-900 font-editorial-heading">
          পাঠকের মন্তব্য ({toBengaliNumber(comments.length)})
        </h3>
      </div>

      {/* Comment Form */}
      <div className="bg-stone-50 rounded-xl p-5 border border-slate-200/60 mb-8">
        <h4 className="text-sm font-bold text-slate-800 mb-3 font-editorial-heading">
          আপনার মূল্যবান মতামত প্রকাশ করুন
        </h4>

        {submitted ? (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-4 rounded-lg border border-emerald-200 font-editorial-heading text-sm">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>
              ধন্যবাদ! আপনার মন্তব্যটি গৃহীত হয়েছে। সম্পাদকীয় নিরীক্ষার পর তা প্রকাশিত হবে।
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-editorial-heading">
                  আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: রফিকুল ইসলাম"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500 font-editorial-heading"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-editorial-heading">
                  ইমেইল ঠিকানা <span className="text-rose-500">*</span> (প্রকাশিত হবে না)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 font-editorial-heading">
                আপনার মন্তব্য <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="সংবাদ সম্পর্কে শালীন ভাষায় মতামত লিখুন..."
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500 font-editorial-body"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition shadow-xs cursor-pointer font-editorial-heading disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'পাঠানো হচ্ছে...' : 'মন্তব্য সাবমিট করুন'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Approved Comments List */}
      <div className="space-y-4 divide-y divide-slate-100">
        {comments.length === 0 ? (
          <p className="text-slate-500 text-sm py-4 font-editorial-body italic text-center">
            এখনো কোনো মন্তব্য প্রকাশিত হয়নি। আপনিই প্রথম মন্তব্য করুন!
          </p>
        ) : (
          comments.map((comm) => (
            <div key={comm.id} className="pt-4 first:pt-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm font-editorial-heading">
                      {comm.author_name}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-editorial-heading">
                  <Clock className="w-3 h-3" />
                  {formatBengaliRelativeTime(comm.created_at)}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed pl-10 font-editorial-body">
                {comm.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
