import { test } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'
test.beforeEach(async ({ page }) => {
    await page.goto('')
})
test.describe('content', () => {
    test('navigation ', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.goto().formLayoutsPage()
        await pm.goto().toastrPage()
    })
    test('parametrized methods', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.goto().formLayoutsPage()
        await pm.formLayouts.usingTheGrid_signIn('test@test.com', 'secret', 'Option 2')
        await pm.formLayouts.usingTheGrid_signIn('test@test2.com', 'secret', 'Option 1')
        await pm.formLayouts.inlineForm_submit('John Doe', 'test@test.com', true)
    })
    test('datepicker', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.goto().datepickerPage()
        await pm.datepicker.common_daysFromNow(3)
        await pm.datepicker.withRange_daysFromNow(3, 4)
    })
})
