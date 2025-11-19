import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('guest@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('12312312');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('alert').click();
  await page.getByRole('alert').click();
  await page.getByRole('alert').dblclick();
  await page.getByText('Sign InEnter your credentials to access your accountEmailPasswordNo account').click();
  await page.getByRole('alert').dblclick();
});