# AdShot AI - Current Status and Roadmap

**Last Updated:** 2026-04-29

## 1. Current Status Snapshot

This document reflects the current state of the codebase as of 2026-04-29, compared against the PRD in `public/docs/AdShot AI PRD.md`.

## 2. What Is Already In Place

### Product direction is documented

- The PRD defines the MVP clearly:
  - marketing landing page
  - public gallery
  - Google OAuth authentication
  - dashboard upload and generation workspace
  - My Shots
  - settings and usage visibility
  - Cloudinary-backed asset flow
- The monthly quota decision is documented in `public/docs/Monthly Credit Implementation.md`.

### Marketing site foundation exists

- The main landing page is already composed from reusable sections:
  - `HeroSection`
  - `HowItWorksSection`
  - `ShowcaseSection`
- The marketing layout and navigation are implemented.
- A public gallery route exists at `/gallery`.

### Authentication foundation exists

- Better Auth is wired up with Google OAuth.
- Session-aware redirect behavior is implemented in `proxy.ts`.
- Auth API routing exists.
- Sign-out is working from the dashboard stub.

### Monthly quota foundation exists

- Prisma includes a `UserQuota` model.
- New users get a quota row automatically through a Better Auth database hook.
- The quota is seeded as:
  - `generationsUsed = 0`
  - `quotaLimit = 5`
  - `resetAt = start of next month`

## 3. What Has Been Started But Is Not Fully Aligned Yet

### Pricing direction changed, but the UI still reflects the old model

You already pivoted the product logic away from paid subscription pricing and toward a monthly generation quota. That part is reflected in:

- the PRD
- the quota schema
- the quota initialization logic
- the monthly credit implementation doc

However, the pricing UI is not fully reconciled yet:

- `components/marketing/PricingSection.tsx` still contains old `Free` and `Pro` tiers
- the `Pro` plan still references paid features and pricing
- the pricing section is commented out in `app/(marketing)/page.tsx`

This suggests the old pricing screen was intentionally removed from the landing page while you were rethinking monetization.

### Public gallery exists as a route, but not as a product system

- `/gallery` renders a marketing-style masonry showcase
- it currently looks like seeded/static presentation content, not database-backed public user shots
- there is no persistence model yet for generated assets or public/private visibility

### Dashboard route exists, but the studio workflow does not

- `/dashboard` is protected
- the page is currently just a signed-in placeholder with a sign-out button
- the upload, generation, quota-check, progress, result preview, and save flows are still missing

## 4. What Is Missing Relative to the PRD

### Core generation pipeline

Not implemented yet:

- Cloudinary SDK integration
- upload route handler
- image validation
- transformation URL generation
- prompt builder
- result rendering pipeline
- generation persistence

### Data model for actual shots

There is currently no model yet for:

- uploaded source assets
- generated shots
- prompt/settings history
- public/private gallery visibility
- download metadata

### My Shots and Settings pages

These PRD pages are still missing:

- `My Shots`
- `Settings / Account`

### Usage enforcement logic

The quota row exists, but the actual application logic does not yet exist for:

- resetting stale quotas on access
- blocking generation when limit is reached
- atomically consuming quota during generation initiation
- showing remaining credits in the UI

### Supporting infrastructure listed in the PRD

The PRD mentions or implies tools that are not yet wired into this codebase:

- Cloudinary SDK
- Supabase integration
- TanStack Query
- generation persistence models
- analytics

## 5. Assessment of Your Current Progress

You are past the blank-project stage and have already made the most important foundational product decisions:

1. The product scope is defined.
2. Auth is working.
3. User isolation direction is established.
4. Monthly quota direction is chosen.
5. The old subscription concept has been partially backed out.

The project is now at the transition point between:

- brand and foundation work
- real product workflow implementation

That means the next highest-value work is not more landing-page polish. It is the first end-to-end generation slice:

`authenticated user -> upload product -> validate quota -> generate Cloudinary result -> display result -> save shot`

## 6. Recommended Roadmap From Here

## Phase 1 - Lock the v1 Generation Architecture

Goal: remove ambiguity before building.

### Outcomes

- finalize the Cloudinary transformation strategy for v1
- confirm output aspect ratios
- decide whether v1 saves both source uploads and generated results
- decide whether the first release supports one result per generate or multiple variations

### Deliverables

- finalized `Cloudinary AI Implementation.md`
- updated PRD generation pipeline section
- agreed shot data model

## Phase 2 - Add Cloudinary Foundation

Goal: make uploads and delivery possible.

### Build

- install `cloudinary`
- optionally install `next-cloudinary`
- add Cloudinary env vars
- add `lib/cloudinary/`
  - `config.ts`
  - `upload.ts`
  - `prompt.ts`
  - `transformations.ts`
  - `urls.ts`
- allow Cloudinary delivery in `next.config.ts`

### Exit criteria

- server can upload a product image
- app receives `publicId`, `secureUrl`, width, height, and format
- app can generate a valid Cloudinary delivery URL from a `publicId`

## Phase 3 - Build the Dashboard Studio MVP

Goal: create the first real user workflow.

### Build

- replace dashboard placeholder with:
  - upload zone
  - source preview
  - generation controls
  - result preview panel
  - quota status
- add client state for:
  - upload state
  - selected source asset
  - theme
  - scene richness
  - vibe context
  - orientation
  - generation status

### Exit criteria

- signed-in user can upload a product image
- uploaded image is stored in Cloudinary
- dashboard stores the source `publicId`

## Phase 4 - Implement Quota Enforcement Properly

Goal: make the monthly credit system real, not just modeled.

### Build

- add server-side quota helper functions:
  - get quota
  - lazy reset quota if `now >= resetAt`
  - atomically consume one generation
  - return remaining usage state
- expose quota state to the dashboard and settings UI
- show friendly blocked state when user reaches limit

### Exit criteria

- generate action is blocked after 5 monthly generations
- stale quota resets automatically
- quota consumption is race-safe

## Phase 5 - Render Cloudinary AI Results

Goal: deliver the first generated output.

### Build

- convert dashboard settings into a deterministic prompt string
- build Cloudinary transformation URL from:
  - source `publicId`
  - prompt
  - orientation
  - optimization params
- render the generated result in the dashboard
- handle loading and Cloudinary delivery errors

### Exit criteria

- user can click `Generate`
- result appears from Cloudinary delivery
- app distinguishes upload errors from generation errors

## Phase 6 - Persist Shots and Ship My Shots

Goal: turn generation into a reusable product.

### Build

- add Prisma models for:
  - source uploads
  - generated shots
  - shot settings
  - visibility
- save successful generated results
- add My Shots page
- enable filtering by generation settings

### Exit criteria

- user can revisit prior results
- app renders previously saved transformed URLs without recomputing them

## Phase 7 - Convert Gallery From Static to Real

Goal: align the public gallery with the PRD.

### Build

- add public/private visibility on saved shots
- query public shots for `/gallery`
- add lightweight moderation rules for MVP

### Exit criteria

- public gallery is database-backed
- users can opt in to public visibility

## Phase 8 - Add Settings and Usage Visibility

Goal: complete the basic account product surface.

### Build

- settings page with:
  - profile details
  - monthly credit usage
  - next reset date
- optional download history and storage notes later

### Exit criteria

- user can see current usage and reset timing without guessing

## 7. Best Next Build Order

If you want the highest-leverage path from here, the build order should be:

1. Cloudinary foundation
2. Dashboard upload flow
3. Quota enforcement helpers
4. Generation URL rendering
5. Shot persistence
6. My Shots
7. Real public gallery
8. Settings page

## 8. Recommended Immediate Next Milestone

The best next milestone is:

**Ship one end-to-end private generation flow for authenticated users.**

That means this exact vertical slice:

1. user signs in
2. user uploads product image
3. image uploads to Cloudinary
4. dashboard stores `publicId`
5. app checks and consumes monthly quota
6. app builds Cloudinary transformation URL
7. result renders in dashboard
8. successful shot is saved to the database

Once that works, the rest of the product becomes additive instead of speculative.
