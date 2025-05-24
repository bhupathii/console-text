'use client';

import { Suspense } from 'react';

function SignInFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-white text-2xl font-bold">CT</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Console.text</h1>
              <p className="text-gray-600 mt-2">Loading authentication...</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<SignInFallback />}>
      {children}
    </Suspense>
  );
} 