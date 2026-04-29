'use client';

import AuthDialog from '@/components/auth/AuthDialog';
import { useGoogleSignIn } from '@/lib/hooks/use-google-sign-in';
import { useAuthDialogStore } from '@/lib/stores/use-auth-dialog-store';

export default function AuthDialogHost() {
  const { isOpen, setOpen, closeDialog } = useAuthDialogStore();
  const { isSigningIn, continueWithGoogle } = useGoogleSignIn({
    onError: (error) => {
      closeDialog();
      console.error(error);
    },
  });

  return (
    <AuthDialog
      open={isOpen}
      onOpenChange={setOpen}
      onGoogleContinue={() => void continueWithGoogle()}
      isSubmitting={isSigningIn}
    />
  );
}
