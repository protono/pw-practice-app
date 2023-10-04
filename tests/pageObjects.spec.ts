import { expect, test } from '@playwright/test'
import { Sidebar } from './page-objects/sidebar'
import { FormLayouts } from './page-objects/modal'
test.beforeEach(async ({ page }) => {
    await page.goto('')
})
test.describe('content', () => {
    test('navigation ', async ({ page }) => {
        const sidebar = new Sidebar(page)
        await sidebar.openFormLayouts()
        await sidebar.openToastr()
    })
    test('parametrized methods', async ({ page }) => {
        const sidebar = new Sidebar(page)
        await sidebar.openFormLayouts()
        const formLayouts = new FormLayouts(page)
        await formLayouts.usingTheGrid_signIn('test@test.com', 'secret', 'Option 2')
        await formLayouts.usingTheGrid_signIn('test@test2.com', 'secret', 'Option 1')
        await formLayouts.inlineForm_submit('John Doe', 'test@test.com', true)
    })

})
