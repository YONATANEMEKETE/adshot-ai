'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiImageCircleLine,
  RiSettings4Line,
  RiSparkling2Line,
  RiUser3Line,
} from '@remixicon/react';

import Logo from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

const dashboardNavItems = [
  {
    href: '/dashboard/my-studio',
    label: 'My Studio',
    icon: RiSparkling2Line,
  },
  {
    href: '/dashboard/my-shots',
    label: 'My Shots',
    icon: RiImageCircleLine,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: RiSettings4Line,
  },
] as const;

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-row items-center justify-between gap-4 px-4 py-3 md:sticky md:top-0 md:h-[100dvh] md:w-24 md:flex-col md:px-0 md:py-4">
      <Link
        href="/dashboard"
        className="inline-flex size-12 items-center justify-center rounded-[calc(var(--radius)+0.4rem)] bg-secondary text-foreground shadow-sm transition-transform hover:scale-[1.02]"
        aria-label="Go to dashboard home"
      >
        <Logo size={28} className="text-foreground" aria-hidden="true" />
      </Link>

      <nav
        aria-label="Dashboard"
        className="flex flex-1 items-center justify-center md:w-full"
      >
        <ul className="flex flex-row items-center gap-2 md:flex-col md:gap-3">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex size-12 items-center justify-center rounded-[calc(var(--radius)+0.35rem)] border bg-card shadow-sm transition-all duration-200 hover:shadow-md',
                    isActive
                      ? 'translate-x-1.5 border-primary bg-primary text-primary-foreground shadow-md hover:border-primary hover:bg-primary hover:text-primary-foreground'
                      : 'border-border text-muted-foreground hover:translate-x-0.5 hover:border-primary/35 hover:bg-primary/8 hover:text-primary',
                  )}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      'size-5 transition-all duration-200 group-hover:scale-105',
                      isActive
                        ? 'text-primary-foreground'
                        : 'group-hover:text-primary',
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        className="group flex size-12 items-center justify-center rounded-[calc(var(--radius)+0.35rem)] border border-border bg-card text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/8 hover:text-primary hover:shadow-md"
      >
        <RiUser3Line
          aria-hidden="true"
          className="size-5 transition-all duration-200 group-hover:scale-105 group-hover:text-primary"
        />
        <span className="sr-only">User profile</span>
      </button>
    </aside>
  );
}
