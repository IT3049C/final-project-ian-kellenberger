import { test, expect } from '@playwright/test'

test('tictactoe multiplayer create/join syncs moves', async ({ browser, baseURL }) => {
  // Create two isolated contexts (two players)
  const ctxA = await browser.newContext({ baseURL })
  const pageA = await ctxA.newPage()
  await pageA.goto('/#/tictactoe')

  // Player A creates a room
  await pageA.getByRole('button', { name: 'Create Room' }).click()
  const roomText = await pageA.getByText(/^Room:/).innerText()
  const roomId = roomText.replace('Room:', '').trim()
  console.log('created room', roomId)

  // Player B joins
  const ctxB = await browser.newContext({ baseURL })
  const pageB = await ctxB.newPage()
  await pageB.goto('/#/tictactoe')
  await pageB.fill('#join-room-input', roomId)
  await pageB.getByRole('button', { name: 'Join Room' }).click()

  // Wait for both pages to show the same room id
  await expect(pageB.getByText(`Room: ${roomId}`)).toBeVisible()
  await expect(pageA.getByText(`Room: ${roomId}`)).toBeVisible()

  // Player A (X) makes a move on cell-0
  const aCell0 = pageA.getByRole('button', { name: /cell-0/i })
  await aCell0.click()
  await expect(aCell0).toHaveText(/x/i)

  // Player B should see the move shortly (polling interval)
  const bCell0 = pageB.getByRole('button', { name: /cell-0/i })
  await expect(bCell0).toHaveText(/x/i, { timeout: 5000 })

  // Player B (O) plays cell-1
  const bCell1 = pageB.getByRole('button', { name: /cell-1/i })
  await bCell1.click()
  await expect(bCell1).toHaveText(/o/i)

  // Player A should see the O on cell-1
  const aCell1 = pageA.getByRole('button', { name: /cell-1/i })
  await expect(aCell1).toHaveText(/o/i, { timeout: 5000 })

  await ctxA.close()
  await ctxB.close()
})
