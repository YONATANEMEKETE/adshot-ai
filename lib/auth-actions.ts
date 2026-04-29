'use client';

import { authClient } from '@/lib/auth-client';

type SignOutOptions = {
  onSuccess?: () => void;
};

export async function signInWithGoogle() {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: '/dashboard',
    errorCallbackURL: '/auth/error',
  });
}

export async function signOutUser({ onSuccess }: SignOutOptions = {}) {
  await authClient.signOut({
    fetchOptions: {
      onSuccess,
    },
  });
}
