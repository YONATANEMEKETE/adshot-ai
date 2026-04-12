import type { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sign In Error',
  description: 'Return to the AdShot AI home page after a sign-in error.',
};

export default function AuthErrorPage() {
  return (
    <section className="flex min-h-[calc(100vh-14rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-sm border border-border bg-background p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Error signing in
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong while signing you in with Google.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'mt-6 w-full',
          )}
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
