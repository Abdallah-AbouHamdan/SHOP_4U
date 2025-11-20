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
  await page.getByRole('article').filter({ hasText: 'Save 11%Tech Zone5.0(2)Smart' }).getByLabel('Add to favorites').click();
  await page.getByRole('article').filter({ hasText: 'Save 25%Fashion4.5(2)Cotton' }).getByLabel('Add to favorites').click();
  await page.getByRole('article').filter({ hasText: 'Save 5%Sport Zone4.5(2)Tennis' }).getByLabel('Add to favorites').click();
  await page.getByRole('button', { name: 'Favorites', exact: true }).click();
  await page.getByRole('article').filter({ hasText: 'Save 25%Fashion4.5(2)Cotton' }).getByLabel('Remove from favorites').click();
});