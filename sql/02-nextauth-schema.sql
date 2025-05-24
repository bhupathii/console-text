-- NextAuth.js Supabase adapter schema
-- Run this AFTER the main schema (01-create-tables.sql)

-- Create the next_auth schema
CREATE SCHEMA IF NOT EXISTS next_auth;

-- Create accounts table
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

-- Create sessions table
CREATE TABLE IF NOT EXISTS next_auth.sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "sessionToken" VARCHAR(255) UNIQUE NOT NULL,
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table for NextAuth
CREATE TABLE IF NOT EXISTS next_auth.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "emailVerified" TIMESTAMP WITH TIME ZONE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (identifier, token)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON next_auth.accounts("userId");
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON next_auth.sessions("userId");
CREATE INDEX IF NOT EXISTS sessions_session_token_idx ON next_auth.sessions("sessionToken");
CREATE UNIQUE INDEX IF NOT EXISTS accounts_provider_provider_account_id_idx ON next_auth.accounts(provider, "providerAccountId");

-- Create triggers for updated_at
CREATE TRIGGER update_accounts_updated_at
    BEFORE UPDATE ON next_auth.accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON next_auth.sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON next_auth.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 