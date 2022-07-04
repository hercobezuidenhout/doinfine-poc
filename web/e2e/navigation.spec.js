const { test, expect } = require('@playwright/test')

test('BottomNavigationBar navigates to /team when user clicks on Team icon', async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto('http://localhost:3000/');
    // Click [data-testid="team-item"]
    await page.locator('[data-testid="team-item"]').click();
    await expect(page).toHaveURL('http://localhost:3000/team');
})