import { defaultUserProjects } from '@/constants/mock';
import { UserDashboardPage } from '@/features/users/pages/user-dashboard-page';

export default function Page() {
  // In a real app, you'd fetch the user's projects here
  const userProjects = defaultUserProjects[0]; // Get first user's projects for demo

  return <UserDashboardPage userProjects={userProjects} />;
}
