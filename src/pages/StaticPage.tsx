import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Mail, MapPin, Phone, ShieldCheck, FileText, HelpCircle, Users } from 'lucide-react';
import { SiteSettings } from '../types';

interface StaticPageProps {
  pageType: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookie-policy';
  settings: SiteSettings;
}

export const StaticPage: React.FC<StaticPageProps> = ({ pageType, settings }) => {
  const contentMap = {
    about: {
      title: 'আমাদের সম্পর্কে | OPEN BRIEF',
      heading: 'আমাদের সম্পর্কে',
      icon: Users,
      description: 'ওপেন ব্রেফ (OPEN BRIEF) — সত্যের সন্ধানে, খবরের সাথে।',
      body: (
        <div className="space-y-6 text-slate-700 font-editorial-body text-base leading-relaxed">
          <p>
            <strong>ওপেন ব্রেফ (OPEN BRIEF)</strong> বাংলাদেশের একটি আধুনিক, নিরপেক্ষ ও দায়িত্বশীল ডিজিটাল সংবাদ প্ল্যাটফর্ম। 
            আমাদের মূল অঙ্গীকার হলো সত্য ও বস্তুনিষ্ঠ তথ্য পাঠকের সামনে দ্রুত ও নির্ভুলভাবে উপস্থাপন করা। 
            রাজনীতি, অর্থনীতি, আন্তর্জাতিক কূটনীতি, বিজ্ঞান-প্রযুক্তি, সংস্কৃতি ও খেলাধুলার গভীর অন্তর্দৃষ্টিমূলক বিশ্লেষণ 
            আমরা প্রতিদিন পাঠকের হাতে তুলে দিই।
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-editorial-heading">আমাদের নীতি ও দর্শন</h3>
          <p>
            আমরা হলুদ সাংবাদিকতা ও সংবেদনশীল চটকদার সংবাদের সম্পূর্ণ বিরোধী। তথ্যের একাধিক উৎস যাচাই, 
            পক্ষপাতহীন সম্পাদকীয় দৃষ্টিভঙ্গি এবং জনস্বার্থকে সর্বোচ্চ অগ্রাধিকার দেওয়াই ওপেন ব্রেফ-এর পথচলার মূল ভিত্তি।
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-editorial-heading">সম্পাদকীয় প্যানেল</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>প্রধান সম্পাদক:</strong> শাহরিয়ার আহমেদ</li>
            <li><strong>নির্বাহী সম্পাদক:</strong> নাজিয়া তাবাসসুম</li>
            <li><strong>বার্তা সম্পাদক:</strong> তানভীর হাসান</li>
            <li><strong>প্রধান বার্তা কক্ষ:</strong> কাকরাইল, ঢাকা-১০০০, বাংলাদেশ।</li>
          </ul>
        </div>
      ),
    },
    contact: {
      title: 'যোগাযোগ ও সম্পাদকীয় টিম | OPEN BRIEF',
      heading: 'যোগাযোগ করুন',
      icon: Mail,
      description: 'ওপেন ব্রেফ প্রধান কার্যালয় ও যোগাযোগ বিবরণী।',
      body: (
        <div className="space-y-6 text-slate-700 font-editorial-body text-base leading-relaxed">
          <p>
            সংবাদ সংক্রান্ত মতামত, প্রেস বিজ্ঞপ্তি পাঠানো অথবা বিজ্ঞাপনের বিষয়ে জানতে নিচের ঠিকানায় যোগাযোগ করুন।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-stone-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 font-editorial-heading mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                প্রধান কার্যালয়
              </h4>
              <p className="text-sm text-slate-600">
                {settings.address || 'লেভেল ৪, রূপায়ন সেন্টার, কাকরাইল, ঢাকা-১০০০, বাংলাদেশ'}
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 font-editorial-heading mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-rose-600" />
                ইমেইল ও ফোন
              </h4>
              <p className="text-sm text-slate-600">
                সম্পাদকীয় ইমেইল: {settings.contact_email || 'editorial@openbrief.news'}<br />
                বিজ্ঞাপন বিভাগ: ads@openbrief.news<br />
                হটলাইন: {settings.phone || '+৮৮০ ১৭০০-০০০০০০'}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    privacy: {
      title: 'গোপনীয়তা নীতি (Privacy Policy) | OPEN BRIEF',
      heading: 'গোপনীয়তা নীতি (Privacy Policy)',
      icon: ShieldCheck,
      description: 'পাঠকের তথ্যের সুরক্ষা ও গোপনীয়তা বিষয়ক নীতি।',
      body: (
        <div className="space-y-4 text-slate-700 font-editorial-body text-base leading-relaxed">
          <p>
            ওপেন ব্রেফ (OPEN BRIEF) আপনার ব্যক্তিগত তথ্যের সুরক্ষাকে সর্বোচ্চ গুরুত্ব দিয়ে থাকে। 
            এই নীতিমালায় বর্ণিত হয়েছে কীভাবে আমরা আপনার তথ্য সংগ্রহ, সংরক্ষণ ও ব্যবহার করি।
          </p>
          <h4 className="text-lg font-bold text-slate-900 font-editorial-heading">১. সংগৃহীত তথ্য</h4>
          <p>
            আপনি যখন আমাদের নিউজলেটার সাবস্ক্রাইব করেন বা কোনো মন্তব্য পোস্ট করেন, তখন আমরা আপনার নাম এবং ইমেইল ঠিকানা সংরক্ষণ করতে পারি। 
            আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকি প্রযুক্তি ব্যবহার করা হতে পারে।
          </p>
          <h4 className="text-lg font-bold text-slate-900 font-editorial-heading">২. তথ্যের নিরাপত্তা</h4>
          <p>
            আমরা আপনার কোনো ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা অননুমোদিত হস্তান্তর করি না। 
            আইনগত বাধ্যবাধকতা ছাড়া পাঠকের পরিচয় সম্পূর্ণ গোপন রাখা হয়।
          </p>
        </div>
      ),
    },
    terms: {
      title: 'ব্যবহারের শর্তাবলী (Terms & Conditions) | OPEN BRIEF',
      heading: 'ব্যবহারের শর্তাবলী (Terms & Conditions)',
      icon: FileText,
      description: 'ওপেন ব্রেফ পোর্টাল ব্যবহারের প্রয়োজনীয় নিয়ম ও নীতিমালা।',
      body: (
        <div className="space-y-4 text-slate-700 font-editorial-body text-base leading-relaxed">
          <p>
            ওপেন ব্রেফ ওয়েবসাইট পরিদর্শনের মাধ্যমে আপনি আমাদের সকল ব্যবহারের শর্তাবলীর প্রতি সম্মতি প্রকাশ করছেন।
          </p>
          <h4 className="text-lg font-bold text-slate-900 font-editorial-heading">কপিরাইট ও স্বত্ব</h4>
          <p>
            ওপেন ব্রেফে প্রকাশিত সকল সংবাদ প্রতিবেদন, বিশ্লেষণ, আলোকচিত্র ও ভিডিও ওপেন ব্রেফ কর্তৃপক্ষের বুদ্ধিবৃত্তিক সম্পত্তি। 
            লিখিত অনুমতি ব্যতীত কোনো সংবাদ হুবহু অন্য কোথাও প্রকাশ বা বাণিজ্যিক ব্যবহার কপিরাইট আইন অনুযায়ী দণ্ডনীয় অপরাধ।
          </p>
        </div>
      ),
    },
    disclaimer: {
      title: 'দাবিত্যাগ (Disclaimer) | OPEN BRIEF',
      heading: 'দাবিত্যাগ (Disclaimer)',
      icon: HelpCircle,
      description: 'সংবাদ ও মতামত কলামের দায়বদ্ধতা সম্পর্কিত ঘোষণা।',
      body: (
        <div className="space-y-4 text-slate-700 font-editorial-body text-base leading-relaxed">
          <p>
            ওপেন ব্রেফ প্রতিটি সংবাদ সতর্কতার সাথে যাচাই করে প্রকাশ করে থাকে। তথাপি কোনো অনিচ্ছাকৃত ভুলের ক্ষেত্রে আমরা দ্রুত সংশোধনী প্রকাশে প্রতিজ্ঞাবদ্ধ।
          </p>
          <p>
            মতামত ও সম্পাদকীয় কলামে প্রকাশিত বক্তব্য সংশ্লিষ্ট লেখকের নিজস্ব দৃষ্টিভঙ্গি; এর জন্য ওপেন ব্রেফ কর্তৃপক্ষ প্রত্যক্ষভাবে দায়ী নয়।
          </p>
        </div>
      ),
    },
    'cookie-policy': {
      title: 'কুকি নীতি (Cookie Policy) | OPEN BRIEF',
      heading: 'কুকি নীতি (Cookie Policy)',
      icon: ShieldCheck,
      description: 'ওয়েবসাইটের কুকি সংক্রান্ত নীতিমালা।',
      body: (
        <div className="space-y-4 text-slate-700 font-editorial-body text-base leading-relaxed">
          <p>
            আমাদের ওয়েবসাইট পাঠকের অভিজ্ঞতা সমৃদ্ধ করতে এবং প্রাসঙ্গিক বিজ্ঞাপন প্রদর্শন করতে মানসম্মত কুকি ফাইল ব্যবহার করে। 
            আপনি চাইলে আপনার ব্রাউজার সেটিংসে কুকি নিষ্ক্রিয় করে রাখতে পারেন।
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[pageType] || contentMap.about;
  const IconComponent = current.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SEOHead title={current.title} description={current.description} />

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <IconComponent className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-editorial-heading">
            {current.heading}
          </h1>
        </div>

        {current.body}
      </div>
    </div>
  );
};
