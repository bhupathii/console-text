import { redirect } from 'next/navigation';
import { getServerUser, getUserProjects } from '@/lib/auth';
import DashboardClient from './dashboard-client';

export default function Dashboard() {
  // Show configuration message when auth is not configured
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">📊</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Your Console.text control center
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-3">🔧 Setup Required</h2>
            <p className="text-yellow-700 mb-4">
              The dashboard requires authentication to be configured. Please set up your environment variables to access the full dashboard functionality.
            </p>
            
            <div className="text-left text-sm text-yellow-700">
              <p className="font-medium mb-2">Missing configuration:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Database connection (Supabase)</li>
                <li>Google OAuth authentication</li>
                <li>NextAuth configuration</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-left mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">🚀 What you'll get</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Project management</li>
                <li>• API key generation</li>
                <li>• Message history</li>
                <li>• Telegram configuration</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">📈 Analytics</h3>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Real-time monitoring</li>
                <li>• Message statistics</li>
                <li>• Rate limit tracking</li>
                <li>• Performance insights</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Back to Home
            </a>
            
            <a
              href="/auth/signin"
              className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center"
            >
              Try Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 