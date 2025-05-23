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

### Step 2: Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth client ID
5. Choose "Web application"
6. Add these authorized redirect URIs:
   - `https://console-text.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local development)
7. Copy the Client ID and Client Secret

### Step 3: Set up Supabase

1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and Service Role Key
5. Run the SQL schema from `/sql/01-create-tables.sql` in your Supabase SQL Editor

### Step 4: Configure Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your console-text project
3. Go to Settings → Environment Variables
4. Add all the variables listed above

### Step 5: Redeploy

After adding the environment variables, trigger a new deployment to apply the changes.

## Troubleshooting

### Common Issues:

1. **"Callback Error"**: Usually means environment variables are missing or incorrect
2. **OAuth redirect URI mismatch**: Ensure the redirect URI in Google Console matches exactly
3. **Supabase connection issues**: Verify the URL and service role key are correct

### Testing Locally:

1. Create a `.env.local` file in the dashboard directory with the same variables
2. Run `npm run dev`
3. Test the authentication flow

## Support

If you continue to experience issues:

1. Check the Vercel deployment logs
2. Verify all environment variables are set correctly
3. Ensure the Google OAuth redirect URIs are configured properly
4. Check that the Supabase database schema is set up correctly
