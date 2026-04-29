# Dashboard Page Plan

## Summary

Use the dashboard area as a focused creation workspace with three user-facing pages for MVP:

- `/dashboard/my-studio` as the primary destination
- `/dashboard/my-shots` for personal asset management
- `/dashboard/settings` for profile + usage visibility

Keep `/dashboard` itself, but make it a redirect to `/dashboard/my-studio` instead of a separate content page. Do not add an extra Account page for MVP. Keep profile/account details inside Settings.

## Page Purposes

### `/dashboard`

- Purpose: route entry only.
- Behavior: immediately redirect authenticated users to `/dashboard/my-studio`.
- Why: the PRD says the core user flow is “sign in -> land in dashboard -> begin generation workflow,” so the fastest path is to take users straight into creation.
- Decision: remove it as a standalone content page.

### `/dashboard/my-studio`

- Purpose: the core “Virtual Studio” workspace.
- This is the most important dashboard page and should own the main product flow.
- Content:
  - product upload area
  - large central result workspace
  - right-side tweak/settings panel
  - quota visibility near the action area
  - generation/loading/result states
- This should feel like a creative studio, not an admin page.

### `/dashboard/my-shots`

- Purpose: personal library of generated work.
- Content:
  - grid/list of saved shots
  - filter by theme, scene richness, orientation, and date
  - search if available
  - quick actions like view, reuse, download, mark public/private later
- This page is about retrieval and iteration, not generation.

### `/dashboard/settings`

- Purpose: account and usage visibility hub for MVP.
- Content:
  - user profile details
  - avatar/name/email
  - monthly credit usage
  - reset date
  - generation/rate-limit visibility
- Keep this merged for MVP instead of splitting “Account” into its own route.

## Keep / Remove / Add

### Keep

- `/dashboard/my-studio`
- `/dashboard/my-shots`
- `/dashboard/settings`

### Remove as standalone page

- `/dashboard` content page
- Replace with redirect to `/dashboard/my-studio`

### Do not add yet

- `/dashboard/account`
- `/dashboard/billing`
- `/dashboard/history`
- `/dashboard/templates`

These can be added later, but they are not needed for the MVP defined in the PRD.

### Reasonable future additions after MVP

- `Shot detail` route if individual generations need a dedicated view
- `Public/private publish flow` tied to My Shots
- `Template/preset` system if reusable scene setups become important

## Implementation Changes

- Convert the current `/dashboard` page into a redirect page rather than a placeholder UI.
- Treat `my-studio` as the default selected nav destination and the main product investment area.
- Keep the sidebar nav to exactly three items for now:
  - My Studio
  - My Shots
  - Settings
- Structure `Settings` internally with sections so it can be split later if needed, but do not add another route yet.

## Test Plan

- Visiting `/dashboard` while authenticated redirects to `/dashboard/my-studio`.
- Sidebar navigation correctly routes between:
  - `/dashboard/my-studio`
  - `/dashboard/my-shots`
  - `/dashboard/settings`
- Active nav state still works after redirect behavior is introduced.
- Settings page can safely hold both profile details and usage/credit information without another route.

## Assumptions

- The MVP should prioritize the fastest path to creation over a separate dashboard overview.
- The PRD remains the source of truth, so “Settings / Account” stays combined for now.
- We are optimizing for a lean first product, not a multi-page SaaS control panel.
