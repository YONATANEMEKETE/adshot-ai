# Monthly Credit Implementation

## Overview

AdShot AI uses a simple monthly quota system.

Each user gets:

- `5` generations per month
- a quota that resets at the start of the next month

This is not traditional rate limiting.

- `Rate limiting` means limiting requests per second or per minute
- `Monthly credit/quota` means limiting how many generations a user can use in a month

## Data Model

The quota is stored in a separate table linked to the app user.

```text
User
- id
- email
- name

UserQuota
- userId
- generationsUsed
- quotaLimit
- resetAt
- createdAt
- updatedAt
```

## Table Relationship

```mermaid
erDiagram
    User ||--|| UserQuota : has

    User {
        string id PK
        string email
        string name
    }

    UserQuota {
        string userId PK_FK
        int generationsUsed
        int quotaLimit
        datetime resetAt
        datetime createdAt
        datetime updatedAt
    }
```

## Field Meaning

- `userId`: links the quota row to one user
- `generationsUsed`: how many generations the user has used in the current month
- `quotaLimit`: the maximum allowed generations for the month, currently `5`
- `resetAt`: the timestamp when the quota resets

## How It Works

### 1. On first sign-in

When a user signs in with Google for the first time:

- create the `User` row
- create the `UserQuota` row
- set:
  - `generationsUsed = 0`
  - `quotaLimit = 5`
  - `resetAt = start of next month`

### 2. Before generation

Every time a user tries to generate:

- load their `UserQuota`
- check whether `now >= resetAt`

If the reset date has passed:

- set `generationsUsed = 0`
- move `resetAt` to the start of the following month

### 3. Check available quota

If:

```text
generationsUsed >= quotaLimit
```

then block the generation and show a monthly limit message.

### 4. Consume quota safely

If the user still has quota, increment usage with one guarded atomic update.

Example logic:

```sql
update user_quota
set generations_used = generations_used + 1
where user_id = $1
and generations_used < quota_limit
returning *;
```

If no row is returned, the user has already reached the monthly limit.

## Why This Design

- simple to understand
- one quota row per user
- no cron job required
- reset happens lazily on the next request
- safe against double spending when two requests happen at the same time

## Example

```text
User
- id: user_123
- email: demo@gmail.com

UserQuota
- userId: user_123
- generationsUsed: 2
- quotaLimit: 5
- resetAt: 2026-05-01T00:00:00.000Z
```

This means:

- the user has used `2` generations this month
- the user has `3` generations left
- the quota resets on `2026-05-01`

## Current Product Rule

- every signed-in user gets `5` generations per month
- quota resets monthly
- generation should be blocked when the user reaches the limit
