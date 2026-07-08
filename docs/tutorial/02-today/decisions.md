# Feature 2 Decisions: Track today

This is the brainstorm checkpoint for feature 2 in the per-feature loop. We used Superpowers brainstorming to pin down the feature's behavior, data, and acceptance criteria before designing or building it.

How this step was done:
- Tool: Superpowers brainstorming (`/superpowers:brainstorming`).
- Model: Sonnet 5, xhigh effort. (The README recommends Opus 4.8, xhigh for brainstorming; this session was already set to Sonnet 5, xhigh before the step started.)

Artifacts produced:
- `spec.md`: the feature spec.
- `claude-design-prompt.md`: the prompt to paste into Claude Design for the visual design.

## Decision 1: Where tracking lives in the UI

Options considered:
- A new "Today" tab that becomes the home screen. (chosen)
- Merge counters directly into the existing Manage habits list.
- A new "Today" tab, but Manage stays the default view.

Chosen: a new Today tab, and the app now opens on it by default.

Why: a habit tracker is opened daily to log progress, not to edit habits. Manage stays focused on CRUD; Today becomes the primary, daily-use screen.

## Decision 2: Progress indicator style

Options considered:
- A linear progress bar with count/target text. (chosen)
- A circular progress ring.
- Count and target text only, no bar or ring.

Chosen: a linear bar.

Why: it scans cleanly down a list of habits and matches the calm, minimal design system from Feature 1, without the extra SVG and animation work a ring would need.

## Decision 3: How the count changes

Options considered:
- Explicit plus/minus buttons only. (chosen)
- Tap the row to add 1, with a long-press or swipe to subtract.

Chosen: plus/minus buttons.

Why: precise, keyboard- and screen-reader-friendly, and avoids accidental taps or gesture-handling complexity for a first pass at tracking.

## Decision 4: Count bounds

Options considered:
- Floor at 0, no ceiling. (chosen)
- Floor at 0, capped at the target.

Chosen: floor at 0, no ceiling.

Why: some habits are naturally exceeded (extra water, extra minutes), and "met" is a threshold to cross, not a hard cap. Capping at the target would throw away real information.

## Decision 5: Accepted defaults

- Entries are stored per local calendar date (`YYYY-MM-DD`), one JSON array under `habit-tracker:entries` — the same one-key-per-store pattern as habits.
- "Met" is computed live (`count >= target`), never stored, so editing a habit's target immediately changes whether today reads as met.
- Deleting a habit also deletes its tracking entries, so no orphaned data accumulates.
- Past the target, the progress bar's fill caps visually at 100%; the count/target text keeps showing the true count.
- The "met" indicator reuses the existing accent color rather than introducing a new success color, keeping Feature 1's restrained two-color palette (accent + danger).

## Brainstorm outcome

An agreed spec (`spec.md`) and a Claude Design prompt (`claude-design-prompt.md`) that extends Feature 1's design system with a Today screen.
