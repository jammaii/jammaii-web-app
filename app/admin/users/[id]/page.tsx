import { SingleUserPage } from '@/features/users/pages/single-user-page';
import { defaultUserProjects } from '@/constants/mock';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const userData = defaultUserProjects.find((user) => user.id === params.id);

  if (!userData) {
    notFound();
  }

  return <SingleUserPage userData={userData} />;
}
