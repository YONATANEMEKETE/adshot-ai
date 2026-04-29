'use client';

import { authClient } from '@/lib/auth-client';

export function useCurrentSession() {
  return authClient.useSession();
}
