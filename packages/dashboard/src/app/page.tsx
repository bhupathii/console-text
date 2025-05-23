import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Console.text - Real-time Telegram alerts for developers',
  description: 'Transform your console logs into instant Telegram notifications',
};

// Use dynamic generation to check environment variables
export const dynamic = 'force-dynamic';

// Check if environment variables are configured
function areEnvVarsConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.NEXTAUTH_SECRET &&
    process.env.NEXTAUTH_URL
  );
}

export default function Home() {
  // If environment variables are configured, redirect to auth
  if (areEnvVarsConfigured()) {
    redirect('/auth/signin');
  }

  // Fallback configuration page (this should not be shown anymore since env vars are set)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Console.text</h1>
            <p className="text-xl text-gray-600">Real-time Telegram alerts for developers</p>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Transform your console logs into instant Telegram notifications. Monitor your applications, 
              track errors, and stay informed about your code's behavior in real-time.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-3">✅ Configuration Detected</h2>
            <p className="text-green-700 mb-4">
              Environment variables are configured! Redirecting to authentication...
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/auth/signin"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Continue to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 