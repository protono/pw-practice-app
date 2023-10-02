import { expect, test } from '@playwright/test'
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
test.describe('locators', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form layouts').click()
    })
    test('base locators syntax rules', async ({ page }) => {
        await page.locator('input').first().focus() // tag
        await page.locator('.shape-rectangle').first().focus() // class
        await page.locator('#inputEmail').first().focus() // id
        await page.locator('[placeholder="Email"]').first().focus() // attribute
        await page.locator('input[placeholder="Email"].shape-rectangle').first().focus() // combination
        await page.locator(':text-is("Email")').first().focus() // css
    })
    test('user facing locators', async ({ page }) => {
        await page.getByRole('textbox').first().focus()
        await page.getByRole('button').first().focus()
        await page.getByLabel('password').first().focus()
        await page.getByPlaceholder('email').first().focus()
        await page.getByText('name').first().focus()
        await page.getByTitle('IoT Dashboard').first().focus()
        await page.getByTestId('test-name').first().focus()
    })
    test('child elements', async ({ page }) => {
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').first().focus()
        // equivalent, just shorter
        await page.locator('nb-card nb-radio :text-is("Option 2")').first().focus()
        // mixing locator types
        await page.locator('nb-card').getByRole('button', { name: 'Sign In' }).first().focus()
    })
    test('parent elements', async ({ page }) => {
        const parent = page.locator('nb-card')
        const child = page.getByPlaceholder('Message')
        const card = parent.filter({ has: child })

        await card.focus()

        await parent
            .filter({ hasText: 'Form without labels' })
            .getByRole('textbox', { name: 'Message' })
            .focus()

        await child.locator('../../../..').focus()
    })
    test('reusing locators', async ({ page }) => {
        let card = page.locator('nb-card')
        card = card.filter({ hasText: 'Basic form' })
        const password = card.getByPlaceholder('Password')

        await card.getByPlaceholder('Email').fill('test@test.com')
        await password.fill('xxx')
        await expect(password).toHaveValue('xxx')
        await card.getByRole('checkbox').check({ force: true })
        await card.getByRole('button').focus()
        await expect(card.getByRole('button')).toBeFocused()
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
    test('soft', async ({ page }) => {
        const card = page.locator('nb-card').filter({ hasText: 'Basic form' })
        const button = card.getByRole('button')
        // won't block if failed
        await expect.soft(button).toHaveText('Sign In')
        await expect(button).toHaveText('Submit')
        console.log('Test completed with a soft \'expect\' error')
    })
})
