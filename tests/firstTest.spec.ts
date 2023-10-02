import { test } from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto('')
    await page.getByText('Forms').click()
})

test.describe('first suite', () => {
    test('first test', async ({ page }) => {
        await page.getByText('Form layouts').click()
    })
    test('open datepicker layouts page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})
