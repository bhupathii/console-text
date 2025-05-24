import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      credits?: number;
    };
  }
  interface User {
    credits?: number;
  }
}

// Check if all required environment variables are present
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
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
        error: "Authentication not configured",
        missing: missingVars,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  };
};

// Create NextAuth handler when all variables are present
const createAuthHandler = () => {
  return NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: "/auth/signin",
      newUser: "/onboarding",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.userId = user.id;
          token.credits = user.credits;
        }
        return token;
      },
      async session({ session, token }) {
        if (token?.userId && session.user) {
          session.user.id = token.userId as string;
          session.user.credits = token.credits as number;
        }
        return session;
      },
      async signIn({ user, account, profile }) {
        if (account?.provider === "google") {
          try {
            const existingUser = await prisma.user.findUnique({
              where: {
                email: user.email!,
              },
            });

            if (!existingUser) {
              await prisma.user.create({
                data: {
                  email: user.email!,
                  name: user.name!,
                  image: user.image,
                  credits: 10, // Default credits from schema
                  accounts: {
                    create: {
                      type: account.type,
                      provider: account.provider,
                      providerAccountId: account.providerAccountId,
                      access_token: account.access_token,
                      token_type: account.token_type,
                      scope: account.scope,
                      id_token: account.id_token,
                      expires_at: account.expires_at,
                      session_state: account.session_state,
                      refresh_token: account.refresh_token,
                    },
                  },
                },
              });
            }
            return true;
          } catch (error) {
            console.error("Sign in error:", error);
            return false;
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
const handler =
  missingVars.length > 0 ? createErrorHandler() : createAuthHandler();

export { handler as GET, handler as POST };
