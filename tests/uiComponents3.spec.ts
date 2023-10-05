import { expect } from '@playwright/test'
import { test } from '../test-options'
test.beforeEach(async ({ page }) => {
    await page.goto('')
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
        // 1
        await page.mouse.click(box.x, box.y + box.height / 2)
        await expect(slider).toContainText('16')
        // 2
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