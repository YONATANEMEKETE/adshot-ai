'use client';

import { useState } from 'react';

import AuthDialog from '@/components/auth/AuthDialog';
import { authClient } from '@/lib/auth-client';
import { useAuthDialogStore } from '@/lib/stores/use-auth-dialog-store';

export default function AuthDialogHost() {
  const { isOpen, setOpen, closeDialog } = useAuthDialogStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/auth/error',
    });
  };

  const handleGoogleContinue = async () => {
    try {
      setIsSubmitting(true);

      await signIn();
    } catch (error) {
      setIsSubmitting(false);
      closeDialog();
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthDialog
      open={isOpen}
      onOpenChange={setOpen}
      onGoogleContinue={handleGoogleContinue}
      isSubmitting={isSubmitting}
    />
  );
}
