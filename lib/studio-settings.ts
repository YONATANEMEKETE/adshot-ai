import { z } from 'zod';

export const studioThemeOptions = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'natural', label: 'Natural' },
  { value: 'urban', label: 'Urban' },
  { value: 'seasonal', label: 'Seasonal' },
] as const;

export const studioSceneIntensityOptions = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'rich', label: 'Rich' },
] as const;

export const studioOrientationOptions = [
  { value: 'square', label: 'Square' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' },
] as const;

export const studioSettingsSchema = z.object({
  theme: z.enum(['minimal', 'natural', 'urban', 'seasonal'], {
    error: 'Please choose a theme.',
  }),
  sceneIntensity: z.enum(['minimal', 'balanced', 'rich'], {
    error: 'Please choose a scene intensity.',
  }),
  orientation: z.enum(['square', 'portrait', 'landscape'], {
    error: 'Please choose an orientation.',
  }),
  vibe: z
    .string()
    .trim()
    .max(240, 'Vibe text must be 240 characters or less.')
    .optional(),
});

export type StudioSettingsValues = z.infer<typeof studioSettingsSchema>;

export const defaultStudioSettingsValues: StudioSettingsValues = {
  theme: 'minimal',
  sceneIntensity: 'balanced',
  orientation: 'square',
  vibe: '',
};
