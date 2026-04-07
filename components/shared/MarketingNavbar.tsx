'use client';

import type { MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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

interface NavbarShellProps extends MarketingNavbarProps {
  desktopIdPrefix: 'desktop' | 'floating';
  floating?: boolean;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
  onCloseMobileMenu?: () => void;
  onNavItemClick: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu?: boolean,
  ) => void;
}

const FLOATING_NAV_TOP_OFFSET = 96;
const FLOATING_NAV_REVEAL_DELTA = 16;

function getNavLinkId(
  label: string,
  variant: 'desktop' | 'mobile' | 'floating',
) {
  return `marketing-nav-${variant}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function NavbarShell({
  brandName,
  homeHref,
  items,
  signInHref,
  signInLabel,
  signUpHref,
  signUpLabel,
  desktopIdPrefix,
  floating = false,
  isMobileMenuOpen = false,
  onMobileMenuToggle,
  onCloseMobileMenu,
  onNavItemClick,
}: NavbarShellProps) {
  const desktopNavLinkClass =
    'group/navlink relative inline-flex items-center overflow-hidden rounded-sm px-2 py-1.5 text-sm font-mono font-medium text-foreground transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-[0.95rem] hover:-translate-y-0.5 hover:text-primary after:absolute after:bottom-0 after:left-2 after:right-2 after:h-px after:origin-left after:scale-x-0 after:bg-linear-to-r after:from-primary/20 after:via-primary after:to-chart-3/30 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100';
  const mobileNavLinkClass =
    'group/navlink relative flex items-center overflow-hidden rounded-sm px-2 py-2 text-sm font-mono font-medium text-foreground transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-[0.95rem] hover:text-primary active:scale-[0.99]';

  return (
    <div
      className={cn(
        'relative w-full bg-background',
        floating &&
          'rounded-2xl border border-border bg-background/92 shadow-xl backdrop-blur-md',
      )}
    >
      <div
        className={cn(
          'flex min-h-16 items-center justify-between gap-3 px-4 py-3 sm:min-h-18 sm:gap-5 sm:px-6 lg:px-8',
          floating && 'min-h-15 px-4 py-2.5 sm:min-h-16',
        )}
      >
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2 sm:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={onCloseMobileMenu}
        >
          <Logo
            size={24}
            className="text-foreground sm:size-7"
            aria-hidden="true"
          />
          <span className="text-base font-bold tracking-tight text-foreground sm:text-lg lg:text-xl">
            {brandName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {items.map((item) => (
              <li key={`${desktopIdPrefix}-${item.label}`}>
                <Link
                  href={item.href}
                  id={getNavLinkId(item.label, desktopIdPrefix)}
                  className={desktopNavLinkClass}
                  onClick={(event) => onNavItemClick(event, item.href, true)}
                >
                  <span className="relative z-10">{item.label}</span>
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
            onClick={onCloseMobileMenu}
          >
            <span>{signUpLabel}</span>
            <RiArrowRightLine
              aria-hidden="true"
              className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
            />
          </Link>

          {!floating ? (
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="marketing-navbar-mobile-menu"
              aria-label={
                isMobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon-sm' }),
                'md:hidden',
              )}
              onClick={onMobileMenuToggle}
            >
              {isMobileMenuOpen ? (
                <RiCloseLine aria-hidden="true" className="size-4" />
              ) : (
                <RiMenuLine aria-hidden="true" className="size-4" />
              )}
            </button>
          ) : null}
        </div>
      </div>

      {!floating && isMobileMenuOpen ? (
        <div
          id="marketing-navbar-mobile-menu"
          className="absolute inset-x-0 top-full z-50 border-t border-border bg-background/95 shadow-lg backdrop-blur-md md:hidden"
        >
          <nav aria-label="Mobile primary" className="px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1.5">
              {items.map((item) => (
                <li key={`mobile-${item.label}`}>
                  <Link
                    href={item.href}
                    id={getNavLinkId(item.label, 'mobile')}
                    className={mobileNavLinkClass}
                    onClick={(event) => onNavItemClick(event, item.href, true)}
                  >
                    <span className="relative z-10">{item.label}</span>
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
              onClick={onCloseMobileMenu}
            >
              <span>{signUpLabel}</span>
              <RiArrowRightLine
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
              />
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export default function MarketingNavbar(props: MarketingNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const lastScrollYRef = useRef(0);
  const upwardScrollDistanceRef = useRef(0);

  const topNavbarAnimation = useMemo(
    () =>
      shouldAnimate
        ? {
            initial: 'hidden' as const,
            animate: 'visible' as const,
            variants: {
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.06,
                },
              },
            },
          }
        : {},
    [shouldAnimate],
  );

  const topNavbarItemAnimation = useMemo(
    () =>
      shouldAnimate
        ? {
            variants: {
              hidden: { opacity: 0, y: -8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              },
            },
          }
        : {},
    [shouldAnimate],
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;

      if (currentScrollY <= FLOATING_NAV_TOP_OFFSET) {
        upwardScrollDistanceRef.current = 0;
        if (isFloatingVisible) {
          setIsFloatingVisible(false);
        }
      } else if (currentScrollY < previousScrollY) {
        upwardScrollDistanceRef.current += previousScrollY - currentScrollY;

        if (
          upwardScrollDistanceRef.current >= FLOATING_NAV_REVEAL_DELTA &&
          !isFloatingVisible
        ) {
          setIsFloatingVisible(true);
        }
      } else if (currentScrollY > previousScrollY) {
        upwardScrollDistanceRef.current = 0;
        if (isFloatingVisible) {
          setIsFloatingVisible(false);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFloatingVisible]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false,
  ) => {
    if (closeMenu) {
      closeMobileMenu();
    }

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
    <>
      <header className="relative w-full bg-background">
        <motion.div
          className="flex flex-col"
          {...topNavbarAnimation}
        >
          <motion.div {...topNavbarItemAnimation}>
            <NavbarShell
              {...props}
              desktopIdPrefix="desktop"
              isMobileMenuOpen={isMobileMenuOpen}
              onMobileMenuToggle={() =>
                setIsMobileMenuOpen((open) => !open)
              }
              onCloseMobileMenu={closeMobileMenu}
              onNavItemClick={handleNavItemClick}
            />
          </motion.div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isFloatingVisible ? (
          <motion.div
            className="pointer-events-none fixed inset-x-0 top-4 z-40 hidden px-4 md:block sm:px-6 lg:px-8"
            initial={
              shouldAnimate ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldAnimate ? { opacity: 0, y: -16 } : { opacity: 0, y: 0 }
            }
            transition={{
              duration: shouldAnimate ? 0.42 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="pointer-events-auto mx-auto max-w-7xl">
              <NavbarShell
                {...props}
                desktopIdPrefix="floating"
                floating
                onCloseMobileMenu={closeMobileMenu}
                onNavItemClick={handleNavItemClick}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
