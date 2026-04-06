import Link from 'next/link';

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
  return (
    <header className="w-full bg-background">
      <div className="flex min-h-18 items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Logo size={28} className="text-foreground" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {brandName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-base"
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
              'px-2.5 text-sm font-medium lg:text-base',
            )}
          >
            {signInLabel}
          </Link>

          <Link
            href={signUpHref}
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'px-3.5 text-sm font-medium lg:text-base',
            )}
          >
            <span>{signUpLabel}</span>
            <span aria-hidden="true" className="font-normal">
              -&gt;
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
