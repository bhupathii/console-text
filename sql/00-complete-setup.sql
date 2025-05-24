-- Complete Console.text Database Setup
-- Run this entire script in your Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create the next_auth schema for NextAuth
CREATE SCHEMA IF NOT EXISTS next_auth;

-- Create function to update updated_at timestamp (needed for triggers)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create NextAuth users table FIRST (referenced by other tables)
CREATE TABLE IF NOT EXISTS next_auth.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "emailVerified" TIMESTAMP WITH TIME ZONE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create NextAuth accounts table
CREATE TABLE IF NOT EXISTS next_auth.accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create NextAuth sessions table
CREATE TABLE IF NOT EXISTS next_auth.sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "sessionToken" VARCHAR(255) UNIQUE NOT NULL,
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create NextAuth verification_tokens table
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (identifier, token)
);

-- Create custom users table for application data
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL DEFAULT ('ct_' || encode(gen_random_bytes(16), 'hex')),
    telegram_bot_token VARCHAR(255),
    telegram_chat_id VARCHAR(255),
    telegram_configured BOOLEAN DEFAULT false,
    rate_limit_per_minute INTEGER DEFAULT 60 CHECK (rate_limit_per_minute > 0),
    rate_limit_per_hour INTEGER DEFAULT 1000 CHECK (rate_limit_per_hour > 0),
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    metadata JSONB DEFAULT '{}',
    environment VARCHAR(50) DEFAULT 'production',
    telegram_sent BOOLEAN DEFAULT false,
    telegram_message_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for NextAuth tables
CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON next_auth.accounts("userId");
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON next_auth.sessions("userId");
CREATE INDEX IF NOT EXISTS sessions_session_token_idx ON next_auth.sessions("sessionToken");
CREATE UNIQUE INDEX IF NOT EXISTS accounts_provider_provider_account_id_idx ON next_auth.accounts(provider, "providerAccountId");

-- Create indexes for application tables
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON public.users(google_id);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_api_key ON public.projects(api_key);
CREATE INDEX IF NOT EXISTS idx_projects_enabled ON public.projects(enabled);
CREATE INDEX IF NOT EXISTS idx_messages_project_id ON public.messages(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_severity ON public.messages(severity);
CREATE INDEX IF NOT EXISTS idx_messages_telegram_sent ON public.messages(telegram_sent);

-- Create triggers for NextAuth tables
CREATE TRIGGER update_nextauth_accounts_updated_at
    BEFORE UPDATE ON next_auth.accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nextauth_sessions_updated_at
    BEFORE UPDATE ON next_auth.sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nextauth_users_updated_at
    BEFORE UPDATE ON next_auth.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create triggers for application tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate API keys
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
BEGIN
    RETURN 'ct_' || encode(gen_random_bytes(16), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS) for data protection
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view own data" ON public.users
    FOR SELECT USING (true); -- Service role access

CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE USING (true); -- Service role access

CREATE POLICY "Users can insert own data" ON public.users
    FOR INSERT WITH CHECK (true); -- Service role access

-- Create RLS policies for projects table
CREATE POLICY "Users can view own projects" ON public.projects
    FOR SELECT USING (true); -- Service role access

CREATE POLICY "Users can manage own projects" ON public.projects
    FOR ALL USING (true); -- Service role access

-- Create RLS policies for messages table
CREATE POLICY "Users can view project messages" ON public.messages
    FOR SELECT USING (true); -- Service role access

CREATE POLICY "API can insert messages" ON public.messages
    FOR INSERT WITH CHECK (true); -- Service role access

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA next_auth TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA next_auth TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA next_auth TO authenticated; 