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
    test.describe('tooltip', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByText('Modal & Overlays').click()
            await page.getByText('Tooltip').click()
        })
        test('tooltips', async ({ page }) => {
            const card = page.locator('nb-card').filter({ hasText: 'Tooltip Placements' })
            var button = card.getByRole('button', { name: 'Top' })
            await button.hover()
            const text = await page.locator('nb-tooltip').textContent()
            expect(text).toEqual('This is a tooltip')
        })
    })
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
    test.describe('datepicker', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByText('Forms').click()
            await page.getByText('Datepicker').click()
        })
        test('common dp', async ({ page }) => {
            const card = page.locator('nb-card').filter({ hasText: 'Common Datepicker' })
            const button = card.getByPlaceholder('Form Picker')
            await button.click()

            let date = new Date()
            date.setDate(date.getDate() + 1000)
            let newDate = date.getDate().toString()
            let newMonthShort = date.toLocaleString('en-US', { month: 'short' })
            let newMonthLong = date.toLocaleString('en-US', { month: 'long' })
            let newYear = date.getFullYear()
            const targetMonth = `${newMonthLong} ${newYear}`
            const expectedDate = `${newMonthShort} ${newDate}, ${newYear}`

            const cal = page.locator('nb-calendar')
            const months = cal.locator('nb-calendar-view-mode')
            let curMonth = await months.textContent()
            const nextMonth = cal.locator('nb-calendar-pageable-navigation').getByRole('button').last()
            while (!curMonth.includes(targetMonth)) {
                await nextMonth.click()
                curMonth = await months.textContent()
            }
            const cell = cal.locator('[class="day-cell ng-star-inserted"]')
            await cell.getByText(newDate, { exact: true }).click()
            await expect(button).toHaveValue(expectedDate)
        })
    })
    test.describe('iot dashboard', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByText('IoT Dashboard').click()
        })
        test('sliders attributes', async ({ page }) => {
            const tab = page.locator('[tabtitle="Temperature"]')
            const button = tab.locator('circle')
            await button.evaluate(element => {
                element.setAttribute('cx', '10')
                element.setAttribute('cy', '119')
            })
            await button.click()
        })
        test('mouse moves simulation', async ({ page }) => {
            const tab = page.locator('[tabtitle="Temperature"]')
            const slider = tab.locator('ngx-temperature-dragger')
            const button = tab.locator('circle')
            await button.evaluate(element => {
                element.setAttribute('cx', '10')
                element.setAttribute('cy', '119')
            })
            await button.click()
            await expect(slider).toContainText('16')

            await slider.scrollIntoViewIfNeeded()
            const cursor = page.mouse
            const box = await slider.boundingBox()
            // following two are equivalent
            await page.mouse.click(box.x, box.y + box.height / 2)
            await expect(slider).toContainText('16')
            // and
            let cx = await button.evaluate(element => {
                return +element.getAttribute('cx')
            })
            let cy = await button.evaluate(element => {
                return +element.getAttribute('cy')
            })
            await cursor.move(box.x + cx, box.y + cy)
            await cursor.down()
            await cursor.move(box.x, box.y + box.height / 2)
            await cursor.up()
            await expect(slider).toContainText('16')
        })

    })

})
