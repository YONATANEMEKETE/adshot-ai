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

// X and Y coordinates map to percentages (0-100)
const featureNodes = [
  {
    label: 'BG Removal',
    icon: RiScissorsCutLine,
    className: 'bg-accent text-accent-foreground',
    x: 15,
    y: 50,
  },
  {
    label: 'Scene Themes',
    icon: RiMagicLine,
    className: 'bg-secondary text-secondary-foreground',
    x: 30,
    y: 20,
  },
  {
    label: 'Vibe Context',
    icon: RiSparkling2Line,
    className: 'bg-background text-foreground',
    x: 70,
    y: 20,
  },
  {
    label: 'Orientation',
    icon: RiLandscapeLine,
    className: 'bg-accent text-accent-foreground',
    x: 85,
    y: 50,
  },
  {
    label: 'My Shots',
    icon: RiGalleryLine,
    className: 'bg-background text-muted-foreground',
    x: 70,
    y: 80,
  },
  {
    label: 'Public Gallery',
    icon: RiImageCircleLine,
    className: 'bg-background text-muted-foreground',
    x: 30,
    y: 80,
  },
] as const;

export default function HeroStudioCard() {
  return (
    <div className="relative h-full min-h-96 w-full overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-size-[2.75rem_2.75rem] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] opacity-20" />

      {/* Ripple Effect */}
      <Ripple />

      {/* Center Logo */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 border border-border bg-background p-2 shadow-sm">
        <Logo size={46} aria-hidden="true" />
      </div>

      {/* Floating Cards mapped around the center */}
      {featureNodes.map(({ label, icon: Icon, className, x, y }) => (
        <div
          key={label}
          className={`absolute z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs font-medium shadow-lg ${className}`}
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <Icon aria-hidden="true" className="size-3.5 text-primary" />
          <span className="whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  );
}
