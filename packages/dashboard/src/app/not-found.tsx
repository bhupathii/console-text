export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-4xl">404</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Console.text</h2>
            <p className="text-blue-700 text-sm">
              Real-time Telegram alerts for developers. Transform your console logs into instant notifications.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Go to Home
            </a>
            
            <a
              href="/dashboard"
              className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center"
            >
              Try Dashboard
            </a>
            
            <a
              href="/auth/signin"
              className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 