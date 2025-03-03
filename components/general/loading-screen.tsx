import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
}

export function LoadingScreen({
  size = 'md',
  fullScreen = false,
  className
}: LoadingScreenProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'fixed inset-0 bg-background/50 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Loader2
          className={cn('animate-spin text-primary', sizeClasses[size])}
        />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
