import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Service client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// For client-side operations, we'll use the service key with proper session handling
// In production, you might want to use anon key + RLS, but for simplicity we use service key
export const supabase = supabaseAdmin;

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          google_id: string | null;
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          google_id?: string | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string | null;
          google_id?: string | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          api_key: string;
          telegram_bot_token: string | null;
          telegram_chat_id: string | null;
          telegram_configured: boolean;
          rate_limit_per_minute: number;
          rate_limit_per_hour: number;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          api_key?: string;
          telegram_bot_token?: string | null;
          telegram_chat_id?: string | null;
          telegram_configured?: boolean;
          rate_limit_per_minute?: number;
          rate_limit_per_hour?: number;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          api_key?: string;
          telegram_bot_token?: string | null;
          telegram_chat_id?: string | null;
          telegram_configured?: boolean;
          rate_limit_per_minute?: number;
          rate_limit_per_hour?: number;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          project_id: string;
          message: string;
          severity: 'info' | 'warning' | 'error' | 'critical';
          metadata: any;
          environment: string;
          telegram_sent: boolean;
          telegram_message_id: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          message: string;
          severity?: 'info' | 'warning' | 'error' | 'critical';
          metadata?: any;
          environment?: string;
          telegram_sent?: boolean;
          telegram_message_id?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          message?: string;
          severity?: 'info' | 'warning' | 'error' | 'critical';
          metadata?: any;
          environment?: string;
          telegram_sent?: boolean;
          telegram_message_id?: number | null;
          created_at?: string;
        };
      };
    };
  };
} 