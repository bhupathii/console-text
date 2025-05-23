# Console.text Authentication Setup

## Overview

The callback error you're experiencing is due to missing environment variables required for Google OAuth authentication. This guide will help you set up the necessary configuration.

## Required Environment Variables

You need to configure the following environment variables in your Vercel deployment:

### 1. NextAuth Configuration

```bash
NEXTAUTH_URL=https://console-text.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### 2. Google OAuth Configuration

```bash
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

### 3. Supabase Configuration

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
```

## Step-by-Step Setup

### Step 1: Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

### Step 2: Set up Supabase Database

1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and Service Role Key
5. **IMPORTANT**: Run the COMPLETE setup script in your Supabase SQL Editor:

#### Database Setup:

- First, if you have existing tables, drop them using `sql/drop-tables.sql`
- Then run the complete setup: `sql/00-complete-setup.sql`

This creates both the NextAuth schema (for authentication) and your application schema (for projects/messages).

### Step 3: Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google People API
4. Go to Credentials → Create Credentials → OAuth client ID
5. Choose "Web application"
6. Add these authorized redirect URIs:
   - `https://console-text.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local development)
7. Copy the Client ID and Client Secret

### Step 4: Configure Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your console-text project
3. Go to Settings → Environment Variables
4. Add all 6 variables listed above:
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Step 5: Redeploy

After adding the environment variables, trigger a new deployment to apply the changes.

## Database Schema

The application uses two schemas:

1. **`next_auth` schema**: For NextAuth authentication (users, sessions, accounts)
2. **`public` schema**: For your application data (projects, messages, custom user data)

## Troubleshooting

### Common Issues:

1. **"Callback Error"**: Usually means environment variables are missing or incorrect
2. **OAuth redirect URI mismatch**: Ensure the redirect URI in Google Console matches exactly: `https://console-text.vercel.app/api/auth/callback/google`
3. **Supabase connection issues**: Verify the URL and service role key are correct
4. **Database schema issues**: Make sure you ran the complete setup script
5. **Missing NEXTAUTH_URL**: This variable is required for proper callback handling

### Debugging Steps:

1. Check Vercel deployment logs for errors
2. Verify all 6 environment variables are set correctly in Vercel
3. Ensure Google OAuth redirect URIs are configured properly
4. Check that the complete database schema is set up correctly with both schemas
5. Test that your Supabase service role key has proper permissions
6. Verify that your Google OAuth app is not in testing mode (if you want public access)

### Testing Locally:

1. Create a `.env.local` file in the dashboard directory with the same variables
2. Change `NEXTAUTH_URL` to `http://localhost:3000` for local development
3. Run `npm run dev`
4. Test the authentication flow

## Security Notes

- The service role key has admin access to your database - keep it secure
- Row Level Security (RLS) is enabled for data protection
- Never expose service role keys in client-side code

## Support

If you continue to experience issues:

1. Check the Vercel deployment logs
2. Verify all environment variables are set correctly
3. Ensure the Google OAuth redirect URIs are configured properly
4. Check that the complete database schema is set up correctly
5. Try clearing your browser cookies and testing again
6. Check Google Cloud Console for any OAuth app restrictions
