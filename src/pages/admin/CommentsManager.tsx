import React, { useEffect, useState } from 'react';
import { MessageSquare, CheckCircle, XCircle, Trash2, Clock, User, ShieldAlert } from 'lucide-react';
import { Comment, CommentStatus } from '../../types';
import { db } from '../../services/db';
import { formatBengaliRelativeTime } from '../../utils/bengali';

export const CommentsManager: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'spam'>('all');
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    setLoading(true);
    const data = await db.getAllComments();
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleUpdateStatus = async (id: string, status: CommentStatus) => {
    await db.updateCommentStatus(id, status);
    loadComments();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('এই মন্তব্যটি চিরতরে মুছে ফেলতে চান?')) {
      await db.deleteComment(id);
      loadComments();
    }
  };

  const filtered = comments.filter((c) => (filter === 'all' ? true : c.status === filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white font-editorial-heading">
            পাঠকের মন্তব্য মডারেশন (Comments)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            অননুমোদিত বা স্প্যাম মন্তব্য ফিল্টার ও অনুমোদন করুন
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg text-xs font-editorial-heading">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded ${filter === 'all' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
          >
            সকল ({comments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded ${filter === 'pending' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400'}`}
          >
            অপেক্ষমান ({comments.filter((c) => c.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded ${filter === 'approved' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
          >
            অনুমোদিত ({comments.filter((c) => c.status === 'approved').length})
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center text-slate-500 font-editorial-heading">
            কোনো মন্তব্য নেই।
          </div>
        ) : (
          filtered.map((comment) => (
            <div
              key={comment.id}
              className="bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm font-editorial-heading mr-2">
                      {comment.author_name}
                    </span>
                    <span className="text-slate-400 text-xs">{comment.author_email}</span>
                  </div>
                  <span
                    className={`ml-auto sm:ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      comment.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : comment.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {comment.status}
                  </span>
                </div>

                <p className="text-slate-200 text-sm leading-relaxed pl-11 font-editorial-body">
                  {comment.content}
                </p>

                <div className="pl-11 text-[11px] text-slate-500 flex items-center gap-1 font-editorial-heading">
                  <Clock className="w-3 h-3" />
                  <span>{formatBengaliRelativeTime(comment.created_at)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {comment.status !== 'approved' && (
                  <button
                    onClick={() => handleUpdateStatus(comment.id, 'approved')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-semibold transition"
                    title="অনুমোদন করুন"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>অনুমোদন</span>
                  </button>
                )}

                {comment.status !== 'spam' && (
                  <button
                    onClick={() => handleUpdateStatus(comment.id, 'spam')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                    title="স্প্যাম চিহ্নিত করুন"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>স্প্যাম</span>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(comment.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
