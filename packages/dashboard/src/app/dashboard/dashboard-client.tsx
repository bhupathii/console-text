'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import ProjectSetup from '@/components/ProjectSetup';
import TelegramSetup from '@/components/TelegramSetup';
import ProjectDashboard from '@/components/ProjectDashboard';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

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

interface DashboardClientProps {
  user: User;
  initialProjects: Project[];
}

export default function DashboardClient({ user, initialProjects }: DashboardClientProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects.length > 0 ? projects[0] : null
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'setup' | 'telegram'>('overview');

  const handleProjectCreated = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
    setSelectedProject(newProject);
    setActiveTab('telegram');
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setSelectedProject(updatedProject);
  };

  // If no projects, show project creation
  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">CT</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Console.text</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Welcome, {user.name}
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4">
          <ProjectSetup 
            user={user} 
            onProjectCreated={handleProjectCreated} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">CT</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Console.text</h1>
              
              {/* Project Selector */}
              <select
                value={selectedProject?.id || ''}
                onChange={(e) => {
                  const project = projects.find(p => p.id === e.target.value);
                  setSelectedProject(project || null);
                }}
                className="ml-8 border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {user.name}
              </div>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('telegram')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'telegram'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Telegram Setup
            </button>
            <button
              onClick={() => setActiveTab('setup')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'setup'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && selectedProject && (
          <ProjectDashboard project={selectedProject} />
        )}
        
        {activeTab === 'telegram' && selectedProject && (
          <TelegramSetup 
            project={selectedProject}
            onProjectUpdated={handleProjectUpdated}
          />
        )}
        
        {activeTab === 'setup' && (
          <ProjectSetup 
            user={user} 
            onProjectCreated={handleProjectCreated} 
          />
        )}
      </div>
    </div>
  );
} 