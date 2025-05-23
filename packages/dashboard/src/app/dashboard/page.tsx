import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Use dynamic generation to check environment variables and auth at runtime
export const dynamic = 'force-dynamic';

// Check if environment variables are configured
function areEnvVarsConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.NEXTAUTH_SECRET &&
    process.env.NEXTAUTH_URL
  );
}

async function getServerUser() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return null;
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // First try to get user from NextAuth database
    if (session.user.id) {
      return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        avatar_url: session.user.image,
        created_at: new Date().toISOString(),
      };
    }

    // Fallback: try to find user in custom users table
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single();

    if (error) {
      console.log('User not found in custom table, using session data');
      return {
        id: session.user.email, // Fallback ID
        email: session.user.email,
        name: session.user.name,
        avatar_url: session.user.image,
        created_at: new Date().toISOString(),
      };
    }

    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

async function getUserProjects(userId: string) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .eq('enabled', true);

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return projects || [];
  } catch (error) {
    console.error('Projects fetch error:', error);
    return [];
  }
}

export default async function Dashboard() {
  // Check if environment variables are configured
  if (!areEnvVarsConfigured()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">📊</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Configuration required</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-yellow-800 mb-3">🔧 Setup Required</h2>
              <p className="text-yellow-700">Environment variables need to be configured.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get authenticated user
  const user = await getServerUser();
  
  if (!user) {
    redirect('/auth/signin');
  }

  // Get user projects
  const projects = await getUserProjects(user.id);

  // Import dashboard client dynamically
  const { default: DashboardClient } = await import('./dashboard-client');

  return (
    <DashboardClient 
      user={user} 
      initialProjects={projects} 
    />
  );
} 