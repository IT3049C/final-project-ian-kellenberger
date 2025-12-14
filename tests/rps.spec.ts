import { test, expect } from '@playwright/test';

test('loads initial state', async ({ page }) => {
  await page.goto('/#/rps'); // Use HashRouter if deploying to GitHub Pages
  await expect(page.getByRole('heading', { name: 'Rock Paper Scissors' })).toBeVisible();
  await expect(page.getByRole('group', { name: /choices/i })).toBeVisible();
  await expect(page.getByRole('status', { name: /game status/i })).toHaveText(/result: —/i);
});

test('allows interaction and shows a result', async ({ page }) => {
  await page.goto('/#/rps');
  await page.getByRole('button', { name: /rock/i }).click();
  await expect(page.getByRole('status', { name: /game status/i })).toContainText(/result:/i);
  await expect(page.getByText(/your choice:/i)).toContainText(/rock/i);
  await expect(page.getByText(/cpu choice:/i)).not.toContainText(/—/i);
});

test('reset returns to initial state', async ({ page }) => {
  await page.goto('/#/rps');
  await page.getByRole('button', { name: /paper/i }).click();
  await page.getByRole('button', { name: /reset game/i }).click();
  await expect(page.getByRole('status', { name: /game status/i })).toHaveText(/result: —/i);
  await expect(page.getByText(/your choice:/i)).toContainText(/—/i);
  await expect(page.getByText(/cpu choice:/i)).toContainText(/—/i);
});
