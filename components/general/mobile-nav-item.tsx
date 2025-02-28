'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-4 px-2.5 text-white/50 hover:text-white',
        {
          'text-white': pathname === href
        }
      )}
    >
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}
