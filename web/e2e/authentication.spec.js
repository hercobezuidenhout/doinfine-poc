const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://doinfine.app/');

  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('billy@example.com');
  await page.locator('input[type="email"]').press('Tab');
  await page.locator('input[type="password"]').fill('#Billy22*');
  await page.locator('text=SignIn').click();

  await expect(page).toHaveURL('https://doinfine.app/team');
});