import Image from 'next/image';

interface GalleryImageCardProps {
  src: string;
  alt: string;
  aspectClass: string;
  priority?: boolean;
}

export default function GalleryImageCard({
  src,
  alt,
  aspectClass,
  priority = false,
}: GalleryImageCardProps) {
  return (
    <article className="group mb-4 break-inside-avoid">
      <div className="relative overflow-hidden rounded-sm border border-border/70 bg-card shadow-sm ring-1 ring-border/50">
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
    </article>
  );
}
