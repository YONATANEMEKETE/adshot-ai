'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { RiArrowRightLine } from '@remixicon/react';

import SectionWrapper from '@/components/shared/SectionWrapper';
import PricingCard, {
  type PricingTier,
} from '@/components/marketing/PricingCard';

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    description: 'Perfect for testing the magic',
    monthlyPrice: '$0',
    summary:
      'Explore the studio, generate a few polished shots, and see if AdShot AI fits your workflow.',
    ctaLabel: 'Start Creating Free',
    ctaHref: '/auth',
    disclaimer: 'No credit card required  Cancel anytime',
    features: [
      { label: '5 AI-generated shots / month', included: true },
      {
        label: 'All themes: Minimal, Natural, Urban, Seasonal',
        included: true,
      },
      { label: 'Basic background removal', included: true },
      { label: 'Standard resolution downloads (1080px)', included: true },
      { label: 'Access to Public Gallery', included: true },
      { label: 'No upscaling', included: false },
      { label: 'No bulk download', included: false },
      { label: 'No BYOK support', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For creators who ship daily',
    monthlyPrice: '$12',
    yearlyNote: 'or $190/yr  save 2 months',
    summary:
      'Scale daily creative output with faster generation, export controls, and licensing built for real campaigns.',
    ctaLabel: 'Start with Pro',
    ctaHref: '/auth',
    badge: 'Most Popular',
    featuresLead: 'All Free features, plus:',
    featured: true,
    features: [
      { label: '100 AI-generated shots / month', included: true },
      { label: 'Priority generation (faster queue)', included: true },
      { label: 'HD upscaling (4K-ready exports)', included: true },
      { label: 'Bulk download (all variations at once)', included: true },
      { label: 'Commercial license (use in ads, client work)', included: true },
      {
        label: 'Visibility controls: mark shots public/private',
        included: true,
      },
      { label: 'Bring Your Own Key (BYOK) support', included: true },
      { label: 'Early access to new themes & features', included: true },
    ],
  },
];

export default function PricingSection() {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const introAnimation = shouldAnimate
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
  const cardsAnimation = shouldAnimate
    ? {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.14,
              delayChildren: 0.08,
            },
          },
        },
      }
    : {};
  const cardItemAnimation = shouldAnimate
    ? {
        variants: {
          hidden: { opacity: 0, y: 24 },
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
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/10 via-background to-background" />
      <div className="absolute left-1/2 top-16 -z-10 h-44 w-[min(64rem,88vw)] -translate-x-1/2 rounded-full bg-primary/7 blur-3xl" />

      <SectionWrapper>
        <motion.div
          className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start"
          {...introAnimation}
        >
          <motion.div className="max-w-3xl" {...itemAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Pricing Tiers
            </p>
            <h2 className="mt-3 max-w-3xl text-balance text-[2rem] font-sans font-bold leading-[1.02] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.5rem]">
              Subscription pricing with crystal clear limits.
            </h2>
          </motion.div>

          <motion.div className="max-w-md lg:justify-self-end" {...itemAnimation}>
            <p className="text-[0.95rem] leading-6 text-muted-foreground sm:text-base">
              Start free, upgrade when you need faster output, sharper exports,
              and usage rights built for shipping creative work every day.
            </p>
            <Link
              href="/auth"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Start Free
              <RiArrowRightLine aria-hidden="true" className="size-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-4 lg:grid-cols-[0.9fr_1.35fr]"
          {...cardsAnimation}
        >
          {pricingTiers.map((tier) => (
            <motion.div key={tier.name} {...cardItemAnimation}>
              <PricingCard tier={tier} />
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
