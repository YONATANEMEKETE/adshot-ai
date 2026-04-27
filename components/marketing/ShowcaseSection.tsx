'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { RiArrowRightLine, RiSparkling2Line } from '@remixicon/react';

import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { useAuthDialogStore } from '@/lib/stores/use-auth-dialog-store';
import { cn } from '@/lib/utils';

type ShowcaseCard = {
  title: string;
  theme: string;
  vibe: string;
  src: string;
  alt: string;
  aspectClass: string;
};

const showcaseColumns: ShowcaseCard[][] = [
  [
    {
      title: 'Citrus Serum Launch',
      theme: 'Minimal',
      vibe: 'Soft daylight shelf',
      src: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
      alt: 'A skincare bottle centered on a clean softly lit background.',
      aspectClass: 'aspect-[4/3]',
    },
    {
      title: 'Amber Bottle Edit',
      theme: 'Natural',
      vibe: 'Warm stone backdrop',
      src: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80',
      alt: 'An amber skincare bottle placed at the center of a warm natural product scene.',
      aspectClass: 'aspect-[4/5]',
    },
    {
      title: 'Desert Candle Hero',
      theme: 'Seasonal',
      vibe: 'Golden dune mood',
      src: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
      alt: 'A candle product centered against a warm editorial background.',
      aspectClass: 'aspect-[3/4]',
    },
  ],
  [
    {
      title: 'Cloud Cream Campaign',
      theme: 'Minimal',
      vibe: 'Powder blue glow',
      src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
      alt: 'A cosmetic cream jar centered in a light studio composition.',
      aspectClass: 'aspect-[3/4]',
    },
    {
      title: 'Rose Gloss Feature',
      theme: 'Urban',
      vibe: 'Studio pink edit',
      src: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=900&q=80',
      alt: 'A beauty product centered against a pink editorial studio background.',
      aspectClass: 'aspect-[4/5]',
    },
    {
      title: 'Botanical Drop',
      theme: 'Natural',
      vibe: 'Fresh green shelf',
      src: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      alt: 'A skincare bottle centered with botanical styling around it.',
      aspectClass: 'aspect-[4/3]',
    },
  ],
  [
    {
      title: 'Shadow Bottle Frame',
      theme: 'Urban',
      vibe: 'High contrast launch',
      src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      alt: 'A bottle product centered in a dramatic high-contrast composition.',
      aspectClass: 'aspect-[4/3]',
    },
    {
      title: 'Coffee Bag Story',
      theme: 'Seasonal',
      vibe: 'Morning cafe warmup',
      src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      alt: 'A coffee product centered in a warm cafe-inspired scene.',
      aspectClass: 'aspect-[4/5]',
    },
    {
      title: 'Ocean Mist Set',
      theme: 'Minimal',
      vibe: 'Cool reflective surface',
      src: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
      alt: 'A cosmetic bottle centered on a cool-toned reflective background.',
      aspectClass: 'aspect-[3/4]',
    },
  ],
];

function ShowcaseTile({
  card,
  priority = false,
}: {
  card: ShowcaseCard;
  priority?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-[calc(var(--radius)+0.65rem)] border border-border/80 bg-card p-1.5 shadow-sm">
      <div className="relative overflow-hidden rounded-[calc(var(--radius)+0.35rem)]">
        <div className={cn('relative', card.aspectClass)}>
          <Image
            src={card.src}
            alt={card.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 26vw, 42vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/22 via-transparent to-background/12" />
      </div>

      <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-2">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Theme: {card.theme}
          </p>
          <p className="mt-1 truncate text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
            {card.vibe}
          </p>
        </div>
      </div>
    </article>
  );
}

function ShowcaseColumn({
  cards,
  duration,
  reverse,
  reducedMotion,
  priorityOffset = 0,
}: {
  cards: ShowcaseCard[];
  duration: number;
  reverse?: boolean;
  reducedMotion: boolean;
  priorityOffset?: number;
}) {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [travelDistance, setTravelDistance] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const node = stackRef.current;
    if (!node) {
      return;
    }

    const updateDistance = () => {
      const movingTrack = node.parentElement;
      const rowGap = movingTrack
        ? Number.parseFloat(window.getComputedStyle(movingTrack).rowGap || '0')
        : 0;

      setTravelDistance(node.offsetHeight + rowGap);
    };

    updateDistance();

    const resizeObserver = new ResizeObserver(updateDistance);
    resizeObserver.observe(node);

    window.addEventListener('resize', updateDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, [cards, reducedMotion]);

  const shouldAnimate = !reducedMotion && travelDistance > 0;

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-4"
        animate={
          shouldAnimate
            ? { y: reverse ? [-travelDistance, 0] : [0, -travelDistance] }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                duration,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
              }
            : undefined
        }
      >
        <div ref={stackRef} className="flex flex-col gap-4">
          {cards.map((card, index) => (
            <ShowcaseTile
              key={`${card.title}-original`}
              card={card}
              priority={index < 2 + priorityOffset}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="flex flex-col gap-4"
        >
          {cards.map((card) => (
            <ShowcaseTile
              key={`${card.title}-duplicate`}
              card={card}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ShowcaseSection() {
  const openAuthDialog = useAuthDialogStore((state) => state.openDialog);
  const prefersReducedMotion = useReducedMotion() ?? false;
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

  return (
    <section
      id="showcase"
      className="relative scroll-mt-24 overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-18"
    >
      <SectionWrapper>
        <div className="relative overflow-hidden">
          <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <motion.div
              className="relative flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[48rem] lg:px-12 lg:py-12"
              {...introAnimation}
            >
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur"
                  {...itemAnimation}
                >
                  <RiSparkling2Line
                    aria-hidden="true"
                    className="size-3.5 text-primary"
                  />
                  <span>Creative Showcase</span>
                </motion.div>

                <motion.p
                  className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                  {...itemAnimation}
                >
                  Lifestyle-ready outcomes
                </motion.p>

                <motion.h2
                  className="mt-4 max-w-3xl text-balance text-[2.25rem] font-sans font-bold leading-[1.02] tracking-tight text-foreground sm:text-[2.7rem] lg:text-[3.35rem]"
                  {...itemAnimation}
                >
                  Discover scenes
                  <br />
                  <span className="bg-linear-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
                    that feel made for your brand.
                  </span>
                </motion.h2>

                <motion.p
                  className="mt-4 max-w-lg text-balance text-sm leading-6 text-muted-foreground sm:text-base"
                  {...itemAnimation}
                >
                  Explore the atmosphere AdShot AI can build from one simple
                  product photo, from clean editorial drops to warm campaign
                  worlds built for launch days, seasonal pushes, and always-on
                  socials.
                </motion.p>

                <motion.div
                  className="mt-8 flex flex-col items-start gap-3 sm:flex-row"
                  {...itemAnimation}
                >
                  <Button
                    type="button"
                    size="lg"
                    className="px-6 shadow-md"
                    onClick={openAuthDialog}
                  >
                    Start Creating
                    <RiArrowRightLine aria-hidden="true" className="size-4" />
                  </Button>

                  <Link
                    href="/gallery"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'bg-background px-6',
                    )}
                  >
                    View Full Gallery
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <div className="relative border-t border-border/70 px-4 py-4 sm:px-5 lg:border-l lg:border-t-0 lg:px-6 lg:py-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-background via-background/80 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background via-background/80 to-transparent" />

              <div className="grid h-[34rem] grid-cols-2 gap-4 sm:h-[38rem] xl:h-[44rem] xl:grid-cols-3">
                <ShowcaseColumn
                  cards={showcaseColumns[0]}
                  duration={26}
                  reducedMotion={prefersReducedMotion}
                />
                <ShowcaseColumn
                  cards={showcaseColumns[1]}
                  duration={30}
                  reverse
                  reducedMotion={prefersReducedMotion}
                  priorityOffset={1}
                />
                <div className="hidden xl:block">
                  <ShowcaseColumn
                    cards={showcaseColumns[2]}
                    duration={28}
                    reducedMotion={prefersReducedMotion}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
