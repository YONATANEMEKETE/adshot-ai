'use client';

import { useState } from 'react';

import AuthDialog from '@/components/auth/AuthDialog';
import { useAuthDialogStore } from '@/lib/stores/use-auth-dialog-store';

export default function AuthDialogHost() {
  const { isOpen, setOpen, closeDialog } = useAuthDialogStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleContinue = () => {
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      closeDialog();
    }, 1200);
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
