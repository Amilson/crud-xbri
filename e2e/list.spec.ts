import { expect, Locator, test } from '@playwright/test';

const appUrl = process.env['APP_URL'];

let title: Locator;
let btnSettings: Locator;
let btnSearch: Locator;
let btnNew: Locator;

test.beforeEach(async ({ page }) => {
  await page.goto(`${appUrl}/main/list`);
  title = page.getByTestId('title');
  btnSettings = page.getByTestId('btn-settings');
  btnSearch = page.getByTestId('btn-search');
  btnNew = page.getByTestId('btn-new');
  await expect(page.getByTestId('xbri-splash-screen')).toBeHidden();
});

test('start application properly', async ({ page }) => {
  await expect(page).toHaveURL(`${appUrl}/main/list`);
  await expect(title).toHaveText('Lista de itens');
  await expect(btnSettings).toBeVisible();
  await expect(btnSearch).toBeVisible();
  await expect(btnNew).toBeVisible();
});
