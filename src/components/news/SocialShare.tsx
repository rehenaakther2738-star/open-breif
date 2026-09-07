import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Facebook, MessageCircle, Send, Twitter } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  className?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ title, url, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    messenger: `fb-messenger://share/?link=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  };

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-1 font-editorial-heading">
        <Share2 className="w-3.5 h-3.5 text-rose-600" />
        শেয়ার:
      </span>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
        title="Share on Facebook"
      >
        <Facebook className="w-3.5 h-3.5 fill-current" />
        <span className="hidden sm:inline">ফেসবুক</span>
      </a>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">হোয়াটসঅ্যাপ</span>
      </a>

      {/* Telegram */}
      <a
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-xs transition"
        title="Share on Telegram"
      >
        <Send className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">টেলিগ্রাম</span>
      </a>

      {/* X / Twitter */}
      <a
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition"
        title="Share on X"
      >
        <Twitter className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">এক্স</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition cursor-pointer ${
          copied
            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
        }`}
        title="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
        <span>{copied ? 'লিংক কপি হয়েছে!' : 'কপি লিংক'}</span>
      </button>
    </div>
  );
};
