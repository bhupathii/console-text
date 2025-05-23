'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Check if NextAuth is properly configured
  const isAuthConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_AUTH_CONFIGURED !== 'false';

  // If auth is not configured, just return children without SessionProvider
  if (!isAuthConfigured) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
} 