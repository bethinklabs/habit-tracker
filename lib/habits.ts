/**
 * Storage module for habits.
 *
 * The UI never touches localStorage directly; it goes through these functions.
 * Everything is stored as a JSON array under a single key. All functions are
 * safe to call on the server (they no-op and return empty values), so importing
 * this module never crashes during server rendering.
 */

export type Habit = {
  id: string
  name: string
  target: number
  unit?: string
  createdAt: string
}

export type HabitInput = {
  name: string
  target: number
  unit?: string
}

export type HabitField = 'name' | 'target'

export type ValidationError = {
  field: HabitField
  message: string
}

const STORAGE_KEY = 'habit-tracker:habits'

function read(): Habit[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Habit[]) : []
  } catch {
    return []
  }
}

function write(habits: Habit[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `h_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

/** Returns all habits in creation order (empty array if none). */
export function getHabits(): Habit[] {
  return read()
}

/**
 * Checks a habit's inputs. Returns the first problem found, or null if valid.
 * Name must be non-empty; target must be a whole number of at least 1.
 */
export function validate(input: { name: string; target: number }): ValidationError | null {
  if (!input.name.trim()) {
    return { field: 'name', message: 'Please enter a habit name.' }
  }
  if (!Number.isInteger(input.target) || input.target < 1) {
    return { field: 'target', message: 'Daily target must be a whole number of at least 1.' }
  }
  return null
}

/** Adds a habit and returns it. Trims the name and unit; drops a blank unit. */
export function addHabit(input: HabitInput): Habit {
  const habit: Habit = {
    id: makeId(),
    name: input.name.trim(),
    target: input.target,
    unit: input.unit?.trim() || undefined,
    createdAt: new Date().toISOString(),
  }
  const habits = read()
  habits.push(habit)
  write(habits)
  return habit
}

/** Updates name, target, and/or unit for a habit. Returns the updated habit, or null if not found. */
export function updateHabit(id: string, changes: Partial<HabitInput>): Habit | null {
  const habits = read()
  const index = habits.findIndex((h) => h.id === id)
  if (index === -1) return null

  const current = habits[index]
  const next: Habit = {
    ...current,
    name: changes.name !== undefined ? changes.name.trim() : current.name,
    target: changes.target !== undefined ? changes.target : current.target,
    unit: changes.unit !== undefined ? changes.unit.trim() || undefined : current.unit,
  }
  habits[index] = next
  write(habits)
  return next
}

/** Removes a habit. */
export function deleteHabit(id: string): void {
  write(read().filter((h) => h.id !== id))
}
