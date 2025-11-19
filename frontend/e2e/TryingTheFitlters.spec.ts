import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('username');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).fill('username@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('12341234');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.getByRole('combobox').first().selectOption('Fashion');
  await page.getByRole('combobox').first().selectOption('Sport Zone');
  await page.getByRole('combobox').first().selectOption('Tech Zone');
  await page.getByRole('slider', { name: 'Minimum price' }).fill('0');
  await page.getByRole('slider', { name: 'Maximum price' }).fill('2000');
  await page.getByRole('checkbox', { name: 'Discounted items only' }).check();
  await page.getByRole('checkbox', { name: 'Discounted items only' }).uncheck();
  await page.getByRole('combobox').nth(1).selectOption('priceLow');
  await page.getByRole('combobox').nth(1).selectOption('priceHigh');
  await page.getByRole('combobox').first().selectOption('All');
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});