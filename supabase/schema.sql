-- ==============================================================================
-- OPEN BRIEF (ওপেন ব্রেফ) - সম্পূর্ণ Supabase ডাটাবেস স্কিমা (Complete SQL Setup)
-- ==============================================================================
-- নির্দেশনা:
-- ১. Supabase ড্যাশবোর্ডে লগইন করে আপনার প্রজেক্টের 'SQL Editor'-এ যান।
-- ২. 'New query' বাটনে ক্লিক করে সম্পূর্ণ নিচের কোডটি পেস্ট করুন।
-- ৩. নিচে ডানে থাকা সবুজ 'Run' (বা Ctrl + Enter) বাটনে ক্লিক করুন।
-- ==============================================================================

-- প্রয়োজনীয় এক্সটেনশন চালু করা
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ১. ক্যাটাগরি বা বিভাগ টেবিল (categories)
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY DEFAULT ('cat-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    order_index INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    show_in_nav BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ২. লেখক / প্রতিবেদক টেবিল (authors)
CREATE TABLE IF NOT EXISTS public.authors (
    id TEXT PRIMARY KEY DEFAULT ('auth-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    name TEXT NOT NULL,
    profile_photo TEXT NOT NULL,
    designation TEXT NOT NULL,
    bio TEXT,
    email TEXT,
    facebook TEXT,
    x TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ৩. সংবাদ / আর্টিকেল টেবিল (articles)
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY DEFAULT ('art-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    image_caption TEXT,
    photographer TEXT,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    author_id TEXT REFERENCES public.authors(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
    is_featured BOOLEAN DEFAULT false,
    is_breaking BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT
);

-- ৪. ব্রেকিং নিউজ টেবিল (breaking_news)
CREATE TABLE IF NOT EXISTS public.breaking_news (
    id TEXT PRIMARY KEY DEFAULT ('brk-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    headline TEXT NOT NULL,
    url TEXT,
    priority INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ৫. বিজ্ঞাপন টেবিল (advertisements)
CREATE TABLE IF NOT EXISTS public.advertisements (
    id TEXT PRIMARY KEY DEFAULT ('ad-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    name TEXT NOT NULL,
    ad_type TEXT NOT NULL,
    ad_code TEXT NOT NULL,
    placement TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ৬. মন্তব্য টেবিল (comments)
CREATE TABLE IF NOT EXISTS public.comments (
    id TEXT PRIMARY KEY DEFAULT ('cmt-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    article_id TEXT REFERENCES public.articles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'approved',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ৭. মিডিয়া লাইব্রেরি টেবিল (media)
CREATE TABLE IF NOT EXISTS public.media (
    id TEXT PRIMARY KEY DEFAULT ('med-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    file_size TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ৮. নিউজলেটার সাবস্ক্রাইবার টেবিল (subscribers)
CREATE TABLE IF NOT EXISTS public.subscribers (
    id TEXT PRIMARY KEY DEFAULT ('sub-' || extract(epoch from now())::bigint::text || '-' || floor(random()*1000)::text),
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ৯. সাইট সেটিংস টেবিল (site_settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    website_name TEXT DEFAULT 'ওপেন ব্রেফ (OPEN BRIEF)',
    site_name TEXT DEFAULT 'ওপেন ব্রেফ (OPEN BRIEF)',
    english_name TEXT DEFAULT 'OPEN BRIEF',
    site_name_en TEXT DEFAULT 'OPEN BRIEF',
    tagline TEXT DEFAULT 'সত্যের সন্ধানে, খবরের সাথে',
    logo_url TEXT,
    favicon_url TEXT,
    contact_email TEXT DEFAULT 'contact@openbrief.news',
    phone TEXT DEFAULT '+৮৮০ ১৭০০-০০০০০০',
    address TEXT DEFAULT 'কাওরান বাজার, ঢাকা-১২১৫, বাংলাদেশ',
    facebook_url TEXT DEFAULT 'https://facebook.com',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    telegram_url TEXT DEFAULT 'https://t.me',
    x_url TEXT DEFAULT 'https://x.com',
    footer_text TEXT DEFAULT '© ২০২৬ ওপেন ব্রেফ (OPEN BRIEF)। সর্বস্বত্ব সংরক্ষিত।',
    ga_id TEXT,
    fb_pixel_id TEXT,
    default_seo_title TEXT,
    default_seo_description TEXT,
    default_og_image TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ১০. স্ট্যাটিক পেজ টেবিল (static_pages)
CREATE TABLE IF NOT EXISTS public.static_pages (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ভিউ গণনার RPC ফাংশন (Views Increment Function)
CREATE OR REPLACE FUNCTION public.increment_article_views(article_id TEXT)
RETURNS void AS $$
BEGIN
    UPDATE public.articles
    SET views = views + 1
    WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==============================================================================
-- RLS (Row Level Security) পলিসি সক্রিয় ও সেটআপ
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.static_pages ENABLE ROW LEVEL SECURITY;

-- সাধারণ দর্শক ও সবার জন্য পড়ার ও ব্যবহারের পারমিশন পলিসি
DO $$
BEGIN
    -- Categories
    DROP POLICY IF EXISTS "Allow public read on categories" ON public.categories;
    CREATE POLICY "Allow public read on categories" ON public.categories FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on categories" ON public.categories;
    CREATE POLICY "Allow all on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

    -- Authors
    DROP POLICY IF EXISTS "Allow public read on authors" ON public.authors;
    CREATE POLICY "Allow public read on authors" ON public.authors FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on authors" ON public.authors;
    CREATE POLICY "Allow all on authors" ON public.authors FOR ALL USING (true) WITH CHECK (true);

    -- Articles
    DROP POLICY IF EXISTS "Allow public read on articles" ON public.articles;
    CREATE POLICY "Allow public read on articles" ON public.articles FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on articles" ON public.articles;
    CREATE POLICY "Allow all on articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);

    -- Breaking News
    DROP POLICY IF EXISTS "Allow public read on breaking_news" ON public.breaking_news;
    CREATE POLICY "Allow public read on breaking_news" ON public.breaking_news FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on breaking_news" ON public.breaking_news;
    CREATE POLICY "Allow all on breaking_news" ON public.breaking_news FOR ALL USING (true) WITH CHECK (true);

    -- Advertisements
    DROP POLICY IF EXISTS "Allow public read on advertisements" ON public.advertisements;
    CREATE POLICY "Allow public read on advertisements" ON public.advertisements FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on advertisements" ON public.advertisements;
    CREATE POLICY "Allow all on advertisements" ON public.advertisements FOR ALL USING (true) WITH CHECK (true);

    -- Comments
    DROP POLICY IF EXISTS "Allow public read on comments" ON public.comments;
    CREATE POLICY "Allow public read on comments" ON public.comments FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow insert on comments" ON public.comments;
    CREATE POLICY "Allow insert on comments" ON public.comments FOR INSERT WITH CHECK (true);
    DROP POLICY IF EXISTS "Allow all on comments" ON public.comments;
    CREATE POLICY "Allow all on comments" ON public.comments FOR ALL USING (true) WITH CHECK (true);

    -- Media
    DROP POLICY IF EXISTS "Allow public read on media" ON public.media;
    CREATE POLICY "Allow public read on media" ON public.media FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on media" ON public.media;
    CREATE POLICY "Allow all on media" ON public.media FOR ALL USING (true) WITH CHECK (true);

    -- Subscribers
    DROP POLICY IF EXISTS "Allow insert on subscribers" ON public.subscribers;
    CREATE POLICY "Allow insert on subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);
    DROP POLICY IF EXISTS "Allow all on subscribers" ON public.subscribers;
    CREATE POLICY "Allow all on subscribers" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);

    -- Site Settings
    DROP POLICY IF EXISTS "Allow public read on site_settings" ON public.site_settings;
    CREATE POLICY "Allow public read on site_settings" ON public.site_settings FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on site_settings" ON public.site_settings;
    CREATE POLICY "Allow all on site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

    -- Static Pages
    DROP POLICY IF EXISTS "Allow public read on static_pages" ON public.static_pages;
    CREATE POLICY "Allow public read on static_pages" ON public.static_pages FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow all on static_pages" ON public.static_pages;
    CREATE POLICY "Allow all on static_pages" ON public.static_pages FOR ALL USING (true) WITH CHECK (true);
END $$;


-- ==============================================================================
-- প্রাথমিক তথ্য ইনসার্ট (Initial Seed Data)
-- ==============================================================================

-- ক্যাটাগরি তথ্য
INSERT INTO public.categories (id, name, slug, description, order_index, is_active, show_in_nav) VALUES
('cat-1', 'জাতীয়', 'national', 'দেশের প্রধান ও গুরুত্বপূর্ণ জাতীয় সংবাদ', 1, true, true),
('cat-2', 'রাজনীতি', 'politics', 'রাজনৈতিক অঙ্গনের সবশেষ ঘটনাপ্রবাহ ও বিশ্লেষণ', 2, true, true),
('cat-3', 'আন্তর্জাতিক', 'international', 'বিশ্বজুড়ে ঘটে যাওয়া আলোচিত সংবাদ', 3, true, true),
('cat-4', 'অর্থনীতি', 'economy', 'বাজারদর, ব্যাংক খাত ও দেশের অর্থনৈতিক গতিবিধি', 4, true, true),
('cat-5', 'ব্যবসা', 'business', 'বাণিজ্য, শিল্পোদ্যোগ ও করপোরেট খবরের হালনাগাদ', 5, true, true),
('cat-6', 'প্রযুক্তি', 'tech', 'বিজ্ঞান, তথ্যপ্রযুক্তি, এআই ও গ্যাজেটের খবর', 6, true, true),
('cat-7', 'খেলাধুলা', 'sports', 'ক্রিকেট, ফুটবলসহ দেশ-বিদেশের মাঠের লড়াই', 7, true, true),
('cat-8', 'বিনোদন', 'entertainment', 'সিনেমা, নাটক, গান ও সংস্কৃতির নানা খবর', 8, true, true),
('cat-9', 'সারাদেশ', 'countrywide', 'গ্রাম-শহরের তৃণমূল মানুষের প্রতিচ্ছবি', 9, true, true),
('cat-10', 'জীবনযাপন', 'lifestyle', 'ফ্যাশন, ভ্রমণ, খাদ্য ও দৈনন্দিন জীবনের পরামর্শ', 10, true, true),
('cat-11', 'শিক্ষা', 'education', 'পরীক্ষা, ক্যাম্পাস, স্কলারশিপ ও উচ্চশিক্ষার আপডেট', 11, true, true),
('cat-12', 'স্বাস্থ্য', 'health', 'চিকিৎসা বিজ্ঞান, রোগ প্রতিরোধ ও সুস্থ থাকার টিপস', 12, true, true)
ON CONFLICT (id) DO NOTHING;

-- লেখক / প্রতিবেদক তথ্য
INSERT INTO public.authors (id, name, profile_photo, designation, bio, email) VALUES
('auth-1', 'তানভীর আহমেদ', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'প্রধান প্রতিবেদক', 'জাতীয় ও আন্তর্জাতিক ভূরাজনীতি বিষয়ে ১৫ বছরের সাংবাদিকতার অভিজ্ঞতা।', 'tanvir@openbrief.news'),
('auth-2', 'নাজনীন সুলতানা', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', 'অর্থনীতি বিষয়ক সম্পাদক', 'ম্যাক্রো-ইকোনমিক্স, ব্যাংকিং রিফর্ম ও বৈদেশিক বাণিজ্য বিশ্লেষক।', 'nazneen@openbrief.news'),
('auth-3', 'মাহমুদুল হাসান', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'প্রযুক্তি ও উদ্ভাবন ইনচার্জ', 'আর্টিফিশিয়াল ইন্টেলিজেন্স ও ক্লাউড কম্পিউটিং নিয়ে নিয়মিত লিখছেন।', 'mahmud@openbrief.news'),
('auth-4', 'ফারহানা ইসলাম', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80', 'বিশেষ প্রতিবেদক (সংস্কৃতি ও শিক্ষা)', 'ঢাকা বিশ্ববিদ্যালয় থেকে গণযোগাযোগ ও সাংবাদিকতায় স্নাতকোত্তর।', 'farhana@openbrief.news')
ON CONFLICT (id) DO NOTHING;

-- সাইট ডিফল্ট সেটিংস
INSERT INTO public.site_settings (id, website_name, site_name, english_name, tagline, contact_email, phone, address, footer_text)
VALUES (
    'default',
    'ওপেন ব্রেফ (OPEN BRIEF)',
    'ওপেন ব্রেফ (OPEN BRIEF)',
    'OPEN BRIEF',
    'সত্যের সন্ধানে, খবরের সাথে',
    'contact@openbrief.news',
    '+৮৮০ ১৭০০-০০০০০০',
    'কাওরান বাজার, ঢাকা-১২১৫, বাংলাদেশ',
    '© ২০২৬ ওপেন ব্রেফ (OPEN BRIEF)। সর্বস্বত্ব সংরক্ষিত।'
) ON CONFLICT (id) DO NOTHING;

-- প্রাথমিক ব্রেকিং নিউজ
INSERT INTO public.breaking_news (id, headline, priority, is_active) VALUES
('brk-1', 'মেট্রোরেলের নতুন রুট উদ্বোধন: মতিঝিল থেকে কমলাপুর অংশে নিয়মিত ট্রেন চলাচল শুরু', 1, true),
('brk-2', 'আন্তর্জাতিক বাজারে জ্বালানি তেলের দাম আরও কমেছে, ইতিবাচক প্রভাবের আশা', 2, true)
ON CONFLICT (id) DO NOTHING;

-- প্রাথমিক ডেমো আর্টিকেল
INSERT INTO public.articles (
    id, title, slug, excerpt, content, featured_image, image_caption, category_id, author_id, status, is_featured, is_breaking, views, published_at
) VALUES (
    'art-1',
    'মেট্রোরেলের নতুন রুটে পরীক্ষামূলক চলাচল শুরু, স্বস্তি ফিরছে রাজধানীর যাতায়াতে',
    'metro-rail-new-route-test-run-dhaka',
    'রাজধানীর যানজট নিরসনে নতুন মাইলফলক। নির্ধারিত সময়ের আগেই সফলভাবে সম্পন্ন হলো মতিঝিল থেকে কমলাপুর অংশের ট্রায়াল রান।',
    '<p class="lead">রাজধানী ঢাকার পরিবহন ব্যবস্থায় এক নতুন দিগন্তের উন্মোচন ঘটিয়ে মতিঝিল থেকে কমলাপুর পর্যন্ত মেট্রোরেল সম্প্রসারণের প্রথম ট্রায়াল রান সফলভাবে সম্পন্ন হয়েছে। সকাল ১০টায় শুরু হওয়া এই পরীক্ষামূলক যাত্রায় কারিগরি দলের সদস্যরা ট্রেনের গতিবেগ, ট্র্যাকে বিদ্যুতায়ন ও সিগন্যালিং সিস্টেম পর্যবেক্ষণ করেন।</p><p>ডিএমটিসিএলের ঊর্ধ্বতন কর্মকর্তারা জানিয়েছেন, আগামী মাসের প্রথম সপ্তাহেই এই রুটে নিয়মিত বাণিজ্যিক চলাচল শুরুর লক্ষ্য নির্ধারণ করা হয়েছে। এই অংশটি চালু হলে উত্তরা থেকে সরাসরি কমলাপুর রেলস্টেশনে মাত্র ৩৫ মিনিটে পৌঁছানো সম্ভব হবে।</p>',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    'মেট্রোরেলের ট্র্যাকে সফলভাবে অনুষ্ঠিত প্রথম পরীক্ষামূলক যাত্রা। ছবি: ওপেন ব্রেফ',
    'cat-1',
    'auth-1',
    'published',
    true,
    true,
    1240,
    now()
) ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- সম্পন্ন! আপনার ডাটাবেস সম্পূর্ণ রেডি।
-- ==============================================================================
