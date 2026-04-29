'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiImageCircleLine,
  RiSettings4Line,
  RiSparkling2Line,
} from '@remixicon/react';

import DashboardUserAvatar from '@/components/dashboard/DashboardUserAvatar';
import Logo from '@/components/shared/Logo';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
      <div
        className="inline-flex size-12 items-center justify-center rounded-sm bg-background text-foreground shadow-md"
        aria-hidden="true"
      >
        <Logo size={28} className="text-background" aria-hidden="true" />
      </div>

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
                <Tooltip>
                  <TooltipTrigger render={<Link href={item.href} />}>
                    <span
                      className={cn(
                        'group flex size-12 items-center justify-center rounded-[calc(var(--radius)+0.35rem)] border bg-card shadow-sm transition-all duration-200 hover:shadow-md',
                        isActive
                          ? 'translate-x-1.5 border-primary bg-primary text-primary-foreground shadow-md hover:border-primary hover:bg-primary hover:text-primary-foreground'
                          : 'border-border text-muted-foreground hover:translate-x-0.5 hover:border-primary/35 hover:bg-primary/8 hover:text-primary',
                      )}
                      aria-label={item.label}
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
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>

      <DashboardUserAvatar />
    </aside>
  );
}
