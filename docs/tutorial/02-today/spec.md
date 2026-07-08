# Feature 2 Spec: Track today

Part of the habit tracker (see `FEATURE-LIST.md`). This spec covers behavior, data, and acceptance only. The visual design comes from Claude Design (see `claude-design-prompt.md`), and the Playwright tests come next.

## Data model

A day's progress on a habit is an entry:
- `habitId`: the habit it belongs to.
- `date`: the local calendar date, `YYYY-MM-DD` (not UTC), so "today" matches the device's clock.
- `count`: whole number, at least 0.

Entries are stored as a JSON array under a single localStorage key: `habit-tracker:entries`. A habit with no entry for a date has an implicit count of 0 — nothing is written until the first change.

## Storage module

A new module, `lib/tracking.ts`, alongside `lib/habits.ts`. The UI never reads or writes these entries directly. It exposes:
- `todayKey()`: today's local date as `YYYY-MM-DD`.
- `getEntry(habitId, date)`: the count for that habit and date (0 if none).
- `getTodayCount(habitId)`: shorthand for `getEntry(habitId, todayKey())`.
- `incrementToday(habitId)` / `decrementToday(habitId)`: adjust today's count by 1, floored at 0, with no upper limit. Return the new count.
- `deleteEntriesForHabit(habitId)`: removes all entries for a habit. Called when a habit is deleted in Manage, so tracking data never outlives its habit.
- `isMet(count, target)`: `count >= target`. This is a plain computation, not stored, so changing a habit's target immediately changes whether today reads as met.

It handles the empty or missing key case, and is safe to import on the server (no-ops when there's no `window`), matching `lib/habits.ts`.

## Behavior

- **Home screen:** the app opens on a new "Today" tab. The header's view switcher becomes Today / Manage / System, in that order, with Today active by default.
- **Today list:** shows every habit, in the same order as Manage. Each row shows the habit's name, a linear progress bar, the count and target as text (for example "5 / 8 glasses", or "5 / 8" with no unit), a decrease button, and an increase button.
- **Progress bar:** fills toward 100% as the count approaches the target. If the count exceeds the target, the fill stays capped at 100% — the count/target text still shows the true count (for example "10 / 8 glasses").
- **Met indicator:** once a habit's count reaches its target, the row shows a "met" indicator (a checkmark plus label). It disappears again if the count drops back below target.
- **Increase/decrease:** the decrease button is disabled at 0. The increase button has no upper limit. Both update the count immediately and persist.
- **Empty state:** when there are no habits at all, Today shows its own prompt (distinct from Manage's "No habits yet") with a way to switch to Manage and add one.
- **Persistence:** all count changes survive a page reload.
- **Cross-feature effects:** deleting a habit in Manage removes its row from Today and clears its entries. Editing a habit's target in Manage is reflected on Today immediately (met is always computed live).

## Validation

- Count: whole number, floored at 0, no ceiling.
- A newly added habit starts at an implicit 0 for today.

## Next.js note

Like `lib/habits.ts`, `lib/tracking.ts` must be safe to import during server rendering. The Today screen is a client component that reads storage after mount, following the same pattern as the Manage screen. Confirm the client-component conventions against this repo's Next docs (`node_modules/next/dist/docs`) at build time, per `AGENTS.md`.

## Acceptance criteria (seed for the Playwright tests)

1. The Today tab is the view shown when the app loads.
2. Every habit on Today shows its current count and target.
3. Clicking increase raises the count, updates the progress bar, and persists after reload.
4. Clicking decrease lowers the count, floors at 0, and persists after reload.
5. A habit shows a "met" indicator once its count reaches its target, and stops showing it if the count drops back below target.
6. The count can exceed the target: the bar caps visually, but the count/target text shows the true number.
7. When there are no habits, Today shows its own empty state with a way to reach Manage.
8. Deleting a habit in Manage removes its row from Today.
