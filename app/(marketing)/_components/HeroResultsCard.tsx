import {
  RiAmazonLine,
  RiGlobalLine,
  RiInstagramLine,
  RiLinksLine,
  RiShoppingBag3Line,
  RiStore2Line,
  RiTiktokLine,
} from '@remixicon/react';

export default function HeroResultsCard() {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="z-10">
        <h2 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Publish across <br /> all your channels
        </h2>
        <p className="mt-3 max-w-[85%] text-sm text-muted-foreground leading-relaxed">
          Export campaign-ready assets perfectly sized for your store, social media, and ads.
        </p>
      </div>

      <div className="mt-8 relative w-full flex-1">
        {/* Decorative background grid fading out */}
        <div className="absolute inset-0 bg-size-[2rem_2rem] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] opacity-[0.15] mask-[linear-gradient(to_bottom,white,transparent)]" />

        <div className="relative z-10 grid grid-cols-4 gap-3 sm:gap-4">
          {/* Row 1 */}
          <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <RiInstagramLine className="size-5 sm:size-6 text-foreground" />
          </div>
          <div className="aspect-square rounded-xl border border-border/40 bg-muted/30" />
          <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <RiTiktokLine className="size-5 sm:size-6 text-foreground" />
          </div>
          <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <RiAmazonLine className="size-5 sm:size-6 text-foreground" />
          </div>

          {/* Row 2 */}
          <div className="aspect-square rounded-xl border border-border/40 bg-muted/30" />
          <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <RiStore2Line className="size-5 sm:size-6 text-foreground" />
          </div>
          <div className="flex aspect-square scale-110 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xl">
            <RiLinksLine className="size-6 sm:size-7" />
          </div>
          <div className="row-span-2 rounded-xl border border-border/40 bg-muted/30" />

          {/* Row 3 */}
          <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <RiGlobalLine className="size-5 sm:size-6 text-foreground" />
          </div>
          {/* <div className="col-span-2 rounded-xl border border-border/40 bg-muted/30" />
          <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <RiShoppingBag3Line className="size-5 sm:size-6 text-foreground" />
          </div> */}
        </div>
      </div>
    </article>
  );
}
