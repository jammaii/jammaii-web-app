'use client';

import { SingleProjectPage } from '@/features/projects/pages/single-project-page';
import { notFound, useParams } from 'next/navigation';

export default async function Page() {
  const route = useParams();
  const { id } = route;

  if (!id || Array.isArray(id)) {
    notFound();
  }

  return <SingleProjectPage id={id} />;
}
