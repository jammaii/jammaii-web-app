import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { UsersPage } from '@/features/users/pages/users-page';

export default function Page(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  return <UsersPage {...props} />;
}
