'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  defaultStudioSettingsValues,
  studioOrientationOptions,
  studioSceneIntensityOptions,
  studioSettingsSchema,
  studioThemeOptions,
  type StudioSettingsValues,
} from '@/lib/studio-settings';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs text-destructive">{message}</p>;
}

export default function StudioSettingsSidebar() {
  const form = useForm<StudioSettingsValues>({
    resolver: zodResolver(studioSettingsSchema),
    defaultValues: defaultStudioSettingsValues,
  });

  const onSubmit = (values: StudioSettingsValues) => {
    console.log('Studio settings submitted', values);
    // Todo: Integrate with backend or state management to apply settings
  };

  return (
    <aside className="fixed top-0 right-0 z-20 h-dvh w-[22rem] border-l border-border bg-background">
      <div className="flex h-full flex-col overflow-y-auto p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Studio Controls
          </p>
        </div>

        <div className="mt-6 rounded-sm border border-dashed border-border bg-muted/40 p-4">
          <div className="flex min-h-36 items-center justify-center rounded-sm border border-border/70 bg-background/70">
            <p className="text-center text-sm text-muted-foreground">
              Image upload placeholder
            </p>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 flex flex-1 flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Theme</Label>
              <Select
                value={form.watch('theme')}
                onValueChange={(value) =>
                  form.setValue(
                    'theme',
                    value as StudioSettingsValues['theme'],
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    },
                  )
                }
              >
                <SelectTrigger
                  size="sm"
                  className="w-full rounded-sm border-border bg-background"
                >
                  <SelectValue placeholder="Choose a theme" />
                </SelectTrigger>
                <SelectContent className="rounded-sm">
                  {studioThemeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="rounded-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError message={form.formState.errors.theme?.message} />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Scene Intensity</Label>
              <Select
                value={form.watch('sceneIntensity')}
                onValueChange={(value) =>
                  form.setValue(
                    'sceneIntensity',
                    value as StudioSettingsValues['sceneIntensity'],
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    },
                  )
                }
              >
                <SelectTrigger
                  size="sm"
                  className="w-full rounded-sm border-border bg-background"
                >
                  <SelectValue placeholder="Choose a scene intensity" />
                </SelectTrigger>
                <SelectContent className="rounded-sm">
                  {studioSceneIntensityOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="rounded-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError
                message={form.formState.errors.sceneIntensity?.message}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Orientation</Label>
              <Select
                value={form.watch('orientation')}
                onValueChange={(value) =>
                  form.setValue(
                    'orientation',
                    value as StudioSettingsValues['orientation'],
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    },
                  )
                }
              >
                <SelectTrigger
                  size="sm"
                  className="w-full rounded-sm border-border bg-background"
                >
                  <SelectValue placeholder="Choose an orientation" />
                </SelectTrigger>
                <SelectContent className="rounded-sm">
                  {studioOrientationOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="rounded-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError
                message={form.formState.errors.orientation?.message}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="vibe" className="text-xs">
                Vibe
              </Label>
              <Textarea
                id="vibe"
                placeholder="Coffee shop morning, soft natural light, premium skincare editorial feel"
                className="min-h-24 rounded-sm border-border bg-background px-3 py-2 text-sm"
                {...form.register('vibe')}
              />
              <FieldError message={form.formState.errors.vibe?.message} />
            </div>
          </div>

          <div className="pt-5">
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-sm font-sans"
            >
              Generate
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
}
