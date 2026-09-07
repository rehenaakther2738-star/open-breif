import React, { useState } from 'react';
import { useAuth } from '../../services/auth';
import { AdminLogin } from './AdminLogin';
import { AdminLayout, AdminTab } from './AdminLayout';
import { DashboardOverview } from './DashboardOverview';
import { ArticleManager } from './ArticleManager';
import { ArticleEditor } from './ArticleEditor';
import { CategoryManager } from './CategoryManager';
import { BreakingNewsManager } from './BreakingNewsManager';
import { AdManager } from './AdManager';
import { CommentsManager } from './CommentsManager';
import { NewsletterManager } from './NewsletterManager';
import { SiteSettingsManager } from './SiteSettingsManager';
import { Article } from '../../types';

interface AdminPortalProps {
  onGoToSite: () => void;
  onViewArticleLive: (slug: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onGoToSite, onViewArticleLive }) => {
  const { user, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onSuccess={() => setCurrentTab('overview')} onBackToSite={onGoToSite} />;
  }

  const handleEditArticle = (art: Article) => {
    setEditingArticle(art);
    setCurrentTab('new-article');
  };

  const handleCreateNewArticle = () => {
    setEditingArticle(null);
    setCurrentTab('new-article');
  };

  return (
    <AdminLayout currentTab={currentTab} onSelectTab={(tab) => {
      if (tab !== 'new-article') {
        setEditingArticle(null);
      }
      setCurrentTab(tab);
    }} onGoToSite={onGoToSite}>
      {currentTab === 'overview' && (
        <DashboardOverview
          onNavigateTab={setCurrentTab}
          onEditArticle={handleEditArticle}
          onViewArticle={onViewArticleLive}
        />
      )}

      {currentTab === 'articles' && (
        <ArticleManager
          onNewArticle={handleCreateNewArticle}
          onEditArticle={handleEditArticle}
          onViewArticle={onViewArticleLive}
        />
      )}

      {currentTab === 'new-article' && (
        <ArticleEditor
          initialArticle={editingArticle}
          onSaveComplete={() => {
            setEditingArticle(null);
            setCurrentTab('articles');
          }}
          onCancel={() => {
            setEditingArticle(null);
            setCurrentTab('articles');
          }}
        />
      )}

      {currentTab === 'categories' && <CategoryManager />}

      {currentTab === 'breaking' && <BreakingNewsManager />}

      {currentTab === 'ads' && <AdManager />}

      {currentTab === 'comments' && <CommentsManager />}

      {currentTab === 'newsletter' && <NewsletterManager />}

      {currentTab === 'settings' && <SiteSettingsManager />}
    </AdminLayout>
  );
};
