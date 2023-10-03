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
})
