'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Check if environment variables are configured
  const isAuthConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    typeof window !== 'undefined' // Only on client side
  );

  // Use SessionProvider when auth is configured
  if (isAuthConfigured) {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    );
  }

  // Fallback for when auth is not configured
  return <>{children}</>;
} 