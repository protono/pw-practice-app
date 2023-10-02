import { test } from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto('')
})
test.describe('first suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })
    test('first test', async ({ page }) => {
        await page.getByText('Form layouts').click()
    })
    test('open datepicker layouts page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})
test.describe('locators', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form layouts').click()
    })
    test('base locators syntax rules', async ({ page }) => {
        await page.locator('input').first().highlight() // tag
        await page.locator('.shape-rectangle').first().highlight() // class
        await page.locator('#inputEmail').first().highlight() // id
        await page.locator('[placeholder="Email"]').first().highlight() // attribute
        await page.locator('input[placeholder="Email"].shape-rectangle').first().highlight() // combination
        await page.locator(':text-is("Email")').first().highlight() // css
    })
    test.only('user facing locators', async ({ page }) => {
        await page.getByRole('textbox').first().highlight()
        await page.getByRole('button').first().highlight()
        await page.getByLabel('password').first().highlight()
        await page.getByPlaceholder('email').first().highlight()
        await page.getByText('name').first().highlight()
        await page.getByTitle('IoT Dashboard').first().highlight()
        await page.getByTestId('test-name').first().highlight()
    })

})
