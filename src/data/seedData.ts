import { Article, Category, Author, BreakingNews, Advertisement, SiteSettings, StaticPage } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'জাতীয়',
    slug: 'national',
    description: 'দেশের প্রধান ও গুরুত্বপূর্ণ জাতীয় সংবাদ',
    order_index: 1,
    is_active: true,
  },
  {
    id: 'cat-2',
    name: 'রাজনীতি',
    slug: 'politics',
    description: 'রাজনৈতিক অঙ্গনের সবশেষ ঘটনাপ্রবাহ ও বিশ্লেষণ',
    order_index: 2,
    is_active: true,
  },
  {
    id: 'cat-3',
    name: 'আন্তর্জাতিক',
    slug: 'international',
    description: 'বিশ্বজুড়ে ঘটে যাওয়া আলোচিত সংবাদ',
    order_index: 3,
    is_active: true,
  },
  {
    id: 'cat-4',
    name: 'অর্থনীতি',
    slug: 'economy',
    description: 'বাজারদর, ব্যাংক খাত ও দেশের অর্থনৈতিক গতিবিধি',
    order_index: 4,
    is_active: true,
  },
  {
    id: 'cat-5',
    name: 'ব্যবসা',
    slug: 'business',
    description: 'বাণিজ্য, শিল্পোদ্যোগ ও করপোরেট খবরের হালনাগাদ',
    order_index: 5,
    is_active: true,
  },
  {
    id: 'cat-6',
    name: 'প্রযুক্তি',
    slug: 'tech',
    description: 'বিজ্ঞান, তথ্যপ্রযুক্তি, এআই ও গ্যাজেটের খবর',
    order_index: 6,
    is_active: true,
  },
  {
    id: 'cat-7',
    name: 'খেলাধুলা',
    slug: 'sports',
    description: 'ক্রিকেট, ফুটবলসহ দেশ-বিদেশের মাঠের লড়াই',
    order_index: 7,
    is_active: true,
  },
  {
    id: 'cat-8',
    name: 'বিনোদন',
    slug: 'entertainment',
    description: 'সিনেমা, নাটক, গান ও সংস্কৃতির নানা খবর',
    order_index: 8,
    is_active: true,
  },
  {
    id: 'cat-9',
    name: 'সারাদেশ',
    slug: 'countrywide',
    description: 'গ্রাম-শহরের তৃণমূল মানুষের প্রতিচ্ছবি',
    order_index: 9,
    is_active: true,
  },
  {
    id: 'cat-10',
    name: 'জীবনযাপন',
    slug: 'lifestyle',
    description: 'ফ্যাশন, ভ্রমণ, খাদ্য ও দৈনন্দিন জীবনের পরামর্শ',
    order_index: 10,
    is_active: true,
  },
  {
    id: 'cat-11',
    name: 'শিক্ষা',
    slug: 'education',
    description: 'পরীক্ষা, ক্যাম্পাস, স্কলারশিপ ও উচ্চশিক্ষার আপডেট',
    order_index: 11,
    is_active: true,
  },
  {
    id: 'cat-12',
    name: 'স্বাস্থ্য',
    slug: 'health',
    description: 'চিকিৎসা বিজ্ঞান, রোগ প্রতিরোধ ও সুস্থ থাকার টিপস',
    order_index: 12,
    is_active: true,
  },
  {
    id: 'cat-13',
    name: 'মতামত',
    slug: 'opinion',
    description: 'বিশিষ্ট লেখকদের বিশ্লেষণধর্মী কলাম ও উপসম্পাদকীয়',
    order_index: 13,
    is_active: true,
  },
  {
    id: 'cat-14',
    name: 'ভিডিও',
    slug: 'video',
    description: 'ভিজ্যুয়াল রিপোর্ট, সাক্ষাৎকার ও স্পেশাল কভারেজ',
    order_index: 14,
    is_active: true,
  },
];

export const initialAuthors: Author[] = [
  {
    id: 'auth-1',
    name: 'তানভীর আহমেদ',
    profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    designation: 'প্রধান প্রতিবেদক',
    bio: 'জাতীয় ও আন্তর্জাতিক ভূরাজনীতি বিষয়ে ১৫ বছরের সাংবাদিকতার অভিজ্ঞতা।',
    email: 'tanvir@openbrief.news',
    facebook: 'https://facebook.com',
    x: 'https://twitter.com',
  },
  {
    id: 'auth-2',
    name: 'নাজনীন সুলতানা',
    profile_photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    designation: 'অর্থনীতি বিষয়ক সম্পাদক',
    bio: 'ম্যাক্রো-ইকোনমিক্স, ব্যাংকিং রিফর্ম ও বৈদেশিক বাণিজ্য বিশ্লেষক।',
    email: 'nazneen@openbrief.news',
    facebook: 'https://facebook.com',
  },
  {
    id: 'auth-3',
    name: 'মাহমুদুল হাসান',
    profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    designation: 'প্রযুক্তি ও উদ্ভাবন ইনচার্জ',
    bio: 'আর্টিফিশিয়াল ইন্টেলিজেন্স, ক্লাউড কম্পিউটিং ও স্টার্টআপ ইকোসিস্টেম নিয়ে নিয়মিত লিখছেন।',
    email: 'mahmud@openbrief.news',
    x: 'https://twitter.com',
  },
  {
    id: 'auth-4',
    name: 'ফারহানা ইসলাম',
    profile_photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    designation: 'বিশেষ প্রতিবেদক (সংস্কৃতি ও শিক্ষা)',
    bio: 'ঢাকা বিশ্ববিদ্যালয় থেকে গণযোগাযোগ ও সাংবাদিকতায় স্নাতকোত্তর। শিক্ষানীতি গবেষক।',
    email: 'farhana@openbrief.news',
  },
];

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'মেট্রোরেলের নতুন রুটে পরীক্ষামূলক চলাচল শুরু, স্বস্তি ফিরছে রাজধানীর যাতায়াতে',
    slug: 'metro-rail-new-route-test-run-dhaka',
    excerpt: 'রাজধানীর যানজট নিরসনে নতুন মাইলফলক। নির্ধারিত সময়ের আগেই সফলভাবে সম্পন্ন হলো মতিঝিল থেকে কমলাপুর অংশের ট্রায়াল রান।',
    content: `
      <p class="lead">রাজধানী ঢাকার পরিবহন ব্যবস্থায় এক নতুন দিগন্তের উন্মোচন ঘটিয়ে মতিঝিল থেকে কমলাপুর পর্যন্ত মেট্রোরেল সম্প্রসারণের প্রথম ট্রায়াল রান সফলভাবে সম্পন্ন হয়েছে। সকাল ১০টায় শুরু হওয়া এই পরীক্ষামূলক যাত্রায় কারিগরি দলের সদস্যরা ট্রেনের গতিবেগ, ট্র্যাকে বিদ্যুতায়ন ও সিগন্যালিং সিস্টেম পুঙ্খানুপুঙ্খভাবে পর্যবেক্ষণ করেন।</p>

      <h3>যাত্রীসেবা চালুর চূড়ান্ত প্রস্তুতি</h3>
      <p>ঢাকা ম্যাস ট্রানজিট কোম্পানি লিমিটেডের (ডিএমটিসিএল) ঊর্ধ্বতন কর্মকর্তারা জানিয়েছেন, আগামী মাসের প্রথম সপ্তাহেই এই রুটে নিয়মিত বাণিজ্যিক চলাচল শুরুর লক্ষ্য নির্ধারণ করা হয়েছে। এই অংশটি চালু হলে উত্তরা থেকে সরাসরি কমলাপুর রেলস্টেশনে মাত্র ৩৫ মিনিটে পৌঁছানো সম্ভব হবে, যা প্রতিদিনের কয়েক লাখ যাত্রীর মূল্যবান কর্মঘণ্টা বাঁচিয়ে দেবে।</p>

      <blockquote class="border-l-4 border-rose-600 pl-4 py-2 italic text-slate-700 my-4 bg-slate-50">
        "আমাদের মূল লক্ষ্য ছিল নিরবচ্ছিন্ন ও নিরাপদ যাত্রী পরিবহন নিশ্চিত করা। আজকের ট্রায়াল রানে কোনো কারিগরি ত্রুটি ধরা পড়েনি। এটি নগরবাসীর জন্য এক বিরাট স্বস্তি।"
      </blockquote>

      <h3>পরিবেশবান্ধব ও আধুনিক গণপরিবহন</h3>
      <p>বিশ্বমানের এই গণপরিবহন ব্যবস্থা চালুর ফলে ব্যক্তিগত গাড়ির ব্যবহার লক্ষণীয়ভাবে হ্রাস পাবে বলে আশা করা হচ্ছে। ফলে রাজধানীর বাতাসে কার্বন নিঃসরণ কমে পরিবেশের ওপর ইতিবাচক প্রভাব পড়বে। স্টেশনে যাত্রীদের ওঠানামা সহজ করতে পর্যাপ্ত এস্কেলেটর, লিফট এবং বিশেষ চাহিদাসম্পন্ন ব্যক্তিদের জন্য ব্রেইল পথ নির্দেশিকা যুক্ত করা হয়েছে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'মেট্রোরেলের ট্র্যাকে সফলভাবে অনুষ্ঠিত প্রথম পরীক্ষামূলক যাত্রা। ছবি: ওপেন ব্রেফ',
    category_id: 'cat-1',
    author_id: 'auth-1',
    status: 'published',
    is_featured: true,
    is_breaking: true,
    views: 4850,
    published_at: '2026-09-07T08:30:00Z',
    updated_at: '2026-09-07T09:15:00Z',
    created_at: '2026-09-07T08:00:00Z',
    seo_title: 'মেট্রোরেলের নতুন রুটে পরীক্ষামূলক চলাচল শুরু | ওপেন ব্রেফ',
    seo_description: 'মতিঝিল থেকে কমলাপুর অংশের ট্রায়াল রান সফল। রাজধানী ঢাকার যোগাযোগ ব্যবস্থায় আধুনিক সংযোজন।',
    seo_keywords: 'মেট্রোরেল, ঢাকা, পরিবহন, যোগাযোগ, বাংলাদেশ',
    tags: ['মেট্রোরেল', 'ঢাকা', 'যোগাযোগ ব্যবস্থা', 'জাতীয়'],
  },
  {
    id: 'art-2',
    title: 'রপ্তানি আয়ে নতুন রেকর্ড: তথ্যপ্রযুক্তি খাতে প্রবৃদ্ধি পৌঁছেছে ১৮ শতাংশে',
    slug: 'export-earnings-record-tech-sector-growth',
    excerpt: 'বিশ্ববাজারে বাংলাদেশি সফটওয়্যার ও আইটি এনাবল্ড সার্ভিসের চাহিদা বৃদ্ধি। বৈদেশিক মুদ্রার রিজার্ভে ইতিবাচক প্রভাব।',
    content: `
      <p>চলতি অর্থবছরে বাংলাদেশের সামগ্রিক রপ্তানি আয়ে অভূতপূর্ব প্রবৃদ্ধি অর্জিত হয়েছে। বিশেষ করে তথ্যপ্রযুক্তি (আইটি) ও সফটওয়্যার খাত একাই ১৮.৪ শতাংশ প্রবৃদ্ধি নিয়ে শীর্ষ অবস্থানে জায়গা করে নিয়েছে। রপ্তানি উন্নয়ন ব্যুরোর (ইপিবি) সাম্প্রতিক পরিসংখ্যান অনুযায়ী, ইউরোপ ও উত্তর আমেরিকার বাজারে বাংলাদেশি প্রকৌশলীদের তৈরি এআই সলিউশনের চাহিদা দ্রুত বৃদ্ধি পাচ্ছে।</p>

      <h3>ফ্রিল্যান্সার ও স্টার্টআপদের ভূমিকা</h3>
      <p>দেশের প্রত্যন্ত অঞ্চলের দক্ষ তরুণ ফ্রিল্যান্সার এবং উদীয়মান টেক-স্টার্টআপগুলো আন্তর্জাতিক আউটসোর্সিং প্ল্যাটফর্মে উল্লেখযোগ্য ডলার আয় করে দেশে রেমিট্যান্স হিসেবে পাঠাচ্ছেন। সরকারি স্তরে কর অব্যাহতি এবং হাই-টেক পার্কগুলোতে নিরবচ্ছিন্ন বিদ্যুৎ ও ব্রডব্যান্ড সুবিধা এই সাফল্যের পেছনে অন্যতম নিয়ামক হিসেবে কাজ করেছে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'সফটওয়্যার উন্নয়নকারী প্রতিষ্ঠানের কার্যপরিবেশ। ছবি: সংগৃহীত',
    category_id: 'cat-4',
    author_id: 'auth-2',
    status: 'published',
    is_featured: true,
    is_breaking: false,
    views: 3240,
    published_at: '2026-09-07T07:15:00Z',
    updated_at: '2026-09-07T07:15:00Z',
    created_at: '2026-09-07T07:00:00Z',
    tags: ['অর্থনীতি', 'আইটি', 'রপ্তানি', 'প্রযুক্তি'],
  },
  {
    id: 'art-3',
    title: 'আন্তর্জাতিক জলবায়ু সম্মেলনে উন্নয়নশীল দেশগুলোর জন্য নতুন ক্ষতিপূরণ তহবিল গঠিত',
    slug: 'cop-climate-summit-loss-damage-fund-approved',
    excerpt: 'জলবায়ু পরিবর্তনের ঝুঁকিতে থাকা উপকূলীয় অঞ্চলের সুরক্ষায় ৫০ বিলিয়ন ডলারের আন্তর্জাতিক সহায়তা তহবিল অনুমোদন।',
    content: `
      <p>দীর্ঘ দরকষাকষির পর ঐতিহাসিক সমঝোতায় পৌঁছেছে বিশ্ব জলবায়ু সম্মেলন। জলবায়ু পরিবর্তনের ফলে ক্ষতিগ্রস্ত বাংলাদেশসহ দ্বীপরাষ্ট্র ও উপকূলীয় দেশগুলোর জন্য গঠিত 'লস অ্যান্ড ড্যামেজ ফান্ড'-এ প্রাথমিক পর্যায়ে ৫০ বিলিয়ন ডলার ছাড়ের প্রতিশ্রুতি দিয়েছে উন্নত দেশগুলো।</p>
      <p>সম্মেলনে বাংলাদেশের প্রতিনিধিদল কার্যকর যুক্তি তুলে ধরে বলেন, কার্বন নিঃসরণে নগণ্য ভূমিকা থাকা সত্ত্বেও প্রাকৃতিক দুর্যোগের ক্ষয়ক্ষতি বহনে উন্নয়নশীল দেশগুলোকে যে অতিরিক্ত আর্থিক চাপ নিতে হয়, তার ন্যায্য ক্ষতিপূরণ অবিলম্বে নিশ্চিত করতে হবে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'জলবায়ু সম্মেলনে প্রতিনিধিদলের গুরুত্বপূর্ণ অধিবেশন। ছবি: রয়টার্স',
    category_id: 'cat-3',
    author_id: 'auth-1',
    status: 'published',
    is_featured: true,
    is_breaking: false,
    views: 2890,
    published_at: '2026-09-06T19:30:00Z',
    updated_at: '2026-09-06T20:00:00Z',
    created_at: '2026-09-06T19:00:00Z',
    tags: ['আন্তর্জাতিক', 'জলবায়ু', 'পরিবেশ'],
  },
  {
    id: 'art-4',
    title: 'নতুন প্রজন্মের এআই চিপ আনল গ্লোবাল টেক জায়ান্ট, ডেটাসেন্টারের শক্তি খরচ কমবে ৬০%',
    slug: 'next-gen-ai-chip-cuts-power-consumption',
    excerpt: 'কৃত্রিম বুদ্ধিমত্তা মডেল প্রশিক্ষণে বিপ্লব। ক্ষুদ্রাতিক্ষুদ্র ২ ন্যানোমিটার আর্কিটেকচারে সর্বোচ্চ প্রক্রিয়াকরণ ক্ষমতা।',
    content: `
      <p>কৃত্রিম বুদ্ধিমত্তার ক্রমবর্ধমান চাহিদার সঙ্গে তাল মেলাতে ডেটাসেন্টারের জ্বালানি ব্যয় যখন বিশ্বজুড়ে প্রধান উদ্বেগের কারণ হয়ে দাঁড়িয়েছিল, ঠিক তখনই উন্মোচিত হলো যুগান্তকারী ২-ন্যানোমিটার এআই প্রসেসর। নতুন এই চিপ প্রচলিত জিপিইউ-এর তুলনায় তিন গুণ দ্রুত কাজ সম্পন্ন করতে পারে, অথচ বিদ্যুতের অপচয় কমিয়ে আনে প্রায় ৬০ শতাংশ পর্যন্ত।</p>
      <p>প্রযুক্তি বিশ্লেষকদের মতে, স্বাস্থ্যসেবায় জটিল রোগ নির্ণয় এবং স্বচালিত যানবাহনের রিয়েল-টাইম সিদ্ধান্ত গ্রহণের ক্ষেত্রে এই চিপের ভূমিকা হবে যুগান্তকারী।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'উন্নত সেমিকন্ডাক্টর সিলিকন ওয়েফার প্রযুক্তি। ছবি: আনস্প্ল্যাশ',
    category_id: 'cat-6',
    author_id: 'auth-3',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 4120,
    published_at: '2026-09-06T15:45:00Z',
    updated_at: '2026-09-06T15:45:00Z',
    created_at: '2026-09-06T15:30:00Z',
    tags: ['প্রযুক্তি', 'এআই', 'চিপ', 'উদ্ভাবন'],
  },
  {
    id: 'art-5',
    title: 'এশিয়া কাপের রোমাঞ্চকর ফাইনালে শেষ ওভারের নাটকীয়তায় বাংলাদেশের ঐতিহাসিক জয়',
    slug: 'asia-cup-thrilling-final-bangladesh-victory',
    excerpt: 'মিরপুর শেরেবাংলা স্টেডিয়ামে উল্লাসের জোয়ার। তরুণ পেসারের শেষ দুই বলে দুই উইকেটে নিশ্চিত হলো শিরোপা।',
    content: `
      <p>শ্বাসরুদ্ধকর শেষ ওভারের পর কোটি সমর্থককে আনন্দের অশ্রুতে ভাসিয়ে মহাদেশীয় শ্রেষ্ঠত্বের মুকুট মাথায় পরল বাংলাদেশ ক্রিকেট দল। টানটান উত্তেজনার ম্যাচে শেষ ওভারে জয়ের জন্য প্রতিপক্ষের দরকার ছিল ৮ রান। অধিনায়কের আস্থার প্রতিদান দিয়ে প্রতিভাবান পেসার দুর্দান্ত ইয়র্কার ডেলিভারিতে পরপর দুই উইকেট তুলে নিয়ে মাঠজুড়ে গর্জন তুললেন।</p>
      <p>ম্যান অব দ্য ম্যাচ নির্বাচিত হওয়া সাকিবুল হাসান বলেন, "আমরা শুরু থেকেই দলীয় চেতনায় বিশ্বাস রেখেছিলাম। দর্শকদের এই অপার্থিব সমর্থনই আমাদের শেষ বল পর্যন্ত লড়ে যাওয়ার সাহস জুগিয়েছে।"</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'বিজয়ের মুহূর্তে উল্লাসিত খেলোয়াড়রা। ছবি: ওপেন ব্রেফ স্পোর্টস',
    category_id: 'cat-7',
    author_id: 'auth-1',
    status: 'published',
    is_featured: true,
    is_breaking: true,
    views: 8930,
    published_at: '2026-09-06T14:10:00Z',
    updated_at: '2026-09-06T16:00:00Z',
    created_at: '2026-09-06T14:00:00Z',
    tags: ['খেলাধুলা', 'ক্রিকেট', 'এশিয়া কাপ', 'বাংলাদেশ'],
  },
  {
    id: 'art-6',
    title: 'সারাদেশে সার্বজনীন স্বাস্থ্যকার্ড প্রকল্পের আওতায় আসছে আড়াই কোটি পরিবার',
    slug: 'universal-health-card-project-expanded',
    excerpt: 'সরকারি ও নিবন্ধিত বেসরকারি হাসপাতালে জরুরি চিকিৎসার ক্যাশলেস সুবিধা। প্রথম ধাপে প্রত্যন্ত অঞ্চলের সুবিধাবঞ্চিতরা অগ্রাধিকার।',
    content: `
      <p>নাগরিকদের চিকিৎসার ব্যয়ভার লাঘব করতে সরকার দেশব্যাপী সার্বজনীন ডিজিটাল স্বাস্থ্যকার্ড বিতরণ কার্যক্রম সম্প্রসারণের ঘোষণা দিয়েছে। এই প্রকল্পের অধীনে প্রতিটি নিবন্ধিত পরিবার বাৎসরিক নির্দিষ্ট অংকের চিকিৎসা সুবিধা পাবেন, যার মাধ্যমে তারা ওষুধ ও অস্ত্রোপচারের খরচ সরাসরি মেটাতে পারবেন।</p>
      <p>স্বাস্থ্য মন্ত্রণালয় সূত্রে জানা গেছে, প্রান্তিক জনগোষ্ঠীর মানুষ যাতে জটিল ব্যাধির চিকিৎসার অভাবে অর্থকষ্টে না ভোগে, সেজন্য সম্পূর্ণ স্বচ্ছ ডাটাবেজের মাধ্যমে এই কার্ড প্রস্তুত করা হয়েছে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'আধুনিক হাসপাতালে চিকিৎসাসেবার চিত্র। ছবি: ওপেন ব্রেফ',
    category_id: 'cat-12',
    author_id: 'auth-4',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 1940,
    published_at: '2026-09-06T11:00:00Z',
    updated_at: '2026-09-06T11:00:00Z',
    created_at: '2026-09-06T10:30:00Z',
    tags: ['স্বাস্থ্য', 'চিকিৎসা', 'জাতীয়'],
  },
  {
    id: 'art-7',
    title: 'জাতীয় শিক্ষাক্রম পরিমার্জন: কারিগরি ও ব্যবহারিক শিক্ষায় বিশেষ জোর',
    slug: 'national-curriculum-reforms-practical-education',
    excerpt: 'মাধ্যমিক স্তরে কোডিং, আধুনিক কৃষি ও রোবোটিক্স ল্যাব বাধ্যতামূলক করার প্রস্তাব গৃহীত। কর্মমুখী শিক্ষায় নতুন দৃষ্টিভঙ্গি।',
    content: `
      <p>শিক্ষার্থীদের একবিংশ শতাব্দীর চ্যালেঞ্জের জন্য তৈরি করতে জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি) নতুন রূপরেখা চূড়ান্ত করেছে। এখন থেকে শুধুমাত্র মুখস্থবিদ্যার ওপর নির্ভর না করে প্রতিটি বিদ্যালয়ে আধুনিক কম্পিউটার ল্যাব ও ব্যবহারিক কারিগরি প্রশিক্ষণ নিশ্চিত করা হবে।</p>
      <p>শিক্ষাবিদরা এই সিদ্ধান্তকে সাধুবাদ জানিয়ে বলেছেন, বাস্তবমুখী দক্ষতার সমন্বয় ঘটলে আমাদের তরুণ সমাজ গ্র্যাজুয়েশনের পর বেকারত্বের অভিশাপ থেকে দ্রুত মুক্তি পাবে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'শ্রেণিকক্ষে প্রজেক্টভিত্তিক শিক্ষারত শিক্ষার্থীরা। ছবি: ওপেন ব্রেফ',
    category_id: 'cat-11',
    author_id: 'auth-4',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 2410,
    published_at: '2026-09-06T09:20:00Z',
    updated_at: '2026-09-06T09:20:00Z',
    created_at: '2026-09-06T09:00:00Z',
    tags: ['শিক্ষা', 'ক্যাম্পাস', 'কারিগরি'],
  },
  {
    id: 'art-8',
    title: 'কান চলচ্চিত্র উৎসবে প্রশংসিত বাংলাদেশি চলচ্চিত্র \'নদীর গান\', জিতেছে বিশেষ জুরি পুরস্কার',
    slug: 'cannes-film-festival-bangladeshi-movie-special-jury-award',
    excerpt: 'পদ্মার ভাঙনকবলিত মানুষের আত্মিক লড়াই ও লোকজ সংগীতের গভীর চিত্রায়ণ বিশ্বমঞ্চে সমাদৃত। আন্তর্জাতিক সমালোচকদের অকুণ্ঠ প্রশংসা।',
    content: `
      <p>বিশ্ব চলচ্চিত্রের অন্যতম মর্যাদাপূর্ণ উৎসব কান ফিল্ম ফেস্টিভ্যালে লাল-সবুজের পতাকা ওড়ালেন একদল তরুণ নির্মাতা। পদ্মাপাড়ের সাধারণ মাঝিদের জীবনসংগ্রাম ও লোকজ সুরের মেলবন্ধনে নির্মিত পূর্ণদৈর্ঘ্য চলচ্চিত্র 'নদীর গান' আনসার্টেন রিগার্ড বিভাগে বিশেষ জুরি পুরস্কার অর্জন করেছে।</p>
      <p>ছবিটির প্রদর্শন শেষে উপস্থিত দর্শকরা টানা সাত মিনিট দাঁড়িয়ে করতালি দিয়ে অভিবাদন জানান। ছবির পরিচালক বলেন, "আমাদের বাংলার নদী ও গান যে বিশ্বজনীন অনুভূতির ভাষা হতে পারে, আজকের সম্মাননা তারই প্রমাণ।"</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'উৎসবের রেড কার্পেটে চলচ্চিত্রটির শিল্পী ও কলাকুশলীবৃন্দ। ছবি: এএফপি',
    category_id: 'cat-8',
    author_id: 'auth-4',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 3880,
    published_at: '2026-09-05T21:00:00Z',
    updated_at: '2026-09-05T21:00:00Z',
    created_at: '2026-09-05T20:30:00Z',
    tags: ['বিনোদন', 'চলচ্চিত্র', 'কান উৎসব', 'সংস্কৃতি'],
  },
  {
    id: 'art-9',
    title: 'মুদ্রাস্ফীতি নিয়ন্ত্রণে কেন্দ্রীয় ব্যাংকের নতুন মুদ্রানীতি: রেপো রেট অপরিবর্তিত',
    slug: 'central-bank-monetary-policy-repo-rate-inflation',
    excerpt: 'বাজারের তারল্য সরবরাহ ও নিত্যপণ্যের দামের ভারসাম্য রক্ষায় সতর্ক অবস্থান। কৃষি ও ক্ষুদ্র উদ্যোক্তা ঋণে সহজ শর্ত।',
    content: `
      <p>বাংলাদেশ ব্যাংক পরবর্তী প্রান্তিকের জন্য নতুন মুদ্রানীতি ঘোষণা করেছে। সামগ্রিক অর্থনৈতিক স্থিতিশীলতা বজায় রাখা এবং নিত্যপ্রয়োজনীয় পণ্যের মূল্যস্ফীতি এক অঙ্কের ঘরে নামিয়ে আনার প্রত্যয় ব্যক্ত করে রেপো রেট অপরিবর্তিত রাখার সিদ্ধান্ত গৃহীত হয়েছে।</p>
      <p>একই সাথে গ্রামীণ অর্থনীতিকে বেগবান করতে নারী উদ্যোক্তা ও স্মার্ট কৃষিক্ষেত্রে স্বল্প সুদে সহজ শর্তে বিশেষ পুনঃঅর্থায়ন তহবিল চালু রাখার নির্দেশনা দেওয়া হয়েছে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'বাংলাদেশ ব্যাংকের গভর্নর সংবাদ সম্মেলনে বক্তব্য রাখছেন। ছবি: ওপেন ব্রেফ',
    category_id: 'cat-4',
    author_id: 'auth-2',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 1720,
    published_at: '2026-09-05T14:40:00Z',
    updated_at: '2026-09-05T14:40:00Z',
    created_at: '2026-09-05T14:00:00Z',
    tags: ['অর্থনীতি', 'মুদ্রানীতি', 'ব্যাংক', 'ব্যবসা'],
  },
  {
    id: 'art-10',
    title: 'নির্বাচনী রোডম্যাপ ও রাজনৈতিক সংস্কার নিয়ে গোলটেবিল বৈঠক অনুষ্ঠিত',
    slug: 'political-reform-election-roadmap-roundtable',
    excerpt: 'সুশীল সমাজ, রাজনীতিবিদ ও রাষ্ট্রবিজ্ঞানীদের যৌথ সংলাপে অবাধ, অংশগ্রহণমূলক ও গ্রহণযোগ্য ভোটের পদ্ধতি নিয়ে আলোচনা।',
    content: `
      <p>রাজধানীর একটি অভিজাত মিলনায়তনে দেশের শীর্ষস্থানীয় রাষ্ট্রবিজ্ঞানী, আইনজীবী ও রাজনৈতিক প্রতিনিধিদের অংশগ্রহণে 'ভবিষ্যৎ বাংলাদেশের গণতান্ত্রিক রূপরেখা ও নির্বাচনী সংস্কার' শীর্ষক এক জাতীয় সংলাপ অনুষ্ঠিত হয়েছে।</p>
      <p>আলোচকরা একমত পোষণ করেন যে, আইনের শাসন সুসংহত করা এবং নির্বাচন কমিশনকে সম্পূর্ণ স্বাধীন ও দলনিরপেক্ষ ক্ষমতার অধিকারী করার মাধ্যমেই কেবল টেকসই গণতান্ত্রিক প্রতিষ্ঠান গড়ে তোলা সম্ভব।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'সংলাপে মতামত প্রকাশ করছেন অতিথিবৃন্দ। ছবি: ওপেন ব্রেফ',
    category_id: 'cat-2',
    author_id: 'auth-1',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 2950,
    published_at: '2026-09-05T12:00:00Z',
    updated_at: '2026-09-05T12:00:00Z',
    created_at: '2026-09-05T11:30:00Z',
    tags: ['রাজনীতি', 'গণতন্ত্র', 'জাতীয়', 'সংস্কার'],
  },
  {
    id: 'art-11',
    title: 'সুন্দরবনের জীববৈচিত্র্য রক্ষায় স্মার্ট পেট্রোলিং ও স্যাটেলাইট নজরদারি জোরদার',
    slug: 'sundarbans-wildlife-protection-smart-patrolling',
    excerpt: 'রয়্যাল বেঙ্গল টাইগার ও ম্যানগ্রোভ বনাঞ্চল রক্ষায় কৃত্রিম বুদ্ধিমত্তা চালিত ক্যামেরা ট্র্যাপিং ও ড্রোনের ব্যবহার শুরু।',
    content: `
      <p>ইউনেস্কো ঘোষিত ওয়ার্ল্ড হেরিটেজ সাইট সুন্দরবনের অমূল্য সম্পদ রক্ষায় বন বিভাগ আধুনিক প্রযুক্তির সমন্বয় ঘটিয়েছে। নদীপথের চোরশিকারি ও কাঠপাচার রোধে সার্বক্ষণিক ড্রোন মনিটরিং এবং এআই ক্যামেরা ট্র্যাপিং ব্যবস্থা কার্যকর করা হয়েছে।</p>
      <p>প্রধান বন সংরক্ষক জানান, এর ফলে বাঘের বিচরণের সঠিক তথ্য পাওয়ার পাশাপাশি বনের অভ্যন্তরীণ বাস্তুসংস্থান অক্ষুণ্ণ রাখা অনেক সহজ হবে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'সুন্দরবনের ঘন ম্যানগ্রোভ বনাঞ্চলে বাঘের উপস্থিতি। ছবি: ওয়াইল্ডলাইফ ট্রাস্ট',
    category_id: 'cat-9',
    author_id: 'auth-1',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 1890,
    published_at: '2026-09-04T18:00:00Z',
    updated_at: '2026-09-04T18:00:00Z',
    created_at: '2026-09-04T17:30:00Z',
    tags: ['সারাদেশ', 'সুন্দরবন', 'পরিবেশ', 'বন্যপ্রাণী'],
  },
  {
    id: 'art-12',
    title: 'বিশেষ কলাম: চতুর্থ শিল্পবিপ্লবের সন্ধিক্ষণে বাংলাদেশের প্রস্তুতি কতটুকু?',
    slug: 'opinion-fourth-industrial-revolution-bangladesh-readiness',
    excerpt: 'রোবোটিক্স ও অটোমেশনের যুগে জনমিতিক লভ্যাংশকে সম্পদে পরিণত করতে হলে শিক্ষা ও গবেষণায় অবিলম্বে বাজেট বরাদ্দ বাড়াতে হবে।',
    content: `
      <p>আমরা যখন ২০২৬ সালে দাঁড়িয়ে ভবিষ্যৎ বাংলাদেশের অর্থনীতির রূপরেখা নিয়ে স্বপ্ন দেখি, তখন বিশ্বমঞ্চে শ্রমবাজারের সংজ্ঞা নাটকীয়ভাবে বদলে যাচ্ছে। সাধারণ শারীরিক শ্রমের কাজগুলো দ্রুত রোবট ও অ্যালগরিদমের দখলে চলে যাচ্ছে।</p>
      <p>এই বাস্তবতায় আমাদের জনসংখ্যাকে বোঝায় রূপান্তর না করে দক্ষ জনসম্পদে পরিণত করতে হবে। প্রতিটি বিশ্ববিদ্যালয়ে গবেষণা ও উন্নয়ন (R&D) খাতে ন্যূনতম জাতীয় আয়ের ২ শতাংশ বিনিয়োগ করা এখন সময়ের দাবি।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'ডিজিটাল কানেক্টিভিটি ও ভবিষ্যতের পৃথিবী। ছবি: সংগৃহীত',
    category_id: 'cat-13',
    author_id: 'auth-2',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 2210,
    published_at: '2026-09-04T11:30:00Z',
    updated_at: '2026-09-04T11:30:00Z',
    created_at: '2026-09-04T11:00:00Z',
    tags: ['মতামত', 'কলাম', 'অর্থনীতি', 'শিক্ষা'],
  },
  {
    id: 'art-13',
    title: 'ভিডিও রিপোর্ট: ঢাকা-চট্টগ্রাম রুটে বুলেট ট্রেনের সম্ভাব্যতা সমীক্ষা চূড়ান্ত',
    slug: 'video-dhaka-chittagong-high-speed-bullet-train-study',
    excerpt: 'ঘণ্টায় ২৫০ কিমি গতিতে মাত্র ৫০ মিনিটে বাণিজ্যিক রাজধানীতে পৌঁছানোর মেগাপ্রকল্প নিয়ে বিশেষ ভিজ্যুয়াল প্রতিবেদন।',
    content: `
      <p>রেলওয়ের যুগান্তকারী রূপান্তরের অংশ হিসেবে ঢাকা ও বন্দরনগরী চট্টগ্রামের মধ্যে দ্রুতগতির হাই-স্পিড বুলেট ট্রেন চালুর সমীক্ষা প্রতিবেদন রেল মন্ত্রণালয়ে জমা পড়েছে। প্রকল্পটি বাস্তবায়িত হলে দেশের যোগাযোগ ব্যবস্থার গতিশীলতা কয়েক গুণ বৃদ্ধি পাবে।</p>
      <div class="my-6 aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center text-white relative group cursor-pointer shadow-lg">
        <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&auto=format&fit=crop&q=80" alt="Bullet train" class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-300" />
        <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <div class="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-white ml-1 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <span class="mt-3 text-sm font-semibold tracking-wide bg-black/60 px-3 py-1 rounded">ভিডিও প্রতিবেদনটি দেখুন</span>
        </div>
      </div>
      <p>অর্থনীতিবিদদের অভিমত, এই করিডোরটি চালু হলে তৈরি পোশাক খাতসহ আন্তর্জাতিক বাণিজ্যের সাপ্লাই চেইন খরচ এক-তৃতীয়াংশে নেমে আসবে।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'হাইস্পিড ট্রেনের আধুনিক নকশা। ভিডিও সৌজন্য: ওপেন ব্রেফ ইনভেস্টিগেশন',
    category_id: 'cat-14',
    author_id: 'auth-3',
    status: 'published',
    is_featured: true,
    is_breaking: false,
    views: 6540,
    published_at: '2026-09-04T09:00:00Z',
    updated_at: '2026-09-04T09:00:00Z',
    created_at: '2026-09-04T08:30:00Z',
    tags: ['ভিডিও', 'যোগাযোগ', 'জাতীয়', 'রেলওয়ে'],
  },
  {
    id: 'art-14',
    title: 'ভ্রমণপিপাসুদের জন্য নতুন গন্তব্য: মেঘের দেশে সাজেক ভ্যালির নৈসর্গিক রূপ',
    slug: 'lifestyle-travel-sajek-valley-nature-guide',
    excerpt: 'পাহাড় আর মেঘের লুকোচুরি। ব্যস্ত নাগরিক জীবন থেকে ক্ষণিক অবসরে প্রকৃতির কোলে নিজেকে সঁপে দেওয়ার আদ্যোপান্ত গাইড।',
    content: `
      <p>পাহাড়ের বাঁকে বাঁকে সাদা মেঘের ভেলা আর সবুজ উপত্যকা—এই নিয়েই সাজেক ভ্যালি। সমুদ্রপৃষ্ঠ থেকে প্রায় ১৮০০ ফুট উঁচুতে অবস্থিত এই উপত্যকাকে বলা হয় মেঘের রাজ্য। বর্ষা আর শরতের শুরুতে সাজেকের রূপ যেন প্রতিদিন নতুন রঙে আবির্ভূত হয়।</p>
      <p>কটেজের বারান্দায় বসে গরম চায়ের কাপে চুমুক দিতে দিতে ভেসে আসা মেঘ ছোঁয়ার অনুভূতি যেকোনো পর্যটকের ক্লান্তি দূর করে দেয় নিমেষেই।</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'সাজেকের সবুজ পাহাড়ের বুকে সাদা মেঘের মিতালী। ছবি: ওপেন ব্রেফ ট্রাভেল',
    category_id: 'cat-10',
    author_id: 'auth-4',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 3120,
    published_at: '2026-09-03T16:00:00Z',
    updated_at: '2026-09-03T16:00:00Z',
    created_at: '2026-09-03T15:30:00Z',
    tags: ['জীবনযাপন', 'ভ্রমণ', 'সাজেক', 'প্রকৃতি'],
  },
  {
    id: 'art-15',
    title: 'স্বল্পমূল্যে স্মার্ট কৃষি যন্ত্রপাতি: বদলে যাচ্ছে গ্রামীণ কৃষকদের জীবনমান',
    slug: 'business-agriculture-smart-machinery-farmers',
    excerpt: 'ধান রোপণ থেকে ফসল কাটা—আধুনিক কম্বাইন হারভেস্টার ব্যবহারে উৎপাদন ব্যয় কমেছে ৪০ শতাংশ। কৃষি খাতে উদ্যোক্তাদের নতুন বিপ্লব।',
    content: `
      <p>কৃষিপ্রধান বাংলাদেশে চিরাচরিত চাষাবাদের ধারণা দ্রুত বদলে যাচ্ছে। স্থানীয় প্রকৌশলী ও আন্তর্জাতিক প্রযুক্তি অংশীদারদের সহায়তায় নির্মিত স্বল্পমূল্যের মিনি পাওয়ার টিলার ও সৌরচালিত সেচ পাম্প এখন কৃষকের বিশ্বস্ত হাতিয়ার।</p>
      <p>বগুড়ার শেরপুরের এক কৃষক জানান, "আগে যেখানে পুরো জমির ধান কাটতে দশজন দিনমজুরের তিন দিন লাগত, এখন মাত্র কয়েক ঘণ্টার মধ্যে হারভেস্টার দিয়ে সব কাজ শেষ হয়ে যাচ্ছে। ফলে হঠাৎ ঝড়বৃষ্টিতে ফসলহানির ভয় আর থাকে না।"</p>
    `,
    featured_image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&auto=format&fit=crop&q=80',
    image_caption: 'মাঠে কম্বাইন হারভেস্টার দিয়ে ধান কাটার দৃশ্য। ছবি: ওপেন ব্রেফ',
    category_id: 'cat-5',
    author_id: 'auth-2',
    status: 'published',
    is_featured: false,
    is_breaking: false,
    views: 2050,
    published_at: '2026-09-03T10:00:00Z',
    updated_at: '2026-09-03T10:00:00Z',
    created_at: '2026-09-03T09:30:00Z',
    tags: ['ব্যবসা', 'কৃষি', 'গ্রামীন অর্থনীতি', 'উদ্ভাবন'],
  },
];

export const initialBreakingNews: BreakingNews[] = [
  {
    id: 'brk-1',
    headline: 'মেট্রোরেলের মতিঝিল-কমলাপুর অংশে সফলভাবে প্রথম ট্রায়াল রান সম্পন্ন',
    url: '/news/metro-rail-new-route-test-run-dhaka',
    priority: 1,
    is_active: true,
    created_at: '2026-09-07T08:30:00Z',
  },
  {
    id: 'brk-2',
    headline: 'এশিয়া কাপের ফাইনালে রোমাঞ্চকর শেষ ওভারে বাংলাদেশের শিরোপা জয়',
    url: '/news/asia-cup-thrilling-final-bangladesh-victory',
    priority: 2,
    is_active: true,
    created_at: '2026-09-06T15:00:00Z',
  },
  {
    id: 'brk-3',
    headline: 'সারাদেশে সার্বজনীন ডিজিটাল স্বাস্থ্যকার্ড বিতরণ কার্যক্রম শুরু',
    url: '/news/universal-health-card-project-expanded',
    priority: 3,
    is_active: true,
    created_at: '2026-09-06T11:00:00Z',
  },
  {
    id: 'brk-4',
    headline: 'জলবায়ু সম্মেলনে উন্নয়নশীল দেশগুলোর জন্য ৫০ বিলিয়ন ডলারের তহবিল গঠিত',
    url: '/news/cop-climate-summit-loss-damage-fund-approved',
    priority: 4,
    is_active: true,
    created_at: '2026-09-06T19:30:00Z',
  },
];

export const initialAdvertisements: Advertisement[] = [
  {
    id: 'ad-header',
    name: 'শীর্ষ ব্যানার বিজ্ঞাপন (Adsterra 728x90 Leaderboard)',
    ad_type: 'banner',
    placement: 'header',
    status: 'active',
    ad_code: `
      <div style="background: linear-gradient(90deg, #1e293b, #0f172a); color: #fff; padding: 12px 20px; text-align: center; border-radius: 6px; border: 1px solid #334155; font-family: sans-serif;">
        <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin-bottom: 2px;">বিজ্ঞাপন • ADVERTISEMENT</div>
        <div style="font-size: 15px; font-weight: bold; color: #fbbf24;">বাংলাদেশে প্রথম এআই ক্লাউড হোস্টিং সেবা — ৫০% বিশেষ ছাড়!</div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 2px;">কুপন কোড: <span style="background: #e11d48; padding: 2px 6px; border-radius: 3px; font-weight: bold; color: white;">OPEN50</span></div>
      </div>
    `,
    created_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'ad-sidebar',
    name: 'সাইডবার বিজ্ঞাপন (Adsterra 300x250 Rectangle)',
    ad_type: 'banner',
    placement: 'sidebar',
    status: 'active',
    ad_code: `
      <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 18px; text-align: center;">
        <span style="font-size: 10px; background: #e2e8f0; color: #475569; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">স্পন্সরড</span>
        <h4 style="font-size: 16px; font-weight: bold; margin: 10px 0 6px 0; color: #0f172a;">অনলাইনে ঘরে বসেই শিখুন প্রফেশনাল ফ্রিল্যান্সিং</h4>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; line-height: 1.5;">আন্তর্জাতিক ক্লায়েন্টদের সাথে কাজের বাস্তব অভিজ্ঞতা ও লাইভ মেন্টরশিপ।</p>
        <a href="#" style="display: inline-block; background: #e11d48; color: #fff; font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 4px; text-decoration: none;">রেজিস্ট্রেশন করুন &rarr;</a>
      </div>
    `,
    created_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'ad-homepage',
    name: 'হোমপেজ মিডল ব্যানার (Adsterra Responsive Strip)',
    ad_type: 'banner',
    placement: 'homepage',
    status: 'active',
    ad_code: `
      <div style="background: linear-gradient(135deg, #be123c, #881337); color: #fff; padding: 16px 24px; border-radius: 8px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
        <div>
          <div style="font-size: 10px; color: #fecdd3; text-transform: uppercase;">বিশেষ অংশীদারিত্ব</div>
          <div style="font-size: 17px; font-weight: bold;">দেশীয় ই-কমার্সে স্মার্ট কেনাকাটার সেরা উৎসব চলছে!</div>
          <div style="font-size: 12px; color: #ffe4e6;">ফ্রি হোম ডেলিভারি ও ক্যাশব্যাক সুবিধা পেতে এখনই ভিজিট করুন।</div>
        </div>
        <button style="background: #ffffff; color: #be123c; border: none; padding: 10px 20px; font-weight: bold; font-size: 13px; border-radius: 6px; cursor: pointer;">অফার দেখুন</button>
      </div>
    `,
    created_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'ad-article-mid',
    name: 'আর্টিকেল পেজ ইনলাইন ব্যানার',
    ad_type: 'banner',
    placement: 'article_middle',
    status: 'active',
    ad_code: `
      <div style="background: #fff; border: 1px solid #e2e8f0; border-left: 4px solid #e11d48; padding: 14px 18px; border-radius: 6px; margin: 20px 0;">
        <span style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">বিজ্ঞাপন</span>
        <div style="font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 4px;">আপনার প্রতিষ্ঠানের ব্র্যান্ডিং ও ডিজিটাল বিজ্ঞাপনের জন্য যোগাযোগ করুন ওপেন ব্রেফ মার্কেটিং উইং-এ।</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">বিজ্ঞাপন বিভাগ: ads@openbrief.news • হটলাইন: ০৯৬১২-XXXXXX</div>
      </div>
    `,
    created_at: '2026-09-01T00:00:00Z',
  },
];

export const initialSiteSettings: SiteSettings = {
  website_name: 'ওপেন ব্রেফ',
  english_name: 'OPEN BRIEF',
  tagline: 'সত্যের সন্ধানে, খবরের সাথে',
  logo_url: '',
  favicon_url: '',
  contact_email: 'info@openbrief.news',
  phone: '+৮৮০ ১৭০০-০০০০০০',
  address: 'লেভেল ৪, রূপায়ন সেন্টার, কাকরাইল, ঢাকা-১০০০, বাংলাদেশ',
  facebook_url: 'https://facebook.com',
  youtube_url: 'https://youtube.com',
  telegram_url: 'https://t.me',
  x_url: 'https://x.com',
  footer_text: '© ২০২৬ ওপেন ব্রেফ (OPEN BRIEF). সর্বস্বত্ব সংরক্ষিত। অনুমতি ছাড়া এই ওয়েবসাইটের কোনো কনটেন্ট কপি বা পুনঃপ্রকাশ আইনত দণ্ডনীয়।',
  ga_id: 'G-XXXXXXXXXX',
  fb_pixel_id: 'FB-XXXXXXXXXX',
  default_seo_title: 'ওপেন ব্রেফ | OPEN BRIEF - সত্যের সন্ধানে, খবরের সাথে',
  default_seo_description: 'ওপেন ব্রেফ - আধুনিক, বস্তুনিষ্ঠ ও নিরপেক্ষ বাংলা ডিজিটাল নিউজ পোর্টাল। জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি ও খেলাধুলার তাজা খবর।',
  default_og_image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
};

export const initialStaticPages: StaticPage[] = [
  {
    slug: 'about',
    title: 'আমাদের সম্পর্কে (About Us)',
    content: `
      <h2>ওপেন ব্রেফ (OPEN BRIEF) — সত্যের সন্ধানে, খবরের সাথে</h2>
      <p class="lead">ওপেন ব্রেফ একটি আধুনিক, নিরপেক্ষ ও সাহসী বাংলা ডিজিটাল সংবাদ মাধ্যম। ২০২৬ সালে একদল উদ্যমী পেশাদার সাংবাদিক, প্রযুক্তিবিদ ও বিশ্লেষকের হাত ধরে এর যাত্রা শুরু হয়।</p>
      
      <h3>আমাদের অঙ্গীকার</h3>
      <p>আমরা বিশ্বাস করি সাংবাদিকতার মূল ভিত্তি হলো সত্য ও নিরপেক্ষতা। গুজব ও ভুল তথ্যের ভিড়ে নির্ভুল তথ্য দ্রুত পাঠকের কাছে পৌঁছে দেওয়াই আমাদের প্রধান লক্ষ্য। আমরা কোনো দল, গোষ্ঠী বা করপোরেট স্বার্থের কাছে দায়বদ্ধ নই; আমাদের একমাত্র দায়বদ্ধতা পাঠক ও সত্যের প্রতি।</p>

      <h3>সম্পাদকীয় নীতিমালা</h3>
      <ul>
        <li><strong>তথ্য যাচাই:</strong> যে কোনো সংবাদ প্রকাশের পূর্বে ন্যূনতম দুটি নির্ভরযোগ্য উৎস থেকে যাচাই করা হয়।</li>
        <li><strong>বস্তুনিষ্ঠতা:</strong> ব্যক্তিগত মত ও সংবাদের মূল তথ্যের মধ্যে সুস্পষ্ট বিভাজন বজায় রাখা হয়।</li>
        <li><strong>সততা ও স্বচ্ছতা:</strong> কোনো অনিচ্ছাকৃত ভুলত্রুটি দৃষ্টিগোচর হলে তা অবিলম্বে সংশোধনীসহ স্বীকার করা হয়।</li>
        <li><strong>ভাষা ও ঐতিহ্য:</strong> শুদ্ধ বাংলা বানান ও মার্জিত ভাষা ব্যবহারের প্রতি আমরা অঙ্গীকারাবদ্ধ।</li>
      </ul>
    `,
    updated_at: '2026-09-01T00:00:00Z',
  },
  {
    slug: 'contact',
    title: 'যোগাযোগ (Contact Us)',
    content: `
      <h2>আমাদের সাথে সরাসরি যোগাযোগ করুন</h2>
      <p>সংবাদ টিপস, মতামত, বিজ্ঞাপন কিংবা যে কোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করার জন্য স্বাগত জানানো হচ্ছে।</p>
      
      <h3>বার্তা কক্ষ (Newsroom)</h3>
      <p>ইমেইল: newsroom@openbrief.news<br>ফোন: +৮৮০ ১৭০০-১১২২৩৩</p>

      <h3>বিজ্ঞাপন ও বাণিজ্য</h3>
      <p>ইমেইল: ads@openbrief.news<br>হটলাইন: +৮৮০ ১৭০০-৪৪৫৫৬৬</p>

      <h3>প্রধান কার্যালয়</h3>
      <p>লেভেল ৪, রূপায়ন সেন্টার, কাকরাইল, ঢাকা-১০০০, বাংলাদেশ।</p>
    `,
    updated_at: '2026-09-01T00:00:00Z',
  },
  {
    slug: 'privacy',
    title: 'গোপনীয়তা নীতি (Privacy Policy)',
    content: `
      <h2>গোপনীয়তা নীতি</h2>
      <p>ওপেন ব্রেফ আপনার তথ্যের গোপনীয়তা রক্ষায় সর্বোচ্চ যত্নবান। আমাদের ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি আমাদের এই গোপনীয়তা নীতি মেনে নিচ্ছেন।</p>
      <h3>তথ্য সংগ্রহ</h3>
      <p>আমরা নিউজলেটার সাবস্ক্রিপশন, মন্তব্য প্রদানের ক্ষেত্রে নাম ও ইমেইল ঠিকানা সংরক্ষণ করতে পারি। কোনো অবস্থাতেই এই তথ্য তৃতীয় কোনো পক্ষের কাছে বিক্রি বা হস্তান্তর করা হয় না।</p>
      <h3>কুকি ও অ্যানালিটিক্স</h3>
      <p>ওয়েবসাইট ট্রাফিক পর্যবেক্ষণ এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করার জন্য আমরা গুগল অ্যানালিটিক্স কুকি ব্যবহার করি।</p>
    `,
    updated_at: '2026-09-01T00:00:00Z',
  },
  {
    slug: 'terms',
    title: 'ব্যবহারের শর্তাবলী (Terms & Conditions)',
    content: `
      <h2>ব্যবহারের শর্তাবলী</h2>
      <p>ওপেন ব্রেফ ওয়েবসাইটে প্রকাশিত সকল কনটেন্ট, ছবি, ভিডিও এবং অডিও কপিরাইট আইনের আওতাভুক্ত। যথাযথ ক্রেডিট ও ব্যাকলিংক ব্যতীত এর কোনো অংশ হুবহু নকল বা বাণিজ্যিক উদ্দেশ্যে ব্যবহার সম্পূর্ণ নিষিদ্ধ।</p>
      <h3>মন্তব্যের ক্ষেত্রে নিয়ম</h3>
      <p>পাঠকদের মত প্রকাশের স্বাধীনতাকে আমরা সম্মান করি। তবে আপত্তিকর, অশালীন, ধর্মীয় উসকানিমূলক কিংবা মানহানিকর কোনো মন্তব্য তাৎক্ষণিকভাবে মুছে ফেলা হবে।</p>
    `,
    updated_at: '2026-09-01T00:00:00Z',
  },
  {
    slug: 'disclaimer',
    title: 'দাবিত্যাগ (Disclaimer)',
    content: `
      <h2>দাবিত্যাগ</h2>
      <p>ওপেন ব্রেফ সবসময় বস্তুনিষ্ঠ ও সঠিক তথ্য পরিবেশনে সচেষ্ট। তবে বহিরাগত ওয়েবসাইট লিংক ও বিজ্ঞাপনে প্রদর্শিত পণ্যের মানের ব্যাপারে ওপেন ব্রেফ সরাসরি কোনো দায় বহন করে না।</p>
      <p>উপসম্পাদকীয় ও মতামত বিভাগে প্রকাশিত মতামত লেখকের একান্ত নিজস্ব, যা সম্পাদকীয় বিভাগের মতামতের প্রতিচ্ছবি নাও হতে পারে।</p>
    `,
    updated_at: '2026-09-01T00:00:00Z',
  },
  {
    slug: 'cookie-policy',
    title: 'কুকি নীতি (Cookie Policy)',
    content: `
      <h2>কুকি নীতি</h2>
      <p>আমাদের ওয়েবসাইট নিরবচ্ছিন্নভাবে পরিচালনার সুবিধার্থে এবং সাইট পারফরম্যান্স ট্র্যাক করার জন্য কুকি ব্যবহার করা হয়। আপনি আপনার ব্রাউজার সেটিংস থেকে যেকোনো সময় কুকি নিষ্ক্রিয় করতে পারেন।</p>
    `,
    updated_at: '2026-09-01T00:00:00Z',
  },
];
