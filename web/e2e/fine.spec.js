const { test, expect } = require('@playwright/test')

test('test', async ({ page }) => {
    await page.goto('https://doinfine.app/')

    await page.locator('input[type="email"]').click()
    await page.locator('input[type="email"]').fill('billy@example.com')

    await page.locator('input[type="password"]').click()
    await page.locator('input[type="password"]').fill('#Billy22*')

    await page.locator('text=SignIn').click()

    await expect(page).toHaveURL('https://doinfine.app/team?member=B3ybO9k9PJYLW4Ug9nGw3q1dY192')

    await page.locator('[data-testid="AddIcon"] path').click()
    await expect(page).toHaveURL('https://doinfine.app/fine')

    await page.locator('div[role="button"]:has-text("​")').click()
    await page.locator('text=Steve Drew').click()

    await page.locator('textarea').first().fill('doing a test')

    await page.locator('text=Submit').click()

    await page.locator('button:has-text("Confirm")').click()


    await page.locator('text=Fine request has been submitted!').click()

    // Click text=Back Home
    await page.locator('text=Back Home').click()
    await expect(page).toHaveURL('https://doinfine.app/team?member=B3ybO9k9PJYLW4Ug9nGw3q1dY192')
})