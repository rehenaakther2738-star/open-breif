import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};

// Read URL from Vite (VITE_) or Next.js prefix (NEXT_PUBLIC_) injected by Netlify
const rawUrl =
  env.VITE_SUPABASE_URL ||
  env.NEXT_PUBLIC_SUPABASE_URL ||
  env.NEXT_PUBLIC_SUPABASE_DATABASE_URL ||
  env.VITE_SUPABASE_DATABASE_URL ||
  '';

// Normalize URL: ensure https and no trailing slash
const supabaseUrl = (rawUrl && typeof rawUrl === 'string' && rawUrl.startsWith('https://'))
  ? rawUrl.trim().replace(/\/+$/, '')
  : '';

// Read Anon key from Vite or Next.js prefix
const rawKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  env.SUPABASE_ANON_KEY ||
  '';

const supabaseAnonKey = typeof rawKey === 'string' ? rawKey.trim() : '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey &&
    supabaseAnonKey.length > 20
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

