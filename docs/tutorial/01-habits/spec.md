# Feature 1 Spec: Create and manage habits

Part of the habit tracker (see `FEATURE-LIST.md`). This spec covers behavior, data, and acceptance only. The visual design comes from Claude Design (see `claude-design-prompt.md`), and the Playwright tests come next.

## Data model

A habit has:
- `id`: generated string.
- `name`: required, non-empty (trimmed).
- `target`: required, whole number, at least 1.
- `unit`: optional short label (for example "glasses").
- `createdAt`: timestamp.

Habits are stored as a JSON array under a single localStorage key: `habit-tracker:habits`.

## Storage module

One small module that later features reuse, so the UI never reads or writes localStorage directly. It exposes:
- `getHabits()`: returns all habits (empty array if none).
- `addHabit({ name, target, unit? })`: adds a habit and returns it.
- `updateHabit(id, changes)`: updates name, target, and/or unit.
- `deleteHabit(id)`: removes a habit.

It handles the empty or missing key case.

## Behavior

- **Add:** a form with name, target, and optional unit. On submit it validates, adds the habit, and clears the form. Invalid input shows an inline message and adds nothing.
- **List:** shows all habits in creation order. Each row shows the name and the target with the unit if set (for example "Drink water, 8 glasses"), plus edit and delete controls.
- **Edit:** change name, target, or unit, with the same validation as add.
- **Delete:** asks to confirm. Cancel keeps the habit; confirm removes it.
- **Empty state:** when there are no habits, show a short prompt to add the first one.
- **Persistence:** all changes survive a page reload.

## Validation

- Name: required, trimmed, not empty.
- Target: required, whole number, at least 1.
- Unit: optional; trimmed if present.
- Duplicate names are allowed.

## Next.js note

localStorage is browser-only, so the habits UI runs as a client component and reads storage after mount. Confirm the client-component conventions against this repo's Next docs (`node_modules/next/dist/docs`) at build time, per `AGENTS.md`.

## Acceptance criteria (seed for the Playwright tests)

1. Adding a habit with a name and target (and optional unit) shows it in the list.
2. An added habit persists after a page reload.
3. Adding with an empty name, or a target below 1, shows an error and adds nothing.
4. Editing a habit's name, target, or unit updates the list and persists.
5. Delete asks to confirm: cancel keeps the habit; confirm removes it; the removal persists.
6. The empty state shows when no habits exist.
