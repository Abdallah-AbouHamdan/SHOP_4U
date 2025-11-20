import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('user');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).fill('user@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('12312312');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('textbox', { name: 'Current password' }).click();
  await page.getByRole('textbox', { name: 'Current password' }).click();
  await page.getByRole('textbox', { name: 'Current password' }).fill('12312312');
  await page.getByRole('textbox', { name: 'New password' }).click();
  await page.getByRole('textbox', { name: 'New password' }).fill('12341234');
  await page.getByRole('textbox', { name: 'Confirm password' }).click();
  await page.getByRole('textbox', { name: 'Confirm password' }).fill('12341234');
  await page.getByRole('button', { name: 'Save password' }).click();
  await page.getByText('Password updated.').click();
});