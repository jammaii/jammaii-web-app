import { SingleProjectPage } from '@/features/projects/pages/single-project-page';

interface PageProps {
  params: {
    id: string; // matches [id] in the filename
  };
}

export default function Page({ params }: PageProps) {
  return <SingleProjectPage id={params.id} />;
}
