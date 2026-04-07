import Link from 'next/link';
import { RiArrowRightLine, RiSparkling2Line } from '@remixicon/react';

import HeroComparisonCard from './HeroComparisonCard';
import HeroResultsCard from './HeroResultsCard';
import HeroStudioCard from './HeroStudioCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section className="px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-6 pt-10 text-center sm:px-10 lg:px-16 lg:pt-12">
          <div className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground shadow-xs sm:gap-2 sm:px-3 sm:text-xs">
            <RiSparkling2Line
              aria-hidden="true"
              className="size-3 text-primary sm:size-3.5"
            />
            <span>Professional lifestyle assets in seconds</span>
          </div>

          <h1 className="mt-5 max-w-6xl text-balance font-sans font-bold tracking-tight text-foreground leading-[1.05] text-4xl sm:text-5xl lg:text-7xl">
            Turn Product Photos into Pro Ad Creatives in Seconds
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            AI-powered virtual studio for e-commerce brands. No photographers,
            no studios, no hassle.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'px-5 shadow-md',
              )}
            >
              <span>Start Creating Free</span>
              <RiArrowRightLine aria-hidden="true" className="size-4" />
            </Link>

            <Link
              href="/demo"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'bg-background px-5',
              )}
            >
              <span>View Public Gallery</span>
              {/* <RiArrowRightLine aria-hidden="true" className="size-4" /> */}
            </Link>
          </div>
        </div>

        <div className="grid gap-3 border-t border-border bg-muted/30 p-3 lg:auto-rows-[28rem] lg:grid-cols-[0.82fr_1.38fr_0.92fr] lg:p-5">
          <HeroComparisonCard />
          <HeroStudioCard />
          <HeroResultsCard />
        </div>
      </div>
    </section>
  );
}
