import React, { useState } from 'react';
import { useAuth } from '../../services/auth';
import { Logo } from '../../components/brand/Logo';
import { Lock, User, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToSite }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'লগইন ব্যর্থ হয়েছে। সঠিক ইউজারনেম ও পাসওয়ার্ড প্রদান করুন।');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="inline-block cursor-pointer mb-2" onClick={onBackToSite}>
          <Logo variant="admin" />
        </div>
        <h2 className="mt-4 text-2xl font-black font-editorial-heading text-white tracking-tight">
          নিউজ কন্ট্রোল ও সম্পাদকীয় পোর্টাল
        </h2>
        <p className="mt-1 text-xs text-slate-400 font-editorial-body">
          ওপেন ব্রেফ (OPEN BRIEF) সুরক্ষিত অ্যাডমিনিস্ট্রেশন সিস্টেম
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 py-8 px-6 shadow-2xl rounded-2xl border border-slate-800 sm:px-10">
          {error && (
            <div className="mb-5 flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs font-editorial-heading">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-editorial-heading">
                ইউজারনেম অথবা ইমেইল (Username / Email)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ইউজারনেম লিখুন"
                  autoComplete="username"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-hidden focus:border-rose-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-editorial-heading">
                পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-hidden focus:border-rose-500 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer p-0.5"
                  title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 font-editorial-heading"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'প্রবেশ করা হচ্ছে...' : 'সুরক্ষিত লগইন'}</span>
            </button>
          </form>

          {/* Back to public site */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white transition font-editorial-heading cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>&larr; পাবলিক ওয়েবসাইটে ফিরে যান</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

