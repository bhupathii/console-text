'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  telegram_user_id?: string;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  api_key: string;
  enabled: boolean;
  created_at: string;
  user_id: string;
  rate_limit_per_minute?: number;
}

interface DashboardClientProps {
  user: User;
  initialProjects: Project[];
}

export default function DashboardClient({ user, initialProjects }: DashboardClientProps) {
  const { data: session } = useSession();
  const [projects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const createProject = async () => {
    if (!newProjectName.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProjectName,
          description: newProjectDescription,
        }),
      });

      if (response.ok) {
        // For now, just close the modal and refresh the page
        window.location.reload();
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    alert('API key copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">CT</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Console.text</h1>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {session?.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Developer'}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your Console.text projects and monitor your Telegram alerts
          </p>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Authentication Successful!</h3>
          <p className="text-green-700">
            Your Console.text dashboard is now fully configured and ready to use. You can now create projects and receive Telegram alerts.
          </p>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Projects</h3>
            <button
              onClick={() => setShowCreateProject(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Project
            </button>
          </div>

          {/* Project Grid */}
          {projects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📝</span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h4>
              <p className="text-gray-500 mb-4">
                Create your first project to start receiving Telegram alerts
              </p>
              <button
                onClick={() => setShowCreateProject(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Project
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                      {project.description && (
                        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                      )}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${project.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      API Key
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <code className="flex-1 bg-gray-50 text-xs font-mono px-2 py-1 rounded border">
                        {project.api_key.substring(0, 20)}...
                      </code>
                      <button
                        onClick={() => copyApiKey(project.api_key)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Copy API Key"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">🚀 Next Steps</h4>
          <div className="text-blue-700 space-y-2">
            <p>• Create a project and get your API key</p>
            <p>• Set up your Telegram bot for notifications</p>
            <p>• Integrate Console.text with your applications</p>
            <p>• Start monitoring your logs in real-time!</p>
          </div>
        </div>
      </main>

      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Project</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="My awesome project"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Optional description..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateProject(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={isLoading || !newProjectName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 