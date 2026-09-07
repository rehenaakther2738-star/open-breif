export type ArticleStatus = 'draft' | 'published' | 'scheduled' | 'archived';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  image_caption?: string;
  photographer?: string;
  category_id: string;
  author_id?: string;
  status: ArticleStatus;
  is_featured: boolean;
  is_breaking: boolean;
  views: number;
  published_at?: string;
  updated_at?: string;
  created_at: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  tags?: string[];
  // Joined fields
  category?: Category;
  author?: Author;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  seo_title?: string;
  seo_description?: string;
  order_index: number;
  is_active: boolean;
  show_in_nav?: boolean;
}

export interface Author {
  id: string;
  name: string;
  profile_photo: string;
  designation: string;
  bio?: string;
  facebook?: string;
  x?: string;
  email?: string;
}

export interface BreakingNews {
  id: string;
  headline: string;
  url?: string;
  priority: number;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
}

export type AdType = 'banner' | 'popunder' | 'social_bar' | 'custom_html' | 'native';
export type AdPlacement = 
  | 'header' 
  | 'homepage' 
  | 'between_articles' 
  | 'article_top' 
  | 'article_middle' 
  | 'sidebar' 
  | 'footer' 
  | 'mobile';

export interface Advertisement {
  id: string;
  name: string;
  ad_type: AdType;
  ad_code: string;
  placement: AdPlacement;
  status: 'active' | 'inactive';
  is_active?: boolean;
  start_date?: string;
  end_date?: string;
  created_at: string;
}

export type CommentStatus = 'pending' | 'approved' | 'hidden' | 'spam' | 'rejected';

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: CommentStatus;
  created_at: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  alt_text?: string;
  caption?: string;
  file_size?: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  name?: string;
  email: string;
  created_at: string;
}

export interface SiteSettings {
  website_name?: string;
  site_name?: string;
  english_name?: string;
  site_name_en?: string;
  tagline: string;
  logo_url?: string;
  favicon_url?: string;
  contact_email: string;
  phone: string;
  address: string;
  facebook_url?: string;
  youtube_url?: string;
  telegram_url?: string;
  x_url?: string;
  footer_text: string;
  ga_id?: string;
  fb_pixel_id?: string;
  default_seo_title?: string;
  default_seo_description?: string;
  default_og_image?: string;
}


export interface StaticPage {
  slug: string;
  title: string;
  content: string;
  updated_at: string;
}

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  scheduledArticles: number;
  totalViews: number;
  todayViews: number;
  categoriesCount: number;
  breakingNewsActive: number;
  mostViewedArticle?: Article;
}
