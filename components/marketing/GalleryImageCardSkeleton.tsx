'use client';

interface GalleryImageCardSkeletonProps {
  aspectClass: string;
}

export default function GalleryImageCardSkeleton({
  aspectClass,
}: GalleryImageCardSkeletonProps) {
  return (
    <article
      aria-hidden="true"
      className="mb-4 break-inside-avoid skeleton-shimmer"
    >
      <div className="relative overflow-hidden rounded-sm border border-border/70 bg-card shadow-sm ring-1 ring-border/50">
        <div
          className={`relative ${aspectClass} bg-gradient-to-br from-muted via-secondary/55 to-accent/40`}
        ></div>
      </div>
    </article>
  );
}
