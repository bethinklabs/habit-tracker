# Step 00 Decisions: the MVP feature list

This is the checkpoint for Step 1 of the tutorial. We used Superpowers brainstorming to turn "a habit tracker" into a concrete feature list. This file records the decisions we made and why, so a learner who jumps to `checkpoint/00-feature-list` understands the state they landed in.

The resulting artifact is `FEATURE-LIST.md` at the repo root.

How this step was done:
- Tool: Superpowers brainstorming (`/superpowers:brainstorming`).
- Model: Opus 4.8, xhigh effort.

## Decision 1: Scope, how ambitious?

Options considered:
- Minimal MVP: a few habits, daily check-off, a simple streak, browser storage.
- Fuller single-user app: adds history, categories, notes, and stats on top of the MVP. Browser storage. (chosen)
- Multi-user with backend: accounts, a database, sync across devices.

Chosen: Fuller single-user app.

Why: big enough to feel like a real app and to exercise the workflow across several features, but with no backend or accounts to slow down reaching something that works. It is a good fit for learning the loop.

## Decision 2: Habit model, what counts as "doing" a habit?

Options considered:
- Daily yes/no: check off once per day; streak is consecutive done days.
- Scheduled days: a habit is due only on chosen days.
- Frequency and count: count toward a target, for example 8 per day. (chosen)

Chosen: frequency and count toward a daily target.

Why: it is the most flexible model and gives richer UI to design and test (counters and progress). A day counts for a habit once its count reaches the target. A streak is the run of consecutive days the target was met.

## Decision 3: Storage

Chosen: in the browser (localStorage). No backend, no accounts.

Why: this follows from the single-user scope. It keeps setup minimal so learners focus on the workflow rather than infrastructure.

## Decision 4: Feature ordering, how to slice the work?

Options considered:
- Vertical slices: each feature is usable end to end. (chosen)
- Layered: build the whole data layer first, then all the UI.

Chosen: vertical slices.

Why: the tutorial builds one feature at a time, and each feature needs to be something you can design, write Playwright tests for, and use on its own. A layered build gives nothing usable until the very end and does not fit the loop.

## Outcome

The 7-feature list, in build order (see `FEATURE-LIST.md`):

1. Create and manage habits
2. Track today
3. Streaks
4. History view
5. Categories
6. Daily notes
7. Stats

Features 1 and 2 alone give a working app. Features 3 through 7 layer on value.

## Next step

Start the per-feature loop on feature 1 (Create and manage habits): brainstorm it in detail, design it in Claude Design, write its Playwright test cases, then plan and build it. That work becomes `checkpoint/01-habits`.
