import { test, expect } from '@playwright/test'

test('tictactoe loads initial state', async ({ page }) => {
  await page.goto('/#/tictactoe')
  await expect(page.getByRole('heading', { name: 'Tic Tac Toe' })).toBeVisible()
  await expect(page.getByRole('group', { name: /board/i })).toBeVisible()
  await expect(page.getByRole('status', { name: /game status/i })).toHaveText(/result: —/i)
})

test('player can place X in cell 0', async ({ page }) => {
  await page.goto('/#/tictactoe')
  const cell0 = page.getByRole('button', { name: /cell-0/i })
  await cell0.click()
  await expect(cell0).toContainText(/x/i)
})
