import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', (msg) => {
    console.log('PAGE LOG:', msg.type(), msg.text());
  });
  page.on('pageerror', (err) => {
    console.log('PAGE ERROR:', err.message);
    console.log(err.stack);
  });

  await page.goto('http://localhost:5173/#/tictactoe', { waitUntil: 'load' });
  console.log('Page title:', await page.title());
  console.log('H2 text:', await page.locator('h2').textContent());
  console.log('Body innerHTML snippet:', (await page.locator('body').innerHTML()).slice(0, 500));

  await browser.close();
})();
