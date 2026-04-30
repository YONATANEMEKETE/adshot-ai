import StudioSettingsSidebar from '@/components/dashboard/StudioSettingsSidebar';

export default function MyStudioPage() {
  return (
    <div className="relative min-h-full pr-[25rem]">
      <section className="min-w-0 space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            My Studio
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Shape the next version of your product shot.
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            This center workspace will hold the uploaded source image, loading
            states, and generated results. For now, it gives us the layout shell
            while the fixed studio controls live on the right.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-sm border border-border bg-muted/35 p-6">
            <p className="text-sm font-semibold text-foreground">
              Source Preview
            </p>
            <div className="mt-4 flex min-h-64 items-center justify-center rounded-sm border border-dashed border-border bg-background/80">
              <p className="text-sm text-muted-foreground">
                Uploaded product preview goes here
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-muted/35 p-6">
            <p className="text-sm font-semibold text-foreground">
              Generated Output
            </p>
            <div className="mt-4 flex min-h-64 items-center justify-center rounded-sm border border-dashed border-border bg-background/80">
              <p className="text-sm text-muted-foreground">
                Generation result area goes here
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-border bg-muted/35 p-6">
          <p className="text-sm font-semibold text-foreground">
            Generation Timeline
          </p>
          <div className="mt-4 flex min-h-48 items-center justify-center rounded-sm border border-dashed border-border bg-background/80">
            <p className="text-sm text-muted-foreground">
              Loading states, prompt assist, and result history can live here
            </p>
          </div>
        </div>
      </section>

      <StudioSettingsSidebar />
    </div>
  );
}
