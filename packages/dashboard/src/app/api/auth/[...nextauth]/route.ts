import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Check if all required environment variables are present
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

// Create error handler for missing environment variables
const createErrorHandler = () => {
  return () => {
    return new Response(
      JSON.stringify({ 
        error: 'Authentication not configured', 
        missing: missingVars 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  };
};

// Create NextAuth handler when all variables are present
const createAuthHandler = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      db: {
        schema: 'next_auth',
      },
    }
  );

  return NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    adapter: SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    }),
    pages: {
      signIn: '/auth/signin',
      newUser: '/onboarding',
    },
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async jwt({ token, user, account }) {
        if (user) {
          token.userId = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        if (token?.userId && session.user) {
          session.user.id = token.userId as string;
        }
        return session;
      },
      async signIn({ user, account, profile }) {
        if (account?.provider === 'google') {
          try {
            // Check if user exists in our custom users table
            const { data: existingUser, error } = await supabase
              .from('users')
              .select('*')
              .eq('email', user.email)
              .single();

            if (error && error.code !== 'PGRST116') {
              console.error('Error checking user:', error);
              return false;
            }

            if (!existingUser) {
              // Create user in our custom users table
              const { error: insertError } = await supabase
                .from('users')
                .insert({
                  email: user.email!,
                  name: user.name!,
                  avatar_url: user.image,
                  google_id: account.providerAccountId,
                  last_login: new Date().toISOString(),
                });

              if (insertError) {
                console.error('Error creating user:', insertError);
                return false;
              }
            } else {
              // Update last login
              await supabase
                .from('users')
                .update({ last_login: new Date().toISOString() })
                .eq('id', existingUser.id);
            }

            return true;
          } catch (error) {
            console.error('Sign in error:', error);
            return false;
          }
        }
        return true;
      },
    },
  });
};

// Export the appropriate handler based on configuration
const handler = missingVars.length > 0 ? createErrorHandler() : createAuthHandler();

export { handler as GET, handler as POST }; 