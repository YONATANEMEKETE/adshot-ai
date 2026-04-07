import Link from 'next/link';
import {
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiCloseCircleLine,
} from '@remixicon/react';

import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export type PricingFeature = {
  label: string;
  included: boolean;
};

export type PricingTier = {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyNote?: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
  disclaimer?: string;
  badge?: string;
  featuresLead?: string;
  features: PricingFeature[];
  featured?: boolean;
};

export default function PricingCard({ tier }: { tier: PricingTier }) {
  const isFeatured = tier.featured;

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-[calc(var(--radius)+0.9rem)] border p-5 shadow-sm sm:p-6',
        isFeatured
          ? 'border-foreground/10 bg-foreground text-background shadow-xl'
          : 'border-border bg-muted/35 text-foreground',
      )}
    >
      <div className="flex min-h-[8.5rem] flex-col">
        {tier.badge ? (
          <div className="mb-4 inline-flex w-fit rounded-sm border border-background/20 bg-background/5 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-background/80">
            {tier.badge}
          </div>
        ) : null}

        <div className="space-y-2.5">
          <h3 className="text-2xl font-sans font-bold tracking-tight leading-none sm:text-[1.75rem]">
            {tier.name}
          </h3>
          <p
            className={cn(
              'max-w-sm text-[0.92rem] leading-5',
              isFeatured ? 'text-background/72' : 'text-muted-foreground',
            )}
          >
            {tier.description}
          </p>
          <p
            className={cn(
              'max-w-md text-[0.92rem] leading-5',
              isFeatured ? 'text-background/72' : 'text-muted-foreground',
            )}
          >
            {tier.summary}
          </p>
        </div>
      </div>

      <div
        className={cn(
          'mt-6 border-y py-6',
          isFeatured ? 'border-background/12' : 'border-border',
        )}
      >
        {tier.featuresLead ? (
          <p className="mb-4 text-[0.92rem] font-medium text-background/80">
            {tier.featuresLead}
          </p>
        ) : null}

        <ul
          className={cn(
            'grid gap-3 text-[0.92rem] leading-5',
            isFeatured ? 'md:grid-cols-2 md:gap-x-5 md:gap-y-3' : '',
          )}
        >
          {tier.features.map((feature) => {
            const Icon = feature.included
              ? RiCheckboxCircleFill
              : RiCloseCircleLine;

            return (
              <li
                key={feature.label}
                className={cn(
                  'flex items-start gap-3',
                  feature.included
                    ? isFeatured
                      ? 'text-background/92'
                      : 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                <Icon
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 size-3.5 shrink-0',
                    feature.included
                      ? 'text-primary'
                      : isFeatured
                        ? 'text-background/35'
                        : 'text-muted-foreground/70',
                  )}
                />
                <span>{feature.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-end gap-2">
            <span className="text-[1.75rem] font-bold tracking-tight leading-none">
              {tier.monthlyPrice}
            </span>
            <span
              className={cn(
                'pb-0.5 text-sm',
                isFeatured ? 'text-background/60' : 'text-muted-foreground',
              )}
            >
              /mo
            </span>
          </div>
          {/* {tier.yearlyNote ? (
            <p className="mt-1.5 text-[0.92rem] text-background/60">
              {tier.yearlyNote}
            </p>
          ) : null} */}
          {/* {tier.disclaimer ? (
            <p
              className={cn(
                'mt-2 text-[0.92rem]',
                isFeatured ? 'text-background/60' : 'text-muted-foreground',
              )}
            >
              {tier.disclaimer}
            </p>
          ) : null} */}
        </div>

        <Link
          href={tier.ctaHref}
          className={cn(
            buttonVariants({ size: 'lg' }),
            'min-w-[10rem] rounded-sm px-4 text-sm font-semibold shadow-none',
            isFeatured
              ? 'bg-primary text-primary-foreground hover:bg-primary/85'
              : 'bg-foreground text-background hover:bg-foreground/90',
          )}
        >
          <span>{tier.ctaLabel}</span>
          <RiArrowRightLine aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
