import { expect, test } from '@playwright/test';

const appUrl = process.env['APP_URL'];

test.beforeEach(async ({ page }) => {
  await page.goto(`${appUrl}/main/list`);
  await expect(page.getByTestId('xbri-splash-screen')).toBeHidden();
});

test('start application properly', async ({ page }) => {
  await expect(page).toHaveURL(`${appUrl}/main/list`);
});

test('change to pt-BR', async ({ page }) => {
  await page.getByTestId('btn-change-i18n').click();
  await page.getByTestId('btn-change-i18n-pt-BR').click();
  const title = page.getByTestId('title');
  expect(title).toContainText('Lista de itens');
});

test('change to en-US', async ({ page }) => {
  await page.getByTestId('btn-change-i18n').click();
  await page.getByTestId('btn-change-i18n-en-US').click();
  const title = page.getByTestId('title');
  expect(title).toContainText('List of items');
});
