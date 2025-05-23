'use client';

export function Providers({ children }: { children: React.ReactNode }) {
  // For now, just return children without SessionProvider to avoid any auth issues
  // Once environment variables are configured, this can be updated to include SessionProvider
  return <>{children}</>;
} 