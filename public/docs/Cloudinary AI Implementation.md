# Cloudinary AI Implementation

**Last Updated:** 2026-04-29

## 1. Purpose

This document defines the v1 Cloudinary architecture for AdShot AI based on:

- the current codebase state
- the PRD in `public/docs/AdShot AI PRD.md`
- the monthly quota design in `public/docs/Monthly Credit Implementation.md`
- current Cloudinary documentation reviewed through Context7

The goal is to implement the first real AdShot AI generation pipeline without paying for a separate model inference backend or building a custom image-generation API layer.

## 2. Confirmed Product Direction

The intended v1 flow is:

1. The user signs in.
2. The user uploads a product image.
3. The app uploads the original file to Cloudinary.
4. Cloudinary returns asset metadata, including `public_id` and `secure_url`.
5. The app stores the uploaded asset reference.
6. The user chooses generation settings:
   - theme
   - scene richness
   - vibe context
   - orientation
7. The user clicks `Generate`.
8. The app checks and consumes one monthly generation credit.
9. The app builds a Cloudinary transformation URL from the source image plus generation settings.
10. The browser requests that derived Cloudinary URL.
11. Cloudinary performs the transformation and returns the output.
12. The app displays and optionally saves the generated shot record.

## 3. Core Architecture Rule

For AdShot AI v1:

- **uploading is a server-side SDK operation**
- **generation is a Cloudinary delivery transformation**

That means:

- we do need a protected server endpoint for uploads
- we do not need a second custom server endpoint that performs image generation itself
- the app's "generate" action is mainly:
  - auth check
  - quota check
  - prompt construction
  - transformation URL construction
  - result rendering

This keeps the product lightweight and aligned with the current no-extra-inference-cost direction.

## 4. What Cloudinary Docs Confirmed

Based on the current Cloudinary docs reviewed through Context7:

### Server-side upload remains standard SDK work

The Cloudinary Node SDK still supports server-side uploads and returns the fields we need, including:

- `public_id`
- `secure_url`

The docs also continue to support URL generation from a source `public_id` using transformation objects or helper methods.

### Generative background replacement is URL-transform based

Cloudinary documents prompt-based background replacement using transformation effects such as:

```ts
{ effect: "gen_background_replace:prompt_an old castle;seed_1" }
```

This aligns with your remembered architecture:

- upload once
- derive outputs through transformation URLs
- do not run a separate custom image-generation API request

### Generative fill is available for aspect-ratio extension

Cloudinary also documents generative fill patterns such as:

```text
b_gen_fill[:prompt_<prompt>][;seed_<seed>]
```

This is useful when AdShot AI needs to adapt images to portrait or landscape canvases without harsh cropping.

## 5. Recommended v1 Cloudinary Stack

### Required package

- `cloudinary`

### Optional package

- `next-cloudinary`

Recommended usage split:

- use the Cloudinary Node SDK for server configuration, uploads, and transformation URL helpers
- use either:
  - `next-cloudinary` `CldImage`
  - `next-cloudinary` `getCldImageUrl`
  - or `next/image` with generated Cloudinary URLs

For this repo, the most flexible default is:

- server: `cloudinary`
- UI delivery: `getCldImageUrl` or `CldImage`

## 6. Current Repo Implications

Right now the repo does **not** yet have:

- Cloudinary SDK wiring
- Cloudinary env vars in documented form
- upload route handlers
- dashboard generation state
- persisted shot models

So this document is not describing code that already exists. It describes the next implementation target.

## 7. Upload Architecture

## Route shape

Use a protected Next.js Route Handler:

```text
app/api/uploads/product-image/route.ts
```

This fits the current Next.js 16 app-router structure and works well for drag-and-drop upload UX.

## Server responsibilities

The route handler should:

1. verify session
2. read `FormData`
3. validate file type
4. validate file size
5. upload to Cloudinary
6. return normalized upload metadata

## Recommended file organization

```text
lib/cloudinary/
  config.ts
  upload.ts
  prompt.ts
  transformations.ts
  urls.ts
```

### `config.ts`

- central Cloudinary SDK configuration
- reads env vars once

### `upload.ts`

- uploads files to Cloudinary
- returns normalized result payload

### `prompt.ts`

- converts UI selections into deterministic prompt strings

### `transformations.ts`

- builds transformation objects from prompt and orientation

### `urls.ts`

- converts `publicId + transformation` into a delivery URL

## 8. Canonical Asset Reference

The uploaded source image should be identified by `public_id`, not by the returned URL alone.

### Why `public_id` is the right canonical reference

- it is stable for future transformations
- it allows one source upload to produce many derived results
- it keeps regeneration logic simple
- it fits Cloudinary's delivery model directly

### Store both of these

- `publicId`
- `secureUrl`

Use:

- `secureUrl` for immediate source preview
- `publicId` for all future generation and delivery logic

## 9. Upload Response Shape

The upload route should return a normalized payload similar to:

```ts
export type UploadedProductImage = {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  originalFilename?: string;
};
```

## 10. Generation Input Shape

The dashboard should eventually construct something like:

```ts
export type GenerationSettings = {
  publicId: string;
  theme: 'minimal' | 'natural' | 'urban' | 'seasonal';
  sceneRichness: 'minimal' | 'balanced' | 'rich';
  vibeContext: string;
  orientation: 'square' | 'portrait' | 'landscape';
};
```

This naming matches the PRD more closely than the older `sceneIntensity` wording.

## 11. Prompt Builder Strategy

The prompt builder should transform UI choices into richer, product-safe language.

### Example mappings

- `minimal` theme -> `clean minimal lifestyle backdrop`
- `natural` theme -> `natural organic commercial setting`
- `urban` theme -> `modern editorial city-inspired environment`
- `seasonal` theme -> `seasonally styled lifestyle environment`

- `minimal` richness -> `subtle environmental detail`
- `balanced` richness -> `balanced environmental detail`
- `rich` richness -> `immersive environmental detail`

### Prompt rules

The final prompt builder should:

- keep the product as the clear subject
- avoid duplicate phrases
- trim empty inputs
- remain deterministic enough for a stable UX
- avoid unsafe or overly open-ended prompt construction

### Example output

```text
clean minimal lifestyle backdrop, balanced environmental detail, soft commercial lighting, realistic grounded shadows, product-centered composition, coffee shop morning
```

## 12. Transformation Strategy

The current best-fit v1 strategy is:

1. start from the uploaded source asset
2. apply product-safe background workflow
3. apply generative background replacement with prompt
4. adapt to target aspect ratio
5. optimize output delivery

## Preferred first transformation family

Use prompt-based background replacement as the primary creative step.

Conceptually:

```ts
[
  { effect: `gen_background_replace:prompt_${prompt}` },
  { width, height, crop: 'fill' },
  { fetch_format: 'auto', quality: 'auto' },
]
```

Important note:

The exact effect string and escaping rules must be verified during coding, but the currently documented Cloudinary transformation family supports this pattern.

## Aspect-ratio support

Recommended mappings:

- `square` -> `1:1`
- `portrait` -> `4:5`
- `landscape` -> `16:9`

If standard crop behavior harms composition, use generative fill for canvas expansion where appropriate.

## 13. Practical Delivery Behavior

Cloudinary derived assets are created when the transformation URL is first requested.

For AdShot AI this means:

- the first request may be slower
- repeated requests to the same transformation URL should be faster
- saved shots should reuse the stored transformed URL directly

This makes persistence important:

- if a generated shot is already known, do not rebuild it every time in the UI
- store the final resolved delivery URL for later rendering

## 14. Quota Integration

Your monthly quota model should be enforced at the app layer, before a new result is requested.

## Recommended rule

Consume a monthly generation credit when:

- the user clicks `Generate`
- input validation passes
- the app commits a new generation attempt

Do not consume a credit when:

- the user uploads a file
- the user edits settings
- the user reopens an already saved shot

## Important separation of concerns

- AdShot AI decides whether the user is allowed to initiate a new generation
- Cloudinary performs the actual derived asset transformation when the URL is requested

## 15. Suggested Persistence Model

The current schema only covers users, sessions, accounts, verification, and quota.

To support the Cloudinary workflow cleanly, add persistence for at least:

### Source upload

```ts
type SourceAssetRecord = {
  id: string;
  userId: string;
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  createdAt: string;
};
```

### Generated shot

```ts
type ShotRecord = {
  id: string;
  userId: string;
  sourceAssetId: string;
  sourcePublicId: string;
  transformedUrl: string;
  prompt: string;
  theme: string;
  sceneRichness: string;
  vibeContext: string;
  orientation: string;
  visibility: 'private' | 'public';
  createdAt: string;
};
```

## 16. UX States to Support

### Upload states

- `idle`
- `uploading`
- `uploaded`
- `error`

### Generation states

- `ready`
- `checkingQuota`
- `buildingPrompt`
- `rendering`
- `loaded`
- `error`

## 17. Error Handling

### Upload errors

Handle:

- invalid mime type
- file too large
- unauthenticated request
- Cloudinary upload failure

### Generation errors

Handle:

- invalid transformation syntax
- unsupported effect params
- prompt encoding issues
- Cloudinary delivery failures

Cloudinary may expose delivery issues through response metadata such as `X-Cld-Error`, which is useful during debugging.

## 18. Security Rules

Keep these server-only:

- `CLOUDINARY_API_SECRET`
- upload logic
- auth checks
- validation rules

Safe to expose client-side:

- cloud name
- source `publicId`
- `secureUrl`
- derived delivery URLs

## 19. Folder Strategy

Recommended source upload folder convention:

```text
adshot-ai/users/{userId}/source
```

Possible future generated asset strategy:

```text
adshot-ai/users/{userId}/generated
```

Even if generated assets are mostly derived-on-delivery, keeping a clear folder policy will help if you later choose to persist specific generated outputs more aggressively.

## 20. Recommended Implementation Phases

## Phase 1 - Foundation

1. Install `cloudinary`
2. Optionally install `next-cloudinary`
3. Add env vars
4. Add `lib/cloudinary/` helpers
5. Add Cloudinary hostname support to `next.config.ts`

## Phase 2 - Upload

1. Create `app/api/uploads/product-image/route.ts`
2. Validate auth
3. Validate image payload
4. Upload to Cloudinary
5. Return normalized metadata

## Phase 3 - Dashboard wiring

1. Add product upload UI
2. Store uploaded asset metadata in client state
3. Add generation settings form
4. Add prompt builder

## Phase 4 - Generation rendering

1. Build transformation object
2. Generate Cloudinary delivery URL
3. Render result preview
4. Handle Cloudinary error states

## Phase 5 - Persistence and productization

1. Save source uploads
2. Save generated shots
3. Build My Shots
4. Convert gallery to public saved shots

## 21. Environment Variables

Expected env vars:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

Optional later:

```env
CLOUDINARY_UPLOAD_PRESET=
```

## 22. Suggested Files To Add

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
    UsageQuotaCard.tsx

lib/
  cloudinary/
    config.ts
    prompt.ts
    transformations.ts
    upload.ts
    urls.ts
  quota/
    get-user-quota.ts
    consume-generation-credit.ts
    reset-user-quota-if-needed.ts
```

## 23. Final Recommendation

The best v1 implementation path is:

- upload product images through a protected route handler
- store Cloudinary `public_id` as the canonical source reference
- build prompts from PRD settings
- generate results by constructing Cloudinary AI transformation URLs
- render those derived URLs in the dashboard
- enforce the 5-generation monthly quota at the application layer
- save successful results for My Shots and the future public gallery

This gives AdShot AI a real end-to-end MVP path without introducing a separate generation backend or extra model orchestration cost.

## 24. References Reviewed

- Cloudinary generative AI transformations
- Cloudinary effects and artistic enhancements
- Cloudinary transformation URL reference
- Cloudinary Node.js SDK upload and URL-generation guidance
- `next-cloudinary` `CldImage` and `getCldImageUrl` usage patterns
- Next.js 16 Route Handlers guide from `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
