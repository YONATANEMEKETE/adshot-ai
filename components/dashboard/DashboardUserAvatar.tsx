'use client';

import Image from 'next/image';
import { RiUser3Line } from '@remixicon/react';

import { useCurrentSession } from '@/lib/auth-session';

export default function DashboardUserAvatar() {
  const { data: session } = useCurrentSession();
  const user = session?.user;
  const userName = user?.name?.trim() || 'AdShot user';
  const userEmail = user?.email?.trim() || 'Signed in';

  return (
    <button
      type="button"
      className="group cursor-pointer self-start flex h-12 w-12 items-center justify-start gap-3 overflow-hidden rounded-[calc(var(--radius)+0.35rem)] border border-border bg-card p-1.5 text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/35 hover:bg-primary/8 hover:text-primary hover:shadow-md md:ml-6 md:w-12 md:hover:w-56"
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--radius)+0.2rem)] bg-muted">
        {user?.image ? (
          <Image
            src={user.image}
            alt={userName}
            fill
            sizes="36px"
            className="object-cover"
          />
        ) : (
          <RiUser3Line
            aria-hidden="true"
            className="size-4 transition-all duration-200 group-hover:scale-105 group-hover:text-primary"
          />
        )}
      </span>
      <span className="hidden min-w-0 flex-col text-left opacity-0 transition-opacity duration-200 md:flex md:group-hover:opacity-100">
        <span className="truncate text-sm font-medium text-foreground">
          {userName}
        </span>
        <span className="truncate text-xs text-muted-foreground group-hover:text-primary/80">
          {userEmail}
        </span>
      </span>
      <span className="sr-only">User profile</span>
    </button>
  );
}
