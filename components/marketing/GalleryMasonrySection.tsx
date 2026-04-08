'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { RiSparkling2Line } from '@remixicon/react';

import GalleryImageCard from '@/components/marketing/GalleryImageCard';
import GalleryImageCardSkeleton from '@/components/marketing/GalleryImageCardSkeleton';
import { Button } from '@/components/ui/button';

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
    alt: 'A creamy matcha drink in a glass with a wooden spoon.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80',
    alt: 'Minimal floral stems scattered across a pale tabletop.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    alt: 'Soft cloud layers fading into a pastel blue horizon.',
    aspectClass: 'aspect-[3/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80',
    alt: 'A cactus arrangement against a warm pink backdrop.',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
    alt: 'White curved balconies stacked in repeating architectural lines.',
    aspectClass: 'aspect-[3/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=900&q=80',
    alt: 'Fine ripples and footprints in light-toned desert sand.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    alt: 'A warm wood cabin interior with a small black fireplace.',
    aspectClass: 'aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80',
    alt: 'A bright orange flower isolated against a pale backdrop.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    alt: 'Layered sandstone curves above a vivid blue sky.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
    alt: 'A golden hotel atrium with repeating balcony geometry.',
    aspectClass: 'aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    alt: 'A car in motion with colorful city lights blurred around it.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    alt: 'A quiet mountain valley with a river winding through it.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
    alt: 'Textured blue ocean water with a soft gradient of light.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    alt: 'A sunlit rocky landscape under a clear blue sky.',
    aspectClass: 'aspect-[4/3]',
  },
] as const;

const SIMULATED_LOADING_DELAY_MS = 900;

export default function GalleryMasonrySection() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, SIMULATED_LOADING_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

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
  const headerAnimation = shouldAnimate
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
  const headerItemAnimation = shouldAnimate
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
    <motion.section
      className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-secondary/10"
      {...sectionAnimation}
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          {...headerAnimation}
        >
          <motion.div
            className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground shadow-xs sm:gap-2 sm:px-3 sm:text-xs"
            {...headerItemAnimation}
          >
            <RiSparkling2Line
              aria-hidden="true"
              className="size-3 text-primary sm:size-3.5"
            />
            <span>Gallery</span>
          </motion.div>
          <motion.h1
            className="max-w-4xl text-balance text-4xl font-sans font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
            {...headerItemAnimation}
          >
            See what others are Creating with AdShot AI.
          </motion.h1>
          <motion.p
            className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
            {...headerItemAnimation}
          >
            Browse a live mix of product visuals, brand moods, and
            campaign-ready scenes created to help stores launch faster and look
            sharper.
          </motion.p>
        </motion.div>

        <div
          aria-busy={isLoading}
          aria-live="polite"
          className="columns-2 gap-4 sm:columns-2 lg:columns-4"
        >
          {isLoading
            ? galleryItems.map((item) => (
                <GalleryImageCardSkeleton
                  key={`skeleton-${item.src}`}
                  aspectClass={item.aspectClass}
                />
              ))
            : galleryItems.map((item, index) => (
                <GalleryImageCard
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  aspectClass={item.aspectClass}
                  index={index}
                  priority={index < 4}
                />
              ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            type="button"
            className={'cursor-pointer'}
          >
            Load more
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
