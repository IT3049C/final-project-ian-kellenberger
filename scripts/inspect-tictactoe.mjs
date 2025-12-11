import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', msg => console.log('[PAGE_CONSOLE]', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('[PAGE_ERROR]', err.message));
  try {
    const url = 'http://localhost:5173/#/tictactoe'
    console.log('goto', url)
    await page.goto(url, { waitUntil: 'load', timeout: 10000 })
    const html = await page.content()
    console.log('page HTML length:', html.length)
    const heading = await page.$('h2')
    if (heading) {
      console.log('heading text:', await heading.innerText())
    } else {
      console.log('no h2 element')
    }
    const board = await page.$('[role="group"][aria-label="Board"]')
    console.log('board present', !!board)
    const boardButtons = await page.$$('[aria-label^="cell-"]')
    console.log('board buttons count', boardButtons.length)
    await page.screenshot({ path: 'debug-tictactoe.png', fullPage: true })
    console.log('screenshot saved')
  } catch (e) {
    console.error('NAV_ERROR', e)
  } finally {
    await browser.close()
  }
})()
