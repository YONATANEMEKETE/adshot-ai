'use client';

import { useState } from 'react';

import { signInWithGoogle } from '@/lib/auth-actions';

type UseGoogleSignInOptions = {
  onError?: (error: unknown) => void;
};

export function useGoogleSignIn(options: UseGoogleSignInOptions = {}) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const continueWithGoogle = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (error) {
      options.onError?.(error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return {
    isSigningIn,
    continueWithGoogle,
  };
}
