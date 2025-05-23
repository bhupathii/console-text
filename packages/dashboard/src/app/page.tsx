import { redirect } from 'next/navigation';
import { getServerUser } from '@/lib/auth';

export default async function Home() {
  try {
    const user = await getServerUser();
    
    if (user) {
      redirect('/dashboard');
    } else {
      redirect('/auth/signin');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    // Fallback to a welcome page when auth is not configured
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Console.text</h1>
          <p className="text-gray-600 mb-6">
            Real-time Telegram alerts for developers. Configure your environment variables to get started.
          </p>
          <div className="text-sm text-gray-500">
            <p>Required environment variables:</p>
            <ul className="mt-2 text-left">
              <li>• NEXT_PUBLIC_SUPABASE_URL</li>
              <li>• SUPABASE_SERVICE_ROLE_KEY</li>
              <li>• GOOGLE_CLIENT_ID</li>
              <li>• GOOGLE_CLIENT_SECRET</li>
              <li>• NEXTAUTH_SECRET</li>
              <li>• NEXTAUTH_URL</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
} 