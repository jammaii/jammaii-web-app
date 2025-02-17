import { ProjectsPage } from '@/features/projects/pages/projects-page';

export default async function Page(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  return <ProjectsPage {...props} />;
}
