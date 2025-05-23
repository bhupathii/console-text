'use client';

import { signIn, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for error in URL parameters
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'Configuration':
          setError('Authentication is not properly configured. Please contact support.');
          break;
        case 'Callback':
          setError('Authentication callback failed. Please try signing in again.');
          break;
        case 'OAuthSignin':
          setError('Error occurred during OAuth sign-in. Please try again.');
          break;
        case 'OAuthCallback':
          setError('OAuth callback error. Please try again.');
          break;
        case 'OAuthCreateAccount':
          setError('Could not create account. Please try again.');
          break;
        case 'EmailCreateAccount':
          setError('Could not create account with this email.');
          break;
        case 'Signin':
          setError('Sign-in failed. Please try again.');
          break;
        default:
          setError('An authentication error occurred. Please try again.');
      }
    }

    // Check if auth is configured
    const configured = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      typeof window !== 'undefined'
    );
    setIsConfigured(configured);

    if (configured && !errorParam) {
      // Check if user is already signed in
      getSession().then((session) => {
        if (session) {
          router.push('/dashboard');
        }
      });
    }
  }, [router, searchParams]);

  const handleGoogleSignIn = async () => {
    if (!isConfigured) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false
      });
      
      if (result?.error) {
        setError('Sign-in failed. Please try again.');
        setIsLoading(false);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Logo and Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-white text-2xl font-bold">CT</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Console.text</h1>
              <p className="text-gray-600 mt-2">
                Real-time Telegram alerts for developers
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isConfigured ? (
            <>
              {/* Features List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">What you'll get:</h3>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Instant Telegram notifications</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Rate limiting & smart filtering</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Easy integration with any app</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Dashboard monitoring & analytics</span>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 
                         text-gray-700 font-semibold py-3 px-4 rounded-xl 
                         flex items-center justify-center space-x-3 
                         transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:shadow-md"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Footer */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Configuration Notice for fallback */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-yellow-800 mb-3">🔧 Authentication Setup Required</h2>
                <p className="text-yellow-700 text-sm mb-4">
                  Google OAuth authentication is not yet configured. Please set up the required environment variables to enable sign-in functionality.
                </p>
                <div className="text-yellow-700 text-xs">
                  <p className="font-medium mb-2">Required environment variables:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>NEXTAUTH_SECRET</li>
                    <li>GOOGLE_CLIENT_ID</li>
                    <li>GOOGLE_CLIENT_SECRET</li>
                    <li>NEXT_PUBLIC_SUPABASE_URL</li>
                    <li>SUPABASE_SERVICE_ROLE_KEY</li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Configure environment variables to enable authentication
                </p>
                <a
                  href="/"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  ← Back to Home
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 