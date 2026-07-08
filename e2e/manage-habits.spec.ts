import { test, expect, type Page } from '@playwright/test'

/**
 * Feature 1: Create and manage habits.
 *
 * These tests are the goal the build has to reach. They encode the six
 * acceptance criteria from docs/tutorial/01-habits/spec.md, using the labels
 * from the Claude Design screen (docs/tutorial/01-habits/design).
 *
 * They will fail until feature 1 is built. That is expected: the tests come
 * first and define the contract below.
 *
 * DOM contract the build must satisfy (route "/"):
 * - Add form: a textbox labeled "Habit name", a number input labeled
 *   "Daily target", an optional textbox labeled "Unit", and a button "Add habit".
 * - Habit list: a list (role=list) whose items (role=listitem) each show the
 *   habit name plus its target and unit as text, with buttons named "Edit" and
 *   "Delete".
 * - Empty state: a heading "No habits yet" when there are no habits.
 * - Edit: clicking "Edit" opens a form with accessible name "Edit habit"
 *   holding the same "Habit name", "Daily target", and "Unit" fields and a
 *   "Save" button.
 * - Delete: clicking "Delete" opens a dialog (role=dialog) containing the text
 *   "Delete this habit?" with "Cancel" and "Delete" buttons.
 * - Validation errors are announced with role="alert".
 *
 * Each test starts from a fresh browser context, so localStorage is empty.
 */

async function addHabit(
  page: Page,
  habit: { name: string; target?: number; unit?: string },
) {
  await page.getByLabel('Habit name').fill(habit.name)
  if (habit.target !== undefined) {
    await page.getByLabel('Daily target').fill(String(habit.target))
  }
  if (habit.unit) {
    await page.getByLabel('Unit').fill(habit.unit)
  }
  await page.getByRole('button', { name: 'Add habit' }).click()
}

function habitRow(page: Page, name: string) {
  return page.getByRole('listitem').filter({ hasText: name })
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('shows the empty state when there are no habits (criterion 6)', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /no habits yet/i })).toBeVisible()
  await expect(page.getByRole('listitem')).toHaveCount(0)
})

test('adds a habit and shows it in the list (criterion 1)', async ({ page }) => {
  await addHabit(page, { name: 'Drink water', target: 8, unit: 'glasses' })

  const row = habitRow(page, 'Drink water')
  await expect(row).toBeVisible()
  await expect(row).toContainText('8')
  await expect(row).toContainText('glasses')
  await expect(page.getByRole('heading', { name: /no habits yet/i })).toHaveCount(0)
})

test('keeps an added habit after a page reload (criterion 2)', async ({ page }) => {
  await addHabit(page, { name: 'Read', target: 20, unit: 'minutes' })
  await expect(habitRow(page, 'Read')).toBeVisible()

  await page.reload()
  await expect(habitRow(page, 'Read')).toBeVisible()
  await expect(habitRow(page, 'Read')).toContainText('20')
})

test('rejects an empty name and adds nothing (criterion 3)', async ({ page }) => {
  await page.getByLabel('Daily target').fill('5')
  await page.getByRole('button', { name: 'Add habit' }).click()

  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByRole('listitem')).toHaveCount(0)
})

test('rejects a target below 1 and adds nothing (criterion 3)', async ({ page }) => {
  await page.getByLabel('Habit name').fill('Pushups')
  await page.getByLabel('Daily target').fill('0')
  await page.getByRole('button', { name: 'Add habit' }).click()

  await expect(page.getByRole('alert')).toBeVisible()
  await expect(habitRow(page, 'Pushups')).toHaveCount(0)
})

test('edits a habit and persists the change (criterion 4)', async ({ page }) => {
  await addHabit(page, { name: 'Walk', target: 3, unit: 'km' })

  await habitRow(page, 'Walk').getByRole('button', { name: 'Edit' }).click()

  const editForm = page.getByRole('form', { name: 'Edit habit' })
  await editForm.getByLabel('Habit name').fill('Walk the dog')
  await editForm.getByLabel('Daily target').fill('5')
  await editForm.getByRole('button', { name: /save/i }).click()

  const updated = habitRow(page, 'Walk the dog')
  await expect(updated).toBeVisible()
  await expect(updated).toContainText('5')

  await page.reload()
  await expect(habitRow(page, 'Walk the dog')).toContainText('5')
})

test('confirms before deleting: cancel keeps it, confirm removes it and persists (criterion 5)', async ({ page }) => {
  await addHabit(page, { name: 'Meditate', target: 10, unit: 'minutes' })

  // Open the confirm dialog, then cancel: the habit stays.
  await habitRow(page, 'Meditate').getByRole('button', { name: 'Delete' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText(/delete this habit/i)
  await dialog.getByRole('button', { name: /cancel/i }).click()
  await expect(habitRow(page, 'Meditate')).toBeVisible()

  // Open it again and confirm: the habit is removed and stays removed after reload.
  await habitRow(page, 'Meditate').getByRole('button', { name: 'Delete' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Delete' }).click()
  await expect(habitRow(page, 'Meditate')).toHaveCount(0)

  await page.reload()
  await expect(habitRow(page, 'Meditate')).toHaveCount(0)
})
