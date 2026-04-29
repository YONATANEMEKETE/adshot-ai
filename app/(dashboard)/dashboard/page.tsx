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
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Hello world from your dashboard home.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          This is a temporary landing page for the dashboard route while we
          build out the full AdShot AI workspace.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
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
