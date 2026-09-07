import React, { useEffect, useState } from 'react';
import { Mail, Download, Trash2, Calendar, User, CheckCircle } from 'lucide-react';
import { NewsletterSubscriber } from '../../types';
import { db } from '../../services/db';
import { formatBengaliDate, toBengaliNumber } from '../../utils/bengali';

export const NewsletterManager: React.FC = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await db.getNewsletterSubscribers();
    setSubscribers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Email,Name,Subscribed Date']
        .concat(subscribers.map((s) => `"${s.email}","${s.name || ''}","${s.created_at}"`))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `openbrief_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white font-editorial-heading">
            নিউজলেটার গ্রাহক তালিকা (Subscribers)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            মোট {toBengaliNumber(subscribers.length)} জন পাঠক সক্রিয়ভাবে সাবস্ক্রাইব করেছেন
          </p>
        </div>

        {subscribers.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition border border-slate-700 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>CSV ফাইল হিসেবে ডাউনলোড করুন</span>
          </button>
        )}
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-editorial-heading border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">ইমেইল ঠিকানা</th>
                <th className="py-3 px-4">পাঠকের নাম</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4 text-right">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-editorial-heading">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-slate-500">
                    এখনো কোনো গ্রাহক সাবস্ক্রাইব করেননি।
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-850 transition">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-rose-500" />
                      <span>{sub.email}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {sub.name || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {formatBengaliDate(sub.created_at)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        <span>সক্রিয়</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
