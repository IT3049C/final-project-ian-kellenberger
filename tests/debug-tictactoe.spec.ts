import { test } from '@playwright/test'

test('debug tictactoe content', async ({ page }) => {
  page.on('console', (msg) => console.log('PAGE LOG:', msg.type(), msg.text()))
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message, '\nSTACK:\n', err.stack))
  await page.goto('/#/tictactoe')
  const body = await page.content()
  console.log('PAGE CONTENT:', body.slice(0, 800))
  try {
    const asset = await page.request.get('/assets/index-qHLVeYez.js')
    console.log('SCRIPT STATUS', asset.status())
    console.log('SCRIPT BODY SNIPPET:', (await asset.text()).slice(0, 400))
  } catch (err) {
    console.log('FAILED TO GET ASSET', err.message)
  }
  const h2 = await page.locator('h2').textContent()
  console.log('H2 TEXT:', h2)
})
