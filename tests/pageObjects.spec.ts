import { expect, test } from '@playwright/test'
import { Sidebar } from './page-objects/sidebar'
test.beforeEach(async ({ page }) => {
    await page.goto('')
})
test.describe('navigate to content', () => {
    test('first test', async ({ page }) => {
        const sidebar = new Sidebar(page)
        await sidebar.open('Form Layouts')
        await sidebar.open('Toastr')
    })
})