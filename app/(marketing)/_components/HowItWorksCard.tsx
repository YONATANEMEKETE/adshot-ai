import type { RemixiconComponentType } from '@remixicon/react';
import React, { useId } from 'react';

import { cn } from '@/lib/utils';

export interface HowItWorksCardProps {
  title: string;
  description: string;
  icon: RemixiconComponentType;
  iconClassName: string;
  cardClassName?: string;
  accentClassName: string;
  patternElements?: React.ReactNode;
}

export default function HowItWorksCard({
  title,
  description,
  icon: Icon,
  iconClassName,
  cardClassName,
  accentClassName,
  patternElements,
}: HowItWorksCardProps) {
  const patternId = useId();

  return (
    <article
      className={cn(
        'group relative aspect-[4/4.25] overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-border bg-card transition-transform duration-300',
        'min-h-[19rem] sm:min-h-[21rem] lg:min-h-[22rem]',
        cardClassName,
      )}
    >
      {/* Top half with grid */}
      <div className="relative h-44 overflow-hidden border-b border-border bg-linear-to-b from-muted/30 to-background/50">
        {/* Grid and Pattern Elements Wrapper */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, white 40%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, white 40%, transparent)',
          }}
        >
          {/* Pattern Elements (Colored squares) */}
          {patternElements}

          {/* Grid Background */}
          <svg className="absolute inset-0 h-full w-full opacity-60">
            <defs>
              <pattern
                id={patternId}
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="31"
                  height="31"
                  rx="3"
                  fill="none"
                  stroke="color-mix(in oklab, var(--border) 60%, transparent)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </div>

        {/* Center Fanned Cards Icon */}
        <div className="absolute left-1/2 top-[56%] z-10 -translate-x-1/2 -translate-y-1/2">
          {/* Glow */}
          <div
            className={cn(
              'absolute inset-0 blur-2xl opacity-50',
              accentClassName,
            )}
          />

          <div className="relative h-12 w-16">
            {/* Back Left */}
            <div className="absolute inset-0 -rotate-12 scale-95 rounded-xl border border-border/60 bg-background/80 shadow-[0_4px_24px_hsl(var(--background))] backdrop-blur-sm transition-transform duration-500 group-hover:-rotate-18 group-hover:scale-100" />

            {/* Back Right */}
            <div className="absolute inset-0 rotate-12 scale-95 rounded-xl border border-border/60 bg-background/80 shadow-[0_4px_24px_hsl(var(--background))] backdrop-blur-sm transition-transform duration-500 group-hover:rotate-18 group-hover:scale-100" />

            {/* Front */}
            <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-border bg-background shadow-[0_4px_24px_hsl(var(--background))] transition-transform duration-500 group-hover:-translate-y-1">
              <div
                className={cn(
                  'flex size-8 items-center justify-center rounded-[10px]',
                  iconClassName,
                )}
              >
                <Icon aria-hidden="true" className="size-4.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom half text */}
      <div className="flex flex-col items-center px-5 pb-6 pt-5 text-center">
        <h3 className="text-base font-sans font-bold tracking-tight text-foreground sm:text-[1.05rem]">
          {title}
        </h3>
        <p className="mt-2.5 max-w-[15rem] text-sm leading-5.5 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}
