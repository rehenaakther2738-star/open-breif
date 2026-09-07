import React from 'react';
import { Facebook, Youtube, Send, Twitter, MapPin, Mail, Phone, ChevronUp } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { Category, SiteSettings } from '../../types';

interface FooterProps {
  categories: Category[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, settings, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickCategories = categories.slice(0, 8);
  const moreCategories = categories.slice(8, 14);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <div onClick={() => onNavigate('/')} className="cursor-pointer mb-4">
              <Logo variant="footer" />
            </div>
            
            <div className="space-y-2.5 text-xs text-slate-400 font-editorial-body mt-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{settings.address || 'লেভেল ৪, রূপায়ন সেন্টার, কাকরাইল, ঢাকা-১০০০'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{settings.contact_email || 'info@openbrief.news'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{settings.phone || '+৮৮০ ১৭০০-০০০০০০'}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href={settings.facebook_url || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.youtube_url || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-rose-600 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings.telegram_url || 'https://t.me'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-sky-500 transition"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={settings.x_url || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition"
                aria-label="X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories 1 (2 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white font-editorial-heading uppercase tracking-wider mb-4 border-l-2 border-rose-600 pl-2.5">
              বিভাগসমূহ
            </h4>
            <ul className="space-y-2 text-xs font-editorial-heading">
              {quickCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/category/${cat.slug}`)}
                    className="hover:text-rose-400 transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white font-editorial-heading uppercase tracking-wider mb-4 border-l-2 border-rose-600 pl-2.5">
              আরও বিষয়
            </h4>
            <ul className="space-y-2 text-xs font-editorial-heading">
              {moreCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/category/${cat.slug}`)}
                    className="hover:text-rose-400 transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links / Static Pages (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white font-editorial-heading uppercase tracking-wider mb-4 border-l-2 border-rose-600 pl-2.5">
              গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-2 text-xs font-editorial-heading">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-rose-400 transition">
                  আমাদের সম্পর্কে (About Us)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-rose-400 transition">
                  যোগাযোগ ও সম্পাদকীয় টিম (Contact)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-rose-400 transition">
                  গোপনীয়তা নীতি (Privacy Policy)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-rose-400 transition">
                  ব্যবহারের শর্তাবলী (Terms & Conditions)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="hover:text-rose-400 transition">
                  দাবিত্যাগ (Disclaimer)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cookie-policy')} className="hover:text-rose-400 transition">
                  কুকি নীতি (Cookie Policy)
                </button>
              </li>
              <li className="pt-2">
                <button onClick={() => onNavigate('/admin')} className="text-rose-400 font-bold hover:underline">
                  অ্যাডমিন প্রবেশ (Admin Login)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-editorial-body">
          <div>
            {settings.footer_text || '© ২০২৬ ওপেন ব্রেফ (OPEN BRIEF). সর্বস্বত্ব সংরক্ষিত।'}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition border border-slate-800 cursor-pointer"
          >
            <span>উপরে যান</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
