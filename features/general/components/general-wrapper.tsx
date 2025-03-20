'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Footer } from '@/features/general/components/footer';
import { DivProps } from '@/types/index';
import { cn } from '@/lib/utils';
import { HeaderIcon } from '@/components/general/header-icon';

interface GeneralWrapperProps extends DivProps {
  children: React.ReactNode;
}

export const GeneralWrapper = ({
  children,
  className,
  ...props
}: GeneralWrapperProps) => {
  const router = useRouter();

  return (
    <div className={cn('m-4 flex min-h-screen flex-col', className)} {...props}>
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
      <>{children}</>
      <Footer />
    </div>
  );
};
