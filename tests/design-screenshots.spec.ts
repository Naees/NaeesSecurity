import { mkdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const screenshotDir = '.playwright-screenshots';
const routes = [
  { name: 'home', path: '/NaeesWrites/' },
  { name: 'about', path: '/NaeesWrites/about/' },
  { name: 'posts', path: '/NaeesWrites/posts/' },
];

for (const route of routes) {
  test(`capture ${route.name} screenshots`, async ({ page }) => {
    mkdirSync(screenshotDir, { recursive: true });

    await page.goto(route.path);
    await expect(page.locator('body')).toBeVisible();

    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.screenshot({
      path: `${screenshotDir}/${route.name}-desktop.png`,
      fullPage: true,
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: `${screenshotDir}/${route.name}-mobile.png`,
      fullPage: true,
    });
  });
}
