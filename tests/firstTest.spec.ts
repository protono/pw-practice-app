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
test.describe('locator syntax rules', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form layouts').click()
    })
    test('locator syntax rules', async ({ page }) => {
        await page.locator('input').first().focus() // tag
        await page.locator('.shape-rectangle').first().focus() // class
        await page.locator('#inputEmail').first().focus() // id
        await page.locator('[placeholder="Email"]').first().focus() // attribute
        await page.locator('input[placeholder="Email"].shape-rectangle').first().focus() // combination
        await page.locator(':text-is("Email")').first().focus() // css
    })

})
