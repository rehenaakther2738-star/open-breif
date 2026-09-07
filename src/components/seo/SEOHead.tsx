import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  section?: string;
}

export const SEOHead: React.FC<SEOProps> = ({
  title = 'ওপেন ব্রেফ | OPEN BRIEF - সত্যের সন্ধানে, খবরের সাথে',
  description = 'ওপেন ব্রেফ - আধুনিক, বস্তুনিষ্ঠ ও নিরপেক্ষ বাংলা ডিজিটাল নিউজ পোর্টাল। জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি ও খেলাধুলার তাজা খবর।',
  image = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authorName,
  section,
}) => {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard SEO
    updateMeta('description', description);
    
    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', currentUrl, true);
    updateMeta('og:type', type, true);
    updateMeta('og:site_name', 'ওপেন ব্রেফ (OPEN BRIEF)', true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // JSON-LD NewsArticle Structured Data
    if (type === 'article') {
      let script = document.querySelector('#seo-structured-data') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: title,
        image: [image],
        datePublished: publishedTime || new Date().toISOString(),
        dateModified: modifiedTime || publishedTime || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: authorName || 'ওপেন ব্রেফ ডেস্ক',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ওপেন ব্রেফ (OPEN BRIEF)',
          logo: {
            '@type': 'ImageObject',
            url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
          },
        },
        articleSection: section || 'সংবাদ',
        description: description,
      };

      script.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup structured data on unmount
      const script = document.querySelector('#seo-structured-data');
      if (script) script.remove();
    };
  }, [title, description, image, url, type, publishedTime, modifiedTime, authorName, section]);

  return null;
};
