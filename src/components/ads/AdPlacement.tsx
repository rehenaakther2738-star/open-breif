import React, { useEffect, useRef, useState } from 'react';
import { AdPlacement, Advertisement } from '../../types';
import { db } from '../../services/db';

interface AdContainerProps {
  placement: AdPlacement;
  className?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({ placement, className = '' }) => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const loadAds = async () => {
      const activeAds = await db.getActiveAdsByPlacement(placement);
      if (isMounted) {
        setAds(activeAds);
      }
    };

    loadAds();
    return () => { isMounted = false; };
  }, [placement]);

  useEffect(() => {
    // If ad contains script tags, execute them safely
    if (ads.length > 0 && containerRef.current) {
      const ad = ads[0];
      if (ad.ad_code && containerRef.current) {
        // Clear previous content
        containerRef.current.innerHTML = '';
        
        // Parse and inject
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = ad.ad_code;

        // Process scripts to ensure they execute
        const scripts = tempDiv.querySelectorAll('script');
        scripts.forEach((oldScript) => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        });

        while (tempDiv.firstChild) {
          containerRef.current.appendChild(tempDiv.firstChild);
        }
      }
    }
  }, [ads]);

  if (!ads || ads.length === 0) return null;

  return (
    <div className={`my-4 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <div ref={containerRef} className="w-full max-w-4xl" />
    </div>
  );
};

// Preset Placement Components
export const HeaderAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer placement="header" className={className} />
);

export const HomepageAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer placement="homepage" className={className} />
);

export const ArticleTopAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer placement="article_top" className={className} />
);

export const ArticleMiddleAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer placement="article_middle" className={className} />
);

export const SidebarAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer placement="sidebar" className={className} />
);

export const MobileAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer placement="mobile" className={`block md:hidden ${className || ''}`} />
);

export const FooterAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer placement="footer" className={className} />
);
