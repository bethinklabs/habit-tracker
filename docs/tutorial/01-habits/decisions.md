# Feature 1 Decisions: Create and manage habits

This is the brainstorm checkpoint for feature 1 in the per-feature loop. We used Superpowers brainstorming to pin down the feature's behavior, data, and acceptance criteria before designing or building it.

How this step was done:
- Tool: Superpowers brainstorming (`/superpowers:brainstorming`).
- Model: Opus 4.8, xhigh effort.

Artifacts produced:
- `spec.md`: the feature spec.
- `claude-design-prompt.md`: the prompt to paste into Claude Design for the visual design.

## Decision 1: Habit fields

Options considered:
- Name and daily target only.
- Name, daily target, and a unit label.

Chosen: name and daily target are required; unit is optional.

Why: a unit ("glasses", "minutes") makes the count-toward-target model read clearly, but not every habit needs one, so it stays optional.

## Decision 2: Delete behavior

Options considered:
- Confirm first. (chosen)
- Delete immediately, no prompt.
- Delete with an undo.

Chosen: confirm before delete.

Why: it prevents accidental loss, which matters more once habits carry tracking history in later features, without the extra timer logic that an undo would need.

## Decision 3: Accepted defaults

- Each habit has a generated id; all habits live under one localStorage key as a JSON array.
- The list shows habits in creation order. No manual reordering (deferred).
- Editing a habit updates its record. There is no tracking data yet, so nothing downstream is affected.
- Validation: name required and non-empty; target a whole number, at least 1; unit optional. Duplicate names are allowed.

## Decision 4: Visual direction and animation

- A clean, sleek, modern design system with tasteful animations.
- Animation library: anime.js. The Claude Design prompt asks for motion that anime.js can drive.

## Brainstorm outcome

An agreed spec (`spec.md`) and a Claude Design prompt (`claude-design-prompt.md`).

## Design step

Ran the Claude Design prompt (Sonnet 5, xhigh) and exported the result to `design/`
(`Manage Habits.dc.html`, a light-mode screenshot, and the design system). The
export set the visual language: indigo accent (`#574fe6`), light background
`#f5f6f8` with white cards, dark background `#0c0d11`, danger `#e5484d`, fonts
Hanken Grotesk (body) and Space Grotesk (headings), card radius 18px, control
radius 11px.

## Test step

Wrote `e2e/manage-habits.spec.ts` (7 tests) from the six acceptance criteria,
using the labels from the design. Set up Playwright (`@playwright/test`,
`playwright.config.ts`, chromium). The tests were written first and were red,
which is the point: they defined the DOM contract the build had to meet.

## Build step

Plan in `plan.md`. Built with writing-plans then executing-plans (Sonnet 5,
xhigh). Key implementation decisions:

- Storage in `lib/habits.ts`: a single localStorage key, safe on the server.
- UI as a client-component tree under `app/_components/` (localStorage is
  browser-only), with the design system as CSS tokens in `app/globals.css`.
- anime.js v4 for the animations (`lib/animations.ts`), wrapped so a failure
  never breaks behavior.

Two adjustments made while looping to green:

1. Scoped the validation `role="alert"` checks to the add form, because Next.js
   renders its own global `role="alert"` route announcer.
2. Added `suppressHydrationWarning` to `<html>`, because the no-flash theme
   script sets `data-theme` before React hydrates.

## Result

All seven Playwright tests pass. The screen matches the design in light and
dark and in every state, with no console or hydration errors. This is
`checkpoint/01-habits`.
