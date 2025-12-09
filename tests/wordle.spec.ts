import { test, expect } from '@playwright/test'

test('wordle loads initial state', async ({ page }) => {
  await page.goto('/#/wordle')
  await expect(page.getByRole('heading', { name: 'Wordle' })).toBeVisible()
  await expect(page.getByLabel('wordle-input')).toBeVisible()
  await expect(page.getByRole('status', { name: /game status/i })).toHaveText(/result: —/i)
})

test('submit guess clears input and registers a guess', async ({ page }) => {
  await page.goto('/#/wordle')
  const input = page.getByLabel('wordle-input')
  await input.fill('react')
  await page.getByRole('button', { name: /submit guess/i }).click()
  await expect(input).toHaveValue('')
})
