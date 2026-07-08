# Claude Design prompt: Manage habits (feature 1)

Paste the prompt below into Claude Design (on [claude.ai](https://claude.ai) or in the Claude Desktop app) to design this feature. Use Sonnet 5 at xhigh effort, per the workflow in the README.

The prompt is self-contained on purpose, because Claude Design does not have this repo's context.

---

I'm designing a habit tracker web app and want a clean, sleek, modern look with tasteful, polished motion. Please create a small design system, then apply it to the first screen.

**About the app.** A single-user habit tracker. Data lives in the browser, there are no accounts. It is built with React 19, Next.js (App Router), and Tailwind CSS v4. Animations will be built with anime.js, so please design motion that anime.js can drive (opacity, transform, stagger, and timelines) rather than effects that depend on CSS-only tricks.

**First, define a small, reusable design system** I can carry across later screens:
- A restrained color palette with one accent color, plus neutral surfaces, in both light and dark.
- A type scale, spacing scale, corner radius, and shadow style.
- Base components: buttons (primary, secondary, and a danger variant), a text input, a number input, and a modal dialog.
- Keep it minimal and elegant: generous whitespace, calm and confident, nothing noisy.

**Then apply it to the "Manage habits" screen**, which lets someone create and manage their habits. Design these elements and states:

1. **Add-habit form.** A name field (required), a daily target number (a whole number, at least 1), and an optional unit label (for example "glasses" or "minutes"). An add button. Show inline validation when the name is empty or the target is below 1.
2. **Habit list.** Each row shows the habit name and its target with the unit if present (for example "Drink water, 8 glasses"). Each row has edit and delete controls. Lay the list out so it stays clean and scannable with many habits.
3. **Edit.** Show how a row enters an edit state (inline or in a dialog, your call), reusing the same fields and validation as the add form.
4. **Delete confirmation.** A small dialog that asks to confirm before removing a habit, with cancel and delete actions.
5. **Empty state.** A friendly prompt to add the first habit when the list is empty.

**Motion** (built with anime.js in mind), tasteful rather than flashy:
- Habit rows enter with a subtle staggered fade and slide.
- A newly added habit animates into the list; a deleted row animates out after the confirmation.
- The confirmation dialog scales and fades in and out.
- Validation errors appear with gentle motion (a soft fade or a small shake).

**Scope note.** This screen is only for creating and managing habits. Daily tracking and progress come in a later feature, so do not add counters or progress bars here, but leave room in each row for a per-habit action area later.

**Please deliver:** the design system, and the "Manage habits" screen with all five states above, in light and dark, and responsive down to mobile.

---
