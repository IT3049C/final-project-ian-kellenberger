import { test, expect } from '@playwright/test'

test('tictactoe join flow via Join Room page', async ({ browser, baseURL }) => {
  // Player A creates a room via Create Room page with a name
  const ctxA = await browser.newContext({ baseURL })
  const pageA = await ctxA.newPage()
  await pageA.goto('/#/room/create')
  await pageA.fill('input[aria-label="create-player-name"]', 'Alice')
  await pageA.getByRole('button', { name: 'Create Room' }).click()
  const roomText = await pageA.getByText(/^Room:/).innerText()
  const roomId = roomText.replace('Room:', '').trim()

  // Player B navigates to Join Room page, enters name and code
  const ctxB = await browser.newContext({ baseURL })
  const pageB = await ctxB.newPage()
  await pageB.goto('/#/room/join')
  await pageB.fill('input[aria-label="join-player-name"]', 'Bob')
  await pageB.fill('input[aria-label="join-room-code"]', roomId)
  await pageB.getByRole('button', { name: 'Join Room' }).click()

  // Both should show joined room and player names
  await expect(pageA.locator('text=Players:')).toContainText('X: Alice')
  await expect(pageB.locator('text=Players:')).toContainText('X: Alice')
  await expect(pageB.locator('text=Players:')).toContainText('O: Bob')

  // Check turn and player identity
  await expect(pageA.locator('text=Turn:')).toContainText('Turn: X')
  await expect(pageA.locator('text=Turn:')).toContainText('You are: X (Alice)')
  await expect(pageB.locator('text=Turn:')).toContainText('Turn: X')
  await expect(pageB.locator('text=Turn:')).toContainText('You are: O (Bob)')

  await ctxA.close()
  await ctxB.close()
})
