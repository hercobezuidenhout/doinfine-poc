const { test, expect } = require('@playwright/test');

test('Authentication works with email and password', async ({ page }) => {
  await page.goto('https://thankful-sand-0a1eb4203.1.azurestaticapps.net/');
    
  await page.locator('[placeholder="Email Address"]').click();
  await page.locator('[placeholder="Email Address"]').fill(process.env.TEST_USER);

  await page.locator('[placeholder="Password"]').click();
  await page.locator('[placeholder="Password"]').fill(process.env.TEST_PASSWORD);
  await page.locator('button:has-text("Sign in")').click();

  await expect(page).toHaveURL('https://thankful-sand-0a1eb4203.1.azurestaticapps.net');
});