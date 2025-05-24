import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

// Extend NextAuth types
declare module "next-auth" {
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
  return NextAuth({
    providers: [],
    pages: {
      signIn: "/auth/signin",
      error: "/auth/signin",
    },
    callbacks: {
      async signIn() {
        return false;
      },
      async redirect({ url, baseUrl }) {
        return `${baseUrl}/auth/signin?error=Configuration`;
      },
    },
  });
};

// Create NextAuth handler when all variables are present
const createAuthHandler = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    adapter: SupabaseAdapter({
      url: supabaseUrl,
      secret: supabaseServiceKey,
    }),
    pages: {
      signIn: "/auth/signin",
      newUser: "/dashboard",
      error: "/auth/signin",
    },
    session: {
      strategy: "database",
    },
    callbacks: {
      async session({ session, user }) {
        if (user && session.user) {
          session.user.id = user.id;
        }
        return session;
      },
      async signIn({ user, account, profile }) {
        if (account?.provider === "google") {
          try {
            // The adapter will handle user creation automatically
            // We just need to update our custom users table
            const supabase = createClient(supabaseUrl, supabaseServiceKey);
            
            const { data: existingUser, error } = await supabase
              .from("users")
              .select("*")
              .eq("email", user.email)
              .single();

            if (error && error.code !== "PGRST116") {
              console.error("Error checking user:", error);
              return true; // Let NextAuth handle it
            }

            if (!existingUser) {
              // Create user in our custom users table
              const { error: insertError } = await supabase
                .from("users")
                .insert({
                  email: user.email!,
                  name: user.name!,
                  avatar_url: user.image,
                  google_id: account.providerAccountId,
                  last_login: new Date().toISOString(),
                });

              if (insertError) {
                console.error("Error creating user:", insertError);
              }
            } else {
              // Update last login
              await supabase
                .from("users")
                .update({ last_login: new Date().toISOString() })
                .eq("id", existingUser.id);
            }

            return true;
          } catch (error) {
            console.error("Sign in error:", error);
            return true; // Let NextAuth handle it
          }
        }
        return true;
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
  });
};

// Export the appropriate handler based on configuration
const handler = missingVars.length > 0 ? createErrorHandler() : createAuthHandler();

export { handler as GET, handler as POST };
