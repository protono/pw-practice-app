import { expect } from '@playwright/test'
import { test } from '../test-options'
test.beforeEach(async ({ page }) => {
    await page.goto('')
})

test.describe('UI components', () => {
    test.describe('smart table', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByText('Tables & Data').click()
            await page.getByText('Smart Table').click()
        })
        test('browser dialogs', async ({ page }) => {
            const card = page.locator('nb-card').filter({ hasText: 'Smart Table' })
            const row = card.locator('tbody tr').first()
            await expect(row).toContainText('@mdo')
            page.on('dialog', dialog => {
                expect(dialog.message()).toEqual('Are you sure you want to delete?')
                dialog.accept()
            })
            await row.locator('.nb-trash').click()
            await expect(row).not.toContainText('@mdo')
        })
        test('web tables', async ({ page }) => {
            const card = page.locator('nb-card').filter({ hasText: 'Smart Table' })
            const table = card.locator('tbody')
            var row = table.getByRole('row', { name: '@twitter' })
            await row.locator('.nb-edit').click()
            var cell = table.getByPlaceholder('Age')
            await cell.clear()
            await cell.fill('36')
            await table.locator('.nb-checkmark').click()
            await expect(row).toContainText('36')

            const pager = card.locator('ng2-smart-table-pager')
            const pages = pager.getByRole('list').getByRole('listitem')
            await pages.getByText('3').click()
            // intersection between two datasets (but use 'page.' in the has: clause)
            row = table.getByRole('row', { name: '27' }).filter({ has: page.locator('td').nth(1).getByText('27') })
            await row.locator('.nb-edit').click()
            await cell.clear()
            await cell.fill('27')
            await table.locator('.nb-checkmark').click()
            await expect(row.locator('td').nth(6)).toContainText('27')

            await pages.getByText('First').click()
            const ages = ['20', '30', '40', '50']
            for (let age of ages) {
                await card.locator('input-filter').getByPlaceholder('Age').clear()
                await card.locator('input-filter').getByPlaceholder('Age').fill(age)
                const rows = table.locator('tr')
                await page.waitForTimeout(500)
                for (let row of await rows.all()) {
                    const value = await row.locator('td').last().textContent()
                    if (age == '50') {
                        expect(value).toEqual(' No data found ')
                    } else {
                        expect(value).toEqual(age)
                    }
                }
            }
        })
    })
})