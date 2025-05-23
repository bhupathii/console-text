# Console.text Deployment Guide

## Environment Variables Required

To properly deploy Console.text, you need to configure the following environment variables in your Vercel dashboard:

### 1. Supabase Configuration

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep this secret)

### 2. Google OAuth Configuration

- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

### 3. NextAuth Configuration

- `NEXTAUTH_SECRET` - A random secret key for NextAuth (generate with: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your deployed URL (e.g., `https://console-text.vercel.app`)

## Setting Up Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your `console-text` project
3. Go to Settings → Environment Variables
4. Add each variable above with their respective values

## Database Setup

You'll need to set up a Supabase database with the following tables:

- `users` - User information
- `projects` - User projects with API keys
- `messages` - Console message logs

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Add `/api/auth/callback/google` to authorized redirect URIs

## Current Status

The application is now deployed but will show a welcome screen until environment variables are configured. Once you add the required environment variables, the full authentication and dashboard functionality will be available.

## Quick Deploy Check

Visit your deployed site - if you see a welcome message about environment variables, that means the deployment is working correctly and you just need to configure the environment variables as described above.
