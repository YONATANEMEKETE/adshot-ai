'use client';

import { useState } from 'react';

import { signOutUser } from '@/lib/auth-actions';

type UseSignOutOptions = {
  onSuccess?: () => void;
};

export function useSignOut(options: UseSignOutOptions = {}) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async () => {
    try {
      setIsSigningOut(true);

      await signOutUser({
        onSuccess: options.onSuccess,
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return {
    isSigningOut,
    signOut,
  };
}
