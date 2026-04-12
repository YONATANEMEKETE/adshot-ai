# AdShot AI Dev Roadmap

**Stage Assumption:** Marketing pages are complete. Authentication UI exists, but authentication, onboarding, billing, entitlement logic, dashboard behavior, and generation workflows are not yet production-ready.  
**Roadmap Start Date:** 2026-04-11  
**Planning Horizon:** 8 weeks  
**Execution Principle:** Do not skip identity and entitlement foundations. Build the dashboard and generation features on top of real user, plan, and usage contracts.

## Recommended Order

Build in this order:

1. Authentication and user identity
2. Plan selection and entitlement model
3. Billing integration for Pro
4. App shell and protected dashboard routes
5. Generation pipeline and job lifecycle
6. My Shots, Settings, and account controls
7. Limits, analytics, QA, and launch hardening

This is the correct sequence because the dashboard, image generation, BYOK, rate limits, and upgrade flows all depend on knowing:

- who the user is
- what plan they are on
- whether they can generate
- whether they are using platform credits or BYOK

Do not fully build generation first and "come back to auth later." That creates avoidable rework in routing, storage, limits, billing, and data modeling.

## Milestone 1: Auth Foundation

**Target:** 2026-04-11 to 2026-04-17  
**Goal:** Users can authenticate with Google, persist a session, and access protected app routes.

Tasks:

- Integrate Better Auth with Google OAuth
- Define environment variables and local/dev setup
- Create user table and base profile/account record
- Implement auth callbacks and session persistence
- Protect dashboard routes and redirect unauthenticated users
- Connect the existing auth dialog to the real auth flow
- Add sign-out flow
- Add minimal auth error and loading states

Definition of done:

- A new user can sign in
- A returning user stays signed in
- Protected routes reject unauthenticated access
- User identity is available server-side and client-side where needed

## Milestone 2: Plan Model and Onboarding

**Target:** 2026-04-18 to 2026-04-24  
**Goal:** Every authenticated user has a plan and an entitlement record before entering the product.

Tasks:

- Define plan model for `free` and `pro`
- Define entitlement fields: monthly image allowance, rate-limit tier, upscaling access, bulk download access, BYOK access, visibility controls
- Create onboarding flow after first login
- Force plan selection before first dashboard entry
- Persist chosen plan to the database
- Add upgrade entry points in onboarding and app shell
- Create seed/default behavior for users who start on Free

Definition of done:

- Every user has a valid plan state
- First-time users complete plan selection before using the dashboard
- Entitlements are queryable from one source of truth

## Milestone 3: Billing and Pro Upgrade

**Target:** 2026-04-25 to 2026-05-01  
**Goal:** Users can upgrade from Free to Pro and the system updates entitlements correctly.

Tasks:

- Choose final billing provider: Polar or Stripe
- Create product and price configuration
- Implement checkout session creation
- Handle successful purchase return flow
- Add webhook handling for subscription status updates
- Sync billing status to user entitlement records
- Support upgrade, downgrade, cancellation, and failed-payment states
- Add plan status UI in Settings

Definition of done:

- A Free user can upgrade to Pro
- Subscription state updates correctly after webhook delivery
- Pro entitlements activate without manual intervention

## Milestone 4: App Shell and Protected Dashboard Skeleton

**Target:** 2026-05-02 to 2026-05-08  
**Goal:** Authenticated users land inside a real product shell with role-appropriate navigation and state boundaries.

Tasks:

- Create protected app layout
- Add dashboard navigation for Studio, My Shots, Public Gallery, and Settings
- Implement authenticated route structure
- Create empty-state dashboard pages backed by real user/session data
- Add top-level plan badge and usage summary
- Add global entitlement guard helpers
- Add upgrade prompts when users hit gated features

Definition of done:

- Logged-in users can move through the app shell
- The shell displays real user and plan state
- Locked features are visibly gated by entitlement

## Milestone 5: Generation Pipeline MVP

**Target:** 2026-05-09 to 2026-05-22  
**Goal:** A user can upload one product image, trigger generation, and receive saved outputs.

Tasks:

- Finalize generation request schema
- Create upload flow to storage
- Create generation job record and status model
- Build background removal step integration
- Build orchestration layer for prompt construction
- Connect image generation provider
- Persist outputs and metadata
- Add progress, success, and failure states
- Add plan-aware generation checks before job creation
- Add basic monthly usage decrement logic

Definition of done:

- A valid user can complete one end-to-end generation cycle
- Outputs are saved and visible in the user's library
- Usage rules block invalid requests before cost is incurred

## Milestone 6: BYOK and Provider Routing

**Target:** 2026-05-23 to 2026-05-29  
**Goal:** Eligible users can attach their own provider key and route generation through it.

Tasks:

- Define supported provider list for first BYOK release
- Design secure key storage strategy
- Build BYOK management UI in Settings
- Add key validation flow
- Add provider-selection logic in generation orchestration
- Separate platform-managed usage from BYOK-backed usage
- Add audit-safe logging that never exposes raw keys
- Define fallback behavior when BYOK fails

Definition of done:

- A user can connect a key
- The system can validate and use that key
- Requests route correctly without leaking credentials

## Milestone 7: My Shots, Settings, and Account Controls

**Target:** 2026-05-30 to 2026-06-05  
**Goal:** Users can manage generated assets and their account from complete MVP screens.

Tasks:

- Build My Shots grid from real data
- Add filtering and sorting
- Add asset detail view
- Add public/private visibility toggle
- Add bulk download for eligible plans
- Add upscale action for eligible plans
- Complete Settings sections for profile, billing, plan, usage, BYOK, and session controls
- Add account notices for limits, plan changes, and billing state

Definition of done:

- Users can manage assets without leaving the app
- Settings covers the expected MVP account controls
- Plan restrictions are clear and enforced in UI

## Milestone 8: Usage Limits, Analytics, QA, and Launch Hardening

**Target:** 2026-06-06 to 2026-06-12  
**Goal:** The product is safe to test with real users.

Tasks:

- Finalize monthly quota reset logic
- Finalize rate-limiting strategy
- Add server-side authorization checks across protected actions
- Add analytics for auth, onboarding, upgrade, generation, and failure funnels
- Add audit logging for billing and generation events
- Write critical integration tests for auth, onboarding, billing, and generation gating
- Run accessibility and performance checks on app routes
- Prepare launch checklist and rollback notes

Definition of done:

- Core flows are observable
- High-risk paths have automated coverage
- Entitlements and billing cannot be bypassed by client-only logic

## Priority Rules

Use these rules while executing:

1. Do backend contracts before polished UI for protected product flows.
2. Do real data models before complex dashboard interactions.
3. Gate expensive generation work behind entitlement checks before you scale generation features.
4. Implement the minimum correct billing flow before building deep Pro-only features.
5. Keep BYOK behind a secure storage and validation design. Do not bolt it on late.

## What To Build In Parallel

You can overlap these without breaking the sequence:

- Milestone 4 dashboard shell can begin once Milestone 1 auth contracts are stable
- Milestone 7 screen UI can begin once Milestone 2 plan and entitlement model is stable
- Analytics events can be added incrementally starting in Milestone 1

Do not parallelize billing, entitlements, and generation provider integration too early. Those pieces change each other.

## Immediate Next Tasks

Start here, in order:

1. Install and configure Better Auth with Google OAuth
2. Create the user and entitlement schema
3. Protect app routes and wire the auth dialog to real sign-in
4. Build the first-time plan selection flow
5. Pick and integrate the billing provider for Pro

If execution time is limited, do not jump to image generation first. The shortest correct path is auth -> plans -> billing hooks -> protected dashboard shell -> generation MVP.
