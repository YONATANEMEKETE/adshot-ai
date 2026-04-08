'use client';

import Image from 'next/image';
import { RiArrowRightLine } from '@remixicon/react';

import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoogleContinue?: () => void;
  isSubmitting?: boolean;
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.24-.2-1.79H12v3.37h5.52c-.11.84-.74 2.1-2.13 2.95l-.02.11 3.09 2.34.21.02c1.94-1.75 2.93-4.33 2.93-7Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.87 6.61-2.36l-3.28-2.47c-.88.6-2.06 1.02-3.33 1.02-2.64 0-4.88-1.75-5.68-4.17l-.11.01-3.21 2.43-.04.1A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.32 14.02A5.97 5.97 0 0 1 6 12c0-.7.12-1.38.31-2.02l-.01-.13-3.25-2.47-.11.05A9.86 9.86 0 0 0 2 12c0 1.6.39 3.11 1.07 4.43l3.25-2.41Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.81c1.6 0 2.69.68 3.31 1.25l2.42-2.3C16.95 3.98 14.7 3 12 3a9.99 9.99 0 0 0-8.93 5.57l3.37 2.55C7.23 8.73 9.36 5.81 12 5.81Z"
      />
    </svg>
  );
}

export default function AuthDialog({
  open,
  onOpenChange,
  onGoogleContinue,
  isSubmitting = false,
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl gap-0 overflow-hidden border border-border bg-card p-0 shadow-2xl rounded-sm"
        showCloseButton
      >
        <div className="p-4 sm:p-5">
          <div className="relative overflow-hidden rounded-sm border border-border bg-muted/40">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
              alt="Dreamlike ocean cliffs and bright sky representing polished creative output."
              width={1400}
              height={900}
              priority
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 px-5 pb-6 pt-1 sm:px-6 sm:pb-7">
          <DialogHeader className="items-center gap-4 text-center">
            <div className="flex size-12 items-center justify-center rounded-sm bg-secondary text-primary-foreground shadow-sm">
              <Logo
                size={26}
                className="text-primary-foreground"
                aria-hidden="true"
              />
            </div>

            <DialogTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
              Welcome to AdShot AI
            </DialogTitle>
          </DialogHeader>

          <Button
            type="button"
            size="lg"
            className="h-12 w-full justify-center gap-2.5 rounded-sm text-sm font-semibold shadow-sm"
            disabled={isSubmitting}
            onClick={onGoogleContinue}
          >
            <div className="flex size-8 items-center justify-center rounded-sm bg-secondary text-primary-foreground shadow-sm">
              <GoogleMark />
            </div>
            <span>
              {isSubmitting ? 'Connecting...' : 'Continue with Google'}
            </span>
            {!isSubmitting ? (
              <RiArrowRightLine
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
              />
            ) : null}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
