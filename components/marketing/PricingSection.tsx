import Link from 'next/link';
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
  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/10 via-background to-background" />
      <div className="absolute left-1/2 top-16 -z-10 h-44 w-[min(64rem,88vw)] -translate-x-1/2 rounded-full bg-primary/7 blur-3xl" />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Pricing Tiers
            </p>
            <h2 className="mt-3 max-w-3xl text-balance text-[2rem] font-sans font-bold leading-[1.02] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.5rem]">
              Subscription pricing with crystal clear limits.
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
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
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-[0.9fr_1.35fr]">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
