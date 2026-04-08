'use client';

import { create } from 'zustand';

interface AuthDialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  setOpen: (open: boolean) => void;
}

export const useAuthDialogStore = create<AuthDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  setOpen: (open) => set({ isOpen: open }),
}));
