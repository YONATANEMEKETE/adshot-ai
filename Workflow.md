# 🚀 Git Workflow & Deployment Strategy

## Overview

This project uses a **simple, fast, and scalable Git workflow** optimized for SaaS development and seamless deployment.

- **Production** → `main` branch
- **Development** → `feature/*` branches
- **Preview (Staging)** → Automatically handled by Vercel preview deployments

---

## 🌿 Branch Strategy

### 1. `main` (Production)

- Always stable
- Always deployable
- Connected to Vercel production

---

### 2. `feature/*` (Development)

Used for all new work.

#### Naming Convention:

```
feature/<short-description>
```

#### Examples:

```
feature/auth-flow
feature/stripe-integration
feature/dashboard-ui
```

---

### 3. Other Branch Types (Optional)

#### Bug fixes:

```
fix/<short-description>
```

#### Refactoring / maintenance:

```
chore/<short-description>
```

#### Examples:

```
fix/navbar-overflow
chore/refactor-hooks
```

---

## 🔄 Workflow Process

### Step 1 — Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

---

### Step 2 — Develop & Commit

Work on your feature locally and commit changes using proper commit messages.

---

### Step 3 — Push to GitHub

```bash
git push origin feature/your-feature-name
```

✅ This automatically triggers a **Vercel Preview Deployment**

- Each branch gets its own live preview URL
- Use this to test your changes in a production-like environment

---

### Step 4 — Open Pull Request (PR)

- Create a PR from `feature/*` → `main`
- Review your changes
- Test using the Vercel preview link

---

### Step 5 — Merge to Production

- Once everything looks good → merge PR into `main`
- This triggers **production deployment on Vercel**

---

## ✍️ Commit Message Guidelines

Use clear and structured commit messages.

### Format:

```
type: short description
```

### Types:

- `feat` → new feature
- `fix` → bug fix
- `chore` → maintenance
- `refactor` → code improvement
- `docs` → documentation

---

### Examples:

```
feat: add authentication flow
fix: resolve navbar overflow issue
chore: clean up unused components
refactor: simplify state management
docs: add workflow documentation
```

---

## ⚠️ Rules

- ❌ Never commit directly to `main`
- ✅ Always use feature branches
- ✅ Always test using Vercel preview before merging
- ✅ Keep commits small and meaningful
- ✅ Use Pull Requests for all merges

---

## 🧠 Key Principle

> Vercel Preview Deployments = Your Staging Environment

No separate staging branch is needed.

---

## ✅ Summary

- `main` → production
- `feature/*` → development
- Vercel preview → testing
- PR → review + merge → deploy

---

Stay consistent. Ship fast. 🚀
