import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Console.text - Real-time Telegram alerts for developers',
  description: 'Transform your console logs into instant Telegram notifications',
};

// Force static generation - Fixed TypeScript dependencies (2024-12-23)
export const dynamic = 'force-static';

export default function Home() {
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

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-3">⚙️ Configuration Required</h2>
            <p className="text-yellow-700 mb-4">
              This application requires environment variables to be configured for full functionality.
            </p>
            
            <div className="text-left text-sm text-yellow-700">
              <p className="font-medium mb-2">Required environment variables:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> - Database URL</li>
                <li><code className="bg-yellow-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> - Database service key</li>
                <li><code className="bg-yellow-100 px-1 rounded">GOOGLE_CLIENT_ID</code> - OAuth client ID</li>
                <li><code className="bg-yellow-100 px-1 rounded">GOOGLE_CLIENT_SECRET</code> - OAuth client secret</li>
                <li><code className="bg-yellow-100 px-1 rounded">NEXTAUTH_SECRET</code> - Authentication secret</li>
                <li><code className="bg-yellow-100 px-1 rounded">NEXTAUTH_URL</code> - Your deployed URL</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-left mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">📊 Dashboard</h3>
              <p className="text-blue-700 text-sm">
                Monitor all your projects, view message history, and manage Telegram configurations.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">🔔 Real-time Alerts</h3>
              <p className="text-green-700 text-sm">
                Get instant notifications in Telegram when your application logs important events.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <p className="mb-2">
              <strong>Deployment Status:</strong> ✅ Successfully deployed
            </p>
            <p>
              Once environment variables are configured in Vercel, this page will redirect to the authentication system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 