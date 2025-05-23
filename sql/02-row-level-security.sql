-- Row Level Security (RLS) Policies for Console.text
-- Run this in your Supabase SQL Editor after creating the tables

-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Enable RLS on messages table  
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy for projects: Allow all operations for service role
CREATE POLICY "projects_service_role_access" ON projects
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy for messages: Allow all operations for service role
CREATE POLICY "messages_service_role_access" ON messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy for projects: Allow authenticated users to see their own projects
-- (This will be useful when you add user authentication later)
CREATE POLICY "projects_user_access" ON projects
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for messages: Allow users to see messages from their projects
CREATE POLICY "messages_user_access" ON messages
  FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Allow anonymous access for API endpoints (we'll validate API keys in the application)
-- This is needed for the console.text client library to send messages
CREATE POLICY "messages_anon_insert" ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow the API to read project info for API key validation
CREATE POLICY "projects_anon_select" ON projects
  FOR SELECT
  TO anon
  USING (true); 