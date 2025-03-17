import { useState } from 'react';
import { AuthCard } from '../components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { HeaderIcon } from '@/components/general/header-icon';

export const AuthHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={() => router.push('/')}
        leftIcon={<ArrowLeft className="mr-2 h-4 w-4" />}
      >
        Back to Home
      </Button>
      <HeaderIcon url="/" />
    </div>
  );
};
