import { getServerSession } from 'next-auth/next';
import { createClient } from '@supabase/supabase-js';

// Check if required environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase environment variables are not configured');
}

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function getServerUser() {
  if (!supabase) {
    throw new Error('Database not configured - missing environment variables');
  }

  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return null;
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', session.user.email)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return user;
}

export async function getUserProjects(userId: string) {
  if (!supabase) {
    throw new Error('Database not configured - missing environment variables');
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .eq('enabled', true);

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return projects;
}

export async function createUserProject(userId: string, name: string) {
  if (!supabase) {
    throw new Error('Database not configured - missing environment variables');
  }

  // Generate API key
  const { data: apiKeyData, error: apiKeyError } = await supabase
    .rpc('generate_api_key');

  if (apiKeyError) {
    console.error('Error generating API key:', apiKeyError);
    throw new Error('Failed to generate API key');
  }

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      name,
      api_key: apiKeyData,
      telegram_configured: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }

  return project;
} 