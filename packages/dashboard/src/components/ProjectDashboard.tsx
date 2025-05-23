'use client';

import { useState, useEffect } from 'react';

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

interface Message {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  environment: string;
  telegram_sent: boolean;
  created_at: string;
}

interface ProjectDashboardProps {
  project: Project;
}

export default function ProjectDashboard({ project }: ProjectDashboardProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({
    totalMessages: 0,
    todayMessages: 0,
    telegramSuccessRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [project.id]);

  const fetchProjectData = async () => {
    try {
      const [messagesRes, statsRes] = await Promise.all([
        fetch(`/api/projects/${project.id}/messages`),
        fetch(`/api/projects/${project.id}/stats`),
      ]);

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(project.api_key);
    // You could add a toast notification here
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'error': return 'text-red-500 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
            <p className="text-gray-600 mt-1">
              Created {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {project.enabled ? 'Active' : 'Disabled'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.telegram_configured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {project.telegram_configured ? 'Telegram Connected' : 'Telegram Not Configured'}
            </span>
          </div>
        </div>

        {/* API Key Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">API Key</h3>
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <code className="flex-1 bg-white border rounded-lg px-4 py-3 font-mono text-sm">
              {showApiKey ? project.api_key : '••••••••••••••••••••••••••••••••'}
            </code>
            <button
              onClick={copyApiKey}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalMessages}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Messages</p>
              <p className="text-3xl font-bold text-gray-900">{stats.todayMessages}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Telegram Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">{stats.telegramSuccessRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">📱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Examples */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Integration Examples</h3>
        
        <div className="space-y-6">
          {/* JavaScript/Node.js */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">JavaScript/Node.js</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// Install: npm install axios
const axios = require('axios');

async function sendAlert(message, severity = 'info') {
  try {
    await axios.post('${window.location.origin}/api/messages', {
      message,
      severity,
      environment: 'production',
      metadata: { timestamp: new Date().toISOString() }
    }, {
      headers: {
        'Authorization': 'Bearer ${project.api_key}',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Failed to send alert:', error);
  }
}

// Usage
sendAlert('Database connection established', 'info');
sendAlert('High memory usage detected', 'warning');
sendAlert('Payment gateway error', 'error');`}
              </pre>
            </div>
          </div>

          {/* Python */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Python</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`# Install: pip install requests
import requests
import json

def send_alert(message, severity='info'):
    try:
        response = requests.post('${window.location.origin}/api/messages', 
            headers={
                'Authorization': 'Bearer ${project.api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'message': message,
                'severity': severity,
                'environment': 'production'
            }
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f'Failed to send alert: {e}')

# Usage
send_alert('Server started successfully', 'info')
send_alert('Disk space low', 'warning')`}
              </pre>
            </div>
          </div>

          {/* cURL */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">cURL</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`curl -X POST ${window.location.origin}/api/messages \\
  -H "Authorization: Bearer ${project.api_key}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Application error occurred",
    "severity": "error",
    "environment": "production",
    "metadata": {"user_id": "12345", "error_code": "500"}
  }'`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Messages</h3>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No messages sent yet. Start integrating Console.text into your applications!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.slice(0, 10).map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-lg">
                      {getSeverityIcon(message.severity)}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{message.message}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(message.severity)}`}>
                          {message.severity.toUpperCase()}
                        </span>
                        <span>{message.environment}</span>
                        <span>{new Date(message.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      message.telegram_sent ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                    <span className="text-xs text-gray-500">
                      {message.telegram_sent ? 'Sent' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 