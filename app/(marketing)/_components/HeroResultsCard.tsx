import {
  RiArrowRightUpLine,
  RiDownloadLine,
  RiGalleryLine,
  RiImageCircleLine,
  RiLoopLeftLine,
  RiSparkling2Line,
} from '@remixicon/react';

export default function HeroResultsCard() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <header className="border-b border-border px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Final Output
        </p>
        <h2 className="mt-1 text-left text-sm font-semibold tracking-tight text-foreground sm:text-base">
          Campaign-ready assets
        </h2>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-xs">
          <div className="flex aspect-[4/5] items-end justify-center bg-gradient-to-b from-background via-accent/60 to-secondary/90 p-4">
            <div className="h-28 w-16 rounded-t-[1rem] rounded-b-md bg-primary shadow-xl" />
          </div>
          <div className="border-t border-border p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Natural portrait variation
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Optimized for reels, stories, and PDP refreshes.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-sm bg-accent px-2 py-1 text-[11px] font-medium text-accent-foreground">
                <RiSparkling2Line aria-hidden="true" className="size-3.5 text-primary" />
                Upscaled
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 shadow-xs">
            <div className="inline-flex items-center gap-2 text-sm text-foreground">
              <RiDownloadLine aria-hidden="true" className="size-4 text-primary" />
              <span>Download individual shot</span>
            </div>
            <span className="text-xs text-muted-foreground">2048px</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 shadow-xs">
            <div className="inline-flex items-center gap-2 text-sm text-foreground">
              <RiGalleryLine aria-hidden="true" className="size-4 text-primary" />
              <span>Save to My Shots</span>
            </div>
            <span className="text-xs text-muted-foreground">Reusable</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 shadow-xs">
            <div className="inline-flex items-center gap-2 text-sm text-foreground">
              <RiLoopLeftLine aria-hidden="true" className="size-4 text-primary" />
              <span>Remix from this result</span>
            </div>
            <span className="text-xs text-muted-foreground">1 click</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Public Gallery
              </p>
              <p className="mt-1 text-sm text-foreground">
                Share your strongest shot to inspire other brands.
              </p>
            </div>
            <div className="inline-flex size-9 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <RiArrowRightUpLine aria-hidden="true" className="size-4" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <RiImageCircleLine aria-hidden="true" className="size-4 text-primary" />
            <span className="text-xs text-muted-foreground">
              Mark public, publish, and drive gallery engagement.
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
