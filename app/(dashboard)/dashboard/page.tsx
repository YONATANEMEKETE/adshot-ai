'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useSignOut } from '@/lib/hooks/use-sign-out';

export default function DashboardPage() {
  const router = useRouter();
  const { isSigningOut, signOut } = useSignOut({
    onSuccess: () => {
      router.push('/');
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center gap-4 rounded-sm border border-border bg-background p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <Button
          type="button"
          variant="outline"
          onClick={() => void signOut()}
          disabled={isSigningOut}
        >
          {isSigningOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </div>
    </div>
  );
}
