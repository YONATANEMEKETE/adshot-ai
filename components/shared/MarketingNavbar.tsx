'use client';

import type { MouseEvent } from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiArrowRightLine,
  RiCloseLine,
  RiMenuLine,
} from '@remixicon/react';

import Logo from '@/components/shared/Logo';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

interface MarketingNavItem {
  href: string;
  label: string;
}

interface MarketingNavbarProps {
  brandName: string;
  homeHref: string;
  items: MarketingNavItem[];
  signInHref: string;
  signInLabel: string;
  signUpHref: string;
  signUpLabel: string;
}

export default function MarketingNavbar({
  brandName,
  homeHref,
  items,
  signInHref,
  signInLabel,
  signUpHref,
  signUpLabel,
}: MarketingNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getNavLinkId = (label: string, variant: 'desktop' | 'mobile') =>
    `marketing-nav-${variant}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  const handleNavItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsMobileMenuOpen(false);

    const isHashLink = href.startsWith('/#') || href.startsWith('#');
    if (!isHashLink) {
      return;
    }

    const hash = href.startsWith('/#') ? href.slice(2) : href.slice(1);
    if (!hash || pathname !== '/') {
      return;
    }

    const target = document.getElementById(hash);
    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, '', `/#${hash}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="relative w-full bg-background">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3 sm:min-h-18 sm:gap-5 sm:px-6 lg:px-8">
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2 sm:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Logo size={24} className="text-foreground sm:size-7" aria-hidden="true" />
          <span className="text-base font-bold tracking-tight text-foreground sm:text-lg lg:text-xl">
            {brandName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  id={getNavLinkId(item.label, 'desktop')}
                  className="text-sm font-mono font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-[0.95rem]"
                  onClick={(event) => handleNavItemClick(event, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={signInHref}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'hidden px-2.5 text-sm font-medium md:inline-flex lg:text-[0.95rem]',
            )}
          >
            {signInLabel}
          </Link>

          <Link
            href={signUpHref}
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'px-3 text-xs font-medium sm:px-3.5 sm:text-sm lg:text-[0.95rem]',
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>{signUpLabel}</span>
            <RiArrowRightLine aria-hidden="true" className="size-4" />
          </Link>

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="marketing-navbar-mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon-sm' }),
              'md:hidden',
            )}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <RiCloseLine aria-hidden="true" className="size-4" />
            ) : (
              <RiMenuLine aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="marketing-navbar-mobile-menu"
          className="absolute inset-x-0 top-full z-50 border-t border-border bg-background/95 shadow-lg backdrop-blur-md md:hidden"
        >
          <nav aria-label="Mobile primary" className="px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1.5">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    id={getNavLinkId(item.label, 'mobile')}
                    className="flex items-center rounded-sm px-2 py-2 text-sm font-mono font-medium text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-[0.95rem]"
                    onClick={(event) => handleNavItemClick(event, item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={signUpHref}
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'mt-4 w-full justify-center text-sm font-medium',
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{signUpLabel}</span>
              <RiArrowRightLine aria-hidden="true" className="size-4" />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
