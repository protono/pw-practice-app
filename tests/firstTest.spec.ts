import { expect } from '@playwright/test'
import { test } from '../test-options'
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
test.describe('extracting values', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form layouts').click()
    })

    test('get single text value', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Basic form' })
        const button = card.locator('button')
        expect(await button.textContent()).toEqual('Submit')
    })
    test('get all text values', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Using the Grid' })
        const options = await card.locator('nb-radio').allTextContents()
        expect(options).not.toContain('Option 3')
    })
    test('input values', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Basic form' })
        const email = card.getByRole('textbox', { name: 'Email' })
        await email.fill('c@t.lord')
        expect(await email.inputValue()).toEqual('c@t.lord')
    })
    test('attribute values', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Basic form' })
        const email = card.getByRole('textbox', { name: 'Email' })

        expect(await email.getAttribute('placeholder')).toEqual('Email')
    })
})

test.describe('assertions', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form layouts').click()
    })
    test('generic assertions', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Basic form' })
        const button = card.getByRole('button')
        const text = await button.textContent()
        expect(text).toEqual('Submit') // string assertion
    })
    test('locator assertions', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Basic form' })
        const button = card.getByRole('button')
        await expect(button).toHaveText('Submit') // Locator assertion
    })
    test.skip('soft', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Basic form' })
        const button = card.getByRole('button')
        // won't block if failed
        await expect.soft(button).toHaveText('Sign In')
        await expect(button).toHaveText('Submit')
        console.log('Test completed with a soft \'expect\' error')
    })
})
