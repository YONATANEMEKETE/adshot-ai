import {
  RiCheckboxCircleFill,
  RiExpandUpDownLine,
  RiLandscapeLine,
  RiMagicLine,
  RiSparkling2Line,
  RiStackLine,
} from '@remixicon/react';

import { cn } from '@/lib/utils';

const themes = ['Minimal', 'Natural', 'Urban', 'Seasonal'] as const;
const richness = ['Minimal', 'Balanced', 'Rich'] as const;
const outputs = ['Square', 'Portrait', 'Landscape'] as const;

export default function HeroStudioCard() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <header className="flex items-center justify-between border-b border-border px-4 py-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Virtual Studio
          </p>
          <h2 className="mt-1 text-sm font-semibold tracking-tight text-foreground">
            Build the scene fast
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <RiSparkling2Line
            aria-hidden="true"
            className="size-3.5 text-primary"
          />
          Prompt Assist
        </div>
      </header>

      <div className="flex-1 space-y-2.5 overflow-y-auto p-3 py-2">
        <div className="rounded-xl border border-border bg-background p-3 shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Upload
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                ceramic-bottle-front.png
              </p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-sm bg-accent px-2 py-1 text-[11px] font-medium text-accent-foreground">
              <RiCheckboxCircleFill
                aria-hidden="true"
                className="size-3.5 text-primary"
              />
              Ready
            </div>
          </div>
        </div>

        <div className="grid gap-2.5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Theme
              </p>
              <RiMagicLine aria-hidden="true" className="size-4 text-primary" />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {themes.map((theme) => (
                <span
                  key={theme}
                  className={cn(
                    'rounded-sm border px-2 py-1 text-[11px] font-medium',
                    theme === 'Natural'
                      ? 'border-primary bg-accent text-accent-foreground'
                      : 'border-border bg-card text-muted-foreground',
                  )}
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-3 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Scene Richness
              </p>
              <RiStackLine aria-hidden="true" className="size-4 text-primary" />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {richness.map((level) => (
                <div
                  key={level}
                  className={cn(
                    'flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] font-medium',
                    level === 'Balanced'
                      ? 'border-primary bg-accent text-accent-foreground'
                      : 'border-border bg-card text-muted-foreground',
                  )}
                >
                  <span>{level}</span>
                  {level === 'Balanced' ? (
                    <RiCheckboxCircleFill
                      aria-hidden="true"
                      className="size-3.5 text-primary"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2.5 md:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-xl border border-border bg-background p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Vibe Context
              </p>
              <RiSparkling2Line
                aria-hidden="true"
                className="size-4 text-primary"
              />
            </div>
            <div className="mt-2.5 rounded-lg border border-border bg-card px-3 py-2.5">
              <p className="text-xs text-foreground">
                coffee shop morning, soft sunlight
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Output
              </p>
              <RiLandscapeLine
                aria-hidden="true"
                className="size-4 text-primary"
              />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {outputs.map((format) => (
                <div
                  key={format}
                  className={cn(
                    'rounded-sm border px-2 py-1 text-[11px] font-medium',
                    format === 'Portrait'
                      ? 'border-primary bg-accent text-accent-foreground'
                      : 'border-border bg-card text-muted-foreground',
                  )}
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5 shadow-xs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Generation Queue
            </p>
            <p className="mt-1 text-xs font-medium text-foreground">
              3 variations queued
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-2.5 py-1.5 text-[11px] font-medium text-primary-foreground">
            <RiExpandUpDownLine aria-hidden="true" className="size-4" />
            Generating
          </div>
        </div>
      </div>
    </article>
  );
}
