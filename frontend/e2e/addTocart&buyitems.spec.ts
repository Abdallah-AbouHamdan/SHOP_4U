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
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('button', { name: 'Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
});