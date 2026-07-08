# Habit Tracker: Feature List

This is the agreed feature set for the habit tracker. It was produced in Step 1 of the tutorial by brainstorming the product with Superpowers. For how each choice was made, see `docs/tutorial/00-feature-list/decisions.md`.

## Product summary

- Single user. No accounts.
- All data is stored in the browser (localStorage). There is no backend.
- A habit has a name and a daily target count (for example "Water", target 8). Each day you count up toward the target. A day counts for a habit once its count reaches the target.

## Features, in build order

Each feature is a vertical slice: something you can design, test, and use on its own. Features 1 and 2 alone give a working app. Features 3 through 7 layer on value.

### 1. Create and manage habits
Add a habit with a name and a daily target count. Edit and delete habits. See the list of all habits. This feature also creates the small browser-storage module that every later feature reuses.

Done when: you can add, edit, and delete a habit, and the list survives a page reload.

### 2. Track today
For each habit, count up and down toward today's target, with a progress indicator. A habit is marked met for the day once its count reaches the target.

Done when: today's counts save and reload, and a habit shows as met when its count reaches its target.

### 3. Streaks
Show the current streak (consecutive days the target was met) and the best streak, per habit.

Done when: the current and best streak numbers are correct for a habit's recent history.

### 4. History view
A weekly or monthly grid showing which days each habit hit its target.

Done when: past days show met or not met correctly for each habit.

### 5. Categories
Group habits into categories (for example Health, Work) and filter the list by category.

Done when: a habit can be assigned a category, and the list can be filtered to a single category.

### 6. Daily notes
Attach a short note to a habit on a given day.

Done when: a note saves for a specific habit and day, and shows again when you return to that day.

### 7. Stats
Completion percentage over a chosen period, shown overall and per habit.

Done when: the percentage matches the underlying history for the selected period.
