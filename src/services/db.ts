import { Article, Category, Author, BreakingNews, Advertisement, Comment, MediaItem, NewsletterSubscriber, SiteSettings, StaticPage, DashboardStats, AdPlacement, CommentStatus } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  initialArticles,
  initialCategories,
  initialAuthors,
  initialBreakingNews,
  initialAdvertisements,
  initialSiteSettings,
  initialStaticPages,
} from '../data/seedData';

const DB_KEY_ARTICLES = 'openbrief_db_articles';
const DB_KEY_CATEGORIES = 'openbrief_db_categories';
const DB_KEY_AUTHORS = 'openbrief_db_authors';
const DB_KEY_BREAKING = 'openbrief_db_breaking';
const DB_KEY_ADS = 'openbrief_db_ads';
const DB_KEY_COMMENTS = 'openbrief_db_comments';
const DB_KEY_MEDIA = 'openbrief_db_media';
const DB_KEY_NEWSLETTER = 'openbrief_db_newsletter';
const DB_KEY_SETTINGS = 'openbrief_db_settings';
const DB_KEY_PAGES = 'openbrief_db_pages';

class DatabaseService {
  private getStorage<T>(key: string, defaultData: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        localStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
      }
      return JSON.parse(item);
    } catch {
      return defaultData;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }

  // --- ARTICLES ---

  async getArticles(filter?: {
    status?: string;
    categoryId?: string;
    authorId?: string;
    isFeatured?: boolean;
    isBreaking?: boolean;
    search?: string;
    limit?: number;
  }): Promise<Article[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('articles').select('*, category:categories(*), author:authors(*)');
        if (filter?.status) query = query.eq('status', filter.status);
        if (filter?.categoryId) query = query.eq('category_id', filter.categoryId);
        if (filter?.authorId) query = query.eq('author_id', filter.authorId);
        if (filter?.isFeatured !== undefined) query = query.eq('is_featured', filter.isFeatured);
        if (filter?.isBreaking !== undefined) query = query.eq('is_breaking', filter.isBreaking);
        if (filter?.search) query = query.ilike('title', `%${filter.search}%`);
        query = query.order('published_at', { ascending: false });
        if (filter?.limit) query = query.limit(filter.limit);

        let { data, error } = await query;

        // If join failed (e.g. FK relationship not cached or missing in Supabase), fallback to plain select
        if (error) {
          let plainQuery = supabase.from('articles').select('*');
          if (filter?.status) plainQuery = plainQuery.eq('status', filter.status);
          if (filter?.categoryId) plainQuery = plainQuery.eq('category_id', filter.categoryId);
          if (filter?.authorId) plainQuery = plainQuery.eq('author_id', filter.authorId);
          if (filter?.isFeatured !== undefined) plainQuery = plainQuery.eq('is_featured', filter.isFeatured);
          if (filter?.isBreaking !== undefined) plainQuery = plainQuery.eq('is_breaking', filter.isBreaking);
          if (filter?.search) plainQuery = plainQuery.ilike('title', `%${filter.search}%`);
          plainQuery = plainQuery.order('published_at', { ascending: false });
          if (filter?.limit) plainQuery = plainQuery.limit(filter.limit);

          const fallbackRes = await plainQuery;
          if (!fallbackRes.error && fallbackRes.data) {
            data = fallbackRes.data;
            error = null;
          }
        }

        if (!error && data && data.length > 0) {
          const categories = await this.getCategories();
          const authors = await this.getAuthors();
          return data.map((art: any) => ({
            ...art,
            category: art.category || categories.find(c => c.id === art.category_id),
            author: art.author || authors.find(a => a.id === art.author_id),
          })) as Article[];
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store', err);
      }
    }

    // Local / Fallback store
    let articles = this.getStorage<Article[]>(DB_KEY_ARTICLES, initialArticles);
    const categories = await this.getCategories();
    const authors = await this.getAuthors();

    // Attach relations
    articles = articles.map(art => ({
      ...art,
      category: categories.find(c => c.id === art.category_id),
      author: authors.find(a => a.id === art.author_id),
    }));

    if (filter?.status) {
      articles = articles.filter(a => a.status === filter.status);
    }
    if (filter?.categoryId) {
      articles = articles.filter(a => a.category_id === filter.categoryId);
    }
    if (filter?.authorId) {
      articles = articles.filter(a => a.author_id === filter.authorId);
    }
    if (filter?.isFeatured !== undefined) {
      articles = articles.filter(a => a.is_featured === filter.isFeatured);
    }
    if (filter?.isBreaking !== undefined) {
      articles = articles.filter(a => a.is_breaking === filter.isBreaking);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort by publication date descending
    articles.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());

    if (filter?.limit) {
      articles = articles.slice(0, filter.limit);
    }

    return articles;
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    if (isSupabaseConfigured() && supabase) {
      try {
        let { data, error } = await supabase
          .from('articles')
          .select('*, category:categories(*), author:authors(*)')
          .eq('slug', slug)
          .maybeSingle();

        // Fallback to plain select if relational join fails
        if (error || !data) {
          const fallback = await supabase
            .from('articles')
            .select('*')
            .eq('slug', slug)
            .maybeSingle();
          if (!fallback.error && fallback.data) {
            data = fallback.data;
            error = null;
          }
        }

        if (!error && data) {
          const categories = await this.getCategories();
          const authors = await this.getAuthors();
          return {
            ...data,
            category: data.category || categories.find((c) => c.id === data.category_id),
            author: data.author || authors.find((a) => a.id === data.author_id),
          } as Article;
        }
      } catch (err) {
        console.warn('Supabase fetch failed', err);
      }
    }

    const articles = await this.getArticles();
    return articles.find(a => a.slug === slug) || null;
  }

  async getArticleById(id: string): Promise<Article | null> {
    const articles = await this.getArticles();
    return articles.find(a => a.id === id) || null;
  }

  async createArticle(data: Partial<Article>): Promise<Article> {
    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title: data.title || 'শিরোনামহীন সংবাদ',
      slug: data.slug || `news-${Date.now()}`,
      excerpt: data.excerpt || '',
      content: data.content || '',
      featured_image: data.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
      image_caption: data.image_caption || '',
      category_id: data.category_id || 'cat-1',
      author_id: data.author_id || 'auth-1',
      status: data.status || 'draft',
      is_featured: Boolean(data.is_featured),
      is_breaking: Boolean(data.is_breaking),
      views: 0,
      published_at: data.published_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      seo_title: data.seo_title,
      seo_description: data.seo_description,
      seo_keywords: data.seo_keywords,
      canonical_url: data.canonical_url,
      tags: data.tags || [],
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('articles').insert([newArticle]);
        if (error) {
          console.error('Supabase article insert error', error);
          // If foreign key constraint failed on author_id or category_id, retry with null
          if (error.code === '23503') {
            const fallbackArticle = { ...newArticle, author_id: null, category_id: null };
            await supabase.from('articles').insert([fallbackArticle]);
          }
        }
      } catch (e) {
        console.error('Supabase article insert error', e);
      }
    }

    const current = this.getStorage<Article[]>(DB_KEY_ARTICLES, initialArticles);
    this.setStorage(DB_KEY_ARTICLES, [newArticle, ...current]);
    return newArticle;
  }

  async updateArticle(id: string, data: Partial<Article>): Promise<Article | null> {
    const current = this.getStorage<Article[]>(DB_KEY_ARTICLES, initialArticles);
    const index = current.findIndex(a => a.id === id);
    if (index === -1) return null;

    const updated: Article = {
      ...current[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    current[index] = updated;
    this.setStorage(DB_KEY_ARTICLES, current);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('articles').update(data).eq('id', id);
      } catch (e) {
        console.error('Supabase article update error', e);
      }
    }

    return updated;
  }

  async deleteArticle(id: string): Promise<boolean> {
    const current = this.getStorage<Article[]>(DB_KEY_ARTICLES, initialArticles);
    const filtered = current.filter(a => a.id !== id);
    this.setStorage(DB_KEY_ARTICLES, filtered);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('articles').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase article delete error', e);
      }
    }

    return true;
  }

  async incrementViews(id: string): Promise<void> {
    const current = this.getStorage<Article[]>(DB_KEY_ARTICLES, initialArticles);
    const article = current.find(a => a.id === id);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.setStorage(DB_KEY_ARTICLES, current);
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.rpc('increment_article_views', { article_id: id });
      } catch {
        // Fallback standard update
        if (article) {
          await supabase.from('articles').update({ views: article.views }).eq('id', id);
        }
      }
    }
  }

  async duplicateArticle(id: string): Promise<Article | null> {
    const target = await this.getArticleById(id);
    if (!target) return null;

    const copyData: Partial<Article> = {
      ...target,
      title: `${target.title} (কপি)`,
      slug: `${target.slug}-copy-${Date.now()}`,
      status: 'draft',
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return this.createArticle(copyData);
  }

  async getHeroStories(): Promise<{ leadStory: Article | null; secondaryStories: Article[] }> {
    const articles = await this.getArticles({ status: 'published' });
    const featured = articles.filter(a => a.is_featured);
    
    const leadStory = featured[0] || articles[0] || null;
    const secondaryStories = (featured.length > 1 ? featured.slice(1, 5) : articles.filter(a => a.id !== leadStory?.id).slice(0, 4));

    return { leadStory, secondaryStories };
  }

  async getMostRead(timeframe: 'today' | 'week' | 'month' = 'today', limit = 5): Promise<Article[]> {
    const articles = await this.getArticles({ status: 'published' });
    // Sort by views desc
    return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
  }

  // --- CATEGORIES ---

  async getCategories(onlyActive = false): Promise<Category[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('categories').select('*').order('order_index', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Category[];
      } catch (err) {
        console.warn('Supabase categories fetch failed', err);
      }
    }

    const categories = this.getStorage<Category[]>(DB_KEY_CATEGORIES, initialCategories);
    if (onlyActive) {
      return categories.filter(c => c.is_active).sort((a, b) => a.order_index - b.order_index);
    }
    return [...categories].sort((a, b) => a.order_index - b.order_index);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const categories = await this.getCategories();
    return categories.find(c => c.slug === slug) || null;
  }

  async createCategory(data: Partial<Category>): Promise<Category> {
    const categories = await this.getCategories();
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: data.name || 'নতুন বিভাগ',
      slug: data.slug || `category-${Date.now()}`,
      description: data.description || '',
      image: data.image,
      seo_title: data.seo_title,
      seo_description: data.seo_description,
      order_index: data.order_index ?? (categories.length + 1),
      is_active: data.is_active ?? true,
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('categories').insert([newCategory]);
      } catch (e) {
        console.error('Supabase category insert error', e);
      }
    }

    this.setStorage(DB_KEY_CATEGORIES, [...categories, newCategory]);
    return newCategory;
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
    const categories = await this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;

    const updated = { ...categories[index], ...data };
    categories[index] = updated;
    this.setStorage(DB_KEY_CATEGORIES, categories);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('categories').update(data).eq('id', id);
      } catch (e) {
        console.error('Supabase category update error', e);
      }
    }

    return updated;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const categories = await this.getCategories();
    this.setStorage(DB_KEY_CATEGORIES, categories.filter(c => c.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase category delete error', e);
      }
    }

    return true;
  }

  async reorderCategories(orderedIds: string[]): Promise<void> {
    const categories = await this.getCategories();
    const reordered = categories.map(cat => {
      const idx = orderedIds.indexOf(cat.id);
      return idx !== -1 ? { ...cat, order_index: idx + 1 } : cat;
    });
    this.setStorage(DB_KEY_CATEGORIES, reordered);
  }

  // --- BREAKING NEWS ---

  async getActiveBreakingNews(): Promise<BreakingNews[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('breaking_news')
          .select('*')
          .eq('is_active', true)
          .order('priority', { ascending: true });
        if (!error && data && data.length > 0) return data as BreakingNews[];
      } catch (err) {
        console.warn('Supabase breaking news failed', err);
      }
    }

    const items = this.getStorage<BreakingNews[]>(DB_KEY_BREAKING, initialBreakingNews);
    return items.filter(b => b.is_active).sort((a, b) => a.priority - b.priority);
  }

  async getAllBreakingNews(): Promise<BreakingNews[]> {
    return this.getStorage<BreakingNews[]>(DB_KEY_BREAKING, initialBreakingNews);
  }

  async createBreakingNews(data: Partial<BreakingNews>): Promise<BreakingNews> {
    const current = await this.getAllBreakingNews();
    const newItem: BreakingNews = {
      id: `brk-${Date.now()}`,
      headline: data.headline || 'ব্রেকিং খবর',
      url: data.url || '',
      priority: data.priority ?? (current.length + 1),
      is_active: data.is_active ?? true,
      expires_at: data.expires_at,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('breaking_news').insert([newItem]);
      } catch (e) {
        console.error('Supabase breaking news insert error', e);
      }
    }

    this.setStorage(DB_KEY_BREAKING, [newItem, ...current]);
    return newItem;
  }

  async updateBreakingNews(id: string, data: Partial<BreakingNews>): Promise<BreakingNews | null> {
    const current = await this.getAllBreakingNews();
    const index = current.findIndex(b => b.id === id);
    if (index === -1) return null;

    const updated = { ...current[index], ...data };
    current[index] = updated;
    this.setStorage(DB_KEY_BREAKING, current);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('breaking_news').update(data).eq('id', id);
      } catch (e) {
        console.error('Supabase breaking news update error', e);
      }
    }

    return updated;
  }

  async deleteBreakingNews(id: string): Promise<boolean> {
    const current = await this.getAllBreakingNews();
    this.setStorage(DB_KEY_BREAKING, current.filter(b => b.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('breaking_news').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase breaking news delete error', e);
      }
    }

    return true;
  }

  // --- AUTHORS ---

  async getAuthors(): Promise<Author[]> {
    return this.getStorage<Author[]>(DB_KEY_AUTHORS, initialAuthors);
  }

  async getAuthorById(id: string): Promise<Author | null> {
    const authors = await this.getAuthors();
    return authors.find(a => a.id === id) || null;
  }

  async createAuthor(data: Partial<Author>): Promise<Author> {
    const authors = await this.getAuthors();
    const newAuthor: Author = {
      id: `auth-${Date.now()}`,
      name: data.name || 'লেখক',
      profile_photo: data.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      designation: data.designation || 'প্রতিবেদক',
      bio: data.bio || '',
      facebook: data.facebook,
      x: data.x,
      email: data.email,
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('authors').insert([newAuthor]);
      } catch (e) {
        console.error('Supabase author insert error', e);
      }
    }

    this.setStorage(DB_KEY_AUTHORS, [...authors, newAuthor]);
    return newAuthor;
  }

  async updateAuthor(id: string, data: Partial<Author>): Promise<Author | null> {
    const authors = await this.getAuthors();
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) return null;

    const updated = { ...authors[index], ...data };
    authors[index] = updated;
    this.setStorage(DB_KEY_AUTHORS, authors);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('authors').update(data).eq('id', id);
      } catch (e) {
        console.error('Supabase author update error', e);
      }
    }

    return updated;
  }

  async deleteAuthor(id: string): Promise<boolean> {
    const authors = await this.getAuthors();
    this.setStorage(DB_KEY_AUTHORS, authors.filter(a => a.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('authors').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase author delete error', e);
      }
    }

    return true;
  }

  // --- ADVERTISEMENTS ---

  async getActiveAdsByPlacement(placement: AdPlacement): Promise<Advertisement[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('advertisements')
          .select('*')
          .eq('placement', placement)
          .eq('status', 'active');
        if (!error && data && data.length > 0) return data as Advertisement[];
      } catch (err) {
        console.warn('Supabase ads failed', err);
      }
    }

    const ads = this.getStorage<Advertisement[]>(DB_KEY_ADS, initialAdvertisements);
    return ads.filter(a => a.placement === placement && a.status === 'active');
  }

  async getAllAds(): Promise<Advertisement[]> {
    return this.getStorage<Advertisement[]>(DB_KEY_ADS, initialAdvertisements);
  }

  async createAd(data: Partial<Advertisement>): Promise<Advertisement> {
    const current = await this.getAllAds();
    const newAd: Advertisement = {
      id: `ad-${Date.now()}`,
      name: data.name || 'নতুন বিজ্ঞাপন',
      ad_type: data.ad_type || 'banner',
      ad_code: data.ad_code || '<div>Advertisement</div>',
      placement: data.placement || 'header',
      status: data.status || 'active',
      start_date: data.start_date,
      end_date: data.end_date,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('advertisements').insert([newAd]);
      } catch (e) {
        console.error('Supabase ad insert error', e);
      }
    }

    this.setStorage(DB_KEY_ADS, [newAd, ...current]);
    return newAd;
  }

  async updateAd(id: string, data: Partial<Advertisement>): Promise<Advertisement | null> {
    const current = await this.getAllAds();
    const index = current.findIndex(a => a.id === id);
    if (index === -1) return null;

    const updated = { ...current[index], ...data };
    current[index] = updated;
    this.setStorage(DB_KEY_ADS, current);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('advertisements').update(data).eq('id', id);
      } catch (e) {
        console.error('Supabase ad update error', e);
      }
    }

    return updated;
  }

  async deleteAd(id: string): Promise<boolean> {
    const current = await this.getAllAds();
    this.setStorage(DB_KEY_ADS, current.filter(a => a.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('advertisements').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase ad delete error', e);
      }
    }

    return true;
  }

  // --- COMMENTS ---

  async getCommentsForArticle(articleId: string, approvedOnly = true): Promise<Comment[]> {
    const comments = this.getStorage<Comment[]>(DB_KEY_COMMENTS, [
      {
        id: 'comm-1',
        article_id: 'art-1',
        author_name: 'কাজী হাসান',
        author_email: 'hasan@example.com',
        content: 'মতিঝিল থেকে কমলাপুর চালু হলে লাখো যাত্রীর সময় বাঁচবে। চমৎকার উদ্যোগ।',
        status: 'approved',
        created_at: '2026-09-07T08:50:00Z',
      },
      {
        id: 'comm-2',
        article_id: 'art-5',
        author_name: 'রাশেদ চৌধুরী',
        author_email: 'rashed@example.com',
        content: 'অসাধারণ ফিনিশিং! শেষ ওভারের ডেলিভারিগুলো আজীবন মনে রাখার মতো ছিল। সাবাশ টাইগার্স!',
        status: 'approved',
        created_at: '2026-09-06T15:30:00Z',
      }
    ]);

    return comments.filter(c => c.article_id === articleId && (!approvedOnly || c.status === 'approved'));
  }

  async getAllComments(): Promise<Comment[]> {
    return this.getStorage<Comment[]>(DB_KEY_COMMENTS, []);
  }

  async addComment(data: { article_id: string; author_name: string; author_email: string; content: string }): Promise<Comment> {
    const current = this.getStorage<Comment[]>(DB_KEY_COMMENTS, []);
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      article_id: data.article_id,
      author_name: data.author_name,
      author_email: data.author_email,
      content: data.content,
      status: 'pending', // Moderation required
      created_at: new Date().toISOString(),
    };

    this.setStorage(DB_KEY_COMMENTS, [newComment, ...current]);
    return newComment;
  }

  async updateCommentStatus(id: string, status: CommentStatus): Promise<boolean> {
    const current = this.getStorage<Comment[]>(DB_KEY_COMMENTS, []);
    const index = current.findIndex(c => c.id === id);
    if (index === -1) return false;
    current[index].status = status;
    this.setStorage(DB_KEY_COMMENTS, current);
    return true;
  }

  async deleteComment(id: string): Promise<boolean> {
    const current = this.getStorage<Comment[]>(DB_KEY_COMMENTS, []);
    this.setStorage(DB_KEY_COMMENTS, current.filter(c => c.id !== id));
    return true;
  }

  // --- NEWSLETTER ---

  async subscribeNewsletter(email: string, name?: string): Promise<{ success: boolean; message: string }> {
    const current = this.getStorage<NewsletterSubscriber[]>(DB_KEY_NEWSLETTER, [
      { id: 'sub-1', email: 'reader1@example.com', name: 'কামাল হোসেন', created_at: '2026-09-01T00:00:00Z' },
    ]);

    if (current.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'আপনি ইতোমধ্যে সাবস্ক্রাইব করেছেন।' };
    }

    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      name,
      created_at: new Date().toISOString(),
    };

    this.setStorage(DB_KEY_NEWSLETTER, [newSub, ...current]);
    return { success: true, message: 'সফলভাবে সাবস্ক্রিপশন সম্পন্ন হয়েছে। ধন্যবাদ!' };
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return this.getStorage<NewsletterSubscriber[]>(DB_KEY_NEWSLETTER, []);
  }

  // --- MEDIA LIBRARY ---

  async getAllMedia(): Promise<MediaItem[]> {
    return this.getStorage<MediaItem[]>(DB_KEY_MEDIA, [
      {
        id: 'med-1',
        title: 'মেট্রোরেল ট্রায়াল রান',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
        alt_text: 'মেট্রোরেল বগি ও ট্র্যাক',
        file_size: '1.2 MB',
        created_at: '2026-09-07T08:00:00Z',
      },
      {
        id: 'med-2',
        title: 'এশিয়া কাপ ট্রফি সেলিব্রেশন',
        url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=80',
        alt_text: 'স্টেডিয়ামে ম্যাচ বিজয়',
        file_size: '2.4 MB',
        created_at: '2026-09-06T15:00:00Z',
      },
      {
        id: 'med-3',
        title: 'হাইস্পিড বুলেট ট্রেন',
        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&auto=format&fit=crop&q=80',
        alt_text: 'আধুনিক ট্রেন',
        file_size: '1.8 MB',
        created_at: '2026-09-04T09:00:00Z',
      },
    ]);
  }

  async addMedia(item: { title: string; url: string; alt_text?: string; caption?: string; file_size?: string }): Promise<MediaItem> {
    const current = await this.getAllMedia();
    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      title: item.title,
      url: item.url,
      alt_text: item.alt_text,
      caption: item.caption,
      file_size: item.file_size || '950 KB',
      created_at: new Date().toISOString(),
    };

    this.setStorage(DB_KEY_MEDIA, [newItem, ...current]);
    return newItem;
  }

  async deleteMedia(id: string): Promise<boolean> {
    const current = await this.getAllMedia();
    this.setStorage(DB_KEY_MEDIA, current.filter(m => m.id !== id));
    return true;
  }

  // --- SITE SETTINGS ---

  async getSiteSettings(): Promise<SiteSettings> {
    return this.getStorage<SiteSettings>(DB_KEY_SETTINGS, initialSiteSettings);
  }

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSiteSettings();
    const updated = { ...current, ...settings };
    this.setStorage(DB_KEY_SETTINGS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('site_settings').upsert({ id: 1, ...updated });
      } catch (e) {
        console.error('Supabase settings update error', e);
      }
    }

    return updated;
  }

  // --- STATIC PAGES ---

  async getStaticPage(slug: string): Promise<StaticPage | null> {
    const pages = this.getStorage<StaticPage[]>(DB_KEY_PAGES, initialStaticPages);
    return pages.find(p => p.slug === slug) || null;
  }

  async getAllStaticPages(): Promise<StaticPage[]> {
    return this.getStorage<StaticPage[]>(DB_KEY_PAGES, initialStaticPages);
  }

  async updateStaticPage(slug: string, content: string, title?: string): Promise<StaticPage | null> {
    const pages = this.getStorage<StaticPage[]>(DB_KEY_PAGES, initialStaticPages);
    const index = pages.findIndex(p => p.slug === slug);
    if (index === -1) return null;

    pages[index] = {
      ...pages[index],
      content,
      title: title || pages[index].title,
      updated_at: new Date().toISOString(),
    };

    this.setStorage(DB_KEY_PAGES, pages);
    return pages[index];
  }

  // --- DASHBOARD ANALYTICS ---

  async getDashboardStats(): Promise<DashboardStats> {
    const articles = await this.getArticles();
    const categories = await this.getCategories();
    const breaking = await this.getActiveBreakingNews();

    const published = articles.filter(a => a.status === 'published');
    const drafts = articles.filter(a => a.status === 'draft');
    const scheduled = articles.filter(a => a.status === 'scheduled');
    
    const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);
    // Estimated today views
    const todayViews = Math.floor(totalViews * 0.28);

    const sortedByViews = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0));

    return {
      totalArticles: articles.length,
      publishedArticles: published.length,
      draftArticles: drafts.length,
      scheduledArticles: scheduled.length,
      totalViews,
      todayViews,
      categoriesCount: categories.length,
      breakingNewsActive: breaking.length,
      mostViewedArticle: sortedByViews[0],
    };
  }

  // --- ALIASES & COMPATIBILITY HELPERS ---

  async getSettings(): Promise<SiteSettings> {
    return this.getSiteSettings();
  }

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    return this.updateSiteSettings(settings);
  }

  async getArticlesByCategory(categoryId: string, limit?: number): Promise<Article[]> {
    return this.getArticles({ categoryId, status: 'published', limit });
  }

  async getMostReadArticles(limit = 6): Promise<Article[]> {
    return this.getMostRead('today', limit);
  }

  async getRelatedArticles(categoryId: string, currentArticleId: string, limit = 4): Promise<Article[]> {
    const articles = await this.getArticles({ categoryId, status: 'published' });
    return articles.filter(a => a.id !== currentArticleId).slice(0, limit);
  }

  async incrementArticleViews(id: string): Promise<void> {
    return this.incrementViews(id);
  }

  async getAds(): Promise<Advertisement[]> {
    return this.getAllAds();
  }

  async getBreakingNews(): Promise<BreakingNews[]> {
    return this.getAllBreakingNews();
  }

  // --- SYSTEM TOOLS ---

  resetDatabaseToDefaults(): void {
    localStorage.setItem(DB_KEY_ARTICLES, JSON.stringify(initialArticles));
    localStorage.setItem(DB_KEY_CATEGORIES, JSON.stringify(initialCategories));
    localStorage.setItem(DB_KEY_AUTHORS, JSON.stringify(initialAuthors));
    localStorage.setItem(DB_KEY_BREAKING, JSON.stringify(initialBreakingNews));
    localStorage.setItem(DB_KEY_ADS, JSON.stringify(initialAdvertisements));
    localStorage.setItem(DB_KEY_SETTINGS, JSON.stringify(initialSiteSettings));
    localStorage.setItem(DB_KEY_PAGES, JSON.stringify(initialStaticPages));
    localStorage.removeItem(DB_KEY_COMMENTS);
  }
}

export const db = new DatabaseService();
