# 🤝 Contributing Guidelines

## 🌿 Branching Strategy

To keep the codebase clean and maintainable, follow this branching structure:

### Main Branch

* `main` is the **stable production-ready branch**
* ❌ Do not commit directly to `main`
* ✅ All changes must go through Pull Requests (PRs)

---

### Feature Branches

All new work must be done in a separate branch.

#### Naming Convention:

```
feature/<short-description>
```

#### Examples:

```
feature/auth-flow
feature/dashboard-ui
feature/payment-integration
```

---

### Other Branch Types

#### Bug Fixes:

```
fix/<short-description>
```

#### Maintenance / Refactoring:

```
chore/<short-description>
```

#### Examples:

```
fix/navbar-overflow
chore/refactor-hooks
```

---

## 🔄 Workflow Rules

* Always create a new branch from `main`
* Keep branches focused on a single task or feature
* Open a Pull Request (PR) to merge changes into `main`
* Ensure your code is clean and tested before submitting a PR
* Avoid large, unrelated changes in a single PR

---

## ✍️ Commit Message Guidelines

Write clear, concise, and consistent commit messages.

### Format:

```
type: short description
```

---

### Allowed Types:

* `feat` → new feature
* `fix` → bug fix
* `chore` → maintenance tasks
* `refactor` → code improvements without changing behavior
* `docs` → documentation updates

---

### Examples:

```
feat: add authentication flow
fix: resolve navbar overflow issue
chore: remove unused components
refactor: simplify state management
docs: update contributing guidelines
```

---

## ⚠️ Rules to Follow

* ❌ Do not commit directly to `main`
* ✅ Always use a properly named branch
* ✅ Keep commits small and meaningful
* ✅ Use descriptive commit messages
* ✅ Open a PR for all changes

---

## ✅ Summary

* Use `main` as the stable branch
* Create branches for all work
* Follow naming conventions
* Write clean commit messages
* Use Pull Requests for merging

---

Consistency in workflow helps maintain code quality and team efficiency.
