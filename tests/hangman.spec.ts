import { test, expect } from '@playwright/test'

test('hangman loads initial state', async ({ page }) => {
  await page.goto('/#/hangman')
  await expect(page.getByRole('heading', { name: 'Hangman' })).toBeVisible()
  await expect(page.getByRole('group', { name: /letters/i })).toBeVisible()
  await expect(page.getByRole('status', { name: /game status/i })).toHaveText(/result: —/i)
})

test('guessing disables a letter and reset restores it', async ({ page }) => {
  await page.goto('/#/hangman')
  const letterA = page.getByRole('button', { name: /letter-a/i })
  await letterA.click()
  await expect(letterA).toBeDisabled()

  await page.getByRole('button', { name: /reset game/i }).click()
  await expect(letterA).toBeEnabled()
  await expect(page.getByRole('status', { name: /game status/i })).toHaveText(/result: —/i)
})
