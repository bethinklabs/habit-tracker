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

## Outcome

An agreed spec (`spec.md`) and a Claude Design prompt (`claude-design-prompt.md`).

Next step: run the Claude Design prompt to design the screen, then write the Playwright test cases from the acceptance criteria.
