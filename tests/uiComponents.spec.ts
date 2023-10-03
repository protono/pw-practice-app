import { expect, test } from '@playwright/test'
test.beforeEach(async ({ page }) => {
    page.goto('')
})

test.describe('UI components', () => {
    test.describe('form layouts', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByText('Forms').click()
            await page.getByText('Form layouts').click()
        })
        test('input fields', async ({ page }) => {
            const card = page.locator('nb-card').filter({ hasText: 'Block form' })
            const email = card.getByRole('textbox', { name: 'Email' })
            await email.fill('test@test.com')
            await email.clear()
            await email.type('test@test.com') // deprecated
            await email.fill('')
            await email.pressSequentially('test@test.com')

            expect(await email.inputValue()).toEqual('test@test.com')
            await expect(email).toHaveValue('test@test.com')
        })
        test('radio buttons', async ({ page }) => {
            const card = page.locator('nb-card').filter({ hasText: 'Using the Grid' })
            const option1 = card.getByLabel('Option 1')
            const option2 = card.getByRole('radio', { name: 'Option 2' })
            await option1.check({ force: true })
            await option2.check({ force: true })

            var status = await option2.isChecked()
            expect(status).toBeTruthy()
            await expect(option2).toBeChecked()

            status = await option1.isChecked()
            expect(status).toBeFalsy()
            await expect(option1).not.toBeChecked()
        })
    })
    test.describe('toastr', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByText('Modal & Overlays').click()
            await page.getByText('Toastr').click()
        })
        test('checkboxes', async ({ page }) => {
            const card = page.locator('nb-card').filter({ hasText: 'Toaster configuration' })
            var cb = card.getByRole('checkbox', { name: 'Hide on click' })
            await cb.uncheck({ force: true })
            const cb_all = card.getByRole('checkbox')
            for (const cb of await cb_all.all()) {
                await cb.uncheck({ force: true })
                expect(await cb.isChecked()).not.toBeTruthy()
            }
        })
    })
    test.describe('header', () => {
        test('dropdown', async ({ page }) => {
            const header = page.locator('nb-layout-header')
            const dropdown = header.locator('nb-select')
            await dropdown.click()
            const list = page.locator('nb-option-list')
            const listitem_all = list.locator('nb-option')
            await expect(listitem_all).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']) //  neat!
            const text = 'Dark'
            await listitem_all.filter({ hasText: text }).click()
            await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)')
        })
    })

})
test.describe('tooltips', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
    })
    test('tootltip1', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Tooltip Placements' })
        var button = card.getByRole('button', { name: 'Top' })
        await button.hover()
        const text = await page.locator('nb-tooltip').textContent()
        expect(text).toEqual('This is a tooltip')
    })
})