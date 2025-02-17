import { AuthBackground } from '@/features/auth/components/auth-background';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <AuthBackground />
      {children}
    </div>
  );
}
