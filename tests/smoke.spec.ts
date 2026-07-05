import { expect, test } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/NaeesWrites/');

  await expect(page.locator('body')).toBeVisible();
  await expect(page).toHaveURL(/\/NaeesWrites\/?$/);
});

test('about page loads', async ({ page }) => {
  await page.goto('/NaeesWrites/about/');

  await expect(page.locator('body')).toBeVisible();
  await expect(page).toHaveURL(/\/NaeesWrites\/about\/?$/);
});
