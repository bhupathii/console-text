'use client';

import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  api_key: string;
  telegram_chat_id?: string;
  telegram_configured: boolean;
  rate_limit_per_minute: number;
  enabled: boolean;
  created_at: string;
}

interface TelegramSetupProps {
  project: Project;
  onProjectUpdated: (project: Project) => void;
}

export default function TelegramSetup({ project, onProjectUpdated }: TelegramSetupProps) {
  const [chatId, setChatId] = useState(project.telegram_chat_id || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [testSuccess, setTestSuccess] = useState(false);

  const handleSaveChatId = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatId.trim()) {
      setError('Chat ID is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setTestSuccess(false);

    try {
      const response = await fetch(`/api/projects/${project.id}/telegram`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_chat_id: chatId.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update Telegram settings');
      }

      const updatedProject = await response.json();
      onProjectUpdated(updatedProject);
      setTestSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestMessage = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/projects/${project.id}/test-telegram`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to send test message');
      }

      setTestSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send test message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Set Up Telegram Notifications
        </h2>
        <p className="text-lg text-gray-600">
          Configure your Telegram integration to receive real-time alerts from your applications.
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Add Bot to Group */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Add Console.text Bot to Your Telegram Group
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-sm font-medium mb-2">
                  Bot Username: @consoleXtext_bot
                </p>
                <p className="text-blue-700 text-sm">
                  This is the official Console.text bot that will send your notifications.
                </p>
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">a</span>
                  <p>Open Telegram and create a new group or use an existing one</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">b</span>
                  <p>Search for <code className="bg-gray-100 px-2 py-1 rounded">@consoleXtext_bot</code> and add it to your group</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">c</span>
                  <p>Grant administrator privileges to the bot (required for sending messages)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Get Chat ID */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Your Chat ID
              </h3>
              
              <div className="space-y-3 text-gray-700 mb-6">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">a</span>
                  <p>Send the command <code className="bg-gray-100 px-2 py-1 rounded">/start</code> to your group</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">b</span>
                  <p>The bot will respond with your Chat ID (a number like -1002520035259)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">c</span>
                  <p>Copy this Chat ID and paste it below</p>
                </div>
              </div>

              <form onSubmit={handleSaveChatId} className="space-y-4">
                <div>
                  <label htmlFor="chatId" className="block text-sm font-medium text-gray-700 mb-2">
                    Telegram Chat ID
                  </label>
                  <input
                    type="text"
                    id="chatId"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="-1002520035259"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    The Chat ID should be a negative number starting with -100
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {testSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">✅ Telegram integration configured successfully!</p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Chat ID'
                    )}
                  </button>

                  {project.telegram_configured && (
                    <button
                      type="button"
                      onClick={sendTestMessage}
                      disabled={isLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Test Message
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Step 3: Integration Complete */}
        {project.telegram_configured && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  Telegram Integration Complete!
                </h3>
                <p className="text-green-800">
                  Your project is now configured to send notifications to Telegram. 
                  Use your API key <code className="bg-green-100 px-2 py-1 rounded">{project.api_key}</code> in your applications.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 