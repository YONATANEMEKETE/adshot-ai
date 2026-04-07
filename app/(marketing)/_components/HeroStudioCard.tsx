import {
  RiGalleryLine,
  RiImageCircleLine,
  RiLandscapeLine,
  RiMagicLine,
  RiScissorsCutLine,
  RiSparkling2Line,
} from '@remixicon/react';

import Logo from '@/components/shared/Logo';
import { Ripple } from '@/components/ui/ripple';
import { cn } from '@/lib/utils';

// X and Y coordinates map to percentages (0-100)
const featureNodes = [
  {
    label: 'BG Removal',
    icon: RiScissorsCutLine,
    className: 'bg-accent text-accent-foreground',
    positionClass:
      'left-[15%] top-1/2 max-[360px]:left-[20%] max-[360px]:top-[47%]',
  },
  {
    label: 'Scene Themes',
    icon: RiMagicLine,
    className: 'bg-secondary text-secondary-foreground',
    positionClass:
      'left-[30%] top-[20%] max-[360px]:left-[28%] max-[360px]:top-[24%]',
  },
  {
    label: 'Vibe Context',
    icon: RiSparkling2Line,
    className: 'bg-background text-foreground',
    positionClass:
      'left-[70%] top-[20%] max-[360px]:left-[72%] max-[360px]:top-[24%]',
  },
  {
    label: 'Orientation',
    icon: RiLandscapeLine,
    className: 'bg-accent text-accent-foreground',
    positionClass:
      'left-[85%] top-1/2 max-[360px]:left-[80%] max-[360px]:top-[47%]',
  },
  {
    label: 'My Shots',
    icon: RiGalleryLine,
    className: 'bg-background text-muted-foreground',
    positionClass:
      'left-[70%] top-[80%] max-[360px]:left-[67%] max-[360px]:top-[72%]',
  },
  {
    label: 'Public Gallery',
    icon: RiImageCircleLine,
    className: 'bg-background text-muted-foreground',
    positionClass:
      'left-[30%] top-[80%] max-[360px]:left-[33%] max-[360px]:top-[72%]',
  },
] as const;

export default function HeroStudioCard() {
  return (
    <div className="relative h-full min-h-80 w-full overflow-hidden rounded-xl border border-border bg-background shadow-sm sm:min-h-96">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-size-[2.75rem_2.75rem] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] opacity-20" />

      {/* Ripple Effect */}
      <Ripple />

      {/* Center Logo */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-border bg-background p-1.5 shadow-sm sm:p-2">
        <Logo size={38} aria-hidden="true" className="sm:size-auto" />
      </div>

      {/* Floating Cards mapped around the center */}
      {featureNodes.map(({ label, icon: Icon, className, positionClass }, i) => (
        <div
          key={label}
          className={cn(
            'absolute z-10 -translate-x-1/2 -translate-y-1/2',
            positionClass,
          )}
        >
          <div
            className={cn(
              'animate-float inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs font-medium shadow-lg',
              'max-[360px]:gap-1.5 max-[360px]:px-2 max-[360px]:py-1.5 max-[360px]:text-[0.625rem]',
              className,
            )}
            style={{
              animationDelay: `${i * 0.7}s`,
              '--float-duration': `${5 + (i % 3)}s`,
            } as React.CSSProperties}
          >
            <Icon
              aria-hidden="true"
              className="size-3.5 text-primary max-[360px]:size-3"
            />
            <span className="whitespace-nowrap">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
