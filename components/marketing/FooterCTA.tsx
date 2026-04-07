import Link from 'next/link';
import {
  RiAddLine,
  RiArrowRightUpLine,
  RiCheckboxCircleFill,
  RiSparkling2Line,
} from '@remixicon/react';

import { buttonVariants } from '@/components/ui/button-variants';
import Logo from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

export default function FooterCTA() {
  return (
    <footer className="mt-20 w-full px-4 pb-8 sm:px-6 lg:px-8">
      {/* CTA Banner */}
      <div className="relative mx-auto overflow-hidden rounded-4xl bg-primary px-6 py-16 shadow-xl sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        {/* Decorative Abstract Shapes matching the image */}
        <div className="pointer-events-none absolute inset-0">
          {/* Huge Faded Background Text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[10rem] font-bold leading-none tracking-tighter font-mono text-primary-foreground/[0.05] sm:text-[12rem] lg:text-[18rem]">
            AdShot AI
          </div>

          {/* Top Left Shape */}
          <div className="absolute -left-16 -top-16 size-64 rounded-full bg-primary-foreground/10" />

          {/* Bottom Left Shape */}
          <div className="absolute -bottom-16 -left-16 size-56 rounded-tr-full bg-primary-foreground/10" />

          {/* Top Right Shape */}
          <div className="absolute -right-24 -top-24 size-80 rounded-bl-full bg-primary-foreground/10" />

          {/* Bottom Right Shape */}
          <div className="absolute -bottom-32 -right-16 size-88 rounded-tl-[10rem] bg-primary-foreground/10" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Icon (Dark rounded square with plus) */}
          <div className="mb-8 flex size-14 items-center justify-center rounded-sm bg-background shadow-md">
            <Logo size={32} className="text-background" aria-hidden="true" />
          </div>

          {/* Main Copy */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <h2 className="text-center text-3xl font-sans font-bold tracking-tight text-primary-foreground/90 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Turn One Product Photo
            </h2>
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left">
              <span className="text-3xl font-sans font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Into Campaign-Ready Assets
              </span>
              <Link
                href="/auth"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'shrink-0 rounded-sm bg-background px-6 font-semibold text-foreground shadow-sm hover:bg-background/90',
                )}
              >
                Get Started Free
                <RiArrowRightUpLine
                  className="ml-1.5 size-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Benefits List */}
          <ul className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 text-sm font-medium text-primary-foreground/80">
            <li className="flex items-center gap-2">
              <RiCheckboxCircleFill
                className="size-4.5 text-background"
                aria-hidden="true"
              />
              No upfront payment
            </li>
            <li className="flex items-center gap-2">
              <RiCheckboxCircleFill
                className="size-4.5 text-background"
                aria-hidden="true"
              />
              Easily cancellation
            </li>
          </ul>
        </div>
      </div>

      {/* Simple Footer */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
        <div className="flex items-center gap-2 font-bold tracking-tight text-foreground">
          <Logo size={32} className="text-background" aria-hidden="true" />
          <span>AdShot AI</span>
        </div>
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} AdShot AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
