'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  RiComputerLine,
  RiLogoutBoxLine,
  RiMoonLine,
  RiSettings4Line,
  RiSunLine,
  RiUser3Line,
} from '@remixicon/react';

import { useCurrentSession } from '@/lib/auth-session';
import { useSignOut } from '@/lib/hooks/use-sign-out';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const themeOptions = [
  { value: 'light', label: 'Light', icon: RiSunLine },
  { value: 'dark', label: 'Dark', icon: RiMoonLine },
  { value: 'system', label: 'System', icon: RiComputerLine },
] as const;

export default function DashboardUserMenu() {
  const router = useRouter();
  const { data: session } = useCurrentSession();
  const { theme, setTheme } = useTheme();
  const { isSigningOut, signOut } = useSignOut({
    onSuccess: () => {
      router.push('/');
    },
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const user = session?.user;
  const userName = user?.name?.trim() || 'AdShot user';
  const userEmail = user?.email?.trim() || 'Signed in';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={cn(
          'group cursor-pointer self-start flex h-12 w-12 items-center justify-start gap-3 overflow-hidden rounded-sm border border-border bg-card p-1.5 text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/35 hover:bg-primary/8 hover:text-primary hover:shadow-md md:ml-6 md:w-12',
          !isOpen && 'md:hover:w-56',
        )}
        aria-label="Open user menu"
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
        <span
          className={cn(
            'hidden min-w-0 flex-col text-left opacity-0 transition-opacity duration-200 md:flex',
            !isOpen && 'md:group-hover:opacity-100',
          )}
        >
          <span className="truncate text-sm font-medium text-foreground">
            {userName}
          </span>
          <span className="truncate text-xs text-muted-foreground group-hover:text-primary/80">
            {userEmail}
          </span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={12}
        className="w-72 rounded-[calc(var(--radius)+0.9rem)] border border-border bg-popover p-2 shadow-xl"
      >
        <div className="flex items-center gap-3 rounded-[calc(var(--radius)+0.5rem)] px-3 py-3">
          <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--radius)+0.3rem)] bg-muted">
            {user?.image ? (
              <Image
                src={user.image}
                alt={userName}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <RiUser3Line aria-hidden="true" className="size-5 text-foreground" />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-foreground">
              {userName}
            </p>
            <p className="truncate text-sm text-muted-foreground">{userEmail}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="grid grid-cols-3 gap-2 p-2">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = isMounted && theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 rounded-sm border px-2 py-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/35 hover:bg-primary/8 hover:text-primary',
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings')}
          className="cursor-pointer"
        >
          <RiSettings4Line aria-hidden="true" className="size-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => void signOut()}
          variant="destructive"
          className="cursor-pointer"
          disabled={isSigningOut}
        >
          <RiLogoutBoxLine aria-hidden="true" className="size-4" />
          <span>{isSigningOut ? 'Signing out...' : 'Logout'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
