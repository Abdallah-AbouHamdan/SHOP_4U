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
  await page.getByRole('textbox', { name: 'Password' }).fill('12341234');
  await page.getByText('Seller - Sell your products').click();
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.getByRole('textbox', { name: 'Product title' }).click();
  await page.getByRole('textbox', { name: 'Product title' }).fill('dumble');
  await page.getByRole('textbox', { name: 'Tagline' }).click();
  await page.getByRole('textbox', { name: 'Tagline' }).fill('best db');
  await page.getByLabel('CategoryFashionTech').selectOption('Sport Zone');
  await page.getByRole('spinbutton', { name: 'Price' }).click();
  await page.getByRole('spinbutton', { name: 'Price' }).fill('100.00');
  await page.getByRole('textbox', { name: 'Image URL' }).click();
  await page.getByRole('textbox', { name: 'Image URL' }).fill('https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtYmVsbHN8ZW58MHx8MHx8fDA%3D');
  await page.getByRole('button', { name: 'Publish item' }).click();
  await page.getByRole('link', { name: 'SHOP_4U quick shop' }).click();
});