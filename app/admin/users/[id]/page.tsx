'use client';

import { SingleUserPage } from '@/features/users/pages/single-user-page';
import { defaultUserProjects } from '@/constants/mock';
import { notFound, useParams } from 'next/navigation';

export default function Page() {
  const route = useParams();
  const { id } = route;

  const userData = defaultUserProjects.find((user) => user.id === id);

  if (!userData) {
    notFound();
  }

  return <SingleUserPage userData={userData} />;
}
