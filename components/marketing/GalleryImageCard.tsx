'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

interface GalleryImageCardProps {
  src: string;
  alt: string;
  aspectClass: string;
  index?: number;
  priority?: boolean;
}

export default function GalleryImageCard({
  src,
  alt,
  aspectClass,
  index = 0,
  priority = false,
}: GalleryImageCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  return (
    <motion.article
      className="group mb-4 break-inside-avoid"
      initial={shouldAnimate ? { opacity: 0, y: 18 } : false}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={
        shouldAnimate
          ? {
              duration: 0.5,
              delay: Math.min(index * 0.04, 0.28),
              ease: [0.22, 1, 0.36, 1],
            }
          : undefined
      }
    >
      <div className="relative overflow-hidden rounded-sm border border-border/70 bg-card shadow-sm ring-4 ring-border">
        <div className={`relative ${aspectClass}`}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-background/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
}
