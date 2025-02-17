import { useState } from 'react';
import { AuthCard } from '../components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const AuthHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={() => router.push('/')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      <Link href="/" className="text-2xl font-bold text-primary">
        JAMMAII
      </Link>
    </div>
  );
};
