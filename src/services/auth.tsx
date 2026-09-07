import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isDemoMode: boolean;
  toggleDemoAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN: AdminUser = {
  id: 'admin-001',
  email: 'admin@openbrief.news',
  role: 'admin',
  name: 'প্রধান সম্পাদক (Chief Editor)',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      // Check stored session in localStorage
      const stored = localStorage.getItem('openbrief_admin_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setLoading(false);
          return;
        } catch {
          localStorage.removeItem('openbrief_admin_session');
        }
      }

      // Check real Supabase session if configured
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.user) {
            const adminUser: AdminUser = {
              id: data.session.user.id,
              email: data.session.user.email || 'admin@openbrief.news',
              role: 'admin',
              name: data.session.user.user_metadata?.name || 'অ্যাডমিন',
            };
            setUser(adminUser);
          }
        } catch (err) {
          console.warn('Supabase auth session check failed', err);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (usernameOrEmail: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Authoritative Admin Credentials requested:
    // User: admin (or admin@openbrief.news)
    // Password: A12341234#
    if (
      (cleanUser === 'admin' || cleanUser === 'admin@openbrief.news') &&
      cleanPass === 'A12341234#'
    ) {
      const adminUser: AdminUser = {
        id: 'admin-openbrief-master',
        email: 'admin@openbrief.news',
        role: 'admin',
        name: 'প্রধান সম্পাদক (Admin)',
      };
      setUser(adminUser);
      localStorage.setItem('openbrief_admin_session', JSON.stringify(adminUser));
      return { success: true };
    }

    // 2. If Supabase is configured and email format provided, authenticate through Supabase Auth
    if (isSupabaseConfigured() && supabase && cleanUser.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanUser,
          password: cleanPass,
        });
        if (error) {
          return { success: false, error: 'ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।' };
        }
        if (data.user) {
          const loggedIn: AdminUser = {
            id: data.user.id,
            email: data.user.email || cleanUser,
            role: 'admin',
            name: data.user.user_metadata?.name || cleanUser.split('@')[0],
          };
          setUser(loggedIn);
          localStorage.setItem('openbrief_admin_session', JSON.stringify(loggedIn));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: 'লগইন প্রক্রিয়ায় ত্রুটি হয়েছে।' };
      }
    }

    return {
      success: false,
      error: 'ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।',
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.removeItem('openbrief_admin_session');
    setUser(null);
    setIsDemoMode(false);
  };

  const toggleDemoAdmin = () => {
    // Demo bypass removed for admin protection
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isDemoMode, toggleDemoAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
