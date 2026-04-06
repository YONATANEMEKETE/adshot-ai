# 🤖 AdShot AI - AI Agent Development Guidelines

> **Purpose:** This file is the single source of truth for all AI coding agents working on AdShot AI. Strictly follow these rules to maintain consistency, performance, accessibility, and alignment with the product's design system and architecture.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

## 🎯 Project Context

- **Product:** AdShot AI – An AI-powered "Virtual Studio" that transforms flat product photos into professional lifestyle marketing assets in seconds.
- **Target Users:** E-commerce entrepreneurs (Shopify/Etsy sellers) and social media managers.
- **Core MVP Features:** Smart background removal, thematic scene generation, prompt/vibe context, orientation control, image upscaling, gallery/asset management, and Better Auth authentication.
- **Primary Goal:** Deliver a high-converting, accessible, and performant SaaS UI with strict adherence to the existing `shadcn/ui` + Tailwind CSS theme system.

---

## 🛠 Tech Stack & Conventions

| Layer         | Technology                                                                        |
| ------------- | --------------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack)                                                |
| Library       | React 19 (Server Components by default, Client only for interactivity/animations) |
| Styling       | Tailwind CSS + `globals.css` CSS variables                                        |
| UI Primitives | `shadcn/ui` (Radix-based)                                                         |
| Animations    | Framer Motion                                                                     |
| Icons         | `lucide-react`                                                                    |
| State         | TanStack Query (server) + Zustand (client)                                        |
| Backend       | Supabase, Better Auth, Cloudinary, PromptLayer, Polar/Stripe                      |
| Analytics     | PostHog / Plausible                                                               |

**Rules:**

- Use `"use client"` **only** when required (hooks, event listeners, Framer Motion, interactivity).
- Prefer Server Components for static/layout/data-fetching.
- Use React 19 patterns: Server Actions, `useOptimistic`, `useFormStatus` where applicable.
- Never use deprecated Next.js or React APIs.

---

## 🎨 Design System & Theming (CRITICAL)

**ALWAYS use existing CSS variables from `globals.css`. NEVER hardcode colors.**

| Tailwind Class                           | Maps To                              |
| ---------------------------------------- | ------------------------------------ |
| `bg-background`                          | `--background`                       |
| `text-foreground`                        | `--foreground`                       |
| `bg-muted` / `text-muted-foreground`     | `--muted` / `--muted-foreground`     |
| `bg-primary` / `text-primary-foreground` | `--primary` / `--primary-foreground` |
| `border-border`                          | `--border`                           |
| `ring-ring`                              | `--ring`                             |
| `rounded-[--radius]`                     | `--radius`                           |

**Gradients & Backgrounds:**

```css
/* ✅ DO */
bg-gradient-to-b from-primary/5 via-background to-secondary/5
bg-background/80 backdrop-blur-md

/* ❌ DON'T */
bg-emerald-50, bg-violet-100, #f0fdf4, hardcoded hex/rgb values
```

---

## 📝 Typography

- **Headlines:** `font-bold tracking-tight leading-[1.1]`
- **Body:** `text-muted-foreground`
- Use proper heading hierarchy (h1 → h2 → h3)
- Respect line-height and letter-spacing from theme

---

## 🧩 Component Guidelines (shadcn/ui)

- Always use shadcn/ui primitives first: Button, Card, Badge, Input, Dialog, DropdownMenu, Skeleton, etc.
- Extend via composition, not inline styles or custom wrappers.
- Merge classes using the project's `cn()` utility (clsx + tailwind-merge).
- Maintain all accessibility attributes (aria-\*, role, tabIndex, disabled).
- Do not rebuild primitives that already exist in `/components/ui/`.

---

## 📐 Architecture & Code Structure

- Keep components small, single-responsibility, and composable.
- Use TypeScript interfaces/types for props and data structures.
- Validate env vars with Zod or `@t3-oss/env-nextjs`.
- Follow Next.js 16 caching & data-fetching conventions (`fetch` with cache options, `revalidateTag`, etc.).

---

## ⚡ Performance & Accessibility

- Use `next/image` with `priority` on hero/above-fold visuals, `loading="lazy"` elsewhere.
- Implement proper `alt` text, `width`/`height`, and responsive sizes.
- Ensure keyboard navigation, visible focus states, and proper contrast ratios.
- Avoid layout shift: reserve space for images, use `aspect-ratio` or fixed dimensions.
- Lazy-load non-critical JS, prefetch `<Link>` routes, minimize bundle size.
- Test with Lighthouse & axe DevTools.

---

## 🤖 AI Agent Rules

- Output only production-ready code when requested. No placeholders, no explanations unless asked.
- Never override or hardcode theme colors. Always use `bg-background`, `text-foreground`, `border-border`, etc.
- Use shadcn components for all UI elements. Do not invent custom buttons, cards, or inputs.
- Follow Next.js 16 + React 19 patterns. No `getServerSideProps`, no class components, no deprecated APIs.
- Always include proper imports, TypeScript types, and responsive breakpoints.
- Preserve existing file structure and naming conventions. Do not rename or move files without explicit instruction.
- When modifying code, output the full file (or clearly mark unchanged sections) to prevent merge conflicts.

---

## 🚫 Common Pitfalls to Avoid

| ❌ Mistake                                         | ✅ Fix                                           |
| -------------------------------------------------- | ------------------------------------------------ |
| Hardcoded colors (`bg-slate-100`, `text-blue-600`) | Use theme variables (`bg-muted`, `text-primary`) |
| Inline styles or CSS modules                       | Tailwind + `cn()` utility                        |
| Overusing `"use client"`                           | Keep Server Components, isolate client logic     |
| Missing `alt` text or `width`/`height` on images   | Use `next/image` properly                        |
| Breaking heading hierarchy or focus states         | Follow semantic HTML & WCAG 2.1 AA               |
| Rebuilding shadcn primitives                       | Import from `/components/ui/`                    |
