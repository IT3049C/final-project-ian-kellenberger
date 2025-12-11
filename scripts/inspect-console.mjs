import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', msg => console.log('PAGE_CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE_ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQUEST_FAILED:', req.url(), req.failure()));
  try {
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(5000);
  } catch (e) {
    console.error('NAV_ERROR', e);
  } finally {
    await browser.close();
  }
})();
