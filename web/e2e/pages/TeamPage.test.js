const { test, expect } = require('@playwright/test')

test('automatically loads /team with correct parameters', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.locator('[placeholder="Email Address"]').fill('billy@example.com')
    await page.locator('[placeholder="Password"]').fill('#Billy22*')
    await page.locator('button:has-text("Sign in")').click()

    await expect(page).toHaveURL('http://localhost:3000/team/1?member=1')
})

test('displays fines for Billy Anderson', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.locator('[placeholder="Email Address"]').fill('billy@example.com')
    await page.locator('[placeholder="Password"]').fill('#Billy22*')
    await page.locator('button:has-text("Sign in")').click()

    const title = await page.locator('text=Billy Anderson')

    await expect(title).toBeTruthy()
})
