import Link from 'next/link';
import {
  RiArrowRightLine,
  RiFlashlightLine,
  RiGlobalLine,
  RiSparkling2Line,
} from '@remixicon/react';

import HeroComparisonCard from './HeroComparisonCard';
import Logo from '@/components/shared/Logo';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const workspaceTabs = ['Create', 'Prompt', 'Write', 'Learn', 'Code'];

export default function HeroSection() {
  return (
    <section className="px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-6 pt-10 text-center sm:px-10 lg:px-16 lg:pt-12">
          <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs">
            <RiSparkling2Line
              aria-hidden="true"
              className="size-3.5 text-primary"
            />
            <span>Reduce response time by 85%</span>
          </div>

          <h1 className="mt-5 max-w-6xl text-balance font-bold tracking-tight text-foreground leading-[1.05] text-4xl sm:text-5xl lg:text-7xl">
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

        <div className="grid gap-3 border-t border-border bg-muted/30 p-3 lg:grid-cols-[0.82fr_1.38fr_0.92fr] lg:p-5">
          <HeroComparisonCard />

          <article className="rounded-xl border border-border bg-card shadow-sm">
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Logo size={18} aria-hidden="true" />
                <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  AI writing Assistant
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-border">
                <span className="size-2 rounded-full bg-current" />
                <span className="size-2 rounded-full bg-current" />
                <span className="size-2 rounded-full bg-current" />
              </div>
            </header>

            <div className="space-y-3 p-3">
              <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  AI Generated:
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  &quot; Transform Your Body in 30 Days!
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Join thousands who&apos;ve already achieved their fitness
                  goals with our personalized workout plans.
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
                >
                  <RiSparkling2Line
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  <span>Start your free trial today!</span>
                </button>
              </div>

              <div className="rounded-xl border border-border bg-background px-4 py-3 shadow-xs">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RiGlobalLine aria-hidden="true" className="size-4" />
                  <span>Write a facebook ad for a fitness app...</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2 shadow-xs">
                <div className="flex flex-wrap items-center gap-2">
                  {workspaceTabs.map((tab, index) => (
                    <span
                      key={tab}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium',
                        index === 0
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <RiFlashlightLine
                        aria-hidden="true"
                        className={cn(
                          'size-3.5',
                          index === 0 ? 'text-primary' : '',
                        )}
                      />
                      <span>{tab}</span>
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
                >
                  <RiArrowRightLine
                    aria-hidden="true"
                    className="size-4 -rotate-45"
                  />
                </button>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-border bg-card shadow-sm">
            <header className="border-b border-border px-5 py-4">
              <h2 className="text-left text-sm font-semibold tracking-tight text-foreground sm:text-base">
                Chat with us in AI Support
              </h2>
            </header>

            <div className="space-y-5 px-5 py-6">
              <div className="space-y-1 text-left">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Customer
                  </span>
                  <span className="ml-2">10:30 AM</span>
                </div>
                <p className="text-sm text-foreground">Hello! How are you?</p>
              </div>

              <div className="ml-auto max-w-[12rem] rounded-lg bg-muted px-4 py-3 text-left shadow-xs">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    AI Assistant
                  </span>
                  <span className="ml-2">10:30 AM</span>
                </div>
                <p className="mt-1 text-sm text-foreground">
                  I&apos;m fine! Can I help you?
                </p>
              </div>

              <div className="space-y-1 text-left">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Customer
                  </span>
                  <span className="ml-2">10:30 AM</span>
                </div>
                <p className="text-sm text-foreground">
                  It says my password is incorrect
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
