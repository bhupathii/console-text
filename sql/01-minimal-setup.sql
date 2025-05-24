-- Minimal NextAuth Setup for Console.text
-- This creates only the essential NextAuth schema and tables

-- Create the next_auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS next_auth;

-- Grant permissions
GRANT USAGE ON SCHEMA next_auth TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA next_auth TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA next_auth TO authenticated;

-- 1. Users table (NextAuth core table)
CREATE TABLE IF NOT EXISTS next_auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    email_verified TIMESTAMPTZ,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Accounts table (for OAuth providers)
CREATE TABLE IF NOT EXISTS next_auth.accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_account_id)
);

-- 3. Sessions table (for session management)
CREATE TABLE IF NOT EXISTS next_auth.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
    expires TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Verification tokens table (for email verification)
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON next_auth.accounts(user_id);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON next_auth.sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_session_token_idx ON next_auth.sessions(session_token);
CREATE INDEX IF NOT EXISTS accounts_provider_provider_account_id_idx ON next_auth.accounts(provider, provider_account_id);

-- Create a basic users table in public schema for app data
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    google_id TEXT UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grant permissions on public tables
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ NextAuth minimal setup completed successfully!';
    RAISE NOTICE '📋 Created schemas: next_auth, updated public';
    RAISE NOTICE '📋 Created tables: users, accounts, sessions, verification_tokens';
    RAISE NOTICE '📋 Created indexes for optimal performance';
    RAISE NOTICE '🎉 Ready for authentication!';
END $$; 