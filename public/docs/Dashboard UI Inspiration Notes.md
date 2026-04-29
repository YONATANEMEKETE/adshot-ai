# Dashboard UI Inspiration Notes

**Last Updated:** 2026-04-29

## Purpose

This document captures dashboard UI ideas borrowed from external inspirations for AdShot AI.

The goal is **not** to copy the reference literally.

The goal is to borrow:

- layout ideas
- information hierarchy
- spacing logic
- interaction patterns

and then adapt them to the AdShot AI product and PRD.

## Inspiration Reference 1

### Source image

The reference image shows:

- a dark dashboard workspace
- a narrow left sidebar
- rounded bubble-style icon buttons in the sidebar
- a settings/customization panel immediately to the right of the sidebar
- a larger content/output area on the right
- generated image cards and loading/generation states

## What We Want To Borrow

### 1. Left rail simplicity

We want to borrow the **simple, narrow vertical sidebar** idea.

For AdShot AI, this means:

- AdShot AI logo at the top
- three rounded bubble navigation buttons in the middle:
  - `My Studio`
  - `My Shots`
  - `Settings`
- user avatar at the bottom

### 2. Workspace split

We want to borrow the idea of the workspace being split horizontally into clear zones.

For AdShot AI, the updated structure should be:

1. left navigation rail
2. large center output/results area
3. right settings/customization panel

This is now the main structural idea we want from the inspiration.

### 3. Settings panel placement

For AdShot AI, the creative controls should live on the **right side** of the workspace.

This can be implemented in either of these ways:

- as a right-side sidebar
- or as a floating control card anchored on the right

For the first pass, this panel should contain:

- theme selection
- scene intensity
- other generation settings

This should feel like the command center for building a shot without taking attention away from the result area.

### 4. Output-focused center area

We want the largest visual area to belong to the generated output and generation states.

For AdShot AI, the center area should eventually handle:

- uploaded image preview
- generation loading states
- generated image results
- result variations if we support multiple later

## What We Do NOT Want To Copy

We are **not** copying these parts directly:

- the exact dark visual style
- the exact prompt-box layout
- the exact image card arrangement
- the exact labels or tool categories
- the exact orange/black art direction

AdShot AI should stay aligned with its own design system and product needs.

## AdShot AI Dashboard Structure

Based on this inspiration, the dashboard UI should be structured like this:

```text
| Sidebar | Result / Output Area | Settings Panel |
```

## Panel 1: Sidebar

### Role

Primary navigation and account anchor.

### Content

- AdShot AI logo at the top
- bubble nav buttons in the center
- user avatar at the bottom

### Planned nav items

- `My Studio`
- `My Shots`
- `Settings`

### Notes

- keep it narrow
- keep it visually quiet
- use rounded, button-like nav items
- prioritize icon + label clarity
- this should feel lightweight, not like a heavy admin dashboard

## Panel 2: Result / Output Area

### Role

The main visual feedback zone.

### Content direction

This area should eventually show:

- source upload preview
- result placeholder state
- generation loading UI
- generated result cards or preview panels

### Notes

- this should be the largest area in the layout
- loading states matter a lot here
- the user should always understand what is happening:
  - no image yet
  - uploading
  - generating
  - generated
  - failed

## Panel 3: Settings Panel

### Role

The shot-building control panel.

### Content direction

This is where the user configures how the output should look.

Initial controls should include:

- `Theme`
- `Scene Intensity`
- `Orientation`
- optional extra settings later

Possible future additions:

- vibe context
- prompt assist
- upscale toggle
- public/private visibility

### Notes

- keep this panel structured and easy to scan
- use clear grouping
- avoid making it feel like a technical form
- it should feel creative and approachable

## UX Interpretation For AdShot AI

This inspiration suggests a useful product principle:

**Keep navigation minimal, give most of the space to the creative result, and keep controls nearby on the right.**

That principle fits AdShot AI very well.

## Dashboard Layout Direction

The dashboard should feel like:

- a focused creative workspace
- not an analytics dashboard
- not a complex admin panel
- not a generic SaaS table layout

It should feel closer to:

- a studio tool
- a creative control desk
- an image generation workspace

## Initial Build Translation

When building the first dashboard UI pass, we should aim for:

### Sidebar

- slim vertical rail
- logo top
- three nav buttons center
- avatar bottom

### Output area

- large preview surface
- empty state before generation
- obvious loading state
- polished result presentation after generation

### Studio settings panel

- positioned on the right side
- can feel like a slim sidebar or a floating control card
- stacked controls
- one clear primary action button

## Design Guardrails

When translating this inspiration into AdShot AI:

- use the existing project theme tokens
- use existing UI primitives where possible
- do not hardcode outside colors
- keep the layout premium but simple
- avoid cluttering the settings panel
- prioritize clarity over novelty

## Summary Of What To Steal

From this inspiration, we are intentionally stealing:

1. the narrow left sidebar layout
2. the rounded bubble-nav treatment
3. the logo-top / avatar-bottom structure
4. the idea of a dedicated tweak/settings panel
5. the idea that the result area should dominate the layout
6. the idea that generation/loading states should live in the main visual area

## Summary Of The AdShot AI Version

Our adapted version should be:

- left: AdShot navigation rail
- middle: large image result workspace
- right: generation settings panel

That is the dashboard UI direction to follow for the next build phase.
