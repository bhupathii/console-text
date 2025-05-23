import { redirect } from 'next/navigation';
import { getServerUser, getUserProjects } from '@/lib/auth';
import DashboardClient from './dashboard-client';

export default async function Dashboard() {
  const user = await getServerUser();
  
  if (!user) {
    redirect('/auth/signin');
  }

  const projects = await getUserProjects(user.id);

  return (
    <DashboardClient 
      user={user} 
      initialProjects={projects} 
    />
  );
} 