# Cloudinary AI Implementation

**Last Updated:** 2026-04-27

## Goal

Implement the AdShot AI generation pipeline with Cloudinary as:

1. the storage layer for original product uploads
2. the delivery layer for transformed outputs
3. the AI transformation engine through URL-based transformations

This document captures the agreed v1 architecture for AdShot AI based on the current product direction and the existing repo structure.

## Confirmed Product Decisions

The current flow is:

1. The user uploads a product image.
2. AdShot AI uploads the original file to Cloudinary.
3. Cloudinary returns metadata, especially `public_id` and `secure_url`.
4. The app stores and uses the `public_id` as the canonical image reference.
5. The user configures the generation settings:
   - theme / scene
   - scene intensity
   - vibe context
   - orientation
6. The user clicks `Generate`.
7. AdShot AI does **not** call a separate "generate image" REST endpoint for the scene generation step.
8. Instead, AdShot AI constructs a Cloudinary transformation URL from:
   - the uploaded image `public_id`
   - AI transformation parameters
   - the generated prompt string
9. Cloudinary processes that transformation on first delivery request.
10. The transformed result streams back through Cloudinary delivery/CDN and is shown in the UI.

## Key Cloudinary Model

This implementation depends on one important Cloudinary concept:

- Upload is an API operation.
- AI generation is a delivery transformation operation.

That means:

- We make a server-side request to upload the original product image.
- We do **not** make a second server-side request to "generate" the final result.
- The final result is requested by rendering a Cloudinary delivery URL.
- On the first request, Cloudinary creates a derived asset.
- On later requests for the same transformation, Cloudinary can serve the cached derived asset.

This fits AdShot AI well because the app can treat generation as "rendering a transformed asset" instead of orchestrating a separate generation job API.

## Recommended v1 Technical Approach

### Upload path

Use a **Next.js Route Handler** for uploads in v1:

- `app/api/uploads/product-image/route.ts`

Why:

- It fits the current dashboard direction better than a form-only Server Action flow.
- It is easier to call from a drag-and-drop or multi-step configuration UI.
- It keeps the upload contract explicit and reusable for future mobile or background clients.
- It gives us a clear place for validation, auth checks, and response shaping.

### Shared Cloudinary helpers

Keep Cloudinary logic in `lib/cloudinary/` so the route handler and future Server Actions can share it:

- `lib/cloudinary/config.ts`
- `lib/cloudinary/upload.ts`
- `lib/cloudinary/prompt.ts`
- `lib/cloudinary/transformations.ts`
- `lib/cloudinary/urls.ts`

### Rendering transformed images

For the UI layer, v1 should use one of these patterns:

1. `next-cloudinary` with `CldImage` or `getCldImageUrl`
2. Cloudinary URL generation plus `next/image`
3. Cloudinary URL generation plus plain `img` where streaming behavior is preferred

Recommended default:

- Use the Cloudinary Node SDK on the server for upload and URL generation helpers.
- Use `next-cloudinary` on the client or server-rendered UI when it simplifies delivery and responsive rendering.

## Why `public_id` Matters More Than `secure_url`

The uploaded asset returns both:

- `public_id`
- `secure_url`

For AdShot AI:

- `secure_url` is useful for immediate original preview.
- `public_id` is the real durable identifier for all future transformations.

Reason:

- Every Cloudinary transformation is built from the uploaded asset identifier.
- The same `public_id` can produce many derived results without duplicating the original upload.
- Storing only a final URL would make prompt-driven regeneration harder to manage cleanly.

## Proposed Data Shapes

### Upload response

The upload endpoint should return a normalized payload like:

```ts
type UploadedProductImage = {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  originalFilename?: string;
};
```

### Generation input

The dashboard state should be able to construct:

```ts
type GenerationSettings = {
  publicId: string;
  theme: 'minimal' | 'natural' | 'urban' | 'seasonal';
  sceneIntensity: 'low' | 'medium' | 'high';
  vibeContext: string;
  orientation: 'square' | 'portrait' | 'landscape';
};
```

### Suggested persistence model

When persistence is added for "My Shots", each saved generation record should include:

```ts
type ShotRecord = {
  id: string;
  userId: string;
  sourcePublicId: string;
  sourceSecureUrl: string;
  theme: string;
  sceneIntensity: string;
  vibeContext: string;
  orientation: string;
  prompt: string;
  transformedUrl: string;
  createdAt: string;
};
```

The critical fields are `sourcePublicId` and `prompt`.

## Upload Flow Design

### Step 1: User selects an image

As soon as the user selects a file:

- show a local preview immediately with `URL.createObjectURL(file)`
- mark the image as `uploading`
- begin the upload request in the background

This improves perceived performance because the user sees progress instantly instead of waiting for Cloudinary first.

### Step 2: Route handler validates and uploads

The route handler should:

1. verify the user session
2. validate file type and size
3. upload to Cloudinary
4. return a minimal, UI-friendly payload

Validation rules should include:

- allow only images
- define a max upload size
- optionally normalize filenames or use a folder strategy per user

### Step 3: UI swaps from local preview to Cloudinary-backed preview

After upload succeeds:

- keep showing the image without visual flicker
- replace temporary local state with the Cloudinary-backed asset state
- preserve `publicId` in the generation configuration store

If upload fails:

- preserve the selected file name in the UI
- show an actionable error
- allow retry without losing the rest of the form state

## Prompt Construction Strategy

The prompt should be built by combining:

1. the selected theme
2. the selected scene intensity
3. the optional vibe context
4. any product-safe framing rules we want to enforce

### Recommended prompt builder behavior

Translate user-friendly UI values into richer prompt language.

Example mapping:

- `minimal` -> `clean minimal lifestyle backdrop`
- `natural` -> `natural organic setting with realistic materials`
- `urban` -> `modern editorial city-inspired environment`
- `seasonal` -> `seasonally styled lifestyle environment`

Example scene intensity mapping:

- `low` -> `subtle environmental detail`
- `medium` -> `balanced environmental detail`
- `high` -> `rich immersive environmental detail`

### Example prompt output

```text
clean minimal lifestyle backdrop, balanced environmental detail, soft commercial lighting, product-centered composition, realistic grounded shadows, coffee shop morning
```

The final prompt builder should:

- trim empty inputs
- avoid duplicated phrases
- keep the product as the subject
- keep prompts deterministic enough for repeatable UX

## Generation Flow Design

### Important principle

The `Generate` action in AdShot AI is mostly a **URL construction event** plus UI state change.

### On generate click

The app should:

1. verify the user still has quota
2. build the prompt string from the chosen settings
3. build the Cloudinary transformation definition
4. derive the transformation URL from the source `public_id`
5. render the resulting image URL in the result pane

### No second generation API call

We do **not** need a traditional API endpoint like:

- `POST /api/generate-image`

Instead:

- the client or server-rendered UI computes the Cloudinary delivery URL
- the browser requests that URL
- Cloudinary performs the AI transformation on first request

### Working Cloudinary AI assumption for v1

The most likely v1 transformation family is a background-generation or background-replacement transformation driven by prompt text.

This document assumes a Cloudinary effect in the `gen_background_replace` / generative background family, with orientation sizing layered around it.

The exact transformation string should be finalized against the chosen Cloudinary feature variant during implementation.

## Transformation Composition

Conceptually, the transformation pipeline should look like:

1. start from the uploaded product asset
2. apply background removal or product isolation if needed
3. apply AI background generation or replacement using the composed prompt
4. apply orientation-specific crop/pad rules
5. apply output optimization such as `f_auto` and `q_auto`

### Example conceptual transformation object

```ts
const transformation = [
  {
    effect: `gen_background_replace:prompt_${prompt}`,
  },
  {
    width: targetWidth,
    height: targetHeight,
    crop: 'fill',
  },
  {
    fetch_format: 'auto',
    quality: 'auto',
  },
];
```

This is intentionally conceptual.

During implementation we must verify:

- exact transformation key names
- prompt encoding rules
- whether orientation is better handled with `fill`, `pad`, or generative fill
- whether background removal should be its own explicit step

## Orientation Rules

Map UI orientation to predictable output targets:

- `square` -> 1:1
- `portrait` -> 4:5 or another product-approved portrait ratio
- `landscape` -> 16:9 or another product-approved campaign ratio

Recommended v1 behavior:

- keep a central product composition
- avoid aggressive cropping of the product itself
- use generative fill or safe padding where possible if the chosen Cloudinary mode supports it

## Caching and Derived Asset Behavior

Cloudinary creates a derived asset when a new transformation is first requested.

For AdShot AI this means:

- first request can take longer
- later requests for the same source + same transformation should be faster
- repeated visits to a saved shot can reuse the same transformed URL

This is a core reason to persist the final transformed URL and the transformation inputs.

### Practical implication

If a user opens "My Shots", we should not recompute prompts in the UI if the exact transformed URL was already saved. We can simply render the saved URL.

## Quota and Credit Consumption

AdShot AI already has a monthly generation quota model:

- 5 generations per user per month

For this Cloudinary flow, a generation should be counted when the user intentionally requests a new derived creative result.

### Recommended rule

Consume quota when:

- the user clicks `Generate`
- validation passes
- a new Cloudinary transformation URL is committed for rendering

Do **not** consume quota when:

- the user uploads an image
- the user edits settings without generating
- the same already-saved generated result is merely reopened

### Important implementation note

Because the transformation happens on delivery, app-level quota tracking and Cloudinary delivery timing are separate concerns.

That means:

- AdShot AI controls whether the user is allowed to initiate a new generation
- Cloudinary controls when the derived asset is actually created on first request

## Recommended UX States

### Upload states

- `idle`
- `uploading`
- `uploaded`
- `error`

### Generation states

- `ready`
- `buildingPrompt`
- `rendering`
- `loaded`
- `error`

### UX guidance

- show the uploaded source image immediately
- disable `Generate` until upload completes
- keep the configuration form editable while preview is shown
- show a clear loading treatment in the result stage
- distinguish upload errors from generation errors

## Error Handling

### Upload errors

Handle:

- invalid mime type
- oversized files
- unauthenticated access
- Cloudinary upload failure

### Transformation errors

Handle:

- invalid transformation syntax
- unsupported AI effect parameters
- prompt encoding issues
- Cloudinary delivery errors

Cloudinary can expose transformation problems through the `X-Cld-Error` response header. That is useful when debugging broken transformation URLs.

## Security and Validation

### Server-side responsibilities

Keep these on the server only:

- Cloudinary API secret usage
- upload authentication
- file validation
- folder naming strategy

### Client-safe data

Safe to expose to the client:

- `public_id`
- `secure_url`
- transformed delivery URLs
- cloud name

### Folder strategy recommendation

Use a stable folder convention such as:

```text
adshot-ai/users/{userId}/source
```

This makes later asset management and cleanup easier.

## Suggested Repo-Level Implementation Plan

### Phase 1: Cloudinary foundation

1. Add Cloudinary packages.
2. Add env vars.
3. Create `lib/cloudinary/` helpers.
4. Add Cloudinary hostname support to `next.config.ts`.

### Phase 2: Upload pipeline

1. Create `app/api/uploads/product-image/route.ts`.
2. Validate auth and file payload.
3. Upload original image to Cloudinary.
4. Return normalized upload metadata.

### Phase 3: Dashboard state

1. Add dashboard upload state.
2. Store the selected image `publicId`.
3. Store configuration values.
4. Build a prompt helper from PRD settings.

### Phase 4: Generation rendering

1. Build a transformation URL helper from `publicId + settings`.
2. Render generated output with Cloudinary delivery.
3. Add result loading and error states.

### Phase 5: Persistence

1. Save generation settings and output URL to the database.
2. Connect the saved records to "My Shots".
3. Reuse the stored transformed URL for later viewing.

## Suggested Files for This Repo

The current repo structure suggests these additions:

```text
app/
  api/
    uploads/
      product-image/
        route.ts

components/
  dashboard/
    ProductUploadField.tsx
    GenerationSettingsForm.tsx
    GeneratedShotPreview.tsx

lib/
  cloudinary/
    config.ts
    prompt.ts
    transformations.ts
    upload.ts
    urls.ts
  stores/
    use-studio-store.ts
```

Possible future persistence additions:

```text
app/
  (dashboard)/
    dashboard/
      actions.ts
```

## Environment Variables

Expected variables for v1:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

If we later move to direct signed browser uploads, we may also add:

```env
CLOUDINARY_UPLOAD_PRESET=
```

## Open Decisions for Implementation

These items are still implementation details, not product blockers:

1. Whether v1 uses `next-cloudinary` or only the core Cloudinary SDK plus manual URL generation.
2. Whether background removal is a separate explicit transformation or fully handled inside the selected generative background workflow.
3. The exact aspect ratios for portrait and landscape outputs.
4. Whether the app persists only successful generated outputs or also saves generation attempts.

## Final Recommendation

For AdShot AI v1:

- upload original product images through a protected Next.js Route Handler
- store `public_id` as the canonical image reference
- show the uploaded image immediately after upload
- build prompts from `theme + sceneIntensity + vibeContext + orientation`
- generate final outputs by constructing Cloudinary AI transformation URLs
- render those URLs directly in the result UI
- persist both the generation inputs and the resolved transformed URL for reuse in "My Shots"

This architecture matches the current product direction, works with the monthly quota model already documented in this repo, and keeps the generation flow simple by leaning into Cloudinary's derived asset delivery model.

## References

- Cloudinary Node quickstart: https://cloudinary.com/documentation/node_quickstart
- Cloudinary generative AI transformations: https://cloudinary.com/documentation/generative_ai_transformations
- Cloudinary transformation URL reference: https://cloudinary.com/documentation/transformation_reference
- Cloudinary solution overview and delivery lifecycle: https://cloudinary.com/documentation/solution_overview
- Cloudinary Next.js quick start: https://cloudinary.com/documentation/nextjs_quick_start
- Next.js 16 route handlers guide: `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
- Next.js 16 mutating data guide: `node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`
