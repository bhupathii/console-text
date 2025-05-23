'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (status === 'authenticated' && session) {
      // Successfully authenticated, redirect to dashboard
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      router.push(callbackUrl);
    } else if (status === 'unauthenticated') {
      // Not authenticated, redirect to sign in
      router.push('/auth/signin?error=AuthenticationFailed');
    }
  }, [status, session, router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-white text-2xl font-bold">CT</span>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In...</h1>
            <p className="text-gray-600">
              Please wait while we redirect you to your dashboard.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 