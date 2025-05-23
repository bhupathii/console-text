'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600">
              The application encountered an error. This is likely due to missing configuration.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Possible causes:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Missing environment variables</li>
              <li>• Database connection issues</li>
              <li>• Authentication configuration problems</li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go to home
            </button>
          </div>

          {error.digest && (
            <div className="mt-4 text-xs text-gray-400">
              Error ID: {error.digest}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 