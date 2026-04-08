'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { RiArrowRightLine, RiSparkling2Line } from '@remixicon/react';

import HeroComparisonCard from './HeroComparisonCard';
import HeroResultsCard from './HeroResultsCard';
import HeroStudioCard from './HeroStudioCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const sectionAnimation = shouldAnimate
    ? {
        initial: { opacity: 0, y: 24 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }
    : {};
  const containerAnimation = shouldAnimate
    ? {
        initial: 'hidden' as const,
        animate: 'visible' as const,
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.08,
            },
          },
        },
      }
    : {};
  const itemAnimation = shouldAnimate
    ? {
        variants: {
          hidden: { opacity: 0, y: 18 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1] as const,
            },
          },
        },
      }
    : {};

  return (
    <section className="px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12">
      <motion.div
        className="overflow-hidden rounded-xl border border-border bg-card"
        {...sectionAnimation}
      >
        <motion.div
          className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-6 pt-10 text-center sm:px-10 lg:px-16 lg:pt-12"
          {...containerAnimation}
        >
          <motion.div
            className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground shadow-xs sm:gap-2 sm:px-3 sm:text-xs"
            {...itemAnimation}
          >
            <RiSparkling2Line
              aria-hidden="true"
              className="size-3 text-primary sm:size-3.5"
            />
            <span>Professional lifestyle assets in seconds</span>
          </motion.div>

          <motion.h1
            className="mt-5 max-w-6xl text-balance text-4xl font-sans font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-7xl"
            {...itemAnimation}
          >
            Turn Product Photos into Pro Ad Creatives in Seconds
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
            {...itemAnimation}
          >
            AI-powered virtual studio for e-commerce brands. No photographers,
            no studios, no hassle.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
            {...itemAnimation}
          >
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'px-5 shadow-md',
              )}
            >
              <span>Start Creating Free</span>
              <RiArrowRightLine
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
              />
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
          </motion.div>
        </motion.div>

        <div className="grid gap-3 border-t border-border bg-muted/30 p-3 lg:auto-rows-[28rem] lg:grid-cols-[0.82fr_1.38fr_0.92fr] lg:p-5">
          <HeroComparisonCard />
          <HeroStudioCard />
          <HeroResultsCard />
        </div>
      </motion.div>
    </section>
  );
}
