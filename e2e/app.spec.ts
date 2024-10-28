import { expect, test } from '@playwright/test';

const appUrl = process.env['APP_URL'];

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl!);
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/CrudXbri/);
});

test('start application properly', async ({ page }) => {
  await expect(page).toHaveURL(`${appUrl}/main/list`);
});
