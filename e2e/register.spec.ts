import { fakerPT_BR as faker } from '@faker-js/faker';
import { expect, Locator, test } from '@playwright/test';

const appUrl = process.env['APP_URL'];

let inputName: Locator;
let selectCategory: Locator;
let inputPrice: Locator;
let inputQuantity: Locator;
let checkStatus: Locator;
let btnSave: Locator;

const aleatoryNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

test.beforeEach(async ({ page }) => {
  await page.goto(`${appUrl}/main/register`);
  inputName = page.getByTestId('input-name');
  selectCategory = page.getByTestId('select-category');
  inputQuantity = page.getByTestId('input-quantity');
  inputPrice = page.getByTestId('input-price');
  checkStatus = page.getByTestId('check-status');
  btnSave = page.getByTestId('btn-save');
  await expect(page.getByTestId('xbri-splash-screen')).toBeHidden();
});

test('start application properly', async ({ page }) => {
  await expect(page).toHaveURL(`${appUrl}/main/register`);
});

test('submit successfully', async ({ page }) => {
  const quantity = aleatoryNumber(1, 2000);
  const price = faker.finance.amount();

  await inputName.fill(faker.commerce.product());
  await selectCategory.click();
  await page.locator('nz-option-item').first().click();

  await inputQuantity.fill(`${quantity}`);
  await inputPrice.fill(`${price}`);
  await btnSave.click();

  await expect(page).toHaveURL(`${appUrl}/main/list`);
});
