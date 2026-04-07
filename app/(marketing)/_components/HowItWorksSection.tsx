'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  RiGalleryView2,
  RiImageAddLine,
  RiSparkling2Line,
} from '@remixicon/react';

import HowItWorksCard, { type HowItWorksCardProps } from './HowItWorksCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const steps: HowItWorksCardProps[] = [
  {
    title: 'Upload - Product',
    description:
      'Drop in a flat product photo and AdShot AI isolates it for your virtual studio workflow.',
    icon: RiImageAddLine,
    iconClassName:
      'bg-linear-to-br from-primary via-chart-3 to-chart-4 text-primary-foreground',
    accentClassName: 'bg-primary/30',
    patternElements: (
      <>
        {/* Scattered Grid Squares */}
        <div className="absolute left-0 top-0 h-8 w-8 rounded-sm bg-primary/10" />
        <div className="absolute left-32 top-0 h-8 w-8 rounded-sm bg-chart-4/20" />
        <div className="absolute left-72 top-0 h-8 w-8 rounded-sm bg-primary/20" />
        <div className="absolute left-16 top-8 h-8 w-8 rounded-sm bg-primary/30" />
        <div className="absolute left-48 top-8 h-8 w-8 rounded-sm bg-primary/10" />
        <div className="absolute left-8 top-16 h-8 w-8 rounded-sm bg-primary/20" />
        <div className="absolute left-64 top-16 h-8 w-8 rounded-sm bg-chart-4/10" />
        <div className="absolute left-24 top-24 h-8 w-8 rounded-sm bg-primary/20" />
        <div className="absolute left-56 top-24 h-8 w-8 rounded-sm bg-primary/10" />
        <div className="absolute left-40 top-32 h-8 w-8 rounded-sm bg-primary/20" />
      </>
    ),
  },
  {
    title: 'Style - Scene',
    description:
      'Choose theme, richness, vibe context, and orientation to shape the final lifestyle setup.',
    icon: RiSparkling2Line,
    iconClassName:
      'bg-linear-to-br from-primary via-accent to-chart-2 text-primary-foreground',
    accentClassName: 'bg-accent/30',
    patternElements: (
      <>
        {/* Scattered Grid Squares */}
        <div className="absolute left-16 top-0 h-8 w-8 rounded-sm bg-accent/20" />
        <div className="absolute left-56 top-0 h-8 w-8 rounded-sm bg-chart-2/10" />
        <div className="absolute left-0 top-8 h-8 w-8 rounded-sm bg-primary/20" />
        <div className="absolute left-40 top-8 h-8 w-8 rounded-sm bg-accent/30" />
        <div className="absolute left-80 top-8 h-8 w-8 rounded-sm bg-primary/10" />
        <div className="absolute left-24 top-16 h-8 w-8 rounded-sm bg-accent/10" />
        <div className="absolute left-64 top-16 h-8 w-8 rounded-sm bg-chart-2/20" />
        <div className="absolute left-8 top-24 h-8 w-8 rounded-sm bg-accent/20" />
        <div className="absolute left-48 top-24 h-8 w-8 rounded-sm bg-primary/20" />
        <div className="absolute left-32 top-32 h-8 w-8 rounded-sm bg-accent/20" />
      </>
    ),
  },
  {
    title: 'Deliver - Assets',
    description:
      'Generate polished variations to upscale, download, remix, or publish to your public gallery.',
    icon: RiGalleryView2,
    iconClassName:
      'bg-linear-to-br from-chart-3 via-primary to-accent text-primary-foreground',
    accentClassName: 'bg-chart-3/30',
    patternElements: (
      <>
        {/* Scattered Grid Squares */}
        <div className="absolute left-8 top-0 h-8 w-8 rounded-sm bg-chart-3/20" />
        <div className="absolute left-48 top-0 h-8 w-8 rounded-sm bg-primary/10" />
        <div className="absolute left-24 top-8 h-8 w-8 rounded-sm bg-primary/20" />
        <div className="absolute left-64 top-8 h-8 w-8 rounded-sm bg-chart-3/20" />
        <div className="absolute left-0 top-16 h-8 w-8 rounded-sm bg-chart-3/30" />
        <div className="absolute left-40 top-16 h-8 w-8 rounded-sm bg-primary/20" />
        <div className="absolute left-80 top-16 h-8 w-8 rounded-sm bg-chart-3/10" />
        <div className="absolute left-16 top-24 h-8 w-8 rounded-sm bg-primary/10" />
        <div className="absolute left-56 top-24 h-8 w-8 rounded-sm bg-chart-3/20" />
        <div className="absolute left-32 top-32 h-8 w-8 rounded-sm bg-primary/20" />
      </>
    ),
  },
];

export default function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const containerAnimation = shouldAnimate
    ? {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.35 },
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.06,
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
  const cardsContainerAnimation = shouldAnimate
    ? {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.08,
            },
          },
        },
      }
    : {};
  const cardItemAnimation = shouldAnimate
    ? {
        variants: {
          hidden: { opacity: 0, y: 22 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1] as const,
            },
          },
        },
      }
    : {};

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-18"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted/20" />
      <div className="absolute inset-x-0 top-16 -z-10 mx-auto h-64 w-[min(72rem,92vw)] rounded-full bg-primary/6 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <motion.div className="max-w-[44rem]" {...containerAnimation}>
          <motion.div
            className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur"
            {...itemAnimation}
          >
            <RiSparkling2Line
              aria-hidden="true"
              className="size-3.5 text-primary"
            />
            <span>How it Works</span>
          </motion.div>

          <motion.h2
            className="mt-4 max-w-3xl text-balance text-[2.25rem] font-sans font-bold leading-[1.08] tracking-tight text-foreground sm:text-[2.7rem] lg:text-[3.35rem]"
            {...itemAnimation}
          >
            Turn one product photo
            <br />
            <span className="bg-linear-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              into campaign-ready assets.
            </span>
          </motion.h2>

          <motion.p
            className="mt-4 max-w-lg text-balance text-sm leading-6 text-muted-foreground sm:text-base"
            {...itemAnimation}
          >
            Upload your product, guide the creative direction, and generate
            polished lifestyle visuals without organizing a studio shoot.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col items-start gap-3 sm:flex-row"
            {...itemAnimation}
          >
            <Link
              href="/auth"
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'px-6 font-semibold shadow-md',
              )}
            >
              Try for free!
            </Link>

            <Link
              href="/gallery"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'bg-background px-6 font-semibold',
              )}
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden"
          {...cardsContainerAnimation}
        >
          <motion.div {...cardItemAnimation}>
            <HowItWorksCard {...steps[0]} />
          </motion.div>

          <motion.div {...cardItemAnimation}>
            <HowItWorksCard {...steps[1]} />
          </motion.div>

          <motion.div {...cardItemAnimation}>
            <HowItWorksCard {...steps[2]} />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-8 hidden min-h-[36rem] lg:block lg:pt-20 xl:min-h-[42rem] xl:pt-32"
          {...cardsContainerAnimation}
        >
          <motion.div className="w-[calc((100%-4rem)/3)]" {...cardItemAnimation}>
            <HowItWorksCard {...steps[0]} />
          </motion.div>

          <motion.div
            className="absolute left-[calc(33.333%+1rem)] top-[-.25rem] w-[calc((100%-4rem)/3)]"
            {...cardItemAnimation}
          >
            <HowItWorksCard {...steps[1]} />
          </motion.div>

          <motion.div
            className="absolute right-0 top-[-6rem] w-[calc((100%-4rem)/3)]"
            {...cardItemAnimation}
          >
            <HowItWorksCard {...steps[2]} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
