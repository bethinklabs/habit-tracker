# Claude Design prompt: Track today (feature 2)

Paste the prompt below into Claude Design (on [claude.ai](https://claude.ai) or in the Claude Desktop app) to design this feature. Use Sonnet 5 at xhigh effort, per the workflow in the README.

The prompt is self-contained on purpose, because Claude Design does not have this repo's context. It restates the existing design system from feature 1 so this new screen stays visually consistent, then asks for the new screen only.

---

I'm adding a screen to an existing habit tracker web app. Please reuse the design system below exactly, then apply it to one new screen.

**About the app.** A single-user habit tracker. Data lives in the browser, there are no accounts. It's built with React 19, Next.js (App Router), and Tailwind CSS v4. Animations are built with anime.js, so please design motion that anime.js can drive (opacity, transform, stagger, and timelines) rather than effects that depend on CSS-only tricks.

**The existing design system, please reuse as-is:**
- Accent color: `#574fe6` in light mode, `#8f8bff` in dark mode. This is the only accent color — no new colors.
- Danger color (for destructive actions only): `#e5484d` light, `#ff6369` dark.
- Light background `#f5f6f8` with white (`#ffffff`) cards; dark background `#0c0d11` with `#14161c` cards.
- Fonts: Hanken Grotesk for body text, Space Grotesk for headings.
- Card corner radius 18px, control (button/input) corner radius 11px.
- Existing components to reuse: a card surface, primary/secondary/danger buttons, a segmented tab control (pill-shaped, active tab on a raised surface), and an icon button (circular, ghost style).
- A header with a small square accent-colored logo mark, an app title, a segmented view switcher, and a theme toggle.

**The app currently has a "Manage habits" screen** (create/edit/delete habits: name, a daily target count, and an optional unit label like "glasses" or "minutes") and a "System" screen (a design-tokens preview). The header's segmented switcher currently reads Manage / System.

**Now design the "Today" screen**, which becomes the new default/home view. Update the header's segmented switcher to Today / Manage / System, with Today active.

Design these elements and states:

1. **Habit row.** One row per habit, listing every habit the person has created. Each row shows: the habit's name, a linear progress bar toward today's target, the count and target as text (for example "5 / 8 glasses"), a decrease button, and an increase button. The decrease button should read as disabled when the count is at 0.
2. **Met state.** Once a row's count reaches its target, show a clear "met" indicator — a checkmark plus a short label (e.g. "Met") — using the existing accent color. Do not introduce a new success color.
3. **Overshoot.** If the count goes past the target, the progress bar's fill should read as full (capped), while the count/target text keeps showing the real, larger number.
4. **Empty state.** A friendly prompt for when there are no habits yet, distinct from the Manage screen's empty state, with a way to jump to Manage to add the first habit.

**Motion** (built with anime.js in mind), tasteful rather than flashy:
- The progress bar fill animates smoothly when the count changes.
- The count text has a small, quick transition when it updates (for example a subtle scale or fade pulse).
- The "met" indicator animates in with a gentle pop or fade the moment a row crosses its target.

**Scope note.** This screen only tracks today's count per habit. Streaks, a history grid, categories, notes, and stats are later features — do not add them here.

**Please deliver:** the "Today" screen with all four states above, plus the updated header with the three-way tab switcher, in light and dark, and responsive down to mobile.

---
