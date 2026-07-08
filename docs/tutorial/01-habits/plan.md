# Feature 1 Plan: Create and manage habits

Goal: build the Manage habits screen so all seven Playwright tests in `e2e/manage-habits.spec.ts` pass and the UI matches the Claude Design in `design/`.

## Files

- `app/globals.css`: the design system as CSS tokens (light and dark), fonts, page background.
- `app/layout.tsx`: Hanken Grotesk (body) and Space Grotesk (headings), a no-flash theme script, metadata.
- `lib/habits.ts`: the `Habit` type, localStorage CRUD (`getHabits`, `addHabit`, `updateHabit`, `deleteHabit`), and a `validate` helper.
- `lib/animations.ts`: anime.js helpers (list stagger-in, new-row-in, row-out, error shake, dialog in).
- `app/page.tsx`: renders `<HabitsApp />`.
- `app/_components/*`: `HabitsApp`, `Header`, `AddHabitForm`, `NumberStepper`, `HabitList`, `HabitItem`, `DeleteDialog`, `EmptyState`.

## Approach

Tests are already written and are the target. Build to green, then screenshot the running app and compare against `design/screenshots/light.png`, refining until it matches.

## Steps

1. Storage module and types.
2. Design system in `globals.css`; fonts and theme in `layout.tsx`.
3. Components wired to storage: add form (with validation and a stepper), list and rows, inline edit, delete confirmation, empty state.
4. anime.js animations.
5. Run Playwright; loop until all seven pass.
6. Visual check against the design screenshot; refine spacing, color, and motion.

## Contract

The DOM contract the build must meet is written at the top of `e2e/manage-habits.spec.ts` (labels, roles, and accessible names). The build honors it rather than changing the tests.
